"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FieldNote } from "@/data/fieldNotes";
import { getRelatedNotes } from "@/data/fieldNotes";
import type { Block, NextStopCity } from "./types";
import NoteViews from "@/components/field-notes/NoteViews";
import BubbleComments from "@/components/field-notes/BubbleComments";
import HiggsfieldRef from "@/components/HiggsfieldRef";

/* ─────────────────────────────────────────────────────────────────
   TOC
   ───────────────────────────────────────────────────────────────── */
function EditorialTOC({ blocks }: { blocks: Block[] }) {
  const headlines = blocks.filter((b): b is Extract<Block, { type: "headline" }> => b.type === "headline");
  const [active, setActive] = useState(headlines[0]?.id ?? "");

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    headlines.forEach((h) => {
      const el = document.getElementById(h.id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(h.id); },
        { rootMargin: "-25% 0px -60% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (headlines.length === 0) return null;
  return (
    <aside className="et-toc">
      <p className="et-toc-title">目錄</p>
      {headlines.map((h) => (
        <button
          key={h.id}
          className="et-toc-item"
          data-active={active === h.id}
          onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          {h.text}
        </button>
      ))}
      <style>{`
        .et-toc { position: sticky; top: 120px; padding-right: 24px; border-right: 1px solid rgba(255,255,255,0.07); }
        .et-toc-title { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.42em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin: 0 0 14px; text-align: right; }
        .et-toc-item { display: block; width: 100%; background: none; border: none; cursor: pointer; text-align: right; padding: 6px 0; font-family: var(--font-readex),sans-serif; font-size: 11.5px; color: rgba(255,255,255,0.38); line-height: 1.35; transition: color 0.15s; }
        .et-toc-item[data-active="true"] { color: rgba(255,255,255,0.92); }
        .et-toc-item:hover { color: rgba(255,255,255,0.78); }
      `}</style>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Lazy video — IntersectionObserver, click-to-play
   ───────────────────────────────────────────────────────────────── */
function LazyVideo({ src, autoPlay = false, loop = true, muted = true, soundToggle = false, className = "", style = {} }: {
  src: string; autoPlay?: boolean; loop?: boolean; muted?: boolean; soundToggle?: boolean; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video || !autoPlay) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!video.src) { video.src = src; video.load(); }
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { rootMargin: "100px" });
    obs.observe(video);
    return () => obs.disconnect();
  }, [src, autoPlay]);

  if (autoPlay) {
    return (
      <>
        <video ref={ref} muted loop playsInline className={className} style={style} />
        {soundToggle && (
          <div style={{
            position: "absolute", right: 10, bottom: 10, zIndex: 3,
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(0,0,0,0.62)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.22)", borderRadius: 999,
            padding: "6px 8px 6px 13px",
          }}>
            <button
              type="button"
              aria-label={soundOn ? "關閉聲音" : "開啟聲音"}
              onClick={() => {
                const v = ref.current;
                if (!v) return;
                v.muted = soundOn;   // toggling: if currently on, mute back
                if (!soundOn) { if (v.volume === 1) v.volume = 0.8; v.play().catch(() => {}); }
                setSoundOn(s => !s);
              }}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "none", border: "none", cursor: "pointer", padding: 0,
                fontFamily: "var(--font-space-mono),monospace", fontSize: 9,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: soundOn ? "rgba(255,225,140,0.95)" : "rgba(255,255,255,0.85)",
                transition: "color .2s",
              }}>
              <span aria-hidden style={{ fontSize: 12, lineHeight: 1 }}>{soundOn ? "🔊" : "🔇"}</span>
              {soundOn ? "" : "SOUND"}
            </button>
            {soundOn && (
              <input
                type="range" min={0} max={100} defaultValue={80}
                aria-label="音量"
                onChange={e => {
                  const v = ref.current;
                  if (v) v.volume = Number(e.target.value) / 100;
                }}
                onInput={e => {
                  const v = ref.current;
                  if (v) v.volume = Number((e.target as HTMLInputElement).value) / 100;
                }}
                style={{ width: 76, accentColor: "rgba(255,225,140,0.95)", cursor: "pointer" }}
              />
            )}
          </div>
        )}
      </>
    );
  }
  return <video src={src} muted={muted} loop={loop} playsInline controls preload="metadata" className={className} style={style} />;
}

/* ─────────────────────────────────────────────────────────────────
   Ambience — graded base + breathing glow + film grain.
   Gives the pure-black page a "floor" without competing with content
   ───────────────────────────────────────────────────────────────── */
const GRAIN_URI = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

function EditorialAmbience() {
  return (
    <>
      {/* Graded base — warm corner + cool corner over near-black */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none",
        background: "radial-gradient(ellipse 90% 60% at 80% -12%, rgba(255,205,110,0.05), transparent 60%), radial-gradient(ellipse 85% 55% at 10% 110%, rgba(90,120,190,0.045), transparent 62%), #050506",
      }} />
      {/* Breathing glow — slow drift, barely there */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: "-20%", zIndex: -1, pointerEvents: "none",
        background: "radial-gradient(circle at 32% 38%, rgba(255,220,140,0.04), transparent 46%)",
        animation: "etGlowDrift 26s ease-in-out infinite alternate",
        willChange: "transform",
      }} />
      {/* Film grain — transform 版動畫，只動合成層不重繪 */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: "-30%",
          backgroundImage: GRAIN_URI, backgroundSize: "140px 140px",
          opacity: 0.045, mixBlendMode: "overlay",
          animation: "grainShiftT 1.2s steps(10) infinite",
          willChange: "transform",
        }} />
      </div>
      <style>{`
        @keyframes etGlowDrift {
          0%   { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(6%, 4%) scale(1.12); }
        }
      `}</style>
    </>
  );
}

/* Hero video wall — three vertical loops behind the title, with scroll parallax.
   Vertical clips side-by-side read as phone frames — fitting for an iPhone guide */
function HeroVideoWall({ videos }: { videos: { src: string; label?: string }[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  // 捲出畫面就暫停三支影片 — 不讓它們在整頁生命週期持續解碼
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const vids = () => Array.from(el.querySelectorAll("video"));
    const io = new IntersectionObserver(([e]) => {
      vids().forEach(v => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); });
    }, { rootMargin: "60px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = document.documentElement.scrollTop;
        // parallax: backdrop drifts slower + scales, content above scrolls normally
        el.style.transform = `translateY(${y * 0.35}px) scale(${1 + Math.min(y / 2400, 0.12)})`;
        el.style.opacity = String(Math.max(0.15, 1 - y / 700));
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div ref={wrapRef} style={{
        position: "absolute", inset: 0, display: "flex", gap: 2,
        willChange: "transform, opacity",
      }}>
        {videos.map((v, i) => (
          <div key={v.src} style={{ flex: 1, minWidth: 0, position: "relative", overflow: "hidden" }}>
            <video
              src={v.src}
              autoPlay muted loop playsInline preload="metadata"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                // 暗度改由下方遮罩處理 — 播放中影片套 CSS filter 是持續的 GPU 成本
                transform: i === 1 ? "scale(1.06)" : "none",
              }}
            />
            {v.label && (
              <span style={{
                position: "absolute", left: 14, top: 74, zIndex: 2,
                fontFamily: "var(--font-space-mono),monospace", fontSize: 9.5,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
                padding: "5px 10px", borderRadius: 3,
                borderLeft: "2px solid rgba(255,225,140,0.7)",
              }}>{v.label}</span>
            )}
          </div>
        ))}
      </div>
      {/* readability wash — 同時補回原本 filter 的暗度 */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(5,5,6,0.30)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(5,5,6,0.55) 0%, rgba(5,5,6,0.25) 45%, rgba(5,5,6,0.97) 100%)",
      }} />
    </div>
  );
}

/* Reading progress — thin gold line across the very top */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 50, pointerEvents: "none" }}>
      <div style={{
        width: "100%", height: "100%",
        transform: `scaleX(${p})`, transformOrigin: "left",
        background: "linear-gradient(to right, rgba(255,225,140,0.9), rgba(255,225,140,0.35))",
      }} />
    </div>
  );
}

/* Scroll reveal — blocks surface as the reader scrolls */
function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); o.disconnect(); }
    }, { threshold: 0.06, rootMargin: "0px 0px -8% 0px" });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className="et-reveal" data-in={inView}>
      {children}
      <style>{`
        .et-reveal { opacity: 0; transform: perspective(1100px) translateY(26px) rotateX(7deg) scale(0.985); transform-origin: 50% 100%; transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .et-reveal[data-in="true"] { opacity: 1; transform: perspective(1100px) translateY(0) rotateX(0deg) scale(1); }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Block renderers
   ───────────────────────────────────────────────────────────────── */

function HeadlineBlock({ id, text, sub, num }: Extract<Block, { type: "headline" }>) {
  return (
    <div id={id} className="eb-headline">
      {num && <span className="eb-headline-ghost" aria-hidden>{num}</span>}
      <div className="eb-headline-rule" aria-hidden />
      <h2 className="eb-headline-text">{text}</h2>
      {sub && <p className="eb-headline-sub">{sub}</p>}
      <style>{`
        .eb-headline { position: relative; padding-top: 64px; margin-bottom: 22px; }
        .eb-headline-ghost { position: absolute; right: 0; top: 18px; font-family: var(--font-space-mono),monospace; font-size: clamp(56px,9vw,92px); font-weight: 700; line-height: 1; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.09); pointer-events: none; user-select: none; }
        .eb-headline-rule { width: 32px; height: 1px; background: rgba(255,225,140,0.4); margin-bottom: 14px; }
        .et-reveal .eb-headline-rule { transform: scaleX(0); transform-origin: left; transition: transform 1s cubic-bezier(.16,1,.3,1) .3s; }
        .et-reveal[data-in="true"] .eb-headline-rule { transform: scaleX(1); }
        .eb-headline-text { font-family: var(--font-readex),sans-serif; font-size: clamp(21px,3.2vw,30px); font-weight: 600; letter-spacing: -0.015em; color: rgba(255,255,255,0.97); margin: 0; line-height: 1.2; }
        .eb-headline-sub { font-family: var(--font-readex),sans-serif; font-size: 13.5px; font-weight: 300; color: rgba(255,255,255,0.45); margin: 7px 0 0; }
      `}</style>
    </div>
  );
}

function TextBlock({ content }: Extract<Block, { type: "text" }>) {
  return (
    <div className="eb-text">
      {content}
      <style>{`
        .eb-text { font-family: var(--font-readex),sans-serif; font-size: 16px; line-height: 1.85; color: rgba(255,255,255,0.72); font-weight: 300; margin-bottom: 4px; }
        .eb-text p { margin: 0 0 1em; }
        .eb-text p:last-child { margin-bottom: 0; }
        .eb-text strong { color: rgba(255,255,255,0.96); font-weight: 500; }
        .eb-text em { color: rgba(255,225,140,0.88); font-style: normal; }
      `}</style>
    </div>
  );
}

function CalloutBlock({ content }: Extract<Block, { type: "callout" }>) {
  return (
    <div className="eb-callout">
      <div key="callout-content">{content}</div>
      <style key="callout-style">{`
        .eb-callout { background: rgba(255,225,140,0.06); border: 1px solid rgba(255,225,140,0.18); border-radius: 8px; padding: 16px 20px; margin: 20px 0; font-family: var(--font-readex),sans-serif; font-size: 14.5px; line-height: 1.7; color: rgba(255,255,255,0.82); font-weight: 300; }
        .eb-callout strong { color: rgba(255,225,140,0.95); font-weight: 500; }
      `}</style>
    </div>
  );
}

/* Setup cards — 4 horizontal items in a dark card */
function SetupCardsBlock({ items, footer }: Extract<Block, { type: "setup-cards" }>) {
  return (
    <div className="eb-sc">
      <div className="eb-sc-card">
        <p className="eb-sc-badge">OSCAR&apos;S TRAVEL SETUP</p>
        <div className="eb-sc-rule" aria-hidden />
        <div className="eb-sc-row">
          {items.map((item) => (
            <div key={item.label} className="eb-sc-item">
              <span className="eb-sc-val">{item.value}</span>
              <span className="eb-sc-lbl">{item.label}</span>
            </div>
          ))}
        </div>
        {footer && (
          <>
            <div className="eb-sc-rule" aria-hidden />
            <p className="eb-sc-foot">{footer}</p>
          </>
        )}
      </div>
      <style>{`
        .eb-sc { margin: 24px 0; }
        .eb-sc-card { background: #0d0d10; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px 28px; }
        .eb-sc-badge { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.44em; text-transform: uppercase; color: rgba(255,255,255,0.32); margin: 0 0 16px; }
        .eb-sc-rule { height: 1px; background: rgba(255,255,255,0.06); margin: 16px 0; }
        .eb-sc-row { display: flex; gap: 28px; flex-wrap: wrap; }
        .eb-sc-item { display: flex; flex-direction: column; gap: 5px; }
        .eb-sc-val { font-family: var(--font-readex),sans-serif; font-size: clamp(22px,4vw,32px); font-weight: 600; letter-spacing: -0.02em; color: rgba(255,255,255,0.97); line-height: 1; }
        .eb-sc-lbl { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase; color: rgba(255,255,255,0.32); }
        .eb-sc-foot { font-family: var(--font-readex),sans-serif; font-size: 13px; color: rgba(255,255,255,0.45); font-weight: 300; margin: 0; }
      `}</style>
    </div>
  );
}

/* CTA banner */
function CTABlock({ message, cta, href, sub }: Extract<Block, { type: "cta" }>) {
  return (
    <div className="eb-cta">
      <div className="eb-cta-inner">
        <p className="eb-cta-msg">{message}</p>
        {sub && <p className="eb-cta-sub">{sub}</p>}
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="eb-cta-btn">
          {cta} →
        </a>
      </div>
      <style>{`
        .eb-cta { margin: 32px 0; }
        .eb-cta-inner { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 10px; padding: 24px 24px 20px; display: flex; flex-direction: column; gap: 12px; }
        .eb-cta-msg { font-family: var(--font-readex),sans-serif; font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.82); margin: 0; line-height: 1.4; }
        .eb-cta-sub { font-family: var(--font-readex),sans-serif; font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.42); margin: 0; }
        .eb-cta-btn { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,225,140,0.9); text-decoration: none; border: 1px solid rgba(255,225,140,0.25); border-radius: 3px; padding: 8px 14px; display: inline-block; transition: color .15s, border-color .15s; }
        .eb-cta-btn:hover { color: rgba(255,225,140,1); border-color: rgba(255,225,140,0.55); }
      `}</style>
    </div>
  );
}

/* UI Crop — portrait phone screenshot zoomed into relevant area */
function UICropBlock({ src, alt, objectPos = "50% 40%", label, caption }: Extract<Block, { type: "ui-crop" }>) {
  return (
    <div className="eb-uicrop">
      <div className="eb-uicrop-frame">
        <Image
          src={src} alt={alt ?? label ?? ""}
          fill className="eb-uicrop-img"
          sizes="(max-width: 720px) 100vw, 680px"
          style={{ objectFit: "cover", objectPosition: objectPos }}
        />
        {label && <span className="eb-uicrop-label">{label}</span>}
      </div>
      {caption && <p className="eb-uicrop-cap">{caption}</p>}
      <style>{`
        .eb-uicrop { margin: 24px 0; }
        .eb-uicrop-frame { position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 10px; overflow: hidden; background: #080808; border: 1px solid rgba(255,255,255,0.08); }
        .eb-uicrop-img { }
        .eb-uicrop-label { position: absolute; bottom: 12px; left: 14px; font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(255,255,255,0.65); background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.12); border-radius: 3px; padding: 4px 8px; }
        .eb-uicrop-cap { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.22em; color: rgba(255,255,255,0.32); margin: 8px 0 0; }
      `}</style>
    </div>
  );
}

/* UI Crop Pair — two cropped screenshots side by side */
function UICropPairBlock({ left, right, caption }: Extract<Block, { type: "ui-crop-pair" }>) {
  return (
    <div className="eb-uicp">
      {[left, right].map((item, i) => (
        <div key={i} className="eb-uicp-col">
          <div className="eb-uicp-frame">
            <Image
              src={item.src} alt={item.alt ?? item.label ?? ""}
              fill
              sizes="(max-width: 720px) 50vw, 340px"
              style={{ objectFit: "cover", objectPosition: item.objectPos ?? "50% 40%" }}
            />
            {item.label && <span className="eb-uicp-label">{item.label}</span>}
          </div>
        </div>
      ))}
      {caption && <p className="eb-uicp-cap">{caption}</p>}
      <style>{`
        .eb-uicp { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 24px 0; }
        .eb-uicp-col { }
        .eb-uicp-frame { position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 8px; overflow: hidden; background: #080808; border: 1px solid rgba(255,255,255,0.07); }
        .eb-uicp-label { position: absolute; bottom: 10px; left: 10px; font-family: var(--font-space-mono),monospace; font-size: 8.5px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.62); background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; padding: 3px 7px; }
        .eb-uicp-cap { grid-column: 1/-1; font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.22em; color: rgba(255,255,255,0.32); margin: 4px 0 0; }
        @media (max-width: 480px) { .eb-uicp { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

/* Image block */
function ImageBlock({ item, frame }: Extract<Block, { type: "image" }>) {
  const isWide = frame === "wide" || frame === "full";
  const isPhone = frame === "phone";

  /* banner — natural ratio, no cropping, full bleed */
  if (frame === "banner") {
    return (
      <div className="eb-banner">
        {item.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.alt ?? ""} className="eb-banner-img" />
        ) : (
          <div className="eb-vid-ph" style={{ minHeight: 180 }}>
            <span className="eb-vid-icon" aria-hidden>□</span>
            {item.caption && <p className="eb-vid-lbl">{item.caption}</p>}
          </div>
        )}
        {item.src && item.caption && <p className="eb-img-cap">{item.caption}</p>}
        <style>{`
          .eb-banner { margin: 24px -24px; line-height: 0; font-size: 0; }
          .eb-banner-img { display: block; width: 100%; height: auto; vertical-align: bottom; clip-path: inset(5px 0 0 0); margin-top: -5px; }
          @media (max-width: 680px) { .eb-banner { margin: 24px -16px; } }
        `}</style>
      </div>
    );
  }
  if (isPhone) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-start", margin: "24px 0" }}>
        <div className="eb-phone">
          <div className="eb-phone-img">
            <Image src={item.src} alt={item.alt ?? ""} fill className="object-cover" sizes="200px" />
          </div>
          {item.caption && <p className="eb-phone-cap">{item.caption}</p>}
        </div>
        <style>{`
          .eb-phone { display: flex; flex-direction: column; align-items: center; gap: 10px; }
          .eb-phone-img { position: relative; width: 180px; aspect-ratio: 9/19.5; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); background: #111; }
          .eb-phone-cap { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.22em; text-align: center; color: rgba(255,255,255,0.35); }
        `}</style>
      </div>
    );
  }
  return (
    <div className={isWide ? "eb-img-wide" : "eb-img-normal"}>
      <div className="eb-img-wrap">
        {item.src ? (
          <Image src={item.src} alt={item.alt ?? ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 700px" />
        ) : (
          <div className="eb-vid-ph">
            <span className="eb-vid-icon" aria-hidden>□</span>
            {item.caption && <p className="eb-vid-lbl">{item.caption}</p>}
          </div>
        )}
      </div>
      {item.src && item.caption && <p className="eb-img-cap">{item.caption}</p>}
      <style>{`
        .eb-img-normal { margin: 24px 0; }
        .eb-img-wide   { margin: 24px -24px; }
        .eb-img-wrap   { position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 10px; overflow: hidden; background: #0f0f11; border: 1px solid rgba(255,255,255,0.07); }
        .eb-img-wide .eb-img-wrap { border-radius: 0; border-left: none; border-right: none; }
        .eb-img-cap { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.22em; color: rgba(255,255,255,0.32); margin: 10px 0 0; }
        @media (max-width: 680px) { .eb-img-wide { margin: 24px -16px; } }
      `}</style>
    </div>
  );
}

/* Image pair (legacy phone frames) */
function ImagePairBlock({ left, right, leftLabel, rightLabel }: Extract<Block, { type: "image-pair" }>) {
  return (
    <div className="eb-pair">
      {[{ item: left, label: leftLabel }, { item: right, label: rightLabel }].map(({ item, label }, i) => (
        <figure key={i} className="eb-pair-fig">
          <div className="eb-pair-img">
            <Image src={item.src} alt={item.alt ?? label ?? ""} fill className="object-cover" sizes="50vw" />
          </div>
          {(label ?? item.caption) && (
            <figcaption className={`eb-pair-cap${i === 1 ? " eb-pair-cap-r" : ""}`}>{label ?? item.caption}</figcaption>
          )}
        </figure>
      ))}
      <style>{`
        .eb-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 24px 0; }
        .eb-pair-fig { margin: 0; }
        .eb-pair-img { position: relative; width: 100%; aspect-ratio: 3/2; border-radius: 8px; overflow: hidden; background: #111; border: 1px solid rgba(255,255,255,0.07); }
        .eb-pair-cap { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.22em; color: rgba(255,255,255,0.35); margin: 8px 0 0; }
        .eb-pair-cap-r { text-align: right; }
        @media (max-width: 480px) { .eb-pair { grid-template-columns: 1fr; } .eb-pair-cap-r { text-align: left; } }
      `}</style>
    </div>
  );
}

/* Compare — side-by-side with BEFORE/AFTER label */
function CompareBlock({ before, after, title }: Extract<Block, { type: "compare" }>) {
  const isVideo = (src: string) => /\.(mp4|mov|webm)$/i.test(src);
  const renderMedia = (item: { src: string; alt?: string }, pill: string) => (
    <div className="eb-cmp-card">
      <div className="eb-cmp-media">
        {!item.src ? (
          <div className="eb-cmp-ph"><span className="eb-cmp-ph-txt">需要 Oscar 補素材</span></div>
        ) : isVideo(item.src) ? (
          <LazyVideo src={item.src} autoPlay loop muted className="object-cover" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        ) : (
          <Image src={item.src} alt={item.alt ?? pill} fill className="object-cover" sizes="50vw" />
        )}
      </div>
      <div className="eb-cmp-footer">
        <span className="eb-cmp-pill" data-p={pill}>{pill}</span>
        {item.alt && <span className="eb-cmp-alt">{item.alt}</span>}
      </div>
    </div>
  );
  return (
    <div className="eb-cmp">
      {title && <p className="eb-cmp-title">{title}</p>}
      <div className="eb-cmp-grid">
        {renderMedia(before, "BEFORE")}
        {renderMedia(after, "AFTER")}
      </div>
      <style>{`
        .eb-cmp { margin: 24px 0; }
        .eb-cmp-title { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin: 0 0 12px; }
        .eb-cmp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .eb-cmp-card { background: #0a0a0c; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; overflow: hidden; }
        .eb-cmp-media { position: relative; width: 100%; aspect-ratio: 16/10; background: #0f0f12; }
        .eb-cmp-ph { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        .eb-cmp-ph-txt { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,225,140,0.5); }
        .eb-cmp-footer { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; }
        .eb-cmp-pill { font-family: var(--font-space-mono),monospace; font-size: 8.5px; letter-spacing: 0.32em; text-transform: uppercase; }
        .eb-cmp-pill[data-p="BEFORE"] { color: rgba(255,255,255,0.5); }
        .eb-cmp-pill[data-p="AFTER"]  { color: rgba(255,225,140,0.9); }
        .eb-cmp-alt { font-family: var(--font-readex),sans-serif; font-size: 11px; color: rgba(255,255,255,0.35); }
        @media (max-width: 480px) { .eb-cmp-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

/* Autoplay video block (hero / background / placeholder) */
function VideoBlock({ src, placeholder, frame, caption }: Extract<Block, { type: "video" }>) {
  const isWide = frame === "wide" || frame === "full";
  const inner = src ? (
    <LazyVideo src={src} autoPlay loop muted className="object-cover" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
  ) : (
    <div className="eb-vid-ph">
      <span className="eb-vid-icon" aria-hidden>▶</span>
      {placeholder && <p className="eb-vid-lbl">{placeholder}</p>}
      <span className="eb-vid-notice">需要 Oscar 補素材</span>
    </div>
  );
  return (
    <div className={isWide ? "eb-img-wide" : "eb-img-normal"} style={{ margin: "24px 0" }}>
      <div className="eb-img-wrap eb-vid-bg">{inner}</div>
      {caption && <p className="eb-img-cap">{caption}</p>}
      <style>{`
        .eb-vid-bg { background: #080809; }
        .eb-vid-ph { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; }
        .eb-vid-icon { font-size: 28px; color: rgba(255,255,255,0.16); }
        .eb-vid-lbl { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.36em; text-transform: uppercase; color: rgba(255,255,255,0.28); text-align: center; margin: 0; }
        .eb-vid-notice { font-family: var(--font-space-mono),monospace; font-size: 8.5px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,225,140,0.48); }
      `}</style>
    </div>
  );
}

/* Lazy click-to-play video */
function VideoLazyBlock({ src, caption, aspectRatio = "16/9", maxWidth, autoPlay = false, sound = false }: Extract<Block, { type: "video-lazy" }>) {
  const isVertical = maxWidth != null;
  return (
    <div className="eb-vlazy" style={{ margin: "24px 0" }}>
      <div style={{ display: isVertical ? "flex" : undefined, justifyContent: isVertical ? "center" : undefined }}>
        <div style={{ width: "100%", maxWidth: maxWidth ?? "100%" }}>
          <div className="eb-vlazy-wrap" style={{ aspectRatio }}>
            <LazyVideo src={src} autoPlay={autoPlay} muted={autoPlay} loop soundToggle={autoPlay && sound} className="eb-vlazy-vid" />
          </div>
          {caption && !isVertical && <p className="eb-img-cap">{caption}</p>}
        </div>
      </div>
      {caption && isVertical && <p className="eb-vlazy-title">{caption}</p>}
      <style>{`
        .eb-vlazy-wrap { position: relative; width: 100%; border-radius: 10px; overflow: hidden; background: #0a0a0c; border: 1px solid rgba(255,255,255,0.08); }
        .eb-vlazy-vid { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .eb-vlazy-title { font-family: var(--font-space-mono),monospace; font-size: 10.5px; letter-spacing: 0.14em; color: rgba(255,255,255,0.55); margin: 12px 0 0; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      `}</style>
    </div>
  );
}

/* Travel gallery — lazy autoplay grid */
function TravelGalleryBlock({ items }: Extract<Block, { type: "travel-gallery" }>) {
  return (
    <div className="eb-tg">
      <div className="eb-tg-grid">
        {items.map((item, i) => (
          <div key={i} className="eb-tg-cell">
            <LazyVideo
              src={item.src}
              autoPlay
              loop
              muted
              className="eb-tg-vid"
            />
            {item.caption && <span className="eb-tg-cap">{item.caption}</span>}
          </div>
        ))}
      </div>
      <style>{`
        .eb-tg { margin: 24px 0; }
        .eb-tg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
        .eb-tg-cell { position: relative; aspect-ratio: 9/16; background: #0a0a0c; border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
        .eb-tg-vid { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .eb-tg-cap { position: absolute; left: 8px; bottom: 8px; font-family: var(--font-space-mono),monospace; font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.85); background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); padding: 3px 7px; border-radius: 3px; pointer-events: none; }
        @media (max-width: 600px) { .eb-tg-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}

/* App recommendation */
function AppRecBlock({ name, tagline, appStoreUrl, reason, icon, website }: Extract<Block, { type: "app-rec" }>) {
  return (
    <div className="eb-app">
      <div className="eb-app-card">
        <div className="eb-app-head">
          {icon ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={icon} alt={`${name} app icon`} className="eb-app-icon" style={{ objectFit: "cover" }} />
          ) : (
            <div className="eb-app-icon" aria-hidden>⬛</div>
          )}
          <div>
            <p className="eb-app-name">{name}</p>
            {tagline && <p className="eb-app-tag">{tagline}</p>}
          </div>
        </div>
        <p className="eb-app-reason">{reason}</p>
        <div className="eb-app-rule" aria-hidden />
        <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="eb-app-badge" aria-label="在 App Store 下載">
          <svg width="135" height="40" viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <rect width="135" height="40" rx="8" fill="#000"/>
            <path fill="#fff" d="M27.5 20.1c-.03-3.4 2.78-5.05 2.91-5.13-1.59-2.32-4.05-2.63-4.93-2.66-2.08-.21-4.08 1.24-5.14 1.24-1.08 0-2.7-1.22-4.45-1.18-2.26.03-4.38 1.34-5.54 3.38-2.4 4.15-.61 10.25 1.69 13.6 1.14 1.65 2.49 3.48 4.24 3.41 1.72-.07 2.36-1.1 4.43-1.1 2.05 0 2.66 1.1 4.45 1.06 1.84-.03 2.99-1.65 4.1-3.31 1.3-1.9 1.84-3.75 1.86-3.84-.04-.02-3.57-1.37-3.62-5.47zM24.1 10.5c.92-1.14 1.55-2.7 1.38-4.27-1.33.06-3 .9-3.97 2.02-.85.98-1.61 2.6-1.41 4.12 1.49.11 3.03-.75 4-1.87z"/>
            <text fill="#fff" x="39" y="16.5" style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif", fontSize: "7.5px", letterSpacing: "0.1px" }}>Download on the</text>
            <text fill="#fff" x="38" y="31" style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif", fontSize: "15px", fontWeight: 600 }}>App Store</text>
          </svg>
        </a>
        {website && <a href={website} target="_blank" rel="noopener noreferrer" className="eb-app-web">官網（有中文）↗</a>}
      </div>
      <style>{`
        .eb-app { margin: 24px 0; }
        .eb-app-web { display: inline-block; margin-left: 14px; font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(255,225,140,0.85); text-decoration: none; border: 1px solid rgba(255,225,140,0.28); border-radius: 3px; padding: 8px 14px; vertical-align: 14px; transition: color .15s, border-color .15s; }
        .eb-app-web:hover { color: rgba(255,225,140,1); border-color: rgba(255,225,140,0.6); }
        .eb-app-card { background: #0d0d10; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 22px 24px; }
        .eb-app-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .eb-app-icon { width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #111 0%, #222 100%); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; color: transparent; text-shadow: 0 0 0 rgba(255,255,255,0.6); }
        .eb-app-name { font-family: var(--font-readex),sans-serif; font-size: 18px; font-weight: 600; color: rgba(255,255,255,0.97); margin: 0; letter-spacing: -0.01em; }
        .eb-app-tag { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin: 4px 0 0; }
        .eb-app-reason { font-family: var(--font-readex),sans-serif; font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.62); font-weight: 300; margin: 0 0 16px; }
        .eb-app-rule { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 16px; }
        .eb-app-badge { display: inline-block; transition: opacity .15s; }
        .eb-app-badge:hover { opacity: 0.82; }
      `}</style>
    </div>
  );
}

/* Production flow strip — numbered steps with media thumbs, 3D tilt on hover */
function FlowStepsBlock({ steps }: Extract<Block, { type: "flow-steps" }>) {
  return (
    <div className="eb-flow">
      <div className="eb-flow-grid">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className="eb-flow-card"
            style={{ transitionDelay: `${i * 0.08}s`, cursor: s.anchor ? "pointer" : "default" }}
            role={s.anchor ? "link" : undefined}
            tabIndex={s.anchor ? 0 : undefined}
            aria-label={s.anchor ? `跳到章節：${s.zh}` : undefined}
            onClick={() => { if (s.anchor) document.getElementById(s.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
            onKeyDown={e => { if (s.anchor && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); document.getElementById(s.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" }); } }}
          >
            <div className="eb-flow-thumb">
              {s.thumbType === "video" ? (
                <LazyVideo src={s.thumb} autoPlay loop muted className="eb-flow-media" />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={s.thumb} alt={`${s.zh} — 步驟 ${s.num}`} className="eb-flow-media" loading="lazy" />
              )}
              <span className="eb-flow-num">{s.num}</span>
              {s.anchor && <span className="eb-flow-jump" aria-hidden>↓</span>}
            </div>
            <p className="eb-flow-en">{s.en}</p>
            <p className="eb-flow-zh">{s.zh}</p>
          </div>
        ))}
      </div>
      <p className="eb-flow-hint">↑ 這就是整篇的流程 — 點卡片直接跳到那一章</p>
      <style>{`
        .eb-flow { margin: 28px 0; perspective: 1200px; }
        .eb-flow-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .eb-flow-card { transform-style: preserve-3d; transition: transform .5s cubic-bezier(.16,1,.3,1); }
        .eb-flow-card:hover { transform: translateY(-6px) rotateX(4deg); }
        .eb-flow-thumb { position: relative; aspect-ratio: 4/5; border-radius: 10px; overflow: hidden; background: #0a0a0c; border: 1px solid rgba(255,255,255,0.09); transition: border-color .3s, box-shadow .3s; }
        .eb-flow-card:hover .eb-flow-thumb { border-color: rgba(255,225,140,0.4); box-shadow: 0 18px 40px rgba(0,0,0,0.5); }
        .eb-flow-media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .eb-flow-num { position: absolute; top: 8px; left: 8px; font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.2em; color: rgba(255,225,140,0.95); background: rgba(0,0,0,0.6); backdrop-filter: blur(6px); padding: 3px 8px; border-radius: 3px; }
        .eb-flow-en { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(255,255,255,0.85); margin: 10px 0 0; }
        .eb-flow-zh { font-family: var(--font-readex),sans-serif; font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.42); margin: 2px 0 0; }
        .eb-flow-jump { position: absolute; right: 8px; bottom: 8px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: rgba(255,225,140,0.9); background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); border: 1px solid rgba(255,225,140,0.3); border-radius: 50%; opacity: 0; transition: opacity .25s; }
        .eb-flow-card:hover .eb-flow-jump { opacity: 1; }
        .eb-flow-hint { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.22em; color: rgba(255,255,255,0.3); text-align: center; margin: 14px 0 0; }
        @media (max-width: 600px) { .eb-flow-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}

/* City portrait — 霍格華茲畫像牆：城市片段隨機輪播背景 */
function CityPortrait({ videos, seed }: { videos: string[]; seed: number }) {
  const [i, setI] = useState(seed % videos.length);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (videos.length < 2) return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setI(v => (v + 1 + Math.floor(seed) % (videos.length - 1)) % videos.length); setVisible(true); }, 450);
    }, 5200 + seed * 900);
    return () => clearInterval(t);
  }, [videos.length, seed]);
  return (
    /* eslint-disable-next-line jsx-a11y/media-has-caption */
    <video key={videos[i]} src={videos[i]} autoPlay muted loop playsInline preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
      /* 城市卡是「這趟去了哪」的主秀 — 影片要看得見。夜景片本身已暗，不再壓亮度，
         文字對比交給 eb-ns-overlay 底部漸層 */
      style={{ filter: "brightness(0.95) saturate(0.98)", opacity: visible ? 1 : 0, transition: "opacity .45s ease" }} />
  );
}

/* Next Stop city cards */
function NextStopBlock({ cities }: Extract<Block, { type: "next-stop" }>) {
  return (
    <div className="eb-ns">
      <div className="eb-ns-grid">
        {cities.map((city: NextStopCity) => {
          const inner = (
            <div className="eb-ns-card">
              <div className="eb-ns-img">
                <div className="eb-ns-img-ph" />
                {city.videos && city.videos.length > 0 && <CityPortrait videos={city.videos} seed={city.name.length} />}
                <div className="eb-ns-overlay" />
                <div className="eb-ns-content">
                  {city.nameZh && <span className="eb-ns-zh">{city.nameZh}</span>}
                  <p className="eb-ns-name">{city.name}</p>
                  {city.year && <span className="eb-ns-year">{city.year}</span>}
                </div>
                <span className="eb-ns-badge">{city.slug ? "Field Notes →" : "即將推出"}</span>
              </div>
            </div>
          );
          return city.slug
            ? <Link key={city.name} href={`/field-notes/${city.slug}`} className="eb-ns-link">{inner}</Link>
            : <div key={city.name} className="eb-ns-link eb-ns-coming">{inner}</div>;
        })}
      </div>
      <style>{`
        .eb-ns { margin: 8px 0; }
        .eb-ns-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; }
        .eb-ns-link { display: block; text-decoration: none; }
        .eb-ns-coming { cursor: default; }
        .eb-ns-card { border-radius: 10px; overflow: hidden; }
        .eb-ns-img { position: relative; width: 100%; aspect-ratio: 3/4; background: #0a0a0c; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; overflow: hidden; }
        .eb-ns-img-ph { position: absolute; inset: 0; background: linear-gradient(160deg, #0f0f13 0%, #16161c 60%, #0a0a0d 100%); }
        .eb-ns-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%); }
        .eb-ns-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 14px 12px; }
        .eb-ns-zh { display: block; font-family: var(--font-readex),sans-serif; font-size: 11px; color: rgba(255,255,255,0.42); margin-bottom: 4px; }
        .eb-ns-name { font-family: var(--font-readex),sans-serif; font-size: 22px; font-weight: 600; letter-spacing: -0.01em; color: rgba(255,255,255,0.95); margin: 0; line-height: 1; }
        .eb-ns-year { display: block; font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.28em; color: rgba(255,255,255,0.32); margin-top: 6px; }
        .eb-ns-badge { position: absolute; top: 10px; right: 10px; font-family: var(--font-space-mono),monospace; font-size: 8px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,225,140,0.6); background: rgba(0,0,0,0.55); border: 1px solid rgba(255,225,140,0.2); border-radius: 3px; padding: 4px 7px; }
        .eb-ns-link:hover .eb-ns-img { border-color: rgba(255,255,255,0.15); }
        @media (max-width: 600px) { .eb-ns-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}

/* Oscar's Notes */
function OscarNotesBlock({ content }: Extract<Block, { type: "oscar-notes" }>) {
  return (
    <div className="eb-oscar">
      <div className="eb-oscar-head">
        <span className="eb-oscar-sig" style={{ fontFamily: "Snell Roundhand, Brush Script MT, cursive", fontStyle: "italic" }}>
          Oscar&apos;s Notes
        </span>
        <span className="eb-oscar-rule" aria-hidden />
      </div>
      <div className="eb-oscar-body">{content}</div>
      <style>{`
        .eb-oscar { margin-top: 52px; padding: 24px 24px 28px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; }
        .eb-oscar-head { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
        .eb-oscar-sig { font-size: 22px; color: rgba(255,225,140,0.85); line-height: 1; flex-shrink: 0; }
        .eb-oscar-rule { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .eb-oscar-body { font-family: var(--font-readex),sans-serif; font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.65); font-weight: 300; }
        .eb-oscar-body p { margin: 0 0 0.9em; }
        .eb-oscar-body p:last-child { margin: 0; }
      `}</style>
    </div>
  );
}

/* Closing */
function ClosingBlock({ content }: Extract<Block, { type: "closing" }>) {
  return (
    <div className="eb-closing">
      {content}
      <style>{`
        .eb-closing { margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); font-family: var(--font-readex),sans-serif; font-size: 15px; line-height: 1.85; color: rgba(255,255,255,0.62); font-weight: 300; }
        .eb-closing p { margin: 0 0 1em; }
        .eb-closing p:last-child { margin: 0; }
      `}</style>
    </div>
  );
}

/* Prompt Copy — monospace block with one-click copy button */
function PromptCopyBlock({ text, label }: Extract<Block, { type: "prompt-copy" }>) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };
  return (
    <div className="eb-pc">
      <div className="eb-pc-header">
        {label && <span className="eb-pc-label">{label}</span>}
        <button className="eb-pc-btn" onClick={handleCopy} aria-label="複製 Prompt">
          {copied ? "已複製 ✓" : "複製 Prompt"}
        </button>
      </div>
      <pre className="eb-pc-text">{text}</pre>
      <style>{`
        .eb-pc { margin: 20px 0; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
        .eb-pc-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.03); }
        .eb-pc-label { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.36em; text-transform: uppercase; color: rgba(255,255,255,0.32); }
        .eb-pc-btn { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.24em; text-transform: uppercase; background: none; border: 1px solid rgba(255,225,140,0.28); border-radius: 3px; color: rgba(255,225,140,0.85); padding: 5px 12px; cursor: pointer; transition: color .15s, border-color .15s, background .15s; }
        .eb-pc-btn:hover { color: rgba(255,225,140,1); border-color: rgba(255,225,140,0.6); background: rgba(255,225,140,0.06); }
        .eb-pc-text { margin: 0; padding: 18px 16px; font-family: var(--font-space-mono),monospace; font-size: 12px; line-height: 1.85; color: rgba(255,255,255,0.72); white-space: pre-wrap; word-break: break-word; overflow-x: auto; max-height: 520px; overflow-y: auto; }
      `}</style>
    </div>
  );
}

/* FAQ */
function FAQBlock({ items }: Extract<Block, { type: "faq" }>) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="eb-faq">
      {items.map((item, i) => (
        <div key={i} className="eb-faq-row">
          <button className="eb-faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{item.q}</span>
            <span className="eb-faq-icon" aria-hidden>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <div className="eb-faq-a"><p>{item.a}</p></div>}
        </div>
      ))}
      <style>{`
        .eb-faq-row { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .eb-faq-row:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
        .eb-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; padding: 16px 0; font-family: var(--font-readex),sans-serif; font-size: 14.5px; color: rgba(255,255,255,0.85); text-align: left; }
        .eb-faq-icon { color: rgba(255,255,255,0.32); font-size: 18px; flex-shrink: 0; }
        .eb-faq-a { padding: 0 0 18px; }
        .eb-faq-a p { font-family: var(--font-readex),sans-serif; font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.55); font-weight: 300; margin: 0; }
      `}</style>
    </div>
  );
}

/* Related */
function RelatedBlock({ slugs }: Extract<Block, { type: "related" }>) {
  const notes = getRelatedNotes(slugs);
  if (!notes.length) return null;
  return (
    <div className="eb-related">
      <div className="eb-related-grid">
        {notes.map((note) => (
          <Link key={note.slug} href={`/field-notes/${note.slug}`} className="eb-related-card">
            <div className="eb-related-img">
              {note.heroImage && <Image src={note.heroImage} alt={note.title} fill className="object-cover" sizes="320px" />}
            </div>
            <div className="eb-related-body">
              <span className="eb-related-cat">{note.categoryLabel}</span>
              <p className="eb-related-title">{note.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        .eb-related { margin: 8px 0; }
        .eb-related-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(240px,1fr)); gap: 12px; }
        .eb-related-card { display: flex; flex-direction: column; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; overflow: hidden; text-decoration: none; transition: border-color .18s; }
        .eb-related-card:hover { border-color: rgba(255,255,255,0.15); }
        .eb-related-img { position: relative; width: 100%; aspect-ratio: 16/9; background: #111; }
        .eb-related-body { padding: 12px 14px 14px; display: flex; flex-direction: column; gap: 5px; }
        .eb-related-cat { font-family: var(--font-space-mono),monospace; font-size: 8.5px; letter-spacing: 0.32em; text-transform: uppercase; color: rgba(255,225,140,0.75); }
        .eb-related-title { font-family: var(--font-readex),sans-serif; font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.88); line-height: 1.4; margin: 0; }
      `}</style>
    </div>
  );
}

/* Timeline — 垂直金線時間軸，標籤區分官方記載/資料補充/現場筆記 */
const TL_TAG: Record<string, { label: string; color: string }> = {
  official: { label: "官方記載", color: "rgba(255,225,140,0.85)" },
  extra:    { label: "資料補充", color: "rgba(140,190,255,0.8)" },
  oscar:    { label: "現場筆記", color: "rgba(140,220,160,0.85)" },
};
/* Epic Timeline — 全幅「500 年劇場」：滿版黑幕、巨型標題、橫向膠卷卡片
   滾輪在條帶上直接橫推，手機用滑的；金色進度線從 1447 走到 2026 */
function EpicTimelineBlock({ events }: Extract<Block, { type: "timeline" }>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProg(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    // 桌機滾輪 → 橫向推進（到頭放行，讓頁面繼續往下）
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 1 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= max - 1 && e.deltaY > 0;
      if (max <= 0 || atStart || atEnd) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => { el.removeEventListener("scroll", onScroll); el.removeEventListener("wheel", onWheel); };
  }, []);

  return (
    <section className="eb-tle" aria-label="五百年歷史時間軸">
      {/* 幕前標題 */}
      <div className="eb-tle-head">
        <p className="eb-tle-eyebrow">1447 → 2026 · FIVE CENTURIES · ONE INN</p>
        <p className="eb-tle-giant"><span className="eb-tle-500">500</span><span className="eb-tle-yr">年</span></p>
        <p className="eb-tle-sub">一間還在營業的時光機 — 往右滑，穿越它的五個世紀</p>
      </div>

      {/* 膠卷條帶 */}
      <div ref={trackRef} className="eb-tle-track">
        {events.map((e, i) => (
          <article key={i} className="eb-tle-card" data-hl={e.highlight ? "true" : undefined}>
            <div className="eb-tle-card-head">
              <span className="eb-tle-year">{e.year}</span>
              {e.tag && TL_TAG[e.tag] && (
                <span className="eb-tle-tag" style={{ color: TL_TAG[e.tag].color, borderColor: TL_TAG[e.tag].color.replace("0.8", "0.3") }}>
                  {TL_TAG[e.tag].label}
                </span>
              )}
            </div>
            {e.img && (
              <figure className="eb-tle-fig">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.img.src} alt={e.img.alt} loading="lazy" className="eb-tle-img" />
                {e.img.caption && <figcaption className="eb-tle-cap">{e.img.caption}</figcaption>}
              </figure>
            )}
            <p className="eb-tle-title">{e.title}</p>
            {e.desc && <p className="eb-tle-desc">{e.desc}</p>}
            <span className="eb-tle-idx" aria-hidden>{String(i + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}</span>
          </article>
        ))}
      </div>

      {/* 進度線 1447 → 2026 */}
      <div className="eb-tle-progress" aria-hidden>
        <span className="eb-tle-p-start">1447</span>
        <span className="eb-tle-p-rail"><span className="eb-tle-p-fill" style={{ transform: `scaleX(${Math.max(prog, 0.02)})` }} /></span>
        <span className="eb-tle-p-end">2026</span>
      </div>
      <p className="eb-tle-hint" aria-hidden>⇢ 直接滾動或滑動，穿越五百年</p>

      <style>{`
        .eb-tle { position: relative; z-index: 6; margin: 56px calc(50% - 50vw); padding: 62px 0 46px;
          background:
            radial-gradient(ellipse 70% 50% at 18% 0%, rgba(255,205,110,0.07), transparent 62%),
            radial-gradient(ellipse 60% 45% at 88% 100%, rgba(90,120,190,0.05), transparent 65%),
            #060607;
          border-top: 1px solid rgba(255,225,140,0.14); border-bottom: 1px solid rgba(255,255,255,0.06);
          overflow: hidden; }
        .eb-tle::before { content: "1447"; position: absolute; right: -1.5vw; top: -3vw; font-family: var(--font-space-mono),monospace; font-weight: 700; font-size: clamp(120px, 22vw, 340px); line-height: 1; color: transparent; -webkit-text-stroke: 1px rgba(255,225,140,0.07); pointer-events: none; user-select: none; }
        .eb-tle-head { padding: 0 max(24px, calc(50vw - 350px)); margin-bottom: 34px; position: relative; }
        .eb-tle-eyebrow { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase; color: rgba(255,225,140,0.75); margin: 0 0 14px; }
        .eb-tle-giant { margin: 0; line-height: 0.9; }
        .eb-tle-500 { font-family: var(--font-readex),sans-serif; font-weight: 700; font-size: clamp(88px, 16vw, 190px); letter-spacing: -0.04em; color: rgba(255,255,255,0.97); text-shadow: 0 0 80px rgba(255,225,140,0.18); }
        .eb-tle-yr { font-family: var(--font-readex),sans-serif; font-weight: 600; font-size: clamp(30px, 5vw, 60px); color: rgba(255,225,140,0.9); margin-left: 10px; }
        .eb-tle-sub { font-family: var(--font-readex),sans-serif; font-size: clamp(13.5px, 1.6vw, 16px); font-weight: 300; color: rgba(255,255,255,0.55); margin: 16px 0 0; }
        .eb-tle-track { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x proximity; padding: 4px max(24px, calc(50vw - 350px)) 22px; scrollbar-width: none; }
        .eb-tle-track::-webkit-scrollbar { display: none; }
        .eb-tle-card { position: relative; flex: 0 0 min(78vw, 390px); scroll-snap-align: start; background: rgba(255,255,255,0.028); border: 1px solid rgba(255,255,255,0.09); border-radius: 14px; padding: 22px 22px 44px; backdrop-filter: blur(6px); transition: border-color .25s, transform .25s; }
        .eb-tle-card:hover { border-color: rgba(255,225,140,0.35); transform: translateY(-4px); }
        .eb-tle-card[data-hl="true"] { flex-basis: min(84vw, 440px); background: rgba(255,225,140,0.055); border-color: rgba(255,225,140,0.4); box-shadow: 0 0 46px rgba(255,225,140,0.08) inset, 0 18px 50px rgba(0,0,0,0.4); }
        .eb-tle-card-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
        .eb-tle-year { font-family: var(--font-readex),sans-serif; font-weight: 700; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.02em; color: rgba(255,225,140,0.95); line-height: 1.05; }
        .eb-tle-card[data-hl="true"] .eb-tle-year { font-size: clamp(28px, 3.4vw, 40px); color: rgba(255,235,180,1); }
        .eb-tle-tag { font-family: var(--font-space-mono),monospace; font-size: 8px; letter-spacing: 0.26em; text-transform: uppercase; border: 1px solid; border-radius: 3px; padding: 2px 6px; }
        .eb-tle-fig { margin: 0 0 14px; }
        .eb-tle-img { display: block; width: 100%; aspect-ratio: 4/3; object-fit: cover; object-position: 50% 18%; border-radius: 9px; border: 1px solid rgba(255,255,255,0.1); background: #0a0a0c; }
        .eb-tle-cap { font-family: var(--font-space-mono),monospace; font-size: 8.5px; letter-spacing: 0.16em; color: rgba(255,255,255,0.34); margin-top: 7px; line-height: 1.6; }
        .eb-tle-title { font-family: var(--font-readex),sans-serif; font-size: 17px; font-weight: 600; color: rgba(255,255,255,0.95); margin: 0 0 8px; line-height: 1.4; }
        .eb-tle-card[data-hl="true"] .eb-tle-title { font-size: 19px; }
        .eb-tle-desc { font-family: var(--font-readex),sans-serif; font-size: 13.5px; font-weight: 300; color: rgba(255,255,255,0.58); margin: 0; line-height: 1.75; }
        .eb-tle-idx { position: absolute; right: 18px; bottom: 14px; font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.24em; color: rgba(255,255,255,0.26); }
        .eb-tle-progress { display: flex; align-items: center; gap: 14px; padding: 14px max(24px, calc(50vw - 350px)) 0; }
        .eb-tle-p-start, .eb-tle-p-end { font-family: var(--font-space-mono),monospace; font-size: 11px; letter-spacing: 0.2em; color: rgba(255,225,140,0.85); }
        .eb-tle-p-rail { flex: 1; height: 2px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
        .eb-tle-p-fill { display: block; height: 100%; background: linear-gradient(to right, rgba(255,225,140,0.9), rgba(255,225,140,0.4)); transform-origin: left; transition: transform .15s linear; }
        .eb-tle-hint { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.3em; color: rgba(255,255,255,0.3); text-align: center; margin: 12px 0 0; }
      `}</style>
    </section>
  );
}

function TimelineBlock({ events }: Extract<Block, { type: "timeline" }>) {
  return (
    <div className="eb-tl">
      <div className="eb-tl-track">
        {events.map((e, i) => (
          <div key={i} className="eb-tl-row" data-hl={e.highlight ? "true" : undefined}>
            <div className="eb-tl-rail" aria-hidden>
              <span className="eb-tl-dot" />
              {i < events.length - 1 && <span className="eb-tl-line" />}
            </div>
            <div className="eb-tl-body">
              <div className="eb-tl-head">
                <span className="eb-tl-year">{e.year}</span>
                {e.tag && TL_TAG[e.tag] && (
                  <span className="eb-tl-tag" style={{ color: TL_TAG[e.tag].color, borderColor: TL_TAG[e.tag].color.replace("0.8", "0.3") }}>
                    {TL_TAG[e.tag].label}
                  </span>
                )}
              </div>
              <p className="eb-tl-title">{e.title}</p>
              {e.desc && <p className="eb-tl-desc">{e.desc}</p>}
              {e.img && (
                <figure className="eb-tl-fig">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.img.src} alt={e.img.alt} loading="lazy" className="eb-tl-img" />
                  {e.img.caption && <figcaption className="eb-tl-cap">{e.img.caption}</figcaption>}
                </figure>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="eb-tl-hint" aria-hidden>→ 橫向滑動看完五百年</p>
      <style>{`
        .eb-tl { margin: 28px 0; }
        /* ── 手機：直向（預設）── */
        .eb-tl-track { display: flex; flex-direction: column; }
        .eb-tl-row { display: flex; gap: 18px; }
        .eb-tl-rail { display: flex; flex-direction: column; align-items: center; width: 12px; flex-shrink: 0; padding-top: 7px; }
        .eb-tl-dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(255,225,140,0.9); box-shadow: 0 0 10px rgba(255,225,140,0.35); flex-shrink: 0; }
        .eb-tl-line { width: 1px; flex: 1; background: linear-gradient(to bottom, rgba(255,225,140,0.35), rgba(255,255,255,0.08)); margin-top: 4px; }
        .eb-tl-body { padding-bottom: 26px; min-width: 0; }
        .eb-tl-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .eb-tl-year { font-family: var(--font-space-mono),monospace; font-size: 12px; letter-spacing: 0.18em; color: rgba(255,225,140,0.9); }
        .eb-tl-tag { font-family: var(--font-space-mono),monospace; font-size: 8px; letter-spacing: 0.26em; text-transform: uppercase; border: 1px solid; border-radius: 3px; padding: 2px 6px; }
        .eb-tl-title { font-family: var(--font-readex),sans-serif; font-size: 15px; font-weight: 500; color: rgba(255,255,255,0.92); margin: 6px 0 0; line-height: 1.5; }
        .eb-tl-desc { font-family: var(--font-readex),sans-serif; font-size: 13.5px; font-weight: 300; color: rgba(255,255,255,0.55); margin: 4px 0 0; line-height: 1.7; }
        .eb-tl-fig { margin: 12px 0 0; }
        .eb-tl-img { display: block; width: 100%; max-width: 420px; height: auto; border-radius: 8px; border: 1px solid rgba(255,255,255,0.09); background: #0a0a0c; }
        .eb-tl-cap { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.2em; color: rgba(255,255,255,0.32); margin-top: 7px; }
        .eb-tl-hint { display: none; }
        /* highlight — 手機版給卡片底 */
        .eb-tl-row[data-hl="true"] .eb-tl-body { background: rgba(255,225,140,0.05); border: 1px solid rgba(255,225,140,0.22); border-radius: 10px; padding: 14px 16px 16px; margin-bottom: 26px; }
        .eb-tl-row[data-hl="true"] .eb-tl-title { font-size: 17px; font-weight: 600; color: rgba(255,235,180,0.98); }
        .eb-tl-row[data-hl="true"] .eb-tl-dot { width: 12px; height: 12px; box-shadow: 0 0 16px rgba(255,225,140,0.6); }

        /* ── 桌機：橫向卷軸 ── */
        @media (min-width: 681px) {
          .eb-tl { margin: 28px -24px; padding: 0 24px; }
          .eb-tl-track { flex-direction: row; overflow-x: auto; padding: 6px 2px 16px; scroll-snap-type: x proximity; scrollbar-width: thin; scrollbar-color: rgba(255,225,140,0.3) transparent; }
          .eb-tl-row { flex: 0 0 248px; flex-direction: column; gap: 0; scroll-snap-align: start; }
          .eb-tl-row[data-hl="true"] { flex-basis: 292px; }
          .eb-tl-rail { flex-direction: row; width: auto; height: 13px; padding: 0; align-items: center; }
          .eb-tl-line { width: auto; height: 1px; flex: 1; margin: 0 10px 0 6px; background: linear-gradient(to right, rgba(255,225,140,0.35), rgba(255,255,255,0.1)); }
          .eb-tl-body { padding: 14px 20px 0 0; }
          .eb-tl-row[data-hl="true"] .eb-tl-body { margin: 14px 20px 0 0; padding: 14px 16px 16px; }
          .eb-tl-img { max-width: 100%; aspect-ratio: 4/3; object-fit: cover; }
          .eb-tl-hint { display: block; font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.26em; color: rgba(255,255,255,0.3); text-align: right; margin: 6px 0 0; }
        }
      `}</style>
    </div>
  );
}

/* Info card — 可收藏的地點資料卡 */
function InfoCardBlock({ name, sub, rows, links, footnote }: Extract<Block, { type: "info-card" }>) {
  return (
    <div className="eb-ic">
      <div className="eb-ic-card">
        <p className="eb-ic-badge">FIELD DATA · 地點資料</p>
        <p className="eb-ic-name">{name}</p>
        {sub && <p className="eb-ic-sub">{sub}</p>}
        <div className="eb-ic-rule" aria-hidden />
        <dl className="eb-ic-rows">
          {rows.map((r) => (
            <div key={r.label} className="eb-ic-row">
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
        <div className="eb-ic-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="eb-ic-btn">{l.label} ↗</a>
          ))}
        </div>
        {footnote && <p className="eb-ic-foot">{footnote}</p>}
      </div>
      <style>{`
        .eb-ic { margin: 24px 0; }
        .eb-ic-card { background: #0d0d10; border: 1px solid rgba(255,225,140,0.16); border-radius: 12px; padding: 24px 26px; }
        .eb-ic-badge { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.44em; text-transform: uppercase; color: rgba(255,225,140,0.6); margin: 0 0 12px; }
        .eb-ic-name { font-family: var(--font-readex),sans-serif; font-size: clamp(22px,4vw,30px); font-weight: 600; letter-spacing: -0.01em; color: rgba(255,255,255,0.97); margin: 0; line-height: 1.15; }
        .eb-ic-sub { font-family: var(--font-readex),sans-serif; font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.5); margin: 6px 0 0; }
        .eb-ic-rule { height: 1px; background: rgba(255,255,255,0.07); margin: 16px 0; }
        .eb-ic-rows { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; margin: 0; }
        .eb-ic-row dt { font-family: var(--font-space-mono),monospace; font-size: 8.5px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.34); margin-bottom: 4px; }
        .eb-ic-row dd { font-family: var(--font-readex),sans-serif; font-size: 14px; font-weight: 400; color: rgba(255,255,255,0.85); margin: 0; line-height: 1.5; }
        .eb-ic-links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; }
        .eb-ic-btn { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,225,140,0.9); text-decoration: none; border: 1px solid rgba(255,225,140,0.3); border-radius: 3px; padding: 9px 14px; transition: color .15s, border-color .15s, background .15s; }
        .eb-ic-btn:hover { color: rgba(255,225,140,1); border-color: rgba(255,225,140,0.6); background: rgba(255,225,140,0.06); }
        .eb-ic-foot { font-family: var(--font-readex),sans-serif; font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.4); margin: 14px 0 0; line-height: 1.6; }
        @media (max-width: 520px) { .eb-ic-rows { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

/* Map embed — 點擊才載入 Google Maps iframe，避免拖慢頁面 */
function MapEmbedBlock({ src, title, aspect = "16/9", eager = false }: Extract<Block, { type: "map-embed" }>) {
  const [loaded, setLoaded] = useState(eager);
  return (
    <div className="eb-map">
      <div className="eb-map-wrap" style={{ aspectRatio: aspect }}>
        {loaded ? (
          <iframe
            src={src}
            title={title ?? "Google Maps"}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <button type="button" className="eb-map-load" onClick={() => setLoaded(true)}>
            <span className="eb-map-pin" aria-hidden>◉</span>
            <span className="eb-map-lbl">{title ?? "載入互動地圖"}</span>
            <span className="eb-map-sub">點一下載入 Google Maps</span>
          </button>
        )}
      </div>
      <style>{`
        .eb-map { margin: 24px 0; }
        .eb-map-wrap { position: relative; width: 100%; border-radius: 10px; overflow: hidden; background: #0a0a0c; border: 1px solid rgba(255,255,255,0.08); }
        .eb-map-load { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,225,140,0.05), transparent 70%), #0a0a0c; border: none; cursor: pointer; }
        .eb-map-pin { font-size: 22px; color: rgba(255,225,140,0.8); }
        .eb-map-lbl { font-family: var(--font-readex),sans-serif; font-size: 14px; color: rgba(255,255,255,0.85); }
        .eb-map-sub { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .eb-map-load:hover .eb-map-lbl { color: rgba(255,225,140,0.95); }
      `}</style>
    </div>
  );
}

/* Comment CTA — 打開右下角留言泡泡輸入框 */
function CommentCTABlock({ label, sub }: Extract<Block, { type: "comment-cta" }>) {
  return (
    <div className="eb-cc">
      <button
        type="button"
        className="eb-cc-btn"
        onClick={() => window.dispatchEvent(new CustomEvent("bubble-comments:open"))}
      >
        <span aria-hidden>💬</span>
        <span>{label}</span>
      </button>
      {sub && <p className="eb-cc-sub">{sub}</p>}
      <style>{`
        .eb-cc { margin: 20px 0; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
        .eb-cc-btn { display: inline-flex; align-items: center; gap: 10px; background: rgba(255,225,140,0.08); border: 1px solid rgba(255,225,140,0.35); border-radius: 999px; padding: 11px 20px; cursor: pointer; font-family: var(--font-readex),sans-serif; font-size: 14px; color: rgba(255,255,255,0.92); transition: background .15s, border-color .15s; }
        .eb-cc-btn:hover { background: rgba(255,225,140,0.14); border-color: rgba(255,225,140,0.6); }
        .eb-cc-sub { font-family: var(--font-readex),sans-serif; font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.4); margin: 0; }
      `}</style>
    </div>
  );
}

/* YouTube 嵌入 — 點縮圖才載入播放器，載入後有完整音量控制 */
function YouTubeBlock({ id, title, aspect = "16/9" }: Extract<Block, { type: "youtube" }>) {
  const [play, setPlay] = useState(false);
  return (
    <div className="eb-yt">
      <div className="eb-yt-wrap" style={{ aspectRatio: aspect }}>
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button type="button" className="eb-yt-load" onClick={() => setPlay(true)} aria-label={`播放 ${title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} className="eb-yt-thumb" loading="lazy" />
            <span className="eb-yt-play" aria-hidden>▶</span>
            <span className="eb-yt-title">{title}</span>
          </button>
        )}
      </div>
      <style>{`
        .eb-yt { margin: 24px 0; }
        .eb-yt-wrap { position: relative; width: 100%; border-radius: 10px; overflow: hidden; background: #0a0a0c; border: 1px solid rgba(255,255,255,0.09); }
        .eb-yt-load { position: absolute; inset: 0; border: none; padding: 0; cursor: pointer; background: #000; }
        .eb-yt-thumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.72; transition: opacity .2s; }
        .eb-yt-load:hover .eb-yt-thumb { opacity: 0.9; }
        .eb-yt-play { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 62px; height: 62px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(0,0,0,0.65); border: 1px solid rgba(255,225,140,0.55); color: rgba(255,225,140,0.95); font-size: 20px; padding-left: 4px; transition: background .2s; }
        .eb-yt-load:hover .eb-yt-play { background: rgba(255,225,140,0.2); }
        .eb-yt-title { position: absolute; left: 14px; bottom: 12px; font-family: var(--font-readex),sans-serif; font-size: 12.5px; color: rgba(255,255,255,0.9); background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); padding: 6px 10px; border-radius: 4px; }
      `}</style>
    </div>
  );
}

/* Sources — 資料來源清單 */
function SourcesBlock({ items }: Extract<Block, { type: "sources" }>) {
  return (
    <div className="eb-src">
      <ol className="eb-src-list">
        {items.map((s, i) => (
          <li key={i} className="eb-src-item">
            {s.href ? (
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="eb-src-link">{s.label} ↗</a>
            ) : (
              <span className="eb-src-label">{s.label}</span>
            )}
            {s.note && <span className="eb-src-note"> — {s.note}</span>}
          </li>
        ))}
      </ol>
      <style>{`
        .eb-src { margin: 20px 0; }
        .eb-src-list { margin: 0; padding-left: 1.4em; display: flex; flex-direction: column; gap: 10px; }
        .eb-src-item { font-family: var(--font-readex),sans-serif; font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.55); line-height: 1.7; }
        .eb-src-item::marker { font-family: var(--font-space-mono),monospace; font-size: 11px; color: rgba(255,225,140,0.6); }
        .eb-src-link { color: rgba(255,255,255,0.8); text-decoration: none; border-bottom: 1px solid rgba(255,225,140,0.3); transition: color .15s, border-color .15s; }
        .eb-src-link:hover { color: rgba(255,225,140,0.95); border-color: rgba(255,225,140,0.7); }
        .eb-src-note { color: rgba(255,255,255,0.45); }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Block dispatcher
   ───────────────────────────────────────────────────────────────── */
function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "headline":      return <HeadlineBlock {...block} />;
    case "text":          return <TextBlock {...block} />;
    case "callout":       return <CalloutBlock {...block} />;
    case "setup-cards":   return <SetupCardsBlock {...block} />;
    case "cta":           return <CTABlock {...block} />;
    case "ui-crop":       return <UICropBlock {...block} />;
    case "ui-crop-pair":  return <UICropPairBlock {...block} />;
    case "image":         return <ImageBlock {...block} />;
    case "image-pair":    return <ImagePairBlock {...block} />;
    case "compare":       return <CompareBlock {...block} />;
    case "video":         return <VideoBlock {...block} />;
    case "video-lazy":    return <VideoLazyBlock {...block} />;
    case "travel-gallery":return <TravelGalleryBlock {...block} />;
    case "app-rec":       return <AppRecBlock {...block} />;
    case "flow-steps":    return <FlowStepsBlock {...block} />;
    case "next-stop":     return <NextStopBlock {...block} />;
    case "prompt-copy":   return <PromptCopyBlock {...block} />;
    case "oscar-notes":   return <OscarNotesBlock {...block} />;
    case "closing":       return <ClosingBlock {...block} />;
    case "faq":           return <FAQBlock {...block} />;
    case "related":       return <RelatedBlock {...block} />;
    case "timeline":      return block.epic ? <EpicTimelineBlock {...block} /> : <TimelineBlock {...block} />;
    case "info-card":     return <InfoCardBlock {...block} />;
    case "map-embed":     return <MapEmbedBlock {...block} />;
    case "comment-cta":   return <CommentCTABlock {...block} />;
    case "youtube":       return <YouTubeBlock {...block} />;
    case "higgsfield":    return <HiggsfieldRef variant={block.variant} />;
    case "sources":       return <SourcesBlock {...block} />;
    default:              return null;
  }
}

/* ─────────────────────────────────────────────────────────────────
   Main template shell
   ───────────────────────────────────────────────────────────────── */
interface EditorialTemplateProps {
  note:   FieldNote;
  blocks: Block[];
}

export default function EditorialTemplate({ note, blocks }: EditorialTemplateProps) {
  return (
    <>
      <EditorialAmbience />
      <ScrollProgress />
      <BubbleComments slug={note.slug} prompt={note.commentPrompt} />

      {/* Nav */}
      <header className="et-nav" aria-label="Article navigation">
        <div className="et-nav-inner">
          <Link href="/field-notes" className="et-back">
            <span aria-hidden>←</span>
            <span>Field Notes</span>
          </Link>
          <div className="et-breadcrumb" aria-hidden>{note.categoryLabel}</div>
          <a href="https://www.instagram.com/minehoooo.arw/" target="_blank" rel="noopener noreferrer" className="et-ig">
            @minehoooo.arw
          </a>
        </div>
      </header>

      {/* Hero */}
      <div className={note.heroVideos?.length ? "et-hero et-hero-video" : "et-hero"} style={{ position: "relative" }}>
        {note.heroVideos && note.heroVideos.length > 0 && <HeroVideoWall videos={note.heroVideos} />}
        <div className="et-hero-inner" style={{ position: "relative" }}>
          {note.issue && (
            <p className="et-issue" aria-hidden>
              <span className="et-issue-label">Field Notes</span>
              <span className="et-issue-rule" />
              <span className="et-issue-no">ISSUE #{note.issue}</span>
            </p>
          )}
          <div className="et-meta">
            <span className="et-cat">{note.categoryLabel}</span>
            <span className="et-dot" aria-hidden>·</span>
            <span className="et-date">{note.date.slice(0, 7)}</span>
            <span className="et-dot" aria-hidden>·</span>
            <span className="et-time">{note.readingTime} min</span>
            <span className="et-dot" aria-hidden>·</span>
            <NoteViews slug={note.slug} increment />
          </div>
          <h1 className="et-title">{note.title}</h1>
          {note.subtitle && <p className="et-subtitle">{note.subtitle}</p>}
          <div className="et-author">
            <span className="et-by">By</span>
            <span className="et-sig" style={{ fontFamily: "Snell Roundhand, Brush Script MT, cursive", fontStyle: "italic" }}>Oscar Lai</span>
            <span className="et-role">Director · DP</span>
            <span className="et-loc">Taichung · TW</span>
          </div>
        </div>
      </div>

      {/* Body grid */}
      <div className="et-body">
        <article className="et-article">
          {blocks.map((block, i) => (
            <Reveal key={i}>
              <RenderBlock block={block} />
            </Reveal>
          ))}
          <div className="et-footer">
            <span>© MINEH4O.ARW</span>
            <a href="https://www.instagram.com/minehoooo.arw/" target="_blank" rel="noopener noreferrer">@minehoooo.arw →</a>
          </div>
        </article>
        <div className="et-toc-col">
          <EditorialTOC blocks={blocks} />
        </div>
      </div>

      <style>{`
        .et-nav { position: sticky; top: 0; z-index: 40; background: rgba(10,10,12,0.84); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .et-nav-inner { max-width: 1160px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; gap: 14px; }
        .et-back { display: flex; align-items: center; gap: 7px; text-decoration: none; color: rgba(255,255,255,0.6); font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; transition: color .15s; flex-shrink: 0; }
        .et-back:hover { color: rgba(255,255,255,.95); }
        .et-breadcrumb { flex: 1; font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        .et-ig { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(255,225,140,0.75); text-decoration: none; border: 1px solid rgba(255,225,140,0.22); border-radius: 3px; padding: 5px 10px; transition: color .15s, border-color .15s; flex-shrink: 0; }
        .et-ig:hover { color: rgba(255,225,140,1); border-color: rgba(255,225,140,0.5); }

        .et-hero { border-bottom: 1px solid rgba(255,255,255,0.05); }
        .et-hero-inner { max-width: 760px; margin: 0 auto; padding: 52px 24px 36px; }
        .et-hero-video { overflow: hidden; }
        .et-hero-video .et-hero-inner { padding: clamp(120px, 22vh, 220px) 24px 64px; }
        .et-hero-video .et-title { font-size: clamp(34px, 7vw, 62px); text-shadow: 0 2px 30px rgba(0,0,0,0.6); }
        .et-issue { display: flex; align-items: center; gap: 14px; margin: 0 0 26px; }
        .et-issue-label { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase; color: rgba(255,255,255,0.55); }
        .et-issue-rule { flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.18), transparent); }
        .et-issue-no { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.3em; color: rgba(255,225,140,0.85); }
        .et-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; }
        .et-cat { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(255,225,140,0.88); border-bottom: 1px solid rgba(255,225,140,0.38); padding-bottom: 1px; }
        .et-dot { color: rgba(255,255,255,.22); font-size: 12px; }
        .et-date, .et-time { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.22em; color: rgba(255,255,255,0.35); }
        .et-title { font-family: var(--font-readex),sans-serif; font-size: clamp(30px,6.2vw,54px); font-weight: 600; letter-spacing: -0.025em; color: rgba(255,255,255,.97); margin: 0 0 12px; line-height: 1.14; text-wrap: balance; }
        .et-subtitle { font-family: var(--font-readex),sans-serif; font-size: 15px; font-weight: 300; color: rgba(255,255,255,.48); margin: 0 0 28px; line-height: 1.5; }
        .et-author { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .et-by { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.2em; color: rgba(255,255,255,0.28); }
        .et-sig { font-size: 18px; color: rgba(255,225,140,.85); line-height: 1; }
        .et-role { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .et-loc { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,255,255,0.25); }

        .et-body { max-width: 980px; margin: 0 auto; padding: 0 24px 96px; display: grid; grid-template-columns: minmax(0,700px) minmax(160px,200px); gap: 0 48px; align-items: start; }
        .et-article { min-width: 0; padding-top: 8px; }
        .et-toc-col { padding-top: 64px; }
        .et-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 64px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.07); font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,255,255,0.32); }
        .et-footer a { color: rgba(255,225,140,0.6); text-decoration: none; transition: color .15s; }
        .et-footer a:hover { color: rgba(255,225,140,1); }

        @media (max-width: 1023px) { .et-body { grid-template-columns: minmax(0,700px); max-width: 760px; } .et-toc-col { display: none; } }
        @media (max-width: 680px) { .et-body { padding: 0 16px 72px; } .et-hero-inner { padding: 36px 16px 28px; } .et-nav-inner { padding: 12px 16px; } }
      `}</style>
    </>
  );
}
