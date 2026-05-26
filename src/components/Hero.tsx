"use client";

import { useEffect, useState } from "react";

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

/* Mottos / quotes — rotated randomly, shown briefly on mobile first entry */
const QUOTES = [
  { lines: ["人一定是", "在作品之前"], attr: null },
  { lines: ["莽撞的開始，拙劣的完成", "好過心懷完美", "不開始行動"], attr: null },
  { lines: ["停止對他們仰慕吧", "一天就好，只想著勝利", "衝吧"], attr: "— 大谷翔平" },
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

/* ════════════════════════════════════════════════
   MOBILE HERO — single column, designed for phone
   ════════════════════════════════════════════════ */
function HeroMobile({ loaded, iframeReady, isActive }: {
  loaded: boolean; iframeReady: boolean; isActive: boolean;
}) {
  // Pick a random quote once + auto-hide after 6s so it only shows on first entry
  const [quoteIdx]      = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [quoteVisible, setQuoteVisible] = useState(false);
  const q = QUOTES[quoteIdx];

  useEffect(() => {
    if (!loaded) return;
    const t1 = setTimeout(() => setQuoteVisible(true),  400);   // fade in
    const t2 = setTimeout(() => setQuoteVisible(false), 6500);  // fade out
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [loaded]);

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
              transform: "translate(-50%, -50%)",
              // Cover behavior: max of (100vw, 16:9-of-height) wins; same for height
              width: "max(100vw, calc(100dvh * 16 / 9))",
              height: "max(100dvh, calc(100vw * 9 / 16))",
              border: "none",
              filter: "brightness(0.5) saturate(0.95)",
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

      {/* Content stack */}
      <div className="relative h-full w-full flex flex-col px-5" style={{ paddingTop: "5rem", paddingBottom: "2rem" }}>

        {/* Top section — left fills with intro, right has a small badge */}
        <div className="flex items-start justify-between gap-3"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity .7s ease .1s, transform .7s ease .1s",
          }}>
          {/* Left: intro label + 2nd line */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <DiagLine width={22} rotation={20} color="rgba(255,255,255,0.5)" />
              <span className="text-[9px] uppercase tracking-[0.36em]" style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                IN-HOUSE IMAGE STUDIO
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.32em] pl-7" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>
              MV · COMMERCIAL · PHOTO · AIGC
            </span>
          </div>
          {/* Right: small REC badge */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(220,50,50,0.85)", boxShadow: "0 0 8px rgba(220,50,50,0.5)", animation: "pulse-slow 1.8s ease-in-out infinite" }} />
            <span className="text-[8px] uppercase tracking-[0.32em]" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
              REC · 2026
            </span>
          </div>
        </div>

        {/* Center hero — LEFT-aligned (original) + parallax "layer" feel on page transition */}
        <div className="flex-1 flex flex-col justify-center relative">

          {/* DIRECTOR — left aligned */}
          <h2 className="hero-title text-white"
            style={{
              fontSize: "clamp(2.4rem, 11vw, 4rem)",
              lineHeight: 1,
              // Layer parallax: while parent page scales away during transition,
              // counter-scale ourselves so visually the text "stays in place".
              opacity: loaded ? (isActive ? 1 : 0) : 0,
              transform: loaded
                ? (isActive ? "translateY(0) scale(1)" : "translateY(-12px) scale(1.10)")
                : "translateY(20px) scale(1)",
              transition: isActive
                ? "opacity .9s cubic-bezier(.16,1,.3,1) .2s, transform .9s cubic-bezier(.16,1,.3,1) .2s"
                : "opacity 1.6s ease .35s, transform 1.6s cubic-bezier(.16,1,.3,1) .35s",
              transformOrigin: "left center",
              willChange: "transform, opacity",
            }}>
            DIRECTOR
          </h2>

          {/* OSCAR — left aligned, big (original 26vw) */}
          <h1 className="hero-title text-white"
            style={{
              fontSize: "clamp(5rem, 26vw, 9rem)",
              lineHeight: 0.92,
              letterSpacing: "0.02em",
              marginTop: "0.4rem",
              // Same layer parallax — text lingers as page recedes
              opacity: loaded ? (isActive ? 1 : 0) : 0,
              transform: loaded
                ? (isActive ? "translateY(0) scale(1)" : "translateY(-16px) scale(1.12)")
                : "translateY(20px) scale(1)",
              transition: isActive
                ? "opacity 1s cubic-bezier(.16,1,.3,1) .3s, transform 1s cubic-bezier(.16,1,.3,1) .3s"
                : "opacity 1.8s ease .4s, transform 1.8s cubic-bezier(.16,1,.3,1) .4s",
              transformOrigin: "left center",
              willChange: "transform, opacity",
            }}>
            OSCAR
          </h1>

          {/* Role inline — left aligned (matches DIRECTOR) */}
          <div className="flex items-center gap-2 mt-5"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(10px)",
              transition: "opacity .7s ease .45s, transform .7s ease .45s",
            }}>
            <div style={{ width: 6, height: 6, background: "#fff", borderRadius: 999, boxShadow: "0 0 12px rgba(255,255,255,0.7)" }} />
            <span className="text-[11px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
              {PAST_ROLES.slice(0, 3).join(" · ")}
            </span>
          </div>

          {/* QUOTE overlay — shows once on first entry, fades out after 6s. Right side, doesn't block OSCAR */}
          <div aria-hidden={!quoteVisible}
            className="absolute pointer-events-none"
            style={{
              right: 0, top: "-2rem",
              maxWidth: 200,
              opacity: quoteVisible ? 1 : 0,
              transform: quoteVisible ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 1.2s ease, transform 1.2s ease",
              textAlign: "right",
            }}>
            <div className="flex flex-col items-end gap-0.5"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "10px 14px",
              }}>
              {q.lines.map((line, i) => (
                <span key={i} style={{
                  fontFamily: "var(--font-geist-sans), 'PingFang TC', 'Noto Sans TC', sans-serif",
                  fontSize: 11, fontWeight: 300, lineHeight: 1.55,
                  letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.88)",
                  whiteSpace: "nowrap",
                }}>
                  {line}
                </span>
              ))}
              {q.attr && (
                <span style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: 8, letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 4,
                }}>
                  {q.attr}
                </span>
              )}
            </div>
          </div>

          {/* Tagline */}
          <p className="mt-6 leading-relaxed"
            style={{
              fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 300,
              maxWidth: 280,
              opacity: loaded ? 1 : 0,
              transition: "opacity .8s ease .6s",
            }}>
            台中在地影像工作者。<br/>從現場到後製，做能說話的畫面。
          </p>

          {/* Stats — pushed to bottom of center area, separated */}
          <div className="mt-8 flex items-center gap-2 flex-wrap"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity .8s ease .72s",
            }}>
            <span className="hero-title text-white" style={{ fontSize: "clamp(1.5rem, 6vw, 2.2rem)" }}>+150K</span>
            <span className="text-[10px] uppercase tracking-[0.22em] mr-2" style={{ color: "rgba(255,255,255,0.55)" }}>VIEWS</span>
            <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.25)" }} />
            <span className="hero-title text-white ml-2" style={{ fontSize: "clamp(1.5rem, 6vw, 2.2rem)" }}>+50</span>
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.55)" }}>WORKS</span>
            <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.25)" }} />
            <span className="hero-title text-white ml-2" style={{ fontSize: "clamp(1.5rem, 6vw, 2.2rem)" }}>+7YR</span>
          </div>

          {/* TAICHUNG anchor */}
          <p className="mt-3 text-[10px] uppercase tracking-[0.32em]"
            style={{
              color: "rgba(255,255,255,0.55)", fontWeight: 500,
              opacity: loaded ? 1 : 0,
              transition: "opacity .8s ease .82s",
            }}>
            FROM TAICHUNG · SINCE 2019
          </p>
        </div>

        {/* Bottom: extra spacing between info row and CTA */}
        <div className="flex flex-col gap-5"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(14px)",
            transition: "opacity .9s ease .95s, transform .9s ease .95s",
          }}>
          {/* Info row — handle left only (SCROLL removed: redundant + caused overlap with YT UI bottom-right) */}
          <div className="flex items-center justify-between">
            <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
              @MINEHOOOO.ARW ↗
            </a>
          </div>

          {/* CTA — bigger touch target + more opaque white (frosted but visible) */}
          <button onClick={() => goto(6)}
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
