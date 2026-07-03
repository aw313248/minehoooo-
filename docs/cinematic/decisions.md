# Cinematic Upgrade — Phase 1: Decisions

日期：2026-07-04 ｜ 目標：轉場與封面從 75 分推到 100 分，絕不混亂

## 起始問卷（由需求內文預先回答）
- 起始方式：Reference — 用戶提供 MotionSites 模板 prompt + 既有網站（升級，非新建）
- 圖片佔位：否 — 全站已有真實素材
- Niche：台中在地影像工作者作品集｜頁面：主頁（7 個分頁 section）、/video、/works/[slug]、/field-notes

## MotionSites 模板驗證結論
- 技術棧不合：模板是 React+Vite+GSAP，本站是 Next.js 15 + framer-motion → **不可直接套用**
- 模板附帶影片（hf_20260703 CloudFront）是模板作者的示範素材：粉色夕陽豪華別墅 AI 渲染，
  與本站黑白編輯感、在地導演品牌完全衝突 → **素材棄用**
- 可借的概念：scroll 主導的敘事、玻璃面板、單一強烈的簽名互動 → 轉譯為本站語言

## Uniqueness / Shell 審計
- 本案是**同一站的刻意升級（intentional sequel）**：既有 paged-section shell、編輯式 hero 排版、
  黑底白字金 accent 全部保留（用戶明示「必須保有我的影片」「不重新設計視覺」）
- Shell-ban：不引入模板的 350vh 長捲動 + 玻璃面板 shell（會推翻現有 paged 架構 = 製造混亂）

## 導演 × 電影語言（best-effort：references 庫未安裝、未做網路研究，標記為較弱研究 pass）
- **剪接紀律：David Fincher** — 一部片只有一種剪接文法；每個 cut 一模一樣、精準、無炫技
- **光的紀律：Roger Deakins（BR2049）** — 黑暗是材質，光只從一個方向來；金色是唯一暖光
- 一句話 thesis：**「一部片，一種剪接，一種底片。」**

## 混亂根源診斷（機制）
1. PageScroll 6 種轉場輪播（scale/curtain/blur-skew/fold/split/iris）＝特效取樣器 → 無識別性
2. Hero 影片是 YouTube iframe：載入慢、UI 外漏、調色受限
3. 各 section 各有互動但無統一「底片」質感層

## 核心決策
1. **轉場統一為一種**：dip-through-black 溶接（出場微放大變暗、黑幕過峰、進場微縮小變亮）
2. **Hero 影片來源維持 YouTube**（愚人節 MV，1080p 自適應）：
   - yt-dlp 僅能取得 360p（SABR 限制）、本機僅 480p 轉載檔、母帶不在此機 → 自載不可行
   - 升級呈現層：letterbox 開場、更強的調色 overlay、桌面滑鼠視差
   - TODO(Oscar)：若提供 1080p 母帶或 15–30s selects，可改自載靜音循環（更快、零 YT chrome）
3. **全站 film grain**：單一固定 overlay（重用既有 grainShift keyframes）＝「同一卷底片」
4. 各 section 內部構圖本次不動（範圍控制，避免翻新引入新混亂）
