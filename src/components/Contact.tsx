"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { CharReveal } from "@/components/WordReveal";

const IG_ACCOUNTS = [
  { handle: "@minehoooo",     href: "https://instagram.com/minehoooo",     desc: "Video · MV · Reels" },
  { handle: "@minehoooo.arw", href: "https://instagram.com/minehoooo.arw", desc: "Photography · ARW" },
  { handle: "@mlpon6",        href: "https://instagram.com/mlpon6",         desc: "Personal" },
];

export default function Contact() {
  const { ref, inView } = useInView(0.06);
  const [year, setYear] = useState("2026");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  function copyEmail() {
    navigator.clipboard.writeText("minehoooo@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="contact" style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── Top label ── */}
      <div className="border-b px-8 md:px-14 py-3 flex items-center justify-between"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <span className="font-mono-label text-[9px] tracking-[0.35em]" style={{ color: "rgba(255,255,255,0.3)" }}>
          06 — CONTACT
        </span>
        <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.18)" }}>
          minehoooo.xyz
        </span>
      </div>

      {/* ── Main CTA ── */}
      <div ref={ref} className="flex-1 flex flex-col justify-center px-8 md:px-14 py-16 md:py-24 relative overflow-hidden">

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden">
          <span className="font-display select-none"
            style={{
              fontSize: "clamp(12rem, 40vw, 56rem)",
              color: "rgba(255,255,255,0.014)",
              letterSpacing: "0.02em",
              lineHeight: 1,
              paddingRight: "3%",
              userSelect: "none",
            }}>
            DM
          </span>
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 40% 55%, rgba(80,80,160,0.06) 0%, transparent 70%)",
        }} />

        {/* Content */}
        <div className="relative z-10 max-w-3xl">

          {/* Label */}
          <p className="font-mono-label text-[9px] tracking-[0.38em] mb-8"
            style={{
              color: "rgba(255,255,255,0.3)",
              opacity: inView ? 1 : 0,
              transition: "opacity .7s ease",
            }}>
            有合作提案 · 歡迎聯繫
          </p>

          {/* Heading */}
          <h2 className="font-display leading-none mb-6"
            style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", color: "var(--text)", letterSpacing: "0.01em" }}>
            <CharReveal text="LET'S WORK" inView={inView} baseDelay={0.1} stagger={0.042} />
          </h2>

          <p className="font-mono-label text-[11px] md:text-[13px] tracking-[0.18em] mb-12 max-w-md leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.35)",
              opacity: inView ? 1 : 0,
              transition: "opacity .8s ease .2s",
            }}>
            Music video · Commercial · Photography · AIGC<br />
            Open for all creative collaborations
          </p>

          {/* Email + copy */}
          <div style={{
            opacity: inView ? 1 : 0,
            transition: "opacity .8s ease .26s",
            marginBottom: "1.2rem",
            display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
          }}>
            <a href="mailto:minehoooo@gmail.com"
              className="inline-flex items-center gap-2 font-mono-label text-[10px] tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.35)", transition: "color .3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
              <svg width="12" height="10" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="16" rx="2"/>
                <polyline points="2,2 12,11 22,2"/>
              </svg>
              minehoooo@gmail.com
            </a>
            <button onClick={copyEmail}
              className="font-mono-label text-[8px] tracking-[0.25em] px-2 py-0.5"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: copied ? "rgba(74,222,128,0.9)" : "rgba(255,255,255,0.28)",
                background: copied ? "rgba(74,222,128,0.06)" : "rgba(255,255,255,0.03)",
                cursor: "pointer", transition: "all .25s ease",
              }}>
              {copied ? "COPIED ✓" : "COPY"}
            </button>
            <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.18)" }}>
              GMT+8 · 24h 內回覆
            </span>
          </div>

          {/* Primary CTA — IG DM */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity .8s ease .3s, transform .8s cubic-bezier(.16,1,.3,1) .3s",
          }}>
            <a href="https://instagram.com/minehoooo" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-4"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "14px 28px",
                transition: "all .35s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.11)";
                el.style.borderColor = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.06)";
                el.style.borderColor = "rgba(255,255,255,0.12)";
              }}>
              {/* IG icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="rgba(255,255,255,0.7)" stroke="none" />
              </svg>
              <div className="flex flex-col">
                <span className="font-mono-label text-[10px] tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  SEND A DM
                </span>
                <span className="font-mono-label text-[13px] tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.85)" }}>
                  @minehoooo
                </span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, marginLeft: 4 }}>↗</span>
            </a>
          </div>
        </div>

        {/* IG account list — bottom right */}
        <div className="hidden md:flex flex-col items-end gap-3 absolute bottom-16 right-14"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity .8s ease .5s",
          }}>
          <p className="font-mono-label text-[8px] tracking-[0.3em] mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
            FOLLOW ALONG
          </p>
          {IG_ACCOUNTS.map(acc => (
            <a key={acc.handle} href={acc.href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 group">
              <span className="font-mono-label text-[8px] tracking-[0.18em]"
                style={{ color: "rgba(255,255,255,0.2)" }}>
                {acc.desc}
              </span>
              <span className="font-mono-label text-[10px] tracking-[0.14em] transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                {acc.handle}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Mobile IG list ── */}
      <div className="md:hidden px-8 pb-10 flex flex-col gap-3 border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <p className="font-mono-label text-[8px] tracking-[0.3em] pt-6 mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
          FOLLOW ALONG
        </p>
        {IG_ACCOUNTS.map(acc => (
          <a key={acc.handle} href={acc.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between">
            <span className="font-mono-label text-[11px] tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.5)" }}>
              {acc.handle}
            </span>
            <span className="font-mono-label text-[8px] tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.2)" }}>
              {acc.desc}
            </span>
          </a>
        ))}
      </div>

      {/* ── Footer strip ── */}
      <div className="border-t px-8 md:px-14 py-4 flex items-center justify-between flex-wrap gap-3"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.01)" }}>
        <span className="font-mono-label text-[8px] tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.2)" }}>
          © {year} MINEH4O · 賴明宏 Oscar Lai
        </span>
        <div className="flex items-center gap-6">
          <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.14)" }}>
            Taiwan · Taichung
          </span>
          <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.14)" }}>
            Director · DP · Visual Producer
          </span>
        </div>
      </div>

    </section>
  );
}
