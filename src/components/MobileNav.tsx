"use client";

import { useState, useEffect } from "react";

const SECTIONS = ["HERO", "ABOUT", "PHOTO", "VIDEO", "AIGC", "CONTACT"];

function goto(page: number) {
  window.dispatchEvent(new CustomEvent("navto", { detail: page }));
}

export default function MobileNav() {
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const p = (e as CustomEvent<number>).detail;
      setPage(p);
      setVisible(p > 0);
      // Brief flash of section name on change
      setFlash(true);
      setTimeout(() => setFlash(false), 1600);
    };
    window.addEventListener("pagechange", handler);
    return () => window.removeEventListener("pagechange", handler);
  }, []);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "10px 24px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>

      {/* Current section label — brighter on flash */}
      <span className="font-mono-label text-[9px] tracking-[0.28em] transition-all duration-500"
        style={{ color: flash ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)" }}>
        {SECTIONS[page]}
      </span>

      {/* Dot nav */}
      <div className="flex items-center gap-2">
        {SECTIONS.map((_, i) => (
          <button key={i} onClick={() => goto(i)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <div style={{
              width: i === page ? 14 : 4,
              height: 4,
              borderRadius: 2,
              background: i === page ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
              boxShadow: i === page ? "0 0 8px rgba(255,255,255,0.45), 0 0 2px rgba(255,255,255,0.6)" : "none",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
            }} />
          </button>
        ))}
      </div>
    </div>
  );
}
