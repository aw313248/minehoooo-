"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollUnlock from "@/components/ScrollUnlock";
import { fieldNotes, type NoteCategory } from "@/data/fieldNotes";
import HiggsfieldRef from "@/components/HiggsfieldRef";
import { useEffect } from "react";

// 兩個入口：AI 工具 ／ 旅遊（Kino 拍片與旅行筆記都算旅遊）
const GROUPS: { key: "ALL" | "AI" | "TRAVEL"; label: string; cats: NoteCategory[] }[] = [
  { key: "ALL",    label: "全部", cats: [] },
  { key: "AI",     label: "AI",   cats: ["AI", "COLOR", "GEAR"] },
  { key: "TRAVEL", label: "旅遊", cats: ["KINO", "TRAVEL", "STREET"] },
];

export default function FieldNotesIndex() {
  const [active, setActive] = useState<"ALL" | "AI" | "TRAVEL">("ALL");
  const [views, setViews] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetch(`/api/views?slugs=${fieldNotes.map(n => n.slug).join(",")}`)
      .then(r => r.json())
      .then(d => { if (d.views) setViews(d.views); })
      .catch(() => {});
  }, []);

  const sorted = [...fieldNotes].sort((a, b) => b.date.localeCompare(a.date));

  const activeGroup = GROUPS.find((g) => g.key === active);
  const visible =
    active === "ALL"
      ? sorted
      : sorted.filter((n) => activeGroup?.cats.includes(n.category));

  const hasActive = fieldNotes.length > 0;

  return (
    <main className="fn-root" style={{ overflowY: "auto" }}>
      <ScrollUnlock />

      {/* ── Sticky nav ── */}
      <header className="fn-nav" aria-label="Site navigation">
        <div className="fn-nav-inner">
          <Link href="/" className="fn-back">
            <span aria-hidden>←</span>
            <span>MINEH4O</span>
          </Link>
          <a
            href="https://www.instagram.com/minehoooo.arw/"
            target="_blank"
            rel="noopener noreferrer"
            className="fn-ig"
          >
            @minehoooo.arw
          </a>
        </div>
      </header>

      <div className="fn-body">
        {/* ── Masthead ── */}
        <div className="fn-masthead">
          <p className="fn-eyebrow">06 — Field Notes</p>
          <h1 className="fn-h1">現場筆記</h1>
          <p className="fn-sub">
            Oscar 的影像工作筆記，Kino 設定、電影感色調、AI 工具、街拍思維——
            <br />
            從拿起相機到輸出的完整過程
          </p>
        </div>

        {/* ── Category tabs ── */}
        {hasActive && (
          <div className="fn-tabs-wrap" role="tablist" aria-label="文章分類">
            {GROUPS.map((cat) => {
              const count =
                cat.key === "ALL"
                  ? fieldNotes.length
                  : fieldNotes.filter((n) => cat.cats.includes(n.category)).length;
              if (cat.key !== "ALL" && count === 0) return null;
              return (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={active === cat.key}
                  onClick={() => setActive(cat.key)}
                  className="fn-tab"
                  data-active={active === cat.key}
                >
                  {cat.label}
                  <span className="fn-tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Higgsfield 邀請橫幅（筆記最外層）── */}
        <HiggsfieldRef variant="banner" />

        {/* ── Article list ── */}
        <div className="fn-list">
          {visible.length === 0 && (
            <p className="fn-empty">這個分類的筆記還在路上，敬請期待</p>
          )}

          {visible.map((note, i) => (
            <Link
              key={note.slug}
              href={`/field-notes/${note.slug}`}
              className="fn-card"
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            >
              {/* Image */}
              <div className="fn-card-img">
                {note.heroImage ? (
                  <Image
                    src={note.heroImage}
                    alt={note.title}
                    fill
                    className="object-cover fn-img"
                    sizes="(max-width: 680px) 100vw, 320px"
                  />
                ) : (
                  <div className="fn-img-placeholder">{note.categoryLabel}</div>
                )}
                {/* Category overlay */}
                <span className="fn-card-cat">{note.categoryLabel}</span>
              </div>

              {/* Meta */}
              <div className="fn-card-body">
                <div className="fn-card-meta">
                  <span className="fn-card-date">{note.date}</span>
                  <span className="fn-card-sep" aria-hidden>·</span>
                  <span className="fn-card-time">{note.readingTime} min</span>
                  {views && typeof views[note.slug] === "number" && (
                    <>
                      <span className="fn-card-sep" aria-hidden>·</span>
                      <span className="fn-card-views">{views[note.slug].toLocaleString()} views</span>
                    </>
                  )}
                  {note.tool && (
                    <>
                      <span className="fn-card-sep" aria-hidden>·</span>
                      <span className="fn-card-tool">{note.tool}</span>
                    </>
                  )}
                </div>
                <h2 className="fn-card-title">{note.title}</h2>
                {note.subtitle && (
                  <p className="fn-card-subtitle">{note.subtitle}</p>
                )}
                <p className="fn-card-excerpt">{note.excerpt}</p>
                <span className="fn-card-read">Read →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Back CTA ── */}
        <div className="fn-footer">
          <Link href="/" className="fn-footer-back">
            ← 回到 MINEH4O 作品集
          </Link>
        </div>
      </div>

      <style>{`
        .fn-root {
          min-height: 100vh;
          background: #000;
          color: #fff;
        }

        /* ── Nav ── */
        .fn-nav {
          position: sticky;
          top: 0;
          z-index: 30;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .fn-nav-inner {
          max-width: 880px;
          margin: 0 auto;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .fn-back {
          display: flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          color: rgba(255,255,255,0.7);
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          transition: color 0.15s;
        }
        .fn-back:hover { color: rgba(255,255,255,0.95); }
        .fn-ig {
          font-family: var(--font-space-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,225,140,0.7);
          text-decoration: none;
          transition: color 0.15s;
        }
        .fn-ig:hover { color: rgba(255,225,140,1); }

        /* ── Body ── */
        .fn-body {
          max-width: 880px;
          margin: 0 auto;
          padding: 52px 24px 80px;
        }

        /* ── Masthead ── */
        .fn-masthead { margin-bottom: 40px; }
        .fn-eyebrow {
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          margin: 0 0 14px;
        }
        .fn-h1 {
          font-family: var(--font-readex), sans-serif;
          font-size: clamp(32px, 8vw, 60px);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: rgba(255,255,255,0.97);
          margin: 0 0 16px;
          line-height: 1.1;
        }
        .fn-sub {
          font-family: var(--font-readex), sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          margin: 0;
          max-width: 520px;
        }

        /* ── Tabs ── */
        .fn-tabs-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 36px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .fn-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          color: rgba(255,255,255,0.55);
          font-family: var(--font-readex), sans-serif;
          font-size: 12px;
          font-weight: 400;
          padding: 6px 14px;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          letter-spacing: 0.01em;
        }
        .fn-tab:hover {
          color: rgba(255,255,255,0.9);
          border-color: rgba(255,255,255,0.28);
        }
        .fn-tab[data-active="true"] {
          color: #000;
          background: rgba(255,255,255,0.92);
          border-color: rgba(255,255,255,0.92);
        }
        .fn-tab-count {
          font-family: var(--font-space-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          opacity: 0.6;
        }

        /* ── Cards ── */
        .fn-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .fn-empty {
          font-family: var(--font-readex), sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.38);
          text-align: center;
          padding: 48px 0;
        }
        .fn-card {
          display: grid;
          grid-template-columns: 280px 1fr;
          background: #0a0a0c;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
          animation: fn-fadein 0.5s ease both;
        }
        .fn-card:hover {
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.025);
        }
        .fn-card-img {
          position: relative;
          aspect-ratio: 4 / 3;
          background: #111;
          overflow: hidden;
          flex-shrink: 0;
        }
        .fn-img {
          transition: transform 0.5s var(--ease-out);
        }
        .fn-card:hover .fn-img {
          transform: scale(1.04);
        }
        .fn-img-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #111 0%, #1a1a1e 100%);
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
        }
        .fn-card-cat {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-space-mono), monospace;
          font-size: 8.5px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(255,225,140,0.92);
          background: rgba(0,0,0,0.62);
          backdrop-filter: blur(6px);
          padding: 4px 8px;
          border-radius: 3px;
          border: 1px solid rgba(255,225,140,0.22);
        }
        .fn-card-body {
          padding: 22px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .fn-card-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .fn-card-date, .fn-card-time {
          font-family: var(--font-space-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.35);
        }
        .fn-card-sep { color: rgba(255,255,255,0.2); font-size: 11px; }
        .fn-card-views { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.18em; color: rgba(255,225,140,0.75); }
        .fn-card-tool {
          font-family: var(--font-space-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 3px;
          padding: 2px 7px;
        }
        .fn-card-title {
          font-family: var(--font-readex), sans-serif;
          font-size: clamp(16px, 2.2vw, 20px);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.94);
          margin: 4px 0 0;
        }
        .fn-card-subtitle {
          font-family: var(--font-readex), sans-serif;
          font-size: 12.5px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }
        .fn-card-excerpt {
          font-family: var(--font-readex), sans-serif;
          font-size: 13.5px;
          line-height: 1.65;
          color: rgba(255,255,255,0.52);
          margin: 4px 0 0;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .fn-card-read {
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(255,225,140,0.65);
          margin-top: 6px;
          transition: color 0.15s;
        }
        .fn-card:hover .fn-card-read { color: rgba(255,225,140,1); }

        /* ── Footer ── */
        .fn-footer {
          margin-top: 52px;
          display: flex;
          justify-content: center;
        }
        .fn-footer-back {
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 10px 22px;
          transition: color 0.15s, border-color 0.15s;
        }
        .fn-footer-back:hover { color: rgba(255,255,255,0.9); border-color: rgba(255,255,255,0.35); }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .fn-body { padding: 36px 16px 64px; }
          .fn-card {
            grid-template-columns: 1fr;
          }
          .fn-card-img {
            aspect-ratio: 16 / 9;
          }
          .fn-card-body { padding: 16px; }
          .fn-nav-inner { padding: 12px 16px; }
        }

        @keyframes fn-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
