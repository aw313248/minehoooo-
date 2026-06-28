"use client";

import { useCallback, useMemo, useState } from "react";
import {
  applyTemplate,
  type PromptBuilderConfig,
  type WhyIcon,
} from "@/data/promptBuilders";

const GLASS = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(22px) saturate(125%)",
  WebkitBackdropFilter: "blur(22px) saturate(125%)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.07), 0 18px 56px rgba(0,0,0,0.34)",
  borderRadius: 16,
} as const;

export default function PromptBuilder({ config }: { config: PromptBuilderConfig }) {
  const defaults = useMemo(() => {
    const o: Record<string, string> = {};
    for (const f of config.fields) o[f.key] = "";
    return o;
  }, [config]);

  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [showZh, setShowZh] = useState(false);
  const [copied, setCopied] = useState(false);

  const englishPrompt = useMemo(
    () => applyTemplate(config.template, values),
    [config.template, values],
  );
  const chinesePrompt = useMemo(
    () =>
      config.chineseTemplate
        ? applyTemplate(config.chineseTemplate, values)
        : null,
    [config.chineseTemplate, values],
  );

  /** values that are filled in — used to highlight matching spans in the output */
  const filledValues = useMemo(() => {
    const list: string[] = [];
    for (const f of config.fields) {
      const v = values[f.key];
      if (v && v.trim().length > 0) list.push(v.trim());
    }
    // Longer spans first so they don't get partially matched
    return list.sort((a, b) => b.length - a.length);
  }, [config.fields, values]);

  const setField = useCallback((key: string, v: string) => {
    setValues(prev => ({ ...prev, [key]: v }));
  }, []);

  const fillExamples = useCallback(() => {
    const o: Record<string, string> = {};
    for (const f of config.fields) o[f.key] = f.example;
    setValues(o);
  }, [config]);

  const reset = useCallback(() => {
    setValues(defaults);
  }, [defaults]);

  const copy = useCallback(() => {
    if (typeof navigator === "undefined") return;
    const text =
      lang === "zh" && chinesePrompt ? chinesePrompt : englishPrompt;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  }, [lang, chinesePrompt, englishPrompt]);

  const onFieldKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && e.currentTarget.tagName === "INPUT") {
        e.preventDefault();
        copy();
      }
    },
    [copy],
  );

  const visiblePrompt = lang === "zh" && chinesePrompt ? chinesePrompt : englishPrompt;

  return (
    <section className="pb-root" aria-label={config.title}>
      <BaseStyles />

      {/* ── Head ── */}
      <div className="pb-head">
        <span className="pb-head-tag">Prompt Builder</span>
        <span className="pb-head-rule" aria-hidden />
        <span className="pb-head-eyebrow">{config.eyebrow}</span>
      </div>

      {/* ── Two-column shell: fields (left) + output (right) ── */}
      <div className="pb-shell" style={GLASS}>
        <div className="pb-cols">

          {/* Left: numbered fields */}
          <div className="pb-fields">
            {config.fields.map((f, i) => (
              <div key={f.key} className="pb-row">
                <span className="pb-row-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="pb-row-body">
                  <label className="pb-row-label" htmlFor={`pb-${config.id}-${f.key}`}>
                    <span className="pb-label-en">{f.labelEn}</span>
                    <span className="pb-label-zh">{f.labelZh}</span>
                  </label>
                  {f.type === "long" ? (
                    <textarea
                      id={`pb-${config.id}-${f.key}`}
                      className="pb-input pb-input-long"
                      placeholder={f.placeholder}
                      rows={2}
                      value={values[f.key]}
                      onChange={e => setField(f.key, e.target.value)}
                      onKeyDown={onFieldKey}
                    />
                  ) : (
                    <input
                      id={`pb-${config.id}-${f.key}`}
                      className="pb-input"
                      type="text"
                      placeholder={f.placeholder}
                      value={values[f.key]}
                      onChange={e => setField(f.key, e.target.value)}
                      onKeyDown={onFieldKey}
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="pb-actions">
              <button type="button" className="pb-action pb-action-ghost" onClick={fillExamples}>
                使用範例
              </button>
              <button type="button" className="pb-action pb-action-ghost" onClick={reset}>
                重設欄位
              </button>
            </div>
          </div>

          {/* Right: generated prompt */}
          <div className="pb-output">
            <div className="pb-output-head">
              <span className="pb-output-tag">Generated Prompt</span>
              <div className="pb-lang-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={lang === "en"}
                  className={`pb-lang-tab ${lang === "en" ? "is-active" : ""}`}
                  onClick={() => setLang("en")}
                >
                  EN
                </button>
                {chinesePrompt && (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={lang === "zh"}
                    className={`pb-lang-tab ${lang === "zh" ? "is-active" : ""}`}
                    onClick={() => setLang("zh")}
                  >
                    ZH
                  </button>
                )}
              </div>
            </div>

            <div className="pb-output-body">
              <HighlightedPrompt text={visiblePrompt} highlights={filledValues} />
            </div>

            <button
              type="button"
              className={`pb-copy ${copied ? "is-copied" : ""}`}
              onClick={copy}
              aria-label="Copy prompt"
            >
              {copied ? (
                <>
                  <CopiedIcon />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <span>Copy Prompt</span>
                  <CopyIcon />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Chinese reference toggle */}
        {lang === "en" && chinesePrompt && (
          <div className="pb-zh-toggle">
            <button
              type="button"
              className="pb-zh-button"
              onClick={() => setShowZh(s => !s)}
              aria-expanded={showZh}
            >
              <span>中文對照</span>
              <span aria-hidden className={`pb-zh-caret ${showZh ? "is-open" : ""}`}>›</span>
            </button>
            {showZh && (
              <pre className="pb-zh-body">
                <code>{chinesePrompt}</code>
              </pre>
            )}
          </div>
        )}

        {/* Warnings + Negative prompt */}
        {(config.warnings?.length || config.negative?.length) ? (
          <div className="pb-meta-grid">
            {config.warnings && config.warnings.length > 0 && (
              <div className="pb-meta-block">
                <p className="pb-meta-head">注意 · Heads-up</p>
                <ul>
                  {config.warnings.map((w, i) => (<li key={i}>{w}</li>))}
                </ul>
              </div>
            )}
            {config.negative && config.negative.length > 0 && (
              <div className="pb-meta-block pb-meta-neg">
                <p className="pb-meta-head">Negative · 不要</p>
                <ul className="pb-meta-neg-list">
                  {config.negative.map((n, i) => (<li key={i}>{n}</li>))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ─── Prompt Anatomy · Six Layers (used outside PromptBuilder by the page) ─── */
export function PromptAnatomy({ config }: { config: PromptBuilderConfig }) {
  return (
    <section className="pa-root" aria-label="Prompt anatomy">
      <PromptAnatomyStyles />
      <div className="pa-head">
        <span className="pa-tag">Prompt Anatomy</span>
        <span aria-hidden className="pa-rule" />
        <span className="pa-sub">Six Layers · 六層結構</span>
      </div>
      <div className="pa-grid">
        {config.whyItWorks.map((w, i) => (
          <div key={i} className="pa-card" style={GLASS}>
            <div className="pa-icon" aria-hidden>{getWhyIcon(w.icon)}</div>
            <p className="pa-en">{w.en}</p>
            <p className="pa-zh">{w.zh}</p>
            <p className="pa-desc">{w.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Highlighted prompt output (paints filled-in spans gold) ─── */
function HighlightedPrompt({ text, highlights }: { text: string; highlights: string[] }) {
  if (!highlights.length) {
    return <span className="pb-prompt-text">{text}</span>;
  }
  // Build a regex matching any of the highlight phrases, case-insensitive.
  // Escape regex special chars in each highlight.
  const escaped = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <span className="pb-prompt-text">
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return <span key={i} className="pb-prompt-var">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

/* ─── Icons ───────────────────────────────────────────────────────── */
function getWhyIcon(name: WhyIcon) {
  switch (name) {
    case "location": return <LocationIcon />;
    case "route":    return <RouteIcon />;
    case "fpv":      return <FpvIcon />;
    case "landmark": return <LandmarkIcon />;
    case "lighting": return <LightingIcon />;
    case "control":  return <ControlIcon />;
  }
}

const IP = {
  width: "28", height: "28", viewBox: "0 0 32 32",
  fill: "none", stroke: "currentColor", strokeWidth: "1.3",
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

function LocationIcon() {
  return (
    <svg {...IP} aria-hidden>
      <path d="M16 28s9-7.5 9-15a9 9 0 1 0-18 0c0 7.5 9 15 9 15z" />
      <circle cx="16" cy="13" r="3" />
    </svg>
  );
}
function RouteIcon() {
  return (
    <svg {...IP} aria-hidden>
      {/* Start dot */}
      <circle cx="6" cy="24" r="2" fill="currentColor" />
      {/* curved route */}
      <path d="M8 23 Q 14 14 18 18 T 26 9" strokeDasharray="0" />
      {/* End arrow */}
      <path d="M24 6 L26 9 L23 11" />
    </svg>
  );
}
function FpvIcon() {
  return (
    <svg {...IP} aria-hidden>
      {/* Drone body */}
      <rect x="13" y="14" width="6" height="4" rx="0.5" />
      {/* Arms */}
      <path d="M9 10 L14 14 M23 10 L18 14 M9 22 L14 18 M23 22 L18 18" />
      {/* Rotors */}
      <circle cx="9" cy="10" r="2" />
      <circle cx="23" cy="10" r="2" />
      <circle cx="9" cy="22" r="2" />
      <circle cx="23" cy="22" r="2" />
    </svg>
  );
}
function LandmarkIcon() {
  return (
    <svg {...IP} aria-hidden>
      {/* Ground line */}
      <path d="M4 26 L28 26" opacity="0.5" />
      {/* Buildings of varying height */}
      <rect x="6" y="18" width="5" height="8" />
      <rect x="12.5" y="12" width="6" height="14" />
      <rect x="20" y="16" width="6" height="10" />
      {/* Windows */}
      <path d="M14.5 16h2M14.5 19h2M14.5 22h2" opacity="0.7" />
    </svg>
  );
}
function LightingIcon() {
  return (
    <svg {...IP} aria-hidden>
      <circle cx="16" cy="16" r="5" />
      <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.5 7.5l2 2M22.5 22.5l2 2M7.5 24.5l2-2M22.5 9.5l2-2" />
    </svg>
  );
}
function ControlIcon() {
  return (
    <svg {...IP} aria-hidden>
      {/* Prohibition circle with diagonal */}
      <circle cx="16" cy="16" r="11" />
      <path d="M8.5 8.5 L23.5 23.5" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="9" y="9" width="11" height="11" rx="1" />
      <path d="M5 15V5a1 1 0 0 1 1-1h10" />
    </svg>
  );
}
function CopiedIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Inline styles ─── */
function BaseStyles() {
  return (
    <style>{`
      .pb-root {
        color: rgba(255,255,255,0.86);
        word-break: keep-all;
        overflow-wrap: anywhere;
      }
      .pb-head {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 16px;
      }
      .pb-head-tag {
        font-family: var(--font-space-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.42em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.95);
      }
      .pb-head-rule {
        flex: 1;
        height: 1px;
        background: linear-gradient(to right, rgba(255,255,255,0.18), transparent 70%);
      }
      .pb-head-eyebrow {
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.38em;
        text-transform: uppercase;
        color: rgba(255,225,140,0.85);
      }

      /* Shell + 2-col split */
      .pb-shell { padding: 22px 22px 26px; }
      @media (min-width: 880px) {
        .pb-shell { padding: 28px 30px 30px; }
      }
      .pb-cols {
        display: grid;
        grid-template-columns: 1fr;
        gap: 22px;
      }
      @media (min-width: 880px) {
        .pb-cols {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
          gap: 26px;
        }
      }

      /* Numbered rows */
      .pb-fields {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-width: 0;
      }
      .pb-row {
        display: grid;
        grid-template-columns: 32px 1fr;
        gap: 12px;
        align-items: start;
      }
      .pb-row-num {
        font-family: var(--font-space-mono), monospace;
        font-size: 12px;
        letter-spacing: 0.22em;
        color: rgba(255,225,140,0.7);
        background: rgba(255,225,140,0.05);
        border: 1px solid rgba(255,225,140,0.20);
        border-radius: 999px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 4px;
      }
      .pb-row-body { min-width: 0; display: flex; flex-direction: column; gap: 5px; }
      .pb-row-label {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .pb-label-en {
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.92);
      }
      .pb-label-zh {
        font-size: 12px;
        color: rgba(255,255,255,0.48);
        letter-spacing: 0.04em;
      }
      .pb-input {
        appearance: none;
        width: 100%;
        background: rgba(255,255,255,0.025);
        border: 1px solid rgba(255,255,255,0.10);
        border-radius: 8px;
        color: rgba(255,255,255,0.95);
        padding: 10px 13px;
        font-size: 13.5px;
        line-height: 1.5;
        font-family: inherit;
        transition: border-color .2s, background .2s, box-shadow .2s;
      }
      .pb-input::placeholder { color: rgba(255,255,255,0.32); }
      .pb-input:focus {
        outline: none;
        border-color: rgba(255,225,140,0.45);
        background: rgba(255,255,255,0.04);
        box-shadow: 0 0 0 3px rgba(255,225,140,0.08);
      }
      .pb-input-long {
        resize: vertical;
        min-height: 58px;
      }

      .pb-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 4px;
      }
      .pb-action {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 8px 12px;
        font-family: var(--font-space-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.14);
        cursor: pointer;
        transition: color .2s, border-color .2s, background .2s;
      }
      .pb-action-ghost {
        color: rgba(255,255,255,0.7);
        background: rgba(255,255,255,0.02);
      }
      .pb-action-ghost:hover {
        color: rgba(255,255,255,0.95);
        border-color: rgba(255,255,255,0.28);
        background: rgba(255,255,255,0.05);
      }

      /* Output column */
      .pb-output {
        display: flex;
        flex-direction: column;
        min-width: 0;
        background: rgba(8,8,12,0.45);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        overflow: hidden;
      }
      .pb-output-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 11px 14px 11px 16px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.012);
      }
      .pb-output-tag {
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.36em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.55);
      }
      .pb-lang-tabs { display: flex; gap: 4px; }
      .pb-lang-tab {
        font-family: var(--font-space-mono), monospace;
        font-size: 9.5px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        padding: 4px 10px;
        background: transparent;
        border: 1px solid transparent;
        color: rgba(255,255,255,0.5);
        cursor: pointer;
        border-radius: 6px;
        transition: color .2s, border-color .2s, background .2s;
      }
      .pb-lang-tab.is-active {
        color: rgba(255,225,140,0.95);
        border-color: rgba(255,225,140,0.32);
        background: rgba(255,225,140,0.05);
      }
      .pb-output-body {
        flex: 1;
        padding: 18px 20px;
        max-height: 280px;
        overflow: auto;
        font-family: "SF Mono", Menlo, Consolas, monospace;
        font-size: 13px;
        line-height: 1.75;
      }
      .pb-prompt-text {
        white-space: pre-wrap;
        word-wrap: break-word;
        color: rgba(255,255,255,0.78);
      }
      .pb-prompt-var {
        color: rgba(255,225,140,0.95);
        background: linear-gradient(180deg, transparent 65%, rgba(255,225,140,0.10) 65%);
      }

      .pb-copy {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        padding: 14px 18px;
        font-family: var(--font-space-mono), monospace;
        font-size: 11px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: rgba(255,225,140,0.95);
        background: rgba(255,225,140,0.06);
        border: none;
        border-top: 1px solid rgba(255,225,140,0.30);
        cursor: pointer;
        transition: color .2s, background .2s, border-color .2s;
      }
      .pb-copy:hover {
        color: rgba(255,235,180,1);
        background: rgba(255,225,140,0.12);
      }
      .pb-copy.is-copied {
        color: rgba(170,230,200,1);
        background: rgba(140,220,180,0.10);
        border-top-color: rgba(150,220,180,0.5);
      }

      /* Chinese ref */
      .pb-zh-toggle { margin-top: 16px; }
      .pb-zh-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.62);
        background: transparent;
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 999px;
        padding: 5px 12px;
        cursor: pointer;
      }
      .pb-zh-button:hover { color: rgba(255,255,255,0.92); border-color: rgba(255,255,255,0.28); }
      .pb-zh-caret {
        font-size: 14px;
        transition: transform .25s ease;
      }
      .pb-zh-caret.is-open { transform: rotate(90deg); }
      .pb-zh-body {
        margin: 10px 0 0;
        padding: 14px 18px;
        background: rgba(8,8,12,0.45);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        font-family: "SF Mono", Menlo, Consolas, monospace;
        font-size: 12.5px;
        line-height: 1.8;
        color: rgba(255,255,255,0.78);
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      /* Meta grid (warnings + negative) */
      .pb-meta-grid {
        margin-top: 22px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
      }
      @media (min-width: 720px) {
        .pb-meta-grid { grid-template-columns: 1.1fr 1fr; gap: 16px; }
      }
      .pb-meta-block {
        padding: 14px 16px;
        background: rgba(255,255,255,0.022);
        border-left: 2px solid rgba(255,225,140,0.55);
      }
      .pb-meta-neg { border-left-color: rgba(255,160,160,0.5); }
      .pb-meta-head {
        margin: 0 0 8px;
        font-family: var(--font-space-mono), monospace;
        font-size: 10px;
        letter-spacing: 0.36em;
        text-transform: uppercase;
        color: rgba(255,225,140,0.85);
      }
      .pb-meta-neg .pb-meta-head { color: rgba(255,160,160,0.85); }
      .pb-meta-block ul {
        margin: 0;
        padding-left: 1.2em;
        font-size: 13px;
        line-height: 1.7;
        color: rgba(255,235,200,0.88);
        list-style: none;
      }
      .pb-meta-block li {
        position: relative;
        padding-left: 1em;
        margin: 0.3em 0;
      }
      .pb-meta-block li::before {
        content: "·";
        position: absolute;
        left: 0; top: 0;
        color: rgba(255,225,140,0.55);
        font-weight: bold;
      }
      .pb-meta-neg li {
        color: rgba(255,200,200,0.82);
        font-family: "SF Mono", Menlo, Consolas, monospace;
        font-size: 12px;
      }
      .pb-meta-neg li::before { color: rgba(255,160,160,0.5); }
    `}</style>
  );
}

/* ─── Prompt Anatomy styles ─── */
function PromptAnatomyStyles() {
  return (
    <style>{`
      .pa-root { color: rgba(255,255,255,0.86); margin: 4em 0 2em; }
      .pa-head {
        display: flex; align-items: center; gap: 14px; margin-bottom: 18px;
      }
      .pa-tag {
        font-family: var(--font-space-mono), monospace;
        font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase;
        color: rgba(255,255,255,0.92);
      }
      .pa-rule {
        flex: 1; height: 1px;
        background: linear-gradient(to right, rgba(255,255,255,0.18), transparent 70%);
      }
      .pa-sub {
        font-family: var(--font-space-mono), monospace;
        font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase;
        color: rgba(255,255,255,0.45);
      }
      .pa-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      @media (min-width: 720px) {
        .pa-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      }
      @media (min-width: 1100px) {
        .pa-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; }
      }
      .pa-card {
        padding: 18px 14px 18px;
        text-align: center;
        transition: border-color .25s, box-shadow .25s;
      }
      .pa-card:hover {
        border-color: rgba(255,225,140,0.32) !important;
      }
      .pa-icon {
        width: 44px; height: 44px;
        display: flex; align-items: center; justify-content: center;
        color: rgba(255,225,140,0.92);
        background: rgba(255,225,140,0.05);
        border: 1px solid rgba(255,225,140,0.22);
        border-radius: 10px;
        margin: 0 auto 12px;
      }
      .pa-en {
        margin: 0;
        font-family: var(--font-space-mono), monospace;
        font-size: 11.5px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.96);
      }
      .pa-zh {
        margin: 3px 0 0;
        font-size: 12.5px;
        color: rgba(255,255,255,0.55);
        letter-spacing: 0.04em;
      }
      .pa-desc {
        margin: 10px 0 0;
        font-size: 12px;
        line-height: 1.55;
        color: rgba(255,255,255,0.6);
      }
    `}</style>
  );
}
