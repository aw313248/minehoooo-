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

export type Block =
  | { type: "headline";   id: string;  text: string;   sub?: string }
  | { type: "text";       content: ReactNode }
  | { type: "callout";    content: ReactNode }
  | { type: "setup-card"; title?: string; badge?: string; rows: SetupItem[][] }
  | { type: "image";      item: ImageItem; frame?: "phone" | "wide" | "full" }
  | { type: "image-pair"; left: ImageItem; right: ImageItem; leftLabel?: string; rightLabel?: string }
  | { type: "compare";    before: ImageItem; after: ImageItem; title?: string }
  | { type: "oscar-notes"; content: ReactNode }
  | { type: "closing";    content: ReactNode }
  | { type: "faq";        items: { q: string; a: string }[] }
  | { type: "related";    slugs: string[] };
