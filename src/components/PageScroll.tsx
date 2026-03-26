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

// 6 unique per-page transitions — no translateY, pure in-place animations
// v = absIndex % 6  →  0=scale-dissolve  1=curtain-wipe  2=blur-skew  3=perspective-fold  4=split-reveal  5=iris-open
function getStyle(offset: number, absIndex: number): React.CSSProperties {
  const v = absIndex % 6;

  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    overflowY: "auto",
    overflowX: "hidden",
    willChange: "transform, opacity, filter, clip-path",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  // Pages not adjacent — fully hidden
  if (Math.abs(offset) > 1) {
    return { ...base, opacity: 0, zIndex: 1, pointerEvents: "none" };
  }

  // ── Active page ──
  if (offset === 0) {
    const clipActive = v === 1 ? "inset(0% 0% 0% 0%)" : v === 4 ? "inset(0% 0% 0% 0%)" : v === 5 ? "circle(140% at 50% 50%)" : "none";
    const txActive   = v === 3 ? "0.95s cubic-bezier(0.16,1,0.3,1)" : "0.95s cubic-bezier(0.16,1,0.3,1)";
    return {
      ...base,
      transform: "none", opacity: 1, filter: "blur(0px)", clipPath: clipActive,
      zIndex: 20, pointerEvents: "auto",
      transformOrigin: v === 3 ? "50% 0%" : "50% 50%",
      transition:
        v === 1 ? `clip-path 0.92s cubic-bezier(0.76,0,0.24,1), opacity 0.5s ease` :
        v === 4 ? `clip-path 0.9s cubic-bezier(0.76,0,0.24,1)` :
        v === 5 ? `clip-path 0.9s cubic-bezier(0.34,1.56,0.64,1)` :
        v === 2 ? `transform ${txActive}, opacity 0.88s ease, filter 0.88s ease` :
                  `transform ${txActive}, opacity 0.95s ease`,
    };
  }

  // ── Exited (offset = −1) — each page exits with its own style ──
  if (offset < 0) {
    switch (v) {
      case 0: // Scale dissolve — shrinks away
        return { ...base, transform: "scale(0.88)", opacity: 0,
          zIndex: 10, pointerEvents: "none", transformOrigin: "50% 50%",
          transition: "transform 0.95s cubic-bezier(0.16,1,0.3,1), opacity 0.75s ease" };
      case 1: // Curtain wipe — page collapses upward
        return { ...base, clipPath: "inset(0% 0% 100% 0%)", opacity: 0,
          zIndex: 10, pointerEvents: "none",
          transition: "clip-path 0.92s cubic-bezier(0.76,0,0.24,1), opacity 0.5s ease" };
      case 2: // Blur + skew — twists and dissolves
        return { ...base, transform: "scale(0.94) rotateZ(-1.8deg)", opacity: 0, filter: "blur(16px)",
          zIndex: 10, pointerEvents: "none",
          transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.65s ease, filter 0.65s ease" };
      case 3: // Perspective fold — folds back like a book page
        return { ...base, transform: "perspective(1400px) rotateX(-16deg) scale(0.9)", opacity: 0,
          zIndex: 10, pointerEvents: "none", transformOrigin: "50% 100%",
          transition: "transform 0.95s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease" };
      case 4: // Split reveal — collapses to center vertical line
        return { ...base, clipPath: "inset(0% 50% 0% 50%)", opacity: 0,
          zIndex: 10, pointerEvents: "none",
          transition: "clip-path 0.9s cubic-bezier(0.76,0,0.24,1), opacity 0.5s ease 0.1s" };
      default: // Iris close — circle collapses to center point
        return { ...base, clipPath: "circle(0% at 50% 50%)", opacity: 0,
          zIndex: 10, pointerEvents: "none",
          transition: "clip-path 0.88s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease 0.18s" };
    }
  }

  // ── Waiting (offset = 1) — ready to enter ──
  switch (v) {
    case 0: // Scale up from slight zoom-in
      return { ...base, transform: "scale(1.08)", opacity: 0,
        zIndex: 15, pointerEvents: "none", transformOrigin: "50% 50%",
        transition: "transform 0.95s cubic-bezier(0.16,1,0.3,1), opacity 0.95s ease" };
    case 1: // Curtain — starts fully clipped from top
      return { ...base, clipPath: "inset(100% 0% 0% 0%)", opacity: 1,
        zIndex: 15, pointerEvents: "none",
        transition: "clip-path 0.92s cubic-bezier(0.76,0,0.24,1)" };
    case 2: // Blur + opposite skew
      return { ...base, transform: "scale(1.05) rotateZ(1.8deg)", opacity: 0, filter: "blur(16px)",
        zIndex: 15, pointerEvents: "none",
        transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.88s ease, filter 0.88s ease" };
    case 3: // Perspective unfold — tilted forward, then flattens
      return { ...base, transform: "perspective(1400px) rotateX(10deg) scale(0.95)", opacity: 0,
        zIndex: 15, pointerEvents: "none", transformOrigin: "50% 0%",
        transition: "transform 0.95s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease" };
    case 4: // Split — starts as vertical center line, expands outward
      return { ...base, clipPath: "inset(0% 50% 0% 50%)", opacity: 1,
        zIndex: 15, pointerEvents: "none",
        transition: "clip-path 0.9s cubic-bezier(0.76,0,0.24,1)" };
    default: // Iris open — expands from center point
      return { ...base, clipPath: "circle(0% at 50% 50%)", opacity: 1,
        zIndex: 15, pointerEvents: "none",
        transition: "clip-path 0.88s cubic-bezier(0.34,1.56,0.64,1)" };
  }
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
        if (!transitioning && now - last > 950) { last = now; navigate(1); }
      } else if (e.deltaY < 0 && atTop) {
        e.preventDefault();
        if (!transitioning && now - last > 950) { last = now; navigate(-1); }
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

  // Broadcast current page to Navbar (and any other listeners)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("pagechange", { detail: page }));
  }, [page]);

  // Listen for Navbar navigation requests
  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent<number>).detail;
      if (idx < 0 || idx >= total || transitioning) return;
      setTrans(true);
      setTimeout(() => setTrans(false), 950);
      setPage(idx);
    };
    window.addEventListener("navto", handler);
    return () => window.removeEventListener("navto", handler);
  }, [total, transitioning]);

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

      {/* ── Page indicator — desktop only ── */}
      <div className="page-nav hidden md:flex" style={{
        position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)",
        zIndex: 100, flexDirection: "column", gap: 6, alignItems: "flex-end",
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
            aria-label={`Go to ${lbl}`}
            aria-current={i === page ? "page" : undefined}
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
