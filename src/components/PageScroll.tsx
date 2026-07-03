"use client";

import { useState, useEffect, useRef, useCallback, Children } from "react";
import { haptic } from "@/lib/haptic";

const LABELS = [
  "HERO",
  "ABOUT",
  "PHOTOGRAPHY",
  "VIDEO",
  "AIGC",
  "PROJECTS",
  "CONTACT",
];

interface Props {
  children: React.ReactNode;
}

// Single site-wide cut grammar — dip-through-black dissolve.
// One film, one edit: exiting page drifts forward into black, entering page
// surfaces from black. The black dip overlay (rendered below) masks the seam.
const CUT_EASE = "cubic-bezier(0.45,0,0.25,1)";
const CUT_MS   = 950;

function getStyle(offset: number): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    overflowY: "auto",
    overflowX: "hidden",
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transformOrigin: "50% 50%",
    transition: `transform ${CUT_MS}ms ${CUT_EASE}, opacity ${CUT_MS}ms ${CUT_EASE}`,
  };

  // Pages not adjacent — fully hidden
  if (Math.abs(offset) > 1) {
    return { ...base, opacity: 0, zIndex: 1, pointerEvents: "none", transition: "none" };
  }

  // Active page — surfaces from black
  if (offset === 0) {
    return { ...base, transform: "scale(1)", opacity: 1, zIndex: 20, pointerEvents: "auto" };
  }

  // Exited — camera keeps pushing in as the frame sinks into black
  if (offset < 0) {
    return { ...base, transform: "scale(1.035)", opacity: 0, zIndex: 10, pointerEvents: "none" };
  }

  // Waiting — slightly pulled back, dark, ready to surface
  return { ...base, transform: "scale(0.965)", opacity: 0, zIndex: 15, pointerEvents: "none" };
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
      haptic.bump();   // page-flip haptic feedback
      setTimeout(() => setTrans(false), 950);
      return next;
    });
  }, [total]);

  // Wheel handler — internal scroll first, snap to next page at boundary
  // Why: full page-flip skips content in long sections (Video / Photo). Restore safe behavior
  // until those sections are compressed to fit one viewport.
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

  // ── On mount: honor `?section=` query so links like /?section=video work ──
  // photo→2, video→3, aigc→4, projects→4 (no dedicated projects page yet — falls back to AIGC)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    if (!section) return;
    const map: Record<string, number> = {
      hero: 0,
      about: 1,
      photo: 2,
      photography: 2,
      video: 3,
      aigc: 4,
      projects: 4,
      contact: 5,
    };
    const target = map[section.toLowerCase()];
    if (typeof target === "number" && target >= 0 && target < total) {
      setPage(target);
      // Strip the query so it doesn't override later in-app nav
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("section");
        window.history.replaceState({}, "", url.toString());
      } catch {}
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {/* ── Black dip — masks the crossfade seam, replays per navigation ── */}
      {transitioning && (
        <div key={page} aria-hidden="true" style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "#000", pointerEvents: "none", opacity: 0,
          animation: "pageDip 0.95s cubic-bezier(0.45,0,0.25,1)",
        }} />
      )}

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
