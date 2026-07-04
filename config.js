/* ══════════════════════════════════════════════════════════════════
   Cinematic LP Kit — 設定ファイル（ここだけ編集すればLPが完成する）
   ── Claude Code に「/start」と打てば、会話で聞き取りながらここを書き換えてくれる。
   ── 手で直す人向けのメモは各行のコメント。engineより下（HTML/エンジン）は触らない。
   ══════════════════════════════════════════════════════════════════ */
window.LP_CONFIG = {

  /* ▼ どの世界観で見せるか（これ1行で切り替わる） ─────────────
     'photo'     … 実写写真がゆっくり動くシネマグラフ（テーマ直結。森/海/夜景…）
     'hybrid'    … 実写写真＋その上を光の粒子が舞い章ごとに形を変える（写真の実在感と粒子の演出のいいとこ取り）
     'particles' … 数万粒の光が形を変える抽象演出（球→DNA→格子…／絵文字の形にもなる）        */
  engine: 'photo',

  /* ▼ 共通（両エンジンで使う文言）───────────────────────────── */
  brand: 'Sukeads',                                 // 画面に大きく出る名前。英字・短めが映える（日本語も可）
  tagline: '才能じゃない。設計だ。',                   // 左上の小さいコピー
  location: 'N 35.6762° / E 139.6503°',              // 左下の座標風テキスト（ただの飾り）
  preloader: 'WEAVING WORLDS',                       // 読み込み中の文字
  hero: {   // ※【particlesモード】FVの粒子形は brand の立体文字から自動生成（shape指定は不可。shape対象は ch1〜4 と join）
    sub: '凡人だからこそできる最強の戦術を。',          // ファーストビュー下のひとこと
    photo: 'assets/photos/hero.jpg',                 // 【photoモード】ファーストビューの背景写真
    motion: 'forest',                                // 【photoモード】動きのタイプ（下の一覧参照）
  },

  /* ▼ 4つの章（スクロール順：①痛み ②再定義 ③解決 ④証拠）──────────
     文章(body)はClaudeが書く。改行は <br>。
     shape … 【particlesモード】粒子が集まる形（'emoji:🍞'で絵文字の形にもなる）
     photo … 【photoモード】その章の背景写真（assets/photos/ に入れて指定）
     motion… 【photoモード】動きのタイプ                                           */
  chapters: [
    { label:'Chapter 01 — Connection', idx:'01', title:'CONNECTION', accent:'var(--cyan)',
      shape:'sphere', photo:'assets/photos/ch1.jpg', motion:'city',
      body:'足りないのは新しいノウハウじゃない。<br>ノウハウコレクターから卒業しろ。' },
    { label:'Chapter 02 — Algorithm', idx:'02', title:'ALGORITHM', accent:'var(--violet)',
      shape:'dna', photo:'assets/photos/ch2.jpg', motion:'water',
      body:'Threadsをハックしろ。<br>プラットフォームに踊らされるな。' },
    { label:'Chapter 03 — Ignition', idx:'03', title:'IGNITION', accent:'var(--amber)',
      shape:'grid', photo:'assets/photos/ch3.jpg', motion:'meadow',
      body:'マネタイズに才能はいらない。<br>必要なのはやる気と少しの知識のみ。' },
    { label:'Chapter 04 — Voice', idx:'04', title:'VOICE', accent:'var(--green)',
      shape:'helix', photo:'assets/photos/ch4.jpg', motion:'water',
      body:'売れないまま終わるか。<br>片手間で売れる側に来るか。' },
  ],

  /* ▼ 最終画面（登録・申込へ誘導する画面）───────────────────── */
  join: {
    heading: 'JOIN THE<br>SUKEADS',                  // 見出し（改行 <br>）
    font: "'Syncopate',sans-serif",                 // 見出しフォント（別にする時は fonts.google にも足す）
    shape: 'hourglass',                             // 【particlesモード】最終画面の形（収束系が締まる）
    photo: 'assets/photos/join.jpg',                 // 【photoモード】最終画面の背景写真
    motion: 'cliff',                                 // 【photoモード】動きのタイプ
    body: '準備はできたか？<br>ようこそ。<br>AI×Threadsの極地へ',
    ctaText: '無料でプレゼントを受け取る',             // ボタンの文字
    ctaUrl: 'https://line.me/R/ti/p/%40570qdjfq',    // ボタンの飛び先URL（%40=@。無ければ '#' ）
  },

  /* ▼ フォント ──────────────────────────────────────────────
     display=見出し / serif=本文 / hero3d=【particlesモード】FVの立体文字
     google[] に追加すると そのGoogle Fontが読み込まれる（例 'Orbitron:wght@700'）        */
  fonts: {
    google: [],
    display: "'Anton',sans-serif",
    serif: "'Fraunces',Georgia,serif",
    hero3d: 'helvetiker',   // helvetiker(ゴシック)/optimer/gentilis(セリフ=上品)/droid-sans/droid-serif
  },

  /* ▼ 色 ───────────────────────────────────────────────────
     palette … UIの差し色とボタン色（cta=ボタン背景 / ctaInk=ボタン文字）
     tints  … 【particlesモード】各章の色 [背景,アクセント]（HERO/01/02/03/04/JOINの6組）      */
  palette: { accent:'#ffc46b', accent2:'#6fe9ff', accent3:'#ff7a18', cta:'#06c755', ctaInk:'#03361b' },
  // ↓ tints は必ず6組のまま（photoモードでも消さない。particlesに切替えた時に必要）
  tints: [[0x081634,0x2f6bd6],[0x0a3a55,0x2bd6e6],[0x241a66,0x7a5cff],[0x5a1e08,0xff7a18],[0x0e3b30,0x3df0c0],[0x0c3a2e,0x2fd6a0]],

  footer: 'What if I told you — <b>Claude made this.</b>',   // ← デモ用の署名。配布時は自分の一言に必ず書き換える

  /* ▼ 【particlesモード】背景の種類 ───────────────────────────
     'grid-all'(全章グリッド) / 'grid-hero'(FVだけ→星雲) / 'nebula'(星雲) / 'field'(自然・畑)  */
  background: 'grid-all',

  /* ▼ 【photoモード】写真の抽象度（0=そのまま写真 … 1=かなり絵画的）。0.85前後がテキストと馴染む  */
  photoMood: 0.85,

  /* 【photoモード】motion（動きのタイプ）一覧：
     forest 木漏れ日と揺れ / water 水面のゆらぎ・きらめき / city 灯りの瞬き / space 星の瞬き
     desert 陽炎と砂 / snow 降雪と霧 / beach 波とヤシ / meadow 草の揺れと光 / cliff 海霧とうねり / still ほぼ静止(ズームのみ) */
};
