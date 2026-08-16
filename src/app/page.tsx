import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import HomeExperience from "@/components/home/HomeExperience";
import HomeStructuredData from "@/components/seo/HomeStructuredData";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "zh-TW": "/",
      en: "/",
      "x-default": "/",
    },
  },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <div className={bebasNeue.variable}>
      <HomeStructuredData />
      <HomeExperience />
    </div>
  );
}
