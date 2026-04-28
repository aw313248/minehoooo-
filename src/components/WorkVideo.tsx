"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";


/* ─── Data ─── */

// Hero rotation — 精選輪播
const featuredMVs = [
  { id: "d9_EuYkmfzM", title: "愚人節 ALL FOOL'S DAY",       artist: "陳卓 Jon Chen",       subEn: "Music Video · 5th Anniversary", subZh: "音樂錄影帶 · 五週年紀念版", role: "DIR · DP",        tags: ["MUSIC VIDEO", "DIR", "DP"] },
  { id: "eI1O_9jBHU0", title: "BRING ME YOUR LOVELY",        artist: "Kolli (NN)",           subEn: "Music Video · AI Hybrid",       subZh: "音樂錄影帶 · AI 製作",       role: "DIR · DP · AI",   tags: ["MUSIC VIDEO", "DIR", "DP", "AI"] },
  { id: "erQ9lR_rNik", title: "流明 LUMEN",                  artist: "陳卓 Jon Chen",       subEn: "Music Video · Trilogy Ⅰ",      subZh: "音樂錄影帶 · 三部曲 Ⅰ",    role: "DIR · DP",        tags: ["MUSIC VIDEO", "TRILOGY"] },
  { id: "cIsS50e6YQ0", title: "光圈 APERTURE",               artist: "陳卓 Jon Chen",       subEn: "Music Video · Trilogy Ⅱ",      subZh: "音樂錄影帶 · 三部曲 Ⅱ",    role: "DIR · DP",        tags: ["MUSIC VIDEO", "TRILOGY"] },
  { id: "sxrucEXI9-A", title: "沒收 DEPRIVED",               artist: "陳卓 Jon Chen",       subEn: "Music Video · Trilogy Ⅲ",      subZh: "音樂錄影帶 · 三部曲 Ⅲ",    role: "DIR · DP",        tags: ["MUSIC VIDEO", "TRILOGY"] },
  { id: "XJSI9s3-wk0", title: "沒有你的世界",                artist: "Lil RAD & Coy6oi",    subEn: "Music Video",                  subZh: "音樂錄影帶",                 role: "DP · COLOR",      tags: ["MUSIC VIDEO", "DP", "COLOR"] },
  { id: "mdwoUFCe9Kk", title: "如果你不愛我 LOVE ME NOT",    artist: "Lil RAD & Coy6oi",    subEn: "Music Video",                  subZh: "音樂錄影帶",                 role: "DP",              tags: ["MUSIC VIDEO", "DP"] },
  { id: "GCDxrVigSfw", title: "愛人這件事 LOVING AFTER ALL", artist: "Lil RAD & Coy6oi",    subEn: "Music Video",                  subZh: "音樂錄影帶",                 role: "DP · COLOR",      tags: ["MUSIC VIDEO", "DP", "COLOR"] },
  { id: "_IUqMAI5GQg", title: "說了算",                      artist: "亥伯龍 · Doggy Chang · 7type · 中部管轄區", subEn: "Music Video", subZh: "音樂錄影帶",              role: "COLOR",           tags: ["MUSIC VIDEO", "COLOR"] },
  { id: "kL8_Sk0JmKM", title: "記住你要快樂",                artist: "帝仰 tiang",           subEn: "Music Video",                  subZh: "音樂錄影帶",                 role: "DIR · COLOR",     tags: ["MUSIC VIDEO", "DIR", "COLOR"] },
];

// 導演作品列表（下方格子）
const directorMVs = [
  { id: "xKo8NW2mBso", title: "我也是個人 IT HURTS", artist: "梁承煜", role: "DIR · EDIT · COLOR", cat: "MUSIC VIDEO" },
  { id: "jLLNkQod8pg", title: "向前行吧 GO AHEAD",   artist: "梁承煜", role: "DIR · DP",            cat: "MUSIC VIDEO" },
  { id: "hk43CW2Kqow", title: "LAST 10",              artist: "",       role: "DIR · DP · AI 50%",   cat: "MUSIC VIDEO" },
];

const trilogy = [
  { id: "erQ9lR_rNik", title: "流明 Lumen",    ep: "Ⅰ", artist: "陳卓 Jon Chen", role: "DIR · DP", cat: "TRILOGY" },
  { id: "cIsS50e6YQ0", title: "光圈 Aperture", ep: "Ⅱ", artist: "陳卓 Jon Chen", role: "DIR · DP", cat: "TRILOGY" },
  { id: "sxrucEXI9-A", title: "沒收 Deprived", ep: "Ⅲ", artist: "陳卓 Jon Chen", role: "DIR · DP", cat: "TRILOGY" },
];

const colorCredits = [
  { id: "XJSI9s3-wk0", title: "沒有你的世界",            artist: "Lil RAD & Coy6oi", role: "DP · COLOR", cat: "COLOR" },
  { id: "lKYtN2OqbHQ", title: "沒有你的世界 (Video Production)", artist: "Lil RAD & Coy6oi · Tizzy & Oscar", role: "DP · COLOR", cat: "COLOR" },
  { id: "mdwoUFCe9Kk", title: "如果你不愛我 Love Me Not", artist: "Lil RAD & Coy6oi",       role: "DP",         cat: "COLOR" },
  { id: "GCDxrVigSfw", title: "愛人這件事 Loving After All", artist: "Lil RAD & Coy6oi",    role: "DP · COLOR", cat: "COLOR" },
  { id: "_IUqMAI5GQg", title: "說了算",             artist: "亥伯龍 · Doggy Chang · 7type · 中部管轄區", role: "COLOR",        cat: "COLOR"     },
  { id: "AuaEpljXpR8", title: "B.A.C 亚洲大尾",    artist: "7type & 66 & CHE · 中部管轄區",              role: "COLOR",        cat: "COLOR"     },
  { id: "0jyUrpj5Jiw", title: "DaLow",             artist: "大樓DaLow ft. C Grass",         role: "COLOR",        cat: "COLOR"     },
  { id: "kUvT3eBfN9w", title: "愛你真的梅辦法",    artist: "89教科書",                      role: "COLOR",        cat: "COLOR"     },
  { id: "J-BIhdj-4oM", title: "Badass Dance",      artist: "大樓DaLow ft. Aiken",           role: "LIGHTING",     cat: "LIGHTING"  },
  { id: "BbDtN119tts", title: "DaLow",             artist: "大樓DaLow ft. C Grass",         role: "LIGHTING",     cat: "LIGHTING"  },
  { id: "kL8_Sk0JmKM", title: "記住你要快樂",     artist: "帝仰 tiang",                    role: "DIR · COLOR",  cat: "COLOR"     },
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
];

const setCredits = [
  {
    id: "RsPI2V_RQus",
    title: "回收場的夏天",
    artist: "Reclaim My Summer · 公視學生劇展",
    role: "CAMERA ASST",
    cat: "SHORT FILM",
    award: "金穗獎最佳劇情片 · 金鐘獎入圍",
  },
  {
    id: "FM5ukv7kqBM",
    title: "沒什麼道理",
    artist: "STILA 言芯",
    role: "SET DEPT",
    cat: "MUSIC VIDEO",
  },
  {
    id: "mQ0KWgkGHlw",
    title: "侵愛的",
    artist: "陳芳語 Kimberley Chen",
    role: "SET DEPT",
    cat: "MUSIC VIDEO",
  },
  {
    id: "W7E5bJ1Cmuo",
    title: "我們的愛",
    artist: "陳芳語 Kimberley Chen",
    role: "SET DEPT",
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
  { id: "7rU2JUGplXw", title: "僑泰中學 55週年 校慶", artist: "", role: "DIR · DP", cat: "EVENT" },
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
  { code: "DT-tdb1Evcw", label: "導演 · 錄音組 爆了",     likes: 599, account: "mlpon6"        },
  { code: "DTg9q2_kpmY", label: "片場幕後花絮",            likes: 382, account: "minehoooo.arw" },
  { code: "DVQvmpNEt8k", label: "228 電影清單 · 歷史影像", likes: 274, account: "minehoooo.arw" },
  { code: "DTej6F4ksVj", label: "導演技巧 · 素人演員",     likes: 167, account: "minehoooo.arw" },
  { code: "DWiAEIvhfbb", label: "家的樣子 · 日常影像",     likes: 151, account: "minehoooo.arw" },
  { code: "DViau5bkjjN", label: "白色恐怖 · 家族記憶",     likes: 109, account: "minehoooo.arw" },
  { code: "DTihUcyEiZ-", label: "幕後 · 工作精神",         likes: 107, account: "minehoooo.arw" },
];

/* ─── Role badge ─── */
function RoleTag({ text }: { text: string }) {
  return (
    <span style={{
      fontFamily: "var(--font-space-mono), monospace",
      fontSize: 7, letterSpacing: "0.2em",
      color: "var(--white-secondary)",
      background: "var(--white-ghost)",
      border: "1px solid var(--white-dim)",
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
          <span className="font-display leading-none" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--white-ghost)", letterSpacing: "0.02em" }}>{num}</span>
          <span className="font-display leading-none" style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", color: "var(--text)", letterSpacing: "0.01em" }}>{label}</span>
        </div>
        <div className="hidden md:flex flex-col items-end gap-0.5">
          {count !== undefined && <span className="font-mono-label text-[9px] tracking-[0.2em]" style={{ color: "var(--text-3)" }}>{count} WORKS</span>}
          {note && <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "var(--white-dim)" }}>{note}</span>}
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-label inside a category ─── */
function SubLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-8 first:mt-0">
      <p className="font-mono-label text-[8px] tracking-[0.32em] shrink-0" style={{ color: "var(--white-dim)" }}>{label}</p>
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
            <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={`${v.artist} ${v.title} MV - 在地影像工作者 MINEH4O`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
            {v.cat && (
              <div className="absolute top-2 left-2">
                <span className="font-mono-label text-[6px] tracking-widest px-1.5 py-0.5"
                  style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", color: "var(--white-secondary)" }}>
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
                style={{ background: "var(--white-ghost)", backdropFilter: "blur(16px)", border: "1px solid var(--white-dim)" }}>
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
        <img src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt={`${video.artist} ${video.title} MV - 在地影像工作者 MINEH4O`}
          loading="lazy"
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
        color: "var(--white-ghost)", lineHeight: 1,
      }}>{video.ep}</div>

      {/* Bottom-left content */}
      <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem", zIndex: 5 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 10,
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)",
          transition: `opacity .6s ease ${0.05 + index * 0.1}s, transform .6s cubic-bezier(.16,1,.3,1) ${0.05 + index * 0.1}s`,
        }}>
          <span className="font-mono-label" style={{ fontSize: 7, letterSpacing: "0.32em", color: "var(--white-muted)" }}>
            TRILOGY {video.ep}
          </span>
          <div style={{ width: 60, height: 1, background: "var(--white-dim)" }} />
          <RoleTag text={video.role} />
        </div>
        <h3 className="font-display leading-none" style={{
          fontSize: "clamp(2rem, 5.5vw, 5.5rem)", color: "var(--text)", letterSpacing: "0.01em",
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-28px)",
          transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${0.12 + index * 0.1}s, transform .9s cubic-bezier(.16,1,.3,1) ${0.12 + index * 0.1}s`,
        }}>{video.title}</h3>
        <p className="font-mono-label" style={{
          fontSize: 10, letterSpacing: "0.18em", marginTop: 10, color: "var(--white-muted)",
          opacity: inView ? 1 : 0, transition: `opacity .7s ease ${0.25 + index * 0.1}s`,
        }}>
          Directed by <span style={{ color: "var(--white-secondary)" }}>{video.artist}</span>
        </p>
      </div>

      {/* Hover: WATCH button */}
      <div style={{
        position: "absolute", bottom: "2rem", right: "2rem", zIndex: 5,
        opacity: hovered ? 1 : 0, transition: "opacity .3s ease",
        display: "flex", alignItems: "center", gap: 8,
        background: "var(--white-ghost)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--white-dim)", padding: "9px 18px",
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
        <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={`${artist ? artist + " " : ""}${title} - 在地影像工作者 MINEH4O`}
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
                style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", color: "var(--white-secondary)" }}>
                {cat}
              </span>
            )}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "var(--white-ghost)", backdropFilter: "blur(16px)", border: "1px solid var(--white-dim)" }}>
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
  const { ref: mvRef, inView: mvIn } = useInView(0.02);
  const { ref: trRef, inView: trIn } = useInView(0.02);
  const { ref: wRef,  inView: wIn  } = useInView(0.02);
  const { ref: evRef, inView: evIn } = useInView(0.02);
  const { ref: leRef, inView: leIn } = useInView(0.02);
  const { ref: sRef,  inView: sIn  } = useInView(0.04);
  const { ref: igRef, inView: igIn } = useInView(0.04);

  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 150);
    const t2 = setTimeout(() => setIframeReady(true), 900);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  // Auto-rotate through all featured MVs every 8s
  useEffect(() => {
    if (playing) return;
    const interval = setInterval(() => {
      setActiveIdx(i => (i + 1) % featuredMVs.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [playing]);

  const active = featuredMVs[activeIdx];

  return (
    <section style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── CINEMATIC HERO — fullscreen featured MV ── */}
      <div ref={pRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

        {/* Background: thumbnail crossfade via Framer Motion */}
        {!playing && (
          <>
            <AnimatePresence mode="sync">
              <motion.img
                key={active.id}
                src={`https://img.youtube.com/vi/${active.id}/maxresdefault.jpg`}
                alt={`${active.artist} ${active.title} MV 影像作品 - 在地影像工作者 MINEH4O`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", pointerEvents: "none",
                  filter: "brightness(0.55)",
                }}
                onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${active.id}/hqdefault.jpg`; }}
              />
            </AnimatePresence>
            {/* Autoplay iframe — desktop only, delayed mount */}
            {!isMobile && iframeReady && (
              <motion.div
                key={`iframe-${active.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                style={{ position: "absolute", inset: "-12%", width: "124%", height: "124%", pointerEvents: "none" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${active.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${active.id}&rel=0&modestbranding=1&playsinline=1&start=4`}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; encrypted-media"
                  title={`${active.title} background`}
                />
              </motion.div>
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
          <span className="font-mono-label" style={{ fontSize: 9, letterSpacing: "0.35em", color: "var(--white-soft)" }}>
            03 — VIDEO
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {featuredMVs.map((v, i) => (
              <button key={v.id} onClick={() => { setActiveIdx(i); setPlaying(false); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>
                <span className="font-mono-label" style={{
                  fontSize: 8, letterSpacing: "0.28em",
                  color: i === activeIdx ? "var(--white-primary)" : "var(--white-muted)",
                  borderBottom: i === activeIdx ? "1px solid var(--white-soft)" : "1px solid transparent",
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
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "absolute", bottom: "3.5rem", left: "3rem", right: "3rem", zIndex: 10 }}>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <RoleTag text={active.role} />
                <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.28em", color: "var(--white-soft)" }}>
                  {active.subEn.toUpperCase()}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display leading-none"
                style={{ fontSize: "clamp(3.2rem, 10vw, 13rem)", color: "var(--text)", letterSpacing: "0.01em" }}>
                {active.title}
              </motion.h2>

              {active.artist && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28, duration: 0.6 }}
                  className="font-mono-label"
                  style={{ fontSize: 10, letterSpacing: "0.18em", marginTop: 14, color: "var(--white-soft)" }}>
                  Directed by <span style={{ color: "var(--white-secondary)" }}>{active.artist}</span>
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Bottom right: play / stop */}
        <div style={{ position: "absolute", bottom: "3.5rem", right: "3rem", zIndex: 10,
          opacity: heroLoaded ? 1 : 0, transition: "opacity .7s ease .5s" }}>
          {!playing ? (
            <button onClick={() => setPlaying(true)}
              className="group flex items-center gap-2.5"
              style={{
                background: "var(--white-ghost)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--white-dim)", padding: "10px 20px", cursor: "pointer",
                transition: "background .3s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--white-dim)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--white-ghost)"; }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
              <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.3em", color: "var(--text)" }}>PLAY FULL</span>
              <span style={{ color: "var(--white-soft)", fontSize: 14 }}>↗</span>
            </button>
          ) : (
            <button onClick={() => setPlaying(false)}
              className="font-mono-label"
              style={{ fontSize: 8, letterSpacing: "0.3em", color: "var(--text-3)",
                border: "1px solid var(--white-dim)", padding: "8px 16px", background: "none", cursor: "pointer" }}>
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
          <div style={{ width: 1, height: 36, background: "var(--white-dim)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "var(--white-secondary)", animation: "slideDown 1.6s ease-in-out infinite" }} />
          </div>
          <span className="font-mono-label" style={{ fontSize: 7, letterSpacing: "0.35em", color: "var(--white-muted)" }}>SCROLL</span>
        </div>
      </div>

      {/* ── DIRECTOR MV — 愚人節 & Bring Me Your Lovely ── */}
      <div ref={mvRef} className="px-8 md:px-14 py-10 border-b" style={{ borderColor: "var(--border)" }}>
        <div style={{ opacity: mvIn ? 1 : 0, transition: "opacity .7s ease" }}>
          <CatHeader num="01" label="MUSIC VIDEO · DIR · DP" count={directorMVs.length} note="DIRECTOR WORKS" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {directorMVs.map((v, i) => (
              <div key={v.id} style={{
                opacity: mvIn ? 1 : 0, transform: mvIn ? "translateY(0)" : "translateY(24px)",
                transition: `opacity .6s ease ${i * 0.1}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * 0.1}s`,
              }}>
                <GridCard id={v.id} title={v.title} artist={v.artist} role={v.role} cat={v.cat} />
              </div>
            ))}
          </div>
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
          <CatHeader num="01" label="MUSIC VIDEO · COLOR WORK" count={colorCredits.length} note="DP · COLOR GRADING" />
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
          <CatHeader num="02" label="SHORT FILM & COMMERCIAL" count={shortFilms.length + setCredits.length + commercial.length} note="NARRATIVE · CLIENT WORK" />

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

          {/* Set Credits */}
          <SubLabel label="ON SET · PRODUCTION" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {setCredits.map((v, i) => (
              <div key={v.id} style={{
                opacity: evIn ? 1 : 0, transform: evIn ? "translateY(0)" : "translateY(24px)",
                transition: `opacity .6s ease ${i * 0.08 + 0.08}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * 0.08 + 0.08}s`,
              }}>
                <GridCard id={v.id} title={v.title} artist={v.artist} role={v.role} cat={v.cat} />
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
          <CatHeader num="03" label="LIVE · DOCUMENTARY · EVENT" count={liveDoc.length + eventRec.length} note="REAL-TIME · RECORD" />
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
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-end pb-2 pl-2">
                    <span className="font-mono-label text-[6px] tracking-widest px-1.5 py-0.5"
                      style={{ background: "rgba(0,0,0,0.7)", color: "var(--white-secondary)" }}>SHORTS</span>
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
          <CatHeader num="04" label="IG REELS" count={igReelsData.length} note="@minehoooo · @minehoooo.arw" />
        </div>

        {/* Horizontal scroll — custom reel cards */}
        <div className="px-8 md:px-14 pb-6">
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
            {igReelsData.map((reel, i) => (
              <a key={reel.code}
                href={`https://www.instagram.com/p/${reel.code}/`}
                target="_blank" rel="noopener noreferrer"
                className="group shrink-0 block"
                style={{
                  width: 180,
                  opacity: igIn ? 1 : 0,
                  transform: igIn ? "translateX(0)" : "translateX(28px)",
                  transition: `opacity .6s ease ${i * .09}s, transform .6s cubic-bezier(.16,1,.3,1) ${i * .09}s`,
                  textDecoration: "none",
                }}>

                {/* Card — 9:16 portrait */}
                <div className="relative overflow-hidden"
                  style={{ aspectRatio: "9/16", background: "#0c0c0e", border: "1px solid var(--white-ghost)" }}>

                  {/* Noise grain */}
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                    backgroundSize: "100px 100px",
                    opacity: 0.12, mixBlendMode: "screen",
                  }} />

                  {/* Thumbnail image — falls back to dark bg if not found */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/reels/${reel.code}.jpg`}
                    alt={reel.label}
                    loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s cubic-bezier(.16,1,.3,1)" }}
                    className="group-hover:scale-[1.04]"
                  />

                  {/* Overlay so text stays readable over thumbnail */}
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)", pointerEvents: "none" }} />

                  {/* Play icon + REELS label — center */}
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      border: "1px solid var(--white-dim)",
                      background: "var(--white-ghost)",
                      backdropFilter: "blur(12px)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background .3s, border-color .3s",
                    }}
                      className="group-hover:[background:rgba(255,255,255,0.14)] group-hover:[border-color:rgba(255,255,255,0.32)]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--white-primary)"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <span className="font-mono-label text-[7px] tracking-[0.38em]" style={{ color: "var(--white-dim)" }}>REELS</span>
                  </div>

                  {/* Bottom gradient + title */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)",
                    padding: "2rem 1rem 1rem",
                  }}>
                    <p className="font-display leading-tight"
                      style={{ fontSize: "clamp(1rem, 3vw, 1.3rem)", color: "var(--white-primary)", letterSpacing: "0.02em" }}>
                      {reel.label}
                    </p>
                  </div>

                  {/* Top: account + likes */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "0.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="font-mono-label text-[7px] tracking-[0.15em]" style={{ color: "var(--white-muted)" }}>
                      @{reel.account}
                    </span>
                    <span className="font-mono-label text-[7px]" style={{ color: "var(--white-muted)" }}>
                      ♡ {reel.likes}
                    </span>
                  </div>

                  {/* Hover: IG arrow */}
                  <div style={{
                    position: "absolute", top: "0.75rem", right: "0.75rem",
                    opacity: 0, transition: "opacity .25s",
                  }}
                    className="group-hover:opacity-100">
                    <span style={{
                      fontFamily: "var(--font-space-mono)", fontSize: 9,
                      color: "var(--white-secondary)",
                      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                      padding: "3px 7px",
                    }}>↗</span>
                  </div>
                </div>
              </a>
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
            style={{ border: "1px solid var(--white-dim)", backdropFilter: "blur(12px)", width: "fit-content" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="var(--white-secondary)" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4.5" stroke="var(--white-secondary)" strokeWidth="1.5"/>
              <circle cx="17.5" cy="6.5" r="1.4" fill="var(--white-primary)"/>
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
