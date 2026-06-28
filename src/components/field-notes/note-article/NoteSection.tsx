import type { ReactNode } from "react";

interface NoteSectionProps {
  num: string;       // "01"–"06"
  label: string;     // 中文標題, e.g. "為什麼我會開始這樣拍"
  id: string;        // TOC anchor
  children: ReactNode;
}

export default function NoteSection({ num, label, id, children }: NoteSectionProps) {
  return (
    <section id={id} className="note-section">
      <div className="note-section-head" aria-hidden>
        <span className="note-section-rule" />
        <span className="note-section-num">{num}</span>
        <span className="note-section-dot">·</span>
        <h2 className="note-section-label">{label}</h2>
      </div>
      <div className="note-section-body">{children}</div>

      <style>{`
        .note-section {
          padding-top: 64px;
        }
        .note-section-head {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 32px;
        }
        .note-section-rule {
          display: inline-block;
          width: 24px;
          height: 1px;
          background: rgba(255,225,140,0.55);
          flex-shrink: 0;
          position: relative;
          top: -4px;
        }
        .note-section-num {
          font-family: var(--font-space-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: rgba(255,225,140,0.85);
          flex-shrink: 0;
        }
        .note-section-dot {
          color: rgba(255,255,255,0.28);
          font-size: 13px;
          flex-shrink: 0;
        }
        .note-section-label {
          font-family: var(--font-readex), sans-serif;
          font-size: clamp(18px, 2.2vw, 22px);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.95);
          margin: 0;
          line-height: 1.2;
        }
        .note-section-body {
          font-family: var(--font-readex), sans-serif;
          font-size: 16px;
          line-height: 1.85;
          color: rgba(255,255,255,0.78);
          font-weight: 300;
        }
        .note-section-body p {
          margin: 0 0 1.2em;
        }
        .note-section-body p:last-child {
          margin-bottom: 0;
        }
        .note-section-body strong {
          color: rgba(255,255,255,0.96);
          font-weight: 500;
        }
        .note-section-body em {
          color: rgba(255,225,140,0.9);
          font-style: normal;
        }
      `}</style>
    </section>
  );
}

/* Callout box — use for "真正重要的是這個" style tips */
export function NoteCallout({ children, icon }: { children: ReactNode; icon?: string }) {
  return (
    <div
      style={{
        background: "rgba(255,225,140,0.07)",
        border: "1px solid rgba(255,225,140,0.22)",
        borderRadius: 8,
        padding: "14px 18px",
        margin: "1.5em 0",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        fontFamily: "var(--font-readex), sans-serif",
        fontSize: 14,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.82)",
        fontWeight: 300,
      }}
    >
      {icon && <span style={{ flexShrink: 0, fontSize: 16 }}>{icon}</span>}
      <div>{children}</div>
    </div>
  );
}

/* Pull quote — use inside <NoteSection> */
export function NotePullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote
      style={{
        margin: "2em 0",
        paddingLeft: 20,
        borderLeft: "2px solid rgba(255,225,140,0.5)",
        color: "rgba(255,255,255,0.9)",
        fontSize: "clamp(17px, 2vw, 20px)",
        fontStyle: "italic",
        lineHeight: 1.65,
        fontWeight: 300,
        fontFamily: "var(--font-readex), sans-serif",
      }}
    >
      {children}
    </blockquote>
  );
}
