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

## 作り方（4ステップ）

1. **このフォルダを開く**
   ```
   cd cinematic-lp-kit      # このフォルダ
   claude                   # Claude Code を起動
   ```

2. **ブランドを決める**
   `ブランド設計プロンプト.md` を開いて、【　】を自分のブランドに書き換える（分からない所は「お任せ」でOK）。

3. **Claude に渡す**
   書き換えたプロンプトを丸ごと Claude Code に貼り付ける。
   → Claude が `index.html` の CONFIG を書き換えて、あなたのLPを作ります。

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
├── ブランド設計プロンプト.md  ← これを書き換えて Claude に渡す
└── README.md               ← このファイル
```

## ライセンス / クレジット

内部は Three.js / GSAP / Lenis（各CDN）。自由に使ってブランドを乗せてください。
