import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { getWorkBySlug, workSlugs, worksData } from "@/data/works";
import { notFound } from "next/navigation";

const SITE_URL = "https://minehoooo.xyz";

export function generateStaticParams() {
  return workSlugs.map(slug => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "Not Found" };

  const thumb = `https://img.youtube.com/vi/${work.youtubeId}/maxresdefault.jpg`;
  const url = `${SITE_URL}/works/${work.slug}`;

  return {
    title: work.titleEn,
    description: work.metaDescription,
    keywords: work.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "video.other",
      url,
      title: `${work.title} — MINEH4O`,
      description: work.metaDescription,
      images: [{ url: thumb, width: 1280, height: 720, alt: `${work.title} MV 視覺縮圖 - 在地影像工作者 MINEH4O` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} — MINEH4O`,
      description: work.metaDescription,
      images: [thumb],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const thumb = `https://img.youtube.com/vi/${work.youtubeId}/maxresdefault.jpg`;
  const related = work.relatedSlugs
    ?.map(s => worksData.find(w => w.slug === s))
    .filter(Boolean) ?? [];

  // Next work (circular)
  const currentIdx = worksData.findIndex(w => w.slug === slug);
  const nextWork = worksData[(currentIdx + 1) % worksData.length];

  const pageUrl = `${SITE_URL}/works/${work.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name: work.title,
    description: work.metaDescription,
    thumbnailUrl: thumb,
    contentUrl: `https://www.youtube.com/watch?v=${work.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${work.youtubeId}`,
    url: pageUrl,
    uploadDate: work.uploadDate.length === 10
      ? `${work.uploadDate}T00:00:00+08:00`
      : work.uploadDate,
    duration: work.duration,
    inLanguage: "zh-TW",
    genre: work.category,
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    director: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Oscar Lai",
      alternateName: ["MINEH4O", "賴明宏", "minehoooo"],
      url: SITE_URL,
    },
    musicBy: { "@type": "MusicGroup", name: work.artist },
    productionCompany: { "@type": "Organization", name: "MINEH4O", url: SITE_URL },
  };

  return (
    <>
      <Script
        id={`jsonld-${work.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        @keyframes workFadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .work-page-enter { animation: workFadeIn 0.72s cubic-bezier(0.4,0,0.2,1) both; }
        .work-related-link { border: 1px solid rgba(255,255,255,0.06); transition: border-color 0.3s; }
        .work-related-link:hover { border-color: rgba(255,255,255,0.22); }
        .next-work-card { border-top: 1px solid rgba(255,255,255,0.07); transition: background 0.4s ease; }
        .next-work-card:hover { background: rgba(255,255,255,0.03); }
        .next-work-thumb { transform: scale(1); transition: transform 0.8s cubic-bezier(0.4,0,0.2,1); }
        .next-work-card:hover .next-work-thumb { transform: scale(1.04); }
      `}</style>
      <main className="work-page-enter" style={{ background: "#000", minHeight: "100dvh", overflowY: "auto", color: "#fff" }}>

        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          padding: "1.2rem 2rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <Link href="/#video" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 9, letterSpacing: "0.32em", color: "rgba(255,255,255,0.4)",
            }}>← MINEH4O</span>
          </Link>
          <span style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)",
          }}>{work.category}</span>
        </div>

        {/* Hero: thumbnail */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", maxHeight: "60vh", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={`${work.title} MV 官方視覺縮圖 - 在地影像工作者 MINEH4O 影像作品`}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)",
          }} />
          <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
            <p style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 8, letterSpacing: "0.35em", color: "rgba(255,255,255,0.4)", marginBottom: 10,
            }}>{work.role} · {work.artist}</p>
            <h1 style={{
              fontFamily: "var(--font-bebas), serif",
              fontSize: "clamp(2.4rem, 8vw, 7rem)", lineHeight: 1,
              color: "#fff", letterSpacing: "0.01em", margin: 0,
            }}>{work.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 2rem 6rem" }}>

          {/* YouTube embed */}
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: "3rem" }}>
            <iframe
              src={`https://www.youtube.com/embed/${work.youtubeId}?rel=0&modestbranding=1`}
              title={work.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={{
                position: "absolute", top: 0, left: 0,
                width: "100%", height: "100%", border: "none",
              }}
            />
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: "2.5rem" }} />

          {/* Description */}
          <div style={{ marginBottom: "3rem" }}>
            <p style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 8, letterSpacing: "0.35em", color: "rgba(255,255,255,0.3)", marginBottom: "1.2rem",
            }}>ABOUT THIS WORK</p>
            {work.description.map((para, i) => (
              <p key={i} style={{
                fontSize: "clamp(14px, 2vw, 16px)", lineHeight: 1.9,
                color: "rgba(255,255,255,0.72)", marginBottom: "1.2rem",
              }}>{para}</p>
            ))}
          </div>

          {/* Credits */}
          <div style={{ marginBottom: "3rem", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 8, letterSpacing: "0.35em", color: "rgba(255,255,255,0.3)", marginBottom: "1rem",
            }}>CREDITS</p>
            {[
              { label: "ARTIST", value: work.artist },
              { label: "VISUAL", value: "MINEH4O / 賴明宏 Oscar Lai" },
              { label: "ROLE", value: work.role },
              { label: "WEBSITE", value: "minehoooo.xyz" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: "2rem", marginBottom: "0.6rem" }}>
                <span style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)", minWidth: 80,
                }}>{c.label}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{c.value}</span>
              </div>
            ))}
          </div>

          {/* Related works */}
          {related.length > 0 && (
            <div>
              <p style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: 8, letterSpacing: "0.35em", color: "rgba(255,255,255,0.3)", marginBottom: "1.2rem",
              }}>RELATED WORKS</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {related.map(r => r && (
                  <Link key={r.slug} href={`/works/${r.slug}`} style={{ textDecoration: "none" }}>
                    <div className="work-related-link" style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "0.8rem 1rem",
                    }}>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{r.title}</span>
                      <span style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        fontSize: 7, letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)",
                      }}>{r.role}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Next Work */}
        <Link href={`/works/${nextWork.slug}`} style={{ textDecoration: "none", display: "block" }}>
          <div className="next-work-card" style={{ padding: "0 2rem" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 0" }}>
              <p style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: 8, letterSpacing: "0.38em", color: "rgba(255,255,255,0.2)", marginBottom: "1.6rem",
              }}>NEXT WORK</p>
              <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
                <div style={{ width: 120, aspectRatio: "16/9", overflow: "hidden", flexShrink: 0, background: "#111" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="next-work-thumb"
                    src={`https://img.youtube.com/vi/${nextWork.youtubeId}/mqdefault.jpg`}
                    alt={`${nextWork.title} - 在地影像工作者 MINEH4O`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: 7, letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)", marginBottom: 8,
                  }}>{nextWork.role} · {nextWork.artist}</p>
                  <p style={{
                    fontFamily: "var(--font-bebas), serif",
                    fontSize: "clamp(1.4rem, 4vw, 2.6rem)", lineHeight: 1.1,
                    color: "rgba(255,255,255,0.85)", letterSpacing: "0.01em",
                  }}>{nextWork.title}</p>
                </div>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 20, flexShrink: 0 }}>→</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "1.5rem 2rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "var(--font-bebas), serif",
              fontSize: 18, letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)",
            }}>MINEH4O</span>
          </Link>
          <span style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)",
          }}>minehoooo.xyz</span>
        </div>

      </main>
    </>
  );
}
