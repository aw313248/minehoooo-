# Review Package 產生器

給外部審查用的完整快照：長截圖、走訪錄影、路由報告、HTML 快照、Lighthouse

## 用法（在任何有 Node 的環境）

```bash
# 1. 準備（一次性）：需要 playwright + 本機 Google Chrome + ffmpeg
npm i playwright

# 2. 產生主包（路由檢查 + 桌機/手機長圖 tiles + 兩支走訪錄影 webm）
node scripts/review/review-package.js docs/review/latest
#    只重錄影片:  ... docs/review/latest walkthrough
#    只重拍長圖:  ... docs/review/latest fullpage

# 3. 拼接長圖（tiles → *-fullpage.png）
node scripts/review/stitch.js docs/review/latest

# 4. 轉檔（webm → mp4，用 macOS 硬體編碼器；沒有 libx264）
ffmpeg -i desktop-walkthrough.webm -c:v h264_videotoolbox -b:v 1600k -pix_fmt yuv420p -movflags +faststart desktop-walkthrough.mp4

# 5. Lighthouse
npx lighthouse https://minehoooo.vercel.app/ --preset=desktop --output=json --chrome-flags="--headless=new"

# 6. 另存日期版本（APFS clone，不佔雙倍空間）
cp -Rc docs/review/latest docs/review/$(date +%Y-%m-%d)-v01
```

## 這個站的捕捉陷阱（改壞前必讀）

1. **首頁不是原生捲動** — PageScroll.tsx 攔截 wheel/touch/keydown，段落內先捲、到底才翻頁（950ms pageDip）。`window.scrollBy`／`scrollTop` 對首頁無效
2. **驅動方式**：錄影用 CDP `Input.synthesizeScrollGesture`（真實手勢）；長圖用 `navto` CustomEvent 逐段落跳轉＋段落內 div scrollTop 逐屏拍
3. **Playwright 內建 Chromium 沒有 H.264** — 一定要 `channel: 'chrome'`，否則 hero 影片全黑
4. **全站內容在 position:fixed 容器裡** — 不要隱藏 fixed/sticky 元素，會整頁變黑
5. **Playwright fullPage 截圖無效**（body 不捲動）— 只能逐屏拼接
6. **docs/review/ 已 gitignore** — 產物約 300MB/版，留本機，不進 git
