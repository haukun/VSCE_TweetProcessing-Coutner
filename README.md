# TweetProcessing Counter

つぶやきProcessing用の文字数カウンター拡張機能です。Twitter方式の文字カウントに対応し、259文字制限を意識しながらコーディングできます。

## 特徴

- リアルタイムで文字数をステータスバーに表示
- Twitter方式のカウント（日本語=2文字、URL=23文字）
- 259文字を超えると警告表示
- 改行のカウント方法を選択可能
- 多言語対応（日本語・英語）

## 使い方

1. VS Codeでファイルを開く
2. ステータスバー右下に文字数が表示されます
3. 259文字を超えると警告色で表示されます

## 設定

`Ctrl + ,` で設定を開き、「TweetProcessing Counter」で検索してください。

- **Label**: 文字数の後に表示する単位（空欄でロケール自動判定）
- **Show Line Count**: ツールチップに行数を表示
- **Line Break Count**: 改行のカウント方法
- **Counting Mode**: 文字カウント方式（標準/Twitter方式）
- **Warning Threshold**: 警告を表示する文字数（デフォルト: 259）

## つぶやきProcessingとは

Twitterの文字数制限内でProcessingのコードを書く創作活動です。ハッシュタグ `#つぶやきProcessing` 分を考慮して259文字に設定しています。

## ライセンス

MIT License - Copyright (c) 2026 Hau-kun (はぅ君)
