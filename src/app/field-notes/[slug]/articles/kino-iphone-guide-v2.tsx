/**
 * Field Notes #001 | 我是怎麼用 iPhone 拍完整趟歐洲旅行的
 * slug: kino-iphone-guide  (articleType: "editorial-v2")
 *
 * 每篇回答三件事：
 * ① 我怎麼拍？
 * ② 我拍出了什麼？
 * ③ 如果重來一次，我會怎麼拍得更好？
 */

import type { Block } from "@/components/field-notes/editorial/types";

const kinoBlocks: Block[] = [

  /* ──────────────────────────────────────────────────────────────────
     ① 開場
     ────────────────────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "intro",
    text: "那趟歐洲，我只帶了一支 iPhone",
    sub:  "Kino 是工具。你的眼睛才是主角",
  },
  {
    type: "video",
    placeholder: "旅行影片 | 歐洲 2026",
    frame: "wide",
  },
  {
    type: "text",
    content: (
      <p>
        那趟回來之後，我一直在想一件事。
        不是鏡頭，不是 App，是一個問題：
        我到底是在拍什麼？
      </p>
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

  /* ──────────────────────────────────────────────────────────────────
     ② 我的旅行設定 — 直接給，不解釋
     ────────────────────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "setup",
    text: "我的旅行設定",
    sub:  "直接給，不解釋",
  },
  {
    type:  "setup-card",
    title: "OSCAR'S TRAVEL SETUP",
    badge: "Taichung · TW · 2026",
    rows: [
      [
        { label: "Format",  value: "Apple Log" },
        { label: "Res",     value: "4K" },
        { label: "FPS",     value: "30fps" },
      ],
      [
        { label: "Codec",   value: "HEVC" },
        { label: "Color",   value: "HDR" },
        { label: "Pro",     value: "ProRes 422" },
      ],
    ],
  },
  {
    type: "text",
    content: (
      <p>
        社群就是 HEVC。商業就是 ProRes。Apple Log 讓我後製有空間。
        就這樣
      </p>
    ),
  },

  /* ──────────────────────────────────────────────────────────────────
     ③ 曝光 — 一個 section 只回答一件事
     ────────────────────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "exposure",
    text: "曝光：我不相信眼睛",
    sub:  "示波器告訴我答案，不是螢幕",
  },
  {
    type:  "image",
    item:  { src: "/field-notes/kino/waveform.jpg", alt: "Kino 波形圖", caption: "示波器 — 曝光的唯一依據" },
    frame: "phone",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          我不看螢幕判斷曝光。
          我把示波器叫出來，讓數字告訴我
        </p>
        <p>
          我的偏好：稍微暗。
          電影感不是越亮越好
        </p>
      </>
    ),
  },

  /* ──────────────────────────────────────────────────────────────────
     ④ 白平衡 — 獨立一節
     ────────────────────────────────────────────────────────────────── */
  {
    type: "callout",
    content: (
      <>
        <strong>白平衡</strong>：大多數時候我直接 AWB。
        只有黃昏或室內鎢絲燈，我才鎖白平衡
      </>
    ),
  },

  /* ──────────────────────────────────────────────────────────────────
     ⑤ 對焦 — 一個 section 只回答一件事
     ────────────────────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "focus",
    text: "對焦：90% 的時間，我都不想碰它",
    sub:  "MF 只有一個理由存在",
  },
  {
    type:      "image-pair",
    left:      { src: "/field-notes/kino/auto-focus.jpg", alt: "自動對焦" },
    right:     { src: "/field-notes/kino/peak-focus.jpg", alt: "峰值對焦" },
    leftLabel:  "AF — 日常",
    rightLabel: "MF + Peak — 低光",
  },
  {
    type: "text",
    content: (
      <p>
        Kino 的 MF 有 Focus Peaking——
        畫面出現綠色提示，你才知道真正對到哪裡。
        這個功能我非常喜歡
      </p>
    ),
  },

  /* ──────────────────────────────────────────────────────────────────
     ⑥ 監控：音量 + 錄影時長
     ────────────────────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "monitor",
    text: "打開就能用的兩個數字",
    sub:  "左上音量，右上剩餘",
  },
  {
    type:      "image-pair",
    left:      { src: "/field-notes/kino/audio-level.jpg", alt: "音量監聽" },
    right:     { src: "/field-notes/kino/rec-time.jpg",    alt: "剩餘錄影時長" },
    leftLabel:  "LEFT — 音量",
    rightLabel: "RIGHT — 剩餘時長",
  },
  {
    type: "text",
    content: (
      <p>
        左上知道有沒有收到聲音，
        右上知道還剩多少可以拍。
        旅行時完全不用分心
      </p>
    ),
  },

  /* ──────────────────────────────────────────────────────────────────
     ⑦ LUT — 我用了哪些顏色
     ────────────────────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "lut",
    text: "我用的 LUT",
    sub:  "Lektar + Glostrup，整趟就這兩個",
  },
  {
    type:      "image-pair",
    left:      { src: "/field-notes/kino/lut-select.jpg", alt: "選取 LUT" },
    right:     { src: "/field-notes/kino/lut-fav.jpg",    alt: "收藏 LUT" },
    leftLabel:  "選取",
    rightLabel: "釘選常用",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          <strong>Lektar D323</strong>：整趟旅行 90% 都是這個。
          壓縮高光，增加密度，接近電影感。偏冷調
        </p>
        <p>
          <strong>Glostrup</strong>：晴天才用。暖調，直射日光效果很好。
          陰天用會偏黃
        </p>
      </>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        <strong>即時 LUT 一定要開。</strong>
        你錄的是 LOG，不開的話匯出的也是 LOG——
        拿去剪 Reels 會是灰色的。右上角那個開關
      </>
    ),
  },
  {
    type: "video",
    placeholder: "Lektar D323 實拍 | 布拉格市區",
    frame: "wide",
  },

  /* ──────────────────────────────────────────────────────────────────
     ⑧ 拍完到匯出
     ────────────────────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "export",
    text: "拍完，然後呢",
    sub:  "左下找，右下出",
  },
  {
    type:      "image-pair",
    left:      { src: "/field-notes/kino/find-file.jpg", alt: "查看相簿" },
    right:     { src: "/field-notes/kino/export.jpg",    alt: "儲存影片" },
    leftLabel:  "FIND — 左下角",
    rightLabel: "EXPORT — 右下角",
  },
  {
    type: "text",
    content: (
      <p>
        整個流程不用離開 Kino。
        如果想換 LUT 再匯出，也在這裡。
        不過拍攝前就決定好比較對——拍完才換，感覺會跑掉
      </p>
    ),
  },

  /* ──────────────────────────────────────────────────────────────────
     ② 我拍出了什麼 — Before / After
     ────────────────────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "before-after",
    text: "有 LUT 和沒有 LUT",
    sub:  "同一個場景，同一支 iPhone",
  },
  {
    type: "video",
    placeholder: "Before / After | Apple Log → Lektar D323",
    frame: "wide",
  },

  /* ──────────────────────────────────────────────────────────────────
     ③ 如果重來一次
     ────────────────────────────────────────────────────────────────── */
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

  /* ──────────────────────────────────────────────────────────────────
     Oscar's Notes
     ────────────────────────────────────────────────────────────────── */
  {
    type: "oscar-notes",
    content: (
      <>
        <p>
          整趟旅行最常聽到的問題，不是「你用什麼設定」——
          是「你怎麼知道這個畫面值得拍？」
        </p>
        <p>
          我沒有好的答案。
          我只知道當一個畫面讓我想停下來的時候，
          我就拿出手機。
          那種衝動，比任何設定都重要
        </p>
        <p>
          Kino 幫我做的，是讓那個衝動和「拍出來的樣子」之間的距離縮小。
          所以我才繼續用它
        </p>
      </>
    ),
  },

  /* ──────────────────────────────────────────────────────────────────
     下一站 — 不是延伸閱讀
     ────────────────────────────────────────────────────────────────── */
  {
    type: "headline",
    id:   "next-stop",
    text: "下一站",
    sub:  "我用 Kino 拍了這些城市",
  },
  {
    type: "next-stop",
    cities: [
      { name: "Praha",     nameZh: "布拉格", year: "2026" },
      { name: "Wien",      nameZh: "維也納", year: "2026" },
      { name: "Budapest",  nameZh: "布達佩斯", year: "2026" },
      { name: "Hallstatt", nameZh: "哈修塔特", year: "2026" },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────
     結語
     ────────────────────────────────────────────────────────────────── */
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
