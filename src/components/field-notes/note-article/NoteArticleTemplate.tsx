import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { FieldNote } from "@/data/fieldNotes";
import NoteSection, { NotePullQuote, NoteCallout } from "./NoteSection";
import NoteSettings from "./NoteSettings";
import NoteBeforeAfter from "./NoteBeforeAfter";
import NoteFAQ from "./NoteFAQ";
import NoteRelated from "./NoteRelated";
import NoteTOC, { type TOCEntry } from "./NoteTOC";
import type { SettingGroup } from "./NoteSettings";
import type { BeforeAfterItem } from "./NoteBeforeAfter";
import type { FAQItem } from "./NoteFAQ";

export type { SettingGroup, BeforeAfterItem, FAQItem };
export { NotePullQuote, NoteCallout };

export interface NoteContent {
  story:             ReactNode;
  settings?:         SettingGroup[];
  settingsPreamble?: ReactNode;   // 設定前的說明文字
  mindset:           ReactNode;
  beforeAfter?: {
    before:  BeforeAfterItem;
    after:   BeforeAfterItem;
    title?:  string;
  };
  faq:               FAQItem[];
  relatedSlugs?:     string[];
  closing?:          ReactNode;   // 結語，放在文末 footer 前
}

const TOC_SECTIONS: TOCEntry[] = [
  { id: "story",        num: "01", label: "為什麼我會這樣拍" },
  { id: "settings",     num: "02", label: "我的實際設定" },
  { id: "mindset",      num: "03", label: "拍攝思維" },
  { id: "before-after", num: "04", label: "Before / After" },
  { id: "faq",          num: "05", label: "常見問題" },
  { id: "more",         num: "06", label: "延伸閱讀" },
];

interface NoteArticleTemplateProps {
  note:    FieldNote;
  content: NoteContent;
}

export default function NoteArticleTemplate({ note, content }: NoteArticleTemplateProps) {
  const hasBefore = !!content.beforeAfter;
  const hasSettings = !!(content.settings && content.settings.length > 0);
  const hasRelated = !!(content.relatedSlugs && content.relatedSlugs.length > 0);

  const visibleTOC = TOC_SECTIONS.filter((s) => {
    if (s.id === "settings" && !hasSettings) return false;
    if (s.id === "before-after" && !hasBefore) return false;
    if (s.id === "more" && !hasRelated) return false;
    return true;
  });

  return (
    <>
      {/* ── Sticky mini-nav ─── */}
      <header className="nat-nav" aria-label="Article navigation">
        <div className="nat-nav-inner">
          <Link href="/field-notes" className="nat-back">
            <span aria-hidden>←</span>
            <span>Field Notes</span>
          </Link>
          <div className="nat-breadcrumb" aria-hidden>
            <span>{note.categoryLabel}</span>
          </div>
          <a
            href="https://www.instagram.com/minehoooo.arw/"
            target="_blank"
            rel="noopener noreferrer"
            className="nat-cta"
          >
            DM @minehoooo.arw
          </a>
        </div>
      </header>

      {/* ── Article hero / header ── */}
      <div className="nat-hero-wrap">
        <div className="nat-hero-inner">
          {/* Category + reading time */}
          <div className="nat-meta-row">
            <span className="nat-cat">{note.categoryLabel}</span>
            <span className="nat-dot" aria-hidden>·</span>
            <span className="nat-date">{note.date.slice(0, 7)}</span>
            <span className="nat-dot" aria-hidden>·</span>
            <span className="nat-time">{note.readingTime} min read</span>
          </div>

          {/* Title */}
          <h1 className="nat-title">{note.title}</h1>
          {note.subtitle && <p className="nat-subtitle">{note.subtitle}</p>}

          {/* Hero image */}
          <div className="nat-hero-img-wrap">
            <div className="nat-hero-img">
              {note.heroImage ? (
                <Image
                  src={note.heroImage}
                  alt={note.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              ) : (
                <div className="nat-hero-placeholder">
                  <span>{note.categoryLabel}</span>
                </div>
              )}
            </div>
          </div>

          {/* Author line */}
          <div className="nat-author-row">
            <div className="nat-author-left">
              <span className="nat-author-by">By</span>
              <span
                className="nat-author-sig"
                style={{ fontFamily: "Snell Roundhand, Brush Script MT, cursive", fontStyle: "italic" }}
              >
                Oscar Lai
              </span>
              <span className="nat-author-role">Director · DP</span>
            </div>
            <span className="nat-author-loc">Taichung · TW</span>
          </div>
        </div>
      </div>

      {/* ── Body: article column + sticky TOC ── */}
      <div className="nat-body-grid">
        {/* Main article column */}
        <article className="nat-article">

          {/* 01 · Story */}
          <NoteSection num="01" label="為什麼我會開始這樣拍" id="story">
            {content.story}
          </NoteSection>

          {/* 02 · Settings */}
          {hasSettings && (
            <NoteSection num="02" label="我的實際設定" id="settings">
              {content.settingsPreamble && (
                <div style={{ marginBottom: 24 }}>{content.settingsPreamble}</div>
              )}
              <NoteSettings groups={content.settings!} />
            </NoteSection>
          )}

          {/* 03 · Mindset */}
          <NoteSection num="03" label="拍攝思維（不是只教按鈕）" id="mindset">
            {content.mindset}
          </NoteSection>

          {/* 04 · Before / After */}
          {hasBefore && (
            <NoteSection num="04" label="Before / After" id="before-after">
              <NoteBeforeAfter
                before={content.beforeAfter!.before}
                after={content.beforeAfter!.after}
                title={content.beforeAfter!.title}
              />
            </NoteSection>
          )}

          {/* 05 · FAQ */}
          <NoteSection num="05" label="常見問題" id="faq">
            <NoteFAQ items={content.faq} />
          </NoteSection>

          {/* 06 · Related */}
          {hasRelated && (
            <NoteSection num="06" label="延伸閱讀" id="more">
              <NoteRelated slugs={content.relatedSlugs!} currentSlug={note.slug} />
            </NoteSection>
          )}

          {/* Personal closing — above the footer rule */}
          {content.closing && (
            <div className="nat-closing">{content.closing}</div>
          )}

          {/* Article footer */}
          <div className="nat-article-footer">
            <span>© MINEH4O.ARW</span>
            <a
              href="https://www.instagram.com/minehoooo.arw/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @minehoooo.arw →
            </a>
          </div>
        </article>

        {/* Sticky TOC — desktop only */}
        <div className="nat-toc-col">
          <NoteTOC sections={visibleTOC} />
        </div>
      </div>

      <TemplateStyles />
    </>
  );
}

function TemplateStyles() {
  return (
    <style>{`
      /* Nav */
      .nat-nav {
        position: sticky;
        top: 0;
        z-index: 40;
        background: rgba(10,10,12,0.82);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .nat-nav-inner {
        max-width: 1140px;
        margin: 0 auto;
        padding: 14px 24px;
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .nat-back {
        display: flex;
        align-items: center;
        gap: 7px;
        text-decoration: none;
        color: rgba(255,255,255,0.65);
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        transition: color 0.15s;
        flex-shrink: 0;
      }
      .nat-back:hover { color: rgba(255,255,255,0.95); }
      .nat-breadcrumb {
        flex: 1;
        font-family: var(--font-space-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.34em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.35);
      }
      .nat-cta {
        font-family: var(--font-space-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(255,225,140,0.8);
        text-decoration: none;
        border: 1px solid rgba(255,225,140,0.25);
        border-radius: 3px;
        padding: 5px 10px;
        transition: color 0.15s, border-color 0.15s;
        flex-shrink: 0;
      }
      .nat-cta:hover { color: rgba(255,225,140,1); border-color: rgba(255,225,140,0.5); }

      /* Hero */
      .nat-hero-wrap {
        border-bottom: 1px solid rgba(255,255,255,0.06);
        padding-bottom: 0;
      }
      .nat-hero-inner {
        max-width: 768px;
        margin: 0 auto;
        padding: 52px 24px 0;
      }
      .nat-meta-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
      }
      .nat-cat {
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.34em;
        text-transform: uppercase;
        color: rgba(255,225,140,0.88);
        border-bottom: 1px solid rgba(255,225,140,0.4);
        padding-bottom: 1px;
      }
      .nat-dot {
        color: rgba(255,255,255,0.25);
        font-size: 12px;
      }
      .nat-date, .nat-time {
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: rgba(255,255,255,0.38);
      }
      .nat-title {
        font-family: var(--font-readex), sans-serif;
        font-size: clamp(26px, 5vw, 40px);
        font-weight: 600;
        line-height: 1.22;
        letter-spacing: -0.02em;
        color: rgba(255,255,255,0.97);
        margin: 0 0 12px;
      }
      .nat-subtitle {
        font-family: var(--font-readex), sans-serif;
        font-size: 16px;
        font-weight: 300;
        color: rgba(255,255,255,0.55);
        margin: 0 0 32px;
        line-height: 1.5;
      }
      .nat-hero-img-wrap {
        margin-left: -24px;
        margin-right: -24px;
      }
      .nat-hero-img {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        background: #0f0f11;
        overflow: hidden;
      }
      .nat-hero-placeholder {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #0f0f12 0%, #18181e 100%);
        font-family: var(--font-space-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.36em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.18);
      }
      .nat-author-row {
        max-width: 768px;
        margin: 0 auto;
        padding: 18px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        border-top: 1px solid rgba(255,255,255,0.05);
      }
      .nat-author-left {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .nat-author-by {
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: rgba(255,255,255,0.3);
      }
      .nat-author-sig {
        font-size: 18px;
        color: rgba(255,225,140,0.88);
        line-height: 1;
      }
      .nat-author-role {
        font-family: var(--font-space-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.38);
      }
      .nat-author-loc {
        font-family: var(--font-space-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.3);
      }

      /* Body grid */
      .nat-body-grid {
        max-width: 1140px;
        margin: 0 auto;
        padding: 0 24px 80px;
        display: grid;
        grid-template-columns: minmax(0, 680px) 1fr;
        gap: 0 48px;
        align-items: start;
      }
      .nat-article { min-width: 0; }
      .nat-toc-col {
        padding-top: 64px;
      }
      @media (max-width: 1023px) {
        .nat-body-grid {
          grid-template-columns: minmax(0, 680px);
          max-width: 768px;
        }
        .nat-toc-col { display: none; }
      }
      @media (max-width: 680px) {
        .nat-body-grid { padding: 0 16px 64px; }
        .nat-hero-inner { padding: 36px 16px 0; }
        .nat-hero-img-wrap { margin-left: -16px; margin-right: -16px; }
        .nat-author-row { padding: 14px 16px; }
        .nat-nav-inner { padding: 12px 16px; }
      }

      /* Article footer */
      .nat-article-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-top: 64px;
        padding-top: 24px;
        border-top: 1px solid rgba(255,255,255,0.07);
        font-family: var(--font-space-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.35);
      }
      .nat-article-footer a {
        color: rgba(255,225,140,0.65);
        text-decoration: none;
        transition: color 0.15s;
      }
      .nat-article-footer a:hover { color: rgba(255,225,140,1); }

      /* Closing block */
      .nat-closing {
        margin-top: 52px;
        padding: 24px 0 0;
        border-top: 1px solid rgba(255,255,255,0.06);
        font-family: var(--font-readex), sans-serif;
        font-size: 15px;
        line-height: 1.85;
        color: rgba(255,255,255,0.68);
        font-weight: 300;
      }
      .nat-closing p { margin: 0 0 1em; }
      .nat-closing p:last-child { margin-bottom: 0; }
    `}</style>
  );
}
