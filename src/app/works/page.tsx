import type { Metadata } from "next";
import Link from "next/link";
import { worksData } from "@/data/works";

const SITE_URL = "https://minehoooo.xyz";

export const metadata: Metadata = {
  title: "Works — MINEH4O",
  description: "在地影像工作者 MINEH4O（賴明宏 Oscar Lai）影像作品集。Music Video、AIGC、短片紀錄。台中 MV 導演、攝影指導、調色。",
  keywords: ["台中 MV 導演作品集", "AIGC 影像製作案例", "在地影像工作者 MINEH4O", "台灣 MV 製作", "MV 攝影指導"],
  alternates: { canonical: `${SITE_URL}/works` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/works`,
    title: "Works — MINEH4O | 在地影像工作者",
    description: "台中 MV 導演・攝影指導・AIGC 影像製作。完整作品集。",
  },
};

const trilogySlug = ["chen-zhuo-lumen", "chen-zhuo-aperture", "chen-zhuo-deprived"];

export default function WorksPage() {
  const trilogyWorks = trilogySlug.map(s => worksData.find(w => w.slug === s)).filter(Boolean);
  const otherWorks = worksData.filter(w => !trilogySlug.includes(w.slug));

  return (
    <>
      <style>{`
        @keyframes wFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .works-page { animation: wFadeIn 0.7s cubic-bezier(0.4,0,0.2,1) both; }

        .works-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 0 clamp(1.5rem, 6vw, 5rem);
        }
        .works-scroll::-webkit-scrollbar { display: none; }

        .work-card {
          flex: 0 0 clamp(260px, 38vw, 480px);
          scroll-snap-align: start;
          text-decoration: none;
          display: block;
        }
        .work-card-trilogy {
          flex: 0 0 clamp(360px, 52vw, 640px);
        }
        /* spacer at end to show 0.5 of next card */
        .works-scroll::after {
          content: '';
          flex: 0 0 clamp(1rem, 4vw, 3rem);
        }

        .card-thumb-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .card-thumb {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.72);
          transition: transform 0.9s cubic-bezier(0.4,0,0.2,1),
                      filter 0.5s ease;
          display: block;
        }
        .work-card:hover .card-thumb {
          transform: scale(1.04);
          filter: brightness(0.88);
        }

        .card-info {
          padding: 10px 0 0;
        }
        .card-role {
          font-family: var(--font-space-mono), monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          color: rgba(255,255,255,0.28);
          margin-bottom: 5px;
          display: block;
        }
        .card-title {
          font-family: var(--font-space-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.78);
          line-height: 1.5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-title-trilogy {
          font-size: 13px;
        }

        @media (max-width: 640px) {
          .work-card { flex: 0 0 78vw; }
          .work-card-trilogy { flex: 0 0 88vw; }
        }
      `}</style>

      <main className="works-page" style={{ background: "#000", minHeight: "100dvh", color: "#fff" }}>

        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          padding: "1.2rem clamp(1.5rem,6vw,5rem)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(0,0,0,0.9)", backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 9, letterSpacing: "0.32em", color: "rgba(255,255,255,0.35)",
            }}>← MINEH4O</span>
          </Link>
          <span style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.18)",
          }}>WORKS</span>
        </div>

        {/* Header */}
        <div style={{ padding: "5rem clamp(1.5rem,6vw,5rem) 4rem" }}>
          <p style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 8, letterSpacing: "0.42em", color: "rgba(255,255,255,0.18)",
            marginBottom: "0.8rem",
          }}>在地影像工作者 · MINEH4O</p>
          <h1 style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
            letterSpacing: "0.38em",
            color: "rgba(255,255,255,0.55)",
            fontWeight: 400,
            margin: 0,
          }}>SELECTED WORKS</h1>
        </div>

        {/* Trilogy */}
        <section aria-label="陳卓 光與景三部曲" style={{ marginBottom: "6rem" }}>
          <div style={{
            padding: "0 clamp(1.5rem,6vw,5rem)",
            marginBottom: "1.4rem",
            display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <span style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 8, letterSpacing: "0.38em", color: "rgba(255,255,255,0.2)",
            }}>陳卓 · 光與景三部曲</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
          </div>

          <div className="works-scroll">
            {trilogyWorks.map(w => {
              if (!w) return null;
              return (
                <Link key={w.slug} href={`/works/${w.slug}`} className="work-card work-card-trilogy">
                  <div className="card-thumb-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="card-thumb"
                      src={`https://img.youtube.com/vi/${w.youtubeId}/maxresdefault.jpg`}
                      alt={`${w.title} - 在地影像工作者 MINEH4O`}
                      loading="lazy"
                    />
                  </div>
                  <div className="card-info">
                    <span className="card-role">{w.role} · {w.uploadDate.slice(0, 4)}</span>
                    <p className="card-title card-title-trilogy">{w.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All other works */}
        <section aria-label="全部作品" style={{ marginBottom: "6rem" }}>
          <div style={{
            padding: "0 clamp(1.5rem,6vw,5rem)",
            marginBottom: "1.4rem",
            display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <span style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 8, letterSpacing: "0.38em", color: "rgba(255,255,255,0.2)",
            }}>ALL WORKS</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
          </div>

          <div className="works-scroll">
            {otherWorks.map(w => (
              <Link key={w.slug} href={`/works/${w.slug}`} className="work-card">
                <div className="card-thumb-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="card-thumb"
                    src={`https://img.youtube.com/vi/${w.youtubeId}/maxresdefault.jpg`}
                    alt={`${w.title} - 在地影像工作者 MINEH4O`}
                    loading="lazy"
                  />
                </div>
                <div className="card-info">
                  <span className="card-role">{w.role} · {w.uploadDate.slice(0, 4)}</span>
                  <p className="card-title">{w.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "1.5rem clamp(1.5rem,6vw,5rem)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "var(--font-bebas), serif",
              fontSize: 16, letterSpacing: "0.08em", color: "rgba(255,255,255,0.2)",
            }}>MINEH4O</span>
          </Link>
          <span style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.14)",
          }}>minehoooo.xyz</span>
        </div>

      </main>
    </>
  );
}
