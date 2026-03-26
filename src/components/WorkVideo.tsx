"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";


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
  {
    id: "erQ9lR_rNik",
    title: "流明 LUMEN",
    artist: "陳卓 Jon Chen",
    subEn: "Music Video · Trilogy Ⅰ",
    subZh: "音樂錄影帶 · 三部曲 Ⅰ",
    role: "DIR · DP",
    tags: ["MUSIC VIDEO", "TRILOGY"],
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
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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

/* ─── Section divider ─── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-8 first:mt-0">
      <p className="font-mono-label text-[9px] tracking-[0.3em] shrink-0" style={{ color: "var(--text-3)" }}>{label}</p>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

/* ─── Horizontal scroll strip ─── */
function HScrollStrip({ items, inView }: {
  items: { id: string; title: string; artist?: string; role: string; cat?: string; ep?: string; award?: string }[];
  inView: boolean;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
      {items.map((v, i) => (
        <a key={v.id}
          href={`https://www.youtube.com/watch?v=${v.id}`}
          target="_blank" rel="noopener noreferrer"
          className="group shrink-0 block"
          style={{
            width: 300,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(28px)",
            transition: `opacity .6s ease ${i * .08}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * .08}s`,
          }}>
          <HoverPreview id={v.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
            {v.cat && (
              <div className="absolute top-2 left-2">
                <span className="font-mono-label text-[6px] tracking-widest px-1.5 py-0.5"
                  style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.6)" }}>
                  {v.ep ? `${v.cat} ${v.ep}` : v.cat}
                </span>
              </div>
            )}
            {v.award && (
              <div className="absolute top-2 left-2">
                <span className="font-mono-label text-[7px] tracking-wider px-2 py-0.5"
                  style={{ background: "rgba(255,220,80,0.15)", border: "1px solid rgba(255,220,80,0.3)", color: "rgba(255,220,80,0.9)", backdropFilter: "blur(8px)" }}>
                  ★ {v.award}
                </span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <svg className="w-4 h-4 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </HoverPreview>
          <div className="pt-2.5 pb-1">
            <p className="text-[12px] font-medium leading-snug" style={{ color: "var(--text)" }}>{v.title}</p>
            {v.artist && <p className="font-mono-label text-[8px] mt-0.5" style={{ color: "var(--text-3)" }}>{v.artist}</p>}
            <div className="mt-1.5"><RoleTag text={v.role} /></div>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ─── Ripple ─── */
/* ─── Main ─── */
export default function WorkVideo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying]     = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const { ref: pRef,  inView: pIn  } = useInView(0.02);
  const { ref: wRef,  inView: wIn  } = useInView(0.02);
  const { ref: evRef, inView: evIn } = useInView(0.02);
  const { ref: sRef,  inView: sIn  } = useInView(0.04);
  const { ref: igRef, inView: igIn } = useInView(0.04);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  const active = featuredMVs[activeIdx];

  return (
    <section style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── CINEMATIC HERO — fullscreen featured MV ── */}
      <div ref={pRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

        {/* Background: muted autoplay when not in full-play mode */}
        {!playing && (
          <div style={{ position: "absolute", inset: "-12%", width: "124%", height: "124%", pointerEvents: "none" }}>
            <iframe
              src={`https://www.youtube.com/embed/${active.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${active.id}&rel=0&modestbranding=1&playsinline=1&start=4`}
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="autoplay; encrypted-media"
              title={`${active.title} background`}
            />
          </div>
        )}

        {/* Full-screen player overlay (with sound) */}
        {playing && (
          <div style={{ position: "absolute", inset: 0, zIndex: 15 }}>
            <iframe className="w-full h-full"
              src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1&color=white`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen style={{ border: "none" }}
            />
          </div>
        )}

        {/* Gradient overlays — cinematic */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.35) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />

        {/* Top: section label + MV switcher */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          padding: "2.2rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
          opacity: heroLoaded ? 1 : 0,
          transition: "opacity .6s ease",
        }}>
          <span className="font-mono-label" style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(255,255,255,0.38)" }}>
            03 — VIDEO
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {featuredMVs.map((v, i) => (
              <button key={v.id} onClick={() => { setActiveIdx(i); setPlaying(false); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>
                <span className="font-mono-label" style={{
                  fontSize: 8, letterSpacing: "0.28em",
                  color: i === activeIdx ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.28)",
                  borderBottom: i === activeIdx ? "1px solid rgba(255,255,255,0.45)" : "1px solid transparent",
                  paddingBottom: 3, transition: "color .3s, border-color .3s",
                }}>
                  {String(i + 1).padStart(2, "0")} {i === activeIdx ? `· ${v.subEn.split("·")[0].trim()}` : ""}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom left: title block */}
        {!playing && (
          <div style={{ position: "absolute", bottom: "3.5rem", left: "3rem", right: "3rem", zIndex: 10 }}>
            {/* Role / category row */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity .7s ease .1s, transform .7s cubic-bezier(.16,1,.3,1) .1s",
            }}>
              <RoleTag text={active.role} />
              <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.28em", color: "rgba(255,255,255,0.35)" }}>
                {active.subEn.toUpperCase()}
              </span>
            </div>

            {/* Title — large Bebas */}
            <h2 className="font-display leading-none" style={{
              fontSize: "clamp(3.2rem, 10vw, 13rem)",
              color: "var(--text)", letterSpacing: "0.01em",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateX(0)" : "translateX(-28px)",
              transition: "opacity .9s cubic-bezier(.16,1,.3,1) .18s, transform .9s cubic-bezier(.16,1,.3,1) .18s",
            }}>
              {active.title}
            </h2>

            {/* Director */}
            {active.artist && (
              <p className="font-mono-label" style={{
                fontSize: 10, letterSpacing: "0.18em", marginTop: 14,
                color: "rgba(255,255,255,0.45)",
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? "translateX(0)" : "translateX(-16px)",
                transition: "opacity .7s ease .32s, transform .7s cubic-bezier(.16,1,.3,1) .32s",
              }}>
                Directed by <span style={{ color: "rgba(255,255,255,0.72)" }}>{active.artist}</span>
              </p>
            )}
          </div>
        )}

        {/* Bottom right: play / stop */}
        <div style={{ position: "absolute", bottom: "3.5rem", right: "3rem", zIndex: 10,
          opacity: heroLoaded ? 1 : 0, transition: "opacity .7s ease .5s" }}>
          {!playing ? (
            <button onClick={() => setPlaying(true)}
              className="group flex items-center gap-2.5"
              style={{
                background: "rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.15)", padding: "10px 20px", cursor: "pointer",
                transition: "background .3s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.13)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
              <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.3em", color: "var(--text)" }}>PLAY FULL</span>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>↗</span>
            </button>
          ) : (
            <button onClick={() => setPlaying(false)}
              className="font-mono-label"
              style={{ fontSize: 8, letterSpacing: "0.3em", color: "var(--text-3)",
                border: "1px solid rgba(255,255,255,0.12)", padding: "8px 16px", background: "none", cursor: "pointer" }}>
              ✕ STOP
            </button>
          )}
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "3.5rem", left: "50%", transform: "translateX(-50%)",
          zIndex: 10, opacity: heroLoaded ? 1 : 0, transition: "opacity .7s ease .7s",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        }}>
          <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.12)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.6)", animation: "slideDown 1.6s ease-in-out infinite" }} />
          </div>
          <span className="font-mono-label" style={{ fontSize: 7, letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)" }}>SCROLL</span>
        </div>
      </div>

      {/* ── 02 · MORE WORKS — horizontal scroll strips ── */}
      <div ref={wRef} className="py-8 border-b" style={{ borderColor: "var(--border)" }}>

        {/* Light & Scene Trilogy */}
        <div className="px-8 md:px-14" style={{ opacity: wIn ? 1 : 0, transition: "opacity .8s ease" }}>
          <SectionLabel label="LIGHT & SCENE TRILOGY — Jon Chen" />
        </div>
        <div className="pl-8 md:pl-14">
          <HScrollStrip
            items={trilogy.map(v => ({ ...v, cat: `${v.cat} ${v.ep}` }))}
            inView={wIn}
          />
        </div>

        {/* Color Grade */}
        <div className="px-8 md:px-14" style={{ opacity: wIn ? 1 : 0, transition: "opacity .8s ease .1s" }}>
          <SectionLabel label="COLOR GRADE" />
        </div>
        <div className="pl-8 md:pl-14">
          <HScrollStrip items={colorCredits} inView={wIn} />
        </div>

        {/* Short Film */}
        <div className="px-8 md:px-14" style={{ opacity: wIn ? 1 : 0, transition: "opacity .8s ease .15s" }}>
          <SectionLabel label="SHORT FILM" />
        </div>
        <div className="pl-8 md:pl-14">
          <HScrollStrip
            items={[{ id: shortFilm.id, title: shortFilm.title, artist: shortFilm.artist, role: shortFilm.role, award: shortFilm.award }]}
            inView={wIn}
          />
        </div>
      </div>

      {/* ── 03 · EVENT & COMMERCIAL ── */}
      <div ref={evRef} className="py-8 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="px-8 md:px-14" style={{ opacity: evIn ? 1 : 0, transition: "opacity .8s ease" }}>
          <SectionLabel label="EVENT & COMMERCIAL" />
        </div>
        <div className="pl-8 md:pl-14">
          <HScrollStrip items={eventVideos} inView={evIn} />
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
                  More work lives here — updated continuously
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
