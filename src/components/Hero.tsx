"use client";

import { useEffect, useState } from "react";
import { haptic } from "@/lib/haptic";

/* ───────── Hook: device orientation tilt parallax
   - Returns { x, y } in -1..1 range (multiplied later for translate)
   - Handles iOS 13+ requestPermission flow (silent: needs user gesture)
   - Returns zeros on desktop / unsupported devices
*/
function useTilt(): { x: number; y: number } {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only touch devices
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    type DOEWithPermission = typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    const DOE = DeviceOrientationEvent as unknown as DOEWithPermission;

    let raf = 0;
    let pendingX = 0, pendingY = 0;
    let started = false;

    const handler = (e: DeviceOrientationEvent) => {
      const beta  = e.beta  ?? 0; // front-back (-180..180), 0=flat
      const gamma = e.gamma ?? 0; // left-right (-90..90)
      // Normalize: gamma ±20° → x ±1, beta (30°=neutral hand-hold) ±15° → y ±1
      pendingX = Math.max(-1, Math.min(1, gamma / 20));
      pendingY = Math.max(-1, Math.min(1, (beta - 30) / 15));
      if (!raf) {
        raf = requestAnimationFrame(() => {
          setTilt({ x: pendingX, y: pendingY });
          raf = 0;
        });
      }
    };

    const start = () => {
      if (started) return;
      started = true;
      window.addEventListener("deviceorientation", handler);
    };

    const stop = () => {
      window.removeEventListener("deviceorientation", handler);
      if (raf) cancelAnimationFrame(raf);
    };

    if (typeof DOE.requestPermission === "function") {
      // iOS — request on first user tap (silent if denied)
      const onTap = async () => {
        try {
          const perm = await DOE.requestPermission!();
          if (perm === "granted") start();
        } catch { /* denied — silent */ }
        document.removeEventListener("touchend", onTap);
      };
      document.addEventListener("touchend", onTap, { once: true });
      return () => {
        document.removeEventListener("touchend", onTap);
        stop();
      };
    } else {
      // Android / direct support
      start();
      return stop;
    }
  }, []);

  return tilt;
}

/* ───────── Hook: desktop mouse parallax
   - Returns { x, y } in -1..1 (rAF-throttled)
   - Listens only while enabled and on fine-pointer devices */
function useMouseParallax(enabled: boolean): { x: number; y: number } {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) { setPos({ x: 0, y: 0 }); return; }
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0, px = 0, py = 0;
    const onMove = (e: MouseEvent) => {
      px = (e.clientX / window.innerWidth)  * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(() => { setPos({ x: px, y: py }); raf = 0; });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return pos;
}

/* ───────── Letterbox — cinema bars that open once the projection starts
   Bars cover the iframe's white loading flash, then retract like a film reveal */
function Letterbox({ open, size }: { open: boolean; size: string }) {
  const bar: React.CSSProperties = {
    position: "absolute", left: 0, right: 0, height: size,
    background: "#000", zIndex: 30, pointerEvents: "none",
    transition: "transform 1.6s cubic-bezier(0.45,0,0.25,1) 0.4s",
  };
  return (
    <>
      <div aria-hidden="true" style={{ ...bar, top: 0,
        transformOrigin: "top", transform: open ? "scaleY(0)" : "scaleY(1)" }} />
      <div aria-hidden="true" style={{ ...bar, bottom: 0,
        transformOrigin: "bottom", transform: open ? "scaleY(0)" : "scaleY(1)" }} />
    </>
  );
}

/* Featured background video (YouTube embed muted+loop) */
const HERO_VIDEO_ID = "d9_EuYkmfzM"; // 愚人節 ALL FOOL'S DAY — Jon Chen
const HERO_VIDEO_START = 4;

/* Cinematic grade applied to the background video */
const HERO_GRADE = "brightness(0.48) contrast(1.06) saturate(0.9)";

/* Past roles / departments — listed on right side (desktop only) */
const PAST_ROLES = [
  "DIRECTOR",
  "DP",
  "SCREENPLAY",
  "COLOR",
  "EDITOR",
  "ART DEPT",
  "AIGC",
  "LIGHTING",
];

/* Mobile top-left categories — list of work types Oscar does */
const MOBILE_CATEGORIES = ["MV", "COMMERCIAL", "PHOTO", "AIGC"];

/* ───────── Helper: layered parallax style
   - Active: fast smooth entry
   - Inactive: 1.6-1.8s slow exit + delay + counter-scale to feel like a floating layer
*/
function layerStyle(loaded: boolean, isActive: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: loaded ? (isActive ? 1 : 0) : 0,
    transform: loaded
      ? (isActive ? "translateY(0) scale(1)" : "translateY(-10px) scale(1.08)")
      : "translateY(14px) scale(1)",
    transition: isActive
      ? `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}s, transform .9s cubic-bezier(.16,1,.3,1) ${delay}s`
      : `opacity 1.6s ease ${delay + 0.05}s, transform 1.6s cubic-bezier(.16,1,.3,1) ${delay + 0.05}s`,
    transformOrigin: "left center",
    willChange: "transform, opacity",
  };
}

/* ───────── Helper: count-up animation for stats
   - enabled: when true, start animation
   - startDelay: ms to wait before starting (lets you stagger when multiple counters exist)
   - duration: total animation time
   Eases out cubic so it slows toward the end (good for "settling" feel). */
function useCounter(target: number, duration: number, enabled: boolean, startDelay: number = 0): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) { setValue(0); return; }
    let raf = 0;
    let startTime: number | null = null;
    const delayTimer = setTimeout(() => {
      const tick = (t: number) => {
        if (startTime === null) startTime = t;
        const progress = Math.min(1, (t - startTime) / duration);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setValue(Math.round(target * eased));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);
    return () => {
      clearTimeout(delayTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, enabled, startDelay]);
  return value;
}

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

/* ════════════════════════════════════════════════
   MOBILE HERO — single column, designed for phone
   ════════════════════════════════════════════════ */
/* ───────── Hook: true video readiness
   iframeReady only mounts the iframe on a timer — YouTube may still be showing
   its loading chrome (title bar / spinner). Wait for the iframe's real onLoad,
   then give the player a beat to start rendering frames before we reveal it. */
function useVideoLive(iframeReady: boolean): { live: boolean; onIframeLoad: () => void } {
  const [live, setLive] = useState(false);
  const onIframeLoad = () => { setTimeout(() => setLive(true), 900); };
  useEffect(() => {
    if (!iframeReady) return;
    const fallback = setTimeout(() => setLive(true), 4000); // in case onLoad never fires
    return () => clearTimeout(fallback);
  }, [iframeReady]);
  return { live, onIframeLoad };
}

function HeroMobile({ loaded, iframeReady, isActive }: {
  loaded: boolean; iframeReady: boolean; isActive: boolean;
}) {
  const { live, onIframeLoad } = useVideoLive(iframeReady);
  // Counter values — start animating when loaded
  // reach (the hero number) intentionally starts 1.5s LATER and runs longer (4s)
  // so it's the very last element to settle — eye naturally lands on it
  const works    = useCounter(50,  1600, loaded);             // +50 productions
  const years    = useCounter(7,   1400, loaded);             // +7 years
  const reach    = useCounter(500, 4000, loaded, 1500);       // 500萬 — delayed start + slow climb

  // Tilt parallax — phone gyroscope produces subtle depth
  const tilt = useTilt();

  return (
    <section className="md:hidden relative w-full overflow-hidden bg-black" style={{ minHeight: "100dvh", height: "100dvh" }}>

      {/* Background video — TRUE FULL-BLEED cover (iframe sized so 16:9 always fills viewport, overflows on long axis) */}
      <div className="absolute inset-0 overflow-hidden" style={{
        opacity: live && isActive ? 1 : 0,
        transition: "opacity 1.4s ease",
        pointerEvents: "none",
      }}>
        {iframeReady && (
          <iframe
            onLoad={onIframeLoad}
            src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${HERO_VIDEO_ID}&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&fs=0&disablekb=1&start=${HERO_VIDEO_START}`}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              // Cover + tilt parallax: shift up to ±18px on each axis based on phone tilt
              transform: `translate(-50%, -50%) translate(${tilt.x * 18}px, ${tilt.y * 18}px)`,
              transition: "transform .4s cubic-bezier(.16,1,.3,1)",
              width: "max(100vw, calc(100dvh * 16 / 9))",
              height: "max(100dvh, calc(100vw * 9 / 16))",
              border: "none",
              filter: HERO_GRADE,
              willChange: "transform",
            }}
            allow="autoplay; encrypted-media"
            title="MINEH4O reel background"
          />
        )}
        {/* YouTube UI suppressor: covers bottom-right corner where YouTube logo / share menu can leak */}
        <div aria-hidden="true" style={{
          position: "absolute", right: 0, bottom: 0, width: 120, height: 80,
          background: "linear-gradient(225deg, #000 0%, rgba(0,0,0,0.85) 50%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Cinema bars — open once the projection starts */}
      <Letterbox open={loaded && live} size="8vh" />

      {/* Gradients — top/bottom only (vignette removed per user, was too dark) */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-36"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-72"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.55) 30%, #000 100%)" }} />

      {/* Content stack — text shifts OPPOSITE to bg for parallax depth */}
      <div className="relative h-full w-full flex flex-col px-5" style={{
        paddingTop: "3.5rem", paddingBottom: "2rem",
        transform: `translate(${tilt.x * -6}px, ${tilt.y * -6}px)`,
        transition: "transform .4s cubic-bezier(.16,1,.3,1)",
        willChange: "transform",
      }}>

        {/* Top: single-line categories — smaller + tighter for cleaner look */}
        <div className="flex items-center gap-1.5" style={layerStyle(loaded, isActive, 0.1)}>
          <DiagLine width={12} rotation={20} color="rgba(255,255,255,0.35)" />
          <span className="text-[8px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
            {MOBILE_CATEGORIES.join(" · ")}
          </span>
        </div>

        {/* Center hero — LEFT-aligned (original) + parallax "layer" feel on page transition */}
        <div className="flex-1 flex flex-col justify-center relative">

          {/* DIRECTOR + RED REC DOT to its right */}
          <div className="flex items-center gap-3" style={layerStyle(loaded, isActive, 0.2)}>
            <h2 className="hero-title text-white"
              style={{
                fontSize: "clamp(2.4rem, 11vw, 4rem)",
                lineHeight: 1,
              }}>
              DIRECTOR
            </h2>
            {/* Pulsing red REC dot — moved from top-right per user */}
            <div className="flex items-center gap-1.5">
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "rgba(220,50,50,0.9)",
                boxShadow: "0 0 12px rgba(220,50,50,0.6)",
                animation: "pulse-slow 1.8s ease-in-out infinite",
              }} />
              <span className="text-[8px] uppercase tracking-[0.32em]"
                style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
                2026
              </span>
            </div>
          </div>

          {/* OSCAR — layer parallax (more dramatic) */}
          <h1 className="hero-title text-white"
            style={{
              fontSize: "clamp(5rem, 26vw, 9rem)",
              lineHeight: 0.92,
              letterSpacing: "0.02em",
              marginTop: "0.4rem",
              ...layerStyle(loaded, isActive, 0.3),
              transform: loaded
                ? (isActive ? "translateY(0) scale(1)" : "translateY(-16px) scale(1.12)")
                : "translateY(20px) scale(1)",
            }}>
            OSCAR
          </h1>

          {/* Tiny 「臺中」 stamp — small, under OSCAR */}
          <div className="mt-3 inline-flex items-center gap-1.5"
            style={layerStyle(loaded, isActive, 0.5)}>
            <span style={{
              fontFamily: "var(--font-geist-sans), 'PingFang TC', sans-serif",
              fontSize: 13, fontWeight: 400,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.7)",
            }}>
              臺中
            </span>
          </div>

          {/* Stats — 3-col grid with count-up animated numbers + clear labels below */}
          <div className="mt-7 grid grid-cols-3 gap-2"
            style={{ ...layerStyle(loaded, isActive, 0.7), maxWidth: 320 }}>
            <div className="flex flex-col">
              <span className="hero-title text-white" style={{ fontSize: "clamp(1.5rem, 6.5vw, 2.4rem)" }}>
                {reach}萬+
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                月觀看高峰
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-r"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <span className="hero-title text-white" style={{ fontSize: "clamp(1.5rem, 6.5vw, 2.4rem)" }}>
                +{works}
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                PRODUCTIONS
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="hero-title text-white" style={{ fontSize: "clamp(1.5rem, 6.5vw, 2.4rem)" }}>
                +{years}
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                YEARS ON SET
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: extra spacing between info row and CTA — layer parallax */}
        <div className="flex flex-col gap-5"
          style={layerStyle(loaded, isActive, 0.95)}>
          {/* Info row — handle left only (SCROLL removed: redundant + caused overlap with YT UI bottom-right) */}
          <div className="flex items-center justify-between">
            <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
              @MINEHOOOO.ARW ↗
            </a>
          </div>

          {/* CTA — bigger touch target + more opaque white (frosted but visible) */}
          <button onClick={() => { haptic.tap(); goto(6); }}
            className="active:scale-[0.96] transition-all uppercase mx-auto relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.28)",
              backdropFilter: "blur(28px) saturate(1.6)",
              WebkitBackdropFilter: "blur(28px) saturate(1.6)",
              color: "#fff",
              fontSize: 11, fontWeight: 600,
              letterSpacing: "0.22em",
              borderRadius: 999,
              padding: "12px 28px",
              border: "1px solid rgba(255,255,255,0.45)",
              cursor: "pointer",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 24px rgba(0,0,0,0.35)",
            }}>
            {/* Granular noise overlay for frosted-glass texture */}
            <span aria-hidden="true" style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
              backgroundSize: "140px 140px",
              opacity: 0.35,
              mixBlendMode: "overlay",
              borderRadius: 999,
            }} />
            <span className="relative">LET&apos;S WORK →</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════
   DESKTOP HERO — original editorial composition
   ════════════════════════════════════════════════ */
function HeroDesktop({ loaded, iframeReady, isActive }: {
  loaded: boolean; iframeReady: boolean; isActive: boolean;
}) {
  // Mouse parallax — video drifts with the cursor, content counter-drifts for depth
  const m = useMouseParallax(isActive);
  const { live, onIframeLoad } = useVideoLive(iframeReady);

  return (
    <section className="hidden md:block relative h-screen w-full overflow-hidden bg-black">

      {/* Fullscreen background — YouTube iframe muted loop */}
      <div className="absolute inset-0" style={{
        opacity: live && isActive ? 1 : 0,
        transition: "opacity 1.4s ease",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", inset: "-8%", width: "116%", height: "116%",
          transform: `translate(${m.x * 14}px, ${m.y * 14}px)`,
          transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}>
          {iframeReady && (
            <iframe
              onLoad={onIframeLoad}
              src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${HERO_VIDEO_ID}&rel=0&modestbranding=1&playsinline=1&start=${HERO_VIDEO_START}`}
              style={{ width: "100%", height: "100%", border: "none", filter: HERO_GRADE }}
              allow="autoplay; encrypted-media"
              title="MINEH4O reel background"
            />
          )}
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-72"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.5) 35%, #000 100%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-44"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 38%, rgba(0,0,0,0.5) 100%)" }} />

      <div aria-hidden="true" className="absolute pointer-events-none"
        style={{ left: "46%", top: "8%", opacity: loaded ? 0.55 : 0, transition: "opacity 1.4s ease .5s" }}>
        <DiagLine width={160} rotation={-20} />
      </div>
      <div aria-hidden="true" className="absolute pointer-events-none"
        style={{ left: "30%", bottom: "26%", opacity: loaded ? 0.45 : 0, transition: "opacity 1.4s ease .9s" }}>
        <DiagLine width={200} rotation={-20} color="rgba(255,255,255,0.22)" />
      </div>

      {/* Cinema bars — open once the projection starts */}
      <Letterbox open={loaded && live} size="11vh" />

      <div className="relative h-full w-full" style={{
        transform: `translate(${m.x * -6}px, ${m.y * -6}px)`,
        transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
      }}>

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

        <div className="absolute z-[8] flex flex-col items-end gap-1.5"
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
              500萬+
            </span>
          </div>
          <p className="text-[10px] mt-1 text-right uppercase tracking-[0.24em]"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            月觀看高峰 · PEAK MONTHLY
          </p>
        </div>

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
          <p className="text-[10px] mt-2 text-right uppercase tracking-[0.24em]"
            style={{ color: "rgba(255,225,140,0.75)", fontWeight: 500 }}>
            THREADS 5.7M · 90-DAY REACH
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-[9] px-10 pb-4 flex items-end justify-between gap-4"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.05s" }}>

          <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
            className="text-[11px] hover:text-white transition-colors uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
            @MINEHOOOO.ARW ↗
          </a>

          <button onClick={() => goto(1)}
            className="flex flex-col items-center gap-1.5 group"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Scroll to About">
            <span className="text-[9px] tracking-[0.4em] uppercase group-hover:text-white/85 transition-colors" style={{ color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
              SCROLL
            </span>
            <div style={{ width: 1, height: 30, background: "rgba(255,255,255,0.25)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.85)", animation: "slideDown 1.6s ease-in-out infinite" }} />
            </div>
          </button>

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

/* ════════════════════════════════════════════════
   HERO — switch by viewport
   ════════════════════════════════════════════════ */
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
    <>
      <HeroMobile  loaded={loaded} iframeReady={iframeReady} isActive={isActive} />
      <HeroDesktop loaded={loaded} iframeReady={iframeReady} isActive={isActive} />
    </>
  );
}
