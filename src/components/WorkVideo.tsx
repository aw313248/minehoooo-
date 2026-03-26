"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { WordReveal } from "@/components/WordReveal";

/* ─── Data ─── */
const featuredVideos = [
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

const ytShorts = [
  { id: "pFvDTEf9fh0", title: "你說想養大貓咪 — AI 生給你", tags: ["#AIGC", "#AI動物"] },
  { id: "43uhkGuAitU", title: "DJI Osmo 360 開箱", tags: ["#器材", "#DJI"] },
];

// IG reels — all tiers flattened with metadata
const allReels = [
  { code: "DV3dhDzk-tv", tier: 1, label: "T1", year: "2026" },
  { code: "DVqvaWVEntr", tier: 1, label: "T1", year: "2026" },
  { code: "DVjCLj0kq-A", tier: 1, label: "T1", year: "2025" },
  { code: "DViau5bkjjN", tier: 1, label: "T1", year: "2025" },
  { code: "DVQvmpNEt8k", tier: 1, label: "T1", year: "2025" },
  { code: "DT-tdb1Evcw", tier: 2, label: "T2", year: "2025" },
  { code: "DTihUcyEiZ-", tier: 2, label: "T2", year: "2025" },
  { code: "DTg9q2_kpmY", tier: 2, label: "T2", year: "2025" },
  { code: "DTej6F4ksVj", tier: 2, label: "T2", year: "2025" },
  { code: "DS5dU_REr14", tier: 3, label: "T3", year: "2024" },
  { code: "DSxZw9jkok2", tier: 3, label: "T3", year: "2024" },
  { code: "DO02gpikrGH", tier: 3, label: "T3", year: "2024" },
  { code: "DIUb2hYziLU", tier: 3, label: "T3", year: "2024" },
  { code: "C-EoltissgJ", tier: 4, label: "T4", year: "2023" },
  { code: "C7qbfK8S-pr", tier: 4, label: "T4", year: "2023" },
  { code: "C35vYmTSML-", tier: 4, label: "T4", year: "2023" },
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

/* ─── Featured MV card ─── */
function MvCard({ v, active, onClick }: { v: typeof featuredVideos[0]; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-left w-full transition-all duration-400 group"
      style={{ opacity: active ? 1 : 0.4 }}>
      <div className="relative overflow-hidden mb-3" style={{ aspectRatio: "16/9", borderRadius: 3, background: "#050505" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
        <div className="absolute inset-0" style={{ background: active ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.55)", transition: "background .4s" }} />
        {/* Role badge */}
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
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
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

/* ─── Main ─── */
export default function WorkVideo() {
  const [activeIdx, setActiveIdx]       = useState(0);
  const [playing, setPlaying]           = useState(false);
  const { ripples: pr, trigger: pt }    = useRipple();
  const { ref: hRef, inView: hIn }      = useInView(0.05);
  const { ref: pRef, inView: pIn }      = useInView(0.04);
  const { ref: sRef, inView: sIn }      = useInView(0.04);
  const { ref: igRef, inView: igIn }    = useInView(0.04);
  const active = featuredVideos[activeIdx];

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
            Music Video · Short Film<br />Short Video · IG Reels
          </p>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

        {/* Featured MV — split */}
        <div ref={pRef} className="grid md:grid-cols-[1fr_1.8fr] border-b min-h-[50vh]"
          style={{ borderColor: "var(--border)" }}>

          {/* Left: thumbnail selectors */}
          <div className="border-r p-6 md:p-10 flex flex-col gap-4"
            style={{
              borderColor: "var(--border)",
              opacity: pIn ? 1 : 0,
              transform: pIn ? "translateY(0)" : "translateY(32px)",
              transition: "opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)",
            }}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-2" style={{ color: "var(--text-3)" }}>
              MUSIC VIDEO / 音樂錄影帶
            </p>
            {featuredVideos.map((v, i) => (
              <MvCard key={v.id} v={v} active={activeIdx === i}
                onClick={() => { setActiveIdx(i); setPlaying(false); }} />
            ))}
          </div>

          {/* Right: main player */}
          <div className="relative p-6 md:p-10 flex flex-col justify-center"
            style={{
              opacity: pIn ? 1 : 0,
              transition: "opacity .8s ease .15s",
            }}>
            <div className="relative w-full overflow-hidden cursor-pointer"
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
                <div className="absolute inset-0 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://img.youtube.com/vi/${active.id}/maxresdefault.jpg`} alt={active.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${active.id}/hqdefault.jpg`; }} />
                  <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
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

        {/* YouTube Shorts */}
        <div ref={sRef} className="px-8 md:px-14 py-7 border-b" style={{ borderColor: "var(--border)" }}>
          <p className="font-mono-label text-[9px] tracking-[0.3em] mb-5"
            style={{ color: "var(--text-3)", opacity: sIn ? 1 : 0, transition: "opacity .6s ease" }}>
            YOUTUBE SHORTS
          </p>
          <div className="flex gap-5">
            {ytShorts.map((s, i) => (
              <div key={s.id}
                style={{ opacity: sIn ? 1 : 0, transform: sIn ? "translateY(0)" : "translateY(20px)", transition: `opacity .6s ease ${i * .1}s, transform .6s ease ${i * .1}s` }}>
                <a href={`https://youtube.com/shorts/${s.id}`} target="_blank" rel="noopener noreferrer"
                  className="group block" style={{ width: 100 }}>
                  <div className="relative overflow-hidden mb-2"
                    style={{ aspectRatio: "9/16", borderRadius: 3, background: "#080808" }}>
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

        {/* Instagram Reels — large editorial CTA block */}
        <div ref={igRef}>
          <a href="https://instagram.com/minehoooo" target="_blank" rel="noopener noreferrer"
            className="group block relative overflow-hidden border-t"
            style={{ borderColor: "var(--border)" }}>

            {/* Background grid lines — editorial feel */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "25% 100%",
            }} />

            {/* Ambient glow on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
              background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(120,60,220,0.07) 0%, transparent 70%)",
            }} />

            <div className="relative px-8 md:px-14 py-12 md:py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">

              {/* Left — big typography */}
              <div style={{
                opacity: igIn ? 1 : 0,
                transform: igIn ? "translateY(0)" : "translateY(40px)",
                transition: "opacity .9s ease, transform .9s cubic-bezier(.16,1,.3,1)",
              }}>
                <p className="font-mono-label text-[9px] tracking-[0.35em] mb-4" style={{ color: "var(--text-3)" }}>
                  INSTAGRAM REELS · @minehoooo
                </p>
                <h3 className="font-display leading-[0.88] mb-3" style={{
                  fontSize: "clamp(4rem,11vw,13rem)",
                  color: "var(--text)",
                  letterSpacing: "0.01em",
                }}>
                  REELS
                </h3>
                <p className="font-mono-label text-[10px] tracking-[0.25em]" style={{ color: "var(--text-3)" }}>
                  {allReels.length} SHORT FILMS · IG @minehoooo
                </p>
              </div>

              {/* Right — CTA + decorative count */}
              <div className="flex flex-col items-start md:items-end gap-5" style={{
                opacity: igIn ? 1 : 0,
                transform: igIn ? "translateY(0)" : "translateY(40px)",
                transition: "opacity .9s ease .15s, transform .9s cubic-bezier(.16,1,.3,1) .15s",
              }}>
                {/* Decorative vertical filmstrip marks */}
                <div className="hidden md:flex flex-col gap-1">
                  {allReels.map((r) => (
                    <div key={r.code} style={{
                      width: 28,
                      height: 3,
                      borderRadius: 1.5,
                      background: `rgba(${r.tier === 1 ? "160,80,255" : r.tier === 2 ? "60,140,255" : r.tier === 3 ? "60,200,160" : "220,120,60"},${r.tier === 1 ? "0.5" : "0.3"})`,
                      alignSelf: "flex-end",
                    }} />
                  ))}
                </div>

                {/* Arrow CTA */}
                <div className="flex items-center gap-4">
                  <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color: "var(--text-3)" }}>
                    VIEW ON INSTAGRAM
                  </span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:bg-white/10"
                    style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                    <span style={{ color: "var(--text)", fontSize: 16 }}>↗</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom rule */}
            <div className="absolute bottom-0 left-8 md:left-14 right-8 md:right-14 h-px"
              style={{
                background: "linear-gradient(to right, rgba(255,255,255,0.12), transparent)",
                transform: igIn ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 1s cubic-bezier(.16,1,.3,1) .4s",
              }} />
          </a>
        </div>
      </div>
    </section>
  );
}
