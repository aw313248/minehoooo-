/**
 * 台灣機車環島 Roadbook — 現場使用中的互動頁
 * 資料唯一來源：Notion（server 端讀取，60 秒 revalidate）
 * 此路徑為靜態資料夾路由，優先於 [slug] 動態路由；不影響其他 Field Notes
 */
import type { Metadata } from "next";
import Link from "next/link";
import ScrollUnlock from "@/components/ScrollUnlock";
import { getRoadbook } from "@/lib/roadbook";
import RoadbookView from "./RoadbookView";

export const revalidate = 60;

const SITE_URL = "https://minehoooo.xyz";

export const metadata: Metadata = {
  title: "台灣機車環島 Roadbook | MINEH4O 現場筆記",
  description:
    "七天六夜逆時針機車環島 — 行程、導航、目前位置與現場更新都集中在這裡，路上即時同步",
  alternates: { canonical: `${SITE_URL}/field-notes/taiwan-roadbook` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/field-notes/taiwan-roadbook`,
    title: "台灣機車環島 Roadbook",
    description: "七天六夜逆時針機車環島 — 現場使用中的互動 Roadbook",
    images: [{ url: "/field-notes/taiwan-roadbook/cover.jpg", width: 1200, height: 630 }],
    siteName: "MINEH4O 現場筆記",
  },
  twitter: { card: "summary_large_image" },
};

export default async function TaiwanRoadbookPage() {
  const data = await getRoadbook();

  return (
    <main className="min-h-screen bg-black text-white relative rb-root" style={{ overflowY: "auto" }}>
      <ScrollUnlock />

      {/* 與 Field Notes 同款 grain（頁面自帶，不動全站） */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.04,
          mixBlendMode: "screen",
        }}
      />

      {/* 頂欄 */}
      <header className="rb-nav">
        <Link href="/field-notes" className="rb-back">← Field Notes</Link>
        <span className="rb-crumb">TRAVEL · TAIWAN · LIVE</span>
        <a href="https://www.instagram.com/minehoooo.arw/" target="_blank" rel="noopener noreferrer" className="rb-ig">@minehoooo.arw</a>
      </header>

      {/* 標題 */}
      <div className="rb-mast">
        <p className="rb-eyebrow">LIVE ROADBOOK</p>
        <h1 className="rb-h1">台灣機車環島 Roadbook</h1>
        <p className="rb-sub">七天六夜・逆時針・行程與位置在路上即時更新</p>
      </div>

      <div className="rb-body">
        <RoadbookView data={data} />
      </div>

      <footer className="rb-foot">
        <span>© MINEH4O.ARW</span>
        <span>資料來源：Notion Roadbook・約 1 分鐘同步</span>
      </footer>

      {/* Roadbook 專用樣式（不影響全站） */}
      <style>{`
        .rb-root { font-family: var(--font-readex), sans-serif; }
        .rb-nav { position: sticky; top: 0; z-index: 40; display: flex; align-items: center; gap: 14px; padding: 14px 18px; background: rgba(10,10,12,0.85); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .rb-back { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(255,255,255,0.6); text-decoration: none; }
        .rb-back:hover { color: rgba(255,255,255,0.95); }
        .rb-crumb { flex: 1; font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.3em; color: rgba(255,225,140,0.6); }
        .rb-ig { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.2em; color: rgba(255,225,140,0.75); text-decoration: none; border: 1px solid rgba(255,225,140,0.22); border-radius: 3px; padding: 4px 8px; }
        .rb-mast { max-width: 720px; margin: 0 auto; padding: 40px 18px 8px; }
        .rb-eyebrow { display: inline-block; font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.4em; color: #0a0a0a; background: rgba(255,225,140,0.95); border-radius: 3px; padding: 4px 9px; margin: 0 0 14px; animation: rbPulse 2.4s ease-in-out infinite; }
        @keyframes rbPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.72; } }
        .rb-h1 { font-size: clamp(28px, 7vw, 44px); font-weight: 600; letter-spacing: -0.02em; color: rgba(255,255,255,0.97); margin: 0 0 8px; line-height: 1.15; }
        .rb-sub { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.5); margin: 0; }
        .rb-body { max-width: 720px; margin: 0 auto; padding: 18px 18px 60px; }
        .rb-foot { max-width: 720px; margin: 0 auto; padding: 18px; display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.07); font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.2em; color: rgba(255,255,255,0.32); }

        .rb-hero { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,225,140,0.2); border-radius: 14px; padding: 18px; margin: 14px 0 18px; }
        .rb-hero-day { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
        .rb-hero-daynum { font-family: var(--font-space-mono),monospace; font-size: clamp(26px,6vw,38px); font-weight: 700; letter-spacing: 0.08em; color: rgba(255,225,140,0.95); }
        .rb-hero-route { font-size: 14px; color: rgba(255,255,255,0.75); }
        .rb-hero-stats { display: flex; flex-direction: column; gap: 5px; margin-top: 10px; }
        .rb-stat { font-family: var(--font-space-mono),monospace; font-size: 10.5px; letter-spacing: 0.1em; color: rgba(255,255,255,0.55); }
        .rb-stat b { color: rgba(255,255,255,0.9); }
        .rb-stat-now { color: rgba(140,220,160,0.95); font-size: 12px; }
        .rb-refresh { margin-top: 14px; font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.2em; color: rgba(255,225,140,0.9); background: none; border: 1px solid rgba(255,225,140,0.3); border-radius: 999px; padding: 9px 16px; cursor: pointer; }
        .rb-refresh:disabled { opacity: 0.5; }

        .rb-days { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 6px; scrollbar-width: none; }
        .rb-days::-webkit-scrollbar { display: none; }
        .rb-day-tab { position: relative; flex-shrink: 0; font-family: var(--font-space-mono),monospace; font-size: 10.5px; letter-spacing: 0.12em; color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; padding: 8px 14px; cursor: pointer; }
        .rb-day-tab[data-active="true"] { color: #0a0a0a; background: rgba(255,225,140,0.95); border-color: rgba(255,225,140,0.95); font-weight: 700; }
        .rb-day-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: rgba(140,220,160,1); margin-left: 6px; animation: rbPulse 1.6s infinite; }

        .rb-tl { margin-top: 10px; }
        .rb-empty { font-size: 13px; color: rgba(255,255,255,0.4); padding: 20px 0; }
        .rb-stop { display: flex; gap: 12px; }
        .rb-stop-rail { display: flex; flex-direction: column; align-items: center; width: 14px; flex-shrink: 0; padding-top: 22px; }
        .rb-stop-dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(255,225,140,0.9); }
        .rb-stop[data-status="done"] .rb-stop-dot { background: rgba(255,225,140,1); box-shadow: 0 0 8px rgba(255,225,140,0.7); }
        .rb-stop[data-status="here"] .rb-stop-dot, .rb-stop[data-current="true"] .rb-stop-dot { background: rgba(140,220,160,1); animation: rbBreathe 1.8s ease-in-out infinite; }
        .rb-stop[data-status="maybe"] .rb-stop-dot { background: transparent; border: 2px solid rgba(255,255,255,0.4); }
        @keyframes rbBreathe { 0%,100% { box-shadow: 0 0 0 0 rgba(140,220,160,0.5);} 50% { box-shadow: 0 0 0 8px rgba(140,220,160,0);} }
        .rb-stop-body { flex: 1; min-width: 0; padding: 14px 0 18px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .rb-stop[data-status="done"] .rb-stop-body { opacity: 0.55; }
        .rb-stop[data-status="maybe"] .rb-stop-body { opacity: 0.75; }
        .rb-stop-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .rb-stop-time { font-family: var(--font-space-mono),monospace; font-size: 11px; letter-spacing: 0.1em; color: rgba(255,225,140,0.9); }
        .rb-stop-cat { font-size: 11px; color: rgba(255,255,255,0.5); }
        .rb-badge { font-family: var(--font-space-mono),monospace; font-size: 8px; letter-spacing: 0.2em; border-radius: 3px; padding: 2px 6px; border: 1px solid; }
        .rb-badge-ok { color: rgba(255,255,255,0.6); border-color: rgba(255,255,255,0.2); }
        .rb-badge-maybe { color: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.25); border-style: dashed; }
        .rb-badge-planb { color: rgba(255,170,90,0.95); border-color: rgba(255,170,90,0.45); }
        .rb-badge-here { color: rgba(140,220,160,0.95); border-color: rgba(140,220,160,0.45); }
        .rb-badge-done { color: rgba(255,225,140,0.9); border-color: rgba(255,225,140,0.4); }
        .rb-badge-now { color: #0a0a0a; background: rgba(140,220,160,0.95); border-color: rgba(140,220,160,0.95); font-weight: 700; }
        .rb-stop-name { font-size: 17px; font-weight: 600; color: rgba(255,255,255,0.94); margin: 7px 0 0; }
        .rb-stop[data-status="done"] .rb-stop-name { text-decoration: line-through; text-decoration-color: rgba(255,225,140,0.5); }
        .rb-stop-addr { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.45); margin: 3px 0 0; }
        .rb-stop-note { font-size: 12.5px; font-weight: 300; color: rgba(255,255,255,0.55); margin: 6px 0 0; line-height: 1.6; }
        .rb-stop-map { display: inline-block; margin-top: 10px; font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.2em; color: rgba(255,225,140,0.9); text-decoration: none; border: 1px solid rgba(255,225,140,0.3); border-radius: 5px; padding: 8px 13px; }

        .rb-sec { margin-top: 30px; }
        .rb-sec-t { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(255,225,140,0.75); margin: 0 0 12px; }
        .rb-seg { margin-top: 24px; }
        .rb-seg-btn { display: block; font-size: 14px; color: rgba(255,255,255,0.85); text-decoration: none; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 13px 16px; margin-bottom: 8px; }
        .rb-planb { margin-top: 26px; background: rgba(255,170,90,0.05); border: 1px solid rgba(255,170,90,0.25); border-radius: 12px; padding: 16px; }
        .rb-planb-hint { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.5); margin: 0 0 10px; }
        .rb-planb-item { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; padding: 8px 0; border-top: 1px solid rgba(255,170,90,0.15); }
        .rb-planb-name { font-size: 14.5px; font-weight: 500; color: rgba(255,255,255,0.9); }
        .rb-planb-note { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.5); }

        .rb-map { position: relative; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.09); border-radius: 12px; padding: 18px; display: flex; justify-content: center; }
        .rb-map-svg { width: min(58vw, 250px); height: auto; }
        .rb-map-island { fill: rgba(255,255,255,0.05); stroke: rgba(255,225,140,0.4); stroke-width: 1.5; }
        .rb-map-lbl { font-size: 9px; fill: rgba(255,255,255,0.7); }
        .rb-dot-ok { fill: rgba(255,255,255,0.85); }
        .rb-dot-done { fill: rgba(255,225,140,1); }
        .rb-dot-here { fill: rgba(140,220,160,1); }
        .rb-dot-maybe { fill: transparent; stroke: rgba(255,255,255,0.6); stroke-width: 1.5; }
        .rb-dot-planb { fill: rgba(255,170,90,0.5); }
        .rb-map-empty { position: absolute; inset: auto 18px 14px; font-size: 11.5px; font-weight: 300; color: rgba(255,255,255,0.4); text-align: center; margin: 0; }

        .rb-gear { display: flex; gap: 8px; flex-wrap: wrap; }
        .rb-gear-item { font-family: var(--font-space-mono),monospace; font-size: 10.5px; letter-spacing: 0.1em; color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; padding: 8px 14px; }

        .rb-cl-group { margin-bottom: 16px; }
        .rb-cl-title { font-size: 12.5px; font-weight: 500; color: rgba(255,255,255,0.75); margin: 0 0 6px; }
        .rb-cl-item { display: flex; align-items: center; gap: 10px; width: 100%; background: none; border: none; padding: 8px 0; cursor: pointer; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .rb-cl-box { width: 20px; height: 20px; flex-shrink: 0; border: 1.5px solid rgba(255,225,140,0.5); border-radius: 6px; color: #0a0a0a; background: transparent; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; }
        .rb-cl-item[data-on="true"] .rb-cl-box { background: rgba(255,225,140,0.95); border-color: rgba(255,225,140,0.95); }
        .rb-cl-txt { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.8); }
        .rb-cl-item[data-on="true"] .rb-cl-txt { color: rgba(255,255,255,0.4); text-decoration: line-through; }
        .rb-cl-note { font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.35); margin: 4px 0 0; }

        .rb-error { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,225,140,0.25); border-radius: 14px; padding: 26px 20px; margin-top: 16px; }
        .rb-error-t { font-size: 17px; font-weight: 600; color: rgba(255,255,255,0.92); margin: 0 0 8px; }
        .rb-error-s { font-size: 13.5px; font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.8; margin: 0 0 6px; }
      `}</style>
    </main>
  );
}
