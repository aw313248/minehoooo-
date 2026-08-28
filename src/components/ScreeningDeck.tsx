"use client";

/**
 * ScreeningDeck — 「一場放映」：全螢幕疊卡放映系統
 *
 * 設計決策（2026-07 與 Oscar 問卷確認）：
 * - 卡片構圖：陳卓式滿版橫幅 — 劇照鋪滿、大片名在左下、資訊在右下
 * - 獎項：海報式置頂加冕（金色月桂，影展海報規格）
 * - 轉場：捲動驅動的鏡頭推近＋分層文字揭露，讓作品本身接管節奏
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

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const smooth = (v: number) => { v = clamp(v, 0, 1); return v * v * (3 - 2 * v); };

/* ─── One card ─── */
function Card({ card, index }: { card: DeckCard; index: number }) {
  const multi = card.works.length > 1;
  /* hover 2.5s → 靜音自動播放預覽（Oscar 點名保留的功能）*/
  const [previewId, setPreviewId] = useState<string | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startHover = (id: string) => { hoverTimer.current = setTimeout(() => setPreviewId(id), 2500); };
  const endHover = () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); setPreviewId(null); };
  const lead = card.works[0];
  const crowned = lead.awards && lead.awards.length > 0;

  return (
    <div className="sd-card" data-idx={index}
      style={{
        position: "sticky", top: 0, height: "100vh",
        overflow: "hidden", background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        zIndex: index + 1,
      }}>

      {/* backdrop(s) */}
      <div className="sd-media" style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: multi ? "column" : "row", gap: multi ? 2 : 0,
        transformOrigin: "50% 50%",
      }}>
        {card.works.map(w => (
          <a key={w.id} href={`https://www.youtube.com/watch?v=${w.id}`} target="_blank" rel="noopener noreferrer"
            className="group relative block"
            style={{ flex: 1, minWidth: 0, overflow: "hidden" }}
            onMouseEnter={() => startHover(w.id)}
            onMouseLeave={endHover}
            aria-label={`觀看 ${w.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://img.youtube.com/vi/${w.id}/maxresdefault.jpg`} alt={`${w.title} 劇照`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
              style={{ filter: multi ? "brightness(0.6) saturate(0.95)" : "brightness(0.46) saturate(0.92) contrast(1.04)" }}
              onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${w.id}/mqdefault.jpg`; }} />
            {previewId === w.id && (
              <iframe
                src={`https://www.youtube.com/embed/${w.id}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&start=5`}
                className="absolute"
                style={{ inset: "-12%", width: "124%", height: "124%", border: "none", pointerEvents: "none", filter: "brightness(0.75)" }}
                allow="autoplay; encrypted-media"
                title={`${w.title} 預覽`} />
            )}
            {/* per-panel caption in multi cards */}
            {multi && (
              <>
                {/* 右側黑漸層 — 讓描述可讀 */}
                <div aria-hidden="true" className="absolute inset-y-0 right-0 pointer-events-none" style={{ width: "52%", background: "linear-gradient(to left, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)" }} />
                <div className="sd-copy absolute left-4 md:left-8 bottom-3 md:bottom-4 right-4 md:right-8 z-[2] flex items-end justify-between gap-4" data-reveal="2">
                  <div>
                    <p className="text-[14px] md:text-[18px] font-medium leading-tight" style={{ color: "var(--text)", textShadow: "0 1px 10px rgba(0,0,0,0.7)" }}>{w.title}</p>
                    <p className="font-mono-label text-[8px] md:text-[9px] tracking-[0.2em] mt-1" style={{ color: "var(--white-soft)" }}>
                      {w.artist ? `${w.artist} · ` : ""}{w.role}{w.tools ? ` · ${w.tools}` : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0" style={{ maxWidth: "44%" }}>
                    {w.desc && <p className="hidden md:block text-[12px] leading-relaxed m-0" style={{ color: "var(--white-secondary)" }}>{w.desc}</p>}
                    {w.views && <p className="font-mono-label text-[9px] tracking-[0.16em] m-0 mt-1" style={{ color: "rgba(255,225,140,0.85)" }}>{w.views}</p>}
                  </div>
                </div>
              </>
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
      <div className="sd-copy absolute top-14 md:top-16 left-4 md:left-14 z-[3] pointer-events-none" data-reveal="0">
        <p className="font-mono-label text-[9px] tracking-[0.4em]" style={{ color: "var(--white-soft)" }}>
          ACT {card.act} — {card.actLabel}
        </p>
      </div>

      {/* laurel crown — top center (poster grammar) */}
      {crowned && (
        <div className="sd-copy absolute left-0 right-0 z-[3] flex justify-center gap-5 md:gap-9 flex-wrap px-4 pointer-events-none" data-reveal="1"
          style={{ top: "clamp(84px, 13vh, 130px)" }}>
          {lead.awards!.map(a => <Laurel key={a.title + a.org} title={a.title} org={a.org} />)}
        </div>
      )}

      {/* chip — top right */}
      {lead.chip && !multi && (
        <div className="sd-copy absolute top-14 md:top-16 right-4 md:right-14 z-[3] pointer-events-none" data-reveal="1">
          <span className="font-mono-label text-[8px] tracking-[0.26em] px-3 py-1.5"
            style={{ border: "1px solid rgba(143,180,255,0.35)", borderRadius: 999, color: "rgba(143,180,255,0.85)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
            {lead.chip}
          </span>
        </div>
      )}

      {/* title block — bottom left / info — bottom right (陳卓式滿版橫幅) */}
      {!multi ? (
        <div className="sd-copy absolute left-4 right-4 md:left-14 md:right-14 bottom-8 md:bottom-12 z-[3] flex flex-col md:flex-row md:items-end gap-4 md:gap-10 pointer-events-none" data-reveal="2">
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
        <div className="sd-copy absolute left-4 md:left-14 bottom-8 md:bottom-12 right-4 md:right-14 z-[3] pointer-events-none" data-reveal="2">
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
  const hudRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeAct, setActiveAct] = useState(0);
  const reduceMotion = useRef(false);

  /* act list for the programme HUD */
  const acts: { act: string; label: string; firstIdx: number }[] = [];
  cards.forEach((c, i) => {
    if (!acts.length || acts[acts.length - 1].act !== c.act) acts.push({ act: c.act, label: c.actLabel, firstIdx: i });
  });

  const renderScroll = useCallback(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const vh = window.innerHeight;
    const rect = deck.getBoundingClientRect();
    // progress through the deck: 0 at deck top hitting viewport top, +1 per viewport
    const t = clamp(-rect.top / vh, 0, cards.length - 1.0001);

    const els = deck.querySelectorAll<HTMLElement>(".sd-card");
    els.forEach((el, i) => {
      const nearby = Math.abs(i - t) <= 1.5;
      const media = el.querySelector<HTMLElement>(".sd-media");
      if (media) media.style.willChange = nearby && !reduceMotion.current ? "transform" : "auto";
      if (!nearby) return;

      const arrival = smooth(t - i + 1);
      const exit = smooth(t - i);
      const copy = el.querySelectorAll<HTMLElement>(".sd-copy");

      if (media) {
        media.style.transform = reduceMotion.current
          ? "none"
          : `translate3d(0, ${(1 - arrival) * 3}%, 0) scale(${0.9 + arrival * 0.1 + exit * 0.08})`;
      }

      copy.forEach(node => {
        const step = Number(node.dataset.reveal ?? 0);
        const delay = step * 0.1;
        const reveal = smooth((arrival - delay) / (1 - delay));
        node.style.opacity = String(reveal);
        node.style.transform = reduceMotion.current
          ? "none"
          : `translate3d(0, ${(1 - reveal) * 28}px, 0)`;
      });
    });

    if (hudRef.current) {
      hudRef.current.style.transform = `translate3d(0, ${clamp(-rect.top, 0, deck.offsetHeight - vh)}px, 0)`;
    }

    /* active act for HUD */
    const cur = Math.round(t);
    let a = 0;
    acts.forEach((ac, i) => { if (cur >= ac.firstIdx) a = i; });
    if (a !== activeAct) setActiveAct(a);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length, activeAct]);

  const onScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      renderScroll();
    });
  }, [renderScroll]);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      reduceMotion.current = motionPreference.matches;
      onScroll();
    };

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);
    return () => motionPreference.removeEventListener("change", syncMotionPreference);
  }, [onScroll]);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const scroller = deck.closest("[style*='overflow']") ?? window;
    scroller.addEventListener("scroll", onScroll as EventListener, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      scroller.removeEventListener("scroll", onScroll as EventListener);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  const jumpTo = (cardIdx: number) => {
    const deck = deckRef.current;
    if (!deck) return;
    const scroller = deck.closest("[style*='overflow']") as HTMLElement | null;
    if (!scroller) return;
    const top = deck.offsetTop + cardIdx * window.innerHeight;
    scroller.scrollTo({ top, behavior: reduceMotion.current ? "auto" : "smooth" });
  };

  return (
    <div ref={deckRef} style={{ position: "relative", height: `${cards.length * 100}vh` }}>
      {cards.map((c, i) => <Card key={c.works[0].id} card={c} index={i} />)}

      {/* pinned programme HUD — the work stays visually quiet while the copy reveals */}
      <div ref={hudRef} style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100vh", zIndex: 60, pointerEvents: "none", overflow: "hidden", willChange: "transform" }}>
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
                width: 18, height: 2, borderRadius: 1,
                background: i === activeAct ? "rgba(255,225,140,0.9)" : "rgba(255,255,255,0.22)",
                transform: `scaleX(${i === activeAct ? 1 : 0.28})`, transformOrigin: "right center",
                transition: "transform 250ms cubic-bezier(0.77,0,0.175,1), background-color 180ms cubic-bezier(0.23,1,0.32,1)",
              }} />
              <span className="font-mono-label" style={{
                fontSize: 8, letterSpacing: "0.26em",
                color: i === activeAct ? "rgba(255,225,140,0.9)" : "rgba(255,255,255,0.28)",
                transition: "color 180ms cubic-bezier(0.23,1,0.32,1)",
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
