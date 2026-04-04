"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LangContext";

// 0=Hero, 1=About, 2=Photography, 3=Video, 4=AIGC, 5=Contact
const desktopLinks = [
  { label: "PHOTO",   labelZh: "攝影",   page: 2 },
  { label: "VIDEO",   labelZh: "影像",   page: 3 },
  { label: "AIGC",    labelZh: "AIGC",   page: 4 },
  { label: "ABOUT",   labelZh: "關於",   page: 1 },
  { label: "CONTACT", labelZh: "聯絡",   page: 5 },
];

const mobileLinks = [
  { label: "PHOTOGRAPHY", labelZh: "攝影",   page: 2 },
  { label: "VIDEO",        labelZh: "影像",   page: 3 },
  { label: "AIGC",         labelZh: "AIGC",   page: 4 },
  { label: "ABOUT",        labelZh: "關於",   page: 1 },
  { label: "CONTACT",      labelZh: "聯絡",   page: 5 },
];

function goto(page: number) {
  window.dispatchEvent(new CustomEvent("navto", { detail: page }));
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activePage, setActivePage] = useState(0);
  const { lang, toggle } = useLang();

  useEffect(() => {
    const onPageChange = (e: Event) => setActivePage((e as CustomEvent<number>).detail);
    window.addEventListener("pagechange", onPageChange);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("pagechange", onPageChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled || activePage > 0 ? "rgba(0,0,0,0.82)" : "transparent",
        backdropFilter: scrolled || activePage > 0 ? "blur(20px) saturate(1.8)" : "none",
        borderBottom: scrolled || activePage > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      {/* Progress line */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.04)" }}>
        <div style={{
          height: "100%",
          width: `${(activePage / 5) * 100}%`,
          background: "linear-gradient(to right, rgba(255,255,255,0.35), rgba(255,255,255,0.12))",
          transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>

      <nav className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <button
          onClick={() => goto(0)}
          className="font-display text-lg tracking-widest transition-opacity duration-300"
          style={{ color: "#f5f5f7", background: "none", border: "none", cursor: "pointer",
            opacity: activePage === 0 ? 0.5 : 1 }}
        >
          MINEH4O
        </button>

        {/* Desktop — all links inline */}
        <ul className="hidden md:flex items-center gap-8">
          {desktopLinks.map((l) => {
            const active = activePage === l.page;
            return (
              <li key={l.page}>
                <button
                  onClick={() => goto(l.page)}
                  className="relative flex flex-col items-center gap-1"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 0" }}
                >
                  <span
                    className="font-mono-label text-[10px] tracking-[0.28em] transition-colors duration-300"
                    style={{ color: active ? "#f5f5f7" : "#6e6e73" }}
                    onMouseEnter={e => !active && (e.currentTarget.style.color = "rgba(245,245,247,0.7)")}
                    onMouseLeave={e => !active && (e.currentTarget.style.color = "#6e6e73")}
                  >
                    {lang === "zh" ? l.labelZh : l.label}
                  </span>
                  <div style={{
                    width: active ? 16 : 0, height: 1.5, borderRadius: 1,
                    background: active ? "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.3))" : "transparent",
                    boxShadow: active ? "0 0 6px rgba(255,255,255,0.35)" : "none",
                    transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                  }} />
                </button>
              </li>
            );
          })}

          {/* Language toggle */}
          <li>
            <button onClick={toggle}
              className="font-mono-label text-[9px] tracking-[0.22em] px-2 py-1"
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.5)",
                background: "transparent", cursor: "pointer",
                transition: "color .25s ease, border-color .25s ease",
                letterSpacing: "0.18em",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; }}>
              {lang === "zh" ? "EN" : "中文"}
            </button>
          </li>
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
          <ul className="flex flex-col gap-5">
            {mobileLinks.map((l) => {
              const active = activePage === l.page;
              return (
                <li key={l.page}>
                  <button
                    onClick={() => { goto(l.page); setMenuOpen(false); }}
                    className="flex items-center gap-3"
                    style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
                      transition: "background .3s",
                    }} />
                    <span className="font-mono-label text-xs tracking-[0.3em]"
                      style={{ color: active ? "#f5f5f7" : "rgba(255,255,255,0.45)" }}>
                      {lang === "zh" ? l.labelZh : l.label}
                    </span>
                  </button>
                </li>
              );
            })}
            <li style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
              <button onClick={toggle}
                className="font-mono-label text-xs tracking-[0.3em]"
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)" }}>
                {lang === "zh" ? "SWITCH TO EN" : "切換中文"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
