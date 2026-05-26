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
  taglineZh:    string;
  taglineEn:    string;
  descEn:       string;
  descZh:       string;
  features:     { iconChar: string; titleZh: string; titleEn: string; descZh: string; descEn: string }[];
  url:          string;
  domain:       string;
  ogImage:      string;
  tags:         string[];
  status?:      string;
  accentColor?: string;
}

const projects: Project[] = [
  {
    id:        "carecub",
    title:     "CareCub · 小析守護",
    subEn:     "AI Content Guardian for Kids' YouTube",
    subZh:     "不監控，幫媽媽查證",
    taglineZh: "YouTube 給孩子？先讓 CareCub 看一遍",
    taglineEn: "YouTube for your kid? Let CareCub check first.",
    descEn:
      "Built for parents who want a sanity check before handing their kid a phone. Paste any YouTube channel and CareCub's AI returns a 20-second safety report. Free, no signup, " +
      "with an optional Bear Mode for hand-curated channels.",
    descZh:
      "偽裝成兒童卡通的「艾莎門」影片越來越多 — CareCub 用 AI 20 秒掃描 YouTube 頻道，看穿是否藏有暴力、恐怖、成人梗等危險內容。給家有「皮」小孩的爸媽用，免費、不用註冊。",
    features: [
      { iconChar: "⚡", titleZh: "20 秒分析",        titleEn: "20-sec scan",     descZh: "AI 拆解頻道內容，快速生成安全報告", descEn: "AI breaks down channel content, fast safety report" },
      { iconChar: "🆓", titleZh: "免費 · 不用註冊",  titleEn: "Free · no signup", descZh: "每月免費 2 次，不蒐集資料",         descEn: "2 free scans per month, no data collection" },
      { iconChar: "🐻", titleZh: "熊熊模式",         titleEn: "Bear Mode",        descZh: "人工精選頻道清單 + 黑名單管理",     descEn: "Hand-curated whitelist + blacklist manager" },
      { iconChar: "🛡", titleZh: "不監控",           titleEn: "No tracking",      descZh: "查證導向，不是監視小孩的工具",       descEn: "Verification-first, not a surveillance app" },
    ],
    url:     "https://child-safety-radar.vercel.app",
    domain:  "child-safety-radar.vercel.app",
    ogImage: "https://child-safety-radar.vercel.app/opengraph-image",
    tags:    ["AI", "Next.js", "YouTube API", "親子科技"],
    status:  "LIVE · 2026",
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

/* ─── Feature card ─── */
function FeatureCard({ icon, title, desc, accent, inView, delay }: {
  icon: string; title: string; desc: string; accent: string; inView: boolean; delay: number;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid var(--white-ghost)",
      borderRadius: 20,
      padding: "16px 18px",
      backdropFilter: "blur(8px)",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(16px)",
      transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s, background .25s ease, border-color .25s ease`,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
      e.currentTarget.style.borderColor = `${accent}66`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      e.currentTarget.style.borderColor = "var(--white-ghost)";
    }}>
      <div className="flex items-start gap-3 text-left">
        <span style={{ fontSize: 22, lineHeight: 1, marginTop: 2 }}>{icon}</span>
        <div>
          <p className="font-mono-label" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--white-primary)", marginBottom: 4, fontWeight: 500 }}>
            {title}
          </p>
          <p style={{ fontSize: 11, lineHeight: 1.6, color: "var(--white-soft)" }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WorkProjects() {
  const [activeIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView(0.04);
  const { lang } = useLang();
  const active = projects[activeIdx];

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} style={{ background: "#000", minHeight: "100vh", position: "relative", overflow: "hidden" }}
      className="flex flex-col">

      {/* Ambient gradient bg */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${active.accentColor}0F 0%, transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(80,30,160,0.06) 0%, transparent 70%)`,
      }} />

      {/* Top: centered section label */}
      <div style={{
        padding: "2rem 3rem 1rem",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
        opacity: loaded ? 1 : 0, transition: "opacity .6s ease",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
      }}>
        <span className="font-mono-label" style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--white-soft)" }}>
          05 — 專案
        </span>
        <span style={{ width: 28, height: 1, background: "var(--white-dim)" }} />
        <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.32em", color: "var(--white-dim)" }}>
          {lang === "zh" ? "工作室作品集" : "STUDIO BUILDS"}
        </span>
      </div>

      {/* ── Main grid: left text + right preview ── */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-6 md:px-12 py-8 z-10 max-w-7xl mx-auto w-full">

        {/* LEFT — text column */}
        <div className="flex-1 flex flex-col items-start text-left max-w-xl">

          {/* Status badge */}
          {active.status && (
            <span className="font-mono-label mb-5" style={{
              fontSize: 10, letterSpacing: "0.28em",
              color: "rgba(74,222,128,0.95)",
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.3)",
              borderRadius: 999,
              padding: "5px 14px",
              opacity: inView ? 1 : 0, transition: "opacity .8s ease .1s",
            }}>
              ● {lang === "zh" ? "已上線 · 2026" : "LIVE · 2026"}
            </span>
          )}

          {/* Title */}
          <h2 className="font-display leading-tight mb-3"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
              color: "var(--text)", letterSpacing: "0em",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity .9s cubic-bezier(.16,1,.3,1) .12s, transform .9s cubic-bezier(.16,1,.3,1) .12s",
            }}>
            {active.title}
          </h2>

          {/* Subtitle */}
          <p className="font-mono-label mb-4"
            style={{
              fontSize: 10, letterSpacing: "0.28em",
              color: "var(--white-soft)",
              opacity: inView ? 1 : 0, transition: "opacity .8s ease .22s",
            }}>
            {(lang === "zh" ? active.subZh : active.subEn).toUpperCase()}
          </p>

          {/* Tagline (quote-like) */}
          <p className="mb-5"
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              lineHeight: 1.4,
              color: "var(--white-primary)",
              fontWeight: 500,
              fontStyle: "italic",
              borderLeft: `3px solid ${active.accentColor}`,
              paddingLeft: 14,
              opacity: inView ? 1 : 0, transition: "opacity .8s ease .3s",
            }}>
            {lang === "zh" ? `「${active.taglineZh}」` : `"${active.taglineEn}"`}
          </p>

          {/* Description */}
          <p className="leading-relaxed mb-6"
            style={{
              fontSize: 13.5, lineHeight: 1.75,
              color: "var(--white-secondary)",
              opacity: inView ? 1 : 0, transition: "opacity .8s ease .38s",
            }}>
            {lang === "zh" ? active.descZh : active.descEn}
          </p>

          {/* Feature grid 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mb-6">
            {active.features.map((f, i) => (
              <FeatureCard key={f.titleEn}
                icon={f.iconChar}
                title={lang === "zh" ? f.titleZh : f.titleEn}
                desc={lang === "zh" ? f.descZh : f.descEn}
                accent={active.accentColor || "#fff"}
                inView={inView}
                delay={0.45 + i * 0.08}
              />
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6"
            style={{ opacity: inView ? 1 : 0, transition: "opacity .8s ease .8s" }}>
            {active.tags.map(t => <TagPill key={t} text={t} />)}
          </div>

          {/* CTA — primary Chinese action */}
          <div className="flex flex-col items-start gap-2"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(14px)",
              transition: "opacity .8s ease .88s, transform .8s cubic-bezier(.16,1,.3,1) .88s",
            }}>
            <a href={active.url} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3"
              style={{
                background: `linear-gradient(135deg, ${active.accentColor}28, ${active.accentColor}11)`,
                backdropFilter: "blur(20px)",
                border: `1px solid ${active.accentColor}aa`,
                borderRadius: 20,
                padding: "16px 32px",
                transition: "all .35s ease",
                boxShadow: `0 4px 30px ${active.accentColor}33`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = `linear-gradient(135deg, ${active.accentColor}44, ${active.accentColor}22)`;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = `0 8px 40px ${active.accentColor}66`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = `linear-gradient(135deg, ${active.accentColor}28, ${active.accentColor}11)`;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = `0 4px 30px ${active.accentColor}33`;
              }}>
              <span style={{ fontSize: 18 }}>🐻</span>
              <span style={{
                fontSize: 15, letterSpacing: "0.04em",
                color: "var(--white-primary)", fontWeight: 500,
              }}>
                {lang === "zh" ? "開始守護小朋友" : "Start Protecting Kids"}
              </span>
              <span style={{ color: active.accentColor, fontSize: 20, marginLeft: 4 }}>→</span>
            </a>
            <p className="font-mono-label" style={{ fontSize: 9, letterSpacing: "0.28em", color: "var(--white-dim)", marginTop: 4 }}>
              {lang === "zh" ? "免費使用 · 不用註冊" : "FREE · NO SIGNUP"}
            </p>
          </div>
        </div>

        {/* RIGHT — preview card (OG image, NOT iframe — site blocks iframe) */}
        <div className="flex-shrink-0 w-full md:w-[44%] max-w-lg"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
            transition: "opacity 1s ease .4s, transform 1s cubic-bezier(.16,1,.3,1) .4s",
          }}>
          <a href={active.url} target="_blank" rel="noopener noreferrer"
            className="block relative overflow-hidden group"
            style={{
              borderRadius: 18,
              border: "1px solid var(--white-dim)",
              boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${active.accentColor}22`,
              aspectRatio: "1200/630",
              background: "#0a0a0a",
            }}>
            {/* OG image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.ogImage}
              alt={`${active.title} 預覽`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
              <div className="flex items-center gap-2 px-5 py-3"
                style={{
                  background: "rgba(0,0,0,0.78)", border: `1px solid ${active.accentColor}aa`,
                  borderRadius: 999, color: "var(--white-primary)",
                }}>
                <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.04em" }}>
                  {lang === "zh" ? "按此進入網站" : "OPEN SITE"}
                </span>
                <span style={{ fontSize: 16, color: active.accentColor }}>→</span>
              </div>
            </div>
            {/* Top-right "LIVE" badge (always visible) */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5"
              style={{
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(10px)",
                border: "1px solid var(--white-dim)",
                borderRadius: 999,
                color: "var(--white-primary)",
              }}>
              <span className="font-mono-label" style={{ fontSize: 9, letterSpacing: "0.3em" }}>
                {lang === "zh" ? "上線中" : "LIVE"}
              </span>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.7)" }} />
            </div>
          </a>
          {/* Caption below preview */}
          <p className="font-mono-label mt-3 text-center" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--white-dim)" }}>
            ↑ {lang === "zh" ? "按此進入網站" : "CLICK TO OPEN SITE"}
          </p>
        </div>
      </div>

      {/* Footer note — placeholder for future projects */}
      <div className="pb-8 flex items-center justify-center gap-3"
        style={{ opacity: inView ? 0.45 : 0, transition: "opacity 1s ease .9s" }}>
        <span style={{ width: 24, height: 1, background: "var(--white-muted)" }} />
        <span className="font-mono-label" style={{ fontSize: 9, letterSpacing: "0.28em", color: "var(--white-muted)" }}>
          {lang === "zh" ? "更多作品準備中" : "MORE BUILDS IN PROGRESS"}
        </span>
        <span style={{ width: 24, height: 1, background: "var(--white-muted)" }} />
      </div>
    </section>
  );
}
