import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "影片作品 | MINEH4O — 賴明宏 Oscar Lai",
  description:
    "賴明宏 Oscar Lai (MINEH4O) 的影片作品集。包含音樂錄影帶、AI 混合製作、短片、商業廣告與活動影片。代表作：陳卓 愚人節、光與景三部曲、BRING ME YOUR LOVELY。",
  alternates: { canonical: "https://minehoooo.xyz" },
  openGraph: {
    title: "影片作品 — MINEH4O · 賴明宏 Oscar Lai",
    description: "音樂錄影帶 · AI 影像 · 短片 · 商業製作 · Taiwan Director & DP",
    url: "https://minehoooo.xyz/video",
  },
};

export default function VideoPage() {
  redirect("/");
}
