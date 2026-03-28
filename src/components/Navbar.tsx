"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Page index → nav section mapping
// 0=Hero, 1=About, 2=Photography, 3=Video, 4=AIGC, 5=Contact
const navLinks = [
  { label: "WORK",    pages: [2, 3, 4], targetPage: 2 },
  { label: "ABOUT",  pages: [1],        targetPage: 1 },
  { label: "CONTACT",pages: [5],        targetPage: 5 },
];

function goto(page: number) {
  window.dispatchEvent(new CustomEvent("navto", { detail: page }));
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    // Current page index from PageScroll
    const onPageChange = (e: Event) => setActivePage((e as CustomEvent<number>).detail);
    window.addEventListener("pagechange", onPageChange);

    // Scroll-blur (for when sections scroll internally)
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("pagechange", onPageChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isActive = (link: typeof navLinks[number]) => link.pages.includes(activePage);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled || activePage > 0 ? "rgba(0,0,0,0.82)" : "transparent",
        backdropFilter: scrolled || activePage > 0 ? "blur(20px) saturate(1.8)" : "none",
        borderBottom: scrolled || activePage > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      {/* Page progress line — very bottom of header */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.04)" }}>
        <div style={{
          height: "100%",
          width: `${((activePage) / 5) * 100}%`,
          background: "linear-gradient(to right, rgba(255,255,255,0.35), rgba(255,255,255,0.12))",
          transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>

      <nav className="flex items-center justify-between px-6 md:px-10 py-4">
        <button
          onClick={() => goto(0)}
          className="font-display text-lg tracking-widest transition-opacity duration-300"
          style={{ color: "#f5f5f7", background: "none", border: "none", cursor: "pointer",
            opacity: activePage === 0 ? 0.5 : 1 }}
        >
          MINEH4O
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => {
            const active = isActive(l);
            return (
              <li key={l.label}>
                <button
                  onClick={() => goto(l.targetPage)}
                  className="relative flex flex-col items-center gap-1 group"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 0" }}
                >
                  <span className="font-mono-label text-[10px] tracking-[0.28em] transition-colors duration-300"
                    style={{ color: active ? "#f5f5f7" : "#6e6e73" }}
                    onMouseEnter={e => !active && (e.currentTarget.style.color = "rgba(245,245,247,0.7)")}
                    onMouseLeave={e => !active && (e.currentTarget.style.color = "#6e6e73")}>
                    {l.label}
                  </span>
                  {/* Active bar */}
                  <div style={{
                    width: active ? 16 : 0,
                    height: 1.5,
                    borderRadius: 1,
                    background: active
                      ? "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.3))"
                      : "transparent",
                    boxShadow: active ? "0 0 6px rgba(255,255,255,0.35)" : "none",
                    transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                  }} />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] py-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-[#f5f5f7] transition-all duration-300"
            style={{ transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
          <span className="block w-5 h-px bg-[#f5f5f7] transition-all duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-px bg-[#f5f5f7] transition-all duration-300"
            style={{ transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-6 border-t" style={{ background: "rgba(0,0,0,0.95)", borderColor: "rgba(255,255,255,0.07)" }}>
          <ul className="flex flex-col gap-6">
            {navLinks.map((l) => {
              const active = isActive(l);
              return (
                <li key={l.label}>
                  <button
                    onClick={() => { goto(l.targetPage); setMenuOpen(false); }}
                    className="flex items-center gap-3"
                    style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
                      transition: "background .3s",
                    }} />
                    <span className="font-mono-label text-xs tracking-[0.3em]"
                      style={{ color: active ? "#f5f5f7" : "rgba(255,255,255,0.45)" }}>
                      {l.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
