import Image from "next/image";

export interface BeforeAfterItem {
  src: string;
  label: string;
  caption?: string;
  type?: "image" | "video";
}

interface NoteBeforeAfterProps {
  before: BeforeAfterItem;
  after: BeforeAfterItem;
  title?: string;
}

export default function NoteBeforeAfter({ before, after, title }: NoteBeforeAfterProps) {
  return (
    <div className="nba-root">
      {title && <p className="nba-title">{title}</p>}
      <div className="nba-grid">
        <BeforeAfterCard item={before} pill="BEFORE" pillColor="rgba(255,255,255,0.55)" />
        <BeforeAfterCard item={after} pill="AFTER" pillColor="rgba(255,225,140,0.9)" />
      </div>

      <style>{`
        .nba-root { margin: 2em 0; }
        .nba-title {
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.36em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 14px;
        }
        .nba-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 560px) {
          .nba-grid { grid-template-columns: 1fr; }
        }
        .nba-card {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          background: #0a0a0c;
        }
        .nba-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: #111;
        }
        .nba-thumb-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #111 0%, #1a1a1e 100%);
          color: rgba(255,255,255,0.2);
          font-family: var(--font-space-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.24em;
        }
        .nba-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px 11px;
        }
        .nba-pill {
          font-family: var(--font-space-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 3px;
          background: rgba(255,255,255,0.06);
        }
        .nba-caption {
          font-family: var(--font-readex), sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          text-align: right;
          max-width: 60%;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}

function BeforeAfterCard({
  item,
  pill,
  pillColor,
}: {
  item: BeforeAfterItem;
  pill: string;
  pillColor: string;
}) {
  const isVideo = item.type === "video";
  const hasAsset = !!item.src;

  return (
    <div className="nba-card">
      <div className="nba-thumb">
        {hasAsset ? (
          isVideo ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Image src={item.src} alt={item.label} fill className="object-cover" sizes="(max-width: 560px) 100vw, 50vw" />
          )
        ) : (
          <div className="nba-thumb-placeholder">IMAGE COMING SOON</div>
        )}
      </div>
      <div className="nba-footer">
        <span className="nba-pill" style={{ color: pillColor }}>
          {pill}
        </span>
        {item.caption && <span className="nba-caption">{item.caption}</span>}
      </div>
    </div>
  );
}
