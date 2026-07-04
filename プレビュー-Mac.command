#!/bin/bash
# ── これをダブルクリックすると、あなたのLPがブラウザで開きます（Mac用）──
# 止めるときは、開いた黒い画面（ターミナル）を閉じるだけ。
cd "$(dirname "$0")"
PORT=8803
# 1秒後にブラウザを開く
( sleep 1; open "http://localhost:${PORT}/" ) &
echo ""
echo "  プレビューを開きました → http://localhost:${PORT}/"
echo "  （このウィンドウを閉じると停止します）"
echo ""
# ローカルサーバーを起動（python3 が無ければ python / npx を試す）
if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server ${PORT}
elif command -v python >/dev/null 2>&1; then
  python -m http.server ${PORT}
else
  npx --yes http-server -p ${PORT}
fi
