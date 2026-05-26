"use client";

import { useEffect, useState } from "react";

/* Featured background video (YouTube embed muted+loop) */
const HERO_VIDEO_ID = "d9_EuYkmfzM"; // 愚人節 ALL FOOL'S DAY — Jon Chen
const HERO_VIDEO_START = 4;

/* Past roles / departments — listed on right side */
const PAST_ROLES = [
  "DIRECTOR",
  "D.P.",
  "SCREENPLAY",
  "COLOR",
  "EDITOR",
  "ART DEPT",
  "AIGC",
  "LIGHTING",
];

function goto(page: number) {
  window.dispatchEvent(new CustomEvent("navto", { detail: page }));
}

/* Diagonal accent line — decorative element used throughout hero */
function DiagLine({ width = 96, rotation = 20, color = "rgba(255,255,255,0.32)" }: {
  width?: number; rotation?: number; color?: string;
}) {
  return (
    <span aria-hidden="true" className="block"
      style={{ width, height: 1, background: color, transform: `rotate(${rotation}deg)` }} />
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    const t  = setTimeout(() => setLoaded(true), 120);
    const t2 = setTimeout(() => setIframeReady(true), 600);
    const onPageChange = (e: Event) => setIsActive((e as CustomEvent<number>).detail === 0);
    window.addEventListener("pagechange", onPageChange);
    return () => {
      clearTimeout(t); clearTimeout(t2);
      window.removeEventListener("pagechange", onPageChange);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      {/* ── Fullscreen background — YouTube iframe muted loop ── */}
      <div className="absolute inset-0" style={{
        opacity: iframeReady && isActive ? 1 : 0,
        transition: "opacity 1.4s ease",
        pointerEvents: "none",
      }}>
        <div style={{ position: "absolute", inset: "-8%", width: "116%", height: "116%" }}>
          {iframeReady && (
            <iframe
              src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${HERO_VIDEO_ID}&rel=0&modestbranding=1&playsinline=1&start=${HERO_VIDEO_START}`}
              style={{ width: "100%", height: "100%", border: "none", filter: "brightness(0.5) saturate(0.95)" }}
              allow="autoplay; encrypted-media"
              title="MINEH4O reel background"
            />
          )}
        </div>
      </div>

      {/* Gradient layers for legibility */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-72"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.5) 35%, #000 100%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-44"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 38%, rgba(0,0,0,0.5) 100%)" }} />

      {/* ── Decorative diagonal accent lines ── */}
      <div aria-hidden="true" className="absolute pointer-events-none hidden md:block"
        style={{ left: "46%", top: "8%", opacity: loaded ? 0.55 : 0, transition: "opacity 1.4s ease .5s" }}>
        <DiagLine width={160} rotation={-20} />
      </div>
      <div aria-hidden="true" className="absolute pointer-events-none hidden md:block"
        style={{ left: "30%", bottom: "26%", opacity: loaded ? 0.45 : 0, transition: "opacity 1.4s ease .9s" }}>
        <DiagLine width={200} rotation={-20} color="rgba(255,255,255,0.22)" />
      </div>

      {/* ── Foreground content ── */}
      <div className="relative h-full w-full">

        {/* ═══════ DIRECTOR — HUGE top-left ═══════ */}
        <h1 className="hero-title absolute text-white select-none"
          style={{
            fontSize: "clamp(6rem, 18vw, 22rem)",
            left: "1.5rem", top: "10%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .9s cubic-bezier(.16,1,.3,1) .12s, transform .9s cubic-bezier(.16,1,.3,1) .12s",
          }}>
          DIRECTOR
        </h1>

        {/* ═══════ Intro paragraph — left, below DIRECTOR ═══════ */}
        <div className="absolute z-[8] max-w-sm"
          style={{
            left: "1.5rem", top: "32%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity .9s ease .42s, transform .9s ease .42s",
          }}>
          <div className="flex items-center gap-3 mb-3">
            <DiagLine width={28} rotation={20} color="rgba(255,255,255,0.45)" />
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
              IN-HOUSE IMAGE STUDIO
            </span>
          </div>
          <p className="text-[14px] md:text-[15px] leading-relaxed mb-3"
            style={{ color: "rgba(255,255,255,0.9)", fontWeight: 400 }}>
            台中在地影像工作者。<br/>
            從現場到後製，做能說話的畫面。
          </p>
          <p className="text-[12px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
            合作 / 陳卓 Jon Chen · Lil RAD · Kolli · 梁承煜 · 2026 TEDxNTHU · 中華職棒 Taiwolf · 公視學生劇展
          </p>
        </div>

        {/* ═══════ TAICHUNG · SINCE 2019 — anchor below intro ═══════ */}
        <div className="absolute z-[8]"
          style={{
            left: "1.5rem", top: "52%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "opacity .8s ease .58s, transform .8s ease .58s",
          }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 7, height: 7, background: "#fff", borderRadius: 999, boxShadow: "0 0 14px rgba(255,255,255,0.7)" }} />
            <span className="hero-title text-white" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)", letterSpacing: "0.08em" }}>
              FROM TAICHUNG
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] pl-5 mt-1 block" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            SINCE 2019
          </span>
        </div>

        {/* ═══════ OSCAR — MASSIVE bottom-left (focal) ═══════ */}
        <h1 className="hero-title absolute text-white select-none"
          style={{
            fontSize: "clamp(7rem, 22vw, 28rem)",
            left: "12%", bottom: "8%",
            letterSpacing: "0.02em",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 1s cubic-bezier(.16,1,.3,1) .26s, transform 1s cubic-bezier(.16,1,.3,1) .26s",
          }}>
          OSCAR
        </h1>

        {/* ═══════ Past roles list — vertical, right side (replaces big DP·PHOTO) ═══════ */}
        <div className="absolute z-[8] hidden md:flex flex-col items-end gap-1.5"
          style={{
            right: "1.5rem", top: "28%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(20px)",
            transition: "opacity .9s ease .55s, transform .9s ease .55s",
          }}>
          <span className="text-[9px] uppercase tracking-[0.4em] mb-2" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
            ROLES / 曾任
          </span>
          {PAST_ROLES.map((role, i) => (
            <span key={role}
              className="hero-title text-white block text-right"
              style={{
                fontSize: i < 2 ? "clamp(1.5rem, 3vw, 2.4rem)" : "clamp(1.1rem, 2.2vw, 1.7rem)",
                opacity: i < 2 ? 1 : 0.6,
                letterSpacing: "0.04em",
                lineHeight: 1.05,
              }}>
              {role}
            </span>
          ))}
        </div>

        {/* ═══════ Stat: TOP-RIGHT ═══════ */}
        <div className="absolute z-[8]"
          style={{
            right: "1.5rem", top: "10%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity .8s ease .7s, transform .8s ease .7s",
          }}>
          <div className="flex items-center gap-3 justify-end">
            <DiagLine width={56} rotation={20} />
            <span className="hero-title text-white" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}>
              +150K
            </span>
          </div>
          <p className="text-[10px] mt-1 text-right uppercase tracking-[0.24em]"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            VIEWS
          </p>
        </div>

        {/* ═══════ Stat: BOTTOM-RIGHT ═══════ */}
        <div className="absolute z-[8]"
          style={{
            right: "1.5rem", bottom: "6rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity .8s ease .82s, transform .8s ease .82s",
          }}>
          <div className="flex items-center gap-3 justify-end">
            <DiagLine width={56} rotation={-20} />
            <span className="hero-title text-white" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}>
              +50
            </span>
          </div>
          <p className="text-[10px] mt-1 text-right uppercase tracking-[0.24em]"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            PRODUCTIONS · +7YR
          </p>
        </div>

        {/* ═══════ Bottom strip: handle · scroll · CTA ═══════ */}
        <div className="absolute bottom-0 left-0 right-0 z-[9] px-6 md:px-10 pb-4 flex items-end justify-between gap-4"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.05s" }}>

          {/* Left: handle (subtle, doesn't fight OSCAR) */}
          <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
            className="text-[11px] hover:text-white transition-colors uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
            @MINEHOOOO.ARW ↗
          </a>

          {/* Center: scroll hint */}
          <button onClick={() => goto(1)}
            className="hidden md:flex flex-col items-center gap-1.5 group"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Scroll to About">
            <span className="text-[9px] tracking-[0.4em] uppercase group-hover:text-white/85 transition-colors" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
              SCROLL
            </span>
            <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.25)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.85)", animation: "slideDown 1.6s ease-in-out infinite" }} />
            </div>
          </button>

          {/* Right: quick CTA */}
          <button onClick={() => goto(6)}
            className="hover:bg-neutral-200 transition-colors uppercase"
            style={{
              background: "#fff",
              color: "#000",
              fontSize: 12, fontWeight: 600,
              letterSpacing: "0.08em",
              borderRadius: 999,
              padding: "10px 22px",
              border: "none",
              cursor: "pointer",
            }}>
            LET&apos;S WORK →
          </button>
        </div>
      </div>
    </section>
  );
}
