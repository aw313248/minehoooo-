# MINEH4O 作品集網站 — 專案守則

Oscar（賴明宏 / @minehoooo.arw）的個人網站。Next.js 15 App Router，push 到 main 後 Vercel 自動部署（約 2 分鐘）。正式站：minehoooo.vercel.app / minehoooo.xyz

## 全站鐵則
- **稱謂**：用「影像工作者」，不用「導演」「攝影師」「XX師」（About 頁 title 欄位例外）
- **IG**：唯一接案帳號 `@minehoooo.arw`；**`@minehoooo` 不是 Oscar 的帳號，全站禁止連結或顯示**
- 網頁文字結尾不用句號「。」，改用「，」或留空
- 文案風格：口語、輕鬆、不誇大、帶點自嘲
- 每完成一個邏輯段落就 commit + push，不要攢一大包
- 改共用元件後，抽查三種頁面（首頁、一篇 Field Note、Roadbook）確認沒炸

## 台灣機車環島 Roadbook（/field-notes/taiwan-roadbook）
旅程 2026-07-19 ～ 07-25。這一頁的定位：**不是旅遊網站，是「跟著 Oscar 完成環島」的電影**。每個景點是一個 Scene，改版永遠以節奏／鏡頭／停頓為先，不以資訊密度為先。

### 資料
- 行程唯一來源：Notion（`src/lib/roadbook.ts`，server-only，60 秒 revalidate）。**禁止硬編碼行程**
- `NOTION_TOKEN` 只存在 Vercel 環境變數，**絕不能出現在程式碼、client bundle 或任何輸出**
- 顯示地名只到縣市（coarse()），住宿不顯示地址；區級資訊在 server 端就截掉
- 天氣：Open-Meteo（免金鑰）。地圖：自繪 SVG。**禁用付費 Google Maps JS / Places API**
- 景點情報在 `stories.ts`（評論要查證，不可捏造評分）；示意圖在 `spotImages.ts`（Wikimedia CC 需保留頁尾致謝；Oscar 實拍上線後替換並移除 credit）
- 每日日誌在 `dailyLog.ts`（km、照片路徑）；照片放 `public/field-notes/taiwan-roadbook/days/`，上傳前壓縮並去除 EXIF/GPS

### 視覺語言（保留氣氛，版面可重排）
- #050505 底、#F2F0EA 主文字、#E3C66B 金、#88C999 綠（目前位置）、#C98752 橘（Plan B）
- Apple glass（.rb-glass）、全面圓角、中文為主英文小字
- 騎士＝猴子角色（rider.png），頭燈朝行進方向＋小尾煙；動畫克制，支援 prefers-reduced-motion
- 樣式全部限定 `.rb-*`，不碰全站字體／導覽／其他頁面

### 架構備忘
- 一天一頁（DAY 翻頁）；行程分頁＝scroll-driven：IntersectionObserver 控制 activeIdx，地圖鏡頭聚焦當前章節的城市、猴子騎過去
- 地圖三層：行程分頁＝城市層；「地圖」分頁＝當日總覽；Notion 填了緯度/經度會自動變真座標
- 手機＝上方固定地圖舞台＋下方章節；桌機＝左章節右 sticky 地圖（同一套元件）
- 此頁用 `body { overflow: visible !important }` 讓 sticky 生效，勿移除
- **`next build` 前先停掉 dev server**（共用 .next 會互相弄壞）

### 驗收習慣
改完先 `npx tsc --noEmit && npx next build`，push 後用 curl（帶 IG webview UA）打正式站確認，再抽查首頁與另一篇 Field Note 都是 200

## 流量／頻寬鐵則（2026-07-29 Fast Data Transfer 爆量教訓）
- `public/` 的檔案 Next.js 預設給 `max-age=0, must-revalidate`——影片會被瀏覽器與企業代理**每次重抓**。已在 `next.config.ts` 的 `headers()` 修正：影音 1 年 immutable、圖片 1 天＋30 天 stale-while-revalidate。**新增媒體類型（例如 .webm）要記得加進那個 regex**
- 網頁影片一律先壓：直立短片 608px / ~1.3 Mbps、有聲主影片 720px / 1.5 Mbps + AAC 96k，用 `h264_videotoolbox`（本機沒有 libx264）＋ `-movflags +faststart`
- 診斷順序：先看 `curl -sI` 的 cache-control，再看檔案大小。Vercel 警報裡的「300 MB」是**五分鐘累積傳輸量**，不是檔案大小——不要誤判成要再壓縮
- 多支 `loop` 自動播放的影片＋不可快取 = 流量放大器。LazyVideo 用 IntersectionObserver 只在進畫面才設 src，這個行為不要改掉
