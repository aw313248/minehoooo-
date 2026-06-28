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
  name:    string;   // romanized / English (大字)
  nameZh?: string;   // 中文城市名
  slug?:   string;   // future article slug — empty = coming soon
  year?:   string;
}

export type Block =
  | { type: "headline";   id: string;  text: string;   sub?: string }
  | { type: "text";       content: ReactNode }
  | { type: "callout";    content: ReactNode }
  | { type: "setup-card"; title?: string; badge?: string; rows: SetupItem[][] }
  | { type: "image";      item: ImageItem; frame?: "phone" | "wide" | "full" }
  | { type: "image-pair"; left: ImageItem; right: ImageItem; leftLabel?: string; rightLabel?: string }
  | { type: "compare";    before: ImageItem; after: ImageItem; title?: string }
  | { type: "video";      src?: string; placeholder?: string; frame?: "phone" | "wide" | "full"; caption?: string }
  | { type: "next-stop";  cities: NextStopCity[] }
  | { type: "oscar-notes"; content: ReactNode }
  | { type: "closing";    content: ReactNode }
  | { type: "faq";        items: { q: string; a: string }[] }
  | { type: "related";    slugs: string[] };
