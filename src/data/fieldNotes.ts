/**
 * Field Notes / 現場筆記 — Oscar 的影像工作筆記、AI 工具實作、Prompt 心法
 * 對應 SEO 引流策略：影片留言索取資料的入口都會導向這裡的文章
 */

export interface FieldNote {
  slug:       string;
  title:      string;
  subtitle?:  string;
  date:       string;        // ISO date like "2026-06-01"
  category:   string;        // e.g., "AI · SEEDANCE"
  excerpt:    string;
  heroImage:  string;        // path under /public
  triggerWord?: string;      // IG/Threads bot keyword that links here
}

export const fieldNotes: FieldNote[] = [
  {
    slug:        "seedance-aerial",
    title:       "用一張空拍照，生成電影級 AI 空拍鏡頭",
    subtitle:    "MINE 的 Seedance 實作筆記",
    date:        "2026-06-01",
    category:    "AI · SEEDANCE",
    excerpt:     "你只需要一張空拍遠景照，丟進 Seedance，配上對的 Prompt，就能生出一段平穩、有電影感的空拍運鏡。這是我們實際在用的完整流程。",
    heroImage:   "/field-notes/seedance-aerial-source.jpg",
    triggerWord: "飛天小女警",
  },
];

export function getFieldNote(slug: string): FieldNote | undefined {
  return fieldNotes.find(n => n.slug === slug);
}
