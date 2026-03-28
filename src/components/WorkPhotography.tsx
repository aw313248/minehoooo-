"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { WordReveal } from "@/components/WordReveal";
import { photoCategories, type PhotoCategory } from "@/data/photos";

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

        {/* Prev chevron */}
        <button onClick={onPrev} aria-label="Previous photo"
          className="hidden md:flex items-center justify-center"
          style={{
            width: 40, height: 40,
            background: "rgba(255,255,255,0.05)",
            borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.1)",
            cursor: hasPrev ? "pointer" : "default",
            opacity: hasPrev ? 1 : 0.18,
            transition: "opacity .2s, background .2s",
          }}
          onMouseEnter={e => hasPrev && (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="7 1 1 7 7 13" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="max-w-[82vw] max-h-[85vh] object-contain" style={{ borderRadius: 2 }} />
          {/* Counter */}
          <span className="absolute bottom-3 left-3 font-mono-label text-[8px] tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {/* Close */}
          <button onClick={onClose} aria-label="Close lightbox"
            className="absolute top-3 right-3 font-mono-label text-[9px] tracking-widest px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.7)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.12)" }}>
            ESC ✕
          </button>
        </div>

        {/* Next chevron */}
        <button onClick={onNext} aria-label="Next photo"
          className="hidden md:flex items-center justify-center"
          style={{
            width: 40, height: 40,
            background: "rgba(255,255,255,0.05)",
            borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.1)",
            cursor: hasNext ? "pointer" : "default",
            opacity: hasNext ? 1 : 0.18,
            transition: "opacity .2s, background .2s",
          }}
          onMouseEnter={e => hasNext && (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 1 7 7 1 13" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Strip of small thumbnails at the bottom ── */
function PhotoStrip({ cat, onSelect }: { cat: PhotoCategory; onSelect: (idx: number) => void }) {
  const thumbs = cat.files.slice(0, 12);
  return (
    <div className="relative">
      <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {thumbs.map((f, i) => {
          const src = encode(cat.id, f);
          return (
            <div key={f} className="shrink-0 overflow-hidden cursor-pointer group relative"
              style={{ width: 64, height: 64, borderRadius: 2 }}
              onClick={() => onSelect(i)}>
              <Image src={src} alt={f} fill loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          );
        })}
        {cat.files.length > 12 && (
          <div className="shrink-0 flex items-center justify-center"
            style={{ width: 64, height: 64, background: "rgba(255,255,255,0.04)", borderRadius: 2, border: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="font-mono-label text-[9px]" style={{ color: "var(--text-3)" }}>+{cat.files.length - 12}</span>
          </div>
        )}
      </div>
      {/* Right-edge fade hint — shows strip is scrollable */}
      <div aria-hidden="true" className="absolute right-0 top-0 bottom-1 w-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.9))" }} />
    </div>
  );
}

export default function WorkPhotography() {
  const [activeId, setActiveId]   = useState(photoCategories[0].id);
  const [heroIdx, setHeroIdx]     = useState(0);
  const [lightbox, setLightbox]   = useState<{ idx: number } | null>(null);
  const { ref, inView }           = useInView(0.05);
  const cat = photoCategories.find(c => c.id === activeId)!;
  const encodedFiles = cat.files.map(f => encode(cat.id, f));

  useEffect(() => {
    const startIdx = Math.floor(Math.random() * Math.min(cat.files.length, 6));
    setHeroIdx(startIdx);
    const t = setInterval(() => setHeroIdx(i => (i + 1) % Math.min(cat.files.length, 6)), 4000);
    return () => clearInterval(t);
  }, [activeId, cat.files.length]);

  const heroSrc = encode(cat.id, cat.files[heroIdx]);

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

      <section style={{ background: "#000", minHeight: "100vh" }} className="md:h-screen md:overflow-hidden md:flex md:flex-row">

        {/* ── PHOTO (desktop: right flex-1 | mobile: top portion) ── */}
        <div className="relative overflow-hidden cursor-pointer order-first md:order-last md:flex-1"
          style={{ height: "62vw", minHeight: 180 }}
          onClick={() => setLightbox({ idx: heroIdx })}>

          {/* Hero image (crossfade cycle) */}
          <Image
            src={heroSrc}
            alt={cat.en}
            fill
            className="object-cover"
            style={{ animation: "focusIn 1.2s cubic-bezier(.16,1,.3,1) forwards" }}
            priority
          />

          {/* Gradient overlay: left vignette blends into left panel */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)",
          }} />

          {/* Bottom info overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-8 py-6"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)", backdropFilter: "blur(0px)" }}>
            <p className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.5)" }}>
              {cat.en.toUpperCase()} · MINEH4O · {String(heroIdx + 1).padStart(2, "0")} / {String(Math.min(cat.files.length, 6)).padStart(2, "0")}
            </p>
          </div>

          {/* OPEN overlay — desktop hover */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.14)", padding: "10px 22px", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span className="font-mono-label text-[8px] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.8)" }}>OPEN ↗</span>
            </div>
          </div>

          {/* Dot progress */}
          <div className="absolute top-6 right-6 flex gap-1.5">
            {cat.files.slice(0, 6).map((_, i) => (
              <div key={i}
                onClick={e => { e.stopPropagation(); setHeroIdx(i); }}
                style={{
                  width: i === heroIdx ? 16 : 4, height: 4, borderRadius: 2, cursor: "pointer",
                  background: i === heroIdx ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
                  transition: "all .4s ease",
                }} />
            ))}
          </div>

          {/* View label — desktop hover only */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="font-mono-label text-[11px] tracking-[0.3em]"
              style={{ color: "rgba(255,255,255,0.8)", textShadow: "0 0 20px rgba(0,0,0,0.8)" }}>
              VIEW FULL
            </span>
          </div>
        </div>

        {/* ── CONTROLS (desktop: left 38% sticky | mobile: below photo, full scroll) ── */}
        <div ref={ref} className="relative z-10 flex flex-col md:justify-between md:w-[38%] shrink-0 border-r md:p-12 md:overflow-y-auto"
          style={{ borderColor: "var(--border)", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(24px)" }}>

          {/* ── Desktop title ── */}
          <div className="hidden md:block">
            <span className="font-mono-label text-[9px] tracking-[0.35em] block mb-5"
              style={{ color: "var(--text-3)", opacity: inView ? 1 : 0, transition: "opacity .8s ease" }}>
              02 — 攝影
            </span>
            <h2 className="font-display leading-none mb-3" style={{ fontSize: "clamp(3.5rem,8vw,9rem)", color: "var(--text)" }}>
              <WordReveal text="Photo" inView={inView} baseDelay={0.08} stagger={0.05} />
            </h2>
            <p className="font-mono-label text-[9px] tracking-wider mb-8" style={{ color: "var(--text-3)" }}>
              {cat.files.length} works · {photoCategories.length} categories
            </p>
          </div>

          {/* ── Mobile: section label (tiny) ── */}
          <div className="md:hidden px-4 pt-3 pb-1 flex items-center justify-between">
            <span className="font-mono-label text-[8px] tracking-[0.3em]" style={{ color: "var(--text-3)" }}>
              02 — PHOTOGRAPHY
            </span>
            <span className="font-mono-label text-[8px]" style={{ color: "var(--text-3)" }}>
              {cat.files.length} works
            </span>
          </div>

          {/* ── Mobile: horizontal pill categories ── */}
          <div className="md:hidden flex gap-2 overflow-x-auto px-4 pb-2" style={{ scrollbarWidth: "none" }}>
            {photoCategories.map((c) => (
              <button key={c.id} onClick={() => setActiveId(c.id)}
                className="shrink-0 px-3 py-1.5 transition-all duration-300"
                style={{
                  background: c.id === activeId ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                  border: c.id === activeId ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 2,
                }}>
                <span className="font-mono-label text-[9px] tracking-wider whitespace-nowrap"
                  style={{ color: c.id === activeId ? "var(--text)" : "var(--text-3)" }}>
                  {c.en}
                </span>
              </button>
            ))}
          </div>

          {/* ── Mobile: full photo grid (all photos, scrollable) ── */}
          <div className="md:hidden px-3 pb-8 pt-2">
            <p className="font-mono-label text-[8px] tracking-[0.3em] mb-3 px-1" style={{ color: "var(--text-3)" }}>
              {cat.files.length} PHOTOS — TAP TO ENLARGE
            </p>
            <div className="grid grid-cols-2 gap-1">
              {cat.files.map((f) => {
                const src = encode(cat.id, f);
                return (
                  <div key={f} className="relative overflow-hidden cursor-pointer"
                    style={{ aspectRatio: "4/3", borderRadius: 2 }}
                    onClick={() => setLightbox({ idx: cat.files.indexOf(f) })}>
                    <Image src={src} alt={f} fill loading="lazy" className="object-cover transition-transform duration-500 active:scale-95" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Desktop: vertical category list ── */}
          <div className="hidden md:block">
            <div className="space-y-1 mb-8">
              {photoCategories.map((c, i) => (
                <button key={c.id} onClick={() => setActiveId(c.id)}
                  className="w-full flex items-center justify-between px-4 py-3 transition-all duration-300 text-left"
                  style={{
                    background:     c.id === activeId ? "rgba(255,255,255,0.07)" : "transparent",
                    backdropFilter: c.id === activeId ? "blur(8px)" : "none",
                    borderLeft:     c.id === activeId ? "2px solid rgba(255,255,255,0.5)" : "2px solid transparent",
                    opacity: inView ? 1 : 0,
                    transition: `opacity .6s ease ${.1 + i * .08}s, background .3s, border-color .3s`,
                  }}>
                  <div>
                    <p className="text-[13px] font-medium" style={{ color: c.id === activeId ? "var(--text)" : "var(--text-2)" }}>
                      {c.en}
                    </p>
                    <p className="font-mono-label text-[9px]" style={{ color: "var(--text-3)" }}>{c.zh}</p>
                  </div>
                  <span className="font-mono-label text-[8px]" style={{ color: "var(--text-3)" }}>{c.files.length}</span>
                </button>
              ))}
            </div>
            <p className="font-mono-label text-[9px] leading-relaxed mb-6" style={{ color: "var(--text-3)" }}>
              {cat.desc}
            </p>
          </div>

          {/* ── Desktop: thumbnail strip ── */}
          <div className="hidden md:block">
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-3" style={{ color: "var(--text-3)" }}>GALLERY</p>
            <PhotoStrip cat={cat} onSelect={idx => setLightbox({ idx })} />
            <p className="font-mono-label text-[8px] mt-3" style={{ color: "var(--text-3)" }}>
              Click thumbnail to enlarge · ESC to close
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
