/**
 * Field Notes #001 | 我是怎麼用 iPhone 拍完整趟歐洲旅行的
 * slug: kino-iphone-guide
 */

import type { NoteContent } from "@/components/field-notes/note-article/NoteArticleTemplate";
import {
  NotePullQuote,
  NoteCallout,
} from "@/components/field-notes/note-article/NoteArticleTemplate";

const kinoContent: NoteContent = {
  /* ─── 01 · 為什麼我會開始這樣拍 ───────────────────────────────── */
  story: (
    <>
      <p>
        那趟歐洲回來之後，
        我一直在想一件事。
      </p>
      <p>
        不是鏡頭。不是 App。
        是一個問題：
        我到底是在拍什麼？
      </p>
      <NotePullQuote>
        Kino 是我的相機，不是這篇的主角。
      </NotePullQuote>
      <p>
        拍完整趟旅行，我用的就是 iPhone。
        Kino 確實是我的拍攝工具，
        但你真正想知道的，大概不是每個按鈕在哪裡。
      </p>
      <p>
        你想知道的是：
        怎麼拍出那種感覺？
      </p>
      <p>
        這篇筆記，我把那趟旅行的完整拍攝邏輯整理出來——
        包含我的格式設定、為什麼選那個焦段、
        怎麼面對光線，還有我常被問到的問題。
      </p>
      <p>
        Kino 只是工具，真正的主角是你的眼睛。
      </p>
    </>
  ),

  /* ─── 02 · 我的實際設定 ──────────────────────────────────────── */
  settingsPreamble: (
    <p>
      拍旅行影片，我有兩種設定——
      一種是為了快速輸出社群媒體，
      一種是商業拍攝或後製空間更大的場合。
    </p>
  ),

  settings: [
    {
      label: "社群媒體｜Reels / IG / Threads",
      items: [
        { key: "解析度",    value: "4K",          note: "" },
        { key: "格式",      value: "Apple Log",    note: "後製才有空間" },
        { key: "幀率",      value: "30fps",        note: "Reels 剪輯比較方便" },
        { key: "色彩",      value: "HDR",          note: "" },
        { key: "編碼",      value: "HEVC",         note: "容量相對小" },
      ],
    },
    {
      label: "商業拍攝｜畫質優先",
      items: [
        { key: "解析度",    value: "4K",           note: "" },
        { key: "幀率",      value: "24fps",         note: "電影感標配" },
        { key: "格式",      value: "Apple Log",     note: "" },
        { key: "編碼",      value: "ProRes 422",    note: "容量大很多，畫質最好" },
      ],
    },
    {
      label: "即時調色｜這個一定要開",
      items: [
        { key: "即時 LUT",  value: "開啟",          note: "右上角切換" },
        { key: "LUT 選擇",  value: "Lektar D323",   note: "這次歐洲主要用這個" },
        { key: "調整方式",  value: "依城市微調",     note: "LUT + 白平衡搭配" },
      ],
    },
  ],

  /* ─── 03 · 拍攝思維 ──────────────────────────────────────────── */
  mindset: (
    <>
      <p>
        很多人問我為什麼都用 2X。
      </p>
      <p>
        iPhone 的 1X 鏡頭大概是 24～28mm，是很廣角的焦段。
        廣角拍人，透視感會誇張，人物比例不自然。
      </p>
      <p>
        我比較喜歡 2X 那種被壓縮過的透視感。
        跟標準廣角比，2X 看起來更像相機拍出來的畫面，
        人物比例也比較正常。
        所以整趟歐洲，大概有七八成都直接切到 2X 在拍。
      </p>

      <NotePullQuote>
        電影感 70% 來自構圖與移動方式，30% 才是調色。
      </NotePullQuote>

      <p><strong>曝光</strong></p>
      <p>
        我拍攝時不太相信眼睛。
        我會把示波器叫出來，
        讓曝光抓在自己舒服的位置。
      </p>
      <p>
        我個人偏好稍微暗一點——
        電影感通常不是越亮越好。
        但這沒有標準答案，每個人的審美不同。
      </p>

      <p><strong>白平衡</strong></p>
      <p>
        大多數時間我直接用 AWB（自動白平衡）。
        光源一直在改變的環境，
        Auto 反而比一直手動調整更有效率。
        只有特殊場景——比如黃昏、室內鎢絲燈——
        我才會鎖白平衡。
      </p>

      <p><strong>對焦</strong></p>
      <p>
        平常直接 AF。
        只有低光源場景，我才切 MF。
      </p>
      <p>
        原因是 Kino 的 MF 有 Focus Peaking（峰值對焦）——
        畫面會出現綠色提示，
        你可以清楚知道哪裡真正對到焦。
        這個功能我非常喜歡。
      </p>

      <NoteCallout icon="👉">
        <strong>即時 LUT，一定要打開。</strong>
        <br />
        你錄的是 LOG，如果即時調色沒開，輸出的也是 LOG。
        如果你想直接拿去剪 Reels，右上角的即時調色開關一定要開。
      </NoteCallout>

      <p><strong>前鏡頭</strong></p>
      <p>
        很多人不知道 Kino 的前鏡頭也能套 LUT。
        Vlog、自拍、旅行紀錄，我幾乎都直接拍，
        不用再另外調色。
      </p>

      <p><strong>幾個小功能</strong></p>
      <p>
        右上角會顯示剩餘可以錄多久——
        拍旅行真的超方便，不用一直擔心容量。
      </p>
      <p>
        左上角有音量監聽，如果有外接麥克風，
        馬上知道有沒有收到聲音，不用拍完才發現沒錄到。
      </p>
      <p>
        基本九宮格都有，我幾乎一路都開著。
      </p>
    </>
  ),

  /* ─── 04 · Before / After ─────────────────────────────────────── */
  beforeAfter: {
    title: "同一個場景，LOG 原始 vs 套 LUT 後",
    before: {
      src:     "",                     // 放入 /public/field-notes/kino/before.jpg
      label:   "BEFORE",
      caption: "Apple Log 原始，未調色",
      type:    "image",
    },
    after: {
      src:     "",                     // 放入 /public/field-notes/kino/after.jpg
      label:   "AFTER",
      caption: "Lektar D323 LUT + 微調",
      type:    "image",
    },
  },

  /* ─── 05 · 常見問題 ─────────────────────────────────────────────── */
  faq: [
    {
      q: "拍完之後，影片在哪裡？",
      a: "左下角進去，選擇影片，右下角可以直接輸出。如果想在匯出前改 LUT，也是在這裡。不過我通常建議拍攝前就決定好色調，拍完才換 LUT 整體感覺會不太一樣。",
    },
    {
      q: "1X 和 2X，我應該用哪個？",
      a: "看你想要什麼感覺。如果你喜歡大景、強調空間感，1X 廣角很適合。我偏好 2X 是因為壓縮感讓畫面更像相機、人物比例更自然。兩個都試試，找到你自己喜歡的焦段感覺。",
    },
    {
      q: "社群媒體和商業拍攝，設定一定要分開嗎？",
      a: "不一定。如果你主要拍旅遊日記和 Reels，4K 30fps Apple Log HEVC 就很夠用。ProRes 422 是容量換畫質的選擇，一分鐘大概 6GB，不是每個場合都需要。",
    },
    {
      q: "即時 LUT 一定要開嗎？可以拍 RAW LOG 回來再調？",
      a: "可以，但如果你是拍旅遊直接上 IG，建議開啟即時調色。不開的話，匯出的就是 LOG 素材，要進 DaVinci 或其他軟體才能調。即時 LUT 適合「拍完直出」的場合。",
    },
    {
      q: "Kino 的 LUT 不夠用，可以匯入自己的嗎？",
      a: "可以。Kino 內建九組官方 LUT，全部都滿有質感。但你也可以匯入自己的 .cube 格式 LUT。我這次歐洲很常用 Lektar D323，再依照不同城市微調白平衡和曝光。",
    },
  ],

  /* ─── 06 · 延伸閱讀 ─────────────────────────────────────────────── */
  relatedSlugs: ["seedance-aerial"],

  /* ─── 結語 ───────────────────────────────────────────────────────── */
  closing: (
    <>
      <p>
        如果這篇真的有幫助到你，
        希望你拍完第一支旅行影片時，可以標記我。
      </p>
      <p>
        我很想看看，
        每個人眼中的世界，會長成什麼樣子。
      </p>
      <p>
        如果我有看到，也很樂意分享你的作品。
      </p>
    </>
  ),
};

export default kinoContent;
