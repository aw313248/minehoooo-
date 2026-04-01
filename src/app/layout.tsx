import type { Metadata } from "next";
import { Geist, Space_Mono, Bebas_Neue } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import IntroScreen from "@/components/IntroScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const SITE_URL = "https://minehoooo.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MINEH4O — 賴明宏 Oscar Lai | 陳卓 愚人節 ALL FOOL'S DAY MV Director · DP",
    template: "%s | MINEH4O",
  },
  description:
    "陳卓 Jon Chen《愚人節 ALL FOOL'S DAY》五週年紀念版音樂錄影帶導演 賴明宏 Oscar Lai 的影像作品集。MV 導演、攝影師、AIGC 創作，代表作：愚人節 MV、光與景三部曲、一千座山封面設計、2026 TEDxNTHU。台灣・台中。",
  keywords: [
    "賴明宏", "Oscar Lai", "MINEH4O", "minehoooo",
    "導演", "攝影師", "Director", "Director of Photography", "DP",
    "Music Video", "MV", "音樂錄影帶",
    "AIGC", "AI影像", "AI動畫",
    "Visual Producer", "影像製作", "台灣導演", "台中導演",
    "陳卓 Jon Chen", "光與景三部曲",
    "愚人節", "愚人節快樂", "愚人節 MV", "愚人節 ALL FOOL'S DAY", "愚人節MV 2026",
    "陳卓一千座山", "一千座山一千條河",
    "Album Cover Design", "專輯封面設計",
    "TEDxNTHU", "TEDx清大", "2026 TEDxNTHU",
    "中華職棒明星賽", "Taiwolf", "明星賽紀實",
    "婚攝", "婚禮攝影", "Wedding Photography",
    "Editorial Photography", "人像攝影", "商業攝影",
    "petit", "Probeer", "PARK2",
    "Portrait Photography", "台灣攝影師",
    "Portfolio", "作品集",
  ],
  authors: [{ name: "Oscar Lai", url: SITE_URL }],
  creator: "Oscar Lai / MINEH4O",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "MINEH4O — Portfolio",
    title: "MINEH4O — 賴明宏 Oscar Lai | Director · DP",
    description: "台灣影像創作者 · 導演 · 攝影師 · 封面設計 · AIGC 創作 · 陳卓 愚人節 MV · TEDxNTHU · Taiwan Taichung",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MINEH4O — Oscar Lai Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MINEH4O — Oscar Lai | Director · DP",
    description: "台灣影像創作者 · 導演 · 攝影師 · AIGC 創作",
    images: ["/og-image.png"],
    creator: "@minehoooo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const videoJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "愚人節 ALL FOOL'S DAY — 陳卓 Jon Chen | Official Music Video 五週年紀念版",
    description: "陳卓 Jon Chen 愚人節 ALL FOOL'S DAY 五週年紀念版音樂錄影帶 2026。導演 Director & DP: 賴明宏 Oscar Lai (MINEH4O)。April Fool's Day MV。",
    thumbnailUrl: "https://img.youtube.com/vi/d9_EuYkmfzM/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/d9_EuYkmfzM",
    url: "https://www.youtube.com/watch?v=d9_EuYkmfzM",
    keywords: "愚人節,愚人節快樂,愚人節MV,ALL FOOL'S DAY,陳卓,Jon Chen,MV,音樂錄影帶,2026,Director,賴明宏,MINEH4O",
    director: { "@type": "Person", name: "Oscar Lai", alternateName: ["MINEH4O", "賴明宏", "minehoooo"] },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "流明 LUMEN — 陳卓 Jon Chen | Official Music Video (光與景三部曲 Ⅰ)",
    description: "陳卓 光與景三部曲 第一部 流明 LUMEN。Director & DP: 賴明宏 Oscar Lai (MINEH4O)。",
    thumbnailUrl: `https://img.youtube.com/vi/erQ9lR_rNik/maxresdefault.jpg`,
    embedUrl: "https://www.youtube.com/embed/erQ9lR_rNik",
    url: "https://www.youtube.com/watch?v=erQ9lR_rNik",
    director: { "@type": "Person", name: "Oscar Lai", alternateName: "MINEH4O" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "BRING ME YOUR LOVELY — Kolli (NN) | Music Video AI Hybrid",
    description: "BRING ME YOUR LOVELY — AI Hybrid Music Video。Director, DP & AI: 賴明宏 Oscar Lai (MINEH4O)。",
    thumbnailUrl: `https://img.youtube.com/vi/eI1O_9jBHU0/maxresdefault.jpg`,
    embedUrl: "https://www.youtube.com/embed/eI1O_9jBHU0",
    url: "https://www.youtube.com/watch?v=eI1O_9jBHU0",
    director: { "@type": "Person", name: "Oscar Lai", alternateName: "MINEH4O" },
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oscar Lai",
  alternateName: ["賴明宏", "MINEH4O", "minehoooo"],
  url: SITE_URL,
  image: `${SITE_URL}/profile.png`,
  jobTitle: "Director · Director of Photography · Visual Producer",
  description:
    "台灣影像創作者，專注於音樂錄影帶導演、攝影及 AIGC 創作。Taiwan-based visual producer specializing in music videos, cinematography, and AI visual creation.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Taichung",
    addressCountry: "TW",
  },
  sameAs: [
    "https://instagram.com/minehoooo",
    "https://instagram.com/minehoooo.arw",
    "https://instagram.com/mlpon6",
  ],
  knowsAbout: [
    "Film Direction", "Cinematography", "Music Video Production",
    "AIGC", "AI Video Generation", "Color Grading",
    "Photography", "Screenplay Writing",
    "Album Cover Design", "Editorial Photography",
    "Wedding Photography", "TEDx Event Coverage",
    "Sports Documentary", "Portrait Photography",
  ],
  workExample: [
    { "@type": "CreativeWork", name: "愚人節 ALL FOOL'S DAY", description: "Music Video · 陳卓 Jon Chen 五週年紀念版", creator: { "@type": "Person", name: "Oscar Lai" } },
    { "@type": "CreativeWork", name: "陳卓 光與景三部曲", description: "Music Video Series · Director · DP", creator: { "@type": "Person", name: "Oscar Lai" } },
    { "@type": "CreativeWork", name: "一千座山一千條河", description: "Album Cover Design · 陳卓 Jon Chen", creator: { "@type": "Person", name: "Oscar Lai" } },
    { "@type": "CreativeWork", name: "2026 TEDxNTHU", description: "8 位講者演講紀錄 · Director · DP", creator: { "@type": "Person", name: "Oscar Lai" } },
    { "@type": "CreativeWork", name: "明星賽紀實：逐夢之路", description: "中華職棒明星賽紀錄片 · Taiwolf · Director · DP", creator: { "@type": "Person", name: "Oscar Lai" } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
      </head>
      <body
        className={`${geistSans.variable} ${spaceMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {videoJsonLd.map((v, i) => (
          <Script
            key={`video-ld-${i}`}
            id={`video-ld-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(v) }}
          />
        ))}
        <IntroScreen />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
