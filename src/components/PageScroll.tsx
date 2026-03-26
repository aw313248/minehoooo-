"use client";

import { useState, useEffect, useRef, useCallback, Children } from "react";

const LABELS = [
  "HERO",
  "PHOTOGRAPHY",
  "VIDEO",
  "AIGC",
  "ABOUT",
  "CONTACT",
];

interface Props {
  children: React.ReactNode;
}

function getStyle(offset: number): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    overflowY: "auto",
    overflowX: "hidden",
    transition: "transform 0.92s cubic-bezier(0.16,1,0.3,1), opacity 0.92s cubic-bezier(0.16,1,0.3,1)",
    transformOrigin: "50% 100%",
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  if (offset === 0) return {
    ...base,
    transform: "perspective(1400px) rotateX(0deg) translateY(0%) scale(1)",
    opacity: 1,
    zIndex: 20,
    pointerEvents: "auto",
  };
  if (offset < 0) return {
    ...base,
    transform: "perspective(1400px) rotateX(-18deg) translateY(-6%) scale(0.86)",
    opacity: 0,
    zIndex: 10,
    pointerEvents: "none",
  };
  // offset > 0
  return {
    ...base,
    transform: `perspective(1400px) rotateX(10deg) translateY(${offset * 100}%) scale(0.94)`,
    opacity: offset === 1 ? 0.05 : 0,
    zIndex: Math.max(15 - offset, 1),
    pointerEvents: "none",
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
          style={getStyle(i - page)}
        >
          {child}
        </div>
      ))}

      {/* ── Page indicator (right side) ── */}
      <div style={{
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
            {/* Label (only current) */}
            <span style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 8, letterSpacing: "0.2em",
              color: i === page ? "rgba(255,255,255,0.7)" : "transparent",
              transition: "color 0.3s ease",
              whiteSpace: "nowrap",
            }}>
              {lbl}
            </span>
            {/* Dot */}
            <div style={{
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
