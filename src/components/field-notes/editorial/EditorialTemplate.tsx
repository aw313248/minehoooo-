"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FieldNote } from "@/data/fieldNotes";
import { getRelatedNotes } from "@/data/fieldNotes";
import type { Block, NextStopCity } from "./types";

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
        .et-toc { position: sticky; top: 120px; padding-left: 24px; border-left: 1px solid rgba(255,255,255,0.07); }
        .et-toc-title { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.42em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin: 0 0 14px; }
        .et-toc-item { display: block; width: 100%; background: none; border: none; cursor: pointer; text-align: left; padding: 6px 0; font-family: var(--font-readex),sans-serif; font-size: 11.5px; color: rgba(255,255,255,0.38); line-height: 1.35; transition: color 0.15s; }
        .et-toc-item[data-active="true"] { color: rgba(255,255,255,0.92); }
        .et-toc-item:hover { color: rgba(255,255,255,0.78); }
      `}</style>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Lazy video — IntersectionObserver, click-to-play
   ───────────────────────────────────────────────────────────────── */
function LazyVideo({ src, autoPlay = false, loop = true, muted = true, className = "", style = {} }: {
  src: string; autoPlay?: boolean; loop?: boolean; muted?: boolean; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video || !autoPlay) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        video.src = src;
        video.load();
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { rootMargin: "100px" });
    obs.observe(video);
    return () => obs.disconnect();
  }, [src, autoPlay]);

  if (autoPlay) {
    return <video ref={ref} muted loop playsInline className={className} style={style} />;
  }
  return <video src={src} muted={muted} loop={loop} playsInline controls preload="metadata" className={className} style={style} />;
}

/* ─────────────────────────────────────────────────────────────────
   Block renderers
   ───────────────────────────────────────────────────────────────── */

function HeadlineBlock({ id, text, sub }: Extract<Block, { type: "headline" }>) {
  return (
    <div id={id} className="eb-headline">
      <div className="eb-headline-rule" aria-hidden />
      <h2 className="eb-headline-text">{text}</h2>
      {sub && <p className="eb-headline-sub">{sub}</p>}
      <style>{`
        .eb-headline { padding-top: 56px; margin-bottom: 20px; }
        .eb-headline-rule { width: 32px; height: 1px; background: rgba(255,225,140,0.4); margin-bottom: 14px; }
        .eb-headline-text { font-family: var(--font-readex),sans-serif; font-size: clamp(18px,2.5vw,22px); font-weight: 500; letter-spacing: -0.01em; color: rgba(255,255,255,0.97); margin: 0; line-height: 1.2; }
        .eb-headline-sub { font-family: var(--font-readex),sans-serif; font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.42); margin: 6px 0 0; }
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
      {content}
      <style>{`
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
function VideoLazyBlock({ src, caption, aspectRatio = "16/9" }: Extract<Block, { type: "video-lazy" }>) {
  return (
    <div className="eb-vlazy" style={{ margin: "24px 0" }}>
      <div className="eb-vlazy-wrap" style={{ aspectRatio }}>
        <LazyVideo src={src} autoPlay={false} muted loop className="eb-vlazy-vid" />
      </div>
      {caption && <p className="eb-img-cap">{caption}</p>}
      <style>{`
        .eb-vlazy-wrap { position: relative; width: 100%; border-radius: 10px; overflow: hidden; background: #0a0a0c; border: 1px solid rgba(255,255,255,0.08); }
        .eb-vlazy-vid { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
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
          </div>
        ))}
      </div>
      <style>{`
        .eb-tg { margin: 24px 0; }
        .eb-tg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
        .eb-tg-cell { position: relative; aspect-ratio: 9/16; background: #0a0a0c; border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
        .eb-tg-vid { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 600px) { .eb-tg-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}

/* App recommendation */
function AppRecBlock({ name, tagline, appStoreUrl, reason }: Extract<Block, { type: "app-rec" }>) {
  return (
    <div className="eb-app">
      <div className="eb-app-card">
        <div className="eb-app-head">
          <div className="eb-app-icon" aria-hidden>⬛</div>
          <div>
            <p className="eb-app-name">{name}</p>
            {tagline && <p className="eb-app-tag">{tagline}</p>}
          </div>
        </div>
        <p className="eb-app-reason">{reason}</p>
        <div className="eb-app-rule" aria-hidden />
        <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="eb-app-btn">
          App Store →
        </a>
      </div>
      <style>{`
        .eb-app { margin: 24px 0; }
        .eb-app-card { background: #0d0d10; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 22px 24px; }
        .eb-app-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .eb-app-icon { width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #111 0%, #222 100%); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; color: transparent; text-shadow: 0 0 0 rgba(255,255,255,0.6); }
        .eb-app-name { font-family: var(--font-readex),sans-serif; font-size: 18px; font-weight: 600; color: rgba(255,255,255,0.97); margin: 0; letter-spacing: -0.01em; }
        .eb-app-tag { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin: 4px 0 0; }
        .eb-app-reason { font-family: var(--font-readex),sans-serif; font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.62); font-weight: 300; margin: 0 0 16px; }
        .eb-app-rule { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 14px; }
        .eb-app-btn { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,225,140,0.88); text-decoration: none; border: 1px solid rgba(255,225,140,0.24); border-radius: 3px; padding: 8px 14px; display: inline-block; transition: color .15s, border-color .15s; }
        .eb-app-btn:hover { color: rgba(255,225,140,1); border-color: rgba(255,225,140,0.55); }
      `}</style>
    </div>
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
    case "next-stop":     return <NextStopBlock {...block} />;
    case "prompt-copy":   return <PromptCopyBlock {...block} />;
    case "oscar-notes":   return <OscarNotesBlock {...block} />;
    case "closing":       return <ClosingBlock {...block} />;
    case "faq":           return <FAQBlock {...block} />;
    case "related":       return <RelatedBlock {...block} />;
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
      <div className="et-hero">
        <div className="et-hero-inner">
          <div className="et-meta">
            <span className="et-cat">{note.categoryLabel}</span>
            <span className="et-dot" aria-hidden>·</span>
            <span className="et-date">{note.date.slice(0, 7)}</span>
            <span className="et-dot" aria-hidden>·</span>
            <span className="et-time">{note.readingTime} min</span>
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
            <RenderBlock key={i} block={block} />
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
        .et-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; }
        .et-cat { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase; color: rgba(255,225,140,0.88); border-bottom: 1px solid rgba(255,225,140,0.38); padding-bottom: 1px; }
        .et-dot { color: rgba(255,255,255,.22); font-size: 12px; }
        .et-date, .et-time { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.22em; color: rgba(255,255,255,0.35); }
        .et-title { font-family: var(--font-readex),sans-serif; font-size: clamp(24px,5vw,38px); font-weight: 600; letter-spacing: -0.02em; color: rgba(255,255,255,.97); margin: 0 0 10px; line-height: 1.22; }
        .et-subtitle { font-family: var(--font-readex),sans-serif; font-size: 15px; font-weight: 300; color: rgba(255,255,255,.48); margin: 0 0 28px; line-height: 1.5; }
        .et-author { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .et-by { font-family: var(--font-space-mono),monospace; font-size: 9.5px; letter-spacing: 0.2em; color: rgba(255,255,255,0.28); }
        .et-sig { font-size: 18px; color: rgba(255,225,140,.85); line-height: 1; }
        .et-role { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
        .et-loc { font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,255,255,0.25); }

        .et-body { max-width: 1160px; margin: 0 auto; padding: 0 24px 96px; display: grid; grid-template-columns: minmax(0,700px) 1fr; gap: 0 48px; align-items: start; }
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
