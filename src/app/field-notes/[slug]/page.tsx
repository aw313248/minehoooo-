import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FieldNoteNav from "@/components/FieldNoteNav";
import FieldNoteClose from "@/components/FieldNoteClose";
import PromptBuilder, { PromptAnatomy } from "@/components/field-notes/PromptBuilder";
import HeroBackdrop from "@/components/field-notes/HeroBackdrop";
import NoteViews from "@/components/field-notes/NoteViews";
import QuickStart from "@/components/field-notes/QuickStart";
import OriginalPrompt from "@/components/field-notes/OriginalPrompt";
import MobileStickyBar from "@/components/field-notes/MobileStickyBar";
import ToolBadge from "@/components/field-notes/ToolBadge";
import BubbleComments from "@/components/field-notes/BubbleComments";
import HiggsfieldRef from "@/components/HiggsfieldRef";
import { fieldNotes, getFieldNote } from "@/data/fieldNotes";
import {
  getPromptBuilder,
  buildExamplePrompt,
  TOOL_HIGGSFIELD,
  type PromptBuilderConfig,
} from "@/data/promptBuilders";
import SeedanceAerialBody from "./articles/seedance-aerial";
import NoteArticleTemplate from "@/components/field-notes/note-article/NoteArticleTemplate";
import kinoContent from "./articles/kino-iphone-guide";
import EditorialTemplate from "@/components/field-notes/editorial/EditorialTemplate";
import kinoBlocks from "./articles/kino-iphone-guide-v2";
import wuluBlocks from "./articles/wulu-concept-film";
import viennaBlocks from "./articles/vienna-griechenbeisl";
import guruwalkBlocks from "./articles/guruwalk";
import aiCrimeFilmBlocks from "./articles/ai-crime-film";
import soloTravelBlocks from "./articles/how-i-film-solo-travel";

const SITE_URL = "https://minehoooo.xyz";
const SOCIAL_COVER_DEFAULT = "/field-notes/social-cover.jpg";

export async function generateStaticParams() {
  // taiwan-roadbook 由靜態資料夾路由（LIVE Roadbook）處理，不走文章模板
  return fieldNotes.filter(n => n.slug !== "taiwan-roadbook").map(n => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) return { title: "Field Notes | MINEH4O" };

  const canonical = `${SITE_URL}/field-notes/${slug}`;
  const ogImage =
    slug === "seedance-aerial"
      ? "/field-notes/seedance-map-route/social-cover.jpg"
      : slug === "vienna-griechenbeisl"
      ? "/field-notes/griechenbeisl/og.jpg"
      : slug === "guruwalk"
      ? "/field-notes/guruwalk/cover.jpg"
      : slug === "ai-crime-film"
      ? "/field-notes/ai-crime-film/og.jpg"
      : slug === "how-i-film-solo-travel"
      ? "/field-notes/solo-travel-ai/oscar-frame-first.jpg"
      : SOCIAL_COVER_DEFAULT;
  const socialTitle =
    slug === "seedance-aerial"
      ? "用一張圖片，生成電影級 AI 空拍鏡頭。"
      : note.title;

  return {
    title: `${note.title} | MINEH4O 現場筆記`,
    description: note.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: socialTitle,
      description: note.excerpt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: note.title }],
      siteName: "MINEH4O 現場筆記",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: note.excerpt,
      images: [ogImage],
    },
  };
}

const BODY_BY_SLUG: Record<string, React.ComponentType> = {
  "seedance-aerial": SeedanceAerialBody,
};

// Editorial article content map (NoteContent objects)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EDITORIAL_CONTENT: Record<string, any> = {
  "kino-iphone-guide": kinoContent,
};

// Editorial v2 block arrays
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EDITORIAL_V2_BLOCKS: Record<string, any[]> = {
  "kino-iphone-guide": kinoBlocks,
  "wulu-concept-film": wuluBlocks,
  "vienna-griechenbeisl": viennaBlocks,
  "guruwalk": guruwalkBlocks,
  "ai-crime-film": aiCrimeFilmBlocks,
  "how-i-film-solo-travel": soloTravelBlocks,
};

function FieldNoteStructuredData({ note }: { note: (typeof fieldNotes)[number] }) {
  const url = `${SITE_URL}/field-notes/${note.slug}`;
  const image = new URL(note.heroImage, SITE_URL).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: note.title,
        description: note.excerpt,
        image,
        datePublished: note.date,
        dateModified: note.date,
        inLanguage: "zh-TW",
        author: { "@type": "Person", name: "Oscar Lai", url: SITE_URL },
        publisher: { "@type": "Organization", name: "MINEH4O", url: SITE_URL },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        keywords: note.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "MINEH4O", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Field Notes", item: `${SITE_URL}/field-notes` },
          { "@type": "ListItem", position: 3, name: note.title, item: url },
        ],
      },
    ],
  };

  return (
    <script
      id="field-note-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function FieldNoteArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) notFound();

  // Route editorial-v2 articles to the magazine-style block template
  if (note.articleType === "editorial-v2") {
    const blocks = EDITORIAL_V2_BLOCKS[slug];
    if (!blocks) notFound();
    return (
      <>
        <FieldNoteStructuredData note={note} />
        <main className="min-h-screen bg-black text-white relative">
          <EditorialTemplate note={note} blocks={blocks} />
        </main>
      </>
    );
  }

  // Route editorial articles to the 6-section reading template
  if (note.articleType === "editorial") {
    const content = EDITORIAL_CONTENT[slug];
    if (!content) notFound();
    return (
      <>
        <FieldNoteStructuredData note={note} />
        <main className="min-h-screen bg-black text-white relative">
          <NoteArticleTemplate note={note} content={content} />
        </main>
      </>
    );
  }

  const Body = BODY_BY_SLUG[slug];
  const builderConfig = getPromptBuilder(slug);

  // Pre-rendered "Oscar's example" prompt — drives every COPY button on this page
  const oscarPrompt = builderConfig ? buildExamplePrompt(builderConfig, "en") : "";

  // Hero backdrop assets
  const heroMedia =
    slug === "seedance-aerial"
      ? {
          video:  "/field-notes/seedance-map-route/hero-loop.mp4",
          poster: "/field-notes/seedance-map-route/social-cover.jpg",
        }
      : null;

  // 4-step thumbnails
  const flowSteps = slug === "seedance-aerial"
    ? [
        { num: "01", en: "Source",     zh: "來源",     thumb: "/field-notes/seedance-map-route/workflow-overview.jpg",   thumbType: "image" as const },
        { num: "02", en: "Draw Route", zh: "畫路徑",   thumb: "/field-notes/seedance-map-route/route-painted.jpg",       thumbType: "image" as const },
        { num: "03", en: "Generate",   zh: "生成",     thumb: "/field-notes/seedance-map-route/generated-aerial.mp4",    thumbType: "video" as const },
        { num: "04", en: "Export",     zh: "輸出",     thumb: "/field-notes/seedance-map-route/ig-output.mp4",           thumbType: "video" as const },
      ]
    : [];

  return (
    <main className="min-h-screen bg-black text-white relative">
      <FieldNoteStructuredData note={note} />
      <BubbleComments slug={note.slug} />

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.05,
          mixBlendMode: "screen",
        }}
      />

      {/* Two-layer glass top nav */}
      <FieldNoteNav active="aigc" />

      {/* ── 01 · Title hero (no builder — that lives below the QUICK START block) ── */}
      {builderConfig && (
        <TitleHero
          note={note}
          config={builderConfig}
          heroMedia={heroMedia}
        />
      )}
      {builderConfig && (
        <div className="relative max-w-[1100px] mx-auto px-5 md:px-8 mt-3 flex justify-end">
          <NoteViews slug={note.slug} increment />
        </div>
      )}

      {/* ── Higgsfield 官方 Logo 邀請橫幅 — 教學最顯眼位置 ── */}
      {builderConfig && (
        <section className="relative max-w-[1100px] mx-auto px-5 md:px-8 mt-6">
          <HiggsfieldRef variant="banner" />
        </section>
      )}

      {/* ── 02 · QUICK START (visible on first screen, primary CTAs) ── */}
      {builderConfig && (
        <section
          className="relative max-w-[1100px] mx-auto px-5 md:px-8 mt-10 md:mt-14"
          // Bottom padding leaves room for mobile sticky bar on small viewports
          style={{ paddingBottom: 0 }}
        >
          <QuickStart
            toolName={TOOL_HIGGSFIELD.name}
            toolHref={TOOL_HIGGSFIELD.url}
            promptToCopy={oscarPrompt}
          />
        </section>
      )}

      {/* ── 03 · Prompt Builder ── */}
      {builderConfig && (
        <section className="relative max-w-[1100px] mx-auto px-5 md:px-8 mt-14 md:mt-20">
          <PromptBuilder config={builderConfig} />
        </section>
      )}

      {/* ── 04 · Oscar's original prompt (collapsible) ── */}
      {builderConfig && oscarPrompt && (
        <section className="relative max-w-[1100px] mx-auto px-5 md:px-8 mt-10 md:mt-12">
          <OriginalPrompt
            title="Oscar's Original Prompt"
            subtitle="臺中國家歌劇院 FPV 空拍案例"
            prompt={oscarPrompt}
          />
        </section>
      )}

      {/* ── 05 · Visual teaching: 4-step workflow strip + Prompt Anatomy ── */}
      {flowSteps.length > 0 && (
        <section className="relative max-w-[1280px] mx-auto px-5 md:px-10 mt-14 md:mt-20">
          <WorkflowStrip steps={flowSteps} />
        </section>
      )}
      {builderConfig && (
        <section className="relative max-w-[1280px] mx-auto px-5 md:px-10 mt-10 md:mt-12">
          <PromptAnatomy config={builderConfig} />
        </section>
      )}

      {/* ── 06 · Detailed body (Oscar's note, common mistake, results, appendix) ── */}
      <article className="relative max-w-[760px] mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-8">
        {Body ? <Body /> : <p>Content coming soon.</p>}
      </article>

      {/* ── 07 · Closing block ── */}
      <section className="relative max-w-[1180px] mx-auto px-5 md:px-8 pb-12 md:pb-16">
        <FieldNoteClose />
      </section>

      {/* Footer */}
      <footer className="relative max-w-[1280px] mx-auto px-5 md:px-10 pb-28 md:pb-16">
        <Footer date={note.date} />
      </footer>

      {/* Side rails — desktop only */}
      <SideRails />

      {/* Mobile sticky action bar */}
      {builderConfig && oscarPrompt && (
        <MobileStickyBar
          promptToCopy={oscarPrompt}
          toolHref={TOOL_HIGGSFIELD.url}
        />
      )}
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   TitleHero — title, Oscar, TOOL badge, View Selected Works CTA
   Drops the inline PromptBuilder so QUICK START → BUILDER reads top-down.
   ───────────────────────────────────────────────────────────────────── */
function TitleHero({
  note,
  config,
  heroMedia,
}: {
  note: { title: string; subtitle?: string; date: string; category: string };
  config: PromptBuilderConfig;
  heroMedia: { video: string; poster: string } | null;
}) {
  return (
    <section
      className="relative overflow-hidden isolate"
      style={{ background: "#050507" }}
    >
      {/* Looping cinematic backdrop (honors prefers-reduced-motion) */}
      {heroMedia && (
        <HeroBackdrop
          video={heroMedia.video}
          poster={heroMedia.poster}
          alt={`${note.title} — backdrop`}
          brightness={0.5}
          saturate={0.85}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,7,0.62) 0%, rgba(5,5,7,0.42) 38%, rgba(5,5,7,0.92) 100%), radial-gradient(110% 80% at 70% 28%, transparent 0%, rgba(0,0,0,0.5) 72%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.07,
          mixBlendMode: "screen",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-10 pt-12 md:pt-16 pb-12 md:pb-16">
        {/* Date + category + Tool badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
          <span
            className="font-mono-label uppercase"
            style={{
              fontSize: 10, letterSpacing: "0.32em",
              color: "rgba(255,225,140,0.95)",
              paddingBottom: 2,
              borderBottom: "1px solid rgba(255,225,140,0.5)",
            }}
          >
            {note.category}
          </span>
          <span aria-hidden style={{ color: "rgba(255,255,255,0.22)", fontSize: 11 }}>·</span>
          <span
            className="font-mono-label uppercase"
            style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(255,255,255,0.5)" }}
          >
            {note.date}
          </span>
          {/* TOOL badge — small frosted tag pointing to the tool intro page */}
          <span aria-hidden className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.22)", fontSize: 11 }}>·</span>
          <ToolBadge
            toolName={TOOL_HIGGSFIELD.name}
            toolPagePath={TOOL_HIGGSFIELD.toolPagePath}
            zhCta="軟體介紹"
          />
        </div>

        {/* Title + intro + Oscar block */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">

          {/* Left: title + intro */}
          <div className="min-w-0">
            <p
              className="font-mono-label uppercase mb-4 md:mb-5"
              style={{
                fontSize: 10,
                letterSpacing: "0.42em",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {config.eyebrow}
            </p>
            <h1
              className="font-display leading-[0.92]"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 7rem)",
                color: "var(--text)",
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
              }}
            >
              {config.title}
            </h1>
            <p
              className="mt-4 md:mt-5 max-w-xl"
              style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                color: "rgba(255,255,255,0.72)",
                fontWeight: 300,
                lineHeight: 1.55,
                wordBreak: "keep-all",
                overflowWrap: "anywhere",
              }}
            >
              {note.title}{note.subtitle ? <><br />{note.subtitle}</> : null}
            </p>
          </div>

          {/* Right: Oscar info + Selected Works CTA */}
          <div className="min-w-0 flex flex-col">
            <div className="flex items-start gap-5">
              <div
                className="relative shrink-0 overflow-hidden"
                style={{
                  width: 88, height: 88,
                  borderRadius: 4,
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 30px rgba(0,0,0,0.35)",
                }}
              >
                <Image
                  src="/field-notes/seedance-map-route/oscar-portrait.jpg"
                  alt="Oscar Lai"
                  fill
                  className="object-cover"
                  sizes="88px"
                />
              </div>
              <div className="min-w-0 flex flex-col">
                <p className="font-display" style={{ fontSize: 22, lineHeight: 1.1, color: "var(--text)" }}>
                  Oscar
                </p>
                <p
                  className="font-mono-label uppercase mt-1.5"
                  style={{ fontSize: 9.5, letterSpacing: "0.32em", color: "rgba(255,255,255,0.7)" }}
                >
                  Director · DP
                </p>
                <p
                  className="font-mono-label uppercase mt-1"
                  style={{ fontSize: 9.5, letterSpacing: "0.32em", color: "rgba(255,225,140,0.85)" }}
                >
                  AIGC Visual Creator
                </p>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "Snell Roundhand, Brush Script MT, cursive",
                    fontStyle: "italic",
                    fontSize: 22,
                    lineHeight: 1,
                    color: "rgba(255,225,140,0.85)",
                  }}
                >
                  Oscar Lai
                </p>
                <p
                  className="font-mono-label uppercase mt-3"
                  style={{ fontSize: 9, letterSpacing: "0.28em", color: "rgba(255,255,255,0.5)" }}
                >
                  Taichung · Taiwan
                </p>
              </div>
            </div>

            <Link
              href="/?section=video"
              className="inline-flex items-center gap-3 mt-7 group whitespace-nowrap"
              style={{
                padding: "11px 18px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(18px) saturate(125%)",
                WebkitBackdropFilter: "blur(18px) saturate(125%)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 4,
                textDecoration: "none",
                color: "rgba(255,255,255,0.92)",
                width: "fit-content",
              }}
            >
              <span
                className="font-mono-label uppercase"
                style={{ fontSize: 10, letterSpacing: "0.32em" }}
              >
                View Selected Works
              </span>
              <span aria-hidden style={{ fontSize: 12, lineHeight: 1 }}>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   4-step workflow strip
   ───────────────────────────────────────────────────────────────────── */
type FlowStep = {
  num: string;
  en: string;
  zh: string;
  thumb: string;
  thumbType: "image" | "video";
};
function WorkflowStrip({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="ws-root">
      <WorkflowStripStyles />
      <div className="ws-head">
        <span className="ws-tag">Workflow</span>
        <span aria-hidden className="ws-rule" />
        <span className="ws-sub">Source → Output</span>
      </div>
      <div className="ws-grid">
        {steps.map((s, i) => (
          <div key={s.num} className="ws-step">
            <figure className="ws-card">
              <div className="ws-thumb">
                {s.thumbType === "video" ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video
                    src={s.thumb}
                    autoPlay muted loop playsInline preload="metadata"
                    className="ws-media"
                  />
                ) : (
                  <Image
                    src={s.thumb}
                    alt={`${s.en} · ${s.zh}`}
                    fill
                    sizes="(max-width: 720px) 50vw, 25vw"
                    className="object-cover"
                  />
                )}
              </div>
              <figcaption className="ws-cap">
                <span className="ws-num">{s.num}</span>
                <span className="ws-cap-text">
                  <span className="ws-cap-en">{s.en}</span>
                  <span className="ws-cap-zh">{s.zh}</span>
                </span>
              </figcaption>
            </figure>
            {i < steps.length - 1 && (
              <span aria-hidden className="ws-arrow">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
function WorkflowStripStyles() {
  return (
    <style>{`
      .ws-root { color: rgba(255,255,255,0.86); }
      .ws-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
      .ws-tag { font-family: var(--font-space-mono), monospace; font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.92); }
      .ws-rule { flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.18), transparent 70%); }
      .ws-sub { font-family: var(--font-space-mono), monospace; font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase; color: rgba(255,255,255,0.45); }
      .ws-grid { display: flex; flex-wrap: wrap; gap: 10px 6px; align-items: stretch; }
      .ws-step { display: flex; align-items: center; gap: 6px; flex: 1 1 220px; min-width: 0; }
      .ws-card { margin: 0; flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
      .ws-thumb { position: relative; width: 100%; aspect-ratio: 16 / 10; background: #0a0a0c; border: 1px solid rgba(255,255,255,0.10); border-radius: 8px; overflow: hidden; }
      .ws-media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .ws-cap { display: flex; align-items: baseline; gap: 10px; padding: 0 2px; }
      .ws-num { font-family: var(--font-space-mono), monospace; font-size: 11px; letter-spacing: 0.22em; color: rgba(255,225,140,0.85); }
      .ws-cap-text { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
      .ws-cap-en { font-family: var(--font-space-mono), monospace; font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: rgba(255,255,255,0.95); }
      .ws-cap-zh { font-size: 12px; color: rgba(255,255,255,0.55); }
      .ws-arrow { color: rgba(255,255,255,0.35); font-size: 16px; font-weight: 200; align-self: center; flex-shrink: 0; padding: 0 2px; }
      @media (max-width: 720px) { .ws-arrow { display: none; } .ws-step { flex-basis: calc(50% - 4px); } }
    `}</style>
  );
}

/* ─── Footer + Side rails ─── */
function Footer({ date }: { date: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <span className="font-mono-label uppercase" style={{ fontSize: 9.5, letterSpacing: "0.32em", color: "rgba(255,255,255,0.5)" }}>
        © MINEH4O.ARW
      </span>
      <span className="font-mono-label uppercase hidden md:inline" style={{ fontSize: 9.5, letterSpacing: "0.32em", color: "rgba(255,255,255,0.5)" }}>
        AI · Higgsfield × Seedance
      </span>
      <span className="font-mono-label uppercase" style={{ fontSize: 9.5, letterSpacing: "0.32em", color: "rgba(255,255,255,0.5)" }}>
        {date}
      </span>
    </div>
  );
}
function SideRails() {
  const railLabel: React.CSSProperties = {
    fontFamily: "var(--font-space-mono), monospace",
    fontSize: 9.5,
    letterSpacing: "0.42em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.32)",
    writingMode: "vertical-rl",
  };
  return (
    <>
      <div aria-hidden className="hidden lg:block pointer-events-none" style={{ position: "fixed", left: 18, top: "30%", zIndex: 30, ...railLabel, transform: "rotate(180deg)" }}>
        AI Visual Creation
      </div>
      <div aria-hidden className="hidden lg:block pointer-events-none" style={{ position: "fixed", left: 18, bottom: 24, zIndex: 30, ...railLabel, transform: "rotate(180deg)" }}>
        Field Notes · 2026
      </div>
      <div aria-hidden className="hidden lg:block pointer-events-none" style={{ position: "fixed", right: 18, bottom: 24, zIndex: 30, ...railLabel }}>
        Scroll
      </div>
    </>
  );
}
