"use client";

/**
 * 台灣機車環島 Roadbook — 里程表、加油鈕、每日影像日誌
 * Odometer：tabular-nums + rAF 緩動（進到畫面才跑）
 * Cheer：橘色愛心 + 8 顆粒子，計數存 Redis（/api/roadbook/cheer）
 */

import { useEffect, useRef, useState } from "react";
import { dailyLog, totalKm } from "./dailyLog";

/* ── 里程表 ── */
export function Odometer() {
  const target = totalKm();
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || ran.current) return;
      ran.current = true;
      const t0 = performance.now();
      const dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  const today = dailyLog[dailyLog.length - 1];
  return (
    <div className="rb-odo" ref={ref}>
      <p className="rb-label">DISTANCE RIDDEN</p>
      <p className="rb-odo-num">
        <span className="odometer">{val.toLocaleString()}</span>
        <span className="rb-odo-unit">KM</span>
      </p>
      <p className="rb-odo-sub">
        {today?.km == null
          ? `${today?.day.toUpperCase() ?? ""} 騎行中 — 今晚回報里程`
          : `${today.day.toUpperCase()} +${today.km} KM`}
      </p>
    </div>
  );
}

/* ── 加油鈕 ── */
export function CheerButton() {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [pop, setPop] = useState(false);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    fetch("/api/roadbook/cheer").then(r => r.json()).then(d => setCount(d.count ?? null)).catch(() => {});
    try { setLiked(localStorage.getItem("rb-cheered") === "1"); } catch {}
  }, []);

  const cheer = () => {
    setPop(true); setLiked(true); setBurst(b => b + 1);
    setTimeout(() => setPop(false), 320);
    try { localStorage.setItem("rb-cheered", "1"); } catch {}
    fetch("/api/roadbook/cheer", { method: "POST" })
      .then(r => r.json()).then(d => { if (typeof d.count === "number") setCount(d.count); })
      .catch(() => {});
  };

  return (
    <div className="rb-cheer">
      <p className="rb-label">SEND FUEL</p>
      <button className={`like-btn rb-cheer-btn${pop ? " pop" : ""}${liked ? " liked" : ""}`} onClick={cheer} aria-label="為這趟旅程加油">
        <span className="rb-cheer-heartwrap">
          <svg viewBox="0 0 24 24" className="heart" width="26" height="26">
            <path d="M12 21c-4.8-3.6-8-6.4-8-10a4.6 4.6 0 0 1 8-3.1A4.6 4.6 0 0 1 20 11c0 3.6-3.2 6.4-8 10Z"
              fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {burst > 0 && (
            <span className="rb-cheer-parts" key={burst} aria-hidden>
              {Array.from({ length: 8 }, (_, k) => {
                const a = (k / 8) * Math.PI * 2;
                return (
                  <span
                    key={k} className="particle"
                    style={{ "--tx": `${Math.cos(a) * 26}px`, "--ty": `${Math.sin(a) * 26}px` } as React.CSSProperties}
                  />
                );
              })}
            </span>
          )}
        </span>
        <span className="rb-cheer-txt">為這趟旅程加油</span>
        {count != null && <span className="rb-cheer-count odometer">{count.toLocaleString()}</span>}
      </button>
      <p className="rb-cheer-sub">每一下都看得到，晚上紮營時是我的油量</p>
    </div>
  );
}

/* ── 每日影像日誌 ── */
export function FilmLog() {
  const entries = [...dailyLog].reverse();
  return (
    <div className="rb-film">
      {entries.map(d => (
        <div key={d.day} className="rb-film-day">
          <div className="rb-film-head">
            <span className="rb-film-d">{d.day.toUpperCase()}</span>
            <span className="rb-film-date">{d.date}</span>
            {d.km != null && <span className="rb-film-km odometer">+{d.km} KM</span>}
          </div>
          {d.note && <p className="rb-film-note">{d.note}</p>}
          {d.photos.length > 0 ? (
            <div className="rb-film-strip">
              {d.photos.map(p => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p} src={p} alt={`${d.day} 現場照片`} loading="lazy" className="rb-film-ph" />
              ))}
            </div>
          ) : (
            <p className="rb-film-empty">拍攝中 — 今晚上片</p>
          )}
        </div>
      ))}
    </div>
  );
}
