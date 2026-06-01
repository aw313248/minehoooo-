"use client";

import Link from "next/link";

/**
 * Warm closing block at the bottom of each Field Notes article.
 * Less "navigation", more "stick around" — invites readers to explore the rest of the site.
 */
export default function FieldNoteClose() {
  return (
    <section className="mt-14 mb-4"
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(255,210,70,0.04), rgba(255,210,70,0.01) 60%, transparent)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
      {/* Subtle ambient glow top-right */}
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        top: -100, right: -100, width: 280, height: 280,
        background: "radial-gradient(circle, rgba(255,210,70,0.10) 0%, transparent 70%)",
      }} />

      <div className="relative px-6 md:px-10 py-10 md:py-12">
        {/* ── Headline ── */}
        <p className="font-mono-label text-[10px] uppercase tracking-[0.32em] mb-3"
          style={{ color: "rgba(255,225,140,0.85)" }}>
          ✨ THANKS FOR READING
        </p>
        <h3 className="font-display leading-tight mb-3"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--text)", letterSpacing: "0" }}>
          看完了？也歡迎在這裡走走
        </h3>
        <p className="text-[13.5px] md:text-[15px] leading-relaxed mb-7 max-w-lg"
          style={{ color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
          MINEH4O 不只有教學筆記，還有影像作品、AI 實驗、工作室專案 ——<br />
          逛一下，說不定會找到合作靈感 ✨
        </p>

        {/* ── 4 explore tiles ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 mb-8">
          {[
            { href: "/?section=photo",    label: "PHOTO",    zh: "攝影",   sub: "人像 · 活動 · 商業" },
            { href: "/?section=video",    label: "VIDEO",    zh: "影像",   sub: "MV · 商案 · 短片" },
            { href: "/?section=aigc",     label: "AIGC",     zh: "AI 影像", sub: "AI 實驗作品" },
            { href: "/?section=projects", label: "PROJECTS", zh: "專案",   sub: "工作室自製產品" },
          ].map(tile => (
            <Link key={tile.label} href={tile.href}
              className="group block px-4 py-4 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                textDecoration: "none",
                color: "inherit",
              }}>
              <p className="font-mono-label text-[9px] uppercase tracking-[0.3em] mb-1.5 group-hover:text-white/95 transition-colors"
                style={{ color: "rgba(255,225,140,0.85)" }}>
                {tile.label}
              </p>
              <p className="text-[14px] mb-1"
                style={{ color: "var(--white-primary)", fontWeight: 500 }}>
                {tile.zh}
              </p>
              <p className="text-[11px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}>
                {tile.sub}
              </p>
            </Link>
          ))}
        </div>

        {/* ── Soft contact line ── */}
        <div className="pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="font-mono-label text-[10px] uppercase tracking-[0.32em] mb-3"
            style={{ color: "rgba(255,255,255,0.55)" }}>
            或者，聊聊
          </p>
          <div className="flex flex-wrap gap-2">
            <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                color: "rgba(255,255,255,0.92)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}>
              <span>📩</span>
              <span>私訊 @minehoooo.arw</span>
            </a>
            <a href="mailto:cyuttkengineer@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                color: "rgba(255,255,255,0.92)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}>
              <span>✉️</span>
              <span>寄信</span>
            </a>
            <Link href="/field-notes"
              className="inline-flex items-center gap-2 px-4 py-2"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                color: "rgba(255,255,255,0.92)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}>
              <span>📓</span>
              <span>看更多現場筆記</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
