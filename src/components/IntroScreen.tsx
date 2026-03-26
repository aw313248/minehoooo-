"use client";

import { useState, useEffect, useRef } from "react";

const QUOTES = [
  {
    lines: ["人一定是", "在作品之前"],
    attr: null,
    duration: 3200,
  },
  {
    lines: ["莽撞的開始，拙劣的完成", "好過心懷完美", "不開始行動"],
    attr: null,
    duration: 4000,
  },
  {
    lines: ["停止對他們仰慕吧", "一天就好，只想著勝利", "衝吧"],
    attr: "— 大谷翔平",
    duration: 4200,
  },
];

export default function IntroScreen() {
  const [phase, setPhase]     = useState<"idle" | "in" | "hold" | "out" | "done">("idle");
  const [quoteIdx, setQuoteIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const quote = QUOTES[quoteIdx];

  const dismiss = () => {
    if (phase === "done" || phase === "out") return;
    timerRef.current.forEach(clearTimeout);
    setPhase("out");
    const t = setTimeout(() => setPhase("done"), 900);
    timerRef.current.push(t);
  };

  useEffect(() => {
    // Only show once per browser session
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("intro-v1")) {
      setPhase("done");
      return;
    }
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("intro-v1", "1");
    }

    const idx = Math.floor(Math.random() * QUOTES.length);
    setQuoteIdx(idx);

    const dur = QUOTES[idx].duration;

    const t1 = setTimeout(() => setPhase("in"),   80);
    const t2 = setTimeout(() => setPhase("hold"),  dur - 900);
    const t3 = setTimeout(() => setPhase("out"),   dur);
    const t4 = setTimeout(() => setPhase("done"),  dur + 900);
    timerRef.current = [t1, t2, t3, t4];

    return () => timerRef.current.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "done") return null;

  const isIn   = phase === "in" || phase === "hold";
  const isOut  = phase === "out";
  const totalDur = quote.duration;

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999999,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: isOut ? 0 : 1,
        transform: isOut ? "translateY(-14px) scale(0.99)" : "translateY(0) scale(1)",
        transition: isOut ? "opacity 0.88s ease, transform 0.88s cubic-bezier(0.16,1,0.3,1)" : "none",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "160px 160px", opacity: 0.09, mixBlendMode: "screen",
      }} />

      {/* Top-left brand */}
      <div style={{
        position: "absolute", top: "2rem", left: "2.5rem",
        opacity: isIn ? 1 : 0,
        transition: "opacity 0.8s ease 0.1s",
      }}>
        <p style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: 8, letterSpacing: "0.5em", color: "rgba(255,255,255,0.25)",
        }}>
          MINEH4O
        </p>
      </div>

      {/* Quote block */}
      <div style={{
        textAlign: "center",
        padding: "0 2rem",
        maxWidth: 700,
        width: "100%",
      }}>
        {quote.lines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden", marginBottom: "0.3rem" }}>
            <p style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 8rem)",
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "0.025em",
              lineHeight: 1,
              opacity: isIn ? 1 : 0,
              transform: isIn ? "translateY(0) skewY(0deg)" : "translateY(50%) skewY(3deg)",
              filter: isIn ? "blur(0px)" : "blur(6px)",
              transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.22}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.22}s, filter 0.85s ease ${0.1 + i * 0.22}s`,
            }}>
              {line}
            </p>
          </div>
        ))}

        {/* Attribution */}
        {quote.attr && (
          <p style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.28)",
            marginTop: "1.5rem",
            opacity: isIn ? 1 : 0,
            transition: `opacity 0.9s ease ${0.1 + quote.lines.length * 0.22 + 0.3}s`,
          }}>
            {quote.attr}
          </p>
        )}
      </div>

      {/* Thin horizontal separator line */}
      <div style={{
        position: "absolute",
        bottom: "4rem",
        left: "2.5rem",
        right: "2.5rem",
        height: 1,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}>
        {/* Progress */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(255,255,255,0.3)",
          transformOrigin: "left",
          transform: isIn ? "scaleX(1)" : "scaleX(0)",
          transition: isIn ? `transform ${totalDur}ms linear` : "none",
        }} />
      </div>

      {/* Skip hint */}
      <div style={{
        position: "absolute", bottom: "1.5rem", right: "2.5rem",
        opacity: isIn ? 1 : 0,
        transition: "opacity 0.8s ease 0.6s",
      }}>
        <p style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: 7, letterSpacing: "0.4em", color: "rgba(255,255,255,0.18)",
        }}>
          TAP TO SKIP
        </p>
      </div>
    </div>
  );
}
