"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Editorial entry card injected into the home page's AIGC section.
 * It is the primary way to discover Field Notes from the portfolio.
 * Behavior:
 *   - Looping hero-loop.mp4 as backdrop, with social-cover.jpg as poster
 *   - Honors prefers-reduced-motion (swaps to static poster)
 *   - Heavy glass overlay so the CTA copy stays readable on top
 *   - Full-bleed within the AIGC column, single-row on desktop, stacked on mobile
 */
export default function FieldNotesCTA() {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const VIDEO = "/field-notes/seedance-map-route/hero-loop.mp4";
  const POSTER = "/field-notes/seedance-map-route/social-cover.jpg";

  return (
    <Link
      href="/field-notes/seedance-aerial"
      aria-label="AIGC Field Notes 01 — Higgsfield × Seedance"
      className="group relative block overflow-hidden"
      style={{
        background: "#050507",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 18,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.07), 0 18px 56px rgba(0,0,0,0.34)",
        textDecoration: "none",
        color: "inherit",
        isolation: "isolate",
        minHeight: 280,
      }}
    >
      {/* Backdrop media — autoplay video or static poster */}
      {reduceMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          aria-hidden
          src={POSTER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.5) saturate(0.85)" }}
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          aria-hidden
          src={VIDEO}
          poster={POSTER}
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.5) saturate(0.85)" }}
        />
      )}

      {/* Dark wash so text stays readable on top of moving footage */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,7,0.86) 0%, rgba(5,5,7,0.62) 55%, rgba(5,5,7,0.46) 100%), linear-gradient(180deg, rgba(5,5,7,0.25) 0%, rgba(5,5,7,0.7) 100%)",
        }}
      />

      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.06,
          mixBlendMode: "screen",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-[1.6fr_auto] items-center gap-6 md:gap-12 px-6 md:px-10 lg:px-14 py-10 md:py-14">

        {/* Left: copy */}
        <div className="min-w-0">
          {/* Eyebrow row */}
          <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-5">
            <span
              className="font-mono-label uppercase whitespace-nowrap"
              style={{
                fontSize: 10, letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.62)",
                padding: "5px 11px",
                background: "rgba(255,255,255,0.055)",
                backdropFilter: "blur(20px) saturate(125%)",
                WebkitBackdropFilter: "blur(20px) saturate(125%)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 4,
              }}
            >
              AIGC Field Notes 01
            </span>
            <span
              className="font-mono-label uppercase whitespace-nowrap"
              style={{
                fontSize: 10, letterSpacing: "0.4em",
                color: "rgba(255,225,140,0.92)",
                padding: "5px 11px",
                background: "rgba(255,225,140,0.06)",
                border: "1px solid rgba(255,225,140,0.28)",
                borderRadius: 4,
              }}
            >
              Higgsfield × Seedance
            </span>
          </div>

          {/* Headline — carefully broken so phrases stay intact */}
          <h3
            className="font-display leading-[1.08]"
            style={{
              fontSize: "clamp(1.6rem, 3.6vw, 2.6rem)",
              color: "var(--text)",
              letterSpacing: "0.005em",
              wordBreak: "keep-all",
              overflowWrap: "anywhere",
            }}
          >
            用一張路徑圖，<br/>生成電影級 FPV 城市空拍鏡頭
          </h3>

          {/* English caption */}
          <p
            className="mt-3 md:mt-4 max-w-md font-mono-label uppercase"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.32em",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
            }}
          >
            From one path-painted image to a cinematic FPV aerial shot.
          </p>
        </div>

        {/* Right: OPEN WORKFLOW arrow line — never wraps */}
        <div className="flex items-center md:justify-end gap-4 shrink-0 whitespace-nowrap">
          <span
            aria-hidden
            style={{
              width: 48, height: 1,
              background: "rgba(255,255,255,0.5)",
              transition: "width .35s cubic-bezier(.16,1,.3,1)",
            }}
            className="group-hover:!w-[90px]"
          />
          <span
            className="font-mono-label uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.36em",
              color: "rgba(255,225,140,0.95)",
            }}
          >
            Open Workflow
          </span>
          <span
            aria-hidden
            style={{ fontSize: 16, lineHeight: 1, color: "rgba(255,225,140,0.85)" }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
