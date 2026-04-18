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
    // 新增作品關鍵字
    "梁承煜 MV", "梁承煜 我也是個人", "梁承煜 向前行吧",
    "Lil RAD Coy6oi MV", "Lil RAD 沒有你的世界", "Lil RAD 如果你不愛我", "Lil RAD 愛人這件事",
    "帝仰 tiang 記住你要快樂", "大樓DaLow 說了算", "中部管轄區 MV",
    "回收場的夏天", "Reclaim My Summer", "金穗獎", "公視學生劇展",
    "台灣 MV 攝影師", "MV 調色", "Color Grading Taiwan",
    "燈光師 台灣", "大樓DaLow Badass Dance",
    "TEDxNTHU 2025", "TEDxNTHU OOTB", "清大 TED 演講", "TEDx 清大 攝影",
    "中華職棒明星賽紀實", "Taiwolf 明星賽", "CPBL 明星賽 影片", "職棒紀錄片 台灣",
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
    uploadDate: "2026-04-01T00:00:00+08:00",
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
    uploadDate: "2023-07-30T00:00:00+08:00",
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
    uploadDate: "2024-01-01T00:00:00+08:00",
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
    uploadDate: "2024-04-01T00:00:00+08:00",
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
    uploadDate: "2025-03-01T00:00:00+08:00",
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
    name: "科技x藝術 = ∞可能性：王俊傑 | Chun-Chieh Wang | 2025 TEDxNTHU OOTB",
    description: "2025 TEDxNTHU OOTB 年會講者演講紀錄。導演、攝影指導 Director & DP: 賴明宏 Oscar Lai（MINEH4O）。8 位講者，完整年會影像紀錄。",
    thumbnailUrl: "https://img.youtube.com/vi/uU1hy2FK5D8/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=uU1hy2FK5D8",
    embedUrl: "https://www.youtube.com/embed/uU1hy2FK5D8",
    url: "https://www.youtube.com/watch?v=uU1hy2FK5D8",
    uploadDate: "2025-09-27T00:00:00+08:00",
    duration: "PT15M00S",
    inLanguage: "zh-TW",
    genre: "Documentary",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "2025中華明星賽＿精銳 Taiwolf | 中華職棒明星賽紀實",
    description: "2025 中華職棒明星賽紀實影片《精銳》，Taiwolf 委製。導演、攝影指導 Director & DP: 賴明宏 Oscar Lai（MINEH4O）。",
    thumbnailUrl: "https://img.youtube.com/vi/bKl5uW-69iQ/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=bKl5uW-69iQ",
    embedUrl: "https://www.youtube.com/embed/bKl5uW-69iQ",
    url: "https://www.youtube.com/watch?v=bKl5uW-69iQ",
    uploadDate: "2025-07-25T00:00:00+08:00",
    duration: "PT5M00S",
    inLanguage: "zh-TW",
    genre: "Documentary",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "大樓DaLow -【Badass Dance】ft.Aiken (Official Music Video)",
    description: "大樓DaLow《Badass Dance》ft. Aiken 官方 MV。調色 Color: 賴明宏 Oscar Lai（MINEH4O）。",
    thumbnailUrl: "https://img.youtube.com/vi/J-BIhdj-4oM/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=J-BIhdj-4oM",
    embedUrl: "https://www.youtube.com/embed/J-BIhdj-4oM",
    url: "https://www.youtube.com/watch?v=J-BIhdj-4oM",
    uploadDate: "2024-01-01T00:00:00+08:00",
    duration: "PT3M00S",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    musicBy: { "@type": "MusicGroup", name: "大樓DaLow" },
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
    uploadDate: "2024-08-01T00:00:00+08:00",
    duration: "PT2M30S",
    inLanguage: "zh-TW",
    genre: "Short Film",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "梁承煜【我也是個人 It hurts】Official Music MV",
    description: "梁承煜《我也是個人 It hurts》官方 MV。導演、剪輯、調色 Director / Edit / Color: 賴明宏 Oscar Lai（MINEH4O）。",
    thumbnailUrl: "https://img.youtube.com/vi/xKo8NW2mBso/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=xKo8NW2mBso",
    embedUrl: "https://www.youtube.com/embed/xKo8NW2mBso",
    url: "https://www.youtube.com/watch?v=xKo8NW2mBso",
    uploadDate: "2021-01-01T00:00:00+08:00",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
    musicBy: { "@type": "MusicGroup", name: "梁承煜" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "梁承煜【向前行吧 Go ahead】Official Music MV",
    description: "梁承煜《向前行吧 Go ahead》官方 MV。導演、攝影 Director & DP: 賴明宏 Oscar Lai（MINEH4O）。",
    thumbnailUrl: "https://img.youtube.com/vi/jLLNkQod8pg/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=jLLNkQod8pg",
    embedUrl: "https://www.youtube.com/embed/jLLNkQod8pg",
    url: "https://www.youtube.com/watch?v=jLLNkQod8pg",
    uploadDate: "2021-01-01T00:00:00+08:00",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
    musicBy: { "@type": "MusicGroup", name: "梁承煜" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Lil RAD & Coy6oi - 沒有你的世界 World Without Ü (Official Music Video)",
    description: "Lil RAD & Coy6oi《沒有你的世界》官方 MV。DP & Color: 賴明宏 Oscar Lai（MINEH4O）。",
    thumbnailUrl: "https://img.youtube.com/vi/XJSI9s3-wk0/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=XJSI9s3-wk0",
    embedUrl: "https://www.youtube.com/embed/XJSI9s3-wk0",
    url: "https://www.youtube.com/watch?v=XJSI9s3-wk0",
    uploadDate: "2024-07-19T00:00:00+08:00",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    musicBy: { "@type": "MusicGroup", name: "Lil RAD & Coy6oi" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Lil RAD & Coy6oi - 如果你不愛我 Love Me Not (Official Music Video)",
    description: "Lil RAD & Coy6oi《如果你不愛我 Love Me Not》官方 MV。DP: 賴明宏 Oscar Lai（MINEH4O）。",
    thumbnailUrl: "https://img.youtube.com/vi/mdwoUFCe9Kk/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=mdwoUFCe9Kk",
    embedUrl: "https://www.youtube.com/embed/mdwoUFCe9Kk",
    url: "https://www.youtube.com/watch?v=mdwoUFCe9Kk",
    uploadDate: "2025-08-27T00:00:00+08:00",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    musicBy: { "@type": "MusicGroup", name: "Lil RAD & Coy6oi" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Lil RAD & Coy6oi - 愛人這件事 Loving After All (Official Music Video)",
    description: "Lil RAD & Coy6oi《愛人這件事 Loving After All》官方 MV。DP & Color: 賴明宏 Oscar Lai（MINEH4O）。",
    thumbnailUrl: "https://img.youtube.com/vi/GCDxrVigSfw/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=GCDxrVigSfw",
    embedUrl: "https://www.youtube.com/embed/GCDxrVigSfw",
    url: "https://www.youtube.com/watch?v=GCDxrVigSfw",
    uploadDate: "2025-07-26T00:00:00+08:00",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    musicBy: { "@type": "MusicGroup", name: "Lil RAD & Coy6oi" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "帝仰 tiang【記住你要快樂】Official Music MV",
    description: "帝仰 tiang《記住你要快樂》官方 MV。導演、調色 Director & Color: 賴明宏 Oscar Lai（MINEH4O）。",
    thumbnailUrl: "https://img.youtube.com/vi/kL8_Sk0JmKM/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=kL8_Sk0JmKM",
    embedUrl: "https://www.youtube.com/embed/kL8_Sk0JmKM",
    url: "https://www.youtube.com/watch?v=kL8_Sk0JmKM",
    uploadDate: "2024-01-01T00:00:00+08:00",
    inLanguage: "zh-TW",
    genre: "Music Video",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Oscar Lai", alternateName: "MINEH4O" },
    musicBy: { "@type": "MusicGroup", name: "帝仰 tiang" },
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "回收場的夏天 Reclaim My Summer — 公視學生劇展短片（預告）",
    description: "公視學生劇展短片《回收場的夏天 Reclaim My Summer》預告。攝影助理 Camera Assistant: 賴明宏 Oscar Lai（MINEH4O）。第46屆金穗獎最佳劇情片、第58屆金鐘獎入圍。",
    thumbnailUrl: "https://img.youtube.com/vi/RsPI2V_RQus/maxresdefault.jpg",
    contentUrl: "https://www.youtube.com/watch?v=RsPI2V_RQus",
    embedUrl: "https://www.youtube.com/embed/RsPI2V_RQus",
    url: "https://www.youtube.com/watch?v=RsPI2V_RQus",
    uploadDate: "2023-01-01T00:00:00+08:00",
    inLanguage: "zh-TW",
    genre: "Short Film",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    award: "第46屆金穗獎最佳劇情片、第58屆金鐘獎入圍",
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
    { "@type": "VideoObject", name: "梁承煜 我也是個人", description: "Music Video · Dir & Edit & Color", url: "https://www.youtube.com/watch?v=xKo8NW2mBso" },
    { "@type": "VideoObject", name: "Lil RAD & Coy6oi 沒有你的世界", description: "Music Video · DP & Color", url: "https://www.youtube.com/watch?v=XJSI9s3-wk0" },
    { "@type": "VideoObject", name: "帝仰 tiang 記住你要快樂", description: "Music Video · Dir & Color", url: "https://www.youtube.com/watch?v=kL8_Sk0JmKM" },
    { "@type": "VideoObject", name: "回收場的夏天 Reclaim My Summer", description: "公視短片 · 金穗獎最佳劇情片 · Camera Assistant", url: "https://www.youtube.com/watch?v=RsPI2V_RQus" },
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
  dateCreated: "2026-01-01T00:00:00+08:00",
  dateModified: "2026-04-06T00:00:00+08:00",
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
      name: "梁承煜 MV 是誰拍的？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "梁承煜《我也是個人》《向前行吧》兩支 MV 均由台灣導演賴明宏 Oscar Lai（MINEH4O）執導。《我也是個人》由 Oscar Lai 擔任導演、剪輯及調色；《向前行吧》由 Oscar Lai 擔任導演及攝影指導（DP）。",
      },
    },
    {
      "@type": "Question",
      name: "Lil RAD Coy6oi MV 是誰拍的？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lil RAD & Coy6oi《沒有你的世界》《如果你不愛我》《愛人這件事》三支 MV 的攝影及調色均由賴明宏 Oscar Lai（MINEH4O）擔任。",
      },
    },
    {
      "@type": "Question",
      name: "帝仰 tiang 記住你要快樂 MV 導演是誰？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "帝仰 tiang《記住你要快樂》MV 由台灣導演賴明宏 Oscar Lai（MINEH4O）擔任導演及調色。",
      },
    },
    {
      "@type": "Question",
      name: "回收場的夏天是誰拍的？金穗獎短片",
      acceptedAnswer: {
        "@type": "Answer",
        text: "《回收場的夏天 Reclaim My Summer》是公視學生劇展短片，榮獲第46屆金穗獎最佳劇情片及第58屆金鐘獎入圍。賴明宏 Oscar Lai（MINEH4O）於本片擔任攝影助理（Camera Assistant）。",
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
