"use client";

import Link from "next/link";

/**
 * Field Notes top navigation — two stacked frosted-glass layers.
 *   Layer 1: Mini portfolio navbar (首頁 / 攝影 / 影像 / AIGC / 專案 / 關於 / 聯絡)
 *   Layer 2: Breadcrumb (AIGC / FIELD NOTES / AI WORKFLOW)
 *
 * The article is tagged under AIGC (highlighted in the mini-navbar)
 * because Field Notes lives inside the AIGC track on the portfolio site.
 */
type Section = "home" | "photo" | "video" | "aigc" | "projects" | "about" | "contact";

const GLASS_BG = "rgba(255,255,255,0.055)";
const GLASS_BORDER = "1px solid rgba(255,255,255,0.14)";
const GLASS_SHADOW =
  "inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.24)";
const GLASS_BLUR = "blur(20px) saturate(125%)";

const NAV_ITEMS: { section: Section; en: string; zh: string; href: string }[] = [
  { section: "home",     en: "Home",     zh: "首頁", href: "/" },
  { section: "photo",    en: "Photo",    zh: "攝影", href: "/?section=photo" },
  { section: "video",    en: "Video",    zh: "影像", href: "/?section=video" },
  { section: "aigc",     en: "AIGC",     zh: "AIGC", href: "/?section=aigc" },
  { section: "projects", en: "Projects", zh: "專案", href: "/?section=projects" },
  { section: "about",    en: "About",    zh: "關於", href: "/?section=about" },
  { section: "contact",  en: "Contact",  zh: "聯絡", href: "/?section=contact" },
];

export default function FieldNoteNav({
  active = "aigc",
  crumbEn = ["MINEH4O", "AIGC", "FIELD NOTES"],
  crumbZh = ["作品集", "AI 影像", "現場筆記"],
  category = "HIGGSFIELD × SEEDANCE",
}: {
  active?: Section;
  crumbEn?: [string, string, string];
  crumbZh?: [string, string, string];
  category?: string;
}) {
  return (
    <div className="sticky top-0 z-40">
      {/* ── Layer 1 — mini portfolio navbar ── */}
      <header
        className="relative"
        style={{
          background: GLASS_BG,
          backdropFilter: GLASS_BLUR,
          WebkitBackdropFilter: GLASS_BLUR,
          borderBottom: GLASS_BORDER,
          boxShadow: GLASS_SHADOW,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono-label uppercase shrink-0"
            style={{
              fontSize: 11,
              letterSpacing: "0.34em",
              color: "rgba(255,255,255,0.95)",
              textDecoration: "none",
            }}
          >
            MINEH4O
          </Link>

          {/* Center desktop nav — Chinese labels with EN tag underneath */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {NAV_ITEMS.map(item => {
              const isActive = item.section === active;
              return (
                <Link
                  key={item.section}
                  href={item.href}
                  className="group relative inline-flex flex-col items-center leading-none"
                  style={{ textDecoration: "none" }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    style={{
                      fontSize: 13,
                      letterSpacing: "0.18em",
                      color: isActive
                        ? "rgba(255,225,140,0.96)"
                        : "rgba(255,255,255,0.78)",
                      transition: "color .22s ease",
                    }}
                  >
                    {item.zh}
                  </span>
                  <span
                    className="font-mono-label uppercase"
                    style={{
                      marginTop: 4,
                      fontSize: 7.5,
                      letterSpacing: "0.32em",
                      color: isActive
                        ? "rgba(255,225,140,0.62)"
                        : "rgba(255,255,255,0.35)",
                      transition: "color .22s ease",
                    }}
                  >
                    {item.en}
                  </span>
                  {/* active underline */}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: -10,
                      transform: "translateX(-50%)",
                      width: isActive ? 22 : 0,
                      height: 1,
                      background: "rgba(255,225,140,0.85)",
                      transition: "width .3s cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile right-side label */}
          <div className="md:hidden flex items-center gap-2 min-w-0">
            <Link
              href="/?section=aigc"
              className="font-mono-label uppercase shrink-0"
              style={{
                fontSize: 9.5,
                letterSpacing: "0.32em",
                color: "rgba(255,225,140,0.92)",
                textDecoration: "none",
              }}
            >
              AIGC
            </Link>
          </div>

          {/* Right side: language toggle + LET'S WORK CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <span
              className="font-mono-label uppercase"
              style={{
                fontSize: 9.5,
                letterSpacing: "0.32em",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              ZH · EN
            </span>
            <a
              href="https://instagram.com/minehoooo.arw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 group"
              style={{
                padding: "7px 13px",
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(255,225,140,0.95)",
                border: "1px solid rgba(255,225,140,0.45)",
                borderRadius: 4,
                textDecoration: "none",
                background: "rgba(255,225,140,0.05)",
                whiteSpace: "nowrap",
                transition: "color .2s, border-color .2s, background .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,225,140,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,225,140,0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,225,140,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,225,140,0.45)";
              }}
            >
              <span>Let&apos;s Work</span>
              <span aria-hidden style={{ fontSize: 11 }}>→</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Layer 2 — breadcrumb ── */}
      <div
        style={{
          background: "rgba(8,8,10,0.55)",
          backdropFilter: GLASS_BLUR,
          WebkitBackdropFilter: GLASS_BLUR,
          borderBottom: GLASS_BORDER,
          boxShadow: GLASS_SHADOW,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-3 flex items-center justify-between gap-4">

          {/* Desktop / tablet: full breadcrumb + sub-category badge */}
          <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-4 min-w-0 flex-1">
            <CrumbItem en={crumbEn[0]} zh={crumbZh[0]} href="/" tone="muted" />
            <Sep />
            <CrumbItem en={crumbEn[1]} zh={crumbZh[1]} href="/?section=aigc" tone="muted" />
            <Sep />
            <CrumbItem en={crumbEn[2]} zh={crumbZh[2]} href="/field-notes" tone="muted" />
            <span aria-hidden style={{ width: 1, height: 24, background: "rgba(255,255,255,0.10)", margin: "0 4px" }} />
            <span
              className="font-mono-label uppercase shrink-0"
              style={{
                fontSize: 10, letterSpacing: "0.32em",
                color: "rgba(255,225,140,0.92)",
                padding: "4px 10px",
                background: "rgba(255,225,140,0.06)",
                border: "1px solid rgba(255,225,140,0.28)",
                borderRadius: 4,
              }}
            >
              {category}
            </span>
          </nav>

          {/* Mobile compact */}
          <nav aria-label="Breadcrumb" className="flex md:hidden items-center gap-2 flex-1 min-w-0">
            <Link
              href="/?section=aigc"
              className="font-mono-label uppercase shrink-0 inline-flex items-center gap-1.5"
              style={{
                fontSize: 9.5,
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.78)",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: 11, lineHeight: 1 }}>←</span>
              AIGC
            </Link>
            <span aria-hidden style={{ color: "rgba(255,255,255,0.22)", fontSize: 11 }}>/</span>
            <Link
              href="/field-notes"
              className="font-mono-label uppercase shrink-0"
              style={{
                fontSize: 9.5,
                letterSpacing: "0.28em",
                color: "rgba(255,225,140,0.92)",
                textDecoration: "none",
              }}
            >
              NOTES
            </Link>
          </nav>

          {/* Right: ALL NOTES → */}
          <Link
            href="/field-notes"
            className="shrink-0 inline-flex items-center gap-2 group"
            style={{
              color: "rgba(255,255,255,0.78)",
              textDecoration: "none",
              padding: "5px 2px",
              borderBottom: "1px solid rgba(255,255,255,0.18)",
              transition: "color .22s ease, border-color .22s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "rgba(255,225,140,0.95)";
              e.currentTarget.style.borderBottomColor = "rgba(255,225,140,0.6)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "rgba(255,255,255,0.78)";
              e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.18)";
            }}
          >
            <span
              className="font-mono-label uppercase"
              style={{ fontSize: 9.5, letterSpacing: "0.32em" }}
            >
              <span className="hidden sm:inline">All Notes</span>
              <span className="sm:hidden">All</span>
            </span>
            <span style={{ fontSize: 11, lineHeight: 1 }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Sep() {
  return (
    <span aria-hidden style={{ color: "rgba(255,255,255,0.22)", fontSize: 11, fontWeight: 300 }}>
      /
    </span>
  );
}

function CrumbItem({
  en,
  zh,
  href,
  tone,
}: {
  en: string;
  zh: string;
  href?: string;
  tone: "muted" | "active";
}) {
  const color = tone === "active" ? "rgba(255,225,140,0.95)" : "rgba(255,255,255,0.86)";
  const zhColor = tone === "active" ? "rgba(255,225,140,0.55)" : "rgba(255,255,255,0.4)";
  const inner = (
    <span className="inline-flex flex-col leading-tight">
      <span
        className="font-mono-label uppercase"
        style={{ fontSize: 10, letterSpacing: "0.3em", color }}
      >
        {en}
      </span>
      <span
        style={{
          marginTop: 2,
          fontSize: 9.5,
          letterSpacing: "0.16em",
          color: zhColor,
        }}
      >
        {zh}
      </span>
    </span>
  );
  return href ? (
    <Link href={href} style={{ textDecoration: "none" }}>
      {inner}
    </Link>
  ) : (
    inner
  );
}
