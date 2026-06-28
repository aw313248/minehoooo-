"use client";

import { useEffect, useState } from "react";

/**
 * Hero backdrop — autoplay/loop/muted video covering the section.
 *
 *   - Defaults to playing the looping clip
 *   - Honors `prefers-reduced-motion: reduce` by swapping to a static poster image
 *   - Tunes brightness/saturation per spec so the foreground UI stays readable
 *
 * Layout: positioned absolutely inside a `relative` parent. Add a top-level
 *         dark gradient + grain on top of this; this component owns the
 *         media only, not the overlays.
 */
export default function HeroBackdrop({
  video,
  poster,
  alt = "",
  brightness = 0.55,
  saturate = 0.85,
}: {
  video: string;
  poster: string;
  alt?: string;
  brightness?: number;
  saturate?: number;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const filter = `brightness(${brightness}) saturate(${saturate})`;
  const sharedStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    filter,
  };

  if (reduceMotion) {
    // Static poster only — no autoplay, honors user preference
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster}
        alt={alt}
        aria-hidden
        style={sharedStyle}
      />
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      src={video}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      style={sharedStyle}
    />
  );
}
