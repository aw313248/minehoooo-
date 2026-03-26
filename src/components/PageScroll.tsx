"use client";

import { useState, useEffect, useRef, useCallback, Children } from "react";

const LABELS = [
  "HERO",
  "ABOUT",
  "PHOTOGRAPHY",
  "VIDEO",
  "AIGC",
  "CONTACT",
];

interface Props {
  children: React.ReactNode;
}

// Each page pair gets a distinct cinematic transition style
// variant = nextPage % 3  →  0=rotateX-flip  1=clip-wipe  2=scale-blur
function getStyle(offset: number, absIndex: number): React.CSSProperties {
  const variant = absIndex % 3;

  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    overflowY: "auto",
    overflowX: "hidden",
    willChange: "transform, opacity, filter, clip-path",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  // ── Active page — resting state ──
  if (offset === 0) return {
    ...base,
    transform: "none",
    opacity: 1,
    filter: "blur(0px)",
    clipPath: "none",
    zIndex: 20,
    pointerEvents: "auto",
    transition:
      variant === 1
        ? "clip-path 0.9s cubic-bezier(0.76,0,0.24,1), opacity 0.6s ease"
        : "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease, filter 0.9s ease",
    transformOrigin: "50% 0%",
  };

  // ── Visited pages (above) — each variant exits differently ──
  if (offset < 0) {
    if (variant === 0) return {
      ...base,
      transform: "perspective(1600px) rotateX(-22deg) translateY(-6%) scale(0.82)",
      opacity: 0, filter: "blur(0px)",
      zIndex: 10, pointerEvents: "none",
      transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease",
      transformOrigin: "50% 100%",
    };
    if (variant === 1) return {
      ...base,
      clipPath: "inset(0% 0% 100% 0%)",
      opacity: 0, filter: "blur(0px)",
      zIndex: 10, pointerEvents: "none",
      transition: "clip-path 0.9s cubic-bezier(0.76,0,0.24,1), opacity 0.5s ease",
    };
    // variant 2
    return {
      ...base,
      transform: "scale(0.78) translateY(-5%)",
      opacity: 0, filter: "blur(16px)",
      zIndex: 10, pointerEvents: "none",
      transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.65s ease, filter 0.65s ease",
    };
  }

  // ── Pages waiting below — varied entrances ──
  if (variant === 0) {
    // Cinematic rotateX perspective fold (dramatic)
    return {
      ...base,
      transform: `perspective(1600px) rotateX(14deg) translateY(${offset * 100}%) scale(0.92)`,
      opacity: offset === 1 ? 0.05 : 0,
      filter: "blur(0px)",
      zIndex: Math.max(15 - offset, 1), pointerEvents: "none",
      transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.88s ease",
      transformOrigin: "50% 0%",
    };
  }
  if (variant === 1) {
    // Clip-path wipe from bottom (curtain reveal)
    return {
      ...base,
      clipPath: offset === 1 ? "inset(100% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
      opacity: offset === 1 ? 1 : 0,
      filter: "blur(0px)",
      zIndex: Math.max(15 - offset, 1), pointerEvents: "none",
      transition: "clip-path 0.9s cubic-bezier(0.76,0,0.24,1), opacity 0.3s ease",
    };
  }
  // variant 2: blur + scale zoom
  return {
    ...base,
    transform: `translateY(${offset * 100}%) scale(0.82)`,
    opacity: 0,
    filter: offset === 1 ? "blur(24px)" : "blur(8px)",
    zIndex: Math.max(15 - offset, 1), pointerEvents: "none",
    transition: "transform 0.95s cubic-bezier(0.16,1,0.3,1), opacity 0.95s ease, filter 0.95s ease",
  };
}

export default function PageScroll({ children }: Props) {
  const pages = Children.toArray(children);
  const [page, setPage]               = useState(0);
  const [transitioning, setTrans]     = useState(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const total = pages.length;

  const navigate = useCallback((dir: 1 | -1) => {
    setPage(p => {
      const next = p + dir;
      if (next < 0 || next >= total) return p;
      setTrans(true);
      setTimeout(() => setTrans(false), 950);
      return next;
    });
  }, [total]);

  // Wheel handler — navigate only at scroll boundary of current page
  useEffect(() => {
    let last = 0;

    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      const cur = refs.current[page];
      if (!cur) return;

      const atBottom = cur.scrollTop + cur.clientHeight >= cur.scrollHeight - 4;
      const atTop    = cur.scrollTop <= 4;

      if (e.deltaY > 0 && atBottom) {
        e.preventDefault();
        if (!transitioning && now - last > 700) { last = now; navigate(1); }
      } else if (e.deltaY < 0 && atTop) {
        e.preventDefault();
        if (!transitioning && now - last > 700) { last = now; navigate(-1); }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [page, navigate, transitioning]);

  // Touch swipe
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      const dy   = startY - e.changedTouches[0].clientY;
      const cur  = refs.current[page];
      if (!cur) return;
      const atBottom = cur.scrollTop + cur.clientHeight >= cur.scrollHeight - 4;
      const atTop    = cur.scrollTop <= 4;
      if (dy > 60  && atBottom) navigate(1);
      if (dy < -60 && atTop)   navigate(-1);
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend",   onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [page, navigate]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") navigate(1);
      if (e.key === "ArrowUp"   || e.key === "PageUp")   navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  // Reset inner scroll when switching pages
  useEffect(() => {
    const cur = refs.current[page];
    if (cur) cur.scrollTop = 0;
  }, [page]);

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#000" }}>

      {/* ── Pages ── */}
      {pages.map((child, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el; }}
          style={getStyle(i - page, i)}
        >
          {child}
        </div>
      ))}

      {/* ── Page indicator ── */}
      <div className="page-nav" style={{
        position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)",
        zIndex: 100, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end",
      }}>
        {LABELS.slice(0, total).map((lbl, i) => (
          <button
            key={i}
            onClick={() => {
              if (!transitioning) {
                setTrans(true);
                setTimeout(() => setTrans(false), 950);
                setPage(i);
              }
            }}
            title={lbl}
            style={{
              display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
              cursor: "pointer", padding: "2px 0",
            }}
          >
            <span className="page-nav-label" style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 8, letterSpacing: "0.2em",
              color: i === page ? "rgba(255,255,255,0.7)" : "transparent",
              transition: "color 0.3s ease",
              whiteSpace: "nowrap",
            }}>
              {lbl}
            </span>
            <div className={i === page ? "page-nav-dot-active" : "page-nav-dot"} style={{
              width:  i === page ? 18 : 4,
              height: 4,
              borderRadius: 2,
              background: i === page ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }} />
          </button>
        ))}
      </div>

      {/* ── Frosted glass transition flash ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 25, pointerEvents: "none",
        opacity: transitioning ? 1 : 0,
        backdropFilter: transitioning ? "blur(14px) brightness(0.75)" : "blur(0px) brightness(1)",
        WebkitBackdropFilter: transitioning ? "blur(14px) brightness(0.75)" : "blur(0px) brightness(1)",
        background: transitioning ? "rgba(5,5,8,0.38)" : "rgba(0,0,0,0)",
        transition: transitioning
          ? "opacity 0.12s ease, backdrop-filter 0.2s ease, background 0.2s ease"
          : "opacity 0.55s ease 0.38s, backdrop-filter 0.55s ease 0.38s, background 0.55s ease 0.38s",
      }} />

      {/* ── Progress bar (top) ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 99,
        height: 1.5,
        width: `${((page) / (total - 1)) * 100}%`,
        background: "rgba(255,255,255,0.35)",
        transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
        backdropFilter: "blur(4px)",
      }} />
    </div>
  );
}
