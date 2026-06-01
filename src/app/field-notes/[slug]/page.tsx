import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FieldNoteNav from "@/components/FieldNoteNav";
import FieldNoteClose from "@/components/FieldNoteClose";
import ScrollUnlock from "@/components/ScrollUnlock";
import { fieldNotes, getFieldNote } from "@/data/fieldNotes";
import SeedanceAerialBody from "./articles/seedance-aerial";

export async function generateStaticParams() {
  return fieldNotes.map(n => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) return { title: "Field Notes | MINEH4O" };
  return {
    title: `${note.title} | MINEH4O 現場筆記`,
    description: note.excerpt,
    openGraph: {
      title: note.title,
      description: note.excerpt,
      images: [note.heroImage],
      type: "article",
    },
  };
}

const BODY_BY_SLUG: Record<string, React.ComponentType> = {
  "seedance-aerial": SeedanceAerialBody,
};

export default async function FieldNoteArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) notFound();

  const Body = BODY_BY_SLUG[slug];

  return (
    <main className="min-h-screen bg-black text-white" style={{ overflowY: "auto" }}>
      <ScrollUnlock />

      {/* ── Top bar with breadcrumb — clearer path back to listing ── */}
      <header className="sticky top-0 z-30 px-5 md:px-10 py-4"
        style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          {/* Left: breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <Link href="/" className="font-mono-label text-[10px] uppercase tracking-[0.32em] shrink-0"
              style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
              MINEH4O
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>›</span>
            <Link href="/field-notes" className="font-mono-label text-[10px] uppercase tracking-[0.32em] shrink-0"
              style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>
              現場筆記
            </Link>
          </div>
          {/* Right: see all link */}
          <Link href="/field-notes"
            className="inline-flex items-center gap-1.5 px-3 py-1.5"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 999,
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
            }}>
            <span className="font-mono-label text-[9px] uppercase tracking-[0.28em]">看全部文章</span>
            <span style={{ fontSize: 11 }}>→</span>
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-16">

        {/* ── Article masthead ── */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-label text-[9px] uppercase tracking-[0.32em] px-2.5 py-1"
              style={{
                color: "rgba(255,225,140,0.95)",
                background: "rgba(255,210,70,0.12)",
                border: "1px solid rgba(255,210,70,0.4)",
                borderRadius: 999,
              }}>
              {note.category}
            </span>
            <span className="font-mono-label text-[9px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(255,255,255,0.45)" }}>
              {note.date}
            </span>
          </div>
          <h1 className="font-display leading-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", letterSpacing: "-0.005em" }}>
            {note.title}
          </h1>
          {note.subtitle && (
            <p className="text-[15px] md:text-[17px] mt-2"
              style={{ color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
              {note.subtitle}
            </p>
          )}
          <p className="font-mono-label text-[11px] mt-4" style={{ color: "rgba(255,255,255,0.55)" }}>
            文 — Oscar / MINE
          </p>
        </div>

        {/* ── Hero image ── */}
        <figure className="mb-8 -mx-2 md:mx-0 overflow-hidden"
          style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
          <Image src={note.heroImage} alt={note.title}
            width={1600} height={900}
            className="w-full h-auto object-cover"
            priority />
        </figure>

        {/* ── TOP nav strip (导流到其他网站) ── */}
        <FieldNoteNav position="top" />

        {/* ── Article body ── */}
        {Body ? <Body /> : <p>Content coming soon.</p>}

        {/* ── Warm closing block — invite reader to explore the rest ── */}
        <FieldNoteClose />
      </article>
    </main>
  );
}
