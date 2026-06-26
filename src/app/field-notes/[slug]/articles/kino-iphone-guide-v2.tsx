/**
 * Field Notes #001 | 我是怎麼用 iPhone 拍完整趟歐洲旅行的
 * slug: kino-iphone-guide  (articleType: "editorial-v2")
 *
 * Rhythm: Hero → Conclusion → Setup Card → Image → Feature → Image → Insight → next Feature
 */

import type { Block } from "@/components/field-notes/editorial/types";

const kinoBlocks: Block[] = [

  /* ── 01 · 開場 ───────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "intro",
    text: "那趟歐洲回來之後",
    sub:  "不是鏡頭讓畫面不一樣，是你的眼睛",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          我一直在想一件事。不是鏡頭，不是 App。
          是一個問題：我到底是在拍什麼？
        </p>
        <p>
          整趟歐洲，我就帶了一支 iPhone。
          Kino 確實是我的拍攝工具，但你真正想知道的，
          大概不是每個按鈕在哪裡。
        </p>
        <p>
          你想知道的是：怎麼拍出那種感覺？
        </p>
      </>
    ),
  },

  /* ── 一句結論 ────────────────────────────────────────────────────── */
  {
    type: "callout",
    content: (
      <>
        <strong>電影感 70% 來自構圖與移動方式，30% 才是調色。</strong>
        這篇把我完整的設定邏輯和拍攝思維都整理出來了
      </>
    ),
  },

  /* ── 02 · Setup Card ──────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "setup",
    text: "我的旅行拍攝設定",
    sub:  "社群媒體 / 商業拍攝",
  },
  {
    type:  "setup-card",
    title: "OSCAR'S TRAVEL SETUP",
    badge: "Taichung · TW · 2026",
    rows: [
      [
        { label: "Resolution",  value: "4K" },
        { label: "Format",      value: "Apple Log" },
        { label: "Frame Rate",  value: "30fps" },
      ],
      [
        { label: "Color",       value: "HDR" },
        { label: "Codec",       value: "HEVC" },
        { label: "Pro Codec",   value: "ProRes 422" },
      ],
    ],
  },
  {
    type: "text",
    content: (
      <p>
        社群用 HEVC（容量小），商業用 ProRes 422（一分鐘約 6GB）。
        Apple Log 讓後製空間更大，也是 Kino 的核心優勢之一
      </p>
    ),
  },

  /* ── 03 · Kino 界面 ── 音量 + 錄影時長 ─────────────────────────── */
  {
    type: "headline",
    id:   "interface",
    text: "打開就能用的兩個數字",
    sub:  "左上音量、右上剩餘時長",
  },
  {
    type:      "image-pair",
    left:      { src: "/field-notes/kino/audio-level.jpg", alt: "音量監聽", caption: "音量監聽" },
    right:     { src: "/field-notes/kino/rec-time.jpg",    alt: "剩餘錄影時長", caption: "剩餘錄影時長" },
    leftLabel:  "LEFT — 音量",
    rightLabel: "RIGHT — 剩餘",
  },
  {
    type: "text",
    content: (
      <p>
        左上角有音量監聽，外接麥克風時馬上知道有沒有收到聲音。
        右上角顯示剩餘可錄多久，旅行時完全不用擔心容量問題
      </p>
    ),
  },

  /* ── 04 · 對焦 ───────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "focus",
    text: "AF vs MF：大多數時候，自動就夠了",
    sub:  "低光才切 MF，因為有 Peak Focus",
  },
  {
    type:      "image-pair",
    left:      { src: "/field-notes/kino/auto-focus.jpg", alt: "自動對焦", caption: "自動對焦 (AF)" },
    right:     { src: "/field-notes/kino/peak-focus.jpg", alt: "峰值對焦", caption: "手動 + 峰值對焦 (MF)" },
    leftLabel:  "NORMAL — AF",
    rightLabel: "LOW LIGHT — MF + Peak",
  },
  {
    type: "text",
    content: (
      <p>
        Kino 的 MF 有 Focus Peaking（峰值對焦）——
        畫面會出現綠色提示，讓你清楚知道哪裡真正對到焦。
        這個功能我非常喜歡，它讓低光場景的失焦率大幅下降
      </p>
    ),
  },

  /* ── 05 · 曝光 ───────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "exposure",
    text: "曝光：我不相信眼睛",
    sub:  "用波形圖取代直覺",
  },
  {
    type:  "image",
    item:  { src: "/field-notes/kino/waveform.jpg", alt: "Kino 波形圖", caption: "示波器 / 波形圖 — 讓曝光有根據" },
    frame: "phone",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          我拍攝時把示波器叫出來，讓曝光抓在自己舒服的位置。
          我個人偏好稍微暗一點——電影感通常不是越亮越好
        </p>
        <p>
          白平衡我大多用 AWB，只有黃昏或室內鎢絲燈才鎖白平衡
        </p>
      </>
    ),
  },

  /* ── 06 · LUT 選擇 ───────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "lut",
    text: "LUT：最重要的選擇",
    sub:  "拍攝前就決定，拍完才換感覺會跑掉",
  },
  {
    type:      "image-pair",
    left:      { src: "/field-notes/kino/lut-select.jpg", alt: "選取 LUT", caption: "選取 LUT" },
    right:     { src: "/field-notes/kino/lut-fav.jpg",    alt: "收藏 LUT", caption: "收藏常用 LUT" },
    leftLabel:  "SELECT — 從清單選",
    rightLabel: "FAV — 釘選常用",
  },
  {
    type: "callout",
    content: (
      <>
        <strong>即時 LUT 一定要開。</strong>
        你錄的是 LOG，如果即時調色沒開，匯出的也是 LOG。
        右上角的即時調色開關記得打開，否則素材拿回來剪還要進後製軟體
      </>
    ),
  },
  {
    type: "text",
    content: (
      <>
        <p>
          <strong>Lektar D323</strong> — 整趟歐洲 90% 都用這個。
          會壓縮高光、增加畫面密度，很接近電影色調。
          偏冷調，適合灰天、建築、人文場景
        </p>
        <p>
          <strong>Glostrup</strong> — 晴天、明亮、暖調的場景才用。
          直射日光下效果很好，但陰天用會偏黃
        </p>
      </>
    ),
  },

  /* ── 07 · 找檔案 + 匯出 ─────────────────────────────────────────── */
  {
    type: "headline",
    id:   "export",
    text: "拍完，然後呢",
    sub:  "查看相簿 → 匯出，整個流程不離開 Kino",
  },
  {
    type:      "image-pair",
    left:      { src: "/field-notes/kino/find-file.jpg", alt: "查看相簿", caption: "查看相簿" },
    right:     { src: "/field-notes/kino/export.jpg",    alt: "儲存影片", caption: "儲存影片" },
    leftLabel:  "FIND — 左下角進去",
    rightLabel: "EXPORT — 右下角輸出",
  },
  {
    type: "text",
    content: (
      <p>
        左下角進去，選擇影片，右下角直接輸出。
        如果想在匯出前換 LUT，也在這裡操作。
        不過我通常建議拍攝前就決定好色調——拍完才換，整體感覺會不太一樣
      </p>
    ),
  },

  /* ── 08 · Before / After ─────────────────────────────────────────── */
  {
    type:   "compare",
    title:  "同一個場景 — Apple Log 原始 vs 套 Lektar D323",
    before: { src: "", alt: "Apple Log 原始", caption: "Apple Log 原始，未調色" },
    after:  { src: "", alt: "Lektar D323",    caption: "Lektar D323 LUT + 微調白平衡" },
  },

  /* ── 09 · Oscar's Notes ──────────────────────────────────────────── */
  {
    type: "oscar-notes",
    content: (
      <>
        <p>
          整趟旅行最常聽到的問題，不是「你用什麼設定」，
          而是「你怎麼知道現在這個畫面值得拍？」
        </p>
        <p>
          我沒有好的答案。我只知道當一個畫面讓我想停下來的時候，
          我就拿出手機。那種衝動比任何設定都重要。
        </p>
        <p>
          Kino 幫我做的，是讓那個衝動和「拍出來的樣子」之間的距離縮小——
          所以我才繼續用它
        </p>
      </>
    ),
  },

  /* ── 10 · FAQ ────────────────────────────────────────────────────── */
  {
    type:  "headline",
    id:    "faq",
    text:  "常見問題",
    sub:   "邊緣情況 — 大多數人不會遇到",
  },
  {
    type: "faq",
    items: [
      {
        q: "拍完之後，影片在哪裡？",
        a: "左下角進去，選擇影片，右下角可以直接輸出。如果想在匯出前改 LUT，也是在這裡。不過我通常建議拍攝前就決定好色調，拍完才換 LUT 整體感覺會不太一樣",
      },
      {
        q: "1X 和 2X，我應該用哪個？",
        a: "看你想要什麼感覺。iPhone 的 1X 大概是 24～28mm 廣角，透視感會誇張。我偏好 2X 是因為壓縮感讓畫面更像相機拍的，人物比例也比較自然。整趟歐洲大概七八成都切 2X",
      },
      {
        q: "即時 LUT 一定要開嗎？",
        a: "如果你是拍旅遊直接上 IG，建議開啟。不開的話，匯出的是 LOG 素材，要進 DaVinci 或其他軟體才能調。即時 LUT 適合「拍完直出」的場合",
      },
      {
        q: "可以匯入自己的 LUT 嗎？",
        a: "可以。Kino 內建九組官方 LUT，也支援匯入 .cube 格式的自訂 LUT。我這次歐洲主要用 Lektar D323，再依照不同城市微調白平衡和曝光",
      },
      {
        q: "前鏡頭也可以套 LUT 嗎？",
        a: "可以。Kino 的前鏡頭也能套 LUT，我的 Vlog 和旅行自拍幾乎都直接拍，不用再另外調色",
      },
    ],
  },

  /* ── 11 · 延伸閱讀 ───────────────────────────────────────────────── */
  {
    type:  "headline",
    id:    "related",
    text:  "延伸閱讀",
    sub:   "相關工作流",
  },
  {
    type:  "related",
    slugs: ["seedance-aerial"],
  },

  /* ── 結語 ────────────────────────────────────────────────────────── */
  {
    type: "closing",
    content: (
      <>
        <p>
          如果這篇真的有幫助到你，
          希望你拍完第一支旅行影片時，可以標記我
        </p>
        <p>
          我很想看看，每個人眼中的世界，會長成什麼樣子。
          如果我有看到，也很樂意分享你的作品
        </p>
      </>
    ),
  },
];

export default kinoBlocks;
