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
    text: "那趟歐洲，我只帶了一支 iPhone",
    sub:  "Kino 是工具，你的眼睛才是主角",
  },
  {
    type: "video-lazy",
    src:  "/field-notes/kino/videos/travel-europe-2026.mp4",
    autoPlay: true,
    aspectRatio: "1320/2868",
    maxWidth: "360px",
    caption: "2026 奧地利x匈牙利x捷克 Oscar旅歐之旅！feat.KINO",
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

  /* ══════════════════════════════════════════════════════════════
     ② 我的旅行設定 — Setup Cards
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "setup",
    text: "我的旅行設定",
    sub:  "整趟歐洲，就是這四個",
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
    text: "曝光：我不相信眼睛",
    sub:  "示波器告訴我答案",
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
    text: "對焦：90% 都是 AF",
    sub:  "MF 只有一個理由",
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
    text: "打開就能用的兩個數字",
    sub:  "左上音量，右上剩餘",
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
    text: "我用的 LUT",
    sub:  "Lektar + Glostrup，整趟就這兩個",
  },
  {
    type:  "ui-crop-pair",
    left:  { src: "/field-notes/kino/lut-select.jpg", objectPos: "50% 82%", label: "選取 LUT" },
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
    text: "拍完，然後呢",
    sub:  "左下找，右下出",
  },
  {
    type:  "ui-crop-pair",
    left:  { src: "/field-notes/kino/find-file.jpg", objectPos: "20% 82%", label: "FIND — 左下角" },
    right: { src: "/field-notes/kino/export.jpg",    objectPos: "82% 86%", label: "EXPORT — 右下角" },
    caption: "整個流程不用離開 Kino",
  },

  /* ══════════════════════════════════════════════════════════════
     ⑧ Before / After
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "before-after",
    text: "有 LUT 和沒有 LUT",
    sub:  "同一個場景，同一支 iPhone",
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
    text: "旅行成果",
    sub:  "全部都是這趟歐洲，Kino × iPhone",
  },
  {
    type: "travel-gallery",
    items: [
      { src: "/field-notes/kino/videos/gallery-01.mp4" },
      { src: "/field-notes/kino/videos/gallery-02.mp4" },
      { src: "/field-notes/kino/videos/gallery-03.mp4" },
      { src: "/field-notes/kino/videos/gallery-04.mp4" },
      { src: "/field-notes/kino/videos/gallery-05.mp4" },
      { src: "/field-notes/kino/videos/gallery-06.mp4" },
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
    text: "如果重來一次",
    sub:  "這才是這篇最重要的部分",
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
    text: "推薦工具",
    sub:  "目前旅行唯一使用的拍攝 App",
  },
  {
    type:       "app-rec",
    name:       "Kino",
    tagline:    "Professional Video Camera for iPhone",
    appStoreUrl:"https://apps.apple.com/app/kino/id6471628249",
    reason:     "從 Apple Log 到即時 LUT，整個拍攝流程都在同一個 App 完成。我目前的旅行拍攝完全依賴它",
  },

  /* ══════════════════════════════════════════════════════════════
     下一站
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "next-stop",
    text: "下一站",
    sub:  "我用 Kino 拍了這些城市",
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
