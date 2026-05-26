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

/* Featured background video (YouTube embed muted+loop) */
const HERO_VIDEO_ID = "d9_EuYkmfzM"; // 愚人節 ALL FOOL'S DAY — Jon Chen
const HERO_VIDEO_START = 4;

/* Past roles / departments — listed on right side (desktop only) */
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
   Starts when `enabled` (loaded) becomes true. Eases out cubic. */
function useCounter(target: number, duration: number, enabled: boolean): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) { setValue(0); return; }
    let raf = 0;
    let startTime: number | null = null;
    const tick = (t: number) => {
      if (startTime === null) startTime = t;
      const progress = Math.min(1, (t - startTime) / duration);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, enabled]);
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
function HeroMobile({ loaded, iframeReady, isActive }: {
  loaded: boolean; iframeReady: boolean; isActive: boolean;
}) {
  // Counter values — start animating when loaded
  const views    = useCounter(150, 1800, loaded);   // +150K views
  const works    = useCounter(50,  1600, loaded);   // +50 productions
  const years    = useCounter(7,   1400, loaded);   // +7 years

  // Tilt parallax — phone gyroscope produces subtle depth
  const tilt = useTilt();

  return (
    <section className="md:hidden relative w-full overflow-hidden bg-black" style={{ minHeight: "100dvh", height: "100dvh" }}>

      {/* Background video — TRUE FULL-BLEED cover (iframe sized so 16:9 always fills viewport, overflows on long axis) */}
      <div className="absolute inset-0 overflow-hidden" style={{
        opacity: iframeReady && isActive ? 1 : 0,
        transition: "opacity 1.4s ease",
        pointerEvents: "none",
      }}>
        {iframeReady && (
          <iframe
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
              filter: "brightness(0.5) saturate(0.95)",
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

      {/* Gradients — stronger top/bottom for legibility on smaller screen */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-36"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-72"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6) 30%, #000 100%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 75% 50% at 50% 50%, transparent 50%, rgba(0,0,0,0.55) 100%)" }} />

      {/* Content stack — text shifts OPPOSITE to bg for parallax depth */}
      <div className="relative h-full w-full flex flex-col px-5" style={{
        paddingTop: "3.5rem", paddingBottom: "2rem",
        transform: `translate(${tilt.x * -6}px, ${tilt.y * -6}px)`,
        transition: "transform .4s cubic-bezier(.16,1,.3,1)",
        willChange: "transform",
      }}>

        {/* Top section — left categories list, right small REC badge — both with layer parallax */}
        <div className="flex items-start justify-between gap-3">
          {/* Left: 4 categories stacked vertically */}
          <div className="flex flex-col gap-1.5" style={layerStyle(loaded, isActive, 0.1)}>
            {MOBILE_CATEGORIES.map((cat, i) => (
              <div key={cat} className="flex items-center gap-2">
                <DiagLine width={i === 0 ? 16 : 8} rotation={20} color="rgba(255,255,255,0.4)" />
                <span className="text-[9px] uppercase tracking-[0.32em]"
                  style={{ color: i === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)", fontWeight: 500 }}>
                  {cat}
                </span>
              </div>
            ))}
          </div>
          {/* Right: small REC badge */}
          <div className="flex items-center gap-1.5 mt-0.5" style={layerStyle(loaded, isActive, 0.15)}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(220,50,50,0.85)", boxShadow: "0 0 8px rgba(220,50,50,0.5)", animation: "pulse-slow 1.8s ease-in-out infinite" }} />
            <span className="text-[8px] uppercase tracking-[0.32em]" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
              REC · 2026
            </span>
          </div>
        </div>

        {/* Center hero — LEFT-aligned (original) + parallax "layer" feel on page transition */}
        <div className="flex-1 flex flex-col justify-center relative">

          {/* DIRECTOR — layer parallax */}
          <h2 className="hero-title text-white"
            style={{
              fontSize: "clamp(2.4rem, 11vw, 4rem)",
              lineHeight: 1,
              ...layerStyle(loaded, isActive, 0.2),
            }}>
            DIRECTOR
          </h2>

          {/* OSCAR — layer parallax (more dramatic) */}
          <h1 className="hero-title text-white"
            style={{
              fontSize: "clamp(5rem, 26vw, 9rem)",
              lineHeight: 0.92,
              letterSpacing: "0.02em",
              marginTop: "0.4rem",
              ...layerStyle(loaded, isActive, 0.3),
              // Override scale for stronger drift on OSCAR
              transform: loaded
                ? (isActive ? "translateY(0) scale(1)" : "translateY(-16px) scale(1.12)")
                : "translateY(20px) scale(1)",
            }}>
            OSCAR
          </h1>

          {/* Role inline — layer parallax */}
          <div className="flex items-center gap-2 mt-5"
            style={layerStyle(loaded, isActive, 0.45)}>
            <div style={{ width: 6, height: 6, background: "#fff", borderRadius: 999, boxShadow: "0 0 12px rgba(255,255,255,0.7)" }} />
            <span className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
              {PAST_ROLES.slice(0, 3).join(" · ")}
            </span>
          </div>

          {/* Tagline — layer parallax */}
          <p className="mt-6 leading-relaxed"
            style={{
              fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 300,
              maxWidth: 280,
              ...layerStyle(loaded, isActive, 0.55),
            }}>
            台中在地影像工作者。<br/>從現場到後製，做能說話的畫面。
          </p>

          {/* Stats — 3-col grid with count-up animated numbers + clear labels below */}
          <div className="mt-8 grid grid-cols-3 gap-2"
            style={{ ...layerStyle(loaded, isActive, 0.7), maxWidth: 320 }}>
            <div className="flex flex-col">
              <span className="hero-title text-white" style={{ fontSize: "clamp(1.5rem, 6.5vw, 2.4rem)" }}>
                +{views}K
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                VIEWS
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

          {/* TAICHUNG anchor — layer parallax */}
          <p className="mt-4 text-[10px] uppercase tracking-[0.32em]"
            style={{
              color: "rgba(255,255,255,0.55)", fontWeight: 500,
              ...layerStyle(loaded, isActive, 0.82),
            }}>
            FROM TAICHUNG · SINCE 2019
          </p>
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
  return (
    <section className="hidden md:block relative h-screen w-full overflow-hidden bg-black">

      {/* Fullscreen background — YouTube iframe muted loop */}
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

      <div className="relative h-full w-full">

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
              +150K
            </span>
          </div>
          <p className="text-[10px] mt-1 text-right uppercase tracking-[0.24em]"
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
            VIEWS
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
