"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import { AnimLine } from "@/components/AnimLine";

const QUOTES = [
  { lines: ["人一定是", "在作品之前"], attr: null },
  { lines: ["莽撞的開始，拙劣的完成", "好過心懷完美", "不開始行動"], attr: null },
  { lines: ["停止對他們仰慕吧", "一天就好，只想著勝利", "衝吧"], attr: "— 大谷翔平" },
];

const bioCn = [
  "我叫明宏。鏡頭這件事，從高中就開始了——不是因為有計畫，是因為停不下來。",
  "剪輯、音樂、色調、構圖，這些最早是靠 YouTube 自學拼出來的直覺。大學念傳播，才第一次認識「電影語言」——知道每個鏡頭都在說話之後，就再也看不了不知道自己在說什麼的畫面。",
  "我在乎畫面的邏輯，也在乎它的重量。喜歡在拍攝前把每個運鏡想清楚，也能在現場即時回應那種沒法預期的真實。",
  "在片場待久了，發現最難的從來不是器材，是信任。好的畫面通常是溝通換來的，不是架好機器就有的。",
  "用影像說故事——這件事我認真做了七年，還沒有要停的意思。",
];

const bioEn = [
  "I'm Oscar. The camera thing started in high school — not by plan, but because I couldn't stop.",
  "Editing, sound, color, composition: built first through obsession, then through study. Film school gave me language for what I was already doing — and once you understand why a frame works, you can't unsee the ones that don't.",
  "I care about the logic of an image and its weight. I work best when I've thought through every movement in advance — and when I can respond in the moment to what no preparation could predict.",
  "The longer I've spent on set, the more I've come to believe that the hardest part isn't the equipment. It's trust. The frames worth keeping are almost always earned through conversation, not just craft.",
  "I've been telling stories through images for seven years. No signs of stopping.",
];

const skills = [
  { en: "Visual Design",         zh: "視覺設計",   tools: "Photoshop · Illustrator" },
  { en: "AIGC Creation",         zh: "AIGC 創作",  tools: "Midjourney · ComfyUI · Stable Diffusion" },
  { en: "Video Post-Production", zh: "影片後製",   tools: "DaVinci Resolve · Premiere Pro" },
  { en: "Photography",           zh: "攝影",       tools: "Commercial · Event · Wedding · Motion" },
];

const credits = [
  { text: "古林睿煬 — 2024 CPBL MVP · 日職北海道火腿鬥士", highlight: true  },
  { text: "陳卓 Jon Chen 光與景三部曲 + 愚人節 — DIR · DP", highlight: true  },
  { text: "Kolli — MV DIR · DP",                            highlight: true  },
  { text: "2026 TEDxNTHU 8 位講者演講紀錄 — DIR · DP",     highlight: true  },
  { text: "明星賽紀實：逐夢之路 Taiwolf — DIR · DP",        highlight: true  },
  { text: "多位知名音樂人 MV 攝影 · 調色",                  highlight: false },
  { text: "「紅箱子」入圍 2023 放視大賞",                   highlight: false },
  { text: "傳播藝術系 27th 系學會副會長",                   highlight: false },
];


/* ─── Skill card with glass hover glow ─── */
function SkillCard({ skill, index, inView }: {
  skill: { en: string; zh: string; tools: string };
  index: number;
  inView: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="border-r last:border-r-0 p-6 md:p-8 relative overflow-hidden"
      style={{
        borderColor: "var(--border)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
        background: hover ? "rgba(255,255,255,0.025)" : "transparent",
      }}>
      {/* Hover glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(100,120,200,0.08) 0%, transparent 70%)",
        opacity: hover ? 1 : 0,
        transition: "opacity .4s ease",
      }} />
      {/* Shimmer top border */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: hover
          ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)"
          : "transparent",
        transition: "background .4s ease",
      }} />
      <p className="font-mono-label text-[9px] tracking-[0.3em] mb-3" style={{ color: "var(--text-3)" }}>
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="text-[15px] font-medium mb-0.5" style={{ color: "var(--text)" }}>{skill.en}</h3>
      <p className="text-[13px] mb-3" style={{ color: "var(--text-2)" }}>{skill.zh}</p>
      <p className="font-mono-label text-[9px] leading-relaxed tracking-wider" style={{ color: "var(--text-3)" }}>
        {skill.tools}
      </p>
    </div>
  );
}

export default function About() {
  const { ref: bioRef,  inView: bioIn  } = useInView(0.05, true);
  const { ref: skRef,   inView: skIn   } = useInView(0.05, true);
  const { ref: leftRef, inView: leftIn } = useInView(0.05, true);
  const { ref: expRef,  inView: expIn  } = useInView(0.05, true);
  const [coverHover, setCoverHover] = useState(false);
  const [panelHover, setPanelHover] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const q = QUOTES[quoteIdx];

  useEffect(() => {
    setQuoteIdx(Math.floor(Math.random() * QUOTES.length));
  }, []);

  // Scroll progress — listens to the PageScroll container that wraps this section
  const onScroll = useCallback(() => {
    const el = sectionRef.current?.closest("[style*='overflow-y']") as HTMLElement | null;
    if (!el) return;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setScrollPct(Math.min(1, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const el = sectionRef.current?.closest("[style*='overflow-y']") as HTMLElement | null;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <section ref={sectionRef} id="about" style={{ background: "var(--bg-dark)", position: "relative" }}>

      {/* ── Scroll progress bar — left edge ── */}
      <div className="hidden md:block" style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: 2, zIndex: 40, pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%",
          height: `${scrollPct * 100}%`,
          background: "rgba(255,255,255,0.18)",
          transition: "height 0.1s linear",
        }} />
      </div>

      {/* ═══════════════════════════════════════
          COVER — full viewport, photo + name
      ═══════════════════════════════════════ */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {/* Background photo — Ken Burns slow zoom */}
        <Image
          src="/profile.png"
          alt="Oscar Lai — minehoooo"
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: "center top",
            animation: "kenBurns 22s ease-in-out infinite alternate",
            transformOrigin: "center top",
          }}
        />

        {/* Gradient overlay — strong at bottom so text reads */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 50%, rgba(10,10,11,0.97) 100%)",
        }} />
        {/* Side vignette */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
        }} />

        {/* Top label */}
        <div className="absolute px-8 md:px-14" style={{ top: "5.5rem" }}>
          <p className="font-mono-label text-[9px] tracking-[0.4em]" style={{ color: "rgba(255,255,255,0.45)" }}>
            01 — ABOUT · MINEH4O
          </p>
        </div>

        {/* Bottom: name block */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-14 pb-10 md:pb-14"
          style={{ animation: "fadeSlideUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
          <div className="relative inline-block"
            onMouseEnter={() => setCoverHover(true)}
            onMouseLeave={() => setCoverHover(false)}>
            <h1 className="font-display leading-none mb-3"
              style={{ fontSize: "clamp(5rem,20vw,24rem)", color: "var(--text)", letterSpacing: "0.01em", cursor: "default" }}>
              OSCAR
            </h1>
            {/* Quote tooltip */}
            <div style={{
              position: "absolute", bottom: "calc(100% + 8px)", left: 0,
              pointerEvents: "none",
              opacity: coverHover ? 1 : 0,
              transform: coverHover ? "translateY(0) scale(1)" : "translateY(6px) scale(0.98)",
              transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              background: "rgba(0,0,0,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)", padding: "14px 20px", maxWidth: 300, zIndex: 50,
            }}>
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 12, transformOrigin: "left",
                transform: coverHover ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.08s" }} />
              {q.lines.map((line, i) => (
                <p key={i} style={{
                  fontFamily: "var(--font-geist-sans), 'PingFang TC', 'Noto Sans TC', sans-serif",
                  fontSize: "0.88rem", fontWeight: 300, color: "rgba(255,255,255,0.82)",
                  letterSpacing: "0.02em", lineHeight: 1.7, marginBottom: i < q.lines.length - 1 ? 2 : 0,
                  opacity: coverHover ? 1 : 0, transform: coverHover ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 0.4s ease ${0.06 + i * 0.08}s, transform 0.4s ease ${0.06 + i * 0.08}s`,
                }}>{line}</p>
              ))}
              {q.attr && (
                <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.5rem",
                  letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)", marginTop: 10,
                  opacity: coverHover ? 1 : 0, transition: "opacity 0.4s ease 0.3s" }}>{q.attr}</p>
              )}
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginTop: 12, transformOrigin: "right",
                transform: coverHover ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.2s" }} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
            <div>
              <p className="font-mono-label text-[11px] tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.65)" }}>
                賴明宏 Lai Ming-Hong
              </p>
              <p className="font-mono-label text-[9px] tracking-[0.22em] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                Director · DP · Screenplay · Photography
              </p>
            </div>
            <div className="flex gap-3 md:gap-4">
              <a href="https://instagram.com/minehoooo" target="_blank" rel="noopener noreferrer"
                className="font-mono-label text-[8px] tracking-[0.25em]"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                @minehoooo
              </a>
              <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
                className="font-mono-label text-[8px] tracking-[0.25em]"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                @minehoooo.arw
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator — right side */}
        <div className="absolute hidden md:flex flex-col items-center gap-2"
          style={{ bottom: "2.5rem", right: "3.5rem" }}>
          <span className="font-mono-label text-[7px] tracking-[0.35em]"
            style={{ color: "rgba(255,255,255,0.3)", writingMode: "vertical-rl" }}>
            SCROLL
          </span>
          <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.12)", position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(255,255,255,0.7)",
              animation: "slideDown 1.6s ease-in-out infinite",
            }} />
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="border-t overflow-hidden" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.018)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", animation: "marquee 28s linear infinite", width: "max-content", padding: "10px 0" }}>
          {Array(2).fill(null).map((_, rep) => (
            <div key={rep} style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {["Director", "·", "DP", "·", "Screenplay", "·", "Photography", "·", "AIGC Creation", "·", "Color Grading", "·", "Visual Producer", "·"].map((item, j) => (
                <span key={j} className="font-mono-label"
                  style={{
                    fontSize: 8, letterSpacing: "0.32em",
                    color: item === "·" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.32)",
                    padding: item === "·" ? "0 20px" : "0 4px",
                    whiteSpace: "nowrap",
                  }}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CONTENT — sticky left + scrolling right
      ═══════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row border-t" style={{ borderColor: "var(--border)" }}>

        {/* Left: sticky identity panel (desktop only) */}
        <div ref={leftRef} className="hidden md:flex flex-col gap-8"
          style={{
            width: "38%",
            flexShrink: 0,
            position: "sticky",
            top: 0,
            height: "100vh",
            padding: "4rem 3.5rem",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderRight: "1px solid var(--border)",
            opacity: leftIn ? 1 : 0,
            transform: leftIn ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
            overflowY: "auto",
          }}>

          {/* Name (compact) */}
          <div>
            {/* Available badge */}
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.7)", animation: "pulse-slow 2s ease-in-out infinite" }} />
              <span className="font-mono-label text-[8px] tracking-[0.32em]" style={{ color: "rgba(74,222,128,0.8)" }}>
                AVAILABLE · 2026
              </span>
            </div>
            <div className="relative inline-block"
              onMouseEnter={() => setPanelHover(true)}
              onMouseLeave={() => setPanelHover(false)}>
              <h2 className="font-display leading-none mb-1.5" style={{ fontSize: "clamp(2.5rem,5vw,5rem)", color: "var(--text)", cursor: "default" }}>
                OSCAR
              </h2>
              {/* Quote tooltip */}
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", left: 0,
                pointerEvents: "none",
                opacity: panelHover ? 1 : 0,
                transform: panelHover ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.98)",
                transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                background: "rgba(0,0,0,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)", padding: "12px 16px", maxWidth: 240, zIndex: 50,
              }}>
                {q.lines.map((line, i) => (
                  <p key={i} style={{
                    fontFamily: "var(--font-geist-sans), 'PingFang TC', 'Noto Sans TC', sans-serif",
                    fontSize: "0.82rem", fontWeight: 300, color: "rgba(255,255,255,0.82)",
                    letterSpacing: "0.02em", lineHeight: 1.7, marginBottom: i < q.lines.length - 1 ? 2 : 0,
                    opacity: panelHover ? 1 : 0, transform: panelHover ? "translateY(0)" : "translateY(4px)",
                    transition: `opacity 0.4s ease ${0.06 + i * 0.08}s, transform 0.4s ease ${0.06 + i * 0.08}s`,
                  }}>{line}</p>
                ))}
                {q.attr && (
                  <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.45rem",
                    letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)", marginTop: 8,
                    opacity: panelHover ? 1 : 0, transition: "opacity 0.4s ease 0.3s" }}>{q.attr}</p>
                )}
              </div>
            </div>
            <p className="font-mono-label text-[10px] tracking-[0.2em]" style={{ color: "var(--text-2)" }}>
              賴明宏 Lai Ming-Hong
            </p>
          </div>

          {/* Details */}
          <div className="space-y-5">
            {[
              { label: "ROLE / 職稱",       value: "Director · DP · Screenplay\n導演 · 攝影師 · 編劇" },
              { label: "EDUCATION / 學歷",  value: "朝陽科技大學\n傳播藝術系 · 電影組" },
              { label: "BASED IN / 所在地", value: "Taiwan · Taichung · GMT+8" },
              { label: "TOOLS / 工具",      value: "Premiere Pro · DaVinci Resolve\nAfter Effects · Lightroom" },
              { label: "SINCE / 起始年",    value: "2019 — NOW" },
            ].map(item => (
              <div key={item.label}>
                <p className="font-mono-label text-[10px] tracking-[0.28em] mb-1.5" style={{ color: "var(--text-3)" }}>
                  {item.label}
                </p>
                <p className="font-mono-label text-[12px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text-2)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Credits */}
          <div className="border-t pt-6 space-y-2.5" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono-label text-[10px] tracking-[0.28em] mb-3.5" style={{ color: "var(--text-3)" }}>
              SELECTED CREDITS / 部分合作
            </p>
            {credits.map(c => (
              <p key={c.text} className="font-mono-label text-[11px] leading-relaxed"
                style={{ color: c.highlight ? "var(--text-2)" : "var(--text-3)" }}>
                — {c.text}
              </p>
            ))}
          </div>

          {/* Social */}
          <div className="border-t pt-5 space-y-2" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono-label text-[10px] tracking-[0.28em] mb-3.5" style={{ color: "var(--text-3)" }}>
              FOLLOW / 追蹤
            </p>
            {[
              { handle: "@minehoooo",     href: "https://instagram.com/minehoooo",     desc: "Video · Reels" },
              { handle: "@minehoooo.arw", href: "https://instagram.com/minehoooo.arw", desc: "Photography" },
              { handle: "@mlpon6",        href: "https://instagram.com/mlpon6",         desc: "Personal" },
            ].map(s => (
              <a key={s.handle} href={s.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between group">
                <span className="font-mono-label text-[11px] tracking-[0.12em] group-hover:text-white transition-colors"
                  style={{ color: "var(--text-2)" }}>
                  {s.handle}
                </span>
                <span className="font-mono-label text-[8px]" style={{ color: "var(--text-3)" }}>{s.desc}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: scrollable bio */}
        <div className="flex-1 px-8 md:px-14 py-10 md:py-16 flex flex-col gap-12">

          {/* Mobile identity block */}
          <div className="md:hidden space-y-5 border-b pb-8" style={{ borderColor: "var(--border)" }}>
            <div className="space-y-4">
              {[
                { label: "ROLE / 職稱",       value: "Director · DP · Screenplay" },
                { label: "EDUCATION / 學歷",  value: "朝陽科技大學 傳播藝術系 · 電影組" },
                { label: "BASED IN / 所在地", value: "Taiwan · Taichung" },
              ].map(item => (
                <div key={item.label}>
                  <p className="font-mono-label text-[8px] tracking-[0.3em] mb-1" style={{ color: "var(--text-3)" }}>{item.label}</p>
                  <p className="font-mono-label text-[10px]" style={{ color: "var(--text-2)" }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <p className="font-mono-label text-[8px] tracking-[0.3em] mb-2" style={{ color: "var(--text-3)" }}>SELECTED CREDITS</p>
              {credits.map(c => (
                <p key={c.text} className="font-mono-label text-[8px]"
                  style={{ color: c.highlight ? "var(--text-2)" : "var(--text-3)" }}>— {c.text}</p>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              {[
                { handle: "@minehoooo",     href: "https://instagram.com/minehoooo" },
                { handle: "@minehoooo.arw", href: "https://instagram.com/minehoooo.arw" },
                { handle: "@mlpon6",        href: "https://instagram.com/mlpon6" },
              ].map(s => (
                <a key={s.handle} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="font-mono-label text-[9px] tracking-[0.15em]" style={{ color: "var(--text-3)" }}>
                  {s.handle}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile photo banner — before bio */}
          <div className="md:hidden -mx-8 relative overflow-hidden mb-2" style={{ height: "52vw" }}>
            <Image src="/profile.png" alt="Oscar" fill className="object-cover" style={{ objectPosition: "center 15%" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(10,10,11,0.1) 0%, rgba(10,10,11,0.96) 100%)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(10,10,11,0.5) 0%, transparent 60%)",
            }} />
            <div style={{ position: "absolute", bottom: "1.2rem", left: "2rem", right: "2rem" }}>
              <p className="font-mono-label text-[8px] tracking-[0.3em] mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                DIRECTOR · DP · SCREENPLAY
              </p>
              <p className="font-display leading-none" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "var(--text)", letterSpacing: "0.02em" }}>
                OSCAR LAI
              </p>
            </div>
          </div>

          {/* Bio ZH */}
          <div ref={bioRef}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-7" style={{ color: "var(--text-3)" }}>
              ZH / 中文介紹
            </p>
            <div className="space-y-4 max-w-lg">
              {bioCn.map((line, i) => (
                <AnimLine key={i} delay={i * 0.09} inView={bioIn}>
                  <p className="text-[15px] md:text-[16px] leading-loose" style={{ color: "var(--text-2)" }}>{line}</p>
                </AnimLine>
              ))}
            </div>
          </div>

          {/* Bio EN */}
          <div className="border-t pt-10" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-7" style={{ color: "var(--text-3)" }}>
              EN / ENGLISH
            </p>
            <div className="space-y-3 max-w-lg">
              {bioEn.map((line, i) => (
                <AnimLine key={i} delay={0.15 + i * 0.07} inView={bioIn}>
                  <p className="text-[14px] leading-loose" style={{ color: "var(--text-3)" }}>{line}</p>
                </AnimLine>
              ))}
            </div>
          </div>

          {/* Credits — flows naturally after bio */}
          <div ref={expRef} className="border-t pt-10" style={{ borderColor: "var(--border)" }}>
            <div style={{ opacity: expIn ? 1 : 0, transition: "opacity .7s ease", marginBottom: 28 }}>
              <p className="font-mono-label text-[9px] tracking-[0.38em]" style={{ color: "var(--text-3)" }}>
                SELECTED CREDITS & EXPERIENCE
              </p>
            </div>
            <div className="max-w-lg">
              {credits.map((credit, i) => (
                <div key={credit.text} style={{
                  display: "flex", gap: 20, padding: "16px 0",
                  borderBottom: "1px solid var(--border)",
                  opacity: expIn ? 1 : 0,
                  transform: expIn ? "translateX(0)" : "translateX(-24px)",
                  transition: `opacity .65s ease ${i * 0.08}s, transform .65s cubic-bezier(.16,1,.3,1) ${i * 0.08}s`,
                }}>
                  <span className="font-mono-label text-[9px] tracking-widest shrink-0 pt-0.5"
                    style={{ color: "var(--text-3)", width: 28 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[14px] md:text-[15px] leading-snug flex-1"
                    style={{ color: credit.highlight ? "var(--text)" : "var(--text-2)" }}>
                    {credit.text}
                  </p>
                  {credit.highlight && (
                    <div style={{ flexShrink: 0, paddingTop: 6 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.35)" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          SKILLS
      ═══════════════════════════════════════ */}
      <div ref={skRef} className="grid md:grid-cols-4 border-t border-b" style={{ borderColor: "var(--border)" }}>
        {skills.map((skill, i) => (
          <SkillCard key={skill.en} skill={skill} index={i} inView={skIn} />
        ))}
      </div>

      {/* Domain bar */}
      <div className="border-t overflow-hidden" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.012)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", animation: "marquee 40s linear infinite", width: "max-content", padding: "9px 0" }}>
          {Array(2).fill(null).map((_, rep) => (
            <div key={rep} style={{ display: "flex", alignItems: "center" }}>
              {["Video Production & Post-Production", "·", "影像製作與後製作業", "·", "Taiwan · Taichung", "·", "MINEH4O / Oscar Lai", "·", "2026 Portfolio", "·"].map((item, j) => (
                <span key={j} className="font-mono-label"
                  style={{
                    fontSize: 8, letterSpacing: "0.28em",
                    color: item === "·" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.28)",
                    padding: item === "·" ? "0 24px" : "0 4px",
                    whiteSpace: "nowrap",
                  }}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
