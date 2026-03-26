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

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 180);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#000" }}>

      {/* Frosted ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 55% 50%, rgba(255,255,255,0.028) 0%, transparent 70%)",
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

        {/* MINEH4O — character reveal */}
        <h1 className="font-display leading-none select-none mt-3"
          style={{ fontSize: "clamp(6.5rem, 23vw, 30rem)", color: "var(--text)" }}>
          <CharReveal text="MINEH4O" inView={loaded} baseDelay={0.12} stagger={0.048} />
        </h1>

        {/* Tagline */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {TAGLINE.map((word, i) => (
            <span key={i} className="font-mono-label text-[11px] tracking-[0.28em]"
              style={{
                color: word === "·" ? "var(--text-3)" : "var(--text-2)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(12px)",
                transition: `opacity .6s ease ${0.9 + i * 0.07}s, transform .6s ease ${0.9 + i * 0.07}s`,
              }}>
              {word}
            </span>
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
          borderColor: "var(--border)",
          background:  "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
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

      {/* Frosted bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)", backdropFilter: "blur(2px)" }} />
    </section>
  );
}
