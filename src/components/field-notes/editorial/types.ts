import type { ReactNode } from "react";

export interface ImageItem {
  src:      string;
  alt?:     string;
  caption?: string;
}

export interface SetupItem {
  label: string;
  value: string;
}

export interface NextStopCity {
  name:    string;
  nameZh?: string;
  slug?:   string;
  year?:   string;
  videos?: string[];   // 城市實拍片段 — 卡片背景隨機輪播（霍格華茲畫像牆）
}

export interface GalleryVideo {
  src:      string;
  caption?: string;
}

export interface SetupCardItem {
  value: string;
  label: string;
}

export type Block =
  | { type: "headline";      id: string; text: string; sub?: string; num?: string }
  | { type: "text";          content: ReactNode }
  | { type: "callout";       content: ReactNode }
  // Setup: 16:9 cards row
  | { type: "setup-cards";   items: SetupCardItem[]; footer?: string }
  // CTA banner (hero / gallery)
  | { type: "cta";           message: string; cta: string; href: string; sub?: string }
  // Full phone screenshot in 16:9 with CSS zoom/crop to UI element
  | { type: "ui-crop";       src: string; alt?: string; objectPos?: string; label?: string; caption?: string }
  // Two ui-crops side by side
  | { type: "ui-crop-pair";
      left:  { src: string; alt?: string; objectPos?: string; label?: string };
      right: { src: string; alt?: string; objectPos?: string; label?: string };
      caption?: string }
  // Full image block
  | { type: "image";         item: ImageItem; frame?: "phone" | "wide" | "full" | "banner" }
  // Two images side by side (full-phone frames, kept for compatibility)
  | { type: "image-pair";    left: ImageItem; right: ImageItem; leftLabel?: string; rightLabel?: string }
  // Before/After compare — supports both image and video src
  | { type: "compare";       before: ImageItem; after: ImageItem; title?: string }
  // Autoplay video (hero background / placeholder)
  | { type: "video";         src?: string; placeholder?: string; frame?: "phone" | "wide" | "full"; caption?: string }
  // Lazy-load click-to-play video; sound: show an unmute toggle on autoplay videos
  | { type: "video-lazy";    src: string; poster?: string; caption?: string; aspectRatio?: string; maxWidth?: string; autoPlay?: boolean; sound?: boolean }
  // Travel gallery grid (auto-play muted, lazy)
  | { type: "travel-gallery"; items: GalleryVideo[] }
  // App recommendation card
  | { type: "app-rec";       name: string; tagline?: string; appStoreUrl: string; reason: string; website?: string; icon?: string }
  // Production flow strip — numbered steps with image/video thumbs (seedance-style)
  // anchor: id of the section headline the card scrolls to (chapter-index behavior)
  | { type: "flow-steps";    steps: { num: string; en: string; zh: string; thumb: string; thumbType: "image" | "video"; anchor?: string }[] }
  | { type: "next-stop";     cities: NextStopCity[] }
  | { type: "oscar-notes";   content: ReactNode }
  | { type: "closing";       content: ReactNode }
  // 歷史時間軸 — tag 區分：official 官方記載 / extra 資料補充 / oscar 現場筆記
  | { type: "timeline";      epic?: boolean; events: { year: string; title: string; desc?: string; tag?: "official" | "extra" | "oscar"; highlight?: boolean; img?: { src: string; alt: string; caption?: string } }[] }
  // 可收藏的地點資料卡（含外部連結按鈕）
  | { type: "info-card";     name: string; sub?: string; rows: { label: string; value: string }[]; links: { label: string; href: string }[]; footnote?: string }
  // Google Maps 互動地圖 — 點擊才載入 iframe，不拖慢頁面
  | { type: "map-embed";     src: string; title?: string; aspect?: string; eager?: boolean }
  // 開啟留言泡泡輸入框的按鈕（配合文章內的留言點）
  | { type: "comment-cta";   label: string; sub?: string }
  // YouTube 嵌入 — 點縮圖才載入播放器（自帶音量控制）
  | { type: "youtube";       id: string; title: string; aspect?: string }
  // 五階段過程切換器（Process Rail）：Raw → Keyframe → Target Frame → Generated → Final
  | { type: "stage-switcher"; title?: string; stages: { key: string; num: string; label: string; zh: string; mediaType: "video" | "image"; src: string; poster?: string; note?: string }[] }
  // 單顆鏡頭拆解卡（吃 aiCrimeFilm 的 CrimeShot 資料）
  | { type: "shot-breakdown"; shot: import("@/data/aiCrimeFilm").CrimeShot }
  // 雙工作流對照表
  | { type: "workflow-comparison"; data: typeof import("@/data/aiCrimeFilm").workflowComparison }
  // Higgsfield 邀請橫幅（banner=AI 教學醒目版 / plug=旅遊中場工商）
  | { type: "higgsfield";    variant?: "banner" | "plug" }
  // 資料來源清單
  | { type: "sources";       items: { label: string; href?: string; note?: string }[] }
  | { type: "prompt-copy";   text: string; label?: string }
  | { type: "faq";           items: { q: string; a: string }[] }
  | { type: "related";       slugs: string[] };
