'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { worksData } from '@/data/works';

const trilogySet = new Set(["chen-zhuo-lumen", "chen-zhuo-aperture", "chen-zhuo-deprived"]);
const radSet = new Set(["lil-rad-no-you", "lil-rad-love-me-not", "lil-rad-loving-after-all"]);
const aigcSet = new Set(["bring-me-your-lovely"]);

function getOverlay(slug: string) {
  if (trilogySet.has(slug))
    return 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(8,5,0,0.62) 48%, rgba(0,0,0,0.18) 100%)';
  if (radSet.has(slug))
    return 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,3,10,0.62) 48%, rgba(0,0,0,0.2) 100%)';
  return 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.52) 48%, rgba(0,0,0,0.18) 100%)';
}

function getBadge(slug: string) {
  if (trilogySet.has(slug)) return { text: '光與景三部曲', color: 'rgba(220,170,60,0.7)' };
  if (aigcSet.has(slug))    return { text: 'AI HYBRID', color: 'rgba(100,200,255,0.6)' };
  return null;
}

export default function WorksClient() {
  const [activeIdx, setActiveIdx]       = useState(0);
  const [visible, setVisible]           = useState<Set<number>>(new Set([0]));
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          const i = Number(e.target.getAttribute('data-idx'));
          if (e.isIntersecting) {
            setActiveIdx(i);
            setVisible(prev => {
              if (prev.has(i)) return prev;
              const next = new Set(prev);
              next.add(i);
              return next;
            });
          }
        });
      },
      { threshold: 0.45 }
    );
    sectionRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── top bar ── */
        .wt-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          padding: 1.3rem clamp(1.5rem,5vw,3.5rem);
          display: flex; justify-content: space-between; align-items: center;
          background: linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 100%);
          pointer-events: none;
        }
        .wt-back {
          font-family: var(--font-space-mono), monospace;
          font-size: 9px; letter-spacing: 0.32em; color: rgba(255,255,255,0.45);
          text-decoration: none; pointer-events: all;
          transition: color 0.3s;
        }
        .wt-back:hover { color: rgba(255,255,255,0.9); }
        .wt-label {
          font-family: var(--font-space-mono), monospace;
          font-size: 8px; letter-spacing: 0.24em; color: rgba(255,255,255,0.18);
        }

        /* ── scroll container ── */
        .w-scroll {
          height: 100dvh; overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scrollbar-width: none;
          background: #000;
        }
        .w-scroll::-webkit-scrollbar { display: none; }

        /* ── section ── */
        .w-sec {
          position: relative; height: 100dvh;
          scroll-snap-align: start; overflow: hidden;
          display: flex; align-items: flex-end;
        }

        /* ── background image (Ken Burns on active) ── */
        .w-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.38);
          transform: scale(1.06);
          transition: transform 10s cubic-bezier(0.1,0,0.3,1),
                      filter 1.4s ease;
          will-change: transform;
        }
        .w-sec--active .w-bg {
          transform: scale(1.0);
          filter: brightness(0.46);
        }
        .w-overlay {
          position: absolute; inset: 0;
          pointer-events: none;
        }

        /* ── text block ── */
        .w-txt {
          position: relative; z-index: 2;
          padding: 0 clamp(2rem,8vw,5.5rem) clamp(5rem,10vh,8rem);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.4,0,0.2,1),
                      transform 0.85s cubic-bezier(0.4,0,0.2,1);
        }
        .w-txt--in {
          opacity: 1;
          transform: translateY(0);
        }

        .w-meta {
          display: block;
          font-family: var(--font-space-mono), monospace;
          font-size: 8px; letter-spacing: 0.4em;
          color: rgba(255,255,255,0.32);
          margin-bottom: 0.9rem;
          transition-delay: 0.05s;
        }
        .w-badge {
          display: inline-block;
          font-family: var(--font-space-mono), monospace;
          font-size: 7px; letter-spacing: 0.4em;
          margin-bottom: 0.8rem;
          padding: 3px 8px;
          border: 1px solid currentColor;
          opacity: 0.8;
        }
        /* Title — sans-serif stack that covers CJK without serif fallback */
        .w-title {
          font-family: var(--font-geist-sans), "PingFang TC", "Noto Sans TC",
                       "Microsoft JhengHei", sans-serif;
          font-size: clamp(1.9rem, 4.8vw, 4.2rem);
          line-height: 1.18;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.26em;            /* start wide → narrows on enter */
          margin: 0 0 clamp(1.2rem,2.5vh,2rem);
          font-weight: 300;
          transition: letter-spacing 1.3s cubic-bezier(0.4,0,0.2,1);
        }
        .w-txt--in .w-title {
          letter-spacing: 0.10em;            /* focus-in effect */
        }
        /* Trilogy: champagne gold */
        .w-title--trilogy {
          color: rgba(227,210,180,0.82);
        }
        .w-cta {
          display: inline-block;
          font-family: var(--font-space-mono), monospace;
          font-size: 8px; letter-spacing: 0.38em;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          padding-bottom: 3px;
          transition: color 0.3s, border-color 0.3s, letter-spacing 0.5s;
        }
        .w-cta:hover {
          color: rgba(255,255,255,0.92);
          border-color: rgba(255,255,255,0.55);
          letter-spacing: 0.46em;
        }

        /* ── section index number ── */
        .w-idx {
          position: absolute; right: clamp(2rem,7vw,5rem); top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-space-mono), monospace;
          font-size: clamp(4rem,10vw,7.5rem);
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.035);
          font-weight: 400;
          user-select: none; pointer-events: none; z-index: 1;
          line-height: 1;
        }

        /* ── scroll hint (first section) ── */
        @keyframes wBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(7px); }
        }
        .w-hint {
          position: absolute; bottom: 2.5rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          opacity: 0.4; z-index: 2;
          animation: wBounce 2.2s ease-in-out infinite;
          pointer-events: none;
        }
        .w-hint span {
          font-family: var(--font-space-mono), monospace;
          font-size: 7px; letter-spacing: 0.38em; color: #fff;
        }
        .w-hint svg { opacity: 0.7; }

        /* ── right side dots nav ── */
        .w-nav {
          position: fixed; right: 1.6rem; top: 50%;
          transform: translateY(-50%);
          z-index: 200;
          display: flex; flex-direction: column; gap: 9px; align-items: flex-end;
        }
        .w-dot-item {
          display: flex; align-items: center; gap: 9px;
          text-decoration: none; position: relative;
          cursor: pointer;
        }
        .w-dot-label {
          font-family: var(--font-space-mono), monospace;
          font-size: 7px; letter-spacing: 0.14em;
          color: rgba(255,255,255,0.45);
          white-space: nowrap;
          opacity: 0;
          transform: translateX(6px);
          transition: opacity 0.22s, transform 0.22s;
          pointer-events: none;
        }
        .w-dot-item:hover .w-dot-label,
        .w-dot-item:focus .w-dot-label {
          opacity: 1; transform: translateX(0);
        }
        .w-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(255,255,255,0.22);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .w-dot--active {
          width: 6px; height: 6px;
          background: rgba(255,255,255,0.82);
        }
        .w-dot-item:hover .w-dot,
        .w-dot-item:focus .w-dot {
          background: rgba(255,255,255,0.75);
        }

        /* ── mobile ── */
        @media (max-width: 640px) {
          .w-nav { display: none; }
          .w-idx { display: none; }
          .w-title { font-size: clamp(2.4rem,13vw,4.2rem); }
          .w-txt { padding: 0 1.6rem clamp(4rem,12vh,6rem); }
        }
      `}</style>

      {/* Fixed top bar */}
      <div className="wt-bar" role="banner">
        <Link href="/" className="wt-back" aria-label="返回首頁">← MINEH4O</Link>
        <span className="wt-label" aria-hidden="true">WORKS</span>
      </div>

      {/* Right side dot nav */}
      <nav className="w-nav" aria-label="作品快捷導覽">
        {worksData.map((w, i) => (
          <a
            key={w.slug}
            href={`#${w.slug}`}
            className="w-dot-item"
            aria-label={w.title}
            aria-current={activeIdx === i ? 'true' : undefined}
          >
            <span className="w-dot-label">{w.title.split('《')[0] || w.artist}</span>
            <span className={`w-dot${activeIdx === i ? ' w-dot--active' : ''}`} />
          </a>
        ))}
      </nav>

      {/* Scroll container */}
      <div className="w-scroll" role="main" aria-label="作品列表">
        {worksData.map((w, i) => {
          const thumb  = `https://img.youtube.com/vi/${w.youtubeId}/maxresdefault.jpg`;
          const isAct  = activeIdx === i;
          const isVis  = visible.has(i);
          const badge  = getBadge(w.slug);

          return (
            <section
              key={w.slug}
              id={w.slug}
              data-idx={String(i)}
              ref={el => { sectionRefs.current[i] = el as HTMLElement | null; }}
              className={`w-sec${isAct ? ' w-sec--active' : ''}`}
              aria-label={w.title}
            >
              {/* BG image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-bg"
                src={thumb}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? 'eager' : 'lazy'}
              />

              {/* Colour overlay */}
              <div
                className="w-overlay"
                style={{ background: getOverlay(w.slug) }}
                aria-hidden="true"
              />

              {/* Large faint index */}
              <span className="w-idx" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Text */}
              <div className={`w-txt${isVis ? ' w-txt--in' : ''}`}>
                <span className="w-meta">
                  {w.artist} · {w.role} · {w.uploadDate.slice(0, 4)}
                </span>

                {badge && (
                  <span
                    className="w-badge"
                    style={{ color: badge.color, borderColor: badge.color }}
                  >
                    {badge.text}
                  </span>
                )}

                <h2 className={`w-title${trilogySet.has(w.slug) ? ' w-title--trilogy' : ''}`}>
                  {w.title}
                </h2>

                <Link
                  href={`/works/${w.slug}`}
                  className="w-cta"
                  aria-label={`查看 ${w.title} 完整作品`}
                >
                  VIEW WORK →
                </Link>
              </div>

              {/* Scroll hint on first section */}
              {i === 0 && (
                <div className="w-hint" aria-hidden="true">
                  <span>SCROLL</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M2 7l4 4 4-4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
