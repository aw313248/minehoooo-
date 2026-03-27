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

const shortFilms = [
  {
    id: "fR2TDfx04oU",
    title: "紅箱子",
    artist: "劇情短片",
    award: "入圍 2023 新北市學生影像新星獎",
    role: "DIR · DP · EDIT",
    cat: "SHORT FILM",
  },
  {
    id: "FM5ukv7kqBM",
    title: "助理導演 作品",
    artist: "Music Video",
    role: "AD · ASSISTANT DIR",
    cat: "MUSIC VIDEO",
  },
];

const commercial = [
  { id: "Ou1y4dnFrsU", title: "台中好聖誕",     artist: "台中市政府", role: "DIR · DP",         cat: "COMMERCIAL" },
  { id: "PKMi1HPRX-E", title: "V6｜燈光、調光", artist: "",           role: "LIGHTING · COLOR", cat: "COMMERCIAL" },
];

const liveDoc = [
  { id: "IGa91QIW84M", title: "DJ SOCUTE 演出記錄",  artist: "", role: "DIR · DP", cat: "LIVE"        },
  { id: "mXNbiHiC6bI", title: "USR計畫 V4 活動紀錄", artist: "", role: "DIR · DP", cat: "DOCUMENTARY" },
];

const eventRec = [
  { id: "IIMY2J3egHk", title: "擁擁｜抓周一歲儀式",   artist: "", role: "DIR · DP", cat: "EVENT" },
  { id: "8JIvM93l0SQ", title: "九龍灣鳳靈修院 南巡",  artist: "", role: "DIR · DP", cat: "EVENT" },
  { id: "7rU2JUGplXw", title: "皮泰中學 55週年 校慶", artist: "", role: "DIR · DP", cat: "EVENT" },
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

/* Selected IG Reels to embed — sorted by engagement */
const igReelsData = [
  { code: "DTg9q2_kpmY", label: "片場幕後花絮",          likes: 382, account: "minehoooo.arw" },
  { code: "DVQvmpNEt8k", label: "228 電影清單 · 歷史影像", likes: 274, account: "minehoooo.arw" },
  { code: "DT-tdb1Evcw", label: "導演 · 錄音組 爆了",     likes: 599, account: "mlpon6"        },
  { code: "DTej6F4ksVj", label: "導演技巧 · 素人演員",    likes: 167, account: "minehoooo.arw" },
  { code: "DViau5bkjjN", label: "白色恐怖 · 家族記憶",    likes: 109, account: "minehoooo.arw" },
  { code: "DTihUcyEiZ-", label: "幕後 · 工作精神",        likes: 107, account: "minehoooo.arw" },
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

/* ─── Category header ─── */
function CatHeader({ num, label, count, note }: { num: string; label: string; count?: number; note?: string }) {
  return (
    <div className="mb-8">
      {/* Gradient rule */}
      <div style={{ height: 1, background: "linear-gradient(to right, rgba(255,255,255,0.22), rgba(255,255,255,0.04) 60%, transparent)", marginBottom: 14 }} />
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-4">
          <span className="font-display leading-none" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "rgba(255,255,255,0.07)", letterSpacing: "0.02em" }}>{num}</span>
          <span className="font-display leading-none" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", color: "var(--text)", letterSpacing: "0.01em" }}>{label}</span>
        </div>
        <div className="hidden md:flex flex-col items-end gap-0.5">
          {count !== undefined && <span className="font-mono-label text-[9px] tracking-[0.2em]" style={{ color: "var(--text-3)" }}>{count} WORKS</span>}
          {note && <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.18)" }}>{note}</span>}
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-label inside a category ─── */
function SubLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-8 first:mt-0">
      <p className="font-mono-label text-[8px] tracking-[0.32em] shrink-0" style={{ color: "rgba(255,255,255,0.2)" }}>{label}</p>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
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
              loading="lazy"
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

/* ─── Cinematic series panel (trilogy) ─── */
function SeriesPanel({ video, index, inView }: {
  video: { id: string; title: string; ep: string; artist: string; role: string };
  index: number;
  inView: boolean;
}) {
  const [preview, setPreview] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setIsTouch(window.innerWidth < 768);
  }, []);

  return (
    <a href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank" rel="noopener noreferrer"
      className="group block relative overflow-hidden border-b"
      style={{ height: "clamp(240px, 52vh, 480px)", borderColor: "var(--border)" }}
      onMouseEnter={() => { if (!isTouch) { setHovered(true); timer.current = setTimeout(() => setPreview(true), 600); } }}
      onMouseLeave={() => { setHovered(false); clearTimeout(timer.current); setPreview(false); }}>

      {/* Background */}
      {preview && !isTouch ? (
        <div style={{ position: "absolute", inset: "-12%", width: "124%", height: "124%", pointerEvents: "none" }}>
          <iframe src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&start=4`}
            style={{ width: "100%", height: "100%", border: "none" }} allow="autoplay; encrypted-media" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt={video.title}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 1.4s cubic-bezier(.16,1,.3,1)",
          }}
          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`; }} />
      )}

      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.28) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />

      {/* Large faint episode numeral */}
      <div className="absolute right-8 md:right-16" style={{
        top: "50%", transform: "translateY(-50%)", pointerEvents: "none", userSelect: "none",
        fontFamily: "var(--font-bebas)", fontSize: "clamp(7rem, 18vw, 16rem)",
        color: "rgba(255,255,255,0.04)", lineHeight: 1,
      }}>{video.ep}</div>

      {/* Bottom-left content */}
      <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem", zIndex: 5 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 10,
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)",
          transition: `opacity .6s ease ${0.05 + index * 0.1}s, transform .6s cubic-bezier(.16,1,.3,1) ${0.05 + index * 0.1}s`,
        }}>
          <span className="font-mono-label" style={{ fontSize: 7, letterSpacing: "0.32em", color: "rgba(255,255,255,0.32)" }}>
            TRILOGY {video.ep}
          </span>
          <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.12)" }} />
          <RoleTag text={video.role} />
        </div>
        <h3 className="font-display leading-none" style={{
          fontSize: "clamp(2rem, 5.5vw, 5.5rem)", color: "var(--text)", letterSpacing: "0.01em",
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-28px)",
          transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${0.12 + index * 0.1}s, transform .9s cubic-bezier(.16,1,.3,1) ${0.12 + index * 0.1}s`,
        }}>{video.title}</h3>
        <p className="font-mono-label" style={{
          fontSize: 10, letterSpacing: "0.18em", marginTop: 10, color: "rgba(255,255,255,0.32)",
          opacity: inView ? 1 : 0, transition: `opacity .7s ease ${0.25 + index * 0.1}s`,
        }}>
          Directed by <span style={{ color: "rgba(255,255,255,0.65)" }}>{video.artist}</span>
        </p>
      </div>

      {/* Hover: WATCH button */}
      <div style={{
        position: "absolute", bottom: "2rem", right: "2rem", zIndex: 5,
        opacity: hovered ? 1 : 0, transition: "opacity .3s ease",
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.14)", padding: "9px 18px",
      }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
        <span className="font-mono-label" style={{ fontSize: 7, letterSpacing: "0.3em", color: "var(--text)" }}>WATCH ↗</span>
      </div>
    </a>
  );
}

/* ─── Grid card (for clean grid sections) ─── */
function GridCard({ id, title, artist, role, cat, award }: {
  id: string; title: string; artist?: string; role: string; cat?: string; award?: string;
}) {
  return (
    <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="group block">
      <HoverPreview id={id}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }} />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.15)", transition: "background .4s" }} />
        {(cat || award) && (
          <div className="absolute top-2 left-2">
            {award ? (
              <span className="font-mono-label text-[7px] tracking-wider px-2 py-0.5"
                style={{ background: "rgba(255,220,80,0.15)", border: "1px solid rgba(255,220,80,0.3)", color: "rgba(255,220,80,0.9)", backdropFilter: "blur(8px)" }}>
                ★ {award}
              </span>
            ) : (
              <span className="font-mono-label text-[6px] tracking-widest px-1.5 py-0.5"
                style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.6)" }}>
                {cat}
              </span>
            )}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <svg className="w-3.5 h-3.5 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
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

/* ─── Main ─── */
export default function WorkVideo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying]     = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isMobile, setIsMobile]   = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { ref: pRef,  inView: pIn  } = useInView(0.02);
  const { ref: trRef, inView: trIn } = useInView(0.02);
  const { ref: wRef,  inView: wIn  } = useInView(0.02);
  const { ref: evRef, inView: evIn } = useInView(0.02);
  const { ref: leRef, inView: leIn } = useInView(0.02);
  const { ref: sRef,  inView: sIn  } = useInView(0.04);
  const { ref: igRef, inView: igIn } = useInView(0.04);

  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 150);
    // Delay iframe mount so page content renders first
    const t2 = setTimeout(() => setIframeReady(true), 900);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const active = featuredMVs[activeIdx];

  return (
    <section style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── CINEMATIC HERO — fullscreen featured MV ── */}
      <div ref={pRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

        {/* Background: thumbnail always (iOS fallback), iframe only on desktop */}
        {!playing && (
          <>
            {/* Static thumbnail — always rendered, acts as mobile bg + desktop placeholder */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${active.id}/maxresdefault.jpg`}
              alt={active.title}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", pointerEvents: "none",
                filter: "brightness(0.55)",
              }}
              onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${active.id}/hqdefault.jpg`; }}
            />
            {/* Autoplay iframe — desktop only, delayed mount */}
            {!isMobile && iframeReady && (
              <div style={{ position: "absolute", inset: "-12%", width: "124%", height: "124%", pointerEvents: "none" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${active.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${active.id}&rel=0&modestbranding=1&playsinline=1&start=4`}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; encrypted-media"
                  title={`${active.title} background`}
                />
              </div>
            )}
          </>
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

      {/* ── 02 · LIGHT & SCENE TRILOGY — cinematic series ── */}
      <div ref={trRef} className="border-b" style={{ borderColor: "var(--border)" }}>
        {/* Series header */}
        <div className="px-8 md:px-14 py-6 border-b flex items-center justify-between"
          style={{ borderColor: "var(--border)", opacity: trIn ? 1 : 0, transition: "opacity .8s ease" }}>
          <div>
            <p className="font-mono-label text-[8px] tracking-[0.38em] mb-2" style={{ color: "var(--text-3)" }}>
              FEATURED SERIES
            </p>
            <h2 className="font-display leading-none" style={{
              fontSize: "clamp(1.6rem, 4vw, 3.8rem)", color: "var(--text)", letterSpacing: "0.01em",
            }}>
              LIGHT & SCENE TRILOGY
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="font-mono-label text-[8px] tracking-[0.28em] mb-1" style={{ color: "var(--text-3)" }}>DIRECTED BY</p>
            <p className="font-mono-label text-[11px] tracking-[0.12em]" style={{ color: "var(--text-2)" }}>陳卓 Jon Chen</p>
            <p className="font-mono-label text-[8px] tracking-[0.22em] mt-1.5" style={{ color: "var(--text-3)" }}>DIR · DP · 3 EPISODES</p>
          </div>
        </div>
        {trilogy.map((v, i) => (
          <SeriesPanel key={v.id} video={v} index={i} inView={trIn} />
        ))}
      </div>

      {/* ── 03 · MUSIC VIDEO · COLOR WORK ── */}
      <div ref={wRef} className="px-8 md:px-14 py-10 border-b" style={{ borderColor: "var(--border)" }}>
        <div style={{ opacity: wIn ? 1 : 0, transition: "opacity .7s ease" }}>
          <CatHeader num="03" label="MUSIC VIDEO · COLOR WORK" count={colorCredits.length} note="DP · COLOR GRADING" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {colorCredits.map((v, i) => (
              <div key={v.id} style={{
                opacity: wIn ? 1 : 0, transform: wIn ? "translateY(0)" : "translateY(24px)",
                transition: `opacity .6s ease ${i * 0.07}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * 0.07}s`,
              }}>
                <GridCard id={v.id} title={v.title} artist={v.artist} role={v.role} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 04 · SHORT FILM & COMMERCIAL ── */}
      <div ref={evRef} className="px-8 md:px-14 py-10 border-b" style={{ borderColor: "var(--border)" }}>
        <div style={{ opacity: evIn ? 1 : 0, transition: "opacity .7s ease" }}>
          <CatHeader num="04" label="SHORT FILM & COMMERCIAL" count={shortFilms.length + commercial.length} note="NARRATIVE · CLIENT WORK" />

          {/* Short Film */}
          <SubLabel label="SHORT FILM · NARRATIVE" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {shortFilms.map((v, i) => (
              <div key={v.id} style={{
                opacity: evIn ? 1 : 0, transform: evIn ? "translateY(0)" : "translateY(24px)",
                transition: `opacity .6s ease ${i * 0.08}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * 0.08}s`,
              }}>
                <GridCard id={v.id} title={v.title} artist={v.artist} role={v.role}
                  cat={v.cat} award={"award" in v ? v.award : undefined} />
              </div>
            ))}
          </div>

          {/* Commercial */}
          <SubLabel label="COMMERCIAL · BRAND" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {commercial.map((v, i) => (
              <div key={v.id} style={{
                opacity: evIn ? 1 : 0, transform: evIn ? "translateY(0)" : "translateY(24px)",
                transition: `opacity .6s ease ${i * 0.08 + 0.1}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * 0.08 + 0.1}s`,
              }}>
                <GridCard id={v.id} title={v.title} artist={v.artist} role={v.role} cat={v.cat} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 05 · LIVE · DOCUMENTARY · EVENT ── */}
      <div ref={leRef} className="px-8 md:px-14 py-10 border-b" style={{ borderColor: "var(--border)" }}>
        <div style={{ opacity: leIn ? 1 : 0, transition: "opacity .7s ease" }}>
          <CatHeader num="05" label="LIVE · DOCUMENTARY · EVENT" count={liveDoc.length + eventRec.length} note="REAL-TIME · RECORD" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {[...liveDoc, ...eventRec].map((v, i) => (
              <div key={v.id} style={{
                opacity: leIn ? 1 : 0, transform: leIn ? "translateY(0)" : "translateY(24px)",
                transition: `opacity .6s ease ${i * 0.06}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * 0.06}s`,
              }}>
                <GridCard id={v.id} title={v.title} artist={v.artist} role={v.role} cat={v.cat} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 05 · YOUTUBE SHORTS ── */}
      <div ref={sRef} className="px-8 md:px-14 py-8 border-b" style={{ borderColor: "var(--border)" }}>
        <div style={{ opacity: sIn ? 1 : 0, transition: "opacity .6s ease" }}>
          <SubLabel label="YOUTUBE SHORTS" />
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

      {/* ── 06 · IG REELS ── */}
      <div ref={igRef} className="border-t" style={{ borderColor: "var(--border)" }}>

        {/* Header */}
        <div className="px-8 md:px-14 pt-10 pb-2"
          style={{ opacity: igIn ? 1 : 0, transition: "opacity .7s ease" }}>
          <CatHeader num="06" label="IG REELS" count={igReelsData.length} note="@minehoooo · @minehoooo.arw" />
        </div>

        {/* Horizontal scroll of embedded reels */}
        <div className="px-8 md:px-14 pb-6">
          <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
            {igReelsData.map((reel, i) => (
              <div key={reel.code} className="shrink-0"
                style={{
                  width: 300,
                  opacity: igIn ? 1 : 0,
                  transform: igIn ? "translateX(0)" : "translateX(28px)",
                  transition: `opacity .6s ease ${i * .1}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * .1}s`,
                }}>
                <div style={{ borderRadius: 8, overflow: "hidden", background: "#111" }}>
                  <iframe
                    src={`https://www.instagram.com/p/${reel.code}/embed/`}
                    width="300"
                    height="520"
                    frameBorder={0}
                    scrolling="no"
                    style={{ display: "block", border: "none" }}
                    title={reel.label}
                    loading="lazy"
                  />
                </div>
                <div className="pt-2.5">
                  <p className="text-[11px] font-medium leading-snug" style={{ color: "var(--text)" }}>{reel.label}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono-label text-[8px]" style={{ color: "var(--text-3)" }}>@{reel.account}</span>
                    <span className="font-mono-label text-[8px]" style={{ color: "rgba(255,255,255,0.28)" }}>♡ {reel.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Follow CTA */}
        <div className="px-8 md:px-14 pb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ opacity: igIn ? 1 : 0, transition: "opacity .8s ease .4s" }}>
          <p className="font-mono-label text-[9px] tracking-[0.2em]" style={{ color: "var(--text-3)" }}>
            More work lives on Instagram — updated continuously
          </p>
          <a href="https://www.instagram.com/minehoooo/" target="_blank" rel="noopener noreferrer"
            className="group shrink-0 flex items-center gap-3 px-5 py-3 transition-all duration-300 hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", width: "fit-content" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
              <circle cx="17.5" cy="6.5" r="1.4" fill="rgba(255,255,255,0.8)"/>
            </svg>
            <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color: "var(--text)" }}>
              @minehoooo ↗
            </span>
          </a>
        </div>
      </div>

    </section>
  );
}
