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

const CATEGORIES = ["ALL", "MUSIC VIDEO", "AIGC", "SHORT FILM"] as const;
type Cat = typeof CATEGORIES[number];

// Group trilogy together
const trilogySlug = ["chen-zhuo-lumen", "chen-zhuo-aperture", "chen-zhuo-deprived"];

export default function WorksPage() {
  return (
    <>
      <style>{`
        @keyframes wFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .works-page { animation: wFadeIn 0.6s cubic-bezier(0.4,0,0.2,1) both; }

        /* Horizontal scroll container */
        .works-scroll {
          display: flex;
          gap: 2px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 0 clamp(1.5rem, 6vw, 5rem);
          padding-right: clamp(3rem, 12vw, 10rem);
        }
        .works-scroll::-webkit-scrollbar { display: none; }

        /* Regular card */
        .work-card {
          flex: 0 0 clamp(280px, 42vw, 560px);
          scroll-snap-align: start;
          scroll-snap-stop: normal;
          cursor: pointer;
          text-decoration: none;
          display: block;
        }
        .work-card-inner {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: #0a0a0a;
        }
        .work-card-thumb {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.65);
          transition: transform 0.9s cubic-bezier(0.4,0,0.2,1),
                      filter 0.6s ease;
        }
        .work-card:hover .work-card-thumb {
          transform: scale(1.04);
          filter: brightness(0.8);
        }
        .work-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%);
        }
        .work-card-meta {
          position: absolute; bottom: 1.2rem; left: 1.2rem; right: 1.2rem;
        }

        /* Trilogy card — 1.8× wider */
        .work-card-trilogy {
          flex: 0 0 clamp(480px, 72vw, 960px);
        }

        /* Filter tabs */
        .filter-tab {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-space-mono), monospace;
          font-size: 8px; letter-spacing: 0.3em;
          color: rgba(255,255,255,0.28);
          padding: 6px 0;
          border-bottom: 1px solid transparent;
          transition: color 0.25s, border-color 0.25s;
        }
        .filter-tab:hover { color: rgba(255,255,255,0.6); }
        .filter-tab[data-active="true"] {
          color: rgba(255,255,255,0.85);
          border-bottom-color: rgba(255,255,255,0.5);
        }

        @media (max-width: 640px) {
          .work-card { flex: 0 0 82vw; }
          .work-card-trilogy { flex: 0 0 92vw; }
        }
      `}</style>

      <main className="works-page" style={{ background: "#000", minHeight: "100dvh", color: "#fff" }}>

        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          padding: "1.2rem clamp(1.5rem,6vw,5rem)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(0,0,0,0.88)", backdropFilter: "blur(14px)",
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
        <div style={{ padding: "4rem clamp(1.5rem,6vw,5rem) 3rem" }}>
          <p style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 8, letterSpacing: "0.38em", color: "rgba(255,255,255,0.2)",
            marginBottom: "1.2rem",
          }}>在地影像工作者 · MINEH4O</p>
          <h1 style={{
            fontFamily: "var(--font-bebas), serif",
            fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: 1,
            color: "#fff", letterSpacing: "0.01em", margin: 0,
          }}>WORKS</h1>
        </div>

        {/* Horizontal gallery — ALL works */}
        <section aria-label="作品列表" style={{ paddingBottom: "5rem" }}>

          {/* Trilogy — special wide card first */}
          <div style={{ marginBottom: "0.5rem" }}>
            <div style={{
              padding: "0 clamp(1.5rem,6vw,5rem)",
              marginBottom: "0.8rem",
            }}>
              <span style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: 7, letterSpacing: "0.35em", color: "rgba(255,255,255,0.18)",
              }}>陳卓 · 光與景三部曲</span>
            </div>

            <div className="works-scroll" style={{ paddingBottom: "1.2rem" }}>
              {trilogySlug.map(slug => {
                const w = worksData.find(x => x.slug === slug);
                if (!w) return null;
                const thumb = `https://img.youtube.com/vi/${w.youtubeId}/maxresdefault.jpg`;
                return (
                  <Link key={w.slug} href={`/works/${w.slug}`} className="work-card work-card-trilogy">
                    <div className="work-card-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="work-card-thumb"
                        src={thumb}
                        alt={`${w.title} - 在地影像工作者 MINEH4O`}
                        loading="lazy"
                      />
                      <div className="work-card-overlay" />
                      <div className="work-card-meta">
                        <p style={{
                          fontFamily: "var(--font-space-mono), monospace",
                          fontSize: 7, letterSpacing: "0.25em",
                          color: "rgba(255,255,255,0.35)", marginBottom: 6,
                        }}>{w.role} · {w.uploadDate.slice(0, 4)}</p>
                        <p style={{
                          fontFamily: "var(--font-bebas), serif",
                          fontSize: "clamp(1.6rem, 3.5vw, 3rem)", lineHeight: 1,
                          color: "#fff", letterSpacing: "0.01em",
                        }}>{w.title}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* All other works */}
          <div style={{
            padding: "0 clamp(1.5rem,6vw,5rem)",
            marginBottom: "0.8rem", marginTop: "2.5rem",
          }}>
            <span style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 7, letterSpacing: "0.35em", color: "rgba(255,255,255,0.18)",
            }}>全部作品</span>
          </div>

          <div className="works-scroll" style={{ paddingBottom: "2rem" }}>
            {worksData
              .filter(w => !trilogySlug.includes(w.slug))
              .map(w => {
                const thumb = `https://img.youtube.com/vi/${w.youtubeId}/maxresdefault.jpg`;
                return (
                  <Link key={w.slug} href={`/works/${w.slug}`} className="work-card">
                    <div className="work-card-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="work-card-thumb"
                        src={thumb}
                        alt={`${w.title} - 在地影像工作者 MINEH4O`}
                        loading="lazy"
                      />
                      <div className="work-card-overlay" />
                      <div className="work-card-meta">
                        <p style={{
                          fontFamily: "var(--font-space-mono), monospace",
                          fontSize: 7, letterSpacing: "0.25em",
                          color: "rgba(255,255,255,0.35)", marginBottom: 6,
                        }}>{w.role} · {w.uploadDate.slice(0, 4)}</p>
                        <p style={{
                          fontFamily: "var(--font-bebas), serif",
                          fontSize: "clamp(1.4rem, 3vw, 2.4rem)", lineHeight: 1.05,
                          color: "#fff", letterSpacing: "0.01em",
                        }}>{w.title}</p>
                        <p style={{
                          fontFamily: "var(--font-space-mono), monospace",
                          fontSize: 7, letterSpacing: "0.18em",
                          color: "rgba(255,255,255,0.25)", marginTop: 4,
                        }}>{w.artist}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
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
              fontSize: 18, letterSpacing: "0.08em", color: "rgba(255,255,255,0.25)",
            }}>MINEH4O</span>
          </Link>
          <span style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.15)",
          }}>minehoooo.xyz</span>
        </div>

      </main>
    </>
  );
}
