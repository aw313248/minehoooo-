import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "現場筆記 / Field Notes | MINEH4O",
  description:
    "Oscar 的影像工作筆記：Kino 設定、電影感色調、街拍思維、AI 工具實作。從拿起相機到輸出的完整過程。",
};

export default function FieldNotesLayout({ children }: { children: ReactNode }) {
  return children;
}
