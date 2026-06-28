/**
 * Article body for `seedance-aerial`
 * Trigger word for IG/Threads bot: 飛天小女警
 *
 * The Build The Shot hero, Prompt Builder, Workflow strip and Prompt Anatomy
 * are all rendered by page.tsx ABOVE this. This file owns the long-form
 * supplementary article content only:
 *   - Oscar's "why this works" note
 *   - Common mistake (route stays on the upload)
 *   - Results showcase
 *   - Appendix: 6 camera move icon cards
 */

"use client";

import Image from "next/image";

const ASSETS = "/field-notes/seedance-map-route";

export default function SeedanceAerialBody() {
  return (
    <div className="fn-prose">
      <BaseStyles />

      {/* ── From Oscar ── */}
      <SectionTag en="From Oscar" zh="補充說明" />
      <p className="lede">
        Higgsfield × Seedance 看不到地圖、看不到你的想像。<br />
        它看得到的只有<strong>你上傳的那張圖</strong>。<br />
        路徑線就是給它的視覺指令 — 從哪飛、怎麼飛、停在哪。
      </p>

      <div className="oscar-note">
        <p className="oscar-note-head">為什麼這個案例是 FPV，不是雲台空拍</p>
        <p className="oscar-note-body">
          這次飛的是 Toyo Ito 設計的台中國家歌劇院 — 一棟有大量曲面、洞窟結構的建築。<br />
          雲台空拍會把它拍成靜態的明信片，FPV 才能穿越開口、貼著曲牆飛過去，<br />
          把建築的「孔洞感」翻譯成一段會動的鏡頭。
        </p>
      </div>

      {/* ── Common mistake ── */}
      <SectionTag en="Common Mistake" zh="常見錯誤" />
      <h2 className="mistake-title">路徑不是草稿，<br/>而是給 Seedance 的視覺引導</h2>
      <PathComparison />

      {/* ── Output ── */}
      <SectionTag en="Output" zh="成果展示" />
      <ResultsBlock />

      {/* ── Appendix ── */}
      <SectionTag en="Appendix" zh="附錄 · 空拍常用運鏡速查" />
      <CameraMovesGrid />
    </div>
  );
}

/* ─── Section tag ─── */
function SectionTag({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="section-tag">
      <span className="section-tag-line" aria-hidden />
      <div className="section-tag-text">
        <p className="section-tag-en">{en}</p>
        <p className="section-tag-zh">{zh}</p>
      </div>
    </div>
  );
}

/* ─── Common mistake: wrong upload vs route-painted ─── */
function PathComparison() {
  const items = [
    {
      src: `${ASSETS}/wrong-upload-example.jpg`,
      tag: "wrong",
      label: "不要上傳",
      en: "Without Route",
      desc: "原始全景、沒有路徑。模型不知道你想怎麼飛。",
    },
    {
      src: `${ASSETS}/route-painted.jpg`,
      tag: "right",
      label: "正確上傳",
      en: "With Route",
      desc: "在原始圖上畫好路徑、保留線條再上傳。",
    },
  ];
  return (
    <div className="path-comparison">
      {items.map((it) => (
        <figure key={it.tag} className="path-card">
          <div className="path-image">
            <Image
              src={it.src}
              alt={it.label}
              width={1600}
              height={1000}
              className="path-img-el"
            />
            <span className={`path-pill path-pill-${it.tag}`}>{it.en}</span>
          </div>
          <figcaption className="path-caption">
            <p className="path-caption-label">{it.label}</p>
            <p className="path-caption-desc">{it.desc}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* ─── Results: horizontal aerial + vertical IG output ─── */
function ResultsBlock() {
  return (
    <div className="results-grid">
      <figure className="result-landscape">
        <div className="result-frame">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={`${ASSETS}/generated-aerial.mp4`}
            autoPlay muted loop playsInline preload="metadata"
            className="result-video"
          />
          <span className="frame-tag frame-tag-gold">Aerial · 16:10</span>
        </div>
        <figcaption>橫式成品 — FPV 飛越歌劇院曲牆，從天際線到街口。</figcaption>
      </figure>

      <figure className="result-vertical">
        <div className="result-frame result-frame-vertical">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={`${ASSETS}/ig-output.mp4`}
            autoPlay muted loop playsInline preload="metadata"
            className="result-video"
          />
          <span className="frame-tag frame-tag-gold">IG · 9:16</span>
        </div>
        <figcaption>直式 IG 版本 — 加上字卡與配樂後的成品。</figcaption>
      </figure>
    </div>
  );
}

/* ─── Camera moves — 2×3 SVG icon cards ─── */
function CameraMovesGrid() {
  const moves: { num: string; name: string; en: string; desc: string; icon: React.ReactNode }[] = [
    { num: "M1", name: "Push-in",            en: "推進",     desc: "向主體前進，建立張力。",        icon: <PushInIcon /> },
    { num: "M2", name: "Pull-back reveal",   en: "拉遠揭露", desc: "後退拉開，揭露全景。",          icon: <PullBackIcon /> },
    { num: "M3", name: "Orbit",              en: "環繞",     desc: "繞著主體飛，強調立體與規模。",  icon: <OrbitIcon /> },
    { num: "M4", name: "Fly-over",           en: "飛越",     desc: "低空掠過地形。",                icon: <FlyOverIcon /> },
    { num: "M5", name: "Top-down descend",   en: "俯視下降", desc: "正上方往下，幾何感最強。",      icon: <TopDownIcon /> },
    { num: "M6", name: "Parallax tracking",  en: "視差跟拍", desc: "側向平移，前後景錯位移動。",    icon: <ParallaxIcon /> },
  ];
  return (
    <div className="moves-grid">
      {moves.map((m) => (
        <div key={m.num} className="move-card">
          <div className="move-icon">{m.icon}</div>
          <div className="move-meta">
            <p className="move-num">{m.num}</p>
            <p className="move-name">{m.name}</p>
            <p className="move-en">{m.en}</p>
          </div>
          <p className="move-desc">{m.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── SVG line icons — camera moves ─── */
const ICON_PROPS = {
  viewBox: "0 0 60 40",
  width: "60",
  height: "40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.2",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
function PushInIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M4 28 L56 28" opacity="0.4" />
      <rect x="27" y="22" width="6" height="6" />
      <path d="M14 20 L30 24" />
      <path d="M14 36 L30 32" />
      <path d="M26 22 L30 24 L26 26" />
      <path d="M26 34 L30 32 L26 30" />
    </svg>
  );
}
function PullBackIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M4 28 L56 28" opacity="0.4" />
      <rect x="8" y="10" width="44" height="20" opacity="0.5" />
      <rect x="24" y="18" width="12" height="8" />
      <path d="M22 14 L14 8 M14 8 L18 8 M14 8 L14 12" />
      <path d="M38 14 L46 8 M46 8 L42 8 M46 8 L46 12" />
    </svg>
  );
}
function OrbitIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden>
      <ellipse cx="30" cy="22" rx="22" ry="9" opacity="0.5" />
      <circle cx="30" cy="22" r="3.5" />
      <circle cx="52" cy="22" r="1.4" fill="currentColor" />
      <circle cx="8" cy="22" r="1.4" fill="currentColor" />
      <path d="M44 16 L50 14 L48 20" />
    </svg>
  );
}
function FlyOverIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M4 32 L14 26 L22 30 L32 22 L42 28 L50 24 L56 30" />
      <path d="M4 36 L56 36" opacity="0.4" />
      <path d="M6 14 C 20 12, 38 12, 56 14" strokeDasharray="3 3" />
      <path d="M52 14 L56 14 L54 18" />
    </svg>
  );
}
function TopDownIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden>
      <rect x="10" y="6" width="40" height="28" opacity="0.45" />
      <rect x="20" y="12" width="20" height="16" opacity="0.7" />
      <rect x="27" y="17" width="6" height="6" />
      <path d="M30 30 L30 36" />
      <path d="M27 33 L30 36 L33 33" />
    </svg>
  );
}
function ParallaxIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M4 30 L20 30" />
      <path d="M16 27 L20 30 L16 33" />
      <path d="M14 20 L26 20" opacity="0.7" />
      <path d="M23 18 L26 20 L23 22" opacity="0.7" />
      <path d="M20 10 L26 10" opacity="0.4" />
      <path d="M24 8 L26 10 L24 12" opacity="0.4" />
      <rect x="46" y="18" width="8" height="6" />
      <path d="M44 21 L46 21" />
    </svg>
  );
}

/* ─── Inline styles ─── */
function BaseStyles() {
  return (
    <style>{`
      .fn-prose {
        font-size: 15.5px;
        line-height: 1.85;
        color: rgba(255,255,255,0.86);
        word-break: keep-all;
        overflow-wrap: anywhere;
      }
      .fn-prose p { margin: 0 0 1.1em; }
      .fn-prose strong { color: #fff; font-weight: 500; }
      .fn-prose .lede {
        font-size: 17px;
        line-height: 1.75;
        color: rgba(255,255,255,0.92);
        font-weight: 300;
        margin-bottom: 1.8em;
      }

      .section-tag {
        display: flex; align-items: center; gap: 14px;
        margin: 3.4em 0 1.4em;
      }
      .section-tag-line {
        width: 36px; height: 1px;
        background: linear-gradient(to right, rgba(255,225,140,0.6), transparent);
      }
      .section-tag-text { line-height: 1.2; }
      .section-tag-en {
        margin: 0;
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.38em;
        text-transform: uppercase;
        color: rgba(255,225,140,0.85);
      }
      .section-tag-zh {
        margin: 3px 0 0;
        font-size: 13px;
        letter-spacing: 0.04em;
        color: rgba(255,255,255,0.55);
      }

      .oscar-note {
        margin: 1em 0 1.6em;
        padding: 18px 20px;
        background: rgba(255,255,255,0.022);
        border-left: 2px solid rgba(255,225,140,0.45);
      }
      .oscar-note-head {
        margin: 0 0 8px;
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: rgba(255,225,140,0.85);
      }
      .oscar-note-body {
        margin: 0;
        font-size: 14.5px;
        line-height: 1.85;
        color: rgba(255,235,200,0.92);
      }

      .mistake-title {
        margin: 0 0 1.2em;
        font-size: clamp(1.4rem, 3vw, 1.9rem);
        line-height: 1.3;
        color: #fff;
        font-weight: 500;
        letter-spacing: 0.005em;
      }

      .path-comparison {
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
        margin: 1.4em 0 2em;
      }
      @media (min-width: 720px) {
        .path-comparison { grid-template-columns: 1fr 1fr; gap: 16px; }
      }
      .path-card { margin: 0; }
      .path-image {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 10;
        background: #0a0a0c;
        border: 1px solid rgba(255,255,255,0.10);
        overflow: hidden;
        border-radius: 12px;
      }
      .path-img-el {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .path-pill {
        position: absolute;
        top: 12px; left: 12px;
        z-index: 3;
        font-family: var(--font-space-mono), monospace;
        font-size: 9px;
        letter-spacing: 0.32em;
        padding: 4px 9px;
        text-transform: uppercase;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        background: rgba(0,0,0,0.55);
        border-radius: 4px;
      }
      .path-pill-wrong {
        color: rgba(255,160,160,0.95);
        border: 1px solid rgba(255,120,120,0.4);
      }
      .path-pill-right {
        color: rgba(170,230,200,0.95);
        border: 1px solid rgba(150,220,180,0.4);
      }
      .path-caption { margin-top: 0.8em; }
      .path-caption-label {
        margin: 0;
        font-size: 13px;
        color: rgba(255,255,255,0.92);
        font-weight: 500;
      }
      .path-caption-desc {
        margin: 4px 0 0;
        font-size: 12.5px;
        color: rgba(255,255,255,0.55);
        line-height: 1.65;
      }

      .results-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        margin: 0.4em 0 1em;
      }
      @media (min-width: 760px) {
        .results-grid { grid-template-columns: 2fr 1fr; gap: 18px; }
      }
      .result-landscape, .result-vertical { margin: 0; }
      .result-frame {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 10;
        background: #0a0a0c;
        border: 1px solid rgba(255,255,255,0.10);
        overflow: hidden;
        border-radius: 12px;
      }
      .result-frame-vertical { aspect-ratio: 9 / 16; }
      .result-video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .frame-tag {
        position: absolute;
        top: 12px; left: 12px;
        z-index: 3;
        font-family: var(--font-space-mono), monospace;
        font-size: 9px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        padding: 4px 9px;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 4px;
      }
      .frame-tag-gold {
        color: rgba(255,225,140,0.95);
        background: rgba(20,15,5,0.55);
        border: 1px solid rgba(255,225,140,0.32);
      }
      .result-landscape figcaption,
      .result-vertical figcaption {
        margin-top: 0.7em;
        font-size: 12.5px;
        color: rgba(255,255,255,0.55);
        line-height: 1.65;
      }

      /* Camera moves */
      .moves-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        margin: 0 0 1em;
      }
      @media (min-width: 560px) {
        .moves-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
      }
      @media (min-width: 880px) {
        .moves-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      }
      .move-card {
        position: relative;
        padding: 18px 16px 16px;
        background: rgba(255,255,255,0.022);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 10px;
        transition: border-color .25s, background .25s;
      }
      .move-card:hover {
        border-color: rgba(255,225,140,0.35);
        background: rgba(255,225,140,0.03);
      }
      .move-icon { color: rgba(255,255,255,0.85); margin-bottom: 10px; }
      .move-meta { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
      .move-num {
        margin: 0;
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.22em;
        color: rgba(255,225,140,0.85);
      }
      .move-name { margin: 0; font-size: 14px; color: #fff; font-weight: 500; }
      .move-en { margin: 0; font-size: 12.5px; color: rgba(255,255,255,0.6); }
      .move-desc {
        margin: 8px 0 0;
        font-size: 12.5px;
        line-height: 1.55;
        color: rgba(255,255,255,0.6);
      }

      @media (max-width: 640px) {
        .fn-prose { font-size: 15px; }
        .mistake-title { font-size: 1.2rem; }
      }
    `}</style>
  );
}
