"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { useLang } from "@/contexts/LangContext";

/* ─── Project data ─── */
interface Project {
  id:           string;
  title:        string;
  subEn:        string;
  subZh:        string;
  descEn:       string;
  descZh:       string;
  url:          string;
  domain:       string;
  tags:         string[];
  status?:      string;
  accentColor?: string;
}

const projects: Project[] = [
  {
    id:    "carecub",
    title: "CareCub · 小析守護",
    subEn: "AI Content Guardian for Kids' YouTube",
    subZh: "AI 為家長把關 YouTube 兒童內容",
    descEn:
      "Built for parents who want a sanity check before handing their kid a phone. " +
      "Paste any YouTube channel and CareCub's AI returns a 20-second safety report — " +
      "free, no signup, optional Bear Mode for hand-curated channels.",
    descZh:
      "為家長設計：把小孩想看的 YouTube 頻道丟進來，AI 在 20 秒內回傳安全分析報告。" +
      "免費、不用註冊，還有「熊熊模式」提供人工精選頻道清單。",
    url:    "https://child-safety-radar.vercel.app",
    domain: "child-safety-radar.vercel.app",
    tags:   ["AI", "Next.js", "YouTube API", "Parenting Tech"],
    status: "LIVE · 2026",
    accentColor: "#F2B84B",
  },
];

/* ─── Tag pill ─── */
function TagPill({ text }: { text: string }) {
  return (
    <span className="font-mono-label" style={{
      fontSize: 9, letterSpacing: "0.22em",
      color: "var(--white-secondary)",
      background: "var(--white-ghost)",
      border: "1px solid var(--white-dim)",
      borderRadius: 999,
      padding: "5px 12px",
      backdropFilter: "blur(8px)",
    }}>{text}</span>
  );
}

export default function WorkProjects() {
  const [activeIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView(0.05);
  const { lang } = useLang();
  const active = projects[activeIdx];

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} style={{ background: "#000", minHeight: "100vh", position: "relative", overflow: "hidden" }}
      className="flex flex-col">

      {/* Ambient gradient bg */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 35%, ${active.accentColor}11 0%, transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(80,30,160,0.08) 0%, transparent 70%)`,
      }} />

      {/* Top: centered section label */}
      <div style={{
        padding: "2rem 3rem 1.4rem",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
        opacity: loaded ? 1 : 0, transition: "opacity .6s ease",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
      }}>
        <span className="font-mono-label" style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--white-soft)" }}>
          05 — PROJECTS
        </span>
        <span style={{ width: 28, height: 1, background: "var(--white-dim)" }} />
        <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.32em", color: "var(--white-dim)" }}>
          {lang === "zh" ? "工作室專案 · WEB BUILDS" : "STUDIO BUILDS · WEB"}
        </span>
      </div>

      {/* Main centered content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 py-8 z-10">

        {/* Status badge */}
        {active.status && (
          <span className="font-mono-label mb-6" style={{
            fontSize: 9, letterSpacing: "0.32em",
            color: "rgba(74,222,128,0.95)",
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.3)",
            borderRadius: 999,
            padding: "5px 14px",
            opacity: inView ? 1 : 0, transition: "opacity .8s ease .1s",
          }}>
            ● {active.status}
          </span>
        )}

        {/* Title */}
        <h2 className="font-display leading-none mb-4"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 5.2rem)",
            color: "var(--text)", letterSpacing: "0.01em",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity .9s cubic-bezier(.16,1,.3,1) .12s, transform .9s cubic-bezier(.16,1,.3,1) .12s",
          }}>
          {active.title}
        </h2>

        {/* Subtitle */}
        <p className="font-mono-label mb-3"
          style={{
            fontSize: 12, letterSpacing: "0.22em",
            color: "var(--white-soft)",
            opacity: inView ? 1 : 0, transition: "opacity .8s ease .26s",
          }}>
          {(lang === "zh" ? active.subZh : active.subEn).toUpperCase()}
        </p>

        {/* Description */}
        <p className="leading-relaxed mb-8"
          style={{
            fontSize: "13px", lineHeight: 1.7, maxWidth: 560,
            color: "var(--white-secondary)",
            opacity: inView ? 1 : 0, transition: "opacity .8s ease .35s",
          }}>
          {lang === "zh" ? active.descZh : active.descEn}
        </p>

        {/* Preview frame — embedded site (lazy load via iframe) */}
        <div className="w-full max-w-3xl mb-8 relative overflow-hidden"
          style={{
            borderRadius: 18,
            border: "1px solid var(--white-dim)",
            background: "#0a0a0a",
            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${active.accentColor}22`,
            aspectRatio: "16/10",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
            transition: "opacity 1s ease .4s, transform 1s cubic-bezier(.16,1,.3,1) .4s",
          }}>
          <iframe
            src={active.url}
            title={active.title}
            loading="lazy"
            style={{
              width: "100%", height: "100%", border: "none",
              background: "#fff",
            }}
            sandbox="allow-scripts allow-same-origin"
          />
          {/* Click-through overlay (iframe absorbs scroll, this lets users click site) */}
          <a href={active.url} target="_blank" rel="noopener noreferrer"
            aria-label={`Open ${active.title} in new tab`}
            className="absolute top-3 right-3 flex items-center gap-2"
            style={{
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--white-dim)",
              borderRadius: 999,
              padding: "6px 14px",
              color: "var(--white-primary)",
              transition: "all .25s ease",
              zIndex: 5,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0.85)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0.65)"; }}>
            <span className="font-mono-label" style={{ fontSize: 9, letterSpacing: "0.28em" }}>OPEN</span>
            <span style={{ fontSize: 13 }}>↗</span>
          </a>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8"
          style={{ opacity: inView ? 1 : 0, transition: "opacity .8s ease .5s" }}>
          {active.tags.map(t => <TagPill key={t} text={t} />)}
        </div>

        {/* CTA — primary VISIT SITE */}
        <div className="flex flex-col items-center gap-3"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(14px)",
            transition: "opacity .8s ease .58s, transform .8s cubic-bezier(.16,1,.3,1) .58s",
          }}>
          <a href={active.url} target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-4"
            style={{
              background: `linear-gradient(135deg, ${active.accentColor}22, ${active.accentColor}11)`,
              backdropFilter: "blur(20px)",
              border: `1px solid ${active.accentColor}88`,
              borderRadius: 14,
              padding: "16px 32px",
              transition: "all .35s ease",
              boxShadow: `0 4px 30px ${active.accentColor}33`,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = `linear-gradient(135deg, ${active.accentColor}44, ${active.accentColor}22)`;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = `0 8px 40px ${active.accentColor}55`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = `linear-gradient(135deg, ${active.accentColor}22, ${active.accentColor}11)`;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = `0 4px 30px ${active.accentColor}33`;
            }}>
            <div className="flex flex-col items-start">
              <span className="font-mono-label" style={{ fontSize: 10, letterSpacing: "0.32em", color: "var(--white-soft)" }}>
                {lang === "zh" ? "前往網站" : "VISIT SITE"}
              </span>
              <span className="font-mono-label" style={{ fontSize: 13, letterSpacing: "0.08em", color: "var(--white-primary)", fontWeight: 500 }}>
                {active.domain}
              </span>
            </div>
            <span style={{ color: active.accentColor, fontSize: 22 }}>↗</span>
          </a>

          {/* Sub note */}
          <p className="font-mono-label" style={{
            fontSize: 8, letterSpacing: "0.32em",
            color: "var(--white-dim)",
            marginTop: 4,
          }}>
            {lang === "zh" ? "免費使用 · 不用註冊" : "FREE · NO SIGNUP"}
          </p>
        </div>

        {/* Footer note — placeholder for future projects */}
        <div className="mt-12 flex items-center gap-3 opacity-50"
          style={{ opacity: inView ? 0.45 : 0, transition: "opacity 1s ease .8s" }}>
          <span style={{ width: 24, height: 1, background: "var(--white-muted)" }} />
          <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.32em", color: "var(--white-muted)" }}>
            {lang === "zh" ? "更多專案準備中" : "MORE BUILDS IN PROGRESS"}
          </span>
          <span style={{ width: 24, height: 1, background: "var(--white-muted)" }} />
        </div>
      </div>
    </section>
  );
}
