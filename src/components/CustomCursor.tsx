"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Flash { id: number; x: number; y: number; }

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const [flashes, setFlashes] = useState<Flash[]>([]);

  const addFlash = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setFlashes(p => [...p, { id, x, y }]);
    setTimeout(() => setFlashes(p => p.filter(f => f.id !== id)), 500);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf: number;
    let isHover = false;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      isHover = !!t.closest("a, button, [role='button'], label, input, textarea, select");
    };

    const onDown = (e: MouseEvent) => {
      addFlash(e.clientX, e.clientY);
    };

    const tick = () => {
      // Dot snaps at cursor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px,${my}px)`;
      }
      // Ring follows with tight lag (0.32 = snappy)
      rx += (mx - rx) * 0.32;
      ry += (my - ry) * 0.32;
      if (ringRef.current) {
        const scale = isHover ? 1.7 : 1;
        ringRef.current.style.transform = `translate(${rx}px,${ry}px) scale(${scale})`;
        ringRef.current.style.opacity   = isHover ? "0.8" : "1";
        ringRef.current.style.borderColor = isHover ? "rgba(180,200,255,0.55)" : "rgba(255,255,255,0.4)";
      }
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mousedown",  onDown);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mousedown",  onDown);
    };
  }, [addFlash]);

  return (
    <>
      {/* Dot — tight snap */}
      <div ref={dotRef} style={{
        position: "fixed",
        top: -4, left: -4,
        width: 8, height: 8,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.95)",
        pointerEvents: "none",
        zIndex: 999999,
        mixBlendMode: "difference",
        willChange: "transform",
      }} />

      {/* Ring — lagged follow */}
      <div ref={ringRef} style={{
        position: "fixed",
        top: -18, left: -18,
        width: 36, height: 36,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.4)",
        pointerEvents: "none",
        zIndex: 999998,
        transition: "opacity 0.3s ease",
        willChange: "transform",
        backdropFilter: "blur(1px)",
      }} />

      {/* Camera shutter flashes at click position */}
      {flashes.map(f => (
        <div key={f.id} style={{
          position: "fixed",
          left: f.x - 28, top: f.y - 28,
          width: 56, height: 56,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999997,
          animation: "shutterFlash 0.45s ease-out forwards",
        }} />
      ))}

      <style>{`
        @keyframes shutterFlash {
          0%   { background: rgba(255,255,255,0.55); transform: scale(0.4); opacity: 1; }
          40%  { background: rgba(255,255,255,0.2);  transform: scale(1);   opacity: 0.8; }
          100% { background: rgba(255,255,255,0);    transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </>
  );
}
