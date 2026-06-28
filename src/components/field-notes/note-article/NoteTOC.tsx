"use client";

import { useEffect, useState } from "react";

export interface TOCEntry {
  id: string;
  num: string;
  label: string;
}

interface NoteTOCProps {
  sections: TOCEntry[];
}

export default function NoteTOC({ sections }: NoteTOCProps) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(sec.id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <aside className="toc-root" aria-label="Table of contents">
      <p className="toc-heading">目錄</p>
      <nav>
        {sections.map((sec) => {
          const isActive = active === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="toc-item"
              data-active={isActive}
            >
              <span className="toc-num">{sec.num}</span>
              <span className="toc-label">{sec.label}</span>
            </button>
          );
        })}
      </nav>

      <style>{`
        .toc-root {
          position: sticky;
          top: 120px;
          padding-left: 28px;
          border-left: 1px solid rgba(255,255,255,0.07);
        }
        .toc-heading {
          font-family: var(--font-space-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin: 0 0 16px;
        }
        .toc-item {
          display: flex;
          align-items: baseline;
          gap: 9px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 7px 0;
          text-align: left;
          width: 100%;
          opacity: 0.75;
          transition: opacity 0.18s;
        }
        .toc-item[data-active="true"] {
          opacity: 1;
        }
        .toc-item:hover { opacity: 1; }
        .toc-num {
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(255,225,140,0.6);
          flex-shrink: 0;
          transition: color 0.18s;
        }
        .toc-item[data-active="true"] .toc-num {
          color: rgba(255,225,140,0.95);
        }
        .toc-label {
          font-family: var(--font-readex), sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.55);
          line-height: 1.35;
          transition: color 0.18s;
        }
        .toc-item[data-active="true"] .toc-label {
          color: rgba(255,255,255,0.92);
        }
      `}</style>
    </aside>
  );
}
