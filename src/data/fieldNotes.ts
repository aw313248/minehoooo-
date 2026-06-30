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
  subtitle?:     string;
  date:          string;        // ISO date "YYYY-MM-DD"
  category:      NoteCategory;
  categoryLabel: string;        // Display string, e.g. "AI · SEEDANCE", "KINO · iPhone"
  tags:          string[];
  excerpt:       string;
  heroImage:     string;        // path under /public
  readingTime:   number;        // in minutes
  articleType:   ArticleType;
  tool?:         string;        // only for "tool" articles
  triggerWord?:  string;        // IG/Threads bot keyword that links here
}

export const fieldNotes: FieldNote[] = [
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

  // ── 編輯閱讀文章（後續陸續補充內容）────────────────────────────
  {
    slug:          "kino-iphone-guide",
    title:         "Field Notes #001 | 我是怎麼用 iPhone 拍完整趟歐洲旅行的",
    subtitle:      "Kino 只是工具，你的眼睛才是主角",
    date:          "2026-07-01",
    category:      "KINO",
    categoryLabel: "KINO · iPhone",
    tags:          ["Kino", "iPhone", "Apple Log", "旅行拍片", "歐洲旅行", "電影感", "手機拍片"],
    excerpt:       "那趟歐洲回來之後，我一直在想一件事。不是鏡頭、不是 App——是我到底是在拍什麼。這篇筆記記錄整趟旅行完整的拍攝邏輯：格式、焦段、曝光、色調，還有我怎麼思考畫面",
    heroImage:     "/field-notes/kino/hero.jpg",
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
