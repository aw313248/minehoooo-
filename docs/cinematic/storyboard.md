# Cinematic Upgrade — Phase 2: Storyboard

## 全站電影文法（site-wide grammar）
- **Page shell**：既有 paged-section 全螢幕分頁（保留）
- **剪接（唯一轉場）**：dip-through-black 溶接，0.95s，全站所有分頁切換一致
  - 出場頁：opacity 1→0、scale 1→1.035（像鏡頭繼續推進然後沒入黑）
  - 黑幕：opacity 0→0.72（45% 處過峰）→0，蓋住交接縫
  - 進場頁：opacity 0→1、scale 0.965→1（從黑裡浮出）
- **底片**：全站固定 grain overlay（4% opacity、mix-blend overlay、grainShift 抖動）
- **光**：黑暗為底，金色 rgba(255,225,140) 維持唯一暖光 accent（不新增色彩）
- **節奏**：easing 統一 cubic-bezier(0.45,0,0.25,1)；不新增彈跳／過衝

## Hero 場景 thesis：「放映開始」
一進站是一場放映：letterbox 黑條先在，影片亮起後黑條緩慢收開 —— 電影開演的那一刻。
- 開演 beat（一次性）：上下黑條各 ~11vh，影片就緒後 1.6s 內收開，easing 同全站
- 影片：愚人節 MV（YouTube iframe 保留），調色 overlay 加深電影感
- 桌面互動（本頁唯一 heavy interaction）：滑鼠視差 — 影片層 ±14px 同向、內容層 ±6px 反向
- 手機互動：既有陀螺儀 tilt 視差（保留，已是同一語言）
- 既有編輯式排版（DIRECTOR／OSCAR／ROLES／數據）全部保留 — 構圖不是問題所在

## 其他分頁
- About／Photo／Video／AIGC／Projects／Contact：內部構圖與互動保留
- 統一感由「同一種剪接 + 同一卷底片」達成，不逐頁翻新（防混亂原則）

## 互動預算檢查
- 每頁 heavy interaction ≤ 1：Hero＝視差；其他頁沿用既有
- 一次性 reveal ≤ 2：Hero letterbox（一次）＋既有文字進場（保留）
