/**
 * Field Notes #001 | 整趟歐洲，我沒帶相機
 * articleType: "editorial-v2"
 *
 * 結構原則（2026-07 內容修訂）：
 * - flow-steps 是「章節索引」：四張卡各對應一個真實章節，點擊跳轉，不混內容
 * - 每個主題（設定／曝光／對焦／LUT／匯出）獨立成章，細節在章內講完
 * - 專有名詞（波形圖、Focus Peaking）都有人話解釋
 * - 全文重點線：「衝動比設定重要」（呼應 Oscar's Notes）
 * - 城市對照：6/7-8 維也納、6/9-10 布達佩斯、6/13 哈修塔特、6/15-16 布拉格
 */

import type { Block } from "@/components/field-notes/editorial/types";

const kinoBlocks: Block[] = [

  /* ══════════════════════════════════════════════════════════════
     開場 — 為什麼沒帶相機
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "intro",
    num:  "01",
    text: "一支 iPhone，走完整趟歐洲",
    sub:  "出發前我也懷疑過夠不夠用，回來之後不懷疑了",
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
        <p key="p1">
          行李空間有限，相機加鏡頭一公斤起跳。出發前我做了個決定：
          這趟只帶 iPhone，然後把 <strong>Kino</strong> 練到熟
        </p>
        <p key="p2">
          Kino 是為 iPhone 做的專業錄影 App：支援 Apple Log 拍攝、
          即時 LUT 監看、音量監控、直接匯出——整個拍攝流程在同一個畫面完成，
          不用在 App 之間跳來跳去
        </p>
        <p key="p3">
          先說清楚：它不是那種打開就自動讓你變厲害的 App。
          它給你的是「控制」——你越熟，拍出來的東西就越接近你腦中想的樣子
        </p>
      </>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        這篇的核心只有一句：<strong>當一個畫面讓你想停下來，就拿出手機</strong>。
        那個衝動比接下來講的所有設定都重要——設定只是讓衝動不被浪費
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

  /* ── 章節索引 — 四張卡對應下面四個章節，點卡片跳轉 ── */
  {
    type: "flow-steps",
    steps: [
      { num: "02", en: "Setup",  zh: "四個設定",     thumb: "/field-notes/kino/videos/before.mp4", thumbType: "video", anchor: "setup"    },
      { num: "03", en: "Expose", zh: "波形圖看曝光", thumb: "/field-notes/kino/waveform.jpg",      thumbType: "image", anchor: "exposure" },
      { num: "05", en: "Grade",  zh: "即時 LUT",     thumb: "/field-notes/kino/lut-select.jpg",    thumbType: "image", anchor: "lut"      },
      { num: "07", en: "Export", zh: "拍完直接匯出", thumb: "/field-notes/kino/find-file.jpg",     thumbType: "image", anchor: "export"   },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
     02 設定 — Setup Cards
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "setup",
    num:  "02",
    text: "四個設定，死記住",
    sub:  "設定不是重點，「不用再想設定」才是重點",
  },
  {
    type: "setup-cards",
    items: [
      { value: "Apple Log", label: "Format" },
      { value: "4K",        label: "Resolution" },
      { value: "30fps",     label: "Frame Rate" },
      { value: "HEVC",      label: "Codec" },
    ],
    footer: "商業拍攝才換 ProRes 422，旅行就是 HEVC — 檔案小三倍，手機裝得下整趟旅程",
  },
  {
    type: "text",
    content: (
      <>
        <p key="p4">
          <strong>Apple Log</strong> 是這四個裡唯一不能妥協的。
          它記錄的顏色又灰又平，但保留的資訊最多——亮部沒那麼容易爆，
          暗部還救得回來，後期調色的空間完全不一樣
        </p>
        <p key="p5">
          出發前把這四個設定好，接下來整趟旅行你只需要做一件事：看到想拍的，按下錄影
        </p>
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     03 曝光
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "exposure",
    num:  "03",
    text: "曝光這件事，我不信眼睛",
    sub:  "螢幕會騙人：大太陽下看起來太暗，晚上看起來太亮",
  },
  {
    type:      "ui-crop",
    src:       "/field-notes/kino/waveform.jpg",
    alt:       "Kino 波形圖示波器",
    objectPos: "50% 50%",
    label:     "示波器 / 波形圖",
    caption:   "曝光唯一依據 — 不看畫面感覺，看數字",
  },
  {
    type: "text",
    content: (
      <>
        <p key="p6">
          <strong>波形圖（Waveform）</strong>是一張即時的亮度地圖：
          畫面裡越亮的東西，訊號就疊得越高。看懂它只要記兩件事——
        </p>
        <p key="p7">
          <strong>訊號頂到最上緣＝爆掉</strong>，那個區域的細節沒了，後期救不回來。
          <strong>整團訊號貼在底部＝太暗</strong>，硬拉亮會出現一堆噪點
        </p>
        <p key="p8">
          我的習慣是讓主體落在中間偏下，天空亮部頂多碰到八成的位置。
          我個人偏好稍微暗一點——電影感從來不是越亮越好
        </p>
      </>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        <strong>白平衡</strong>：大多數時候直接 AWB 自動。
        只有黃昏和室內鎢絲燈這種「顏色本身就是重點」的場景才手動鎖定
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     04 對焦
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "focus",
    num:  "04",
    text: "對焦：九成時間別碰它",
    sub:  "剩下那一成，你自己會知道",
  },
  {
    type:  "ui-crop-pair",
    left:  { src: "/field-notes/kino/auto-focus.jpg",  objectPos: "50% 35%", label: "AF — 日常" },
    right: { src: "/field-notes/kino/peak-focus.jpg",  objectPos: "50% 38%", label: "MF + Peaking — 低光" },
  },
  {
    type: "text",
    content: (
      <>
        <p key="p9">
          白天街拍、光線充足的場景，自動對焦（AF）又快又準，交給它就好。
          會出問題的是低光：夜景、室內、逆光——AF 會開始「猶豫」，
          畫面一下清楚一下模糊，那段素材基本就廢了
        </p>
        <p key="p10">
          這時候切手動對焦（MF），然後打開 <strong>Focus Peaking（峰值對焦）</strong>。
          說人話：它會把畫面裡「目前對到焦」的邊緣描上一圈<em>綠色的線</em>——
          綠線在誰身上，焦點就在誰身上。你不用瞇著眼睛猜清不清楚，看線就好
        </p>
        <p key="p11">
          轉動對焦環，看著綠線從背景爬到主角臉上，停——這就是低光對焦的全部
        </p>
      </>
    ),
  },
  {
    type:        "video-lazy",
    src:         "/field-notes/kino/videos/street-demo.mp4",
    aspectRatio: "9/16",
    maxWidth:    "360px",
    caption:     "街拍實際操作 — AF 走天下，暗了才切 MF",
  },

  /* ══════════════════════════════════════════════════════════════
     05 LUT
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "lut",
    num:  "05",
    text: "LUT 只用兩個",
    sub:  "每天換風格，等於沒有風格",
  },
  {
    type: "text",
    content: (
      <p key="p12">
        <strong>LUT</strong> 可以想成「一鍵套用的調色濾鏡」，
        差別在它是拍攝時即時監看用的——你在現場看到的就是調完色的樣子，
        不用回家對著灰灰的 Log 素材想像
      </p>
    ),
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
        <strong>「即時 LUT」一定要開。</strong>
        你錄的是 Log，這個開關決定匯出的是調好色的成品，還是又灰又平的原始檔
      </>
    ),
  },
  {
    type: "text",
    content: (
      <>
        <p key="p13">
          <strong>Lektar D323</strong> — 整趟旅行九成都是它。
          高光收得住、畫面有密度、調性偏冷，陰天雨天照樣穩
        </p>
        <p key="p14">
          <strong>Glostrup</strong> — 晴天限定。暖調，直射陽光下很漂亮，
          但陰天用會整片發黃，別鐵齒
        </p>
      </>
    ),
  },
  {
    type:        "video-lazy",
    src:         "/field-notes/kino/videos/street-travel.mp4",
    aspectRatio: "9/16",
    maxWidth:    "360px",
    caption:     "旅行街拍 — 現場看到的，就是成品的顏色",
  },

  /* ══════════════════════════════════════════════════════════════
     06 監看
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "monitor",
    num:  "06",
    text: "錄影中，盯兩個數字就好",
    sub:  "不用記，它們就在畫面上",
  },
  {
    type:  "ui-crop-pair",
    left:  { src: "/field-notes/kino/audio-level.jpg", objectPos: "6% 5%",  label: "左上 — 音量" },
    right: { src: "/field-notes/kino/rec-time.jpg",    objectPos: "94% 5%", label: "右上 — 剩餘容量" },
    caption: "接外接麥克風時，開錄前先瞄一眼左上——確認聲音真的有進來",
  },

  /* ══════════════════════════════════════════════════════════════
     07 匯出
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "export",
    num:  "07",
    text: "拍完的片在哪，怎麼出來",
    sub:  "全程不用離開 Kino",
  },
  {
    type:      "ui-crop",
    src:       "/field-notes/kino/find-file.jpg",
    alt:       "Kino 左下角錄影紀錄",
    objectPos: "50% 90%",
    label:     "左下角 — 你拍的都在這",
    caption:   "點左下角縮圖進入片庫，右下角分享鍵直接匯出——開了即時 LUT，出來的就是成品",
  },

  /* ══════════════════════════════════════════════════════════════
     08 Before / After
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "before-after",
    num:  "08",
    text: "套上去和沒套，差多少",
    sub:  "左右拉拉看，你自己判斷",
  },
  {
    type:   "compare",
    title:  "Apple Log 原始 → Lektar D323",
    before: { src: "/field-notes/kino/videos/before.mp4", alt: "Apple Log 原始" },
    after:  { src: "/field-notes/kino/videos/after.mp4",  alt: "Lektar D323 套用後" },
  },

  /* ══════════════════════════════════════════════════════════════
     09 旅行成果 Gallery
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "gallery",
    num:  "09",
    text: "這趟拍回來的東西",
    sub:  "維也納 · 布達佩斯 · 哈修塔特 · 布拉格 — 沒有相機，只有手機和腳",
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
      { src: "/field-notes/kino/videos/picks/vienna-square.mp4", caption: "維也納 WIEN 14:04" },
      { src: "/field-notes/kino/videos/picks/rooftop-dusk.mp4",  caption: "維也納 WIEN 21:25" },
      { src: "/field-notes/kino/videos/picks/vienna-night.mp4",  caption: "維也納 WIEN 19:24" },
      { src: "/field-notes/kino/videos/picks/hallstatt.mp4",     caption: "哈修塔特 HALLSTATT 16:07" },
      { src: "/field-notes/kino/videos/picks/st-wolfgang.mp4",   caption: "哈修塔特 HALLSTATT 18:18" },
      { src: "/field-notes/kino/videos/picks/krumlov.mp4",       caption: "布拉格 PRAHA 08:51" },
      { src: "/field-notes/kino/videos/picks/prague-square.mp4", caption: "布拉格 PRAHA 17:17" },
      { src: "/field-notes/kino/videos/picks/castle-steps.mp4",  caption: "布拉格 PRAHA 18:02" },
      { src: "/field-notes/kino/videos/picks/st-nicholas.mp4",   caption: "布拉格 PRAHA 21:57" },
    ],
  },
  {
    type:    "cta",
    message: "喜歡這種電影感？",
    sub:     "以上全部：一支 iPhone + Kino",
    cta:     "查看完整作品集",
    href:    "/?section=video",
  },

  /* ══════════════════════════════════════════════════════════════
     10 如果重來一次
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "next-time",
    num:  "10",
    text: "回來之後才想通的事",
    sub:  "這段比上面所有設定都值得看",
  },
  {
    type: "text",
    content: (
      <>
        <p key="p15">
          我會更勇敢地拍夜景
        </p>
        <p key="p16">
          整趟旅行我躲掉了很多低光場景——怕噪點、怕失焦。
          結果回來剪片，最有感覺的偏偏就是那幾段夜裡的畫面：
          雨後的石板路、街燈的倒影、教堂前的暮色
        </p>
        <p key="p17">
          手機的感光能力比我以為的強很多。下一次天黑了，我不會急著把手機收起來
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
    caption:     "布達佩斯 · 聖史蒂芬大教堂前，雨後路面 — 手持夜拍，沒有腳架",
  },

  /* ══════════════════════════════════════════════════════════════
     Oscar's Notes
     ══════════════════════════════════════════════════════════════ */
  {
    type: "oscar-notes",
    content: (
      <>
        <p key="p18">
          整趟旅行最常被問的，不是「你用什麼設定」——
          是「你怎麼知道這個畫面值得拍？」
        </p>
        <p key="p19">
          我沒有好答案。我只知道：當一個畫面讓我想停下來，我就拿出手機。
          那種衝動，比任何設定都重要
        </p>
        <p key="p20">
          Kino 幫我做的，只是把「那個衝動」和「拍出來的樣子」之間的距離縮到最短。
          設定我都給你了——剩下的，靠你自己走出去
        </p>
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     App 推薦
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "app",
    num:  "11",
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
    num:  "12",
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
        <p key="p21">
          完成你的第一支旅行影片後，歡迎在 IG 標記 @minehoooo.arw
        </p>
        <p key="p22">
          我很想看看每個人眼中的世界長什麼樣子——
          如果我有看到，也很樂意分享你的作品
        </p>
      </>
    ),
  },
];

export default kinoBlocks;
