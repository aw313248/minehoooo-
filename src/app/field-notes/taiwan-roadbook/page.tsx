/**
 * 台灣機車環島 Roadbook — 現場使用中的 LIVE Field Note
 * 資料唯一來源：Notion（server 端讀取，60 秒 revalidate）
 * 此路徑為靜態資料夾路由，優先於 [slug] 動態路由；不影響其他 Field Notes
 * 視覺：call sheet／公路電影 opening title；樣式全部限定在 .rb-root 底下
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
    "七天六夜逆時針機車環島 — 行程、導航、目前位置與現場更新都集中在這裡，有更新就同步",
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
    <main className="min-h-screen relative rb-root" style={{ overflowY: "auto" }}>
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

      {/* 頂欄 — 細、不搶畫面 */}
      <header className="rb-nav">
        <Link href="/field-notes" className="rb-nav-a">← FIELD NOTES</Link>
        <a href="https://www.instagram.com/minehoooo.arw/" target="_blank" rel="noopener noreferrer" className="rb-nav-a">@MINEHOOOO.ARW</a>
      </header>

      <div className="rb-body">
        <RoadbookView data={data} />
      </div>

      <footer className="rb-foot">
        <span>© MINEH4O.ARW</span>
        <span>資料同步自 NOTION</span>
      </footer>

      {/* Roadbook 專用樣式（全部限定 .rb-root，不影響全站） */}
      <style>{`
        .rb-root {
          background: #050505;
          color: #F2F0EA;
          font-family: var(--font-readex), sans-serif;
          --rb-fg: #F2F0EA;
          --rb-dim: rgba(242,240,234,.62);
          --rb-faint: rgba(242,240,234,.42);
          --rb-acc: #E3C66B;
          --rb-now: #88C999;
          --rb-planb: #C98752;
          --rb-line: rgba(255,255,255,.08);
          --rb-mono: var(--font-space-mono), monospace;
        }

        /* ── 頂欄 ── */
        .rb-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 22px; }
        .rb-nav-a { font-family: var(--rb-mono); font-size: 10px; letter-spacing: .26em; color: var(--rb-dim); text-decoration: none; }
        .rb-nav-a:hover { color: var(--rb-fg); }

        .rb-body { max-width: 680px; margin: 0 auto; padding: 0 22px 80px; position: relative; z-index: 1; }
        .rb-foot { max-width: 680px; margin: 0 auto; padding: 22px; display: flex; justify-content: space-between; border-top: 1px solid var(--rb-line); font-family: var(--rb-mono); font-size: 9px; letter-spacing: .24em; color: var(--rb-faint); }

        /* ── Apple glass 基底 ── */
        .rb-glass { background: rgba(255,255,255,.03);
          backdrop-filter: blur(22px) saturate(1.5); -webkit-backdrop-filter: blur(22px) saturate(1.5);
          border: 1px solid rgba(255,255,255,.10); border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08); }

        /* ── 首屏：opening title ── */
        .rb-hero { min-height: 52vh; display: flex; flex-direction: column; justify-content: center; padding: 4vh 0 3vh; animation: rbFadeUp .9s ease both; }
        @keyframes rbFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .rb-hero-live { display: flex; align-items: center; gap: 9px; font-family: var(--rb-mono); font-size: 10px; letter-spacing: .42em; color: var(--rb-dim); margin: 0 0 4vh; }
        .rb-livedot { width: 6px; height: 6px; border-radius: 50%; background: var(--rb-now); animation: rbBreathe 2s ease-in-out infinite; }
        @keyframes rbBreathe {
          0%,100% { box-shadow: 0 0 0 0 rgba(136,201,153,.45); opacity: 1; }
          50%     { box-shadow: 0 0 0 7px rgba(136,201,153,0); opacity: .7; }
        }
        .rb-hero-day { font-family: var(--font-bebas), sans-serif; font-size: clamp(88px, 24vw, 190px); line-height: .88; letter-spacing: .015em; color: var(--rb-fg); margin: 0; }
        .rb-hero-route { font-family: var(--rb-mono); font-size: clamp(13px, 3.4vw, 16px); letter-spacing: .3em; color: var(--rb-acc); margin: 22px 0 0; }
        .rb-hero-title { display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; margin-top: 3.5vh; }
        .rb-hero-zh { font-size: 21px; font-weight: 300; letter-spacing: .12em; color: var(--rb-fg); }
        .rb-hero-date { font-family: var(--rb-mono); font-size: 12.5px; letter-spacing: .22em; color: var(--rb-dim); }
        .rb-hero-bar { display: flex; align-items: flex-end; gap: 30px; flex-wrap: wrap; margin-top: 4vh; padding: 24px 26px; }
        .rb-bar-cell { display: flex; flex-direction: column; gap: 5px; }
        .rb-bar-k { font-size: 12px; letter-spacing: .34em; color: var(--rb-faint); }
        .rb-bar-v { font-family: var(--rb-mono); font-size: 17px; letter-spacing: .1em; color: var(--rb-fg); }
        .rb-bar-now { color: var(--rb-now); }
        .rb-sync { margin-left: auto; font-family: var(--rb-mono); font-size: 12px; letter-spacing: .26em; color: var(--rb-dim); background: none; border: none; padding: 6px 0; cursor: pointer; }
        .rb-sync:hover { color: var(--rb-acc); }
        .rb-sync:disabled { opacity: .5; }

        /* ── 分頁切換（segmented control）── */
        .rb-views { display: flex; gap: 4px; padding: 5px; margin: 26px 0 22px; position: sticky; top: 12px; z-index: 20; border-radius: 999px; }
        .rb-view-tab { flex: 1; font-size: 16.5px; font-weight: 400; color: var(--rb-dim); background: none;
          border: none; border-radius: 999px; padding: 13px 0; cursor: pointer;
          transition: background .35s cubic-bezier(0.65,0,0.35,1), color .35s; }
        .rb-view-tab[data-active="true"] { color: #0a0a0a; background: var(--rb-acc); font-weight: 600; }

        /* ── Day 切換：玻璃膠囊 ── */
        .rb-days { position: relative; display: flex; gap: clamp(6px, 2.5vw, 18px); padding: 5px 8px; margin-bottom: 34px; overflow-x: auto; scrollbar-width: none; border-radius: 999px; }
        .rb-days::-webkit-scrollbar { display: none; }
        .rb-daynum { position: relative; z-index: 1; font-family: var(--rb-mono); font-size: 15px; letter-spacing: .1em; color: var(--rb-faint); background: none; border: none; border-radius: 999px; padding: 10px 13px; cursor: pointer; flex-shrink: 0; transition: color .25s; }
        .rb-daynum:hover { color: var(--rb-dim); }
        .rb-daynum[data-active="true"] { color: #0a0a0a; font-weight: 700; }
        .rb-daynum-dot { position: absolute; top: 7px; right: 6px; width: 4px; height: 4px; border-radius: 50%; background: var(--rb-now); }
        /* 滑動玻璃膠囊 — JS 依 active 鈕的 offsetLeft/offsetWidth 定位 */
        .rb-daypill { position: absolute; top: 5px; bottom: 5px; border-radius: 999px; background: var(--rb-acc);
          box-shadow: 0 2px 14px rgba(227,198,107,.35);
          transition: left 0.4s cubic-bezier(0.65, 0, 0.35, 1), width 0.4s cubic-bezier(0.65, 0, 0.35, 1); }

        /* ── 翻頁 ── */
        .rb-pager { display: flex; gap: 12px; margin-top: 44px; }
        .rb-page-btn { flex: 1; font-family: var(--rb-mono); font-size: 13.5px; letter-spacing: .2em;
          color: var(--rb-fg); padding: 17px 0; cursor: pointer;
          transition: background .3s, transform .3s cubic-bezier(0.34,1.56,0.64,1); }
        .rb-page-btn:hover:not(:disabled) { background: rgba(255,255,255,.10); }
        .rb-page-btn:active:not(:disabled) { transform: scale(.97); }
        .rb-page-btn:disabled { opacity: .3; cursor: default; }

        /* ── 垂直路線 ── */
        .rb-tl { animation: rbFadeIn .5s ease both; }
        @keyframes rbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .rb-tl-empty { font-size: 16.5px; font-weight: 300; color: var(--rb-dim); padding: 30px 0; }
        .rb-stop { display: grid; grid-template-columns: 52px 17px 1fr; column-gap: 16px; }
        .rb-stop-time { font-family: var(--rb-mono); font-size: 13.5px; letter-spacing: .08em; color: var(--rb-dim); padding-top: 3px; text-align: right; }
        .rb-stop-rail { display: flex; flex-direction: column; align-items: center; }
        .rb-stop-node { width: 7px; height: 7px; border-radius: 50%; background: var(--rb-acc); margin-top: 5px; flex-shrink: 0; }
        .rb-stop-line { width: 1px; flex: 1; background: var(--rb-line); margin-top: 6px; animation: rbGrow .8s ease both; transform-origin: top; }
        @keyframes rbGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .rb-stop[data-done="true"] .rb-stop-node { background: var(--rb-faint); }
        .rb-stop[data-done="true"] .rb-stop-body,
        .rb-stop[data-done="true"] .rb-stop-time { opacity: .38; }
        .rb-stop[data-maybe="true"] .rb-stop-node { background: transparent; border: 1px solid var(--rb-dim); }
        .rb-stop[data-current="true"] .rb-stop-node { background: var(--rb-now); animation: rbBreathe 2s ease-in-out infinite; }
        .rb-stop-body { padding-bottom: 40px; min-width: 0; }
        .rb-stop-name { font-size: 20px; font-weight: 500; letter-spacing: .02em; color: var(--rb-fg); margin: 0; line-height: 1.4; }
        .rb-stop-here { font-family: var(--rb-mono); font-size: 9px; letter-spacing: .26em; color: var(--rb-now); margin-left: 12px; vertical-align: 2px; }
        .rb-stop-tent { font-family: var(--rb-mono); font-size: 9px; letter-spacing: .26em; color: var(--rb-faint); margin-left: 12px; vertical-align: 2px; }
        .rb-stop-en { font-family: var(--rb-mono); font-size: 11.5px; letter-spacing: .3em; color: var(--rb-dim); margin: 7px 0 0; }
        .rb-stop-note { font-size: 15.5px; font-weight: 300; color: var(--rb-dim); line-height: 1.75; margin: 10px 0 0; max-width: 44ch; }
        .rb-maplink { display: inline-block; font-family: var(--rb-mono); font-size: 10.5px; letter-spacing: .22em; color: var(--rb-acc); text-decoration: none; margin-top: 12px; padding: 4px 0; }
        .rb-maplink:hover { color: var(--rb-fg); }

        /* ── Plan B：雜誌旁註 ── */
        .rb-planb { margin: 14px 0 0 85px; padding-left: 16px; border-left: 1px solid rgba(201,135,82,.35); }
        .rb-planb-item { margin-bottom: 26px; }
        .rb-planb-k { font-family: var(--rb-mono); font-size: 10.5px; letter-spacing: .32em; color: var(--rb-planb); margin: 0 0 7px; }
        .rb-planb-name { font-size: 17.5px; font-weight: 300; color: var(--rb-fg); margin: 0; }
        .rb-planb-note { font-size: 14.5px; font-weight: 300; color: var(--rb-dim); line-height: 1.7; margin: 6px 0 0; max-width: 40ch; }

        /* ── 區段 ── */
        .rb-sec { margin-top: 72px; }
        .rb-label { font-family: var(--rb-mono); font-size: 10.5px; letter-spacing: .42em; color: var(--rb-faint); margin: 0 0 20px; }
        .rb-navlink { display: block; font-size: 17.5px; font-weight: 300; color: var(--rb-fg); text-decoration: none; padding: 13px 0; border-bottom: 1px solid var(--rb-line); }
        .rb-navlink:hover { color: var(--rb-acc); }


        /* ── 文字路線 ── */
        .rb-txtroute { display: flex; flex-direction: column; gap: 2px; }
        .rb-txtroute-city { font-family: var(--rb-mono); font-size: clamp(17px, 4.4vw, 21px); letter-spacing: .3em; color: var(--rb-fg); }
        .rb-txtroute-arr { display: block; font-family: var(--rb-mono); font-size: 12px; color: var(--rb-faint); padding: 6px 0 8px 2px; }

        /* ── 裝備 credits ── */
        .rb-credit { display: flex; flex-direction: column; gap: 6px; padding: 16px 0; border-bottom: 1px solid var(--rb-line); }
        .rb-credit-k { font-family: var(--rb-mono); font-size: 8.5px; letter-spacing: .38em; color: var(--rb-faint); }
        .rb-credit-v { font-family: var(--rb-mono); font-size: 14px; letter-spacing: .14em; color: var(--rb-fg); line-height: 1.7; }

        .rb-credit { flex-direction: row; align-items: center; justify-content: space-between; gap: 18px; padding: 14px 18px; margin-bottom: 12px; border-bottom: none; }
        .rb-credit-txt { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
        .rb-credit-img { width: 96px; height: 64px; object-fit: cover; flex-shrink: 0; border-radius: 12px;
          filter: saturate(.8); mask-image: linear-gradient(90deg, transparent 0%, #000 35%); }

        /* ── ROAD TALK：分區留言 ── */
        .rb-talk-regions { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
        .rb-talk-region { font-family: var(--rb-mono); font-size: 13.5px; letter-spacing: .1em;
          color: var(--rb-faint); background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 999px; padding: 8px 14px; cursor: pointer; transition: all .3s; }
        .rb-talk-region[data-active="true"] { color: #0a0a0a; background: var(--rb-acc); border-color: var(--rb-acc); font-weight: 600; }
        .rb-talk-layers { display: flex; gap: 22px; margin-bottom: 16px; }
        .rb-talk-layer { font-size: 15.5px; font-weight: 300; color: var(--rb-faint); background: none;
          border: none; padding: 4px 0; cursor: pointer; }
        .rb-talk-layer[data-active="true"] { color: var(--rb-fg); border-bottom: 1px solid var(--rb-dim); }
        .rb-talk-list { display: flex; flex-direction: column; }
        .rb-talk-item { font-size: 16px; font-weight: 300; color: var(--rb-fg); line-height: 1.7;
          margin: 0; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.05); }
        .rb-talk-n { font-family: var(--rb-mono); font-size: 11.5px; letter-spacing: .12em;
          color: var(--rb-acc); margin-right: 10px; }
        .rb-talk-n-route { color: var(--rb-now); }
        .rb-talk-ago { font-family: var(--rb-mono); font-size: 9px; letter-spacing: .12em;
          color: var(--rb-faint); margin-left: 10px; }
        .rb-talk-empty { font-size: 13.5px; font-weight: 300; color: var(--rb-faint); padding: 14px 0; }
        .rb-talk-hint { font-size: 15px; font-weight: 300; color: var(--rb-dim); margin: 0 0 12px; }
        .rb-talk-form { display: flex; gap: 8px; margin-top: 14px; }
        .rb-talk-form-col { flex-direction: column; margin-top: 0; margin-bottom: 8px; }
        .rb-talk-row { display: flex; gap: 8px; }
        .rb-talk-in { flex: 1; min-width: 0; font-size: 16px; background: rgba(255,255,255,.05);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,.10); border-radius: 12px; color: var(--rb-fg); font-size: 14px; font-weight: 300;
          padding: 11px 14px; outline: none; }
        .rb-talk-in:focus { border-color: rgba(227,198,107,.4); }
        .rb-talk-in::placeholder { color: var(--rb-faint); }
        .rb-talk-in-name { flex: 0 0 118px; }
        .rb-talk-send { font-family: var(--rb-mono); font-size: 10.5px; letter-spacing: .18em;
          color: #0a0a0a; background: var(--rb-acc); border: none; border-radius: 999px; padding: 11px 18px; cursor: pointer; }
        .rb-talk-msg { font-size: 12.5px; color: var(--rb-now); margin: 10px 0 0; }

        .rb-photocredit { font-size: 11.5px; font-weight: 300; color: rgba(242,240,234,.45);
          line-height: 1.8; margin: 40px 0 0; }

        /* ── Checklist：折疊 ── */
        .rb-cl { margin-top: 72px; background: rgba(255,255,255,.045); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,.09); border-radius: 20px; padding: 4px 18px; }
        .rb-cl-summary { font-family: var(--rb-mono); font-size: 11.5px; letter-spacing: .38em; color: var(--rb-dim); padding: 20px 0; cursor: pointer; list-style: none; display: flex; justify-content: space-between; }
        .rb-cl-summary::-webkit-details-marker { display: none; }
        .rb-cl[open] .rb-cl-summary span { transform: rotate(45deg); display: inline-block; }
        .rb-cl-summary:hover { color: var(--rb-fg); }
        .rb-cl-group { margin-bottom: 22px; }
        .rb-cl-sub { font-size: 15px; font-weight: 300; color: var(--rb-dim); margin: 0 0 4px; }
        .rb-cl-item { display: flex; align-items: center; gap: 13px; width: 100%; background: none; border: none; border-bottom: 1px solid rgba(255,255,255,.05); padding: 11px 0; cursor: pointer; text-align: left; }
        .rb-cl-box { width: 18px; height: 18px; flex-shrink: 0; border: 1px solid var(--rb-dim); border-radius: 6px; color: var(--rb-acc); font-family: var(--rb-mono); font-size: 11px; display: flex; align-items: center; justify-content: center; }
        .rb-cl-item[data-on="true"] .rb-cl-box { border-color: var(--rb-acc); }
        .rb-cl-txt { font-size: 16.5px; font-weight: 300; color: var(--rb-fg); }
        .rb-cl-item[data-on="true"] .rb-cl-txt { color: var(--rb-faint); }
        .rb-cl-note { font-size: 11.5px; font-weight: 300; color: var(--rb-faint); margin: 14px 0 4px; }

        /* ── 錯誤狀態 ── */
        .rb-err { min-height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
        .rb-err-t { font-size: 21px; font-weight: 300; letter-spacing: .04em; color: var(--rb-fg); margin: 0 0 14px; }
        .rb-err-s { font-size: 15px; font-weight: 300; color: var(--rb-dim); line-height: 1.9; margin: 0 0 22px; max-width: 42ch; }
        .rb-err .rb-sync { margin-left: 0; color: var(--rb-acc); }

        /* ── 整頁背景地圖 ── */
        .rb-bgmap { position: fixed; inset: 0; z-index: 0; pointer-events: none;
          display: flex; align-items: center; justify-content: flex-end; padding-right: 6vw;
          opacity: .55; transition: opacity .8s ease; }
        .rb-bgmap[data-on="true"] { opacity: 1; }
        .rb-bgmap-svg { height: 92vh; width: auto; max-width: 60vw; }
        .rb-rm-island { fill: rgba(255,255,255,.015); stroke: rgba(255,255,255,.10); stroke-width: .7; }
        .rb-rm-route { fill: none; stroke: rgba(242,240,234,.10); stroke-width: .8; stroke-dasharray: 2.5 4; }
        .rb-rm-trail { fill: none; stroke: var(--rb-acc); stroke-width: 1.2; stroke-linejoin: round;
          opacity: .8; filter: drop-shadow(0 0 4px rgba(227,198,107,.5)); }
        .rb-rm-stop { fill: rgba(242,240,234,.14); transition: fill .4s; }
        .rb-rm-stop[data-lit="true"] { fill: var(--rb-acc); }
        .rb-rm-glow { fill: rgba(136,201,153,.14); animation: rbBreathe 2s ease-in-out infinite; }
        .rb-rm-rider { transition: transform 1.4s cubic-bezier(0.65, 0, 0.35, 1); }
        .rb-rm-beam { animation: rbFlicker 2.6s ease-in-out infinite; }
        @keyframes rbFlicker { 0%,100% { opacity: .85; } 50% { opacity: .55; } }
        .rb-rm-shadow { fill: rgba(0,0,0,.45); }
        .rb-rm-smoke { fill: rgba(242,240,234,.55); animation: rbPuff 1.5s ease-out infinite; }
        .rb-rm-smoke2 { animation-delay: .5s; }
        .rb-rm-smoke3 { animation-delay: 1s; }
        @keyframes rbPuff {
          0%   { transform: translate(0, 0) scale(.5); opacity: .7; }
          100% { transform: translate(-9px, -4px) scale(1.9); opacity: 0; }
        }
        .rb-rm-lbl { font-family: var(--rb-mono); font-size: 7px; letter-spacing: .04em;
          fill: rgba(242,240,234,.55); }
        .rb-rm-lbl[data-lit="true"] { fill: rgba(227,198,107,.95); }
        .rb-rm-lblcity { font-family: var(--rb-mono); font-size: 5.5px; letter-spacing: .2em;
          fill: rgba(242,240,234,.4); }
        .rb-rm-line { fill: none; stroke: var(--rb-fg); stroke-width: 1.6; stroke-linecap: round; }
        .rb-rm-head { fill: var(--rb-now); stroke: none; }
        .rb-bgmap-cap { position: fixed; left: 22px; bottom: 18px; display: flex; flex-direction: column;
          gap: 3px; opacity: 0; transition: opacity .6s ease; }
        .rb-bgmap-cap[data-on="true"] { opacity: 1; }
        .rb-bgmap-city { font-family: var(--rb-mono); font-size: 10.5px; letter-spacing: .34em; color: var(--rb-acc); }
        .rb-bgmap-spot { font-size: 15px; font-weight: 300; color: var(--rb-dim); }

        /* ── 站點照片：圖底漸層融進文字 ── */
        .rb-stop-photo { position: relative; margin: 2px 0 14px; max-width: 460px; border-radius: 18px; overflow: hidden; }
        .rb-stop-photo img { display: block; width: 100%; aspect-ratio: 16/9; object-fit: cover;
          filter: saturate(.85) contrast(1.02); }
        .rb-stop-photo-fade { position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(5,5,5,.08) 0%, rgba(5,5,5,0) 30%, rgba(5,5,5,0) 55%, #050505 100%); }
        .rb-stop-photo-tag { position: absolute; top: 8px; right: 8px; font-family: var(--rb-mono);
          font-size: 8px; letter-spacing: .22em; color: rgba(242,240,234,.6);
          background: rgba(5,5,5,.55); padding: 3px 7px; }

        /* ── FIELD INTEL ── */
        .rb-intel { margin-top: 12px; }
        .rb-intel-sum { font-family: var(--rb-mono); font-size: 11px; letter-spacing: .26em;
          color: var(--rb-acc); cursor: pointer; list-style: none; display: inline-flex; gap: 8px; padding: 4px 0; }
        .rb-intel-sum::-webkit-details-marker { display: none; }
        .rb-intel[open] .rb-intel-sum span { transform: rotate(45deg); display: inline-block; }
        .rb-intel-body { padding: 14px 16px 10px; margin-top: 8px; background: rgba(255,255,255,.045); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,.09); border-radius: 16px; }
        .rb-intel-row { font-size: 15.5px; font-weight: 300; color: var(--rb-dim); line-height: 1.75;
          margin: 0 0 9px; max-width: 46ch; }
        .rb-intel-k { display: block; font-family: var(--rb-mono); font-size: 10px; letter-spacing: .3em;
          color: var(--rb-faint); margin-bottom: 3px; }
        .rb-intel-src { font-family: var(--rb-mono); font-size: 8.5px; letter-spacing: .2em;
          color: var(--rb-faint); text-decoration: none; }
        .rb-intel-src:hover { color: var(--rb-acc); }

        /* ── 里程表 ── */
        .odometer { font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
        .rb-odo-num { display: flex; align-items: baseline; gap: 14px; margin: 0;
          font-family: var(--font-bebas), sans-serif; font-size: clamp(64px, 16vw, 120px);
          line-height: .9; color: var(--rb-fg); }
        .rb-odo-unit { font-family: var(--rb-mono); font-size: 13px; letter-spacing: .34em; color: var(--rb-acc); }
        .rb-odo-sub { font-family: var(--rb-mono); font-size: 12px; letter-spacing: .2em;
          color: var(--rb-dim); margin: 14px 0 0; }

        /* ── FILM LOG ── */
        .rb-film-day { padding: 16px 18px; margin-bottom: 12px; background: rgba(255,255,255,.045); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,.09); border-radius: 18px; }
        .rb-film-head { display: flex; align-items: baseline; gap: 14px; }
        .rb-film-d { font-family: var(--rb-mono); font-size: 14.5px; letter-spacing: .18em; color: var(--rb-fg); }
        .rb-film-date { font-family: var(--rb-mono); font-size: 10px; letter-spacing: .2em; color: var(--rb-faint); }
        .rb-film-km { margin-left: auto; font-family: var(--rb-mono); font-size: 11px; color: var(--rb-acc); }
        .rb-film-note { font-size: 15.5px; font-weight: 300; color: var(--rb-dim); margin: 8px 0 0; }
        .rb-film-strip { display: flex; gap: 8px; overflow-x: auto; margin-top: 12px;
          scrollbar-width: none; scroll-snap-type: x mandatory; }
        .rb-film-strip::-webkit-scrollbar { display: none; }
        .rb-film-ph { height: 190px; width: auto; flex-shrink: 0; scroll-snap-align: start;
          display: block; border-radius: 12px; }
        .rb-film-empty { font-family: var(--rb-mono); font-size: 10px; letter-spacing: .22em;
          color: var(--rb-faint); margin: 10px 0 0; }

        /* ── 加油鈕（heart + particles）── */
        .rb-cheer-btn { display: flex; align-items: center; gap: 14px; background: none; border: none;
          padding: 6px 0; cursor: pointer; color: var(--rb-dim); }
        .rb-cheer-heartwrap { position: relative; display: inline-flex; }
        .heart { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .like-btn.pop .heart { transform: scale(1.35); }
        .like-btn.liked .heart { color: #FF8A00; }
        .like-btn.liked .heart path { fill: #FF8A00; stroke: #FF8A00; }
        .rb-cheer-parts { position: absolute; inset: 0; display: block; pointer-events: none; }
        .particle { position: absolute; left: 50%; top: 50%; width: 4px; height: 4px; border-radius: 50%;
          background: #FF8A00; animation: fly 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fly { to { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }
        .rb-cheer-txt { font-size: 17.5px; font-weight: 300; color: var(--rb-fg); }
        .rb-cheer-count { font-family: var(--rb-mono); font-size: 15px; color: #FF8A00; }
        .rb-cheer-sub { font-size: 14px; font-weight: 300; color: var(--rb-faint); margin: 8px 0 0; }

        /* ── 桌機：行程橫式 call sheet ── */
        @media (min-width: 900px) {
          .rb-tl { display: flex; overflow-x: auto; gap: 34px; padding: 8px 4px 22px;
            scroll-snap-type: x proximity; scrollbar-width: thin;
            width: min(1200px, calc(100vw - 80px)); margin-left: 50%; transform: translateX(-50%); }
          .rb-tl::-webkit-scrollbar { height: 4px; }
          .rb-tl::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); }
          .rb-stop { display: block; flex: 0 0 320px; scroll-snap-align: start;
            border-top: 1px solid var(--rb-line); padding-top: 14px; }
          .rb-stop-rail { display: none; }
          .rb-stop-time { text-align: left; padding: 0 0 8px; }
          .rb-stop-body { padding-bottom: 10px; }
          .rb-stop-photo { max-width: none; }
          .rb-planb { margin: 0; padding: 14px 0 0 16px; flex: 0 0 260px;
            border-left: 1px solid rgba(201,135,82,.35); border-top: 1px solid transparent;
            align-self: flex-start; }
          .rb-tl-empty { flex: 1; }
        }

        /* ── 手機 ── */
        @media (max-width: 720px) {
          .rb-bgmap { justify-content: center; padding-right: 0; opacity: .38; }
          .rb-bgmap[data-on="true"] { opacity: .8; }
          .rb-bgmap-svg { height: 86vh; max-width: 96vw; }
          .rb-bgmap-cap { left: 18px; bottom: 14px; }
        }
        @media (max-width: 480px) {
          .rb-body { padding: 0 18px 64px; }
          .rb-stop { grid-template-columns: 44px 15px 1fr; column-gap: 12px; }
          .rb-planb { margin-left: 71px; }
          .rb-hero-bar { gap: 18px; }
          .rb-film-ph { height: 150px; }
        }
      `}</style>
    </main>
  );
}
