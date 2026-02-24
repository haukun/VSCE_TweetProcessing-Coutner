# VS Code Marketplace 公開チェックリスト

## 公開前に必要な作業

### 1. Publisher IDの取得と設定

1. [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage) にアクセス
2. Azure DevOps アカウントでサインイン
3. Publisher を作成（例: hau-kun）
4. `package.json` の `"publisher": "local"` を実際のPublisher IDに変更

### 2. GitHubリポジトリの設定

1. GitHubにリポジトリを作成
2. `package.json` の以下のURLを実際のリポジトリURLに変更:
   - `repository.url`
   - `bugs.url`
   - `homepage`

例:
```json
"repository": {
  "type": "git",
  "url": "https://github.com/hau-kun/tweetprocessing-counter"
}
```

### 3. アイコンの追加（推奨）

1. 128x128px の PNG画像を作成（透過背景推奨）
2. プロジェクトルートに `icon.png` として保存
3. `package.json` に追加:
```json
"icon": "icon.png"
```

### 4. README.mdの充実

現在のREADME.mdは基本的な内容ですが、以下を追加すると良いです：

- スクリーンショット（GIF動画推奨）
- インストール方法
- より詳細な使用例
- トラブルシューティング
- コントリビューション方法

### 5. CHANGELOGの作成

`CHANGELOG.md` を作成してバージョン履歴を記録:

```markdown
# Change Log

## [0.0.1] - 2026-XX-XX
### Added
- 初回リリース
- Twitter方式の文字カウント機能
- リアルタイム表示
- 259文字警告機能
```

### 6. package.jsonの最終確認

- [ ] `version`: 適切なバージョン番号（セマンティックバージョニング）
- [ ] `publisher`: 実際のPublisher ID
- [ ] `displayName`: わかりやすい表示名
- [ ] `description`: 簡潔な説明
- [ ] `categories`: 適切なカテゴリ
- [ ] `keywords`: 検索用キーワード
- [ ] `repository`: GitHubリポジトリURL
- [ ] `license`: "MIT"

### 7. vsce のインストールと公開

```bash
# vsce（VS Code Extension Manager）をインストール
npm install -g @vscode/vsce

# パッケージング（テスト）
vsce package

# マーケットプレイスに公開
vsce publish
```

### 8. 公開後の作業

- [ ] マーケットプレイスで拡張機能のページを確認
- [ ] README.mdにマーケットプレイスのバッジを追加
- [ ] GitHubリポジトリのREADMEを更新

## 現在の状態

✅ 基本機能実装完了
✅ ライセンス設定完了（MIT）
✅ 多言語対応完了
✅ README.md作成済み
✅ .vscodeignore設定済み
✅ keywords追加済み

⚠️ 要対応:
- Publisher IDの設定（"local" → 実際のID）
- GitHubリポジトリURLの設定
- アイコン画像の追加（推奨）
- CHANGELOGの作成（推奨）
- スクリーンショットの追加（推奨）

## 参考リンク

- [VS Code Extension Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest)
- [Marketplace Presentation Tips](https://code.visualstudio.com/api/references/extension-guidelines)
