"use client";

import { useState, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { WordReveal } from "@/components/WordReveal";
import { AnimLine } from "@/components/AnimLine";

/* ─── Data ─── */

const featuredMVs = [
  {
    id: "eI1O_9jBHU0",
    title: "BRING ME YOUR LOVELY",
    artist: "Kolli (NN)",
    subEn: "Music Video · AI Hybrid",
    subZh: "音樂錄影帶 · AI 製作",
    role: "DIR · DP · AI",
    tags: ["MUSIC VIDEO", "DIR", "DP", "AI"],
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

const trilogy = [
  { id: "erQ9lR_rNik", title: "流明 Lumen",    ep: "Ⅰ", artist: "陳卓 Jon Chen", role: "DIR · DP", cat: "TRILOGY" },
  { id: "cIsS50e6YQ0", title: "光圈 Aperture", ep: "Ⅱ", artist: "陳卓 Jon Chen", role: "DIR · DP", cat: "TRILOGY" },
  { id: "sxrucEXI9-A", title: "沒收 Deprived", ep: "Ⅲ", artist: "陳卓 Jon Chen", role: "DIR · DP", cat: "TRILOGY" },
];

const colorCredits = [
  { id: "XJSI9s3-wk0", title: "沒有你的世界",    artist: "Lil RAD & Coy6oi",            role: "DP · COLOR",  cat: "COLOR" },
  { id: "_IUqMAI5GQg", title: "說了算",          artist: "亥伯龍 · Doggy Chang · 7type", role: "COLOR",       cat: "COLOR" },
  { id: "AuaEpljXpR8", title: "B.A.C 亚洲大尾", artist: "7type & 66 & CHE",             role: "COLOR",       cat: "COLOR" },
  { id: "0jyUrpj5Jiw", title: "DaLow",          artist: "大樓DaLow ft. C Grass",         role: "COLOR",       cat: "COLOR" },
  { id: "kUvT3eBfN9w", title: "愛你真的梅辦法", artist: "89教科書",                      role: "COLOR",       cat: "COLOR" },
];

const shortFilm = {
  id: "fR2TDfx04oU",
  title: "紅箱子",
  artist: "劇情短片",
  award: "入圍 2023 新北市學生影像新星獎",
  role: "DIR · DP · EDIT",
  cat: "SHORT FILM",
};

const eventVideos = [
  { id: "IIMY2J3egHk", title: "擁擁｜抓周一歲儀式",   artist: "",          role: "DIR · DP",          cat: "EVENT"      },
  { id: "IGa91QIW84M", title: "DJ SOCUTE 演出記錄",   artist: "",          role: "DIR · DP",          cat: "LIVE"       },
  { id: "mXNbiHiC6bI", title: "USR計畫 V4 活動紀錄",  artist: "",          role: "DIR · DP",          cat: "DOCUMENTARY"},
  { id: "8JIvM93l0SQ", title: "九龍灣鳳靈修院 南巡",  artist: "",          role: "DIR · DP",          cat: "EVENT"      },
  { id: "Ou1y4dnFrsU", title: "台中好聖誕",           artist: "台中市政府", role: "DIR · DP",          cat: "COMMERCIAL" },
  { id: "7rU2JUGplXw", title: "皮泰中學 55週年 校慶", artist: "",          role: "DIR · DP",          cat: "EVENT"      },
  { id: "PKMi1HPRX-E", title: "V6｜燈光、調光",       artist: "",          role: "LIGHTING · COLOR",  cat: "COMMERCIAL" },
  { id: "FM5ukv7kqBM", title: "助理導演 作品",         artist: "",          role: "AD · ASSISTANT DIR",cat: "MUSIC VIDEO"},
];

const ytShorts = [
  { id: "pFvDTEf9fh0", title: "你說想養大貓咪 — AI 生給你", tags: ["#AIGC", "#AI動物"] },
  { id: "43uhkGuAitU", title: "DJI Osmo 360 開箱",           tags: ["#器材", "#DJI"]   },
  { id: "EoJmdg8SxsI", title: "Short Film",                  tags: ["#短片"]            },
  { id: "5Y5u1Mtbmmo", title: "Short Film",                  tags: ["#短片"]            },
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

/* ─── Role badge ─── */
function RoleTag({ text }: { text: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-space-mono), monospace",
      fontSize: 7, letterSpacing: "0.2em",
      color: "rgba(255,255,255,0.7)",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.2)",
      padding: "2px 7px", borderRadius: 1,
      display: "inline-block",
    }}>{text}</span>
  );
}

/* ─── Hover preview wrapper ─── */
function HoverPreview({ id, aspectRatio = "16/9", children }: {
  id: string; aspectRatio?: string; children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  return (
    <div className="relative overflow-hidden"
      style={{ aspectRatio, borderRadius: 3, background: "#050505" }}
      onMouseEnter={() => { timer.current = setTimeout(() => setActive(true), 420); }}
      onMouseLeave={() => { clearTimeout(timer.current); setActive(false); }}>
      {children}
      {active && (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${id}`}
          allow="autoplay; encrypted-media"
          style={{ pointerEvents: "none" }}
          title="preview"
        />
      )}
    </div>
  );
}

/* ─── Video Card — used for all non-featured videos ─── */
function VideoCard({ id, title, artist, role, cat, ep }: {
  id: string; title: string; artist?: string;
  role: string; cat?: string; ep?: string;
}) {
  return (
    <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="group block">
      <HoverPreview id={id}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }} />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.18)", transition: "background .4s" }} />
        {/* Category badge */}
        {cat && (
          <div className="absolute top-2 left-2">
            <span className="font-mono-label text-[6px] tracking-widest px-1.5 py-0.5"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.6)" }}>
              {ep ? `${cat} ${ep}` : cat}
            </span>
          </div>
        )}
        {/* Hover play indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            <span className="font-mono-label text-[7px] tracking-widest" style={{ color: "rgba(255,255,255,0.85)" }}>PREVIEW</span>
          </div>
        </div>
      </HoverPreview>
      <div className="pt-2.5 pb-1">
        <p className="text-[12px] font-medium leading-snug" style={{ color: "var(--text)" }}>{title}</p>
        {artist && <p className="font-mono-label text-[8px] mt-0.5" style={{ color: "var(--text-3)" }}>{artist}</p>}
        <div className="mt-1.5"><RoleTag text={role} /></div>
      </div>
    </a>
  );
}

/* ─── Section divider ─── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-8 first:mt-0">
      <p className="font-mono-label text-[9px] tracking-[0.3em] shrink-0" style={{ color: "var(--text-3)" }}>{label}</p>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

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

/* ─── Featured MV selector card ─── */
function MvCard({ v, active, onClick }: { v: typeof featuredMVs[0]; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-left w-full group" style={{ opacity: active ? 1 : 0.4, transition: "opacity .4s" }}>
      <div className="relative overflow-hidden mb-2.5" style={{ aspectRatio: "16/9", borderRadius: 3, background: "#050505" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
        <div className="absolute inset-0" style={{ background: active ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.55)", transition: "background .4s" }} />
        <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
          {v.tags.map(t => (
            <span key={t} className="font-mono-label text-[6px] tracking-widest px-1.5 py-0.5"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.7)" }}>
              {t}
            </span>
          ))}
        </div>
        {active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <svg className="w-3.5 h-3.5 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        )}
      </div>
      <p className="font-mono-label text-[8px] tracking-[0.25em] mb-0.5" style={{ color: "var(--text-3)" }}>{v.subEn}</p>
      <p className="text-[13px] font-medium leading-tight" style={{ color: "var(--text)" }}>{v.title}</p>
      {v.artist && <p className="font-mono-label text-[9px] mt-0.5" style={{ color: "var(--text-3)" }}>{v.artist}</p>}
      <div className="mt-1.5"><RoleTag text={v.role} /></div>
    </button>
  );
}

/* ─── Main ─── */
export default function WorkVideo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying]     = useState(false);
  const { ripples: pr, trigger: pt } = useRipple();

  const { ref: hRef,  inView: hIn  } = useInView(0.05);
  const { ref: pRef,  inView: pIn  } = useInView(0.04);
  const { ref: wRef,  inView: wIn  } = useInView(0.02);
  const { ref: evRef, inView: evIn } = useInView(0.02);
  const { ref: sRef,  inView: sIn  } = useInView(0.04);
  const { ref: igRef, inView: igIn } = useInView(0.04);

  const active = featuredMVs[activeIdx];

  return (
    <section style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── HEADER — sticky ── */}
      <div ref={hRef} className="border-b px-8 md:px-14 pt-20 pb-5"
        style={{
          borderColor: "var(--border)",
          position: "sticky", top: 0, zIndex: 10,
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}>
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

      {/* ── 01 · FEATURED — selector + big player ── */}
      <div ref={pRef} className="grid md:grid-cols-[1fr_2.4fr] border-b"
        style={{ minHeight: "90vh", borderColor: "var(--border)" }}>

        {/* Left: selector */}
        <div className="border-r p-6 md:p-8 flex flex-col gap-5"
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

        {/* Right: player */}
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
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.22)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <svg className="w-6 h-6 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <p className="font-mono-label text-[9px] tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>CLICK TO PLAY</p>
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
              <p className="font-mono-label text-[9px] mt-0.5" style={{ color: "var(--text-3)" }}>{active.subZh}</p>
            </div>
            <div className="flex items-center gap-3">
              <RoleTag text={active.role} />
              {playing && (
                <button onClick={e => { e.stopPropagation(); setPlaying(false); }}
                  className="font-mono-label text-[8px] tracking-widest px-3 py-1.5"
                  style={{ color: "var(--text-3)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  STOP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 02 · ALL WORKS — unified clean grid ── */}
      <div ref={wRef} className="px-8 md:px-14 py-10 border-b" style={{ borderColor: "var(--border)" }}>

        {/* Light & Scene Trilogy */}
        <div style={{ opacity: wIn ? 1 : 0, transition: "opacity .8s ease" }}>
          <SectionLabel label="LIGHT & SCENE TRILOGY / 光與景三部曲 — 陳卓 Jon Chen · 獲獎系列" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">
            {trilogy.map((v, i) => (
              <AnimLine key={v.id} delay={0.08 + i * 0.1} inView={wIn}>
                <VideoCard id={v.id} title={v.title} artist={v.artist} role={v.role} cat={`${v.cat} ${v.ep}`} />
              </AnimLine>
            ))}
          </div>
        </div>

        {/* Color Grade */}
        <div style={{ opacity: wIn ? 1 : 0, transition: "opacity .8s ease .1s" }}>
          <SectionLabel label="COLOR GRADE / 調色作品" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {colorCredits.map((v, i) => (
              <AnimLine key={v.id} delay={0.1 + i * 0.07} inView={wIn}>
                <VideoCard id={v.id} title={v.title} artist={v.artist} role={v.role} />
              </AnimLine>
            ))}
          </div>
        </div>

        {/* Short Film */}
        <div style={{ opacity: wIn ? 1 : 0, transition: "opacity .8s ease .15s" }}>
          <SectionLabel label="SHORT FILM / 劇情短片" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimLine delay={0.1} inView={wIn}>
              <div>
                <a href={`https://www.youtube.com/watch?v=${shortFilm.id}`} target="_blank" rel="noopener noreferrer" className="group block">
                  <HoverPreview id={shortFilm.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${shortFilm.id}/maxresdefault.jpg`} alt={shortFilm.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${shortFilm.id}/hqdefault.jpg`; }} />
                    <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.2)" }} />
                    <div className="absolute top-2 left-2">
                      <span className="font-mono-label text-[6px] tracking-widest px-2 py-1"
                        style={{ background: "rgba(255,220,80,0.15)", border: "1px solid rgba(255,220,80,0.3)", color: "rgba(255,220,80,0.9)", backdropFilter: "blur(8px)" }}>
                        ★ {shortFilm.award}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1.5 px-3 py-1.5"
                        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        <span className="font-mono-label text-[7px] tracking-widest" style={{ color: "rgba(255,255,255,0.85)" }}>PREVIEW</span>
                      </div>
                    </div>
                  </HoverPreview>
                  <div className="pt-2.5">
                    <p className="text-[12px] font-medium" style={{ color: "var(--text)" }}>{shortFilm.title}</p>
                    <p className="font-mono-label text-[8px] mt-0.5" style={{ color: "var(--text-3)" }}>{shortFilm.artist}</p>
                    <div className="mt-1.5"><RoleTag text={shortFilm.role} /></div>
                  </div>
                </a>
              </div>
            </AnimLine>
          </div>
        </div>
      </div>

      {/* ── 03 · EVENT & COMMERCIAL ── */}
      <div ref={evRef} className="px-8 md:px-14 py-10 border-b" style={{ borderColor: "var(--border)" }}>
        <div style={{ opacity: evIn ? 1 : 0, transition: "opacity .8s ease" }}>
          <SectionLabel label="EVENT & COMMERCIAL / 活動 · 商業" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventVideos.map((v, i) => (
              <AnimLine key={v.id} delay={0.06 + i * 0.06} inView={evIn}>
                <VideoCard id={v.id} title={v.title} artist={v.artist} role={v.role} cat={v.cat} />
              </AnimLine>
            ))}
          </div>
        </div>
      </div>

      {/* ── 04 · YOUTUBE SHORTS ── */}
      <div ref={sRef} className="px-8 md:px-14 py-8 border-b" style={{ borderColor: "var(--border)" }}>
        <div style={{ opacity: sIn ? 1 : 0, transition: "opacity .6s ease" }}>
          <SectionLabel label="YOUTUBE SHORTS" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {ytShorts.map((s, i) => (
            <div key={s.id} className="shrink-0" style={{ width: 120, opacity: sIn ? 1 : 0, transform: sIn ? "translateY(0)" : "translateY(20px)", transition: `opacity .6s ease ${i * .1}s, transform .6s ease ${i * .1}s` }}>
              <a href={`https://youtube.com/shorts/${s.id}`} target="_blank" rel="noopener noreferrer" className="group block">
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

      {/* ── 05 · IG Reels CTA ── */}
      <div ref={igRef}>
        <a href="https://www.instagram.com/minehoooo.arw/" target="_blank" rel="noopener noreferrer"
          className="group block relative overflow-hidden border-t"
          style={{ borderColor: "var(--border)" }}>

          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
            background: "radial-gradient(ellipse 70% 90% at 50% 60%, rgba(120,60,220,0.09) 0%, transparent 70%)",
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "20% 100%",
          }} />

          <div className="relative px-8 md:px-14 pt-14 pb-10 flex flex-col gap-6">
            <div style={{ opacity: igIn ? 1 : 0, transition: "opacity .8s ease" }}>
              <p className="font-mono-label text-[9px] tracking-[0.35em]" style={{ color: "var(--text-3)" }}>
                INSTAGRAM · @minehoooo.arw
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
              style={{ opacity: igIn ? 1 : 0, transform: igIn ? "translateY(0)" : "translateY(40px)", transition: "opacity .9s ease .1s, transform .9s cubic-bezier(.16,1,.3,1) .1s" }}>
              <div>
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

              <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                <div className="hidden md:flex flex-col gap-[3px]">
                  {allReels.map((r) => (
                    <div key={r.code} style={{
                      width: r.tier === 1 ? 32 : r.tier === 2 ? 24 : r.tier === 3 ? 18 : 12,
                      height: 2,
                      borderRadius: 1,
                      background: r.tier === 1
                        ? "rgba(255,255,255,0.5)"
                        : r.tier === 2
                        ? "rgba(60,140,255,0.4)"
                        : r.tier === 3
                        ? "rgba(60,200,160,0.3)"
                        : "rgba(220,120,60,0.25)",
                    }} />
                  ))}
                </div>

                {/* CTA button — bigger IG icon */}
                <div className="flex items-center gap-3 px-5 py-3.5 transition-all duration-400 group-hover:bg-white/5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                  }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
                    <circle cx="17.5" cy="6.5" r="1.4" fill="rgba(255,255,255,0.8)"/>
                  </svg>
                  <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color: "var(--text)" }}>
                    OPEN INSTAGRAM
                  </span>
                  <span style={{ color: "var(--text)", fontSize: 16 }}>↗</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

    </section>
  );
}
