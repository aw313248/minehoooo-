import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "現場筆記 / Field Notes",
  description:
    "Oscar 的影像工作筆記：從現場判斷、Raw 素材與失敗修正，到 AI 影像、旅行拍攝與最終成片。",
  alternates: { canonical: "/field-notes" },
  openGraph: {
    type: "website",
    url: "/field-notes",
    title: "現場筆記 / Field Notes | MINEH4O",
    description: "從現場判斷、Raw 素材與失敗修正，到最後成片。",
    images: [{ url: "/field-notes/social-cover.jpg", width: 1200, height: 630, alt: "MINEH4O Field Notes" }],
  },
};

export default function FieldNotesLayout({ children }: { children: ReactNode }) {
  return children;
}
