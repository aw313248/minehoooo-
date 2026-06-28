"use client";

import { useState } from "react";

/**
 * Mobile-only sticky action bar pinned to the bottom of the article page.
 * Two actions: COPY PROMPT (primary) + OPEN HIGGSFIELD (ghost).
 *
 * Hidden on tablet+ via `md:hidden`. Includes safe-area padding for iOS.
 */
export default function MobileStickyBar({
  promptToCopy,
  toolHref,
  toolLabel = "Open Higgsfield",
}: {
  promptToCopy: string;
  toolHref: string;
  toolLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (typeof navigator === "undefined" || !promptToCopy) return;
    navigator.clipboard
      .writeText(promptToCopy)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  }

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(8,8,10,0.78)",
        backdropFilter: "blur(22px) saturate(125%)",
        WebkitBackdropFilter: "blur(22px) saturate(125%)",
        borderTop: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 -12px 36px rgba(0,0,0,0.36)",
        paddingTop: 10,
        paddingBottom: "calc(10px + env(safe-area-inset-bottom, 0px))",
        paddingLeft: "max(14px, env(safe-area-inset-left, 0px))",
        paddingRight: "max(14px, env(safe-area-inset-right, 0px))",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)",
          gap: 10,
        }}
      >
        <button
          type="button"
          onClick={copy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "13px 14px",
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: copied ? "rgba(20,40,30,0.92)" : "rgba(20,15,5,0.92)",
            background: copied ? "rgba(170,230,200,0.95)" : "rgba(255,225,140,0.95)",
            border: "1px solid",
            borderColor: copied ? "rgba(170,230,200,0.95)" : "rgba(255,225,140,0.95)",
            borderRadius: 10,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background .2s, color .2s, border-color .2s",
          }}
        >
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>COPIED</span>
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <rect x="9" y="9" width="11" height="11" rx="1" />
                <path d="M5 15V5a1 1 0 0 1 1-1h10" />
              </svg>
              <span>Copy Prompt</span>
            </>
          )}
        </button>

        <a
          href={toolHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "13px 14px",
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.92)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 10,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M14 4h6v6M20 4L10 14M19 14v6H4V5h6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{toolLabel}</span>
        </a>
      </div>
    </div>
  );
}
