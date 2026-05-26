"use client";

import { useEffect, useState } from "react";

/* Featured background video (YouTube embed muted+loop) */
const HERO_VIDEO_ID = "d9_EuYkmfzM"; // 愚人節 ALL FOOL'S DAY — Jon Chen
const HERO_VIDEO_START = 4;

function goto(page: number) {
  window.dispatchEvent(new CustomEvent("navto", { detail: page }));
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
    <section className="relative h-screen w-full overflow-hidden bg-black"
      style={{ fontFamily: "var(--font-readex), 'Readex Pro', system-ui, sans-serif" }}>

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
              style={{ width: "100%", height: "100%", border: "none", filter: "brightness(0.55) saturate(0.95)" }}
              allow="autoplay; encrypted-media"
              title="MINEH4O reel background"
            />
          )}
        </div>
      </div>

      {/* Bottom gradient — fades into black so text reads + smooth section transition */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-72"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.45) 35%, #000 100%)" }} />
      {/* Top gradient — soft fade behind navbar */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-44"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)" }} />

      {/* Subtle radial vignette around edges */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />

      {/* ── Foreground content ── */}
      <div className="relative h-full w-full">

        {/* ── DIRECTOR — top, smaller (supporting role label) ── */}
        <h1 className="hero-title absolute text-white font-medium select-none"
          style={{
            fontSize: "clamp(3rem, 8.5vw, 9rem)",
            left: "1.5rem", top: "13%",
            letterSpacing: "-0.015em",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .9s cubic-bezier(.16,1,.3,1) .12s, transform .9s cubic-bezier(.16,1,.3,1) .12s",
          }}>
          DIRECTOR
        </h1>

        {/* ── DP · PHOTO — middle-right, smallest (secondary) ── */}
        <h1 className="hero-title absolute text-white font-normal select-none text-right"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 7rem)",
            right: "1.5rem", top: "32%",
            letterSpacing: "0em",
            color: "rgba(255,255,255,0.78)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .9s cubic-bezier(.16,1,.3,1) .26s, transform .9s cubic-bezier(.16,1,.3,1) .26s",
          }}>
          DP · PHOTO
        </h1>

        {/* ── OSCAR — focal, LARGEST (the name = identity) ── */}
        <div className="absolute select-none"
          style={{
            left: "8%", bottom: "26%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 1s cubic-bezier(.16,1,.3,1) .4s, transform 1s cubic-bezier(.16,1,.3,1) .4s",
          }}>
          {/* Ghost outline behind */}
          <h1 className="hero-title hero-title-ghost absolute font-medium select-none pointer-events-none"
            style={{
              fontSize: "clamp(5.5rem, 16vw, 18rem)",
              top: 8, left: 8,
              letterSpacing: "-0.02em",
            }}>
            OSCAR
          </h1>
          {/* Main focal */}
          <h1 className="hero-title hero-title-focal relative text-white font-medium"
            style={{
              fontSize: "clamp(5.5rem, 16vw, 18rem)",
              letterSpacing: "-0.02em",
            }}>
            OSCAR
          </h1>
        </div>

        {/* ── Description — left, near DP · PHOTO ── */}
        <p className="absolute max-w-[280px] z-[8]"
          style={{
            left: "1.5rem", top: "44%",
            fontSize: 13.5, lineHeight: 1.65,
            color: "rgba(255,255,255,0.82)",
            fontWeight: 300,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "opacity .8s ease .55s, transform .8s ease .55s",
          }}>
          image and motion crafted in taichung —<br />
          director · DP · screenplay · photo · AIGC
        </p>

        {/* ── Stat: TOP-RIGHT ── */}
        <div className="absolute z-[8]"
          style={{
            right: "1.5rem", top: "13%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity .8s ease .7s, transform .8s ease .7s",
          }}>
          <div className="flex items-center gap-3 justify-end">
            <span aria-hidden="true" className="hidden md:block h-px w-20 bg-white/40" style={{ transform: "rotate(20deg)" }} />
            <span className="hero-title text-3xl md:text-[2.4rem] font-medium text-white" style={{ letterSpacing: "-0.02em" }}>
              +150K
            </span>
          </div>
          <p className="text-[10px] md:text-[11px] mt-1 text-right uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>
            views across reels
          </p>
        </div>

        {/* ── Stat: BOTTOM-LEFT ── */}
        <div className="absolute z-[8]"
          style={{
            left: "1.5rem", bottom: "6.5rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity .8s ease .82s, transform .8s ease .82s",
          }}>
          <div className="flex items-center gap-3">
            <span className="hero-title text-3xl md:text-[2.4rem] font-medium text-white" style={{ letterSpacing: "-0.02em" }}>
              +50
            </span>
            <span aria-hidden="true" className="hidden md:block h-px w-20 bg-white/40" style={{ transform: "rotate(-20deg)" }} />
          </div>
          <p className="text-[10px] md:text-[11px] mt-1 uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>
            mv · doc · ad productions
          </p>
        </div>

        {/* ── Stat: BOTTOM-RIGHT ── */}
        <div className="absolute z-[8]"
          style={{
            right: "1.5rem", bottom: "6rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity .8s ease .92s, transform .8s ease .92s",
          }}>
          <div className="flex items-center gap-3 justify-end">
            <span aria-hidden="true" className="hidden md:block h-px w-20 bg-white/40" style={{ transform: "rotate(-20deg)" }} />
            <span className="hero-title text-3xl md:text-[2.4rem] font-medium text-white" style={{ letterSpacing: "-0.02em" }}>
              +7YR
            </span>
          </div>
          <p className="text-[10px] md:text-[11px] mt-1 text-right uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.6)", fontWeight: 400 }}>
            on set since 2019
          </p>
        </div>

        {/* ── Bottom strip: handle · scroll · DM ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[9] px-6 md:px-10 pb-4 flex items-end justify-between gap-4"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.05s" }}>

          {/* Left: handle */}
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.32em] uppercase" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>
              TAICHUNG · TAIWAN
            </span>
            <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
              className="text-[12px] md:text-[13px] hover:text-white transition-colors mt-1"
              style={{ color: "rgba(255,255,255,0.78)", fontWeight: 400 }}>
              @minehoooo.arw ↗
            </a>
          </div>

          {/* Center: scroll hint */}
          <button onClick={() => goto(1)}
            className="hidden md:flex flex-col items-center gap-1.5 group"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Scroll to About">
            <span className="text-[9px] tracking-[0.4em] uppercase group-hover:text-white/85 transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
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
              fontSize: 12, fontWeight: 500,
              letterSpacing: "0.04em",
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
