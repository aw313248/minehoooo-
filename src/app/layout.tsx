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
    default: "MINEH4O — 賴明宏 Oscar Lai | Director · DP · Visual Producer",
    template: "%s | MINEH4O",
  },
  description:
    "賴明宏 Oscar Lai 的影像作品集。導演、攝影師、AIGC 創作者，專注於音樂錄影帶、劇情短片、商業攝影與 AI 影像創作。台灣・台中。",
  keywords: [
    "賴明宏", "Oscar Lai", "MINEH4O", "minehoooo",
    "導演", "攝影師", "Director", "Director of Photography", "DP",
    "Music Video", "MV", "音樂錄影帶",
    "AIGC", "AI影像", "AI動畫",
    "Visual Producer", "影像製作", "台灣導演", "台中導演",
    "陳卓 Jon Chen", "光與景三部曲",
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
    description: "台灣影像創作者 · 導演 · 攝影師 · AIGC 創作 · Taiwan Taichung",
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
        <IntroScreen />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
