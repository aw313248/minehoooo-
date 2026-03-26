"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "WORK",    href: "#work" },
  { label: "ABOUT",  href: "#about" },
  { label: "CONTACT",href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(0,0,0,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 py-4">
        <a href="/" className="font-display text-lg text-[#f5f5f7] tracking-widest">
          MINEH4O
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-mono-label text-[10px] tracking-[0.28em] text-[#6e6e73] hover:text-[#f5f5f7] transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
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
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="font-mono-label text-xs tracking-[0.3em] text-[#f5f5f7]"
                  onClick={() => setMenuOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
