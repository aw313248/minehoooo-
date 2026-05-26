"use client";

import { useEffect, useState } from "react";

/* Featured background video (YouTube embed muted+loop) */
const HERO_VIDEO_ID = "d9_EuYkmfzM"; // 愚人節 ALL FOOL'S DAY — Jon Chen
const HERO_VIDEO_START = 4;

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
        style={{ background: "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 38%, rgba(0,0,0,0.55) 100%)" }} />

      {/* ── Decorative diagonal accent lines (scattered) ── */}
      <div aria-hidden="true" className="absolute pointer-events-none hidden md:block"
        style={{ left: "44%", top: "9%", opacity: loaded ? 0.6 : 0, transition: "opacity 1.4s ease .5s" }}>
        <DiagLine width={140} rotation={-20} />
      </div>
      <div aria-hidden="true" className="absolute pointer-events-none hidden md:block"
        style={{ right: "12%", top: "63%", opacity: loaded ? 0.5 : 0, transition: "opacity 1.4s ease .8s" }}>
        <DiagLine width={120} rotation={20} />
      </div>
      <div aria-hidden="true" className="absolute pointer-events-none hidden md:block"
        style={{ left: "38%", bottom: "22%", opacity: loaded ? 0.4 : 0, transition: "opacity 1.4s ease 1.1s" }}>
        <DiagLine width={180} rotation={-20} color="rgba(255,255,255,0.22)" />
      </div>

      {/* ── Foreground content ── */}
      <div className="relative h-full w-full">

        {/* ── DIRECTOR — top-left, LARGE ── */}
        <h1 className="hero-title absolute text-white select-none"
          style={{
            fontSize: "clamp(5rem, 14vw, 16rem)",
            left: "1.5rem", top: "12%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .9s cubic-bezier(.16,1,.3,1) .12s, transform .9s cubic-bezier(.16,1,.3,1) .12s",
          }}>
          DIRECTOR
        </h1>

        {/* ── DP · PHOTO — middle-right, LARGE ── */}
        <h1 className="hero-title absolute text-white select-none text-right"
          style={{
            fontSize: "clamp(5rem, 14vw, 16rem)",
            right: "1.5rem", top: "32%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity .9s cubic-bezier(.16,1,.3,1) .26s, transform .9s cubic-bezier(.16,1,.3,1) .26s",
          }}>
          DP · PHOTO
        </h1>

        {/* ── OSCAR — bottom-left-center, LARGE (focal — biggest) ── */}
        <h1 className="hero-title absolute text-white select-none"
          style={{
            fontSize: "clamp(6rem, 17vw, 20rem)",
            left: "16%", top: "54%",
            letterSpacing: "0.02em",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 1s cubic-bezier(.16,1,.3,1) .4s, transform 1s cubic-bezier(.16,1,.3,1) .4s",
          }}>
          OSCAR
        </h1>

        {/* ── TAICHUNG badge — left side, highlighted ── */}
        <div className="absolute z-[8]"
          style={{
            left: "1.5rem", top: "44%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            transition: "opacity .8s ease .55s, transform .8s ease .55s",
          }}>
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>
              FROM
            </span>
            <div className="flex items-center gap-3">
              <div style={{ width: 6, height: 6, background: "#fff", borderRadius: 999, boxShadow: "0 0 14px rgba(255,255,255,0.65)" }} />
              <span className="hero-title text-white" style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)", letterSpacing: "0.06em" }}>
                TAICHUNG
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] pl-5" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
              SINCE 2019
            </span>
          </div>
        </div>

        {/* ── Stat: TOP-RIGHT ── */}
        <div className="absolute z-[8]"
          style={{
            right: "1.5rem", top: "13%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity .8s ease .7s, transform .8s ease .7s",
          }}>
          <div className="flex items-center gap-3 justify-end">
            <DiagLine width={64} rotation={20} />
            <span className="hero-title text-white" style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}>
              +150K
            </span>
          </div>
          <p className="text-[10px] mt-1 text-right uppercase tracking-[0.24em]"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            VIEWS
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
            <span className="hero-title text-white" style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}>
              +50
            </span>
            <DiagLine width={64} rotation={-20} />
          </div>
          <p className="text-[10px] mt-1 uppercase tracking-[0.24em]"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            PRODUCTIONS
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
            <DiagLine width={64} rotation={-20} />
            <span className="hero-title text-white" style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}>
              +7YR
            </span>
          </div>
          <p className="text-[10px] mt-1 text-right uppercase tracking-[0.24em]"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            ON SET
          </p>
        </div>

        {/* ── Bottom strip: handle · scroll · DM ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[9] px-6 md:px-10 pb-4 flex items-end justify-between gap-4"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.05s" }}>

          {/* Left: handle */}
          <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
            className="text-[12px] md:text-[13px] hover:text-white transition-colors uppercase tracking-[0.18em]"
            style={{ color: "rgba(255,255,255,0.78)", fontWeight: 500 }}>
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
