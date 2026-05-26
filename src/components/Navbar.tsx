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

  // Securify-style floating pill navbar — always transparent header, pills do the visual lift
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "transparent",
        fontFamily: "var(--font-readex), 'Readex Pro', system-ui, sans-serif",
      }}
    >
      {/* Top progress line — very subtle */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.04)" }}>
        <div style={{
          height: "100%",
          width: `${(activePage / 6) * 100}%`,
          background: "linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0.15))",
          transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>

      <nav className="flex items-center justify-between gap-4 px-6 md:px-10 pt-5">

        {/* ── LEFT PILL: logo + brand ── */}
        <button
          onClick={() => goto(0)}
          className="flex items-center gap-2.5 hover:bg-neutral-800/90 transition-colors"
          aria-label="Home"
          style={{
            background: "rgba(23,23,23,0.85)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 999,
            paddingLeft: 16, paddingRight: 22,
            paddingTop: 11, paddingBottom: 11,
            cursor: "pointer",
            opacity: scrolled || activePage > 0 ? 1 : 0.95,
          }}>
          {/* Logo mark — four-square M */}
          <svg className="h-5 w-5" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" fill="#ffffff"/>
          </svg>
          <span className="text-white text-sm uppercase" style={{ fontWeight: 500, letterSpacing: "0.04em" }}>
            MINEHOOOO
          </span>
        </button>

        {/* ── CENTER PILL: nav links ── */}
        <ul className="hidden md:flex items-center gap-1"
          style={{
            background: "rgba(23,23,23,0.85)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 999,
            padding: "6px 8px",
          }}>
          {desktopLinks.map((l) => {
            const active = activePage === l.page;
            return (
              <li key={l.page}>
                <button
                  onClick={() => goto(l.page)}
                  className="transition-colors uppercase"
                  style={{
                    background: active ? "rgba(255,255,255,0.08)" : "transparent",
                    color: active ? "#fff" : "rgba(255,255,255,0.65)",
                    fontSize: 11, fontWeight: 500,
                    letterSpacing: "0.18em",
                    borderRadius: 999,
                    padding: "8px 14px",
                    border: "none", cursor: "pointer",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                >
                  {lang === "zh" ? l.labelZh : l.label}
                </button>
              </li>
            );
          })}
          {/* Language toggle — separator + tiny */}
          <li style={{ width: 1, height: 18, background: "rgba(255,255,255,0.1)", margin: "0 4px" }} aria-hidden="true" />
          <li>
            <button onClick={toggle}
              className="transition-colors uppercase"
              style={{
                fontSize: 10, fontWeight: 500,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.55)",
                background: "transparent",
                borderRadius: 999,
                padding: "8px 12px",
                border: "none", cursor: "pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}>
              {lang === "zh" ? "EN" : "中"}
            </button>
          </li>
        </ul>

        {/* ── RIGHT: get-started style CTA ── */}
        <button
          onClick={() => goto(6)}
          className="hidden md:block hover:bg-neutral-200 transition-colors uppercase"
          style={{
            background: "#fff",
            color: "#000",
            fontSize: 12, fontWeight: 500,
            borderRadius: 999,
            padding: "11px 22px",
            border: "none", cursor: "pointer",
            letterSpacing: "0.05em",
          }}>
          {lang === "zh" ? "聯絡合作" : "LET'S WORK"}
        </button>

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
