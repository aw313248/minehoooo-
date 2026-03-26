"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { WordReveal } from "@/components/WordReveal";

/* ── Types ── */
interface Ripple  { x: number; y: number; id: number }
interface Sub     { en: string; zh: string; bg: string }
interface YTVideo { id: string; title: string; subEn: string; subZh: string; tags: string[] }
interface IgReel  { code: string; tier: number; tierLabel: string; tags: string[] }
interface YTShort { id: string; title: string; tags: string[] }

/* ── Ripple hook ── */
function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const trigger = (e: React.MouseEvent<HTMLElement>) => {
    const r    = e.currentTarget.getBoundingClientRect();
    const id   = Date.now();
    setRipples(p => [...p, { x: e.clientX - r.left, y: e.clientY - r.top, id }]);
    setTimeout(() => setRipples(p => p.filter(x => x.id !== id)), 750);
  };
  return { ripples, trigger };
}

/* ── TIER colors ── */
const tierColors: Record<number, string> = {
  1: "rgba(193,105,80,0.85)",
  2: "rgba(100,160,200,0.85)",
  3: "rgba(140,100,200,0.85)",
  4: "rgba(120,120,120,0.75)",
};
const tierBg: Record<number, string> = {
  1: "linear-gradient(140deg,#1a0f0a,#0d0704)",
  2: "linear-gradient(140deg,#080f18,#030710)",
  3: "linear-gradient(140deg,#0d0818,#05030e)",
  4: "linear-gradient(140deg,#111111,#070707)",
};

/* ── DATA ── */

const igReels: IgReel[] = [
  // Tier 1 — 近期高表現 (DV prefix = 2025–2026)
  { code:"DV3dhDzk-tv", tier:1, tierLabel:"近期高表現", tags:["#filmmaker","#cinematography","#reel","#台灣"] },
  { code:"DVqvaWVEntr", tier:1, tierLabel:"近期高表現", tags:["#director","#production","#攝影"] },
  { code:"DVjCLj0kq-A", tier:1, tierLabel:"近期高表現", tags:["#videoproduction","#影像","#shorts"] },
  { code:"DViau5bkjjN", tier:1, tierLabel:"近期高表現", tags:["#videography","#台灣","#創作"] },
  { code:"DVQvmpNEt8k", tier:1, tierLabel:"近期高表現", tags:["#creative","#visual","#cinematic"] },
  // Tier 2 — 精選推薦 (DT prefix = 2025)
  { code:"DT-tdb1Evcw", tier:2, tierLabel:"精選推薦",   tags:["#photography","#portrait","#攝影師"] },
  { code:"DTihUcyEiZ-", tier:2, tierLabel:"精選推薦",   tags:["#event","#活動攝影","#記錄"] },
  { code:"DTg9q2_kpmY", tier:2, tierLabel:"精選推薦",   tags:["#cinematic","#filmlook","#電影感"] },
  { code:"DTej6F4ksVj", tier:2, tierLabel:"精選推薦",   tags:["#bts","#behindthescenes","#幕後"] },
  // Tier 3 — 創意實驗 (DS / DO / DI = 2024)
  { code:"DS5dU_REr14", tier:3, tierLabel:"創意實驗",   tags:["#production","#making","#製作"] },
  { code:"DSxZw9jkok2", tier:3, tierLabel:"創意實驗",   tags:["#creative","#aigc","#AI創作"] },
  { code:"DO02gpikrGH", tier:3, tierLabel:"創意實驗",   tags:["#experimental","#artfilm","#實驗影像"] },
  { code:"DIUb2hYziLU", tier:3, tierLabel:"創意實驗",   tags:["#director","#場景","#影像製作"] },
  // Tier 4 — 早期作品 (C prefix = 2023)
  { code:"C-EoltissgJ", tier:4, tierLabel:"早期作品",   tags:["#archive","#2023","#起源"] },
  { code:"C7qbfK8S-pr", tier:4, tierLabel:"早期作品",   tags:["#filmmaking","#早期","#創作歷程"] },
  { code:"C35vYmTSML-", tier:4, tierLabel:"早期作品",   tags:["#vintage","#classic","#回顧"] },
];

const ytShorts: YTShort[] = [
  {
    id:    "pFvDTEf9fh0",
    title: "你說想養大貓咪-AI生給你",
    tags:  ["#AIGC","#AI動物","#短影音","#minehoooo"],
  },
  {
    id:    "43uhkGuAitU",
    title: "DJI Osmo 360 晟拍套裝開箱！這個 360 視角太棒了",
    tags:  ["#器材開箱","#DJI360","#攝影器材","#minehoooo"],
  },
];

/* ── Instagram Reel Card ── */
function IgCard({ reel, delay, inView }: { reel: IgReel; delay: number; inView: boolean }) {
  const { ripples, trigger } = useRipple();
  const url = `https://www.instagram.com/reel/${reel.code}/`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="group block"
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.95)",
        transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
      onClick={trigger as unknown as React.MouseEventHandler<HTMLAnchorElement>}
    >
      {/* Card */}
      <div className="relative overflow-hidden"
        style={{ aspectRatio:"9/16", background: tierBg[reel.tier], borderRadius:"4px" }}>
        {/* Ripples */}
        {ripples.map(r => (
          <span key={r.id} style={{
            position:"absolute", left:r.x-50, top:r.y-50,
            width:100, height:100, borderRadius:"50%",
            background:"rgba(255,255,255,0.18)",
            animation:"ripple .65s ease-out forwards",
            pointerEvents:"none",
          }} />
        ))}
        {/* Top accent bar */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px",
          background:"linear-gradient(90deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }} />
        {/* Tier badge */}
        <div className="absolute top-3 left-3">
          <span className="font-mono-label text-[7px] tracking-widest px-2 py-0.5 rounded-sm"
            style={{ background: tierColors[reel.tier], color:"#fff" }}>
            {reel.tierLabel}
          </span>
        </div>
        {/* IG icon */}
        <div className="absolute top-2.5 right-3 opacity-40">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background:"rgba(0,0,0,0.4)" }}>
          <svg className="w-8 h-8 mb-2" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          <span className="font-mono-label text-[8px] tracking-widest text-white">VIEW ON INSTAGRAM</span>
        </div>
      </div>
      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-1">
        {reel.tags.map(tag => (
          <span key={tag} className="font-mono-label text-[8px] tracking-wider"
            style={{ color:"var(--text-3)" }}>
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

/* ── YouTube Short Card ── */
function YTShortCard({ short, delay, inView }: { short: YTShort; delay: number; inView: boolean }) {
  const [playing, setPlaying] = useState(false);
  const { ripples, trigger }  = useRipple();

  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.95)",
      transition: `opacity .75s ease ${delay}s, transform .75s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      <div className="relative overflow-hidden cursor-pointer"
        style={{ aspectRatio:"9/16", background:"#050505", borderRadius:"4px" }}
        onClick={(e) => { trigger(e); if (!playing) setPlaying(true); }}>
        {ripples.map(r => (
          <span key={r.id} style={{
            position:"absolute", left:r.x-50, top:r.y-50,
            width:100, height:100, borderRadius:"50%",
            background:"rgba(255,255,255,0.18)",
            animation:"ripple .65s ease-out forwards",
            pointerEvents:"none",
          }} />
        ))}
        {!playing ? (
          <div className="absolute inset-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://img.youtube.com/vi/${short.id}/mqdefault.jpg`} alt={short.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              onError={(e) => { (e.target as HTMLImageElement).src=`https://img.youtube.com/vi/${short.id}/default.jpg`; }} />
            <div className="absolute inset-0" style={{ background:"rgba(0,0,0,0.45)" }}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.25)")}
              onMouseLeave={e=>(e.currentTarget.style.background="rgba(0,0,0,0.45)")} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.2)" }}>
                <svg className="w-5 h-5 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <div className="absolute top-3 right-3">
              <span className="font-mono-label text-[7px] tracking-widest px-1.5 py-0.5"
                style={{ background:"rgba(255,0,0,0.7)", color:"#fff" }}>
                SHORTS
              </span>
            </div>
          </div>
        ) : (
          <iframe className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${short.id}?autoplay=1&rel=0`}
            title={short.title} allow="autoplay; fullscreen" allowFullScreen />
        )}
      </div>
      <p className="text-[12px] font-medium mt-2 leading-tight" style={{ color:"var(--text)" }}>
        {short.title}
      </p>
      <div className="flex flex-wrap gap-1 mt-1">
        {short.tags.map(tag => (
          <span key={tag} className="font-mono-label text-[8px]" style={{ color:"var(--text-3)" }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Featured Video Card ── */
function VideoCard({ v, delay, inView }: { v: YTVideo; delay: number; inView: boolean }) {
  const [playing, setPlaying] = useState(false);
  const { ripples, trigger }  = useRipple();

  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
      transition: `opacity .9s ease ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      <div className="relative overflow-hidden cursor-pointer"
        style={{ aspectRatio:"16/9", background:"#050505", borderRadius:"4px" }}
        onClick={(e) => { trigger(e); if (!playing) setPlaying(true); }}>
        {ripples.map(r => (
          <span key={r.id} style={{
            position:"absolute", left:r.x-60, top:r.y-60,
            width:120, height:120, borderRadius:"50%",
            background:"rgba(255,255,255,0.15)",
            animation:"ripple .7s ease-out forwards",
            pointerEvents:"none",
          }} />
        ))}
        {!playing ? (
          <div className="absolute inset-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              onError={(e) => { (e.target as HTMLImageElement).src=`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
            <div className="absolute inset-0 transition-colors duration-300"
              style={{ background:"rgba(0,0,0,0.42)" }}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.22)")}
              onMouseLeave={e=>(e.currentTarget.style.background="rgba(0,0,0,0.42)")} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(14px)", border:"1px solid rgba(255,255,255,0.18)" }}>
                <svg className="w-6 h-6 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {v.tags.map(tag => (
                <span key={tag} className="font-mono-label text-[7px] tracking-widest px-2 py-0.5"
                  style={{ background:"rgba(0,0,0,0.65)", backdropFilter:"blur(4px)", color:"rgba(255,255,255,0.7)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <iframe className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`}
            title={v.title} allow="accelerometer; autoplay; fullscreen" allowFullScreen />
        )}
      </div>
      {/* Title row */}
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <p className="text-[14px] font-medium leading-snug" style={{ color:"var(--text)" }}>{v.title}</p>
          <p className="font-mono-label text-[9px] mt-1" style={{ color:"var(--text-2)" }}>{v.subEn}</p>
          <p className="font-mono-label text-[9px]"         style={{ color:"var(--text-3)" }}>{v.subZh}</p>
        </div>
        <button onClick={() => setPlaying(p => !p)}
          className="font-mono-label text-[8px] tracking-widest shrink-0 mt-0.5 transition-colors"
          style={{ color:"var(--text-3)" }}
          onMouseEnter={e=>(e.currentTarget.style.color="var(--text)")}
          onMouseLeave={e=>(e.currentTarget.style.color="var(--text-3)")}>
          {playing ? "PAUSE" : "PLAY ▶"}
        </button>
      </div>
    </div>
  );
}

/* ── Placeholder card ── */
function PlaceholderCard({ sub, catEn, delay, inView }: { sub: Sub; catEn: string; delay: number; inView: boolean }) {
  const { ripples, trigger } = useRipple();
  return (
    <div className="group cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.95)",
        transition: `opacity .75s ease ${delay}s, transform .75s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}>
      <div className="relative overflow-hidden mb-3 transition-transform duration-500 ease-out group-hover:-translate-y-2"
        style={{ aspectRatio:"3/4", background:sub.bg, borderRadius:"3px" }}
        onClick={trigger}>
        {ripples.map(r => (
          <span key={r.id} style={{
            position:"absolute", left:r.x-50, top:r.y-50,
            width:100, height:100, borderRadius:"50%",
            background:"rgba(255,255,255,0.18)",
            animation:"ripple .6s ease-out forwards",
            pointerEvents:"none",
          }} />
        ))}
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span className="font-mono-label text-[7px] tracking-widest uppercase"
            style={{ color:"rgba(255,255,255,0.3)" }}>{catEn}</span>
          <div className="w-2 h-2 rounded-full" style={{ background:"rgba(255,255,255,0.25)" }} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="font-mono-label text-[7px] tracking-wider" style={{ color:"rgba(255,255,255,0.25)" }}>
            MINEH4O
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background:"rgba(255,255,255,0.06)" }}>
          <span className="font-mono-label text-[9px] tracking-[0.25em]" style={{ color:"rgba(255,255,255,0.7)" }}>
            COMING SOON
          </span>
        </div>
      </div>
      <p className="text-[13px] font-medium leading-tight mb-0.5" style={{ color:"var(--text)" }}>{sub.en}</p>
      <p className="font-mono-label text-[9px]" style={{ color:"var(--text-3)" }}>{sub.zh}</p>
    </div>
  );
}

/* ── Categories data ── */
interface Cat { number:string; en:string; zh:string; desc:string; vLabels:string[]; subs:Sub[]; videos?:YTVideo[] }

const cats: Cat[] = [
  {
    number:"01", en:"Photography", zh:"攝影",
    desc:"Flat · Motion · Event · Wedding",
    vLabels:["Flat Photography","Event Photography","Wedding Photography"],
    subs:[
      { en:"Flat Photography",    zh:"平面攝影", bg:"linear-gradient(135deg,#1e1e22,#0d0d10)" },
      { en:"Motion Photography",  zh:"動態攝影", bg:"linear-gradient(135deg,#1e1608,#0d0b04)" },
      { en:"Event Photography",   zh:"活動攝影", bg:"linear-gradient(135deg,#1e0e0e,#0d0606)" },
      { en:"Wedding Photography", zh:"婚禮攝影", bg:"linear-gradient(135deg,#1e1218,#0d080d)" },
    ],
  },
  {
    number:"02", en:"Video", zh:"影片",
    desc:"Music Video · Narrative Short Film · Short Video",
    vLabels:["Music Video","Short Film","Short Video"],
    subs:[
      { en:"Music Video",          zh:"MV 創作",  bg:"linear-gradient(135deg,#0d0d1a,#04040c)" },
      { en:"Narrative Short Film", zh:"劇情短片", bg:"linear-gradient(135deg,#0a1020,#040810)" },
      { en:"Short Video",          zh:"短影音",   bg:"linear-gradient(135deg,#0a1e2a,#04101a)" },
    ],
    videos:[
      {
        id:   "eI1O_9jBHU0",
        title:"Kolli (NN) — BRING ME YOUR LOVELY",
        subEn:"Music Video",
        subZh:"音樂錄影帶",
        tags: ["MUSIC VIDEO","DIRECTOR","DP"],
      },
      {
        id:   "hk43CW2Kqow",
        title:"AI-Assisted Music Video",
        subEn:"Music Video · AI Generated ~50%",
        subZh:"MV 創作 · AI 製作約 50%",
        tags: ["MUSIC VIDEO","AI 50%","AIGC"],
      },
    ],
  },
  {
    number:"03", en:"AIGC Creation", zh:"AIGC 創作",
    desc:"AI-Generated Imagery & Video · Creative Exploration",
    vLabels:["AI Generated","Creative Exploration"],
    subs:[
      { en:"AIGC Series I",   zh:"系列一", bg:"linear-gradient(135deg,#14083a,#08041c)" },
      { en:"AIGC Series II",  zh:"系列二", bg:"linear-gradient(135deg,#08281e,#04140f)" },
      { en:"AIGC Series III", zh:"系列三", bg:"linear-gradient(135deg,#28081a,#14040d)" },
    ],
    videos:[
      {
        id:   "u5WaOT1m670",
        title:"我把腦子裡的畫面做出來了",
        subEn:"AIGC Short Film",
        subZh:"AIGC 影片創作",
        tags: ["AIGC","AI GENERATED","SHORT FILM"],
      },
      {
        id:   "ZbaSBFVP-Tg",
        title:"一個人就能拍出電影級災難片？Osmo 360 × Higgsfield AI",
        subEn:"AIGC Experiment · Osmo 360 × Higgsfield AI",
        subZh:"AIGC 實測影片",
        tags: ["AIGC","AI FILM","DJI 360"],
      },
    ],
  },
];

/* ── Section fade/scale animation styles ── */
function sectionAnim(inView: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0) scale(1)" : "translateY(52px) scale(0.97)",
    transition: `opacity 1s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1s cubic-bezier(.16,1,.3,1) ${delay}s`,
  };
}

/* ── Short Video Section ── */
function ShortVideoSection() {
  const { ref: ytRef, inView: ytIn }     = useInView(0.04);
  const { ref: igRef, inView: igIn }     = useInView(0.04);
  const [igTier, setIgTier]             = useState<number | null>(null);

  const tierGroups = [1, 2, 3, 4];
  const tierLabels: Record<number, string> = {
    1:"近期高表現 · 2025–2026",
    2:"精選推薦 · 2025",
    3:"創意實驗 · 2024",
    4:"早期作品 · 2023",
  };
  const filtered = igTier ? igReels.filter(r => r.tier === igTier) : igReels;

  return (
    <div className="border-t" style={{ borderColor:"var(--border)" }}>
      {/* Sub-header */}
      <div className="px-6 md:px-10 py-4 flex items-center justify-between"
        style={{ background:"var(--bg-card)" }}>
        <div>
          <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color:"var(--text-3)" }}>
            SHORT VIDEO / 短影音
          </span>
          <span className="font-mono-label text-[9px] ml-4" style={{ color:"var(--text-3)" }}>
            — {ytShorts.length} YouTube Shorts · {igReels.length} Instagram Reels
          </span>
        </div>
      </div>

      {/* YouTube Shorts */}
      <div ref={ytRef} className="border-t px-6 md:px-10 py-8"
        style={{ borderColor:"var(--border)" }}>
        <p className="font-mono-label text-[9px] tracking-[0.3em] mb-5"
          style={{
            color:"var(--text-3)",
            ...sectionAnim(ytIn, 0),
          }}>
          YOUTUBE SHORTS
          <span className="ml-3" style={{ color:"rgba(255,0,0,0.7)" }}>▶</span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ytShorts.map((s, i) => (
            <YTShortCard key={s.id} short={s} delay={i * 0.12} inView={ytIn} />
          ))}
        </div>
      </div>

      {/* Instagram Reels */}
      <div ref={igRef} className="border-t px-6 md:px-10 py-8"
        style={{ borderColor:"var(--border)" }}>
        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap"
          style={sectionAnim(igIn, 0)}>
          <p className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color:"var(--text-3)" }}>
            INSTAGRAM REELS
          </p>
          <div className="flex gap-2 flex-wrap ml-4">
            <button
              onClick={() => setIgTier(null)}
              className="font-mono-label text-[8px] tracking-widest px-3 py-1 transition-all"
              style={{
                border:"1px solid",
                borderColor: igTier === null ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)",
                color: igTier === null ? "var(--text)" : "var(--text-3)",
              }}>
              全部 ALL
            </button>
            {tierGroups.map(t => (
              <button key={t}
                onClick={() => setIgTier(igTier === t ? null : t)}
                className="font-mono-label text-[8px] tracking-wider px-3 py-1 transition-all"
                style={{
                  border:"1px solid",
                  borderColor: igTier === t ? tierColors[t] : "rgba(255,255,255,0.1)",
                  color: igTier === t ? "#fff" : "var(--text-3)",
                  background: igTier === t ? tierColors[t].replace("0.85","0.2") : "transparent",
                }}>
                T{t} · {tierLabels[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Reels grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((reel, i) => (
            <IgCard key={reel.code} reel={reel} delay={i * 0.06} inView={igIn} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Chapter ── */
function Chapter({ cat }: { cat: Cat }) {
  const { ref:hRef, inView:hIn } = useInView(0.07);
  const { ref:cRef, inView:cIn } = useInView(0.04);
  const { ref:vRef, inView:vIn } = useInView(0.04);

  return (
    <div style={{ background:"var(--bg-dark)" }}>
      {/* Header */}
      <div ref={hRef} className="relative border-t" style={{ borderColor:"var(--border)" }}>
        {/* Vertical labels */}
        <div className="absolute left-6 md:left-10 top-0 bottom-0 hidden md:flex flex-col justify-around py-12 pointer-events-none">
          {cat.vLabels.map((lbl, i) => (
            <span key={lbl} className="v-text font-mono-label text-[8px] tracking-[0.22em]"
              style={{ color:"var(--text-3)", opacity:hIn?1:0, transition:`opacity 1s ease ${.2+i*.2}s` }}>
              {lbl}
            </span>
          ))}
        </div>

        <div className="pl-6 md:pl-28 pr-6 md:pr-14 py-16 md:py-24 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <span className="font-mono-label text-[9px] tracking-[0.35em] block mb-5"
              style={{ color:"var(--text-3)", ...sectionAnim(hIn, 0.05) }}>
              {cat.number} — {cat.zh}
            </span>
            <h2 className="font-display leading-none" style={{ fontSize:"clamp(4rem,12vw,14rem)", color:"var(--text)" }}>
              <WordReveal text={cat.en} inView={hIn} baseDelay={0.1} stagger={0.06} />
            </h2>
          </div>
          <p className="font-mono-label text-[10px] tracking-[0.16em] md:text-right leading-loose max-w-xs"
            style={{ color:"var(--text-3)", ...sectionAnim(hIn, 0.35) }}>
            {cat.desc}
          </p>
        </div>
      </div>

      {/* Placeholder cards */}
      <div ref={cRef} className="border-t py-8 px-6 md:px-10"
        style={{ borderColor:"var(--border)", background:"var(--bg-card)" }}>
        <div className="grid gap-3"
          style={{ gridTemplateColumns:`repeat(${Math.min(cat.subs.length, 4)}, minmax(0,1fr))` }}>
          {cat.subs.map((sub, i) => (
            <PlaceholderCard key={sub.en} sub={sub} catEn={cat.en} delay={i*.1} inView={cIn} />
          ))}
        </div>
      </div>

      {/* Featured videos */}
      {cat.videos && cat.videos.length > 0 && (
        <div ref={vRef} className="border-t px-6 md:px-10 py-8"
          style={{ borderColor:"var(--border)" }}>
          <p className="font-mono-label text-[9px] tracking-[0.3em] mb-6"
            style={{ color:"var(--text-3)", ...sectionAnim(vIn, 0) }}>
            FEATURED WORKS / 精選作品
          </p>
          <div className={`grid gap-6 ${cat.videos.length > 1 ? "md:grid-cols-2" : "max-w-2xl"}`}>
            {cat.videos.map((v, i) => (
              <VideoCard key={v.id} v={v} delay={.1+i*.15} inView={vIn} />
            ))}
          </div>
        </div>
      )}

      {/* Short video section only for Video category */}
      {cat.number === "02" && <ShortVideoSection />}
    </div>
  );
}

/* ── Export ── */
export default function Work() {
  return (
    <section id="work">
      <div className="border-t border-b px-6 md:px-10 py-3 flex items-center justify-between"
        style={{ borderColor:"var(--border)", background:"var(--bg-dark)" }}>
        <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color:"var(--text-3)" }}>
          WORK / 作品
        </span>
        <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color:"var(--text-3)" }}>
          2023 — 2026
        </span>
      </div>
      {cats.map(cat => <Chapter key={cat.en} cat={cat} />)}
    </section>
  );
}
