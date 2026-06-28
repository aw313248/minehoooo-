"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * QUICK START — first-screen orientation block.
 *
 * Answers the 5 questions the user is asking when they land:
 *   1. What tool am I supposed to use?
 *   2. What do I need to prepare?
 *   3. Where is the prompt?
 *   4. How do I copy it?
 *   5. Where do I paste it?
 *
 * This is the single most-important component on the page. It must be
 * visible on the first screen, on both desktop and mobile.
 */
export default function QuickStart({
  toolName,
  toolHref,
  promptToCopy,
}: {
  toolName: string;
  toolHref: string;
  promptToCopy: string;
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

  const steps = [
    {
      num: "01",
      en: toolName,
      zh: "使用軟體",
      icon: <ToolIcon />,
    },
    {
      num: "02",
      en: "Route Image",
      zh: "含路徑、箭頭、Start 與 End 的圖片",
      icon: <ImageIcon />,
    },
    {
      num: "03",
      en: "Copy Prompt",
      zh: "複製 Oscar 的 Prompt，貼入 Higgsfield",
      icon: <CopyIcon />,
    },
  ];

  return (
    <section className="qs-root" aria-label="Quick start">
      <Styles />

      {/* Header */}
      <div className="qs-head">
        <span className="qs-tag">Quick Start</span>
        <span aria-hidden className="qs-rule" />
        <span className="qs-sub">開始前，只需要準備兩件事</span>
      </div>

      {/* 3 step cards */}
      <div className="qs-grid">
        {steps.map((s) => (
          <div key={s.num} className="qs-card">
            <div className="qs-card-head">
              <span className="qs-num">{s.num}</span>
              <span className="qs-card-icon" aria-hidden>{s.icon}</span>
            </div>
            <p className="qs-card-en">{s.en}</p>
            <p className="qs-card-zh">{s.zh}</p>
          </div>
        ))}
      </div>

      {/* 2 primary CTAs */}
      <div className="qs-actions">
        <button
          type="button"
          onClick={copy}
          className={`qs-btn qs-btn-primary ${copied ? "is-copied" : ""}`}
        >
          {copied ? (
            <>
              <CopiedSvg />
              <span>COPIED</span>
              <span aria-hidden style={{ fontSize: 13 }}>✓</span>
            </>
          ) : (
            <>
              <CopySvg />
              <span>Copy Oscar&apos;s Prompt</span>
              <span aria-hidden style={{ fontSize: 13 }}>→</span>
            </>
          )}
        </button>

        <a
          href={toolHref}
          target="_blank"
          rel="noopener noreferrer"
          className="qs-btn qs-btn-ghost"
        >
          <ExternalSvg />
          <span>Open Higgsfield</span>
          <span aria-hidden style={{ fontSize: 13 }}>↗</span>
        </a>
      </div>

      {/* Tertiary link to tool intro */}
      <p className="qs-sub-link">
        第一次使用？
        <Link href="/tools/higgsfield-seedance" className="qs-inline-link">
          先看軟體介紹 →
        </Link>
      </p>
    </section>
  );
}

/* ─── Icons ─── */
function ToolIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 4 L4 10 L4 22 L16 28 L28 22 L28 10 Z" />
      <path d="M16 16 L4 10 M16 16 L28 10 M16 16 L16 28" opacity="0.55" />
    </svg>
  );
}
function ImageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="6" width="24" height="20" rx="1" />
      <circle cx="6" cy="22" r="1.6" fill="currentColor" />
      <path d="M7 21 Q 14 12 20 17 T 26 9" />
      <path d="M24 6 L26 9 L23 10" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="11" y="11" width="15" height="15" rx="1" />
      <path d="M6 21V7a1 1 0 0 1 1-1h14" />
    </svg>
  );
}
function CopySvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="9" y="9" width="11" height="11" rx="1" />
      <path d="M5 15V5a1 1 0 0 1 1-1h10" />
    </svg>
  );
}
function CopiedSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
      <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ExternalSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M14 4h6v6M20 4L10 14M19 14v6H4V5h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Styles ─── */
function Styles() {
  return (
    <style>{`
      .qs-root {
        color: rgba(255,255,255,0.86);
        word-break: keep-all;
        overflow-wrap: anywhere;
      }
      .qs-head {
        display: flex; align-items: center; gap: 14px; margin-bottom: 16px;
      }
      .qs-tag {
        font-family: var(--font-space-mono), monospace;
        font-size: 11px; letter-spacing: 0.42em; text-transform: uppercase;
        color: rgba(255,225,140,0.95);
      }
      .qs-rule {
        flex: 1; height: 1px;
        background: linear-gradient(to right, rgba(255,225,140,0.4), transparent 70%);
      }
      .qs-sub {
        font-size: 13px; color: rgba(255,255,255,0.6);
        letter-spacing: 0.04em;
      }

      /* 3 step cards */
      .qs-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        margin-bottom: 18px;
      }
      @media (min-width: 720px) {
        .qs-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
      }
      .qs-card {
        position: relative;
        padding: 18px 18px 20px;
        background: rgba(255,255,255,0.055);
        backdrop-filter: blur(22px) saturate(125%);
        -webkit-backdrop-filter: blur(22px) saturate(125%);
        border: 1px solid rgba(255,255,255,0.14);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.08),
          0 16px 48px rgba(0,0,0,0.24);
        border-radius: 14px;
      }
      .qs-card-head {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 12px;
      }
      .qs-num {
        font-family: var(--font-space-mono), monospace;
        font-size: 13px;
        letter-spacing: 0.22em;
        color: rgba(255,225,140,0.85);
        background: rgba(255,225,140,0.05);
        border: 1px solid rgba(255,225,140,0.22);
        padding: 4px 9px;
        border-radius: 6px;
      }
      .qs-card-icon {
        color: rgba(255,225,140,0.85);
      }
      .qs-card-en {
        margin: 0;
        font-family: var(--font-space-mono), monospace;
        font-size: 13px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.96);
        line-height: 1.35;
      }
      .qs-card-zh {
        margin: 7px 0 0;
        font-size: 13px;
        line-height: 1.6;
        color: rgba(255,255,255,0.62);
      }

      /* Action row */
      .qs-actions {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        margin-bottom: 12px;
      }
      @media (min-width: 640px) {
        .qs-actions { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 12px; }
      }
      .qs-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 16px 22px;
        font-family: var(--font-space-mono), monospace;
        font-size: 12px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        white-space: nowrap;
        border-radius: 12px;
        border: 1px solid transparent;
        cursor: pointer;
        text-decoration: none;
        transition: color .2s, background .2s, border-color .2s, box-shadow .2s;
      }
      .qs-btn-primary {
        color: rgba(20,15,5,0.92);
        background: rgba(255,225,140,0.95);
        border-color: rgba(255,225,140,0.95);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.2),
          0 12px 30px rgba(255,225,140,0.18);
      }
      .qs-btn-primary:hover {
        background: rgba(255,235,180,1);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.3),
          0 14px 36px rgba(255,225,140,0.28);
      }
      .qs-btn-primary.is-copied {
        color: rgba(20,40,30,0.92);
        background: rgba(170,230,200,0.95);
        border-color: rgba(170,230,200,0.95);
      }
      .qs-btn-ghost {
        color: rgba(255,255,255,0.92);
        background: rgba(255,255,255,0.055);
        backdrop-filter: blur(20px) saturate(125%);
        -webkit-backdrop-filter: blur(20px) saturate(125%);
        border-color: rgba(255,255,255,0.18);
      }
      .qs-btn-ghost:hover {
        color: #fff;
        background: rgba(255,255,255,0.10);
        border-color: rgba(255,255,255,0.32);
      }

      .qs-sub-link {
        margin: 8px 0 0;
        font-size: 12.5px;
        color: rgba(255,255,255,0.5);
        text-align: center;
      }
      .qs-inline-link {
        color: rgba(255,225,140,0.85);
        text-decoration: none;
        border-bottom: 1px solid rgba(255,225,140,0.32);
        padding-bottom: 1px;
        margin-left: 6px;
        transition: color .2s, border-color .2s;
      }
      .qs-inline-link:hover {
        color: rgba(255,235,180,1);
        border-bottom-color: rgba(255,235,180,0.7);
      }
    `}</style>
  );
}
