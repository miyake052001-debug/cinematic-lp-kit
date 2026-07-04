@echo off
rem ── これをダブルクリックすると、あなたのLPがブラウザで開きます（Windows用）──
rem 止めるときは、開いた黒い画面を閉じるだけ。
cd /d "%~dp0"
set PORT=8803
start "" http://localhost:%PORT%/
echo.
echo   プレビューを開きました  http://localhost:%PORT%/
echo   （このウィンドウを閉じると停止します）
echo.
python -m http.server %PORT% 2>nul || py -m http.server %PORT% 2>nul || npx --yes http-server -p %PORT%
