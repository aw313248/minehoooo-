/**
 * Field Notes / 現場筆記 — Oscar 的影像工作筆記
 * 對應 SEO 引流策略：影片留言索取資料的入口都會導向這裡的文章
 *
 * articleType:
 *   "tool"      → AI 工具實作（Seedance）：PromptBuilder + QuickStart 等重型 UI
 *   "editorial" → 一般閱讀文章：6-section 編輯模板（故事/設定/思維/Before-After/FAQ/延伸閱讀）
 */

export type NoteCategory = "AI" | "KINO" | "COLOR" | "STREET" | "TRAVEL" | "GEAR";
export type ArticleType = "tool" | "editorial" | "editorial-v2";

export interface FieldNote {
  slug:          string;
  title:         string;
  issue?:        string;        // e.g. "001" — rendered as "FIELD NOTES — ISSUE #001" eyebrow
  subtitle?:     string;
  date:          string;        // ISO date "YYYY-MM-DD"
  category:      NoteCategory;
  categoryLabel: string;        // Display string, e.g. "AI · SEEDANCE", "KINO · iPhone"
  tags:          string[];
  excerpt:       string;
  heroImage:     string;        // path under /public
  heroVideos?:   { src: string; label?: string }[];  // looping hero backdrop; 3 vertical clips render as a video wall, label = city name
  readingTime:   number;        // in minutes
  articleType:   ArticleType;
  tool?:         string;        // only for "tool" articles
  triggerWord?:  string;        // IG/Threads bot keyword that links here
  commentPrompt?: string;       // 留言泡泡輸入框的客製提問（預設「留一句話，它會變成這頁的泡泡」）
}

export const fieldNotes: FieldNote[] = [
  // ── 臺中人的輕量雨殼選擇 ──────────────────────────────────────
  {
    slug:          "montbell-rain-trekker",
    title:         "我沒有買最便宜的雨衣，因為這件比較帥",
    issue:         "005",
    subtitle:      "Mont-bell Rain Trekker：輕、收得小，而且我真的會穿",
    date:          "2026-08-24",
    category:      "GEAR",
    categoryLabel: "GEAR · RAIN SHELL",
    tags:          ["Mont-bell", "Rain Trekker", "Patagonia", "Torrentshell 3L", "迪卡儂", "防水外套", "臺中", "戶外裝備"],
    excerpt:       "從迪卡儂、Patagonia 比到 Mont-bell，我最後不是選規格最誇張的，而是選一件夠輕、收得夠小、穿起來也真的喜歡的防水外殼",
    heroImage:     "/field-notes/montbell-rain-trekker/taichung-rain.jpg",
    readingTime:   7,
    articleType:   "editorial-v2",
    commentPrompt: "你買外套時，機能、價格跟帥，哪一個最重要？",
  },

  // ── 一個人旅行拍攝方法（留言關鍵字：台灣好美）──────────────
  {
    slug:          "how-i-film-solo-travel",
    title:         "一個人旅行，我怎麼把自己拍進風景裡",
    issue:         "004",
    subtitle:      "先感受，再找位置，拍到六、七十分就收手",
    date:          "2026-08-14",
    category:      "TRAVEL",
    categoryLabel: "TRAVEL · SOLO",
    tags:          ["一個人旅行", "旅行攝影", "自拍", "腳架", "Manfrotto Element SL", "構圖", "長焦"],
    excerpt:       "從找平地、用手機抓鏡位、調整腳架，到長焦構圖與走進畫面，整理我一個人旅行時真正會用的拍攝方法，最重要的是：旅行不是工作，拍到六、七十分就可以收手",
    heroImage:     "/field-notes/solo-travel-ai/oscar-frame-first.jpg",
    readingTime:   5,
    articleType:   "editorial-v2",
    triggerWord:   "台灣好美",
    commentPrompt: "你最想把自己拍進哪一段旅行？",
  },

  // ── AI 工具實作文章 ─────────────────────────────────────────────
  {
    slug:          "seedance-aerial",
    title:         "用一張空拍照，生成電影級 AI 空拍鏡頭",
    subtitle:      "MINE 的 Seedance 實作筆記",
    date:          "2026-06-01",
    category:      "AI",
    categoryLabel: "AI · SEEDANCE",
    tags:          ["Seedance", "Higgsfield", "AI", "空拍", "FPV", "Prompt"],
    excerpt:       "你只需要一張空拍遠景照，丟進 Seedance，配上對的 Prompt，就能生出一段平穩、有電影感的空拍運鏡，這是我們實際在用的完整流程",
    heroImage:     "/field-notes/seedance-aerial-source.jpg",
    readingTime:   5,
    articleType:   "tool",
    tool:          "Higgsfield × Seedance",
    triggerWord:   "飛天小女警",
  },

  // ── AI Case Study ────────────────────────────────────────────
  {
    slug:          "wulu-concept-film",
    title:         "WULU 霧鹿 — 用 AI 完成一支高端威士忌 Concept Film",
    subtitle:      "Prompt 不是起點，而是前面所有創意決策的總和",
    date:          "2026-07-01",
    category:      "AI",
    categoryLabel: "AI · CONCEPT FILM",
    tags:          ["AI", "Prompt", "Brand", "Commercial", "WULU", "Concept Film", "威士忌"],
    excerpt:       "WULU 是一個不存在的台灣單一麥芽威士忌品牌。這是一個完全虛構的品牌，用來測試目前 AI 是否可以完成一支高端精品商品廣告——以及在開始寫 Prompt 之前，真正需要思考的那些事",
    heroImage:     "/field-notes/wulu/brand-banner.png",
    readingTime:   5,
    articleType:   "editorial-v2",
    triggerWord:   "wulu",
  },


  // ── AI 犯罪短片教學（ISSUE #003）───────────────────────────────
  {
    slug:          "ai-crime-film",
    title:         "我在家拍了四個動作，做出一支地下犯罪電影",
    issue:         "003",
    subtitle:      "從 Raw Footage、Target Frame、Sequence Storyboard 到 Seedance 2.0 的完整工作流",
    date:          "2026-07-14",
    category:      "AI",
    categoryLabel: "AI · SEEDANCE 2.0",
    tags:          ["Seedance 2.0", "Higgsfield", "AI 電影", "Storyboard", "Raw Footage", "調光", "犯罪片", "賽博龐克"],
    excerpt:       "走路、停下、開箱、吃東西——四個在家拍的動作，加上角色設定、目標畫面、12 格分鏡和 Seedance 2.0，變成一支九龍城寨風的地下犯罪短片。含五顆鏡頭逐顆拆解、兩種工作流對照、十個踩過的雷和調光七步驟",
    heroImage:     "/field-notes/ai-crime-film/posters/final-film.jpg",
    readingTime:   10,
    articleType:   "editorial-v2",
    triggerWord:   "在家拍電影",
    commentPrompt: "你會想先試哪一顆鏡頭？",
  },

  // ── 台灣機車環島 Roadbook（LIVE，靜態路由 /field-notes/taiwan-roadbook）──
  {
    slug:          "taiwan-roadbook",
    title:         "台灣機車環島 Roadbook",
    subtitle:      "七天六夜逆時針環島 — 現場使用中的互動 Roadbook",
    date:          "2026-07-15",
    category:      "TRAVEL",
    categoryLabel: "TRAVEL · TAIWAN",
    tags:          ["機車環島", "台灣", "Roadbook", "旅行", "LIVE"],
    excerpt:       "七天六夜逆時針環島，行程、導航、目前位置與現場更新都集中在這裡——LIVE ROADBOOK，有更新就同步",
    heroImage:     "/field-notes/taiwan-roadbook/og.jpg",
    readingTime:   1,
    articleType:   "editorial-v2",
  },

  // ── 旅遊工具小筆記（GuruWalk）─────────────────────────────────
  {
    slug:          "guruwalk",
    title:         "出國想深度旅遊，先把這個 App 裝起來",
    subtitle:      "GuruWalk — 免費跟當地人的導覽團，結束後看喜好給小費",
    date:          "2026-07-12",
    category:      "TRAVEL",
    categoryLabel: "TRAVEL · TOOL",
    tags:          ["GuruWalk", "旅遊工具", "Free Walking Tour", "深度旅遊", "歐洲旅行", "導覽團"],
    excerpt:       "行程免費參加、結束後照你對導遊的喜好給小費。導覽語言和星等都標得清清楚楚，官網還有中文介面——而且台北、台中就有團，出國前可以先試跟一次",
    heroImage:     "/field-notes/guruwalk/cover.jpg",
    readingTime:   2,
    articleType:   "editorial-v2",
    triggerWord:   "guruwalk",
    commentPrompt: "你跟過哪個城市的導覽團？推薦嗎？",
  },

  // ── 旅行筆記（維也納 Griechenbeisl）──────────────────────────
  {
    slug:          "vienna-griechenbeisl",
    title:         "我現在最後悔的，就是以前吃飯的時候不夠白目",
    issue:         "002",
    subtitle:      "我只是在維也納吃個飯，卻意外走進一間藏滿名人簽名的五百年老餐廳",
    date:          "2026-07-12",
    category:      "TRAVEL",
    categoryLabel: "TRAVEL · VIENNA",
    tags:          ["維也納", "Vienna", "Griechenbeisl", "Mark Twain Room", "旅行筆記", "歐洲旅行", "Reels 拆解"],
    excerpt:       "吃到一半我突然想離開座位，在餐廳裡亂逛。服務人員沒有攔我，然後我就走進了一間整面牆都是簽名的房間——Mark Twain Room。正片影片、這間店的位置、五百年官方歷史的中文整理，全部都在這篇筆記",
    heroImage:     "/field-notes/griechenbeisl/wall-signatures.avif",
    heroVideos:    [
      { src: "/field-notes/griechenbeisl/hero-entrance.mp4", label: "FLEISCHMARKT 11" },
      { src: "/field-notes/griechenbeisl/hero-ceiling.mp4",  label: "MARK TWAIN ROOM" },
      { src: "/field-notes/griechenbeisl/hero-dining.mp4",   label: "GRIECHENBEISL" },
    ],
    readingTime:   8,
    articleType:   "editorial-v2",
    triggerWord:   "白目",
    commentPrompt: "你第一眼覺得照片裡的人是誰？",
  },

  // ── 編輯閱讀文章（後續陸續補充內容）────────────────────────────
  {
    slug:          "kino-iphone-guide",
    title:         "整趟歐洲，我沒帶相機",
    issue:         "001",
    subtitle:      "設定我都給你，剩下的，靠你自己走出去",
    date:          "2026-07-01",
    category:      "KINO",
    categoryLabel: "KINO · iPhone",
    tags:          ["Kino", "iPhone", "Apple Log", "旅行拍片", "歐洲旅行", "電影感", "手機拍片"],
    excerpt:       "那趟歐洲回來之後，我一直在想一件事。不是鏡頭、不是 App——是我到底是在拍什麼。這篇筆記記錄整趟旅行完整的拍攝邏輯：格式、焦段、曝光、色調，還有我怎麼思考畫面",
    heroImage:     "/field-notes/kino/hero-hallstatt.jpg",
    heroVideos:    [
      { src: "/field-notes/kino/videos/picks/vienna-night.mp4",   label: "WIEN 維也納" },
      { src: "/field-notes/kino/videos/picks/tram-dusk.mp4",      label: "PRAHA 布拉格" },
      { src: "/field-notes/kino/videos/picks/budapest-night.mp4", label: "BUDAPEST 布達佩斯" },
    ],
    readingTime:   7,
    articleType:   "editorial-v2",
    triggerWord:   "kino設定",
  },
];

export function getFieldNote(slug: string): FieldNote | undefined {
  return fieldNotes.find(n => n.slug === slug);
}

export function getRelatedNotes(slugs: string[]): FieldNote[] {
  return slugs.flatMap(s => {
    const n = fieldNotes.find(f => f.slug === s);
    return n ? [n] : [];
  });
}
