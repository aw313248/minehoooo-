"use client";

/**
 * ScreeningDeck — 「一場放映」：全螢幕疊卡放映系統
 *
 * 設計決策（2026-07 與 Oscar 問卷確認）：
 * - 卡片構圖：陳卓式滿版橫幅 — 劇照鋪滿、大片名在左下、資訊在右下
 * - 獎項：海報式置頂加冕（金色月桂，影展海報規格）
 * - 轉場：推疊（下一卡上推覆蓋、上一卡縮小沉黑）＋失焦手掃過前景（左右交替）
 * - 內容完整性：正片進疊卡；支援角色進片尾字幕（END CREDITS）；短內容進散場後
 *
 * 捲動機制：deck 高度 = N × 100vh，卡片 position:sticky 疊在容器頂，
 * 由最近的 overflow-y 祖先（PageScroll 的分頁容器）驅動進度。
 */

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Types ─── */
export interface DeckWork {
  id: string;          // YouTube id
  title: string;
  en?: string;
  artist?: string;
  role: string;
  desc?: string;
  chip?: string;       // small badge e.g. "AI HYBRID", "TRILOGY Ⅰ/Ⅲ"
  note?: string;       // credential line, e.g. covers / view milestones — gold mono
  awards?: { title: string; org: string }[];
  tools?: string;      // AIGC tool label
  views?: string;      // real view count label, e.g. "22.7萬 views"
  hot?: boolean;       // 熱推 featured pick — gold star badge
}
export interface DeckCard {
  act: string;         // "Ⅰ" — act numeral
  actLabel: string;    // "DIRECTOR'S CUT 導演作品"
  works: DeckWork[];   // 1 = feature card, 2-4 = multi panel card
}

/* ─── Laurel — festival poster crown ─── */
function Laurel({ title, org }: { title: string; org: string }) {
  const leaves = (mirror: boolean) => (
    <g transform={mirror ? "translate(56,0) scale(-1,1)" : undefined}>
      <path d="M 23 27 Q 6 15 16 3" stroke="rgba(255,217,100,0.85)" strokeWidth="1" fill="none" />
      {[0, 1, 2, 3, 4].map(i => {
        const t = i / 4, y = 25 - t * 21, x = 19 - Math.sin(t * 1.3) * 8.5, r = 3.1 - t * 0.8;
        return <ellipse key={i} cx={x} cy={y} rx={r} ry={1.4} fill="rgba(255,217,100,0.9)"
          transform={`rotate(${-36 + t * 44} ${x} ${y})`} opacity={0.55 + t * 0.45} />;
      })}
    </g>
  );
  return (
    <span className="inline-flex flex-col items-center text-center" style={{ minWidth: 96 }}>
      <svg width="56" height="28" viewBox="0 0 56 28" aria-hidden="true">{leaves(false)}{leaves(true)}</svg>
      <span className="font-mono-label" style={{ fontSize: 9.5, letterSpacing: "0.08em", color: "rgba(255,225,140,0.98)", lineHeight: 1.35, maxWidth: 120 }}>{title}</span>
      <span style={{ fontSize: 8.5, letterSpacing: "0.05em", color: "rgba(255,217,100,0.6)" }}>{org}</span>
    </span>
  );
}

/* ─── Film changeover — an out-of-focus 35mm strip sweeps the foreground
   between cards (換本), with a cue dot in the corner right before the cut.
   Blurred foreground occlusion keeps the depth-compression feel. ─── */
function FilmStripOcclusion() {
  const sprockets: React.CSSProperties = {
    width: "9%",
    backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 14px, rgba(255,248,230,0.55) 14px 34px, transparent 34px 48px)",
    backgroundColor: "#040405",
  };
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div style={sprockets} />
      <div style={{
        flex: 1,
        background: "#050507",
        backgroundImage: [
          /* frame gaps */
          "repeating-linear-gradient(to bottom, transparent 0 23%, rgba(255,248,230,0.16) 23% 24%, transparent 24% 25%)",
          /* faint light-leak inside frames */
          "radial-gradient(ellipse 90% 22% at 50% 38%, rgba(255,190,90,0.10), transparent 70%)",
        ].join(","),
      }} />
      <div style={sprockets} />
    </div>
  );
}

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const smooth = (v: number) => { v = clamp(v, 0, 1); return v * v * (3 - 2 * v); };

/* ─── One card ─── */
function Card({ card, index }: { card: DeckCard; index: number }) {
  const multi = card.works.length > 1;
  const lead = card.works[0];
  const crowned = lead.awards && lead.awards.length > 0;

  return (
    <div className="sd-card" data-idx={index}
      style={{
        position: "sticky", top: 0, height: "100vh",
        overflow: "hidden", background: "#000",
        transformOrigin: "50% 0%",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        zIndex: index + 1,
        willChange: "transform, filter",
      }}>

      {/* backdrop(s) */}
      <div style={{ position: "absolute", inset: 0, display: "flex", gap: multi ? 2 : 0 }}>
        {card.works.map(w => (
          <a key={w.id} href={`https://www.youtube.com/watch?v=${w.id}`} target="_blank" rel="noopener noreferrer"
            className="group relative block"
            style={{ flex: 1, minWidth: 0, overflow: "hidden" }}
            aria-label={`觀看 ${w.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://img.youtube.com/vi/${w.id}/maxresdefault.jpg`} alt={`${w.title} 劇照`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
              style={{ filter: multi ? "brightness(0.55) saturate(0.92)" : "brightness(0.46) saturate(0.92) contrast(1.04)" }}
              onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${w.id}/mqdefault.jpg`; }} />
            {/* per-panel caption in multi cards */}
            {multi && (
              <div className="absolute left-3 right-3 bottom-3 z-[2]">
                <p className="text-[12px] md:text-[14px] font-medium leading-tight" style={{ color: "var(--text)" }}>{w.title}</p>
                <p className="font-mono-label text-[7.5px] tracking-[0.2em] mt-1" style={{ color: "var(--white-soft)" }}>
                  {w.role}{w.tools ? ` · ${w.tools}` : ""}{w.views ? ` · ${w.views}` : ""}
                </p>
              </div>
            )}
            {/* hover play */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", border: "1px solid var(--white-dim)" }}>
                <svg className="w-4 h-4 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* readability wash */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: multi
          ? "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, transparent 26%, transparent 62%, rgba(0,0,0,0.85) 100%)"
          : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.9) 100%)",
      }} />

      {/* act marker — top left */}
      <div className="absolute top-14 md:top-16 left-4 md:left-14 z-[3] pointer-events-none">
        <p className="font-mono-label text-[9px] tracking-[0.4em]" style={{ color: "var(--white-soft)" }}>
          ACT {card.act} — {card.actLabel}
        </p>
      </div>

      {/* laurel crown — top center (poster grammar) */}
      {crowned && (
        <div className="absolute left-0 right-0 z-[3] flex justify-center gap-5 md:gap-9 flex-wrap px-4 pointer-events-none"
          style={{ top: "clamp(84px, 13vh, 130px)" }}>
          {lead.awards!.map(a => <Laurel key={a.title + a.org} title={a.title} org={a.org} />)}
        </div>
      )}

      {/* chip — top right */}
      {lead.chip && !multi && (
        <div className="absolute top-14 md:top-16 right-4 md:right-14 z-[3] pointer-events-none">
          <span className="font-mono-label text-[8px] tracking-[0.26em] px-3 py-1.5"
            style={{ border: "1px solid rgba(143,180,255,0.35)", borderRadius: 999, color: "rgba(143,180,255,0.85)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
            {lead.chip}
          </span>
        </div>
      )}

      {/* title block — bottom left / info — bottom right (陳卓式滿版橫幅) */}
      {!multi ? (
        <div className="absolute left-4 right-4 md:left-14 md:right-14 bottom-8 md:bottom-12 z-[3] flex flex-col md:flex-row md:items-end gap-4 md:gap-10 pointer-events-none">
          <div className="flex-1 min-w-0">
            <p className="font-mono-label text-[9px] tracking-[0.34em] mb-2" style={{ color: "rgba(255,225,140,0.75)" }}>
              {lead.hot && (
                <span className="mr-3 px-2 py-0.5" style={{ background: "rgba(255,217,100,0.16)", border: "1px solid rgba(255,217,100,0.5)", borderRadius: 999, color: "rgba(255,225,140,1)" }}>
                  ★ 熱推
                </span>
              )}
              FILM {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display leading-none" style={{ fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)", color: "var(--text)", letterSpacing: "0.01em", textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}>
              {lead.title}
            </h3>
            {lead.en && (
              <p className="font-mono-label text-[9px] tracking-[0.32em] mt-2.5 uppercase" style={{ color: "var(--white-soft)" }}>{lead.en}</p>
            )}
          </div>
          <div className="md:max-w-[320px] md:text-right md:pb-1">
            {lead.note && <p className="text-[13px] md:text-[14.5px] tracking-[0.06em] mb-2 leading-relaxed font-medium" style={{ color: "rgba(255,225,140,0.95)", textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}>{lead.note}</p>}
            {lead.artist && <p className="font-mono-label text-[10px] tracking-[0.16em] mb-1.5" style={{ color: "var(--text-2)" }}>{lead.artist}</p>}
            <p className="font-mono-label text-[8.5px] tracking-[0.24em] mb-2.5" style={{ color: "rgba(143,180,255,0.8)" }}>{lead.role}</p>
            {lead.desc && <p className="text-[12.5px] leading-relaxed hidden md:block" style={{ color: "var(--white-secondary)" }}>{lead.desc}</p>}
          </div>
        </div>
      ) : (
        <div className="absolute left-4 md:left-14 bottom-8 md:bottom-12 right-4 md:right-14 z-[3] pointer-events-none">
          <p className="font-mono-label text-[9px] tracking-[0.34em] mb-2" style={{ color: "rgba(255,225,140,0.75)" }}>
            SERIES {String(index + 1).padStart(2, "0")}
          </p>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h3 className="font-display leading-none" style={{ fontSize: "clamp(1.8rem, 4.6vw, 4rem)", color: "var(--text)", letterSpacing: "0.01em", textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}>
              {lead.chip ?? lead.title}
            </h3>
            {lead.desc && <p className="text-[12.5px] leading-relaxed hidden md:block md:max-w-[300px] md:text-right" style={{ color: "var(--white-secondary)" }}>{lead.desc}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── The deck ─── */
export default function ScreeningDeck({ cards }: { cards: DeckCard[] }) {
  const deckRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);   // colour-grade wipe (ACT Ⅲ/Ⅳ)
  const flashRef = useRef<HTMLDivElement>(null);  // dip/flash overlay (ACT Ⅱ/Ⅴ/Ⅵ/Ⅶ)
  const [activeAct, setActiveAct] = useState(0);
  const reduceMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  /* act list for the programme HUD */
  const acts: { act: string; label: string; firstIdx: number }[] = [];
  cards.forEach((c, i) => {
    if (!acts.length || acts[acts.length - 1].act !== c.act) acts.push({ act: c.act, label: c.actLabel, firstIdx: i });
  });

  const onScroll = useCallback(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const scroller = deck.closest("[style*='overflow']") as HTMLElement | null;
    const vh = window.innerHeight;
    const rect = deck.getBoundingClientRect();
    // progress through the deck: 0 at deck top hitting viewport top, +1 per viewport
    const t = clamp(-rect.top / vh, 0, cards.length - 1.0001);
    const k = Math.floor(t), p = t - k;

    const els = deck.querySelectorAll<HTMLElement>(".sd-card");
    els.forEach((el, i) => {
      const covered = i === k ? p : i < k ? 1 : 0;
      if (reduceMotion.current) { el.style.transform = ""; el.style.filter = ""; return; }
      el.style.transform = `scale(${1 - covered * 0.07})`;
      el.style.filter = `brightness(${1 - covered * 0.62})`;
    });

    /* pin the overlay layer (hand + HUD) to the viewport while inside the deck */
    const hand = handRef.current;
    if (hand?.parentElement) {
      hand.parentElement.style.transform = `translateY(${clamp(-rect.top, 0, deck.offsetHeight - vh)}px)`;
    }

    /* per-act transition — 每一幕有自己的換場語言（沒收之後不再重複膠片）
       Ⅰ film strip ／ Ⅱ·Ⅵ dip-to-black ／ Ⅲ·Ⅳ colour-grade wash ／ Ⅴ·Ⅶ flash cut */
    const nextAct = cards[Math.min(k + 1, cards.length - 1)].act;
    const mode = nextAct === "Ⅰ" ? "strip" : nextAct === "Ⅱ" || nextAct === "Ⅵ" ? "dip"
      : nextAct === "Ⅲ" || nextAct === "Ⅳ" ? "wash" : nextAct === "Ⅴ" ? "blinds" : "glitch";
    const mid = smooth(1 - Math.abs(p - 0.5) * 2);   // 0→1→0 peak at the cut

    if (hand) {
      if (reduceMotion.current || mode !== "strip") { hand.style.opacity = "0"; }
      else {
        const dir = k % 2 === 0 ? 1 : -1;
        const sweep = smooth((p - 0.06) / 0.82);
        const x = (-260 + sweep * 520) * dir;
        hand.style.transform = `translate(-50%,-50%) translateX(${x}%) translateY(${(sweep - 0.5) * -18}%) rotate(${5 * dir}deg)`;
        hand.style.opacity = p < 0.05 || p > 0.95 ? "0" : "0.95";
      }
    }
    if (washRef.current) {
      const w = washRef.current;
      if (reduceMotion.current || mode !== "wash") { w.style.opacity = "0"; }
      else {
        const dir = k % 2 === 0 ? 1 : -1;
        const sweep = smooth((p - 0.08) / 0.8);
        w.style.transform = `translateX(${(-120 + sweep * 240) * dir}%) skewX(${-9 * dir}deg)`;
        w.style.opacity = p < 0.06 || p > 0.94 ? "0" : "0.85";
      }
    }
    if (flashRef.current) {
      const f = flashRef.current;
      if (reduceMotion.current) { f.style.opacity = "0"; }
      else if (mode === "dip") { f.style.background = "#000"; f.style.opacity = String(mid * 0.92); }
      else if (mode === "blinds") {
        /* venetian shutter — vertical bars sweep across (檔案快門) */
        f.style.background = "repeating-linear-gradient(90deg, #000 0 6vw, transparent 6vw 12vw)";
        f.style.backgroundPositionX = `${p * 24}vw`;
        f.style.opacity = String(mid * 0.9);
      } else if (mode === "glitch") {
        /* RGB split pulse — AIGC 的訊號感 */
        f.style.background = "linear-gradient(90deg, rgba(255,0,80,0.5), transparent 30%, transparent 70%, rgba(0,220,255,0.5))";
        f.style.mixBlendMode = "screen";
        const blink = (p > 0.42 && p < 0.48) || (p > 0.52 && p < 0.6) ? mid * 0.8 : 0;
        f.style.opacity = String(blink);
        f.style.transform = blink ? `translateX(${(p * 977 % 7) - 3}px)` : "none";
      } else { f.style.opacity = "0"; }
    }
    /* cue dot — strip & flash modes only */
    if (cueRef.current) {
      cueRef.current.style.opacity =
        !reduceMotion.current && (mode === "strip" || mode === "blinds") && p > 0.06 && p < 0.17 ? "1" : "0";
    }

    /* active act for HUD */
    const cur = Math.round(t);
    let a = 0;
    acts.forEach((ac, i) => { if (cur >= ac.firstIdx) a = i; });
    if (a !== activeAct) setActiveAct(a);

    void scroller;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length, activeAct]);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const scroller = deck.closest("[style*='overflow']") ?? window;
    scroller.addEventListener("scroll", onScroll as EventListener, { passive: true });
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll as EventListener);
  }, [onScroll]);

  const jumpTo = (cardIdx: number) => {
    const deck = deckRef.current;
    if (!deck) return;
    const scroller = deck.closest("[style*='overflow']") as HTMLElement | null;
    if (!scroller) return;
    const top = deck.offsetTop + cardIdx * window.innerHeight;
    scroller.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={deckRef} style={{ position: "relative", height: `${cards.length * 100}vh` }}>
      {cards.map((c, i) => <Card key={c.works[0].id} card={c} index={i} />)}

      {/* pinned overlay layer — hand + programme HUD, manually pinned via transform */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100vh", zIndex: 60, pointerEvents: "none", overflow: "hidden" }}>
        <div ref={handRef} aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%", width: "min(46vw, 520px)", height: "130vh",
          filter: "blur(7px) drop-shadow(0 0 60px rgba(0,0,0,0.6))",
          opacity: 0, willChange: "transform, opacity",
        }}>
          <FilmStripOcclusion />
        </div>
        {/* colour-grade wash — gold→teal gradient blade (ACT Ⅲ/Ⅳ) */}
        <div ref={washRef} aria-hidden="true" style={{
          position: "absolute", inset: "-10% -30%", opacity: 0, willChange: "transform, opacity",
          background: "linear-gradient(100deg, transparent 18%, rgba(255,217,100,0.34) 38%, rgba(120,200,210,0.30) 62%, transparent 82%)",
          filter: "blur(26px)",
        }} />
        {/* dip / flash overlay (ACT Ⅱ/Ⅴ/Ⅵ/Ⅶ) */}
        <div ref={flashRef} aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0, willChange: "opacity" }} />
        {/* changeover cue dot — top-right, flashes right before the cut */}
        <div ref={cueRef} aria-hidden="true" style={{
          position: "absolute", top: 24, right: 26, width: 13, height: 13, borderRadius: "50%",
          background: "rgba(255,250,235,0.9)", boxShadow: "0 0 10px rgba(255,250,235,0.5)",
          filter: "blur(0.6px)", opacity: 0, transition: "opacity .12s linear",
        }} />

        {/* programme HUD — acts, vertical-centered on the left edge, desktop only */}
        <div className="hidden md:flex" style={{
          position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)",
          flexDirection: "column", gap: 10,
        }}>
          {acts.map((a, i) => (
            <button key={a.act} onClick={() => jumpTo(a.firstIdx)}
              className="text-left"
              style={{ background: "none", border: "none", cursor: "pointer", pointerEvents: "auto", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", padding: 0 }}
              aria-label={`跳到 ACT ${a.act} ${a.label}`}>
              <span style={{
                width: i === activeAct ? 18 : 5, height: 2, borderRadius: 1,
                background: i === activeAct ? "rgba(255,225,140,0.9)" : "rgba(255,255,255,0.22)",
                transition: "all .4s cubic-bezier(.16,1,.3,1)",
              }} />
              <span className="font-mono-label" style={{
                fontSize: 8, letterSpacing: "0.26em",
                color: i === activeAct ? "rgba(255,225,140,0.9)" : "rgba(255,255,255,0.28)",
                transition: "color .3s",
              }}>
                {a.act} {i === activeAct ? `· ${a.label}` : ""}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
