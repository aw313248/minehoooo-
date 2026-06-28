"use client";

import { useState } from "react";

export interface FAQItem {
  q: string;
  a: string;
}

interface NoteFAQProps {
  items: FAQItem[];
}

function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-row" data-open={open}>
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="faq-q-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="faq-q-text">{item.q}</span>
        <span className="faq-chevron" aria-hidden>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="faq-answer">
          <p>{item.a}</p>
        </div>
      )}

      <style>{`
        .faq-row {
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .faq-row:first-child {
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .faq-question {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: baseline;
          gap: 14px;
          padding: 18px 0;
          text-align: left;
          transition: opacity 0.15s;
        }
        .faq-question:hover { opacity: 0.88; }
        .faq-q-num {
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(255,225,140,0.7);
          flex-shrink: 0;
        }
        .faq-q-text {
          font-family: var(--font-readex), sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: rgba(255,255,255,0.88);
          line-height: 1.4;
          flex: 1;
        }
        .faq-chevron {
          color: rgba(255,255,255,0.38);
          font-size: 18px;
          font-weight: 300;
          flex-shrink: 0;
          line-height: 1;
          font-family: var(--font-geist-sans), sans-serif;
        }
        .faq-answer {
          padding: 0 0 20px 38px;
        }
        .faq-answer p {
          font-family: var(--font-readex), sans-serif;
          font-size: 14.5px;
          line-height: 1.75;
          color: rgba(255,255,255,0.65);
          font-weight: 300;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export default function NoteFAQ({ items }: NoteFAQProps) {
  return (
    <div className="faq-root">
      {items.map((item, i) => (
        <FAQRow key={i} item={item} index={i} />
      ))}
    </div>
  );
}
