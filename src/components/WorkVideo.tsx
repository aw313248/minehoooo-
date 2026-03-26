"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { WordReveal } from "@/components/WordReveal";

/* ─── Data ─── */

const featuredMVs = [
  {
    id: "eI1O_9jBHU0",
    title: "BRING ME YOUR LOVELY",
    artist: "Kolli (NN)",
    subEn: "Music Video",
    subZh: "音樂錄影帶",
    role: "DIR · DP · COLOR",
    tags: ["MUSIC VIDEO", "DIR", "DP"],
  },
  {
    id: "hk43CW2Kqow",
    title: "LAST 10",
    artist: "",
    subEn: "Music Video · AI Hybrid",
    subZh: "MV 創作 · AI 製作 50%",
    role: "DIR · DP · AI 50%",
    tags: ["MUSIC VIDEO", "AI HYBRID"],
  },
];

const prestigeMVs = [
  {
    id: "W7E5bJ1Cmuo",
    title: "我們的愛 Our Love",
    artist: "陳芳語 Kimberley Chen",
    role: "COLOR",
    label: "SKRpresents · 陶山音樂",
  },
  {
    id: "mQ0KWgkGHlw",
    title: "侵愛的 Toxic Love",
    artist: "陳芳語 Kimberley Chen",
    role: "COLOR",
    label: "SKRpresents · 陶山音樂",
  },
];

const trilogy = [
  { id: "erQ9lR_rNik", title: "流明 Lumen",      ep: "Ⅰ", artist: "陳卓 Jon Chen", role: "DIR · DP" },
  { id: "cIsS50e6YQ0", title: "光圈 Aperture",   ep: "Ⅱ", artist: "陳卓 Jon Chen", role: "DIR · DP" },
  { id: "sxrucEXI9-A", title: "沒收 Deprived",   ep: "Ⅲ", artist: "陳卓 Jon Chen", role: "DIR · DP" },
];

const colorCredits = [
  { id: "XJSI9s3-wk0", title: "沒有你的世界",      artist: "Lil RAD & Coy6oi",            role: "DP · COLOR" },
  { id: "_IUqMAI5GQg", title: "說了算",            artist: "亥伯龍 · Doggy Chang · 7type", role: "COLOR"      },
  { id: "AuaEpljXpR8", title: "B.A.C 亚洲大尾",   artist: "7type & 66 & CHE",             role: "COLOR"      },
  { id: "0jyUrpj5Jiw", title: "DaLow",            artist: "大樓DaLow ft. C Grass",         role: "COLOR"      },
  { id: "kUvT3eBfN9w", title: "愛你真的梅辦法",   artist: "89教科書",                      role: "COLOR"      },
];

const shortFilm = {
  id: "fR2TDfx04oU",
  title: "紅箱子",
  subZh: "劇情短片",
  award: "入圍 2023 新北市學生影像新星獎",
  role: "DIR · DP · EDIT",
};

const eventVideos = [
  { id: "IIMY2J3egHk", title: "擁擁｜抓周一歲儀式",        category: "EVENT",       role: "DIR · DP" },
  { id: "IGa91QIW84M", title: "DJ SOCUTE 演出記錄",        category: "LIVE",        role: "DIR · DP" },
  { id: "mXNbiHiC6bI", title: "USR計畫 V4 活動紀錄",       category: "DOCUMENTARY", role: "DIR · DP" },
  { id: "8JIvM93l0SQ", title: "九龍灣鳳靈修院 南巡",       category: "EVENT",       role: "DIR · DP" },
  { id: "Ou1y4dnFrsU", title: "台中好聖誕",                category: "EVENT",       role: "DIR · DP" },
  { id: "7rU2JUGplXw", title: "皮泰中學 55週年 校慶",      category: "EVENT",       role: "DIR · DP" },
  { id: "PKMi1HPRX-E", title: "V6｜燈光、調光",           category: "COMMERCIAL",  role: "LIGHTING · COLOR" },
];

const ytShorts = [
  { id: "pFvDTEf9fh0",  title: "你說想養大貓咪 — AI 生給你", tags: ["#AIGC", "#AI動物"] },
  { id: "43uhkGuAitU",  title: "DJI Osmo 360 開箱",         tags: ["#器材", "#DJI"]   },
  { id: "EoJmdg8SxsI",  title: "Short Film",                tags: ["#短片"]            },
  { id: "5Y5u1Mtbmmo",  title: "Short Film",                tags: ["#短片"]            },
];

const allReels = [
  { code: "DV3dhDzk-tv", tier: 1, year: "2026" },
  { code: "DVqvaWVEntr", tier: 1, year: "2026" },
  { code: "DVjCLj0kq-A", tier: 1, year: "2025" },
  { code: "DViau5bkjjN", tier: 1, year: "2025" },
  { code: "DVQvmpNEt8k", tier: 1, year: "2025" },
  { code: "DT-tdb1Evcw", tier: 2, year: "2025" },
  { code: "DTihUcyEiZ-", tier: 2, year: "2025" },
  { code: "DTg9q2_kpmY", tier: 2, year: "2025" },
  { code: "DTej6F4ksVj", tier: 2, year: "2025" },
  { code: "DS5dU_REr14", tier: 3, year: "2024" },
  { code: "DSxZw9jkok2", tier: 3, year: "2024" },
  { code: "DO02gpikrGH", tier: 3, year: "2024" },
  { code: "DIUb2hYziLU", tier: 3, year: "2024" },
  { code: "C-EoltissgJ", tier: 4, year: "2023" },
  { code: "C7qbfK8S-pr", tier: 4, year: "2023" },
  { code: "C35vYmTSML-", tier: 4, year: "2023" },
];

/* ─── Ripple ─── */
function useRipple() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const trigger = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(p => [...p, { x: e.clientX - r.left, y: e.clientY - r.top, id }]);
    setTimeout(() => setRipples(p => p.filter(x => x.id !== id)), 700);
  };
  return { ripples, trigger };
}

/* ─── MV Selector card ─── */
function MvCard({ v, active, onClick }: { v: typeof featuredMVs[0]; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-left w-full group" style={{ opacity: active ? 1 : 0.4, transition: "opacity .4s" }}>
      <div className="relative overflow-hidden mb-3" style={{ aspectRatio: "16/9", borderRadius: 3, background: "#050505" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
        <div className="absolute inset-0" style={{ background: active ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.55)", transition: "background .4s" }} />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {v.tags.map(t => (
            <span key={t} className="font-mono-label text-[7px] tracking-widest px-2 py-0.5"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.7)" }}>
              {t}
            </span>
          ))}
        </div>
        {active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <svg className="w-4 h-4 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        )}
      </div>
      <p className="font-mono-label text-[8px] tracking-[0.3em] mb-1" style={{ color: "var(--text-3)" }}>{v.subEn}</p>
      <p className="text-[13px] font-medium leading-tight" style={{ color: "var(--text)" }}>{v.title}</p>
      {v.artist && <p className="font-mono-label text-[9px] mt-0.5" style={{ color: "var(--text-3)" }}>{v.artist}</p>}
      <p className="font-mono-label text-[8px] mt-1" style={{ color: "var(--text-3)" }}>{v.role}</p>
    </button>
  );
}

/* ─── Mini thumbnail + link ─── */
function ThumbLink({ id, title, role, sub }: { id: string; title: string; role: string; sub?: string }) {
  return (
    <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="group flex gap-3 items-start">
      <div className="shrink-0 relative overflow-hidden" style={{ width: 64, height: 36, borderRadius: 2, background: "#050505" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }} />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.4)" }}>
          <svg className="w-3 h-3 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium leading-tight truncate" style={{ color: "var(--text)" }}>{title}</p>
        {sub && <p className="font-mono-label text-[8px] mt-0.5 truncate" style={{ color: "var(--text-3)" }}>{sub}</p>}
        <p className="font-mono-label text-[7px] mt-0.5" style={{ color: "var(--text-3)" }}>{role}</p>
      </div>
    </a>
  );
}

/* ─── Section divider ─── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <p className="font-mono-label text-[9px] tracking-[0.3em] shrink-0" style={{ color: "var(--text-3)" }}>{label}</p>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

/* ─── Main ─── */
export default function WorkVideo() {
  const [activeIdx, setActiveIdx]    = useState(0);
  const [playing, setPlaying]        = useState(false);
  const [triPlay, setTriPlay]        = useState<number | null>(null);
  const { ripples: pr, trigger: pt } = useRipple();

  const { ref: hRef,  inView: hIn  } = useInView(0.05);
  const { ref: pRef,  inView: pIn  } = useInView(0.04);
  const { ref: p2Ref, inView: p2In } = useInView(0.04);
  const { ref: tRef,  inView: tIn  } = useInView(0.04);
  const { ref: cRef,  inView: cIn  } = useInView(0.04);
  const { ref: sfRef, inView: sfIn } = useInView(0.04);
  const { ref: evRef, inView: evIn } = useInView(0.04);
  const { ref: sRef,  inView: sIn  } = useInView(0.04);
  const { ref: igRef, inView: igIn } = useInView(0.04);

  const active = featuredMVs[activeIdx];

  return (
    <section className="h-screen flex flex-col overflow-hidden" style={{ background: "#000" }}>

      {/* ── HEADER ── */}
      <div ref={hRef} className="border-b px-8 md:px-14 pt-20 pb-5 shrink-0"
        style={{ borderColor: "var(--border)" }}>
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono-label text-[9px] tracking-[0.35em] block mb-2"
              style={{ color: "var(--text-3)", opacity: hIn ? 1 : 0, transition: "opacity .8s ease" }}>
              03 — 影片
            </span>
            <h2 className="font-display leading-none" style={{ fontSize: "clamp(3.5rem,9vw,11rem)", color: "var(--text)" }}>
              <WordReveal text="Video" inView={hIn} baseDelay={0.08} stagger={0.06} />
            </h2>
          </div>
          <p className="font-mono-label text-[9px] text-right hidden md:block pb-2" style={{ color: "var(--text-3)" }}>
            Music Video · Short Film<br />Commercial · IG Reels
          </p>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

        {/* ── 01 · Featured MVs ── */}
        <div ref={pRef} className="grid md:grid-cols-[1fr_1.8fr] border-b min-h-[50vh]"
          style={{ borderColor: "var(--border)" }}>

          <div className="border-r p-6 md:p-10 flex flex-col gap-4"
            style={{
              borderColor: "var(--border)",
              opacity: pIn ? 1 : 0,
              transform: pIn ? "translateY(0)" : "translateY(32px)",
              transition: "opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)",
            }}>
            <SectionLabel label="MUSIC VIDEO / 音樂錄影帶" />
            {featuredMVs.map((v, i) => (
              <MvCard key={v.id} v={v} active={activeIdx === i}
                onClick={() => { setActiveIdx(i); setPlaying(false); }} />
            ))}
          </div>

          <div className="relative p-6 md:p-10 flex flex-col justify-center"
            style={{ opacity: pIn ? 1 : 0, transition: "opacity .8s ease .15s" }}>
            <div className="relative w-full overflow-hidden"
              style={{ aspectRatio: "16/9", borderRadius: 4, background: "#050505" }}
              onClick={e => { pt(e); setPlaying(true); }}>
              {pr.map(r => (
                <span key={r.id} style={{
                  position: "absolute", left: r.x - 60, top: r.y - 60,
                  width: 120, height: 120, borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  animation: "ripple .7s ease-out forwards", pointerEvents: "none",
                }} />
              ))}
              {!playing ? (
                <div className="absolute inset-0 group cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://img.youtube.com/vi/${active.id}/maxresdefault.jpg`} alt={active.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${active.id}/hqdefault.jpg`; }} />
                  <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.28)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <svg className="w-6 h-6 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1&color=white`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-[16px] font-medium" style={{ color: "var(--text)" }}>{active.title}</p>
                <p className="font-mono-label text-[9px] mt-0.5" style={{ color: "var(--text-3)" }}>{active.role} · {active.subZh}</p>
              </div>
              {playing && (
                <button onClick={() => setPlaying(false)}
                  className="font-mono-label text-[8px] tracking-widest px-3 py-1.5"
                  style={{ color: "var(--text-3)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  STOP
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── 02 · 陳芳語 Kimberley Chen ── */}
        <div ref={p2Ref} className="border-b px-8 md:px-14 py-8"
          style={{
            borderColor: "var(--border)",
            opacity: p2In ? 1 : 0,
            transform: p2In ? "translateY(0)" : "translateY(24px)",
            transition: "opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)",
          }}>
          <SectionLabel label="FEATURED ARTIST / 合作藝人" />
          <div className="grid md:grid-cols-2 gap-4">
            {prestigeMVs.map(v => (
              <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative overflow-hidden mb-3"
                  style={{ aspectRatio: "16/9", borderRadius: 3, background: "#050505" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
                  <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)", transition: "background .4s" }} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                      <svg className="w-4 h-4 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  {/* Role tag */}
                  <div className="absolute bottom-3 left-3">
                    <span className="font-mono-label text-[7px] tracking-widest px-2 py-0.5"
                      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.7)" }}>
                      {v.role}
                    </span>
                  </div>
                </div>
                <p className="text-[13px] font-medium" style={{ color: "var(--text)" }}>{v.title}</p>
                <p className="font-mono-label text-[9px] mt-0.5" style={{ color: "var(--text-3)" }}>{v.artist}</p>
                <p className="font-mono-label text-[8px] mt-0.5" style={{ color: "var(--text-3)" }}>{v.label}</p>
              </a>
            ))}
          </div>
        </div>

        {/* ── 03 · 光與景三部曲 ── */}
        <div ref={tRef} className="border-b px-8 md:px-14 py-8"
          style={{ borderColor: "var(--border)" }}>
          <div style={{ opacity: tIn ? 1 : 0, transform: tIn ? "translateY(0)" : "translateY(24px)", transition: "opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)" }}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <SectionLabel label="LIGHT & SCENE TRILOGY / 光與景三部曲" />
                <p className="font-mono-label text-[9px]" style={{ color: "var(--text-3)", marginTop: -12 }}>陳卓 Jon Chen · 獲獎系列</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {trilogy.map((v, i) => (
                <div key={v.id} style={{ opacity: tIn ? 1 : 0, transform: tIn ? "translateY(0)" : "translateY(20px)", transition: `opacity .7s ease ${i * .1}s, transform .7s cubic-bezier(.16,1,.3,1) ${i * .1}s` }}>
                  <div className="relative overflow-hidden mb-2.5 group"
                    style={{ aspectRatio: "16/9", borderRadius: 3, background: "#050505" }}
                    onClick={() => setTriPlay(triPlay === i ? null : i)}>
                    {triPlay === i ? (
                      <iframe className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`}
                        title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
                    ) : (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
                        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
                        <div className="absolute top-2 left-2">
                          <span className="font-mono-label text-[8px] tracking-widest px-2 py-0.5"
                            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            {v.ep}
                          </span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                            <svg className="w-3 h-3 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-[12px] font-medium" style={{ color: "var(--text)" }}>{v.title}</p>
                  <p className="font-mono-label text-[8px] mt-0.5" style={{ color: "var(--text-3)" }}>{v.artist} · {v.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 04 · Color Credits + Short Film ── */}
        <div className="grid md:grid-cols-[1.4fr_1fr] border-b" style={{ borderColor: "var(--border)" }}>

          {/* Color grade credits */}
          <div ref={cRef} className="border-r p-8 md:p-10"
            style={{ borderColor: "var(--border)", opacity: cIn ? 1 : 0, transition: "opacity .8s ease" }}>
            <SectionLabel label="COLOR GRADE / 調色作品" />
            <div className="space-y-3">
              {colorCredits.map((v, i) => (
                <div key={v.id}
                  style={{ opacity: cIn ? 1 : 0, transform: cIn ? "translateY(0)" : "translateY(16px)", transition: `opacity .6s ease ${i * .07}s, transform .6s ease ${i * .07}s` }}>
                  <ThumbLink id={v.id} title={v.title} role={v.role} sub={v.artist} />
                </div>
              ))}
            </div>
          </div>

          {/* Short Film — 紅箱子 */}
          <div ref={sfRef} className="p-8 md:p-10 flex flex-col"
            style={{ opacity: sfIn ? 1 : 0, transform: sfIn ? "translateY(0)" : "translateY(24px)", transition: "opacity .8s ease .1s, transform .8s cubic-bezier(.16,1,.3,1) .1s" }}>
            <SectionLabel label="SHORT FILM / 劇情短片" />
            <a href={`https://www.youtube.com/watch?v=${shortFilm.id}`} target="_blank" rel="noopener noreferrer" className="group block flex-1">
              <div className="relative overflow-hidden mb-3"
                style={{ aspectRatio: "16/9", borderRadius: 3, background: "#050505" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://img.youtube.com/vi/${shortFilm.id}/maxresdefault.jpg`} alt={shortFilm.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${shortFilm.id}/hqdefault.jpg`; }} />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
                {/* Award badge */}
                <div className="absolute top-3 left-3 right-3">
                  <span className="font-mono-label text-[7px] tracking-widest px-2 py-1 block w-fit"
                    style={{ background: "rgba(255,220,80,0.15)", border: "1px solid rgba(255,220,80,0.3)", color: "rgba(255,220,80,0.9)", backdropFilter: "blur(8px)" }}>
                    ★ {shortFilm.award}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <svg className="w-4 h-4 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
              <p className="text-[14px] font-medium" style={{ color: "var(--text)" }}>{shortFilm.title}</p>
              <p className="font-mono-label text-[8px] mt-1" style={{ color: "var(--text-3)" }}>{shortFilm.role}</p>
            </a>
          </div>
        </div>

        {/* ── 05 · Event & Commercial ── */}
        <div ref={evRef} className="border-b px-8 md:px-14 py-8"
          style={{ borderColor: "var(--border)", opacity: evIn ? 1 : 0, transition: "opacity .8s ease" }}>
          <SectionLabel label="EVENT & COMMERCIAL / 活動 · 商業" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {eventVideos.map((v, i) => (
              <div key={v.id} style={{ opacity: evIn ? 1 : 0, transform: evIn ? "translateY(0)" : "translateY(16px)", transition: `opacity .6s ease ${i * .06}s, transform .6s ease ${i * .06}s` }}>
                <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative overflow-hidden mb-2" style={{ aspectRatio: "16/9", borderRadius: 3, background: "#050505" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
                    <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />
                    <div className="absolute bottom-1.5 left-1.5">
                      <span className="font-mono-label text-[6px] tracking-widest px-1.5 py-0.5"
                        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", color: "rgba(255,255,255,0.6)" }}>
                        {v.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] font-medium leading-tight" style={{ color: "var(--text)" }}>{v.title}</p>
                  <p className="font-mono-label text-[7px] mt-0.5" style={{ color: "var(--text-3)" }}>{v.role}</p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── 06 · YouTube Shorts ── */}
        <div ref={sRef} className="px-8 md:px-14 py-7 border-b" style={{ borderColor: "var(--border)" }}>
          <div style={{ opacity: sIn ? 1 : 0, transition: "opacity .6s ease" }}>
            <SectionLabel label="YOUTUBE SHORTS" />
          </div>
          <div className="flex gap-5">
            {ytShorts.map((s, i) => (
              <div key={s.id} style={{ opacity: sIn ? 1 : 0, transform: sIn ? "translateY(0)" : "translateY(20px)", transition: `opacity .6s ease ${i * .1}s, transform .6s ease ${i * .1}s` }}>
                <a href={`https://youtube.com/shorts/${s.id}`} target="_blank" rel="noopener noreferrer"
                  className="group block" style={{ width: 100 }}>
                  <div className="relative overflow-hidden mb-2" style={{ aspectRatio: "9/16", borderRadius: 3, background: "#080808" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${s.id}/hqdefault.jpg`} alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-end pb-2 pl-2">
                      <span className="font-mono-label text-[6px] tracking-widest px-1.5 py-0.5"
                        style={{ background: "rgba(0,0,0,0.7)", color: "rgba(255,255,255,0.7)" }}>SHORTS</span>
                    </div>
                  </div>
                  <p className="text-[10px] leading-tight font-medium" style={{ color: "var(--text)" }}>{s.title}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {s.tags.map(t => <span key={t} className="font-mono-label text-[7px]" style={{ color: "var(--text-3)" }}>{t}</span>)}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── 07 · IG Reels — large editorial CTA ── */}
        <div ref={igRef}>
          <a href="https://instagram.com/minehoooo" target="_blank" rel="noopener noreferrer"
            className="group block relative overflow-hidden border-t"
            style={{ borderColor: "var(--border)" }}>

            {/* Frosted glass tinted glow — hover only */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
              background: "radial-gradient(ellipse 70% 90% at 50% 60%, rgba(120,60,220,0.09) 0%, transparent 70%)",
            }} />

            {/* Vertical grid lines */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "20% 100%",
            }} />

            <div className="relative px-8 md:px-14 pt-14 pb-10 flex flex-col gap-6">

              {/* Top: label */}
              <div style={{ opacity: igIn ? 1 : 0, transition: "opacity .8s ease" }}>
                <p className="font-mono-label text-[9px] tracking-[0.35em]" style={{ color: "var(--text-3)" }}>
                  INSTAGRAM · @minehoooo
                </p>
              </div>

              {/* Middle: bold count + copy */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                style={{ opacity: igIn ? 1 : 0, transform: igIn ? "translateY(0)" : "translateY(40px)", transition: "opacity .9s ease .1s, transform .9s cubic-bezier(.16,1,.3,1) .1s" }}>

                <div>
                  {/* Giant number */}
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-display leading-none" style={{ fontSize: "clamp(5rem,16vw,18rem)", color: "var(--text)", letterSpacing: "0.01em" }}>
                      {allReels.length}
                    </span>
                    <div>
                      <p className="font-mono-label text-[9px] tracking-[0.25em]" style={{ color: "var(--text-3)" }}>SHORT</p>
                      <p className="font-mono-label text-[9px] tracking-[0.25em]" style={{ color: "var(--text-3)" }}>FILMS</p>
                    </div>
                  </div>
                  <p className="font-mono-label text-[10px] tracking-[0.2em]" style={{ color: "var(--text-2)" }}>
                    還有更多作品在這裡，持續更新中
                  </p>
                  <p className="font-mono-label text-[9px] tracking-[0.2em] mt-1" style={{ color: "var(--text-3)" }}>
                    The work never stops — follow along
                  </p>
                </div>

                {/* Right: CTA */}
                <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                  {/* Decorative bars — each reel */}
                  <div className="hidden md:flex flex-col gap-[3px]">
                    {allReels.map((r) => (
                      <div key={r.code} style={{
                        width: r.tier === 1 ? 32 : r.tier === 2 ? 24 : r.tier === 3 ? 18 : 12,
                        height: 2,
                        borderRadius: 1,
                        alignSelf: "flex-end",
                        background: r.tier === 1
                          ? "rgba(160,80,255,0.55)"
                          : r.tier === 2
                          ? "rgba(60,140,255,0.4)"
                          : r.tier === 3
                          ? "rgba(60,200,160,0.3)"
                          : "rgba(220,120,60,0.25)",
                      }} />
                    ))}
                  </div>

                  {/* CTA button — frosted glass */}
                  <div className="flex items-center gap-3 px-5 py-3 transition-all duration-400 group-hover:bg-white/5"
                    style={{
                      border: "1px solid rgba(255,255,255,0.15)",
                      backdropFilter: "blur(12px)",
                    }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                      <circle cx="17.5" cy="6.5" r="1.2" fill="rgba(255,255,255,0.7)"/>
                    </svg>
                    <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color: "var(--text)" }}>
                      OPEN INSTAGRAM
                    </span>
                    <span style={{ color: "var(--text)", fontSize: 14 }}>↗</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
