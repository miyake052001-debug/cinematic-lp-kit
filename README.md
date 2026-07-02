# Cinematic LP Kit 🌌

スクロールで世界が変わる、シネマティックな WebGL ランディングページのテンプレート。
**プロンプトを自分のブランドに書き換えるだけで、あなた専用のLPが完成します。** コードは書けなくてOK。

![grid](https://img.shields.io/badge/WebGL-Three.js-blue) ![nocode](https://img.shields.io/badge/no--code-OK-brightgreen)

---

## 必要なもの

- **Claude Code**（このキットの主役。プロンプトからサイトを作ってくれる）
- ブラウザ（Chrome推奨）
- 確認用に Python か Node（`python3` か `npx`。たいてい入ってる）
- 公開する場合：無料の Cloudflare アカウント

## 作り方（話しかけるだけ）

1. **このフォルダで Claude Code を起動**
   ```
   claude
   ```
2. **「サイトを作りたい」と話しかける**（または `はじめかた.md` の文をコピペ）
   → Claude が **7つくらいの質問を一つずつ**してくれます。専門用語なし。分からなければ「おまかせ」でOK。
3. **質問に答えるだけ** → Claude が文章もデザインも作って、あなた専用のLPが完成します。

4. **確認 → 公開**
   ```
   python3 -m http.server 8803      # このフォルダで実行
   ```
   ブラウザで `http://localhost:8803/` を開く（更新は ⌘/Ctrl+Shift+R）。
   よければ公開：
   ```
   npx wrangler login                                   # 初回だけ・ブラウザで承認
   npx wrangler pages deploy . --project-name my-lp     # → https://my-lp.pages.dev
   ```
   ※ Cloudflare のダッシュボードにこのフォルダをドラッグ&ドロップでもOK。

## 手で直したい人へ

`index.html` の先頭コメントと、`<script type="module">` 内の **`▼▼▼ CONFIG ▼▼▼`** ブロックがすべての設定です。ここだけ書き換えれば別ブランドになります（その下の3Dエンジンは触らないこと）。

- `background` … `'grid-all'` / `'grid-hero'` / `'nebula'` の3モード
- `tints` … 各章の色 `[背景, アクセント]` を6組（16進 `0x......`）
- フォントを変えたら `<head>` の Google Fonts `<link>` にも追加

## 中身

```
cinematic-lp-kit/
├── index.html              ← LP本体（1ファイル完結・CONFIG駆動）
├── CLAUDE.md               ← Claude Code への指示（自動で読まれる）
├── はじめかた.md             ← まず読む（話すだけでLPが作れる）
└── README.md               ← このファイル
```

## ライセンス / クレジット

内部は Three.js / GSAP / Lenis（各CDN）。自由に使ってブランドを乗せてください。
