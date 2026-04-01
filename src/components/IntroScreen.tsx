"use client";

import { useState, useEffect, useRef } from "react";

const QUOTES = [
  {
    lines: ["人一定是", "在作品之前"],
    attr: null,
    duration: 3400,
  },
  {
    lines: ["莽撞的開始，拙劣的完成", "好過心懷完美", "不開始行動"],
    attr: null,
    duration: 4400,
  },
  {
    lines: ["停止對他們仰慕吧", "一天就好，只想著勝利", "衝吧"],
    attr: "— 大谷翔平",
    duration: 4600,
  },
];

export default function IntroScreen() {
  const [phase, setPhase] = useState<"idle" | "open" | "in" | "hold" | "out" | "done">("idle");
  const [quoteIdx, setQuoteIdx] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const q = QUOTES[quoteIdx];

  const dismiss = () => {
    if (phase === "out" || phase === "done") return;
    timers.current.forEach(clearTimeout);
    setPhase("out");
    timers.current.push(setTimeout(() => setPhase("done"), 750));
  };

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("intro-v2")) {
      setPhase("done");
      return;
    }
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("intro-v2", "1");

    const idx = Math.floor(Math.random() * QUOTES.length);
    setQuoteIdx(idx);
    const dur = QUOTES[idx].duration;

    const t = [
      setTimeout(() => setPhase("open"), 40),
      setTimeout(() => setPhase("in"),   700),
      setTimeout(() => setPhase("hold"), dur - 750),
      setTimeout(() => setPhase("out"),  dur),
      setTimeout(() => setPhase("done"), dur + 750),
    ];
    timers.current = t;
    return () => t.forEach(clearTimeout);
  }, []);

  if (phase === "done") return null;

  const isOpen = phase === "open" || phase === "in" || phase === "hold";
  const isIn   = phase === "in"   || phase === "hold";
  const isOut  = phase === "out";

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        /* Letterbox cinematic reveal — collapses to horizontal sliver, then expands */
        clipPath: isOpen ? "inset(0% 0% 0% 0%)" : "inset(49% 0% 49% 0%)",
        opacity: isOut ? 0 : 1,
        transform: isOut ? "scale(1.018)" : "scale(1)",
        transition: isOut
          ? "opacity 0.7s ease, transform 0.7s ease"
          : isOpen
          ? "clip-path 0.65s cubic-bezier(0.16,1,0.3,1)"
          : "none",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* ── Edge vignette ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
      }} />

      {/* ── Grain texture ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "160px 160px",
        opacity: 0.14,
        mixBlendMode: "screen",
      }} />

      {/* ── Top bar: brand + counter ── */}
      <div style={{
        position: "absolute", top: "2.5rem",
        left: "2.5rem", right: "2.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        opacity: isIn ? 1 : 0,
        transition: "opacity 0.8s ease 0.1s",
      }}>
        <p style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: 8, letterSpacing: "0.5em",
          color: "rgba(255,255,255,0.28)",
        }}>
          MINEH4O
        </p>
        <p style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: 8, letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.18)",
        }}>
          {String(quoteIdx + 1).padStart(2, "0")} · {String(QUOTES.length).padStart(2, "0")}
        </p>
      </div>

      {/* ── Quote block ── */}
      <div style={{
        textAlign: "center",
        maxWidth: 540,
        width: "100%",
        padding: "0 2.5rem",
      }}>

        {/* Top rule — expands left-to-right */}
        <div style={{
          height: 1,
          background: "rgba(255,255,255,0.1)",
          transformOrigin: "left",
          transform: isIn ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.05s",
          marginBottom: "2.8rem",
        }} />

        {/* Quote lines — hierarchy: setup lines small+faded, last line large+bright */}
        {q.lines.map((line, i) => {
          const isLast = i === q.lines.length - 1;
          return (
            <div key={i} style={{ overflow: "hidden", marginBottom: isLast ? 0 : "1.1rem" }}>
              <p style={{
                fontFamily: isLast
                  ? "var(--font-bebas), sans-serif"
                  : "var(--font-geist-sans), 'PingFang TC', sans-serif",
                fontSize: isLast
                  ? "clamp(2.2rem, 5.5vw, 4.4rem)"
                  : "clamp(1.2rem, 3vw, 1.9rem)",
                fontWeight: isLast ? 400 : 300,
                color: isLast ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
                letterSpacing: isLast ? "0.05em" : "0.12em",
                lineHeight: isLast ? 1.0 : 1.6,
                textAlign: "left",
                opacity: isIn ? 1 : 0,
                transform: isIn ? "translateY(0) skewY(0deg)" : "translateY(70%) skewY(2deg)",
                filter: isIn ? "blur(0px)" : "blur(4px)",
                transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.18}s,
                             transform 0.85s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.18}s,
                             filter 0.7s ease ${0.08 + i * 0.18}s`,
              }}>
                {line}
              </p>
            </div>
          );
        })}

        {/* Attribution */}
        {q.attr && (
          <div style={{ overflow: "hidden", marginTop: "1.4rem" }}>
            <p style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.28)",
              opacity: isIn ? 1 : 0,
              transform: isIn ? "translateY(0)" : "translateY(100%)",
              transition: `opacity 0.8s ease ${0.1 + q.lines.length * 0.16 + 0.22}s,
                           transform 0.8s ease ${0.1 + q.lines.length * 0.16 + 0.22}s`,
            }}>
              {q.attr}
            </p>
          </div>
        )}

        {/* Bottom rule */}
        <div style={{
          height: 1,
          background: "rgba(255,255,255,0.07)",
          transformOrigin: "right",
          transform: isIn ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s",
          marginTop: "2.8rem",
        }} />
      </div>

      {/* ── Bottom: progress + skip ── */}
      <div style={{
        position: "absolute",
        bottom: "2.5rem",
        left: "2.5rem",
        right: "2.5rem",
      }}>
        {/* Progress bar */}
        <div style={{
          height: 1,
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
          marginBottom: "0.75rem",
        }}>
          <div style={{
            height: "100%",
            background: "rgba(255,255,255,0.35)",
            transformOrigin: "left",
            transform: isIn ? "scaleX(1)" : "scaleX(0)",
            transition: isIn ? `transform ${q.duration}ms linear` : "none",
          }} />
        </div>

        {/* Skip hint */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          opacity: isIn ? 1 : 0,
          transition: "opacity 0.8s ease 0.55s",
        }}>
          <p style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 7, letterSpacing: "0.38em",
            color: "rgba(255,255,255,0.18)",
          }}>
            CLICK TO SKIP
          </p>
        </div>
      </div>
    </div>
  );
}
