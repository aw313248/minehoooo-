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
              style={{ width: "100%", height: "100%", border: "none", filter: "brightness(0.62)" }}
              allow="autoplay; encrypted-media"
              title="MINEH4O reel background"
            />
          )}
        </div>
      </div>

      {/* Bottom gradient — fades into black so text reads + smooth section transition */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-64"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 40%, #000 100%)" }} />
      {/* Top gradient — soft fade behind navbar */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }} />

      {/* ── Foreground content ── */}
      <div className="relative h-full w-full">

        {/* ── Headline words — staggered lowercase ── */}
        <h1 className="hero-title absolute text-white font-medium text-[16vw] md:text-[13vw] select-none"
          style={{
            left: "1rem", top: "16%",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .9s cubic-bezier(.16,1,.3,1) .12s, transform .9s cubic-bezier(.16,1,.3,1) .12s",
          }}>
          <span className="hidden md:inline pl-10">director</span>
          <span className="md:hidden">director</span>
        </h1>

        <h1 className="hero-title absolute text-white font-medium text-[16vw] md:text-[13vw] select-none text-right"
          style={{
            right: "1rem", top: "36%",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .9s cubic-bezier(.16,1,.3,1) .24s, transform .9s cubic-bezier(.16,1,.3,1) .24s",
          }}>
          <span className="hidden md:inline pr-10">DP · photo</span>
          <span className="md:hidden">DP · photo</span>
        </h1>

        <h1 className="hero-title absolute text-white font-medium text-[16vw] md:text-[13vw] select-none"
          style={{
            left: "18%", top: "56%",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .9s cubic-bezier(.16,1,.3,1) .36s, transform .9s cubic-bezier(.16,1,.3,1) .36s",
          }}>
          oscar
        </h1>

        {/* ── Description paragraph — left of "DP · photo" headline ── */}
        <p className="absolute max-w-[260px] text-[13px] md:text-[15px] leading-snug text-white/90 z-[8]"
          style={{
            left: "1.5rem", top: "44%",
            fontWeight: 300,
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "opacity .8s ease .55s, transform .8s ease .55s",
          }}>
          image and motion crafted in taichung —<br />
          director · DP · screenplay · photo · AIGC
        </p>

        {/* ── Stat block: TOP-RIGHT ── */}
        <div className="absolute z-[8]"
          style={{
            right: "1.5rem", top: "13%",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity .8s ease .7s, transform .8s ease .7s",
          }}>
          <div className="flex items-center gap-3 justify-end">
            <span aria-hidden="true" className="hidden md:block h-px w-24 bg-white/40" style={{ transform: "rotate(20deg)" }} />
            <span className="hero-title text-3xl md:text-5xl font-medium text-white">+150k</span>
          </div>
          <p className="text-[11px] md:text-sm text-white/70 mt-1 text-right" style={{ fontWeight: 300 }}>
            views across reels
          </p>
        </div>

        {/* ── Stat block: BOTTOM-LEFT ── */}
        <div className="absolute z-[8]"
          style={{
            left: "1.5rem", bottom: "5.5rem",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity .8s ease .82s, transform .8s ease .82s",
          }}>
          <div className="flex items-center gap-3">
            <span className="hero-title text-3xl md:text-5xl font-medium text-white">+50</span>
            <span aria-hidden="true" className="hidden md:block h-px w-24 bg-white/40" style={{ transform: "rotate(-20deg)" }} />
          </div>
          <p className="text-[11px] md:text-sm text-white/70 mt-1" style={{ fontWeight: 300 }}>
            mv · doc · ad productions
          </p>
        </div>

        {/* ── Stat block: BOTTOM-RIGHT ── */}
        <div className="absolute z-[8]"
          style={{
            right: "1.5rem", bottom: "5rem",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity .8s ease .92s, transform .8s ease .92s",
          }}>
          <div className="flex items-center gap-3 justify-end">
            <span aria-hidden="true" className="hidden md:block h-px w-24 bg-white/40" style={{ transform: "rotate(-20deg)" }} />
            <span className="hero-title text-3xl md:text-5xl font-medium text-white">+7yr</span>
          </div>
          <p className="text-[11px] md:text-sm text-white/70 mt-1 text-right" style={{ fontWeight: 300 }}>
            on set since 2019
          </p>
        </div>

        {/* ── Bottom strip: handle · scroll · DM ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[9] px-6 md:px-10 pb-4 flex items-end justify-between gap-4"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.05s" }}>

          {/* Left: handle */}
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.32em] text-white/45" style={{ fontWeight: 400 }}>
              TAICHUNG · TAIWAN
            </span>
            <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
              className="text-[12px] md:text-[13px] text-white/80 hover:text-white transition-colors mt-1"
              style={{ fontWeight: 400 }}>
              @minehoooo.arw ↗
            </a>
          </div>

          {/* Center: scroll hint */}
          <button onClick={() => goto(1)}
            className="hidden md:flex flex-col items-center gap-1.5 group"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Scroll to About">
            <span className="text-[9px] tracking-[0.4em] text-white/50 group-hover:text-white/80 transition-colors">
              SCROLL
            </span>
            <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.25)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.85)", animation: "slideDown 1.6s ease-in-out infinite" }} />
            </div>
          </button>

          {/* Right: quick CTA */}
          <button onClick={() => goto(6)}
            className="hover:bg-neutral-200 transition-colors"
            style={{
              background: "#fff",
              color: "#000",
              fontSize: 13, fontWeight: 500,
              borderRadius: 999,
              padding: "10px 22px",
              border: "none",
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}>
            let&apos;s work →
          </button>
        </div>
      </div>
    </section>
  );
}
