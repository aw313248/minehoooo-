"use client";

import Link from "next/link";

/**
 * Top + bottom navigation strip on every Field Notes article.
 * Routes readers back to portfolio + sister sites (per Oscar's SEO funnel strategy).
 */
export default function FieldNoteNav({ position }: { position: "top" | "bottom" }) {
  const isBottom = position === "bottom";

  return (
    <nav className="my-8 md:my-12"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "1.4rem 0",
        background: "linear-gradient(90deg, rgba(255,255,255,0.02), transparent, rgba(255,255,255,0.02))",
      }}>
      {/* Optional contextual heading on bottom nav */}
      {isBottom && (
        <p className="font-mono-label text-[9px] uppercase tracking-[0.32em] text-center mb-4"
          style={{ color: "rgba(255,255,255,0.55)" }}>
          下一步 / WHAT&apos;S NEXT
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-center max-w-3xl mx-auto px-4">
        {/* Back to portfolio */}
        <Link href="/"
          className="group flex-1 inline-flex items-center justify-between px-5 py-3"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14,
            color: "rgba(255,255,255,0.92)",
            textDecoration: "none",
            transition: "all .25s ease",
          }}>
          <div className="flex flex-col items-start">
            <span className="font-mono-label text-[9px] uppercase tracking-[0.32em]"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              MINEH4O · 作品集
            </span>
            <span className="text-[14px] font-medium mt-0.5">
              看 Oscar 的影像作品 →
            </span>
          </div>
          <span style={{ fontSize: 20, color: "rgba(255,255,255,0.65)" }}>↗</span>
        </Link>

        {/* CareCub project */}
        <a href="https://child-safety-radar.vercel.app" target="_blank" rel="noopener noreferrer"
          className="group flex-1 inline-flex items-center justify-between px-5 py-3"
          style={{
            background: "linear-gradient(135deg, rgba(242,184,75,0.14), rgba(242,184,75,0.04))",
            border: "1px solid rgba(242,184,75,0.4)",
            borderRadius: 14,
            color: "rgba(255,225,140,0.95)",
            textDecoration: "none",
            transition: "all .25s ease",
          }}>
          <div className="flex flex-col items-start">
            <span className="font-mono-label text-[9px] uppercase tracking-[0.32em]"
              style={{ color: "rgba(255,225,140,0.7)" }}>
              🐻 CARECUB · 小析守護
            </span>
            <span className="text-[14px] font-medium mt-0.5">
              AI 幫家長把關 YouTube →
            </span>
          </div>
          <span style={{ fontSize: 20, color: "#F2B84B" }}>↗</span>
        </a>

        {/* IG DM */}
        <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noopener noreferrer"
          className="group flex-1 inline-flex items-center justify-between px-5 py-3"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14,
            color: "rgba(255,255,255,0.92)",
            textDecoration: "none",
            transition: "all .25s ease",
          }}>
          <div className="flex flex-col items-start">
            <span className="font-mono-label text-[9px] uppercase tracking-[0.32em]"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              📩 私訊合作
            </span>
            <span className="text-[14px] font-medium mt-0.5">
              @minehoooo.arw →
            </span>
          </div>
          <span style={{ fontSize: 20, color: "rgba(255,255,255,0.65)" }}>↗</span>
        </a>
      </div>
    </nav>
  );
}
