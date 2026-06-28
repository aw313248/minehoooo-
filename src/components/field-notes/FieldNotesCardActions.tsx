"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Inline action row for a Field Notes listing card.
 *   - READ WORKFLOW → article page
 *   - COPY PROMPT  → copies the article's Oscar-example prompt
 *
 * The parent <Link> covers the whole card. These two buttons re-enable
 * pointer events so they intercept clicks without firing the card link.
 */
export default function FieldNotesCardActions({
  readHref,
  promptToCopy,
}: {
  readHref: string;
  promptToCopy: string | null;
}) {
  const [copied, setCopied] = useState(false);

  function copy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={readHref}
        className="inline-flex items-center gap-2"
        style={{
          padding: "8px 14px",
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: 10.5,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(20,15,5,0.92)",
          background: "rgba(255,225,140,0.92)",
          border: "1px solid rgba(255,225,140,0.92)",
          borderRadius: 8,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span>Read Workflow</span>
        <span aria-hidden style={{ fontSize: 13 }}>→</span>
      </Link>
      {promptToCopy && (
        <button
          type="button"
          onClick={copy}
          className={`inline-flex items-center gap-2 ${copied ? "is-copied" : ""}`}
          style={{
            padding: "8px 14px",
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 10.5,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: copied ? "rgba(170,230,200,1)" : "rgba(255,255,255,0.92)",
            background: copied ? "rgba(140,220,180,0.08)" : "rgba(255,255,255,0.04)",
            border: "1px solid",
            borderColor: copied ? "rgba(150,220,180,0.5)" : "rgba(255,255,255,0.18)",
            borderRadius: 8,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "color .2s, background .2s, border-color .2s",
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
      )}
    </div>
  );
}
