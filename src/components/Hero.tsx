"use client";

import { useEffect, useState } from "react";
import { CharReveal } from "@/components/WordReveal";

const V_LABELS     = ["Visual Production", "Creative Direction", "AIGC Creation"];
const TAGLINE      = ["Director", "·", "DP", "·", "Screenplay", "·", "Photography"];
const CATEGORIES   = [
  { en: "Photography", zh: "攝影" },
  { en: "Video",       zh: "影片" },
  { en: "AIGC",        zh: "AIGC 創作" },
];

const QUOTES = [
  { lines: ["人一定是", "在作品之前"], attr: null },
  { lines: ["莽撞的開始，拙劣的完成", "好過心懷完美", "不開始行動"], attr: null },
  { lines: ["停止對他們仰慕吧", "一天就好，只想著勝利", "衝吧"], attr: "— 大谷翔平" },
];

/* ─── Cinematic frame corner ─── */
function CornerBracket({ pos, delay, loaded }: { pos: "tl"|"tr"|"bl"|"br"; delay: number; loaded: boolean }) {
  const t = pos.startsWith("t") ? "1.8rem" : undefined;
  const b = pos.startsWith("b") ? "5.2rem" : undefined;
  const l = pos.endsWith("l") ? "1.8rem" : undefined;
  const r = pos.endsWith("r") ? "1.8rem" : undefined;
  const c = "rgba(255,255,255,0.8)";
  return (
    <div className="absolute pointer-events-none hidden md:block"
      style={{ top: t, bottom: b, left: l, right: r, width: 26, height: 26,
        opacity: loaded ? 0.25 : 0, transition: `opacity 1.2s ease ${delay}s` }}>
      {/* Horizontal arm */}
      <div style={{ position: "absolute", [pos.endsWith("l") ? "left" : "right"]: 0, [pos.startsWith("t") ? "top" : "bottom"]: 0, width: "100%", height: 1, background: c }} />
      {/* Vertical arm */}
      <div style={{ position: "absolute", [pos.endsWith("l") ? "left" : "right"]: 0, [pos.startsWith("t") ? "top" : "bottom"]: 0, width: 1, height: "100%", background: c }} />
    </div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [quoteHover, setQuoteHover] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const q = QUOTES[quoteIdx];

  useEffect(() => {
    setQuoteIdx(Math.floor(Math.random() * QUOTES.length));
    const t = setTimeout(() => setLoaded(true), 180);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#000" }}>

      {/* ── Ambient floating orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", top: "8%", right: "18%",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(80,100,160,0.055) 0%, transparent 65%)",
          animation: "float 22s ease-in-out infinite",
          willChange: "transform",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", left: "12%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(60,60,90,0.07) 0%, transparent 65%)",
          animation: "float 30s ease-in-out infinite reverse",
          willChange: "transform",
        }} />
        <div style={{
          position: "absolute", top: "45%", left: "50%",
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,80,160,0.04) 0%, transparent 65%)",
          animation: "float 18s ease-in-out 4s infinite",
          willChange: "transform",
        }} />
      </div>

      {/* ── Large "2026" background watermark ── */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden">
        <span className="font-display select-none"
          style={{
            fontSize: "clamp(20rem, 68vw, 96rem)",
            color: "rgba(255,255,255,0.016)",
            letterSpacing: "0.02em",
            lineHeight: 1,
            paddingRight: "2%",
            userSelect: "none",
          }}>
          2026
        </span>
      </div>

      {/* ── Cinematic corner brackets ── */}
      {/* Top-left */}
      <CornerBracket pos="tl" delay={0.4} loaded={loaded} />
      {/* Top-right */}
      <CornerBracket pos="tr" delay={0.5} loaded={loaded} />
      {/* Bottom-left */}
      <CornerBracket pos="bl" delay={0.6} loaded={loaded} />
      {/* Bottom-right */}
      <CornerBracket pos="br" delay={0.7} loaded={loaded} />

      {/* ── REC indicator (top right) ── */}
      <div className="absolute hidden md:flex items-center gap-2 pointer-events-none"
        style={{
          top: "2rem", right: "2.5rem", zIndex: 10,
          opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease 2.2s",
        }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "rgba(220,50,50,0.85)",
          boxShadow: "0 0 10px rgba(220,50,50,0.5)",
          animation: "pulse-slow 1.8s ease-in-out infinite",
        }} />
        <span className="font-mono-label" style={{ fontSize: 7, letterSpacing: "0.35em", color: "rgba(255,255,255,0.28)" }}>
          REC
        </span>
        <span className="font-mono-label" style={{ fontSize: 7, letterSpacing: "0.15em", color: "rgba(255,255,255,0.15)" }}>
          2026
        </span>
      </div>

      {/* Frosted ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 55% 50%, rgba(255,255,255,0.022) 0%, transparent 70%)",
      }} />

      {/* Vertical labels — left gutter */}
      <div className="absolute left-6 md:left-10 top-0 bottom-0 hidden md:flex flex-col justify-around py-32 pointer-events-none z-10">
        {V_LABELS.map((label, i) => (
          <span key={label} className="v-text font-mono-label text-[9px] tracking-[0.28em]"
            style={{ color: "var(--text-3)", opacity: loaded ? 1 : 0, transition: `opacity 1.2s ease ${0.7 + i * 0.25}s` }}>
            {label}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center pl-6 md:pl-28 pr-6 md:pr-12" style={{ paddingTop: "80px" }}>

        {/* Handle */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(10px)",
          transition: "opacity .7s ease .05s, transform .7s ease .05s",
        }}>
          <span className="font-mono-label text-[10px] tracking-[0.35em]" style={{ color: "var(--text-3)" }}>
            @minehoooo
          </span>
        </div>

        {/* MINEH4O — character reveal + quote tooltip */}
        <div className="relative inline-block"
          onMouseEnter={() => setQuoteHover(true)}
          onMouseLeave={() => setQuoteHover(false)}>
          <h1 className="font-display leading-none select-none mt-3"
            style={{ fontSize: "clamp(6.5rem, 23vw, 30rem)", color: "var(--text)", cursor: "default" }}>
            <CharReveal text="MINEH4O" inView={loaded} baseDelay={0.12} stagger={0.048} />
          </h1>

          {/* Quote tooltip */}
          <div style={{
            position: "absolute",
            bottom: "calc(100% + 12px)",
            left: 0,
            pointerEvents: "none",
            opacity: quoteHover ? 1 : 0,
            transform: quoteHover ? "translateY(0) scale(1)" : "translateY(6px) scale(0.98)",
            transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "14px 20px",
            maxWidth: 320,
            zIndex: 50,
          }}>
            <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 12, transformOrigin: "left",
              transform: quoteHover ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.08s" }} />
            {q.lines.map((line, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-geist-sans), 'PingFang TC', 'Noto Sans TC', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.82)",
                letterSpacing: "0.02em",
                lineHeight: 1.7,
                marginBottom: i < q.lines.length - 1 ? 2 : 0,
                opacity: quoteHover ? 1 : 0,
                transform: quoteHover ? "translateY(0)" : "translateY(6px)",
                transition: `opacity 0.4s ease ${0.06 + i * 0.08}s, transform 0.4s ease ${0.06 + i * 0.08}s`,
              }}>{line}</p>
            ))}
            {q.attr && (
              <p style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.5rem", letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.3)",
                marginTop: 10,
                opacity: quoteHover ? 1 : 0,
                transition: "opacity 0.4s ease 0.3s",
              }}>{q.attr}</p>
            )}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginTop: 12, transformOrigin: "right",
              transform: quoteHover ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.2s" }} />
          </div>
        </div>

        {/* Tagline — glass pills */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {TAGLINE.map((word, i) => (
            word === "·" ? (
              <span key={i} style={{
                color: "rgba(255,255,255,0.18)", fontSize: 10, lineHeight: 1,
                opacity: loaded ? 1 : 0,
                transition: `opacity .6s ease ${0.88 + i * 0.07}s`,
              }}>·</span>
            ) : (
              <span key={i} className="font-mono-label text-[10px] tracking-[0.22em]"
                style={{
                  background: "rgba(255,255,255,0.045)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "5px 12px",
                  color: "rgba(255,255,255,0.6)",
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity .65s ease ${0.88 + i * 0.07}s, transform .65s cubic-bezier(.16,1,.3,1) ${0.88 + i * 0.07}s`,
                }}>
                {word}
              </span>
            )
          ))}
        </div>

        {/* Location */}
        <p className="font-mono-label text-[9px] tracking-[0.35em] mt-3"
          style={{ color: "var(--text-3)", opacity: loaded ? 1 : 0, transition: "opacity .8s ease 1.4s" }}>
          TAIWAN · TAICHUNG
        </p>
      </div>

      {/* Bottom strip — frosted glass */}
      <div className="border-t px-6 md:px-28 py-4 flex items-center gap-8 flex-wrap"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.6s",
        }}>
        {CATEGORIES.map(cat => (
          <a key={cat.en} href="#work" className="group flex items-center gap-2">
            <span className="font-mono-label text-[10px] tracking-[0.22em] transition-colors duration-300"
              style={{ color: "var(--text-3)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}>
              {cat.en} / {cat.zh}
            </span>
          </a>
        ))}

        <div className="ml-auto hidden md:flex items-center gap-3" style={{ color: "var(--text-3)" }}>
          <span className="font-mono-label text-[9px] tracking-widest" style={{ animation: "pulse-slow 2.5s ease infinite" }}>
            SCROLL
          </span>
          <div className="w-8 h-px" style={{ background: "var(--text-3)" }} />
        </div>
      </div>

      {/* Frosted bottom gradient — half-glass fade into the strip */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "45%",
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
        }} />
    </section>
  );
}
