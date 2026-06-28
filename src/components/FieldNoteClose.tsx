"use client";

import Link from "next/link";

/**
 * Field Notes article closing block.
 * Per spec, only three pieces:
 *   1) MORE FIELD NOTES     → /field-notes
 *   2) SELECTED WORKS       → /?section=video
 *   3) 合作洽詢 · @minehoooo.arw  (single contact line)
 */
export default function FieldNoteClose() {
  return (
    <section className="mt-20 md:mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <CloseCard
          tone="cool"
          tagEn="01 — More Field Notes"
          headline={
            <>
              閱讀更多<br />
              AI 工作流
            </>
          }
          desc="Prompt 結構、工具實測、現場心法。"
          href="/field-notes"
          cta="Read more notes"
        />
        <CloseCard
          tone="gold"
          tagEn="02 — Selected Works"
          headline={
            <>
              觀看 Oscar 的<br />
              精選影像作品
            </>
          }
          desc="MV、商案、紀錄片、AIGC — Oscar 在台中拍的長片段與短作品。"
          href="/?section=video"
          cta="Enter the work"
        />
      </div>

      {/* Soft contact line — single line, no emoji, no decorations */}
      <div
        className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        <span
          className="font-mono-label uppercase"
          style={{ fontSize: 10, letterSpacing: "0.32em", color: "rgba(255,255,255,0.45)" }}
        >
          合作洽詢
        </span>
        <span aria-hidden style={{ color: "rgba(255,255,255,0.22)" }}>·</span>
        <a
          href="https://instagram.com/minehoooo.arw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "rgba(255,225,140,0.92)",
            textDecoration: "none",
            fontSize: 13,
            letterSpacing: "0.04em",
            borderBottom: "1px solid rgba(255,225,140,0.35)",
            paddingBottom: 1,
          }}
        >
          @minehoooo.arw
        </a>
      </div>
    </section>
  );
}

function CloseCard({
  tone,
  tagEn,
  headline,
  desc,
  href,
  cta,
}: {
  tone: "cool" | "gold";
  tagEn: string;
  headline: React.ReactNode;
  desc: string;
  href: string;
  cta: string;
}) {
  const tagColor =
    tone === "gold" ? "rgba(255,225,140,0.85)" : "rgba(180,210,240,0.85)";
  const radial =
    tone === "gold"
      ? "radial-gradient(circle at 80% 20%, rgba(255,225,140,0.10) 0%, transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 60%)"
      : "radial-gradient(circle at 20% 80%, rgba(120,160,200,0.10) 0%, transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 60%)";

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(18px) saturate(120%)",
        WebkitBackdropFilter: "blur(18px) saturate(120%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 36px rgba(0,0,0,0.22)",
        borderRadius: 18,
        textDecoration: "none",
        color: "inherit",
        minHeight: 320,
      }}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: radial }} />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
          opacity: 0.06,
          mixBlendMode: "screen",
        }}
      />

      <div className="relative h-full flex flex-col px-7 md:px-9 py-8 md:py-10">
        <span
          className="font-mono-label uppercase"
          style={{ fontSize: 9, letterSpacing: "0.4em", color: tagColor }}
        >
          {tagEn}
        </span>
        <h3
          className="font-display leading-[1.05] mt-4 md:mt-5"
          style={{
            fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)",
            color: "var(--text)",
            letterSpacing: 0,
            wordBreak: "keep-all",
            overflowWrap: "anywhere",
          }}
        >
          {headline}
        </h3>
        <p
          className="mt-3 md:mt-4 max-w-sm"
          style={{
            fontSize: 13.5,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.62)",
            fontWeight: 300,
            wordBreak: "keep-all",
            overflowWrap: "anywhere",
          }}
        >
          {desc}
        </p>

        <div className="mt-auto pt-10 md:pt-12 flex items-center gap-3 whitespace-nowrap">
          <span
            aria-hidden
            style={{
              width: 44, height: 1,
              background: "rgba(255,255,255,0.35)",
              transition: "width .35s cubic-bezier(.16,1,.3,1)",
            }}
            className="group-hover:!w-[72px]"
          />
          <span
            className="font-mono-label uppercase"
            style={{
              fontSize: 10,
              letterSpacing: "0.32em",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {cta}
          </span>
          <span aria-hidden style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>→</span>
        </div>
      </div>
    </Link>
  );
}
