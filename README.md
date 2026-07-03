# Cinematic LP Kit 🎬

スクロールで世界が動く、シネマティックなランディングページ(LP)のテンプレート。
**Claude Code に入れて「/start」と打つだけ。** 質問に答えていくと、コードを書かずにあなた専用のLPが完成します。

背景は2種類から選べます：
- 🌄 **実写写真がゆっくり動く**シネマグラフ（森・海・夜景…写真を差し替えるだけ）
- ✨ **光の粒が形を変える**幻想演出（球→DNA→格子…絵文字の形にも）

![webgl](https://img.shields.io/badge/WebGL-Three.js-blue) ![nocode](https://img.shields.io/badge/no--code-OK-brightgreen)

---

## 必要なもの
- **Claude Code**（このキットの主役）
- ブラウザ（Chrome推奨）
- インターネット接続（three.js等をCDNから読み込むため、表示に必要。公開後のLPも閲覧時にネットが要る）
- 確認用に Python か Node（たいてい入ってる）
- 公開する場合：無料の Cloudflare アカウント

## 使い方（話しかけるだけ）

**1. このフォルダを手に入れる**
- GitHubから：`git clone <このリポジトリのURL>`
- または「Code ▾ → Download ZIP」で落として解凍

**2. フォルダの中で Claude Code を起動**
```
claude
```

**3. `/start` と打つ**
→ Claude が7つくらいの質問を一つずつしてくれます。専門用語なし。分からなければ「おまかせ」でOK。
（`/start` が無い環境なら「このキットでLPを作りたい」と話しかけるだけでも始まります）

**4. 質問に答えるだけ** → Claude が文章もデザインも決めて、`config.js` を書き換え、あなた専用のLPが完成します。

**5. 確認 → 公開**
```
python3 -m http.server 8803          # このフォルダで実行
```
ブラウザで `http://localhost:8803/` を開く（更新は ⌘/Ctrl+Shift+R）。よければ公開：
```
npx wrangler login                                   # 初回だけ・ブラウザで承認
npx wrangler pages deploy . --project-name my-lp     # → https://my-lp.pages.dev
```
※ Cloudflareのダッシュボードにこのフォルダをドラッグ&ドロップでもOK。

## 自分で直したい人へ

編集するのは **`config.js` の1ファイルだけ**（先頭のコメントに全部説明あり）。
- `engine` … `'photo'`(写真) / `'particles'`(光の粒) を切り替え
- 写真は `assets/photos/` に入れて `config.js` でファイル名を指定（横長が映える）
- 色・文章・ボタン・フォントも全部 `config.js`

`index.html` と `engine-*.html` は本体なので触らないこと。

## 中身
```
cinematic-lp-kit/
├── config.js              ← ここだけ編集（設定・文章・色・写真の指定）
├── index.html             ← 入口（engineを見て切替）
├── engine-photo.html      ← 実写シネマグラフ本体
├── engine-particles.html  ← 光の粒子演出本体
├── assets/photos/         ← 写真を入れる（差し替え前提のサンプル入り）
├── CLAUDE.md              ← Claude Code への指示（自動で読まれる）
├── .claude/commands/start.md  ← /start コマンド
└── README.md              ← このファイル
```

## ライセンス / クレジット
内部は Three.js（CDN）。自由に使ってあなたのブランドを乗せてください。
