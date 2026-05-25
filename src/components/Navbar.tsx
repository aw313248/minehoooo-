"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LangContext";

// 0=Hero, 1=About, 2=Photography, 3=Video, 4=AIGC, 5=Projects, 6=Contact
const desktopLinks = [
  { label: "PHOTO",    labelZh: "攝影",   page: 2 },
  { label: "VIDEO",    labelZh: "影像",   page: 3 },
  { label: "AIGC",     labelZh: "AIGC",   page: 4 },
  { label: "PROJECTS", labelZh: "專案",   page: 5 },
  { label: "ABOUT",    labelZh: "關於",   page: 1 },
  { label: "CONTACT",  labelZh: "聯絡",   page: 6 },
];

const mobileLinks = [
  { label: "PHOTOGRAPHY", labelZh: "攝影",   page: 2 },
  { label: "VIDEO",        labelZh: "影像",   page: 3 },
  { label: "AIGC",         labelZh: "AIGC",   page: 4 },
  { label: "PROJECTS",     labelZh: "專案",   page: 5 },
  { label: "ABOUT",        labelZh: "關於",   page: 1 },
  { label: "CONTACT",      labelZh: "聯絡",   page: 6 },
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
        borderBottom: scrolled || activePage > 0 ? "1px solid var(--white-ghost)" : "none",
      }}
    >
      {/* Progress line */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "var(--white-ghost)" }}>
        <div style={{
          height: "100%",
          width: `${(activePage / 6) * 100}%`,
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

        {/* Desktop — pill-style nav */}
        <ul className="hidden md:flex items-center gap-2">
          {desktopLinks.map((l) => {
            const active = activePage === l.page;
            return (
              <li key={l.page}>
                <button
                  onClick={() => goto(l.page)}
                  className="relative"
                  style={{
                    background: active ? "var(--white-dim)" : "transparent",
                    border: `1px solid ${active ? "var(--white-soft)" : "transparent"}`,
                    borderRadius: 999,
                    cursor: "pointer",
                    padding: "8px 16px",
                    transition: "background .3s ease, border-color .3s ease, transform .2s ease",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = "var(--white-ghost)";
                      e.currentTarget.style.borderColor = "var(--white-ghost)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  <span
                    className="font-mono-label text-[11px] tracking-[0.28em] transition-colors duration-300"
                    style={{ color: active ? "var(--white-primary)" : "var(--white-soft)" }}
                  >
                    {lang === "zh" ? l.labelZh : l.label}
                  </span>
                </button>
              </li>
            );
          })}

          {/* Language toggle — pill */}
          <li className="ml-2">
            <button onClick={toggle}
              className="font-mono-label text-[10px] tracking-[0.22em] px-3.5 py-2"
              style={{
                border: "1px solid var(--white-dim)",
                borderRadius: 999,
                color: "var(--white-soft)",
                background: "var(--white-ghost)", cursor: "pointer",
                transition: "all .25s ease",
                letterSpacing: "0.18em",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--white-primary)"; e.currentTarget.style.borderColor = "var(--white-soft)"; e.currentTarget.style.background = "var(--white-dim)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--white-soft)"; e.currentTarget.style.borderColor = "var(--white-dim)"; e.currentTarget.style.background = "var(--white-ghost)"; }}>
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
                      background: active ? "var(--white-primary)" : "var(--white-dim)",
                      transition: "background .3s",
                    }} />
                    <span className="font-mono-label text-xs tracking-[0.3em]"
                      style={{ color: active ? "#f5f5f7" : "var(--white-soft)" }}>
                      {lang === "zh" ? l.labelZh : l.label}
                    </span>
                  </button>
                </li>
              );
            })}
            <li style={{ borderTop: "1px solid var(--white-ghost)", paddingTop: 16 }}>
              <button onClick={toggle}
                className="font-mono-label text-xs tracking-[0.3em]"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--white-soft)" }}>
                {lang === "zh" ? "SWITCH TO EN" : "切換中文"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
