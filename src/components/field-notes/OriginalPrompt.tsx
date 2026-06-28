"use client";

import { useState } from "react";

/**
 * Oscar's Original Prompt — collapsible glass card.
 * Default collapsed so the page stays scannable; one-tap copy without expanding.
 */
export default function OriginalPrompt({
  title = "Oscar's Original Prompt",
  subtitle = "臺中國家歌劇院 FPV 空拍案例",
  prompt,
}: {
  title?: string;
  subtitle?: string;
  prompt: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function copy() {
    if (typeof navigator === "undefined") return;
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }).catch(() => {});
  }

  return (
    <section className="op-root" aria-label={title}>
      <Styles />
      <div className="op-shell">
        <div className="op-head">
          <div className="op-meta">
            <p className="op-tag">Original Prompt</p>
            <p className="op-title">{title}</p>
            <p className="op-sub">{subtitle}</p>
          </div>
          <div className="op-actions">
            <button
              type="button"
              onClick={copy}
              className={`op-btn op-btn-primary ${copied ? "is-copied" : ""}`}
            >
              {copied ? (
                <>
                  <CopiedSvg />
                  <span>COPIED ✓</span>
                </>
              ) : (
                <>
                  <CopySvg />
                  <span>Copy Original Prompt</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              className="op-btn op-btn-ghost"
              aria-expanded={open}
            >
              <span>{open ? "Hide Full Prompt" : "View Full Prompt"}</span>
              <span aria-hidden className={`op-caret ${open ? "is-open" : ""}`}>›</span>
            </button>
          </div>
        </div>

        {open && (
          <pre className="op-body">
            <code>{prompt}</code>
          </pre>
        )}
      </div>
    </section>
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

function Styles() {
  return (
    <style>{`
      .op-root { color: rgba(255,255,255,0.86); }
      .op-shell {
        padding: 20px 22px;
        background: rgba(255,255,255,0.04);
        backdrop-filter: blur(22px) saturate(125%);
        -webkit-backdrop-filter: blur(22px) saturate(125%);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.07),
          0 16px 48px rgba(0,0,0,0.24);
        border-radius: 16px;
      }
      .op-head {
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
        align-items: center;
      }
      @media (min-width: 760px) {
        .op-head { grid-template-columns: 1fr auto; gap: 18px; }
      }
      .op-meta { min-width: 0; }
      .op-tag {
        margin: 0;
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.4em;
        text-transform: uppercase;
        color: rgba(255,225,140,0.85);
      }
      .op-title {
        margin: 6px 0 0;
        font-size: 17px;
        font-weight: 500;
        color: var(--text);
        letter-spacing: 0.005em;
        line-height: 1.3;
      }
      .op-sub {
        margin: 4px 0 0;
        font-size: 13px;
        color: rgba(255,255,255,0.55);
        line-height: 1.6;
      }
      .op-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .op-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 11px 16px;
        font-family: var(--font-space-mono), monospace;
        font-size: 10.5px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        white-space: nowrap;
        border-radius: 10px;
        border: 1px solid transparent;
        cursor: pointer;
        transition: color .2s, background .2s, border-color .2s;
      }
      .op-btn-primary {
        color: rgba(20,15,5,0.92);
        background: rgba(255,225,140,0.92);
        border-color: rgba(255,225,140,0.92);
      }
      .op-btn-primary:hover {
        background: rgba(255,235,180,1);
      }
      .op-btn-primary.is-copied {
        color: rgba(20,40,30,0.92);
        background: rgba(170,230,200,0.95);
        border-color: rgba(170,230,200,0.95);
      }
      .op-btn-ghost {
        color: rgba(255,255,255,0.85);
        background: rgba(255,255,255,0.025);
        border-color: rgba(255,255,255,0.16);
      }
      .op-btn-ghost:hover {
        color: #fff;
        background: rgba(255,255,255,0.06);
        border-color: rgba(255,255,255,0.3);
      }
      .op-caret {
        display: inline-block;
        font-size: 14px;
        transition: transform .25s ease;
      }
      .op-caret.is-open { transform: rotate(90deg); }
      .op-body {
        margin: 16px 0 0;
        padding: 16px 18px;
        background: rgba(8,8,12,0.5);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 12px;
        font-family: "SF Mono", Menlo, Consolas, monospace;
        font-size: 12.5px;
        line-height: 1.75;
        color: rgba(255,255,255,0.86);
        white-space: pre-wrap;
        word-wrap: break-word;
        max-height: 420px;
        overflow: auto;
      }
    `}</style>
  );
}
