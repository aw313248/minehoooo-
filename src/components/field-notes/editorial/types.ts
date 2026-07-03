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
  name:    string;
  nameZh?: string;
  slug?:   string;
  year?:   string;
}

export interface GalleryVideo {
  src:      string;
  caption?: string;
}

export interface SetupCardItem {
  value: string;
  label: string;
}

export type Block =
  | { type: "headline";      id: string; text: string; sub?: string }
  | { type: "text";          content: ReactNode }
  | { type: "callout";       content: ReactNode }
  // Setup: 16:9 cards row
  | { type: "setup-cards";   items: SetupCardItem[]; footer?: string }
  // CTA banner (hero / gallery)
  | { type: "cta";           message: string; cta: string; href: string; sub?: string }
  // Full phone screenshot in 16:9 with CSS zoom/crop to UI element
  | { type: "ui-crop";       src: string; alt?: string; objectPos?: string; label?: string; caption?: string }
  // Two ui-crops side by side
  | { type: "ui-crop-pair";
      left:  { src: string; alt?: string; objectPos?: string; label?: string };
      right: { src: string; alt?: string; objectPos?: string; label?: string };
      caption?: string }
  // Full image block
  | { type: "image";         item: ImageItem; frame?: "phone" | "wide" | "full" | "banner" }
  // Two images side by side (full-phone frames, kept for compatibility)
  | { type: "image-pair";    left: ImageItem; right: ImageItem; leftLabel?: string; rightLabel?: string }
  // Before/After compare — supports both image and video src
  | { type: "compare";       before: ImageItem; after: ImageItem; title?: string }
  // Autoplay video (hero background / placeholder)
  | { type: "video";         src?: string; placeholder?: string; frame?: "phone" | "wide" | "full"; caption?: string }
  // Lazy-load click-to-play video; sound: show an unmute toggle on autoplay videos
  | { type: "video-lazy";    src: string; caption?: string; aspectRatio?: string; maxWidth?: string; autoPlay?: boolean; sound?: boolean }
  // Travel gallery grid (auto-play muted, lazy)
  | { type: "travel-gallery"; items: GalleryVideo[] }
  // App recommendation card
  | { type: "app-rec";       name: string; tagline?: string; appStoreUrl: string; reason: string; website?: string; icon?: string }
  // Production flow strip — numbered steps with image/video thumbs (seedance-style)
  | { type: "flow-steps";    steps: { num: string; en: string; zh: string; thumb: string; thumbType: "image" | "video" }[] }
  | { type: "next-stop";     cities: NextStopCity[] }
  | { type: "oscar-notes";   content: ReactNode }
  | { type: "closing";       content: ReactNode }
  | { type: "prompt-copy";   text: string; label?: string }
  | { type: "faq";           items: { q: string; a: string }[] }
  | { type: "related";       slugs: string[] };
