"use client";

import Link from "next/link";

/**
 * Small glass tag placed near the article title. Tells the user
 * which software the tutorial covers, and links to a deeper intro page.
 */
export default function ToolBadge({
  toolName,
  toolPagePath,
  zhCta = "軟體介紹",
}: {
  toolName: string;
  toolPagePath: string;
  zhCta?: string;
}) {
  return (
    <Link
      href={toolPagePath}
      className="inline-flex items-center gap-2.5 group"
      style={{
        padding: "6px 12px 6px 12px",
        background: "rgba(255,255,255,0.055)",
        backdropFilter: "blur(20px) saturate(125%)",
        WebkitBackdropFilter: "blur(20px) saturate(125%)",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 30px rgba(0,0,0,0.18)",
        borderRadius: 999,
        textDecoration: "none",
        color: "inherit",
        whiteSpace: "nowrap",
      }}
    >
      <span
        className="font-mono-label uppercase"
        style={{
          fontSize: 9,
          letterSpacing: "0.36em",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        Tool
      </span>
      <span aria-hidden style={{ width: 1, height: 10, background: "rgba(255,255,255,0.18)" }} />
      <span
        className="font-mono-label uppercase"
        style={{
          fontSize: 10,
          letterSpacing: "0.32em",
          color: "rgba(255,225,140,0.95)",
        }}
      >
        {toolName}
      </span>
      <span
        className="font-mono-label uppercase"
        style={{
          fontSize: 9.5,
          letterSpacing: "0.28em",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {zhCta}
      </span>
      <span aria-hidden style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>→</span>
    </Link>
  );
}
