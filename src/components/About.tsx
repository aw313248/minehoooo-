"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { AnimLine } from "@/components/AnimLine";

const QUOTES = [
  { lines: ["人一定是", "在作品之前"], attr: null },
  { lines: ["莽撞的開始，拙劣的完成", "好過心懷完美", "不開始行動"], attr: null },
  { lines: ["停止對他們仰慕吧", "一天就好，只想著勝利", "衝吧"], attr: "— 大谷翔平" },
];

const bioCn = [
  "我叫明宏，英文名 Oscar，高中以前，我還說不清楚這個名字對我有什麼意義",
  "從國中接觸 YouTube 開始，剪輯、特效、配樂、說故事——全靠自學，這些累積奠定了我對影像最早的敏感度",
  "上了大學才真正認識「電影」，在故事結構不斷被拆解、重組的過程中，反覆體會那種「原來，我怎麼沒發現？！」的衝擊感，那種既視感讓我對影像的動力越來越強",
  "偶爾理性地像個木頭，鑽研每顆鏡頭的調度；偶爾感性到在電影前面無表情地讓淚水流過",
  "也曾任系學會副會長——在不同立場間來回調度，學會從多個角度理解人與衝突",
  "透過畫面說故事，這件事讓我熱血，現在還是",
];

const bioEn = [
  "My name is Oscar, or Ming-Hong — before high school, I had no idea what weight that name would carry",
  "It started with YouTube in middle school — editing, effects, sound design, storytelling, all self-taught — that obsession laid the foundation for everything I do now",
  "University brought cinema — real cinema — stories taken apart and reassembled until the seams show, every collision brought the same feeling: 'Wait — how did I miss that?' and every time, it made the drive stronger",
  "Equal parts analytical and emotional — sometimes the most methodical person in the room mapping every lens movement frame by frame, sometimes sitting stone-faced in a theater as tears run down silently",
  "Served as VP of my department's student council — learning to navigate between perspectives, translate competing interests, and turn friction into understanding",
  "Using images to tell stories: still the most electric thing I know how to do",
];

const skills = [
  { en: "Visual Design",         zh: "視覺設計",   tools: "Photoshop · Illustrator" },
  { en: "AIGC Creation",         zh: "AIGC 創作",  tools: "Midjourney · ComfyUI · Stable Diffusion" },
  { en: "Video Post-Production", zh: "影片後製",   tools: "DaVinci Resolve · Premiere Pro" },
  { en: "Photography",           zh: "攝影",       tools: "Commercial · Event · Wedding · Motion" },
];

const credits = [
  { text: "古林睿煬 — 2024 CPBL MVP · 日職北海道火腿鬥士", highlight: true  },
  { text: "陳卓 Jon Chen 光與景三部曲 — DIR · DP",          highlight: true  },
  { text: "Kolli — MV DIR · DP",                            highlight: true  },
  { text: "多位知名音樂人 MV 攝影 · 調色",                  highlight: false },
  { text: "「紅箱子」入圍 2023 放視大賞",                   highlight: false },
  { text: "傳播藝術系 27th 系學會副會長",                   highlight: false },
];


export default function About() {
  const { ref: bioRef,  inView: bioIn  } = useInView(0.05, true);
  const { ref: skRef,   inView: skIn   } = useInView(0.05, true);
  const { ref: leftRef, inView: leftIn } = useInView(0.05, true);
  const [coverHover, setCoverHover] = useState(false);
  const [panelHover, setPanelHover] = useState(false);
  const quoteIdx = useRef(Math.floor(Math.random() * QUOTES.length));
  const q = QUOTES[quoteIdx.current];

  return (
    <section id="about" style={{ background: "var(--bg-dark)" }}>

      {/* ═══════════════════════════════════════
          COVER — full viewport, photo + name
      ═══════════════════════════════════════ */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {/* Background photo */}
        <Image
          src="/profile.png"
          alt="Oscar Lai — minehoooo"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center top" }}
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
                  fontFamily: "var(--font-bebas), sans-serif",
                  fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)", color: "rgba(255,255,255,0.88)",
                  letterSpacing: "0.06em", lineHeight: 1.25, marginBottom: i < q.lines.length - 1 ? 2 : 0,
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
                賴明宏 Lie Ming-Hong
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
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: "clamp(0.85rem, 1.5vw, 1.15rem)", color: "rgba(255,255,255,0.88)",
                    letterSpacing: "0.06em", lineHeight: 1.25, marginBottom: i < q.lines.length - 1 ? 2 : 0,
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
              賴明宏 Lie Ming-Hong
            </p>
          </div>

          {/* Details */}
          <div className="space-y-5">
            {[
              { label: "ROLE / 職稱",       value: "Director · DP · Screenplay\n導演 · 攝影師 · 編劇" },
              { label: "EDUCATION / 學歷",  value: "朝陽科技大學\n傳播藝術系 · 電影組" },
              { label: "BASED IN / 所在地", value: "Taiwan · Taichung" },
            ].map(item => (
              <div key={item.label}>
                <p className="font-mono-label text-[9px] tracking-[0.3em] mb-1.5" style={{ color: "var(--text-3)" }}>
                  {item.label}
                </p>
                <p className="font-mono-label text-[10px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text-2)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Credits */}
          <div className="border-t pt-6 space-y-2" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-3" style={{ color: "var(--text-3)" }}>
              SELECTED CREDITS / 部分合作
            </p>
            {credits.map(c => (
              <p key={c.text} className="font-mono-label text-[9px] leading-relaxed"
                style={{ color: c.highlight ? "var(--text-2)" : "var(--text-3)" }}>
                — {c.text}
              </p>
            ))}
          </div>

          {/* Social */}
          <div className="border-t pt-5 space-y-1.5" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-3" style={{ color: "var(--text-3)" }}>
              FOLLOW / 追蹤
            </p>
            {[
              { handle: "@minehoooo",     href: "https://instagram.com/minehoooo",     desc: "Video · Reels" },
              { handle: "@minehoooo.arw", href: "https://instagram.com/minehoooo.arw", desc: "Photography" },
              { handle: "@mlpon6",        href: "https://instagram.com/mlpon6",         desc: "Personal" },
            ].map(s => (
              <a key={s.handle} href={s.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between group">
                <span className="font-mono-label text-[9px] tracking-[0.12em] group-hover:text-white transition-colors"
                  style={{ color: "var(--text-2)" }}>
                  {s.handle}
                </span>
                <span className="font-mono-label text-[7px]" style={{ color: "var(--text-3)" }}>{s.desc}</span>
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

          {/* Bio ZH */}
          <div ref={bioRef}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-7" style={{ color: "var(--text-3)" }}>
              ZH / 中文介紹
            </p>
            <div className="space-y-4 max-w-lg">
              {bioCn.map((line, i) => (
                <AnimLine key={i} delay={i * 0.09} inView={bioIn}>
                  <p className="text-[14px] md:text-[15px] leading-loose" style={{ color: "var(--text-2)" }}>{line}</p>
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
                  <p className="text-[13px] leading-loose" style={{ color: "var(--text-3)" }}>{line}</p>
                </AnimLine>
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
          <div key={skill.en} className="border-r last:border-r-0 p-6 md:p-8"
            style={{
              borderColor: "var(--border)",
              opacity: skIn ? 1 : 0,
              transform: skIn ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
              transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-3" style={{ color: "var(--text-3)" }}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="text-[15px] font-medium mb-0.5" style={{ color: "var(--text)" }}>{skill.en}</h3>
            <p className="text-[13px] mb-3" style={{ color: "var(--text-2)" }}>{skill.zh}</p>
            <p className="font-mono-label text-[9px] leading-relaxed tracking-wider" style={{ color: "var(--text-3)" }}>
              {skill.tools}
            </p>
          </div>
        ))}
      </div>

      {/* Domain bar */}
      <div className="px-6 md:px-10 py-3 flex items-center gap-2" style={{ background: "var(--bg-card)" }}>
        <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color: "var(--text-3)" }}>
          MAIN DOMAIN /
        </span>
        <span className="font-mono-label text-[9px] tracking-[0.18em]" style={{ color: "var(--text-2)" }}>
          Video Production & Post-Production · 影像製作與後製作業
        </span>
      </div>
    </section>
  );
}
