"use client";

import { useEffect, useRef, useState } from "react";

const IDLE_BEFORE_START = 12000; // ms idle before auto-play kicks in
const PAGE_DURATION     =  7000; // ms per page
const TOTAL_PAGES       =      6;

function goto(page: number) {
  window.dispatchEvent(new CustomEvent("navto", { detail: page }));
}

export default function AutoPlay() {
  const [active,   setActive]   = useState(false); // is auto-play running?
  const [progress, setProgress] = useState(0);     // 0–1 within current page
  const [curPage,  setCurPage]  = useState(0);

  const idleTimer    = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pageTimer    = useRef<ReturnType<typeof setTimeout>>(undefined);
  const rafRef       = useRef<number>(undefined);
  const startedAt    = useRef<number>(0);

  // Track current page
  useEffect(() => {
    const onPage = (e: Event) => setCurPage((e as CustomEvent<number>).detail);
    window.addEventListener("pagechange", onPage);
    return () => window.removeEventListener("pagechange", onPage);
  }, []);

  // Animate progress bar
  const animateProgress = () => {
    const elapsed = Date.now() - startedAt.current;
    const pct = Math.min(elapsed / PAGE_DURATION, 1);
    setProgress(pct);
    if (pct < 1) rafRef.current = requestAnimationFrame(animateProgress);
  };

  const stopAutoPlay = () => {
    setActive(false);
    setProgress(0);
    clearTimeout(pageTimer.current);
    cancelAnimationFrame(rafRef.current!);
  };

  const advancePage = (fromPage: number) => {
    const next = (fromPage + 1) % TOTAL_PAGES;
    goto(next);
    startedAt.current = Date.now();
    setProgress(0);
    cancelAnimationFrame(rafRef.current!);
    rafRef.current = requestAnimationFrame(animateProgress);
    pageTimer.current = setTimeout(() => advancePage(next), PAGE_DURATION);
  };

  const startAutoPlay = () => {
    setActive(true);
    startedAt.current = Date.now();
    cancelAnimationFrame(rafRef.current!);
    rafRef.current = requestAnimationFrame(animateProgress);
    pageTimer.current = setTimeout(() => {
      advancePage(curPage);
    }, PAGE_DURATION);
  };

  const resetIdle = () => {
    if (active) stopAutoPlay();
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(startAutoPlay, IDLE_BEFORE_START);
  };

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "wheel"];
    events.forEach(ev => window.addEventListener(ev, resetIdle, { passive: true }));
    idleTimer.current = setTimeout(startAutoPlay, IDLE_BEFORE_START);
    return () => {
      events.forEach(ev => window.removeEventListener(ev, resetIdle));
      clearTimeout(idleTimer.current);
      clearTimeout(pageTimer.current);
      cancelAnimationFrame(rafRef.current!);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, curPage]);

  if (!active) return null;

  return (
    <div className="fixed z-50 pointer-events-none"
      style={{ bottom: "2.2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>

      {/* Label */}
      <span className="font-mono-label text-[7px] tracking-[0.35em]"
        style={{ color: "rgba(255,255,255,0.25)", animation: "fadeSlideUp .5s ease both" }}>
        AUTO · PLAY
      </span>

      {/* Progress track */}
      <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.12)", borderRadius: 1, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: "rgba(255,255,255,0.5)",
          borderRadius: 1,
        }} />
      </div>
    </div>
  );
}
