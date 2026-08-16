import type { Metadata, Viewport } from "next";
import { Geist, Readex_Pro, Space_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const readexPro = Readex_Pro({
  variable: "--font-readex",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const SITE_URL = "https://minehoooo.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MINEH4O — 賴明宏 Oscar Lai | Director · DP",
    template: "%s | MINEH4O",
  },
  description:
    "賴明宏 Oscar Lai（MINEH4O）— 台灣導演、攝影師與 AIGC 創作者。音樂錄影帶、商業影像、紀實與生成影像作品。",
  authors: [{ name: "Oscar Lai", url: SITE_URL }],
  creator: "Oscar Lai / MINEH4O",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    alternateLocale: ["en_US"],
    siteName: "MINEH4O",
    title: "MINEH4O — Oscar Lai",
    description: "Director · D.P. · AIGC Creator — Taichung, Taiwan",
    images: [
      {
        url: "/mineh4o-og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Oscar Lai — MINEH4O Director Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MINEH4O — Oscar Lai",
    description: "Director · D.P. · AIGC Creator — Taichung, Taiwan",
    creator: "@minehoooo.arw",
    images: ["/mineh4o-og-cover.jpg"],
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
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <body className={`${geistSans.variable} ${spaceMono.variable} ${readexPro.variable} antialiased`}>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NZ38PRQT44"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-NZ38PRQT44');`}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
