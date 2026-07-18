# Roadbook 行動指令劇本（給手機 Dispatch 的雲端 session）

Oscar 在環島路上，會用手機丟一句話＋附件過來。看到他說「照 DISPATCH.md 的 X 流程」就執行對應章節。先讀 CLAUDE.md 的鐵則再動手。改完一律：`npx tsc --noEmit && npx next build` 通過才 push；push 後 curl 正式站確認，並抽查首頁 200。

## A. 每日更新（傳：照片數張＋今日公里數＋一句話心得）
1. 照片處理：縮到長邊 1600px、品質 80 存 JPG，**必須去除 EXIF/GPS**（PIL：`ImageOps.exif_transpose(im)` 後重存即會丟棄 metadata），命名 `dayN-01.jpg` 起，放 `public/field-notes/taiwan-roadbook/days/`
2. `src/app/field-notes/taiwan-roadbook/dailyLog.ts`：把當天 entry 的 `km` 填上、`note` 換成 Oscar 那句話（結尾不用句號）、`photos` 填入路徑；並新增隔天的 entry（km: null、note 寫「騎行中」類短句）
3. 若 Oscar 說「這張換掉某景點示意圖」：把該照片另存後，改 `spotImages.ts` 對應項的 `src`、`isPlaceholder: false`、刪 `credit`，並從頁尾致謝陣列邏輯確認該項不再出現
4. commit 訊息格式：`Day N film log: +XXkm, M photos`

## B. 補景點情報（傳：「幫明天的站補情報」或指定站名）
1. 讀 `stories.ts`，找出 Oscar 指定（或 Notion 隔天公開）的站中還沒有 SpotStory 的
2. 上網查證：評論共識、特色、真實來源連結；**評分沒查證就不寫 rating**
3. 依現有格式補進 `stories.ts`（crowd＝網路公評、why＝Oscar 口吻的去的理由、special、srcUrl）；`match` 用站名關鍵字
4. commit：`Add field intel: <站名>`

## C. 換行程／改時間 → 不要動程式
行程唯一來源是 Notion。請 Oscar 直接改 Notion（或轉告他），網站 60 秒內自動同步。**禁止把行程寫進程式碼**。

## D. 視覺微調（傳：截圖＋想改哪裡）
- 只動 `src/app/field-notes/taiwan-roadbook/` 底下的檔案；樣式都在 `page.tsx` 的 `<style>` 區塊，全部 `.rb-*` 前綴
- 遵守 CLAUDE.md 視覺語言；改完手機 390px 寬要實際確認不爆版
- 不碰其他頁面、全站字體、導覽

## E. 網站健檢（傳：「幫我檢查網站」）
```
curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 (iPhone) Instagram" https://minehoooo.vercel.app/field-notes/taiwan-roadbook
curl -s -o /dev/null -w "%{http_code}" https://minehoooo.vercel.app/
curl -s "https://minehoooo.vercel.app/api/roadbook/cheer"
curl -s "https://minehoooo.vercel.app/api/roadbook/suggest?region=all" | head -c 400
```
回報各項狀態＋今天新增的加油數與網友推薦摘要。

## 絕對禁區（任何流程都適用）
- NOTION_TOKEN／任何金鑰不出現在程式碼與輸出
- 不動 Vercel 設定、環境變數、其他 Field Notes、首頁
- 照片沒去 GPS 不准 commit
- 地名顯示只到縣市；住宿永不顯示地址
