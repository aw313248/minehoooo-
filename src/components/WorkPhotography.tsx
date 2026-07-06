"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { WordReveal } from "@/components/WordReveal";
import { photoCategories, type PhotoCategory } from "@/data/photos";
import { useLang } from "@/contexts/LangContext";

function encode(folder: string, file: string) {
  return `/photos/${folder}/${encodeURIComponent(file)}`;
}

/* ── Lightbox ── */
function Lightbox({ src, onClose, onPrev, onNext, hasPrev, hasNext, idx, total }: {
  src: string; onClose: () => void;
  onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean;
  idx: number; total: number;
}) {
  const [mounted, setMounted] = useState(false);
  const touchX = useState<number | null>(null);
  useEffect(() => { const id = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(id); }, []);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft"  && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  function onTouchStart(e: React.TouchEvent) { touchX[1](e.touches[0].clientX); }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX[0] === null) return;
    const dx = e.changedTouches[0].clientX - touchX[0];
    if (dx > 50 && hasPrev) onPrev();
    if (dx < -50 && hasNext) onNext();
    touchX[1](null);
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{
        background: `rgba(0,0,0,${mounted ? 0.92 : 0})`,
        backdropFilter: mounted ? "blur(24px)" : "blur(0px)",
        transition: "background .35s ease, backdrop-filter .35s ease",
      }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
      <div className="relative flex items-center gap-4"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1)" : "scale(0.94)",
          transition: "opacity .35s cubic-bezier(.16,1,.3,1), transform .35s cubic-bezier(.16,1,.3,1)",
        }}
        onClick={e => e.stopPropagation()}>

        <button onClick={onPrev} aria-label="Previous photo"
          className="hidden md:flex items-center justify-center"
          style={{
            width: 40, height: 40,
            background: "var(--white-ghost)",
            borderWidth: 1, borderStyle: "solid", borderColor: "var(--white-ghost)",
            cursor: hasPrev ? "pointer" : "default",
            opacity: hasPrev ? 1 : 0.18,
            transition: "opacity .2s, background .2s",
          }}
          onMouseEnter={e => hasPrev && (e.currentTarget.style.background = "var(--white-dim)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--white-ghost)")}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="var(--white-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="7 1 1 7 7 13" />
          </svg>
        </button>

        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={`MINEH4O Photography ${String(idx + 1).padStart(2,"0")} of ${total}`} className="max-w-[82vw] max-h-[85vh] object-contain" style={{ borderRadius: 14 }} />
          <span className="absolute bottom-3 left-3 font-mono-label text-[8px] tracking-[0.2em]"
            style={{ color: "var(--white-soft)" }}>
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button onClick={onClose} aria-label="Close lightbox"
            className="absolute top-3 right-3 font-mono-label text-[9px] tracking-widest px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", color: "var(--white-secondary)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.12)" }}>
            ESC ✕
          </button>
        </div>

        <button onClick={onNext} aria-label="Next photo"
          className="hidden md:flex items-center justify-center"
          style={{
            width: 40, height: 40,
            background: "var(--white-ghost)",
            borderWidth: 1, borderStyle: "solid", borderColor: "var(--white-ghost)",
            cursor: hasNext ? "pointer" : "default",
            opacity: hasNext ? 1 : 0.18,
            transition: "opacity .2s, background .2s",
          }}
          onMouseEnter={e => hasNext && (e.currentTarget.style.background = "var(--white-dim)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--white-ghost)")}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="var(--white-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 1 7 7 1 13" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Horizontal full-bleed carousel — peek next/prev, glass arrows ── */
function HorizontalCarousel({
  cat,
  onOpen,
  active,
}: {
  cat: PhotoCategory;
  onOpen: (idx: number) => void;
  active: boolean;
}) {
  const [idx, setIdx]               = useState(0);
  const [touchStartX, setTouchStart]= useState<number | null>(null);
  const [hovered, setHovered]       = useState<number | null>(null);
  const railRef                     = useRef<HTMLDivElement>(null);

  // Reset on category change
  useEffect(() => { setIdx(0); }, [cat.id]);

  const total   = cat.files.length;
  const canPrev = idx > 0;
  const canNext = idx < total - 1;
  const next    = () => canNext && setIdx(i => i + 1);
  const prev    = () => canPrev && setIdx(i => i - 1);

  // Keyboard — only while section visible
  useEffect(() => {
    if (!active) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft"  && canPrev) prev();
      if (e.key === "ArrowRight" && canNext) next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [active, canPrev, canNext]);

  function onTouchStart(e: React.TouchEvent) { setTouchStart(e.touches[0].clientX); }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50  && canPrev) prev();
    if (dx < -50 && canNext) next();
    setTouchStart(null);
  }

  // Slide is 64% of rail width on desktop, 86% on mobile — but we treat them uniformly
  // and use percentage so layout is fluid. Each slide block is 100% / (slides per view).
  // We center current slide by translating the rail.
  // Use CSS var so we can set responsive widths.
  return (
    <div className="absolute inset-0 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: "pan-y" }}>

      {/* Rail */}
      <div
        ref={railRef}
        className="flex items-center h-full"
        style={{
          // each slide width is set via inline below; translate to center current
          // Center = 50% - (slideWidthPct / 2); we use 64% desktop, 86% mobile via media class trick
          // To avoid media-query JS, we render two transforms — pick via tailwind responsive wrap
          transform: `translate3d(calc(50% - (var(--slide-w) / 2) - (var(--slide-w) * ${idx})), 0, 0)`,
          transition: "transform .8s cubic-bezier(.16,1,.3,1)",
          ['--slide-w' as string]: "var(--slide-w-mobile, 86%)",
        }}>
        {cat.files.map((f, i) => {
          const src      = encode(cat.id, f);
          const isActive = i === idx;
          const distance = Math.abs(i - idx);
          // Peek styling
          const scale    = isActive ? 1 : distance === 1 ? 0.86 : 0.78;
          const opacity  = isActive ? 1 : distance === 1 ? 0.38 : 0.16;
          return (
            <div
              key={f}
              className="shrink-0 h-full flex items-center justify-center px-2 md:px-3"
              style={{
                width: "var(--slide-w)",
              }}>
              <button
                onClick={() => isActive ? onOpen(i) : setIdx(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(h => (h === i ? null : h))}
                className="relative overflow-hidden block w-full h-full group"
                style={{
                  borderRadius: 22,
                  transform: `scale(${scale})`,
                  opacity,
                  transition: "transform .8s cubic-bezier(.16,1,.3,1), opacity .6s ease",
                  cursor: isActive ? "zoom-in" : "pointer",
                  boxShadow: isActive
                    ? "0 24px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)"
                    : "0 8px 24px -12px rgba(0,0,0,0.6)",
                }}
                aria-label={isActive ? `Open photo ${i + 1}` : `Go to photo ${i + 1}`}>
                <Image
                  src={src}
                  alt={`${cat.en} ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  priority={i <= 1}
                  loading={i <= 1 ? undefined : "lazy"}
                  sizes="(max-width: 768px) 88vw, 64vw"
                />

                {/* Soft grain on active slide */}
                {isActive && (
                  <div aria-hidden="true" style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                    backgroundSize: "180px 180px",
                    opacity: 0.05,
                    mixBlendMode: "overlay",
                  }} />
                )}

                {/* Index pill */}
                <span
                  className="absolute bottom-4 left-4 font-mono-label text-[9px] tracking-[0.3em] px-2.5 py-1"
                  style={{
                    color: "var(--white-primary)",
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 999,
                  }}>
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>

                {/* OPEN hover pill — active only */}
                {isActive && hovered === i && (
                  <div className="absolute top-4 right-4 hidden md:block">
                    <div style={{
                      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(14px)",
                      border: "1px solid var(--white-soft)", borderRadius: 999,
                      padding: "8px 14px", display: "flex", alignItems: "center", gap: 8,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--white-primary)" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                      </svg>
                      <span className="font-mono-label text-[8px] tracking-[0.3em]" style={{ color: "var(--white-primary)" }}>
                        OPEN ↗
                      </span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Desktop arrows — floating glass */}
      <button onClick={prev} disabled={!canPrev} aria-label="Previous photo"
        className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-6 z-20"
        style={{
          width: 54, height: 54, borderRadius: 999,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(16px)",
          border: `1px solid ${canPrev ? "var(--white-soft)" : "var(--white-ghost)"}`,
          opacity: canPrev ? 1 : 0.2,
          cursor: canPrev ? "pointer" : "default",
          transition: "background .25s ease, opacity .25s ease, transform .2s ease",
        }}
        onMouseEnter={e => canPrev && (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.55)")}>
        <svg width="10" height="16" viewBox="0 0 8 14" fill="none" stroke="var(--white-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="7 1 1 7 7 13" />
        </svg>
      </button>

      <button onClick={next} disabled={!canNext} aria-label="Next photo"
        className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-6 z-20"
        style={{
          width: 54, height: 54, borderRadius: 999,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(16px)",
          border: `1px solid ${canNext ? "var(--white-soft)" : "var(--white-ghost)"}`,
          opacity: canNext ? 1 : 0.2,
          cursor: canNext ? "pointer" : "default",
          transition: "background .25s ease, opacity .25s ease, transform .2s ease",
        }}
        onMouseEnter={e => canNext && (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.55)")}>
        <svg width="10" height="16" viewBox="0 0 8 14" fill="none" stroke="var(--white-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 1 7 7 1 13" />
        </svg>
      </button>

      {/* Bottom counter + dots */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 px-4 py-2"
        style={{
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(14px)",
          borderRadius: 999,
          border: "1px solid var(--white-ghost)",
        }}>
        <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color: "var(--white-soft)" }}>
          {String(idx + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5 max-w-[180px] md:max-w-[280px] overflow-hidden">
          {cat.files.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Go to photo ${i + 1}`}
              style={{
                width:  i === idx ? 18 : 4,
                height: 4, borderRadius: 2,
                background: i === idx ? "var(--white-primary)" : "var(--white-muted)",
                transition: "all .35s ease",
                cursor: "pointer",
                flexShrink: 0,
              }} />
          ))}
        </div>
        <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color: "var(--white-soft)" }}>
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export default function WorkPhotography() {
  const [activeId, setActiveId] = useState(photoCategories[0].id);
  const [lightbox, setLightbox] = useState<{ idx: number } | null>(null);
  const { ref, inView }         = useInView(0.05);
  const { lang }                = useLang();
  const cat                     = photoCategories.find(c => c.id === activeId)!;
  const encodedFiles            = cat.files.map(f => encode(cat.id, f));

  return (
    <>
      {lightbox && (
        <Lightbox
          src={encodedFiles[lightbox.idx]}
          idx={lightbox.idx}
          total={encodedFiles.length}
          hasPrev={lightbox.idx > 0}
          hasNext={lightbox.idx < encodedFiles.length - 1}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox(l => l && l.idx > 0 ? { idx: l.idx - 1 } : l)}
          onNext={() => setLightbox(l => l && l.idx < encodedFiles.length - 1 ? { idx: l.idx + 1 } : l)}
        />
      )}

      <section
        ref={ref}
        style={{
          background: "#000",
          minHeight: "100vh",
          // Responsive slide width via CSS var (used by carousel rail transform)
          ['--slide-w-mobile' as string]: "86%",
        }}
        className="md:h-screen md:overflow-hidden flex flex-col relative
                   [--slide-w-mobile:86%] md:[--slide-w-mobile:64%]">

        {/* ── Header ── */}
        <div className="shrink-0 px-5 md:px-12 pt-6 md:pt-10 pb-4 md:pb-5 relative z-10">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-4 md:mb-6">
            <div>
              <span className="font-mono-label text-[9px] md:text-[10px] tracking-[0.35em] block mb-2 md:mb-4"
                style={{ color: "var(--text-3)", opacity: inView ? 1 : 0, transition: "opacity .8s ease" }}>
                {lang === "zh" ? "02 — 攝影" : "02 — PHOTOGRAPHY"}
              </span>
              <h2 className="font-display leading-none"
                style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", color: "var(--text)" }}>
                <WordReveal text="Photo" inView={inView} baseDelay={0.08} stagger={0.05} />
              </h2>
            </div>
            <div className="text-left md:text-right max-w-md">
              <p className="font-mono-label text-[9px] tracking-wider mb-2" style={{ color: "var(--text-3)" }}>
                {cat.files.length} works · {photoCategories.length} categories
              </p>
              <p className="text-[11px] md:text-[12px] leading-relaxed" style={{ color: "var(--text-2)" }}>
                {cat.desc}
              </p>
            </div>
          </div>

          {/* Category pills — horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
            style={{ scrollbarWidth: "none" }}>
            {photoCategories.map((c, i) => {
              const isActive = c.id === activeId;
              return (
                <button key={c.id} onClick={() => setActiveId(c.id)}
                  className="shrink-0 px-3.5 md:px-4 py-2 flex items-center gap-2 active:scale-95"
                  style={{
                    background:    isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.04)",
                    backdropFilter:"blur(10px)",
                    border:       `1px solid ${isActive ? "var(--white-soft)" : "var(--white-ghost)"}`,
                    borderRadius:  999,
                    opacity:       inView ? 1 : 0,
                    transform:     inView ? "translateY(0)" : "translateY(8px)",
                    transition:   `opacity .5s ease ${0.15 + i * 0.04}s, transform .5s ease ${0.15 + i * 0.04}s, background .2s ease, border-color .2s ease, transform .15s ease`,
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                  <span className="font-mono-label text-[10px] tracking-wider whitespace-nowrap"
                    style={{ color: isActive ? "var(--text)" : "var(--text-2)" }}>
                    {c.en}
                  </span>
                  <span className="font-mono-label text-[8px] whitespace-nowrap"
                    style={{ color: "var(--text-3)" }}>
                    {String(c.files.length).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="flex-1 relative min-h-[55vh] md:min-h-0">
          <HorizontalCarousel cat={cat} onOpen={idx => setLightbox({ idx })} active={inView} />
        </div>

        {/* ── Footer hint ── */}
        <div className="shrink-0 px-5 md:px-12 pb-4 md:pb-6 pt-3 flex items-center justify-between gap-4 relative z-10">
          <p className="font-mono-label text-[8px] md:text-[9px] tracking-[0.25em]"
            style={{ color: "var(--text-3)" }}>
            {lang === "zh"
              ? "點圖放大　·　←→ 切換　·　ESC 關閉"
              : "TAP TO ZOOM · ←→ TO BROWSE · ESC TO CLOSE"}
          </p>
          <p className="font-mono-label text-[8px] md:text-[9px] tracking-[0.25em] hidden md:block"
            style={{ color: "var(--white-soft)" }}>
            MINEH4O · {cat.en.toUpperCase()}
          </p>
        </div>

      {/* ══ SELECTED — 僑泰55校慶 × 平面設計（花式亂序馬賽克 · 原始尺寸照片）══ */}
      <div className="px-4 md:px-14 py-16 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="font-mono-label text-[8px] tracking-[0.42em] mb-2" style={{ color: "rgba(255,225,140,0.75)" }}>SELECTED SET</p>
            <h2 className="font-display leading-none" style={{ fontSize: "clamp(1.8rem, 4.2vw, 3.6rem)", color: "var(--text)" }}>
              僑泰 55 週年校慶
            </h2>
            <p className="font-mono-label text-[9px] tracking-[0.28em] mt-2" style={{ color: "var(--text-3)" }}>
              EVENT PHOTOGRAPHY · 10 SELECTS ＋ ALBUM ARTWORK
            </p>
          </div>
          <p className="font-mono-label text-[8px] tracking-[0.22em] text-right" style={{ color: "var(--white-dim)" }}>
            李多慧出席現場 · 全原始尺寸
          </p>
        </div>

        {/* CSS columns 亂序馬賽克 — 自然比例、交錯縮放、毛玻璃 hover 標籤 */}
        <div className="ct55-mosaic" style={{ columnGap: 14 }}>
          {/* 專輯封面 — 平面設計 feature，插在照片流裡 */}
          <figure className="ct55-item m-0 mb-3.5 relative overflow-hidden group" style={{ borderRadius: 14, breakInside: "avoid" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photo/album-thousand-mountains.jpg" alt="一千座山一千條河 專輯封面設計" loading="lazy"
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]" />
            <figcaption className="ct55-cap">
              <span>一千座山一千條河 — 專輯封面設計</span>
              <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.24em", color: "rgba(255,225,140,0.9)" }}>GRAPHIC DESIGN · 陳卓專輯</span>
            </figcaption>
          </figure>
          {Array.from({ length: 10 }, (_, i) => (
            <figure key={i} className="ct55-item m-0 mb-3.5 relative overflow-hidden group"
              style={{ borderRadius: 14, breakInside: "avoid", transform: `rotate(${(i % 3 - 1) * 0.6}deg)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/photo/chiaotai55/ct55-${String(i + 1).padStart(2, "0")}.jpg`} alt={`僑泰55校慶 精選 ${i + 1}`} loading="lazy"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]" />
              <figcaption className="ct55-cap">
                <span>僑泰 55 週年校慶</span>
                <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.24em", color: "rgba(255,255,255,0.6)" }}>SELECT {String(i + 1).padStart(2, "0")} / 10</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <style>{`
          .ct55-mosaic { columns: 1; }
          @media (min-width: 640px) { .ct55-mosaic { columns: 2; } }
          @media (min-width: 1024px) { .ct55-mosaic { columns: 3; } }
          .ct55-cap { position: absolute; left: 10px; right: 10px; bottom: 10px; display: flex; flex-direction: column; gap: 2px;
            background: rgba(10,10,12,0.55); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12);
            border-radius: 10px; padding: 9px 12px; font-size: 12px; color: rgba(255,255,255,0.92);
            opacity: 0; transform: translateY(8px); transition: opacity .35s ease, transform .35s cubic-bezier(.16,1,.3,1); }
          .ct55-item:hover .ct55-cap { opacity: 1; transform: translateY(0); }
        `}</style>
      </div>

      </section>
    </>
  );
}
