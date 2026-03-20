import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    // ステータスバーアイテムを作成（右側に配置）
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(statusBarItem);

    // エディタ変更時に文字数を更新
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateCharacterCount)
    );
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(updateCharacterCount)
    );

    // 初回表示
    updateCharacterCount();
}

function countTwitterStyle(text: string): number {
    let count = 0;
    
    // URLを23文字としてカウント（http/https）
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urls = text.match(urlRegex) || [];
    const textWithoutUrls = text.replace(urlRegex, '');
    
    // URL分を加算
    count += urls.length * 23;
    
    // 残りのテキストを文字ごとに処理
    for (const char of textWithoutUrls) {
        const code = char.charCodeAt(0);
        
        // CJK統合漢字、ひらがな、カタカナ、ハングルなどは2カウント
        if (
            (code >= 0x3040 && code <= 0x309F) || // ひらがな
            (code >= 0x30A0 && code <= 0x30FF) || // カタカナ
            (code >= 0x4E00 && code <= 0x9FFF) || // CJK統合漢字
            (code >= 0x3400 && code <= 0x4DBF) || // CJK拡張A
            (code >= 0xAC00 && code <= 0xD7AF) || // ハングル
            (code >= 0xFF00 && code <= 0xFFEF)    // 全角英数
        ) {
            count += 2;
        } else {
            count += 1;
        }
    }
    
    return count;
}

function updateCharacterCount() {
    const editor = vscode.window.activeTextEditor;
    
    if (!editor) {
        statusBarItem.hide();
        return;
    }

    const config = vscode.workspace.getConfiguration('characterCounter');
    const showLineCount = config.get<boolean>('showLineCount', true);
    const lineBreakCount = config.get<string>('lineBreakCount', 'single');
    const countingMode = config.get<string>('countingMode', 'twitter');
    const warningThreshold = config.get<number>('warningThreshold', 259);

    // labelのデフォルト値をロケールに応じて設定
    const defaultLabel = vscode.env.language === 'ja' ? '文字' : 'chars';
    const label = config.get<string>('label') || defaultLabel;

    let text = editor.document.getText();
    let charCount: number;

    if (lineBreakCount === 'single') {
        // 改行を1文字としてカウント（CRLF → LF に正規化）
        text = text.replace(/\r\n/g, '\n');
    }

    if (countingMode === 'twitter') {
        charCount = countTwitterStyle(text);
    } else {
        charCount = text.length;
    }

    const lineCount = editor.document.lineCount;
    const isOverLimit = warningThreshold > 0 && charCount > warningThreshold;

    // 残り文字数の計算
    const remaining = warningThreshold > 0 ? warningThreshold - charCount : 0;
    const remainingText = warningThreshold > 0 ? ` (${remaining.toLocaleString()})` : '';

    // 制限超過時は警告アイコンと背景色を変更
    if (isOverLimit) {
        statusBarItem.text = `$(warning) ${charCount.toLocaleString()} ${label}${remainingText}`;
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    } else {
        statusBarItem.text = `$(symbol-string) ${charCount.toLocaleString()} ${label}${remainingText}`;
        statusBarItem.backgroundColor = undefined;
    }
    
    if (showLineCount) {
        const overText = isOverLimit ? `\n⚠️ 制限超過 (${warningThreshold}文字まで)` : '';
        statusBarItem.tooltip = `文字数: ${charCount.toLocaleString()}\n行数: ${lineCount.toLocaleString()}${overText}`;
    } else {
        const overText = isOverLimit ? `\n⚠️ 制限超過 (${warningThreshold}文字まで)` : '';
        statusBarItem.tooltip = `文字数: ${charCount.toLocaleString()}${overText}`;
    }
    
    statusBarItem.show();
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}
