import Link from "next/link";
import Image from "next/image";
import { getRelatedNotes } from "@/data/fieldNotes";

interface NoteRelatedProps {
  slugs: string[];
  currentSlug: string;
}

export default function NoteRelated({ slugs, currentSlug }: NoteRelatedProps) {
  const related = getRelatedNotes(slugs).filter(n => n.slug !== currentSlug);
  if (related.length === 0) return null;

  return (
    <div className="nr-root">
      <div className="nr-grid">
        {related.map((note) => (
          <Link key={note.slug} href={`/field-notes/${note.slug}`} className="nr-card">
            <div className="nr-thumb">
              <Image
                src={note.heroImage}
                alt={note.title}
                fill
                className="object-cover"
                sizes="(max-width: 680px) 100vw, 340px"
              />
            </div>
            <div className="nr-body">
              <div className="nr-meta">
                <span className="nr-cat">{note.categoryLabel}</span>
                <span className="nr-time">{note.readingTime} min</span>
              </div>
              <p className="nr-title">{note.title}</p>
              <span className="nr-cta">Read →</span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .nr-root { margin-top: 8px; }
        .nr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }
        .nr-card {
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: border-color 0.18s, background 0.18s;
        }
        .nr-card:hover {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.055);
        }
        .nr-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #0f0f11;
        }
        .nr-body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .nr-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .nr-cat {
          font-family: var(--font-space-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255,225,140,0.8);
        }
        .nr-time {
          font-family: var(--font-space-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.35);
        }
        .nr-title {
          font-family: var(--font-readex), sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.45;
          color: rgba(255,255,255,0.88);
          margin: 0;
        }
        .nr-cta {
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(255,225,140,0.65);
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}
