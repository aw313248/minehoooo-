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
    default: "MINEH4O — 賴明宏 Oscar Lai | 陳卓 愚人節 MV 導演 · DP",
    template: "%s | MINEH4O",
  },
  description:
    "賴明宏 Oscar Lai（MINEH4O）— 陳卓《愚人節》《光與景三部曲》MV 導演 · 攝影師 · AIGC 創作。台灣台中影像創作者。作品：2026 TEDxNTHU、一千座山封面、明星賽紀實。",
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
    "台中 MV 導演", "台灣 MV 導演推薦", "MV 導演推薦",
    "陳卓 MV 導演", "陳卓 光與景三部曲 導演",
    "Oscar Lai director Taiwan", "minehoooo xyz",
    "AIGC 短片", "AI 影片創作", "AI Hybrid MV",
    "minehoooo instagram", "minehoooo.arw",
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
    videos: [
      {
        url: "https://www.youtube.com/embed/d9_EuYkmfzM",
        secureUrl: "https://www.youtube.com/embed/d9_EuYkmfzM",
        type: "text/html",
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MINEH4O — Oscar Lai | Director · DP",
    description: "台灣影像創作者 · 導演 · 攝影師 · AIGC 創作",
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
    name: "陳卓 Jon Chen 【愚人節（五週年紀念版）All Fool's Day (5th Anniversary Edition)】Official Music Video",
    description: "陳卓 Jon Chen 愚人節 ALL FOOL'S DAY 五週年紀念版音樂錄影帶 2026。導演 Director & DP: 賴明宏 Oscar Lai (MINEH4O)。April Fool's Day MV。",
    thumbnailUrl: "https://img.youtube.com/vi/d9_EuYkmfzM/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=d9_EuYkmfzM",
    embedUrl: "https://www.youtube.com/embed/d9_EuYkmfzM",
    url: "https://www.youtube.com/watch?v=d9_EuYkmfzM",
    uploadDate: "2026-04-01",
    duration: "PT4M12S",
    keywords: "愚人節,愚人節快樂,愚人節MV,ALL FOOL'S DAY,陳卓,Jon Chen,MV,音樂錄影帶,2026,Director,賴明宏,MINEH4O",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: ["MINEH4O", "賴明宏", "minehoooo"] },
    musicBy: { "@type": "MusicGroup", name: "陳卓 Jon Chen" },
    copyrightHolder: { "@type": "Person", name: "Oscar Lai", alternateName: "MINEH4O" },
    copyrightYear: 2026,
    productionCompany: { "@type": "Organization", name: "MINEH4O" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "陳卓 Jon Chen 《流鳴》Lumen (Official MV) 光與景三部曲｜之一",
    description: "陳卓 光與景三部曲 第一部《流鳴》Lumen Official MV。Director & DP: 賴明宏 Oscar Lai (MINEH4O)。",
    thumbnailUrl: "https://img.youtube.com/vi/erQ9lR_rNik/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=erQ9lR_rNik",
    embedUrl: "https://www.youtube.com/embed/erQ9lR_rNik",
    url: "https://www.youtube.com/watch?v=erQ9lR_rNik",
    uploadDate: "2023-10-01",
    duration: "PT3M45S",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
    musicBy: { "@type": "MusicGroup", name: "陳卓 Jon Chen" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "陳卓 Jon Chen 《光圈》Aperture (Official MV) 光與景三部曲｜之二",
    description: "陳卓 光與景三部曲 第二部《光圈》Aperture Official MV。Director & DP: 賴明宏 Oscar Lai (MINEH4O)。",
    thumbnailUrl: "https://img.youtube.com/vi/cIsS50e6YQ0/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=cIsS50e6YQ0",
    embedUrl: "https://www.youtube.com/embed/cIsS50e6YQ0",
    url: "https://www.youtube.com/watch?v=cIsS50e6YQ0",
    uploadDate: "2024-01-01",
    duration: "PT4M00S",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
    musicBy: { "@type": "MusicGroup", name: "陳卓 Jon Chen" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "陳卓 Jon Chen 《沒收》Deprived (Official MV) 光與景三部曲｜之三",
    description: "陳卓 光與景三部曲 第三部《沒收》Deprived Official MV。Director & DP: 賴明宏 Oscar Lai (MINEH4O)。",
    thumbnailUrl: "https://img.youtube.com/vi/sxrucEXI9-A/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=sxrucEXI9-A",
    embedUrl: "https://www.youtube.com/embed/sxrucEXI9-A",
    url: "https://www.youtube.com/watch?v=sxrucEXI9-A",
    uploadDate: "2024-04-01",
    duration: "PT4M10S",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
    musicBy: { "@type": "MusicGroup", name: "陳卓 Jon Chen" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Kolli (NN) - BRING ME YOUR LOVELY | AI Hybrid Music Video",
    description: "BRING ME YOUR LOVELY — AI Hybrid Music Video。Director, DP & AI: 賴明宏 Oscar Lai (MINEH4O)。",
    thumbnailUrl: "https://img.youtube.com/vi/eI1O_9jBHU0/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=eI1O_9jBHU0",
    embedUrl: "https://www.youtube.com/embed/eI1O_9jBHU0",
    url: "https://www.youtube.com/watch?v=eI1O_9jBHU0",
    uploadDate: "2025-03-01",
    duration: "PT3M30S",
    inLanguage: "en",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
    musicBy: { "@type": "MusicGroup", name: "Kolli (NN)" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "我把腦子裡的畫面做出來了 | AIGC Short Film",
    description: "賴明宏 Oscar Lai (MINEH4O) AIGC 短片創作。AI Generated Short Film using Midjourney, ComfyUI, Stable Diffusion.",
    thumbnailUrl: "https://img.youtube.com/vi/u5WaOT1m670/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=u5WaOT1m670",
    embedUrl: "https://www.youtube.com/embed/u5WaOT1m670",
    url: "https://www.youtube.com/watch?v=u5WaOT1m670",
    uploadDate: "2024-08-01",
    duration: "PT2M30S",
    inLanguage: "zh-TW",
    genre: "Short Film",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
  },
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Oscar Lai",
  givenName: "Ming-Hong",
  familyName: "Lai",
  alternateName: ["賴明宏", "MINEH4O", "minehoooo", "Oscar LAI"],
  url: SITE_URL,
  image: `${SITE_URL}/profile.png`,
  jobTitle: "Director · Director of Photography · Visual Producer",
  description:
    "台灣影像創作者，專注於音樂錄影帶導演、攝影及 AIGC 創作。Taiwan-based visual producer specializing in music videos, cinematography, and AI visual creation.",
  nationality: { "@type": "Country", name: "Taiwan" },
  homeLocation: {
    "@type": "Place",
    name: "Taichung, Taiwan",
    address: { "@type": "PostalAddress", addressLocality: "Taichung", addressCountry: "TW" },
  },
  knowsLanguage: ["zh-TW", "en"],
  hasOccupation: {
    "@type": "Occupation",
    name: "Film Director",
    occupationLocation: { "@type": "Country", name: "Taiwan" },
    skills: "Cinematography, Music Video Direction, AIGC, Color Grading, Photography, Screenplay",
  },
  sameAs: [
    "https://instagram.com/minehoooo",
    "https://instagram.com/minehoooo.arw",
    "https://instagram.com/mlpon6",
    "https://www.youtube.com/@BigCataw313248",
    "https://minehoooo.xyz",
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
    { "@type": "VideoObject", name: "愚人節 ALL FOOL'S DAY", description: "Music Video · 陳卓 Jon Chen 五週年紀念版 · Dir & DP", url: "https://www.youtube.com/watch?v=d9_EuYkmfzM" },
    { "@type": "VideoObject", name: "流鳴 LUMEN", description: "陳卓 光與景三部曲 Ⅰ · Music Video · Dir & DP", url: "https://www.youtube.com/watch?v=erQ9lR_rNik" },
    { "@type": "VideoObject", name: "BRING ME YOUR LOVELY", description: "Kolli (NN) · AI Hybrid Music Video · Dir & DP & AI", url: "https://www.youtube.com/watch?v=eI1O_9jBHU0" },
    { "@type": "CreativeWork", name: "一千座山一千條河", description: "Album Cover Design · 陳卓 Jon Chen", creator: { "@type": "Person", name: "Oscar Lai" } },
    { "@type": "CreativeWork", name: "2026 TEDxNTHU", description: "8 位講者演講紀錄 · Director · DP", creator: { "@type": "Person", name: "Oscar Lai" } },
    { "@type": "CreativeWork", name: "明星賽紀實：逐夢之路", description: "中華職棒明星賽紀錄片 · Taiwolf · Director · DP", creator: { "@type": "Person", name: "Oscar Lai" } },
  ],
  email: "minehoooo@gmail.com",
  contactPoint: {
    "@type": "ContactPoint",
    email: "minehoooo@gmail.com",
    contactType: "business inquiries",
    availableLanguage: ["zh-TW", "en"],
  },
  potentialAction: {
    "@type": "ContactAction",
    name: "聯絡合作 / Contact Oscar Lai",
    target: "mailto:minehoooo@gmail.com",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "MINEH4O — Oscar Lai Portfolio",
  alternateName: "MINEH4O",
  url: SITE_URL,
  description: "賴明宏 Oscar Lai 的影像作品集。MV 導演、攝影師、AIGC 創作。Taiwan-based Film Director & DP.",
  inLanguage: ["zh-TW", "en"],
  author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
  potentialAction: {
    "@type": "ViewAction",
    name: "查看作品集",
    target: SITE_URL,
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  name: "MINEH4O — 賴明宏 Oscar Lai Portfolio",
  url: SITE_URL,
  dateCreated: "2026-01-01",
  dateModified: "2026-04-04",
  inLanguage: ["zh-TW", "en"],
  isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
  about: { "@type": "Person", "@id": `${SITE_URL}/#person` },
  mainEntity: { "@type": "Person", "@id": `${SITE_URL}/#person` },
  description: "賴明宏 Oscar Lai（MINEH4O）的個人作品集網站。陳卓《愚人節》《光與景三部曲》MV 導演，台灣台中影像創作者。",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "陳卓愚人節MV是誰拍的？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "陳卓《愚人節 ALL FOOL'S DAY》五週年紀念版 MV 由台灣導演賴明宏 Oscar Lai（MINEH4O）擔任導演及攝影指導（Director & DP）。",
      },
    },
    {
      "@type": "Question",
      name: "MINEH4O 是誰？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MINEH4O 是台灣導演兼攝影師賴明宏（Oscar Lai）的創作筆名。主要作品包括陳卓《愚人節》《光與景三部曲》、TEDxNTHU 演講紀錄，以及多位音樂人的 MV 攝影及調色，現居台中。",
      },
    },
    {
      "@type": "Question",
      name: "賴明宏 Oscar Lai 拍過哪些音樂錄影帶？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "賴明宏 Oscar Lai（MINEH4O）代表作包括：陳卓《愚人節》《流鳴》《光圈》《沒收》光與景三部曲、Kolli (NN)《BRING ME YOUR LOVELY》AI Hybrid MV，以及多首台灣音樂人 MV 攝影與調色。",
      },
    },
    {
      "@type": "Question",
      name: "Oscar Lai 會拍 AIGC 影片嗎？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "是的，賴明宏 Oscar Lai 使用 Midjourney、ComfyUI、Stable Diffusion 等工具創作 AIGC 短片與 AI Hybrid MV，代表作為《BRING ME YOUR LOVELY》與《我把腦子裡的畫面做出來了》。",
      },
    },
    {
      "@type": "Question",
      name: "如何聯絡 MINEH4O 合作？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "可透過 Instagram @minehoooo 傳送私訊，或寄信至 minehoooo@gmail.com 與 Oscar Lai 討論合作提案。接受 Music Video、商業攝影、AIGC、活動紀錄等合作。",
      },
    },
    {
      "@type": "Question",
      name: "陳卓 光與景三部曲是誰導演的？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "陳卓《光與景三部曲》——《流鳴》《光圈》《沒收》三部 MV——均由台灣導演賴明宏 Oscar Lai（MINEH4O）擔任導演及攝影指導（Director & DP）。",
      },
    },
    {
      "@type": "Question",
      name: "台灣 MV 導演推薦？台中拍 MV 找誰？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "賴明宏 Oscar Lai（MINEH4O）是台灣台中的 MV 導演與攝影師，擅長音樂錄影帶導演、攝影、AIGC 混合影像等類型。代表作品為陳卓《愚人節》《光與景三部曲》。接洽請寄信至 minehoooo@gmail.com。",
      },
    },
    {
      "@type": "Question",
      name: "minehoooo 的 Instagram 是什麼？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "賴明宏 Oscar Lai（MINEH4O）的 Instagram 帳號為 @minehoooo（影像作品、導演日常）及 @minehoooo.arw（攝影作品集）。",
      },
    },
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
        {/* hreflang — bilingual site */}
        <link rel="alternate" hrefLang="zh-TW" href="https://minehoooo.xyz" />
        <link rel="alternate" hrefLang="en" href="https://minehoooo.xyz" />
        <link rel="alternate" hrefLang="x-default" href="https://minehoooo.xyz" />
        {/* rel="me" — identity verification for Google Knowledge Panel */}
        <link rel="me" href="https://instagram.com/minehoooo" />
        <link rel="me" href="https://instagram.com/minehoooo.arw" />
        <link rel="me" href="https://www.youtube.com/@BigCataw313248" />
        {/* Preload critical above-fold assets */}
        <link rel="preload" href="/profile.png" as="image" />
        {/* Preconnect external resources */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${geistSans.variable} ${spaceMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <Script id="person-ld" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <Script id="website-ld" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <Script id="profilepage-ld" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />
        <Script id="faq-ld" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        {videoJsonLd.map((v, i) => (
          <Script key={`video-ld-${i}`} id={`video-ld-${i}`} type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(v) }} />
        ))}
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NZ38PRQT44"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NZ38PRQT44');
          `}
        </Script>
        <IntroScreen />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
