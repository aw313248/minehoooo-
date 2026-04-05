import type { Metadata } from "next";
import WorksClient from "@/components/WorksClient";

const SITE_URL = "https://minehoooo.xyz";

export const metadata: Metadata = {
  title: "Works — MINEH4O",
  description: "在地影像工作者 MINEH4O（賴明宏 Oscar Lai）影像作品集。Music Video、AIGC、短片紀錄。台中 MV 導演、攝影指導、調色。",
  keywords: ["台中 MV 導演作品集", "AIGC 影像製作案例", "在地影像工作者 MINEH4O", "台灣 MV 製作", "MV 攝影指導"],
  alternates: { canonical: `${SITE_URL}/works` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/works`,
    title: "Works — MINEH4O | 在地影像工作者",
    description: "台中 MV 導演・攝影指導・AIGC 影像製作。完整作品集。",
  },
};

export default function WorksPage() {
  return <WorksClient />;
}
