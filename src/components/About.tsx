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

const GOLD = { fontStyle: "normal" as const, color: "rgba(255,225,140,0.95)", fontWeight: 500 };
const bioCn = [
  <>我叫明宏。<br />鏡頭這件事，從高中就開始了——<br /><em style={GOLD}>不是因為有計畫，是因為停不下來</em></>,
  <>剪輯、音樂、色調、構圖，這些最早是靠 YouTube 自學拼出來的直覺。<br />大學念傳播，才第一次認識「電影語言」——<br /><em style={GOLD}>知道每個鏡頭都在說話之後，就再也看不了不知道自己在說什麼的畫面</em></>,
  <>我在乎畫面的邏輯，也在乎它的重量。<br />喜歡在拍攝前把每個運鏡想清楚，也能在現場即時回應那種沒法預期的真實</>,
  <>在片場待久了，發現最難的從來不是器材，<em style={GOLD}>是信任</em>。<br />好的畫面通常是溝通換來的，不是架好機器就有的</>,
  <>用影像說故事——<br /><em style={GOLD}>這件事我認真做了七年，還沒有要停的意思</em></>,
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
  { text: "陳卓《愚人節 ALL FOOL'S DAY》五週年紀念 — DIR · DP", highlight: true  },
  { text: "中華職棒明星賽紀實《精銳》Taiwolf — EDIT",           highlight: true  },
  { text: "Lil RAD × Coy6oi 系列四支 — DP · 累積 43萬+ 觀看",      highlight: true },
  { text: "89教科書《愛你真的梅辦法》— LIGHTING · 751萬+ 觀看",   highlight: true  },
  { text: "陳卓 Jon Chen 光與景三部曲 — DIR · DP",              highlight: true  },
  { text: "Kolli《BRING ME YOUR LOVELY》— DIR · DP · AI 混合", highlight: true  },
  { text: "2026 TEDxNTHU 8 位講者演講紀錄 — DIR · DP",         highlight: false },
  { text: "古林睿煬 — 2024 CPBL MVP · 日職北海道火腿鬥士",          highlight: false },
  { text: "社群觸及 — Threads 90 天 5.7M · 30 天 1.2M 瀏覽",         highlight: true  },
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
        background: hover ? "var(--white-ghost)" : "transparent",
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
          background: "var(--white-dim)",
          transition: "height 0.1s linear",
        }} />
      </div>

      {/* ═══════════════════════════════════════
          COVER — full viewport, photo + name
      ═══════════════════════════════════════ */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {/* Background photo — Oscar portrait, Ken Burns slow zoom */}
        <Image
          src="/oscar-portrait.jpg"
          alt="Oscar Lai — 賴明宏 MINEH4O 影像工作者大頭照"
          fill
          priority
          className="object-cover"
          style={{
            objectPosition: "center 22%",
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

        {/* Top label — centered */}
        <div className="absolute left-0 right-0 flex justify-center px-4" style={{ top: "5rem" }}>
          <p className="font-mono-label text-[9px] md:text-[10px] tracking-[0.35em] md:tracking-[0.4em]" style={{ color: "var(--white-soft)" }}>
            01 — ABOUT · MINEH4O
          </p>
        </div>

        {/* Centered name block — vertically + horizontally centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12"
          style={{ animation: "fadeSlideUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>

          {/* Subtitle above — wraps on mobile, single line on desktop */}
          <p className="font-mono-label text-[9px] md:text-[11px] tracking-[0.32em] md:tracking-[0.4em] mb-6 leading-relaxed"
            style={{ color: "var(--white-soft)", maxWidth: 480 }}>
            DIRECTOR · DP · SCREENPLAY · PHOTOGRAPHY
          </p>

          {/* OSCAR — centered hero name */}
          <div className="relative inline-block"
            onMouseEnter={() => setCoverHover(true)}
            onMouseLeave={() => setCoverHover(false)}>
            <h2 className="font-display leading-none"
              style={{ fontSize: "clamp(5rem,18vw,22rem)", color: "var(--text)", letterSpacing: "0.01em", cursor: "default" }}>
              OSCAR
            </h2>
            {/* Quote tooltip — desktop-only (hidden on mobile, ghost-tap rendering looks broken) */}
            <div className="hidden md:block" style={{
              position: "absolute", bottom: "calc(100% + 12px)", left: "50%", transform: coverHover ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(6px) scale(0.98)",
              pointerEvents: "none",
              opacity: coverHover ? 1 : 0,
              transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              background: "rgba(0,0,0,0.78)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid var(--white-ghost)", borderRadius: 12, padding: "14px 22px", maxWidth: 320, zIndex: 50,
              textAlign: "center",
            }}>
              {q.lines.map((line, i) => (
                <p key={i} style={{
                  fontFamily: "var(--font-geist-sans), 'PingFang TC', 'Noto Sans TC', sans-serif",
                  fontSize: "0.82rem", fontWeight: 300, color: "var(--white-primary)",
                  letterSpacing: "0.02em", lineHeight: 1.7, marginBottom: i < q.lines.length - 1 ? 2 : 0,
                  opacity: coverHover ? 1 : 0, transform: coverHover ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity 0.4s ease ${0.06 + i * 0.08}s, transform 0.4s ease ${0.06 + i * 0.08}s`,
                }}>{line}</p>
              ))}
              {q.attr && (
                <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.5rem",
                  letterSpacing: "0.25em", color: "var(--white-muted)", marginTop: 10,
                  opacity: coverHover ? 1 : 0, transition: "opacity 0.4s ease 0.3s" }}>{q.attr}</p>
              )}
            </div>
          </div>

          {/* Chinese name below */}
          <p className="font-mono-label text-[11px] md:text-[12px] tracking-[0.32em] mt-6"
            style={{ color: "var(--white-secondary)" }}>
            賴明宏 Lai Ming-Hong
          </p>

          {/* IG handle pill — centered */}
          <div className="flex gap-3 mt-7 flex-wrap justify-center">
            <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
              className="font-mono-label text-[10px] tracking-[0.22em] px-4 py-2 transition-all duration-300"
              style={{ color: "var(--white-primary)", background: "var(--white-ghost)", border: "1px solid var(--white-dim)", borderRadius: 999, backdropFilter: "blur(12px)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--white-dim)"; e.currentTarget.style.borderColor = "var(--white-muted)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--white-ghost)"; e.currentTarget.style.borderColor = "var(--white-dim)"; }}>
              @minehoooo.arw
            </a>
          </div>
        </div>

        {/* Scroll indicator — bottom center */}
        <div className="absolute hidden md:flex flex-col items-center gap-2 left-1/2 -translate-x-1/2"
          style={{ bottom: "2.5rem" }}>
          <span className="font-mono-label text-[7px] tracking-[0.35em]"
            style={{ color: "var(--white-muted)" }}>
            SCROLL
          </span>
          <div style={{ width: 1, height: 36, background: "var(--white-dim)", position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "var(--white-secondary)",
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
                    color: item === "·" ? "var(--white-dim)" : "var(--white-muted)",
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
              {/* Quote tooltip — desktop-only */}
              <div className="hidden md:block" style={{
                position: "absolute", top: "calc(100% + 8px)", left: 0,
                pointerEvents: "none",
                opacity: panelHover ? 1 : 0,
                transform: panelHover ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.98)",
                transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                background: "rgba(0,0,0,0.82)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--white-ghost)", padding: "12px 16px", maxWidth: 240, zIndex: 50,
              }}>
                {q.lines.map((line, i) => (
                  <p key={i} style={{
                    fontFamily: "var(--font-geist-sans), 'PingFang TC', 'Noto Sans TC', sans-serif",
                    fontSize: "0.82rem", fontWeight: 300, color: "var(--white-primary)",
                    letterSpacing: "0.02em", lineHeight: 1.7, marginBottom: i < q.lines.length - 1 ? 2 : 0,
                    opacity: panelHover ? 1 : 0, transform: panelHover ? "translateY(0)" : "translateY(4px)",
                    transition: `opacity 0.4s ease ${0.06 + i * 0.08}s, transform 0.4s ease ${0.06 + i * 0.08}s`,
                  }}>{line}</p>
                ))}
                {q.attr && (
                  <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.45rem",
                    letterSpacing: "0.25em", color: "var(--white-muted)", marginTop: 8,
                    opacity: panelHover ? 1 : 0, transition: "opacity 0.4s ease 0.3s" }}>{q.attr}</p>
                )}
              </div>
            </div>
            <p className="font-mono-label text-[10px] tracking-[0.2em]" style={{ color: "var(--text-2)" }}>
              賴明宏 Lai Ming-Hong
            </p>
          </div>

          {/* ── Featured stat — monthly social reach ── */}
          <div className="border-l-2 pl-4 py-2"
            style={{ borderColor: "rgba(255,210,70,0.65)", background: "linear-gradient(90deg, rgba(255,210,70,0.06), transparent)" }}>
            <p className="font-mono-label text-[10px] tracking-[0.32em] mb-1"
              style={{ color: "rgba(255,225,140,0.85)" }}>
              MONTHLY PEAK · 月觀看高峰
            </p>
            <p className="font-display leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--text)", letterSpacing: "0.01em" }}>
              500萬+
            </p>
            <p className="font-mono-label text-[10px] mt-2" style={{ color: "var(--text-2)" }}>
              Threads · Instagram · 短影音曝光
            </p>
          </div>

          {/* Details — simplified per user feedback (education condensed, in-school items removed) */}
          <div className="space-y-5">
            {[
              { label: "ROLE / 職稱",       value: "Director · DP · Screenplay" },
              { label: "EDUCATION / 學歷",  value: "朝陽科技大學 傳播藝術系" },
              { label: "BASED IN / 所在地", value: "Taiwan · Taichung · GMT+8" },
              { label: "TOOLS / 工具",      value: "Premiere Pro · DaVinci Resolve\nAfter Effects · Lightroom" },
              { label: "SINCE / 起始年",    value: "2019 — NOW" },
            ].map(item => (
              <div key={item.label}>
                <p className="font-mono-label text-[10px] tracking-[0.28em] mb-1.5" style={{ color: "var(--text-3)" }}>
                  {item.label}
                </p>
                <p className="font-mono-label text-[13px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Credits — text size + opacity bumped per user, focus on highest-viewed works */}
          <div className="border-t pt-6 space-y-3" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono-label text-[10px] tracking-[0.28em] mb-4" style={{ color: "var(--white-soft)" }}>
              SELECTED CREDITS / 代表作品
            </p>
            {credits.map(c => (
              <p key={c.text} className="font-mono-label text-[12px] leading-relaxed"
                style={{ color: c.highlight ? "var(--text)" : "var(--text-2)" }}>
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
              { handle: "@minehoooo.arw", href: "https://instagram.com/minehoooo.arw", desc: "Main · Director / DP / Photo" },
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
            {/* Featured monthly reach stat */}
            <div className="border-l-2 pl-3 py-2"
              style={{ borderColor: "rgba(255,210,70,0.65)", background: "linear-gradient(90deg, rgba(255,210,70,0.06), transparent)" }}>
              <p className="font-mono-label text-[9px] tracking-[0.3em] mb-1"
                style={{ color: "rgba(255,225,140,0.85)" }}>
                月觀看高峰
              </p>
              <p className="font-display leading-none"
                style={{ fontSize: "2rem", color: "var(--text)", letterSpacing: "0.01em" }}>
                500萬+
              </p>
              <p className="font-mono-label text-[9px] mt-1.5" style={{ color: "var(--text-2)" }}>
                Threads · IG · 短影音
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: "ROLE / 職稱",       value: "Director · DP · Screenplay" },
                { label: "EDUCATION / 學歷",  value: "朝陽科技大學 傳播藝術系" },
                { label: "BASED IN / 所在地", value: "Taiwan · Taichung" },
              ].map(item => (
                <div key={item.label}>
                  <p className="font-mono-label text-[9px] tracking-[0.3em] mb-1" style={{ color: "var(--text-3)" }}>{item.label}</p>
                  <p className="font-mono-label text-[11px]" style={{ color: "var(--text)" }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-mono-label text-[9px] tracking-[0.3em] mb-2" style={{ color: "var(--white-soft)" }}>SELECTED CREDITS / 代表作品</p>
              {credits.map(c => (
                <p key={c.text} className="font-mono-label text-[10px] leading-relaxed"
                  style={{ color: c.highlight ? "var(--text)" : "var(--text-2)" }}>— {c.text}</p>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              {[
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
            <Image src="/oscar-portrait.jpg" alt="Oscar Lai — 賴明宏 大頭照" fill className="object-cover" style={{ objectPosition: "center 15%" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(10,10,11,0.1) 0%, rgba(10,10,11,0.96) 100%)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(10,10,11,0.5) 0%, transparent 60%)",
            }} />
            <div style={{ position: "absolute", bottom: "1.2rem", left: "2rem", right: "2rem" }}>
              <p className="font-mono-label text-[8px] tracking-[0.3em] mb-1" style={{ color: "var(--white-soft)" }}>
                DIRECTOR · DP · SCREENPLAY
              </p>
              <p className="font-display leading-none" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "var(--text)", letterSpacing: "0.02em" }}>
                OSCAR LAI
              </p>
            </div>
          </div>

          {/* Bio ZH — 座右銘先講（他最在乎的事），再自我介紹 */}
          <div ref={bioRef}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-6" style={{ color: "var(--text-3)" }}>
              MOTTOS / 三句座右銘
            </p>
            <div className="space-y-5 max-w-lg mb-12">
              {QUOTES.map((q, i) => (
                <AnimLine key={i} delay={i * 0.12} inView={bioIn}>
                  <div className="flex gap-4 items-baseline">
                    <span className="font-mono-label text-[10px] shrink-0" style={{ color: "rgba(255,225,140,0.6)" }}>0{i + 1}</span>
                    <p className="text-[16px] md:text-[18px] font-medium leading-relaxed m-0" style={{ color: "var(--text)" }}>
                      {q.lines.map((l, j) => <span key={j}>{l}{j < q.lines.length - 1 && <br />}</span>)}
                      {q.attr && <span className="block text-[11px] mt-1 font-normal" style={{ color: "var(--text-3)" }}>{q.attr}</span>}
                    </p>
                  </div>
                </AnimLine>
              ))}
            </div>

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
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--white-soft)" }} />
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
                    color: item === "·" ? "var(--white-ghost)" : "var(--white-muted)",
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
