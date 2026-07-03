/**
 * Field Notes #001 | 我是怎麼用 iPhone 拍完整趟歐洲旅行的
 * articleType: "editorial-v2"
 *
 * 11-principle redesign:
 * ① ui-crop 取代完整手機截圖
 * ② 全部 16:9
 * ③ 圖片放大
 * ④ 大量影片（lazy load）
 * ⑤ 素材不足 → placeholder
 * ⑥ 圖片 → 一句重點 → 影片 → 一句心得
 * ⑦ 影片 lazy load
 * ⑧ 旅行成果 gallery
 * ⑨ setup-cards（不是表格）
 * ⑩ 三個 CTA 位置
 * ⑪ App 推薦
 */

import type { Block } from "@/components/field-notes/editorial/types";

const kinoBlocks: Block[] = [

  /* ══════════════════════════════════════════════════════════════
     ① 開場 Hero
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "intro",
    text: "一支 iPhone，走完整趟歐洲",
    sub:  "出發前我也覺得可能不夠用",
  },
  {
    type: "video-lazy",
    src:  "/field-notes/kino/videos/travel-europe-2026.mp4",
    autoPlay: true,
    sound: true,
    aspectRatio: "1320/2868",
    maxWidth: "360px",
    caption: "2026 奧地利 × 匈牙利 × 捷克 — 旅歐之旅 feat. KINO",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          <strong>Kino</strong> 是為 iPhone 設計的專業錄影相機。
          支援 Apple Log 格式拍攝、即時套用 LUT 調色、音量監控，以及直接匯出——
          所有功能在同一個畫面完成，不用在 App 之間切換
        </p>
        <p>
          它不是那種打開就讓你看起來很厲害的 App。
          它讓你有更多控制，你用得越熟，拍出來的東西越像你想要的樣子
        </p>
      </>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        電影感 70% 來自你怎麼移動鏡頭，30% 才是調色
      </>
    ),
  },
  {
    type:    "cta",
    message: "如果你也是因為 IG 來到這裡",
    sub:     "歡迎先看這趟旅行拍出的完整作品",
    cta:     "觀看旅行作品",
    href:    "/?section=video",
  },

  /* ── 製作方式 — 整篇的流程預覽（seedance 式步驟卡）── */
  {
    type: "flow-steps",
    steps: [
      { num: "01", en: "Shoot",   zh: "Apple Log 拍攝",  thumb: "/field-notes/kino/videos/before.mp4", thumbType: "video" },
      { num: "02", en: "Expose",  zh: "波形圖看曝光",    thumb: "/field-notes/kino/waveform.jpg",      thumbType: "image" },
      { num: "03", en: "Grade",   zh: "即時 LUT 監看",   thumb: "/field-notes/kino/lut-select.jpg",    thumbType: "image" },
      { num: "04", en: "Export",  zh: "Kino 內直接匯出", thumb: "/field-notes/kino/find-file.jpg",     thumbType: "image" },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
     ② 我的旅行設定 — Setup Cards
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "setup",
    text: "四個設定，死記住",
    sub:  "商業拍攝才換，旅行不換",
  },
  {
    type: "setup-cards",
    items: [
      { value: "Apple Log", label: "Format" },
      { value: "4K",        label: "Resolution" },
      { value: "30fps",     label: "Frame Rate" },
      { value: "HEVC",      label: "Codec" },
    ],
    footer: "商業拍攝才換 ProRes 422。旅行就是 HEVC",
  },

  /* ══════════════════════════════════════════════════════════════
     ③ 曝光
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "exposure",
    text: "曝光這件事，我不信眼睛",
    sub:  "有數字，就不猜",
  },
  {
    type:      "ui-crop",
    src:       "/field-notes/kino/waveform.jpg",
    alt:       "Kino 波形圖示波器",
    objectPos: "50% 50%",
    label:     "示波器 / 波形圖",
    caption:   "曝光唯一依據 — 不看螢幕，看數字",
  },
  {
    type: "text",
    content: (
      <p>
        我個人偏好稍微暗一點。電影感不是越亮越好
      </p>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        <strong>白平衡</strong>：大多數時候直接 AWB。
        只有黃昏或室內鎢絲燈才鎖
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     ④ 對焦
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "focus",
    text: "對焦：大部分時候別碰",
    sub:  "那 10%，你自己會知道",
  },
  {
    type:  "ui-crop-pair",
    left:  { src: "/field-notes/kino/auto-focus.jpg",  objectPos: "50% 35%", label: "AF — 日常" },
    right: { src: "/field-notes/kino/peak-focus.jpg",  objectPos: "50% 38%", label: "MF + Peak — 低光" },
  },
  {
    type: "text",
    content: (
      <p>
        Kino 的 MF 有 Focus Peaking——畫面出現綠色提示，
        你才知道真正對到哪裡
      </p>
    ),
  },
  {
    type:        "video-lazy",
    src:         "/field-notes/kino/videos/street-demo.mp4",
    aspectRatio: "9/16",
    maxWidth:    "360px",
    caption:     "街拍示範 — Kino 實際操作",
  },

  /* ══════════════════════════════════════════════════════════════
     ⑤ 音量 + 錄影時長
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "monitor",
    text: "兩個數字盯著就好",
    sub:  "不用記，打開看得到",
  },
  {
    type:  "ui-crop-pair",
    left:  { src: "/field-notes/kino/audio-level.jpg", objectPos: "6% 5%",  label: "LEFT — 音量" },
    right: { src: "/field-notes/kino/rec-time.jpg",    objectPos: "94% 5%", label: "RIGHT — 剩餘" },
    caption: "外接麥克風時左上即時確認有沒有收到聲音",
  },

  /* ══════════════════════════════════════════════════════════════
     ⑥ LUT
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "lut",
    text: "LUT 只用兩個",
    sub:  "換太多等於沒有風格",
  },
  {
    type:  "ui-crop-pair",
    left:  { src: "/field-notes/kino/lut-select.jpg", objectPos: "50% 95%", label: "選取 LUT" },
    right: { src: "/field-notes/kino/lut-fav.jpg",    objectPos: "50% 58%", label: "釘選常用" },
  },
  {
    type: "callout",
    content: (
      <>
        <strong>即時 LUT 一定要開。</strong>
        你錄的是 LOG，不開的話匯出的也是 LOG
      </>
    ),
  },
  {
    type: "text",
    content: (
      <>
        <p>
          <strong>Lektar D323</strong> —
          整趟旅行 90% 都是這個。壓縮高光，增加密度，偏冷調
        </p>
        <p>
          <strong>Glostrup</strong> —
          晴天才用。暖調，直射日光效果很好，陰天用會偏黃
        </p>
      </>
    ),
  },
  {
    type:        "video-lazy",
    src:         "/field-notes/kino/videos/street-travel.mp4",
    aspectRatio: "9/16",
    maxWidth:    "360px",
    caption:     "旅行街拍 — 邊走邊拍，整路都在趕",
  },

  /* ══════════════════════════════════════════════════════════════
     ⑦ 拍完匯出
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "export",
    text: "拍完的片在哪，怎麼出來",
    sub:  "整個流程不用離開 Kino",
  },
  {
    type:      "ui-crop",
    src:       "/field-notes/kino/find-file.jpg",
    alt:       "Kino 左下角錄影紀錄",
    objectPos: "50% 90%",
    label:     "左下角 — 點進去看你的影片",
    caption:   "拍完的片都在這裡，點左下角縮圖直接進入 / 右下角分享匯出（截圖補上）",
  },

  /* ══════════════════════════════════════════════════════════════
     ⑧ Before / After
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "before-after",
    text: "套上去和沒套，差多少",
    sub:  "你自己判斷",
  },
  {
    type:   "compare",
    title:  "Apple Log 原始 → Lektar D323",
    before: { src: "/field-notes/kino/videos/before.mp4", alt: "Apple Log 原始" },
    after:  { src: "/field-notes/kino/videos/after.mp4",  alt: "Lektar D323 套用後" },
  },

  /* ══════════════════════════════════════════════════════════════
     ⑨ 旅行成果 Gallery
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "gallery",
    text: "這趟拍的東西",
    sub:  "沒有相機，只有手機和腳",
  },
  {
    type:        "video-lazy",
    src:         "/field-notes/kino/videos/picks/tram-dusk.mp4",
    autoPlay:    true,
    aspectRatio: "9/16",
    maxWidth:    "420px",
    caption:     "布拉格 · 34 號電車與暮色 — Apple Log + Lektar D323，手持",
  },
  {
    type: "travel-gallery",
    items: [
      { src: "/field-notes/kino/videos/picks/vienna-square.mp4", caption: "WIEN 14:04" },
      { src: "/field-notes/kino/videos/picks/rooftop-dusk.mp4",  caption: "WIEN 21:25" },
      { src: "/field-notes/kino/videos/picks/vienna-night.mp4",  caption: "WIEN 19:24" },
      { src: "/field-notes/kino/videos/picks/hallstatt.mp4",     caption: "HALLSTATT 16:07" },
      { src: "/field-notes/kino/videos/picks/st-wolfgang.mp4",   caption: "AUSTRIA 18:18" },
      { src: "/field-notes/kino/videos/picks/krumlov.mp4",       caption: "CZECHIA 08:51" },
      { src: "/field-notes/kino/videos/picks/prague-square.mp4", caption: "PRAHA 17:17" },
      { src: "/field-notes/kino/videos/picks/castle-steps.mp4",  caption: "PRAHA 18:02" },
      { src: "/field-notes/kino/videos/picks/st-nicholas.mp4",   caption: "PRAHA 21:57" },
    ],
  },
  {
    type:    "cta",
    message: "喜歡這種電影感？",
    sub:     "全部都是 Kino 拍的",
    cta:     "查看完整作品集",
    href:    "/?section=video",
  },

  /* ══════════════════════════════════════════════════════════════
     ⑩ 如果重來一次
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "next-time",
    text: "回來之後才想通的事",
    sub:  "比設定更值得看",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          我會更勇敢地拍夜景
        </p>
        <p>
          整趟旅行，我躲避了很多低光場景——怕噪點，怕失焦。
          回來看那些影片，最有感覺的反而是那幾段：
          雨後的布拉格，街燈在石板路上的倒影
        </p>
        <p>
          手機的感光能力比我以為的強很多。
          下一次，我不會這麼快就收起手機
        </p>
      </>
    ),
  },
  {
    type:        "video-lazy",
    src:         "/field-notes/kino/videos/picks/budapest-night.mp4",
    autoPlay:    true,
    aspectRatio: "9/16",
    maxWidth:    "420px",
    caption:     "布達佩斯 · 聖史蒂芬大教堂前，雨後的路面 — 手持夜拍，沒有腳架",
  },

  /* ══════════════════════════════════════════════════════════════
     Oscar's Notes
     ══════════════════════════════════════════════════════════════ */
  {
    type: "oscar-notes",
    content: (
      <>
        <p>
          整趟旅行最常聽到的問題，不是「你用什麼設定」——
          是「你怎麼知道這個畫面值得拍？」
        </p>
        <p>
          我沒有好的答案。我只知道當一個畫面讓我想停下來的時候，
          我就拿出手機。那種衝動，比任何設定都重要
        </p>
        <p>
          Kino 幫我做的，是讓那個衝動和「拍出來的樣子」之間的距離縮小
        </p>
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     ⑪ App 推薦
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "app",
    text: "用了兩年還在用的那個 App",
    sub:  "沒有第二選擇",
  },
  {
    type:       "app-rec",
    name:       "Kino — Pro Video Camera",
    tagline:    "Lux Optics · iPhone 專業錄影",
    appStoreUrl:"https://apps.apple.com/tw/app/kino-pro-video-camera/id6472380172",
    icon:       "/field-notes/kino/app-icon.jpg",
    reason:     "從 Apple Log 到即時 LUT，整個拍攝流程都在同一個 App 完成。我目前的旅行拍攝完全依賴它",
  },

  /* ══════════════════════════════════════════════════════════════
     下一站
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "next-stop",
    text: "這趟去了哪",
    sub:  "每個地方都有一段影片",
  },
  {
    type: "next-stop",
    cities: [
      { name: "Praha",     nameZh: "布拉格",  year: "2026" },
      { name: "Wien",      nameZh: "維也納",  year: "2026" },
      { name: "Budapest",  nameZh: "布達佩斯", year: "2026" },
      { name: "Hallstatt", nameZh: "哈修塔特", year: "2026" },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
     結語 + Footer CTA
     ══════════════════════════════════════════════════════════════ */
  {
    type: "closing",
    content: (
      <>
        <p>
          完成你的第一支旅行影片後，歡迎 IG 標記 @minehoooo.arw
        </p>
        <p>
          我很想看看每個人眼中的世界，會長成什麼樣子。
          如果我有看到，也很樂意分享你的作品
        </p>
      </>
    ),
  },
];

export default kinoBlocks;
