"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";

// 0=Hero, 1=About, 2=Photography, 3=Video, 4=AIGC, 5=Projects, 6=Contact
// Items with `href` are external routes (e.g. /field-notes); items with `page` page-flip.
type NavItem =
  | { label: string; labelZh: string; page: number; href?: undefined }
  | { label: string; labelZh: string; href: string; page?: undefined };

const desktopLinks: NavItem[] = [
  { label: "HOME",     labelZh: "首頁",   page: 0 },
  { label: "PHOTO",    labelZh: "攝影",   page: 2 },
  { label: "VIDEO",    labelZh: "影像",   page: 3 },
  { label: "AIGC",     labelZh: "AIGC",   page: 4 },
  { label: "NOTES",    labelZh: "筆記",   href: "/field-notes" },
  { label: "PROJECTS", labelZh: "專案",   page: 5 },
  { label: "ABOUT",    labelZh: "關於",   page: 1 },
  { label: "CONTACT",  labelZh: "聯絡",   page: 6 },
];

const mobileLinks: NavItem[] = [
  { label: "PHOTOGRAPHY", labelZh: "攝影作品", page: 2 },
  { label: "VIDEO",       labelZh: "動態影像", page: 3 },
  { label: "AIGC",        labelZh: "AIGC 作品", page: 4 },
  { label: "ALL WORKS",   labelZh: "完整動態作品", href: "/works" },
];

const mobileSecondaryLinks: NavItem[] = [
  { label: "HOME",     labelZh: "首頁", page: 0 },
  { label: "PROJECTS", labelZh: "專案", page: 5 },
  { label: "NOTES",    labelZh: "現場筆記", href: "/field-notes" },
  { label: "ABOUT",    labelZh: "關於", page: 1 },
  { label: "CONTACT",  labelZh: "聯絡", page: 6 },
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

      <nav className="flex items-center justify-between gap-4 px-4 md:px-10 pt-3 md:pt-5">

        {/* ── LEFT PILL: logo + brand (desktop only — mobile uses MobileNav at bottom) ── */}
        <button
          onClick={() => goto(0)}
          className="hidden md:flex items-center gap-2.5 hover:bg-neutral-800/90 transition-colors"
          aria-label="Home"
          style={{
            background: "rgba(23,23,23,0.78)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 999,
            paddingLeft: 16, paddingRight: 22,
            paddingTop: 11, paddingBottom: 11,
            cursor: "pointer",
            opacity: scrolled || activePage > 0 ? 1 : 0.9,
          }}>
          <svg className="h-5 w-5" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" fill="#ffffff"/>
          </svg>
          <span className="text-white text-sm uppercase" style={{ fontWeight: 500, letterSpacing: "0.04em" }}>
            MINEHOOOO
          </span>
        </button>
        {/* Empty spacer to keep flex layout balanced on mobile */}
        <span className="md:hidden" />

        {/* ── CENTER PILL: nav links ── */}
        <ul className="hidden md:flex items-center gap-1"
          style={{
            background: "rgba(23,23,23,0.85)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 999,
            padding: "6px 8px",
          }}>
          {desktopLinks.map((l, i) => {
            const active = typeof l.page === "number" && activePage === l.page;
            const label = lang === "zh" ? l.labelZh : l.label;
            const baseStyle: React.CSSProperties = {
              background: active ? "rgba(255,255,255,0.08)" : "transparent",
              color: active ? "#fff" : "rgba(255,255,255,0.65)",
              fontSize: 11, fontWeight: 500,
              letterSpacing: "0.18em",
              borderRadius: 999,
              padding: "8px 14px",
              border: "none", cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            };
            return (
              <li key={`${l.label}-${i}`}>
                {l.href ? (
                  <Link
                    href={l.href}
                    className="transition-colors uppercase"
                    style={baseStyle}
                    onMouseEnter={e => { e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                  >
                    {label}
                  </Link>
                ) : (
                  <button
                    onClick={() => goto(l.page!)}
                    className="transition-colors uppercase"
                    style={baseStyle}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                  >
                    {label}
                  </button>
                )}
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
          className="md:hidden relative z-[2] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "關閉作品分類" : "開啟作品分類"}
          aria-expanded={menuOpen}
          style={{ background: "rgba(12,12,12,0.72)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}
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
        <div className="md:hidden fixed inset-0 overflow-y-auto px-5 pb-8 pt-24"
          style={{ background: "rgba(5,5,5,0.98)", backdropFilter: "blur(24px)" }}>
          <div className="mx-auto flex min-h-full w-full max-w-md flex-col items-center justify-center text-center">
            <p className="font-mono-label mb-3 text-[9px] tracking-[0.36em]" style={{ color: "var(--white-soft)" }}>
              {lang === "zh" ? "直接選你想看的" : "CHOOSE WHAT TO VIEW"}
            </p>
            <h2 className="font-display mb-8 text-[2.1rem] leading-none" style={{ color: "var(--text)" }}>
              {lang === "zh" ? "作品分類" : "WORK INDEX"}
            </h2>

            <ul className="grid w-full grid-cols-1 gap-2">
            {mobileLinks.map((l, i) => {
              const active = typeof l.page === "number" && activePage === l.page;
              const label = lang === "zh" ? l.labelZh : l.label;
              const itemStyle: React.CSSProperties = {
                minHeight: 56,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 18px",
                borderRadius: 14,
                border: `1px solid ${active ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.09)"}`,
                background: active ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.035)",
                color: active ? "#fff" : "rgba(255,255,255,0.78)",
                textDecoration: "none",
              };
              const innerRow = <>
                <span className="font-mono-label text-[11px] tracking-[0.16em]">{label}</span>
                <span aria-hidden style={{ color: "var(--white-soft)" }}>↗</span>
              </>;
              return (
                <li key={`${l.label}-${i}`}>
                  {l.href ? (
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      style={itemStyle}>
                      {innerRow}
                    </Link>
                  ) : (
                    <button
                      onClick={() => { goto(l.page!); setMenuOpen(false); }}
                      style={{ ...itemStyle, cursor: "pointer" }}>
                      {innerRow}
                    </button>
                  )}
                </li>
              );
            })}
            </ul>

            <ul className="mt-7 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-4">
              {mobileSecondaryLinks.map((l, i) => {
                const label = lang === "zh" ? l.labelZh : l.label;
                const className = "font-mono-label inline-flex min-h-11 items-center justify-center text-[10px] tracking-[0.18em]";
                const style = { color: "var(--white-soft)", textDecoration: "none" };
                return <li key={`${l.label}-${i}`}>
                  {l.href ? (
                    <Link href={l.href} onClick={() => setMenuOpen(false)} className={className} style={style}>{label}</Link>
                  ) : (
                    <button onClick={() => { goto(l.page!); setMenuOpen(false); }} className={className}
                      style={{ ...style, background: "none", border: "none", cursor: "pointer" }}>{label}</button>
                  )}
                </li>;
              })}
            </ul>

            <div className="mt-5 border-t pt-5" style={{ borderColor: "var(--white-ghost)" }}>
              <button onClick={toggle}
                className="font-mono-label min-h-11 text-[10px] tracking-[0.2em]"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--white-soft)" }}>
                {lang === "zh" ? "SWITCH TO EN" : "切換中文"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
