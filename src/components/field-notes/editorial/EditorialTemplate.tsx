"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FieldNote } from "@/data/fieldNotes";
import { getRelatedNotes } from "@/data/fieldNotes";
import type { Block, ImageItem } from "./types";

/* ─────────────────────────────────────────────────────────────────
   TOC — auto-built from { type: "headline" } blocks
   ───────────────────────────────────────────────────────────────── */
function EditorialTOC({ blocks }: { blocks: Block[] }) {
  const headlines = blocks.filter((b): b is Extract<Block, { type: "headline" }> => b.type === "headline");
  const [active, setActive] = useState(headlines[0]?.id ?? "");

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    headlines.forEach((h) => {
      const el = document.getElementById(h.id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(h.id); },
        { rootMargin: "-25% 0px -60% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (headlines.length === 0) return null;

  return (
    <aside className="et-toc">
      <p className="et-toc-title">目錄</p>
      {headlines.map((h) => (
        <button
          key={h.id}
          className="et-toc-item"
          data-active={active === h.id}
          onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          {h.text}
        </button>
      ))}
      <style>{`
        .et-toc { position: sticky; top: 120px; padding-left: 24px; border-left: 1px solid rgba(255,255,255,0.07); }
        .et-toc-title { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.42em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin: 0 0 14px; }
        .et-toc-item { display: block; width: 100%; background: none; border: none; cursor: pointer; text-align: left; padding: 6px 0; font-family: var(--font-readex),sans-serif; font-size: 11.5px; color: rgba(255,255,255,0.45); line-height: 1.35; transition: color 0.15s; }
        .et-toc-item[data-active="true"] { color: rgba(255,255,255,0.92); }
        .et-toc-item:hover { color: rgba(255,255,255,0.78); }
      `}</style>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Block renderers
   ───────────────────────────────────────────────────────────────── */

function HeadlineBlock({ id, text, sub }: { id: string; text: string; sub?: string }) {
  return (
    <div id={id} className="eb-headline">
      <div className="eb-headline-rule" aria-hidden />
      <h2 className="eb-headline-text">{text}</h2>
      {sub && <p className="eb-headline-sub">{sub}</p>}
      <style>{`
        .eb-headline { padding-top: 56px; margin-bottom: 20px; }
        .eb-headline-rule { width: 32px; height: 1px; background: rgba(255,225,140,0.45); margin-bottom: 14px; }
        .eb-headline-text { font-family: var(--font-readex),sans-serif; font-size: clamp(18px,2.5vw,22px); font-weight: 500; letter-spacing: -0.01em; color: rgba(255,255,255,0.97); margin: 0; line-height: 1.2; }
        .eb-headline-sub { font-family: var(--font-readex),sans-serif; font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.45); margin: 6px 0 0; }
      `}</style>
    </div>
  );
}

function TextBlock({ content }: { content: React.ReactNode }) {
  return (
    <div className="eb-text">
      {content}
      <style>{`
        .eb-text { font-family: var(--font-readex),sans-serif; font-size: 16px; line-height: 1.85; color: rgba(255,255,255,0.75); font-weight: 300; margin-bottom: 4px; }
        .eb-text p { margin: 0 0 1em; }
        .eb-text p:last-child { margin-bottom: 0; }
        .eb-text strong { color: rgba(255,255,255,0.96); font-weight: 500; }
        .eb-text em { color: rgba(255,225,140,0.88); font-style: normal; }
      `}</style>
    </div>
  );
}

function CalloutBlock({ content }: { content: React.ReactNode }) {
  return (
    <div className="eb-callout">
      {content}
      <style>{`
        .eb-callout { background: rgba(255,225,140,0.07); border: 1px solid rgba(255,225,140,0.2); border-radius: 8px; padding: 16px 20px; margin: 20px 0; font-family: var(--font-readex),sans-serif; font-size: 14.5px; line-height: 1.7; color: rgba(255,255,255,0.82); font-weight: 300; }
        .eb-callout strong { color: rgba(255,225,140,0.95); font-weight: 500; }
      `}</style>
    </div>
  );
}

function SetupCardBlock({
  title = "OSCAR'S SETUP",
  badge,
  rows,
}: Extract<Block, { type: "setup-card" }>) {
  return (
    <div className="eb-setup">
      <div className="eb-setup-card">
        <p className="eb-setup-title">{title}</p>
        <div className="eb-setup-rule" aria-hidden />
        {rows.map((row, ri) => (
          <div key={ri} className="eb-setup-row">
            {row.map((item) => (
              <div key={item.label} className="eb-setup-item">
                <span className="eb-setup-label">{item.label}</span>
                <span className="eb-setup-value">{item.value}</span>
              </div>
            ))}
          </div>
        ))}
        {badge && (
          <>
            <div className="eb-setup-footer-rule" aria-hidden />
            <p className="eb-setup-badge">{badge}</p>
          </>
        )}
      </div>
      <style>{`
        .eb-setup { display: flex; justify-content: flex-start; margin: 24px 0; }
        .eb-setup-card { background: #0f0f12; border: 1px solid rgba(255,255,255,0.09); border-radius: 12px; padding: 28px 32px; min-width: 300px; max-width: 480px; }
        .eb-setup-title { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.46em; text-transform: uppercase; color: rgba(255,255,255,0.38); margin: 0 0 18px; }
        .eb-setup-rule { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 20px; }
        .eb-setup-row { display: flex; gap: 32px; margin-bottom: 20px; flex-wrap: wrap; }
        .eb-setup-row:last-of-type { margin-bottom: 0; }
        .eb-setup-item { display: flex; flex-direction: column; gap: 4px; }
        .eb-setup-label { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .eb-setup-value { font-family: var(--font-readex),sans-serif; font-size: 20px; font-weight: 600; color: rgba(255,255,255,0.95); letter-spacing: -0.01em; line-height: 1.1; }
        .eb-setup-footer-rule { height: 1px; background: rgba(255,255,255,0.06); margin: 20px 0 12px; }
        .eb-setup-badge { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(255,225,140,0.5); margin: 0; text-align: right; }
      `}</style>
    </div>
  );
}

function PhoneFrame({ item }: { item: ImageItem }) {
  return (
    <div className="eb-phone">
      <div className="eb-phone-img">
        <Image src={item.src} alt={item.alt ?? ""} fill className="object-cover" sizes="200px" />
      </div>
      {item.caption && <p className="eb-phone-cap">{item.caption}</p>}
      <style>{`
        .eb-phone { display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .eb-phone-img { position: relative; width: 180px; aspect-ratio: 9/19.5; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); background: #111; }
        .eb-phone-cap { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.22em; text-align: center; color: rgba(255,255,255,0.38); }
      `}</style>
    </div>
  );
}

function ImageBlock({ item, frame }: Extract<Block, { type: "image" }>) {
  if (frame === "phone") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-start", margin: "24px 0" }}>
        <PhoneFrame item={item} />
      </div>
    );
  }
  const isWide = frame === "wide" || frame === "full";
  return (
    <div className={isWide ? "eb-img-wide" : "eb-img-normal"}>
      <div className="eb-img-wrap">
        <Image src={item.src} alt={item.alt ?? ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 700px" />
      </div>
      {item.caption && <p className="eb-img-cap">{item.caption}</p>}
      <style>{`
        .eb-img-normal { margin: 24px 0; }
        .eb-img-wide   { margin: 24px -24px; }
        .eb-img-wrap   { position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 10px; overflow: hidden; background: #0f0f11; border: 1px solid rgba(255,255,255,0.07); }
        .eb-img-wide .eb-img-wrap { border-radius: 0; border-left: none; border-right: none; }
        .eb-img-cap { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.22em; color: rgba(255,255,255,0.35); margin: 10px 0 0; }
        @media (max-width: 680px) { .eb-img-wide { margin: 24px -16px; } }
      `}</style>
    </div>
  );
}

function ImagePairBlock({
  left, right, leftLabel, rightLabel,
}: Extract<Block, { type: "image-pair" }>) {
  const isPhone = (src: string) => !src.includes("16-9") && !src.includes("wide");
  const leftPhone = isPhone(left.src);

  if (leftPhone) {
    return (
      <div className="eb-pair-phones">
        <div className="eb-pair-phone-wrap">
          <PhoneFrame item={{ ...left, caption: leftLabel ?? left.caption }} />
        </div>
        <div className="eb-pair-phone-wrap">
          <PhoneFrame item={{ ...right, caption: rightLabel ?? right.caption }} />
        </div>
        <style>{`
          .eb-pair-phones { display: flex; gap: 28px; flex-wrap: wrap; margin: 24px 0; align-items: flex-start; justify-content: flex-start; }
          .eb-pair-phone-wrap { }
        `}</style>
      </div>
    );
  }

  return (
    <div className="eb-pair">
      <figure className="eb-pair-fig">
        <div className="eb-pair-img">
          <Image src={left.src} alt={left.alt ?? leftLabel ?? ""} fill className="object-cover" sizes="50vw" />
        </div>
        {(leftLabel ?? left.caption) && <figcaption className="eb-pair-cap eb-pair-cap-l">{leftLabel ?? left.caption}</figcaption>}
      </figure>
      <figure className="eb-pair-fig">
        <div className="eb-pair-img">
          <Image src={right.src} alt={right.alt ?? rightLabel ?? ""} fill className="object-cover" sizes="50vw" />
        </div>
        {(rightLabel ?? right.caption) && <figcaption className="eb-pair-cap eb-pair-cap-r">{rightLabel ?? right.caption}</figcaption>}
      </figure>
      <style>{`
        .eb-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 24px 0; }
        .eb-pair-fig { margin: 0; }
        .eb-pair-img { position: relative; width: 100%; aspect-ratio: 3/2; border-radius: 8px; overflow: hidden; background: #111; border: 1px solid rgba(255,255,255,0.07); }
        .eb-pair-cap { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.22em; color: rgba(255,255,255,0.38); margin: 8px 0 0; }
        .eb-pair-cap-r { text-align: right; }
        @media (max-width: 480px) { .eb-pair { grid-template-columns: 1fr; } .eb-pair-cap-r { text-align: left; } }
      `}</style>
    </div>
  );
}

function CompareBlock({ before, after, title }: Extract<Block, { type: "compare" }>) {
  return (
    <div className="eb-compare">
      {title && <p className="eb-compare-title">{title}</p>}
      <div className="eb-compare-grid">
        {[{ item: before, pill: "BEFORE" }, { item: after, pill: "AFTER" }].map(({ item, pill }) => (
          <div key={pill} className="eb-compare-card">
            <div className="eb-compare-img">
              {item.src ? (
                <Image src={item.src} alt={item.alt ?? pill} fill className="object-cover" sizes="50vw" />
              ) : (
                <div className="eb-compare-placeholder">IMAGE COMING SOON</div>
              )}
            </div>
            <div className="eb-compare-footer">
              <span className="eb-compare-pill" data-type={pill}>{pill}</span>
              {item.caption && <span className="eb-compare-cap">{item.caption}</span>}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .eb-compare { margin: 24px 0; }
        .eb-compare-title { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase; color: rgba(255,255,255,0.38); margin: 0 0 12px; }
        .eb-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .eb-compare-card { background: #0a0a0c; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; overflow: hidden; }
        .eb-compare-img { position: relative; width: 100%; aspect-ratio: 16/10; background: #111; }
        .eb-compare-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg,#111 0%,#1a1a1e 100%); font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.28em; color: rgba(255,255,255,0.18); }
        .eb-compare-footer { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; }
        .eb-compare-pill { font-family: var(--font-space-mono),monospace; font-size: 8.5px; letter-spacing: 0.32em; text-transform: uppercase; }
        .eb-compare-pill[data-type="BEFORE"] { color: rgba(255,255,255,0.55); }
        .eb-compare-pill[data-type="AFTER"]  { color: rgba(255,225,140,0.9); }
        .eb-compare-cap { font-family: var(--font-readex),sans-serif; font-size: 11px; color: rgba(255,255,255,0.38); }
        @media (max-width: 480px) { .eb-compare-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

function OscarNotesBlock({ content }: Extract<Block, { type: "oscar-notes" }>) {
  return (
    <div className="eb-oscar">
      <div className="eb-oscar-head">
        <span className="eb-oscar-sig" style={{ fontFamily: "Snell Roundhand, Brush Script MT, cursive", fontStyle: "italic" }}>
          Oscar&apos;s Notes
        </span>
        <span className="eb-oscar-rule" aria-hidden />
      </div>
      <div className="eb-oscar-body">{content}</div>
      <style>{`
        .eb-oscar { margin-top: 52px; padding: 24px 24px 28px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; }
        .eb-oscar-head { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
        .eb-oscar-sig { font-size: 22px; color: rgba(255,225,140,0.85); line-height: 1; flex-shrink: 0; }
        .eb-oscar-rule { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .eb-oscar-body { font-family: var(--font-readex),sans-serif; font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.68); font-weight: 300; }
        .eb-oscar-body p { margin: 0 0 0.9em; }
        .eb-oscar-body p:last-child { margin: 0; }
      `}</style>
    </div>
  );
}

function ClosingBlock({ content }: Extract<Block, { type: "closing" }>) {
  return (
    <div className="eb-closing">
      {content}
      <style>{`
        .eb-closing { margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); font-family: var(--font-readex),sans-serif; font-size: 15px; line-height: 1.85; color: rgba(255,255,255,0.65); font-weight: 300; }
        .eb-closing p { margin: 0 0 1em; }
        .eb-closing p:last-child { margin: 0; }
      `}</style>
    </div>
  );
}

function FAQBlock({ items }: Extract<Block, { type: "faq" }>) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="eb-faq">
      {items.map((item, i) => (
        <div key={i} className="eb-faq-row">
          <button className="eb-faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{item.q}</span>
            <span className="eb-faq-icon" aria-hidden>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <div className="eb-faq-a"><p>{item.a}</p></div>}
        </div>
      ))}
      <style>{`
        .eb-faq { }
        .eb-faq-row { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .eb-faq-row:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
        .eb-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding: 16px 0; font-family: var(--font-readex),sans-serif; font-size: 14.5px; color: rgba(255,255,255,0.85); text-align: left; }
        .eb-faq-icon { color: rgba(255,255,255,0.35); font-size: 18px; flex-shrink: 0; font-family: var(--font-geist-sans),sans-serif; }
        .eb-faq-a { padding: 0 0 18px 0; }
        .eb-faq-a p { font-family: var(--font-readex),sans-serif; font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.58); font-weight: 300; margin: 0; }
      `}</style>
    </div>
  );
}

function RelatedBlock({ slugs }: Extract<Block, { type: "related" }>) {
  const notes = getRelatedNotes(slugs);
  if (!notes.length) return null;
  return (
    <div className="eb-related">
      <div className="eb-related-grid">
        {notes.map((note) => (
          <Link key={note.slug} href={`/field-notes/${note.slug}`} className="eb-related-card">
            <div className="eb-related-img">
              {note.heroImage && <Image src={note.heroImage} alt={note.title} fill className="object-cover" sizes="320px" />}
            </div>
            <div className="eb-related-body">
              <span className="eb-related-cat">{note.categoryLabel}</span>
              <p className="eb-related-title">{note.title}</p>
              <span className="eb-related-read">Read →</span>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        .eb-related { margin-top: 8px; }
        .eb-related-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(240px,1fr)); gap: 12px; }
        .eb-related-card { display: flex; flex-direction: column; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; overflow: hidden; text-decoration: none; transition: border-color 0.18s; }
        .eb-related-card:hover { border-color: rgba(255,255,255,0.15); }
        .eb-related-img { position: relative; width: 100%; aspect-ratio: 16/9; background: #111; }
        .eb-related-body { padding: 12px 14px 14px; display: flex; flex-direction: column; gap: 5px; }
        .eb-related-cat { font-family: var(--font-space-mono),monospace; font-size: 8.5px; letter-spacing: 0.32em; text-transform: uppercase; color: rgba(255,225,140,0.75); }
        .eb-related-title { font-family: var(--font-readex),sans-serif; font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.88); line-height: 1.4; margin: 0; }
        .eb-related-read { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.2em; color: rgba(255,225,140,0.6); }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Block renderer dispatcher
   ───────────────────────────────────────────────────────────────── */
function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "headline":    return <HeadlineBlock {...block} />;
    case "text":        return <TextBlock {...block} />;
    case "callout":     return <CalloutBlock {...block} />;
    case "setup-card":  return <SetupCardBlock {...block} />;
    case "image":       return <ImageBlock {...block} />;
    case "image-pair":  return <ImagePairBlock {...block} />;
    case "compare":     return <CompareBlock {...block} />;
    case "oscar-notes": return <OscarNotesBlock {...block} />;
    case "closing":     return <ClosingBlock {...block} />;
    case "faq":         return <FAQBlock {...block} />;
    case "related":     return <RelatedBlock {...block} />;
    default:            return null;
  }
}

/* ─────────────────────────────────────────────────────────────────
   Main template
   ───────────────────────────────────────────────────────────────── */
interface EditorialTemplateProps {
  note:   FieldNote;
  blocks: Block[];
}

export default function EditorialTemplate({ note, blocks }: EditorialTemplateProps) {
  return (
    <>
      {/* Nav */}
      <header className="et-nav" aria-label="Article navigation">
        <div className="et-nav-inner">
          <Link href="/field-notes" className="et-back">
            <span aria-hidden>←</span>
            <span>Field Notes</span>
          </Link>
          <div className="et-breadcrumb" aria-hidden>{note.categoryLabel}</div>
          <a href="https://www.instagram.com/minehoooo.arw/" target="_blank" rel="noopener noreferrer" className="et-ig">
            @minehoooo.arw
          </a>
        </div>
      </header>

      {/* Article hero */}
      <div className="et-hero">
        <div className="et-hero-inner">
          <div className="et-meta">
            <span className="et-cat">{note.categoryLabel}</span>
            <span className="et-dot" aria-hidden>·</span>
            <span className="et-date">{note.date.slice(0, 7)}</span>
            <span className="et-dot" aria-hidden>·</span>
            <span className="et-time">{note.readingTime} min</span>
          </div>
          <h1 className="et-title">{note.title}</h1>
          {note.subtitle && <p className="et-subtitle">{note.subtitle}</p>}
          <div className="et-author">
            <span className="et-by">By</span>
            <span className="et-sig" style={{ fontFamily: "Snell Roundhand, Brush Script MT, cursive", fontStyle: "italic" }}>Oscar Lai</span>
            <span className="et-role">Director · DP</span>
            <span className="et-loc">Taichung · TW</span>
          </div>
        </div>
      </div>

      {/* Body: article + TOC */}
      <div className="et-body">
        <article className="et-article">
          {blocks.map((block, i) => (
            <RenderBlock key={i} block={block} />
          ))}
          {/* Footer */}
          <div className="et-footer">
            <span>© MINEH4O.ARW</span>
            <a href="https://www.instagram.com/minehoooo.arw/" target="_blank" rel="noopener noreferrer">@minehoooo.arw →</a>
          </div>
        </article>
        <div className="et-toc-col">
          <EditorialTOC blocks={blocks} />
        </div>
      </div>

      <style>{`
        /* Nav */
        .et-nav { position: sticky; top: 0; z-index: 40; background: rgba(10,10,12,0.84); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .et-nav-inner { max-width: 1160px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; gap: 14px; }
        .et-back { display: flex; align-items: center; gap: 7px; text-decoration: none; color: rgba(255,255,255,0.6); font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; transition: color .15s; flex-shrink: 0; }
        .et-back:hover { color: rgba(255,255,255,.95); }
        .et-breadcrumb { flex: 1; font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        .et-ig { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(255,225,140,0.75); text-decoration: none; border: 1px solid rgba(255,225,140,0.22); border-radius: 3px; padding: 5px 10px; transition: color .15s, border-color .15s; flex-shrink: 0; }
        .et-ig:hover { color: rgba(255,225,140,1); border-color: rgba(255,225,140,0.5); }

        /* Hero */
        .et-hero { border-bottom: 1px solid rgba(255,255,255,0.05); }
        .et-hero-inner { max-width: 760px; margin: 0 auto; padding: 52px 24px 36px; }
        .et-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; }
        .et-cat { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(255,225,140,0.88); border-bottom: 1px solid rgba(255,225,140,0.38); padding-bottom: 1px; }
        .et-dot { color: rgba(255,255,255,.22); font-size: 12px; }
        .et-date, .et-time { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.22em; color: rgba(255,255,255,0.35); }
        .et-title { font-family: var(--font-readex),sans-serif; font-size: clamp(24px,5vw,38px); font-weight: 600; letter-spacing: -0.02em; color: rgba(255,255,255,.97); margin: 0 0 10px; line-height: 1.22; }
        .et-subtitle { font-family: var(--font-readex),sans-serif; font-size: 15px; font-weight: 300; color: rgba(255,255,255,.5); margin: 0 0 28px; line-height: 1.5; }
        .et-author { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .et-by { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.2em; color: rgba(255,255,255,0.28); }
        .et-sig { font-size: 18px; color: rgba(255,225,140,.85); line-height: 1; }
        .et-role { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .et-loc { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,255,255,0.25); }

        /* Body */
        .et-body { max-width: 1160px; margin: 0 auto; padding: 0 24px 96px; display: grid; grid-template-columns: minmax(0,700px) 1fr; gap: 0 48px; align-items: start; }
        .et-article { min-width: 0; padding-top: 8px; }
        .et-toc-col { padding-top: 64px; }
        .et-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 64px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.07); font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,255,255,0.32); }
        .et-footer a { color: rgba(255,225,140,0.6); text-decoration: none; transition: color .15s; }
        .et-footer a:hover { color: rgba(255,225,140,1); }

        @media (max-width: 1023px) { .et-body { grid-template-columns: minmax(0,700px); max-width: 760px; } .et-toc-col { display: none; } }
        @media (max-width: 680px) { .et-body { padding: 0 16px 72px; } .et-hero-inner { padding: 36px 16px 28px; } .et-nav-inner { padding: 12px 16px; } }
      `}</style>
    </>
  );
}
