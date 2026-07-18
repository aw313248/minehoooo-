"use client";

/**
 * 台灣機車環島 Roadbook — 前端視覺層（一天一頁 · Apple glass）
 * 三個分頁：行程（每天一頁，翻頁換天）/ 旅程紀錄 / 留言板
 * 資料由 server 端傳入（已過濾：僅公開、無取消）；此檔不接觸任何 token
 * 顯示地名一律 coarse()：只到縣市，不出現區
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { RoadbookData, RoadbookStop } from "@/lib/roadbook";
import { CITY_EN, CAT_EN, cityKeyOf, coarse } from "./geo";
import { storyFor } from "./stories";
import { imageFor, EQUIP_IMAGES, photoCredits } from "./spotImages";
import RideMap from "./RideMap";
import RegionTalk from "./RegionTalk";
import { Odometer, CheerButton, FilmLog } from "./TripExtras";

const cityOf = (s: RoadbookStop) => {
  const k = cityKeyOf(s.name, s.address);
  return k ? CITY_EN[k] : undefined;
};

function timeAgo(iso?: string): string {
  if (!iso) return "—";
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 1) return "JUST NOW";
  if (m < 60) return `${m} MIN AGO`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} HR AGO`;
  return `${Math.floor(h / 24)} D AGO`;
}

const dayNum = (d: string) => (d.match(/\d+/)?.[0] ?? "1").padStart(2, "0");

/* ── 當日文字路線 ── */
function TextRoute({ cities }: { cities: string[] }) {
  if (cities.length === 0) return null;
  return (
    <section className="rb-sec">
      <p className="rb-label">ROUTE</p>
      <div className="rb-txtroute">
        {cities.map((c, i) => (
          <span key={c}>
            <span className="rb-txtroute-city">{c}</span>
            {i < cities.length - 1 && <span className="rb-txtroute-arr" aria-hidden>↓</span>}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ── Checklist：預設收合，localStorage 只存本機 ── */
const PRE_TRIP = ["機車保養與胎壓檢查", "行照駕照", "雨衣", "相機電池 ×3 充飽", "記憶卡清空", "行動電源", "防曬", "手機支架鎖緊"];
const DAILY = ["油量過半", "胎壓目視", "電池與記憶卡", "雨具在包內", "防曬補擦", "水"];

function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try { setChecked(JSON.parse(localStorage.getItem("rb-checklist") ?? "{}")); } catch {}
  }, []);
  const toggle = (k: string) =>
    setChecked(c => {
      const n = { ...c, [k]: !c[k] };
      localStorage.setItem("rb-checklist", JSON.stringify(n));
      return n;
    });
  const group = (title: string, items: string[], prefix: string) => (
    <div className="rb-cl-group">
      <p className="rb-cl-sub">{title}</p>
      {items.map(i => {
        const k = `${prefix}:${i}`;
        return (
          <button key={k} className="rb-cl-item" data-on={!!checked[k]} onClick={() => toggle(k)}>
            <span className="rb-cl-box" aria-hidden>{checked[k] ? "✕" : ""}</span>
            <span className="rb-cl-txt">{i}</span>
          </button>
        );
      })}
    </div>
  );
  return (
    <details className="rb-cl">
      <summary className="rb-cl-summary">PRE-RIDE CHECKLIST <span aria-hidden>+</span></summary>
      {group("行前一次", PRE_TRIP, "pre")}
      {group("每天出發前", DAILY, "day")}
      <p className="rb-cl-note">勾選只存在這台裝置，不會上傳</p>
    </details>
  );
}

function SyncButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      className="rb-sync"
      disabled={busy}
      onClick={() => { setBusy(true); router.refresh(); setTimeout(() => setBusy(false), 1500); }}
    >
      {busy ? "SYNCING…" : "SYNC ↻"}
    </button>
  );
}

/* ── Day 切換：玻璃膠囊滑塊 ── */
function DayRail({ days, day, currentDay, onPick }: {
  days: string[]; day: string; currentDay: string; onPick: (d: string) => void;
}) {
  const wrap = useRef<HTMLElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  useEffect(() => {
    const el = wrap.current?.querySelector<HTMLButtonElement>('[data-active="true"]');
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [day, days]);
  return (
    <nav className="rb-days rb-glass" role="tablist" aria-label="選擇天數" ref={wrap}>
      {days.map(d => (
        <button
          key={d} role="tab" aria-selected={d === day}
          className="rb-daynum" data-active={d === day} data-current={d === currentDay}
          onClick={() => onPick(d)}
        >
          {dayNum(d)}
          {d === currentDay && <span className="rb-daynum-dot" aria-hidden />}
        </button>
      ))}
      <span className="rb-daypill pill" style={{ left: pill.left, width: pill.width }} aria-hidden />
    </nav>
  );
}

/* ── FIELD INTEL：景點情報 ── */
function FieldIntel({ stop }: { stop: RoadbookStop }) {
  const story = storyFor(stop.name);
  if (!story) return null;
  return (
    <details className="rb-intel">
      <summary className="rb-intel-sum">
        FIELD INTEL{story.rating ? ` · ${story.rating}` : ""} <span aria-hidden>+</span>
      </summary>
      <div className="rb-intel-body">
        <p className="rb-intel-row"><span className="rb-intel-k">網路公評</span>{story.crowd}</p>
        <p className="rb-intel-row"><span className="rb-intel-k">為什麼去</span>{story.why}</p>
        <p className="rb-intel-row"><span className="rb-intel-k">特別之處</span>{story.special}</p>
        {story.srcUrl && (
          <a href={story.srcUrl} target="_blank" rel="noopener noreferrer" className="rb-intel-src">
            SOURCE · {story.srcLabel} ↗
          </a>
        )}
      </div>
    </details>
  );
}

/* ── 主畫面 ── */
type View = "trip" | "log" | "talk";

export default function RoadbookView({ data }: { data: RoadbookData }) {
  const [day, setDay] = useState(data.currentDay);
  const [view, setView] = useState<View>("trip");
  const dayStops = useMemo(() => data.stops.filter(s => s.day === day), [data.stops, day]);
  const main = dayStops.filter(s => s.status !== "備案");
  const planB = dayStops.filter(s => s.status === "備案");
  const segments = dayStops.filter(s => s.segmentNavUrl);
  const cities = useMemo(() => {
    const seen: string[] = [];
    dayStops.forEach(s => { const c = cityOf(s); if (c && !seen.includes(c)) seen.push(c); });
    return seen;
  }, [dayStops]);
  const regions = useMemo(() => {
    const seen: string[] = [];
    data.stops.forEach(s => {
      const k = cityKeyOf(s.name, s.address)?.replace("臺", "台");
      if (k && !seen.includes(k)) seen.push(k);
    });
    return seen;
  }, [data.stops]);
  const dayIdx = data.days.indexOf(day);
  const prevDay = data.days[dayIdx - 1];
  const nextDay = data.days[dayIdx + 1];
  const flipDay = (d?: string) => {
    if (!d) return;
    setDay(d);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!data.ok) {
    return (
      <div className="rb-err">
        <p className="rb-label">SIGNAL LOST</p>
        <p className="rb-err-t">行程資料暫時連不上</p>
        <p className="rb-err-s">
          Roadbook 的資料住在 Notion，現在讀取不到 —
          可能是還沒完成連接設定，或 Notion 暫時沒回應，
          稍後重新整理就好，網站其他頁面都正常
        </p>
        <SyncButton />
      </div>
    );
  }

  return (
    <>
      {/* 整頁背景地圖：跟著翻頁的那一天 */}
      <RideMap stops={data.stops} activeDay={day} />

      {/* ── 首屏（壓縮版 opening title，DAY = 目前翻到的那天）── */}
      <section className="rb-hero">
        <p className="rb-hero-live"><span className="rb-livedot" aria-hidden /> LIVE FIELD NOTE</p>
        <p className="rb-hero-day">DAY {dayNum(day)}</p>
        {cities.length > 0 && <p className="rb-hero-route">{cities.join("  →  ")}</p>}
        <div className="rb-hero-title">
          <span className="rb-hero-zh">台灣機車環島</span>
          <span className="rb-hero-date">07.19 — 07.25</span>
        </div>
        <div className="rb-hero-bar rb-glass">
          {data.currentStop && (
            <div className="rb-bar-cell">
              <span className="rb-bar-k">CURRENTLY</span>
              <span className="rb-bar-v rb-bar-now">{coarse(data.currentStop.name)}</span>
            </div>
          )}
          <div className="rb-bar-cell">
            <span className="rb-bar-k">LAST UPDATED</span>
            <span className="rb-bar-v">{timeAgo(data.lastUpdated)}</span>
          </div>
          <div className="rb-bar-cell">
            <span className="rb-bar-k">PROGRESS</span>
            <span className="rb-bar-v">{data.completedCount} / {data.totalPlanned}</span>
          </div>
          <SyncButton />
        </div>
      </section>

      {/* ── 分頁切換（玻璃 segmented control）── */}
      <nav className="rb-views rb-glass" role="tablist" aria-label="頁面切換">
        {([["trip", "行程"], ["log", "旅程紀錄"], ["talk", "留言板"]] as [View, string][]).map(([v, label]) => (
          <button key={v} role="tab" aria-selected={view === v} className="rb-view-tab"
            data-active={view === v} onClick={() => setView(v)}>
            {label}
          </button>
        ))}
      </nav>

      {view === "trip" && (
        <>
          <DayRail days={data.days} day={day} currentDay={data.currentDay} onPick={flipDay} />

          {/* ── 當日行程（一天一頁）── */}
          <section className="rb-tl" key={day}>
            {main.length === 0 && <p className="rb-tl-empty">這一天還沒有公開行程</p>}
            {main.map((s, i) => {
              const done = !s.isCurrent && (s.status === "已完成" || s.status === "已抵達");
              const en = [cityOf(s), CAT_EN[s.category]].filter(Boolean).join(" · ");
              return (
                <article key={s.id} className="rb-stop" data-done={done} data-maybe={s.status === "候選"} data-current={s.isCurrent}>
                  <div className="rb-stop-time">{s.time ?? ""}</div>
                  <div className="rb-stop-rail" aria-hidden>
                    <span className="rb-stop-node" />
                    {i < main.length - 1 && <span className="rb-stop-line" />}
                  </div>
                  <div className="rb-stop-body">
                    {(() => { const img = imageFor(s.name); return img ? (
                      <div className="rb-stop-photo">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.src} alt={coarse(s.name)} loading="lazy" />
                        <span className="rb-stop-photo-fade" aria-hidden />
                        {img.isPlaceholder && <span className="rb-stop-photo-tag">示意圖</span>}
                      </div>
                    ) : null; })()}
                    <h3 className="rb-stop-name">
                      {coarse(s.name)}
                      {s.isCurrent && <span className="rb-stop-here">● HERE</span>}
                      {s.status === "候選" && <span className="rb-stop-tent">TENTATIVE</span>}
                    </h3>
                    {en && <p className="rb-stop-en">{en}</p>}
                    {s.note && <p className="rb-stop-note">{coarse(s.note)}</p>}
                    <FieldIntel stop={s} />
                    {s.mapsUrl && (
                      <a href={s.mapsUrl} target="_blank" rel="noopener noreferrer" className="rb-maplink">
                        [ OPEN MAP ]
                      </a>
                    )}
                  </div>
                </article>
              );
            })}

            {planB.length > 0 && (
              <aside className="rb-planb">
                {planB.map((s, i) => (
                  <div key={s.id} className="rb-planb-item">
                    <p className="rb-planb-k">PLAN B / {String(i + 1).padStart(2, "0")}</p>
                    <p className="rb-planb-name">{coarse(s.name)}</p>
                    {s.note && <p className="rb-planb-note">{coarse(s.note)}</p>}
                    <FieldIntel stop={s} />
                    {s.mapsUrl && (
                      <a href={s.mapsUrl} target="_blank" rel="noopener noreferrer" className="rb-maplink">
                        [ OPEN MAP ]
                      </a>
                    )}
                  </div>
                ))}
              </aside>
            )}
          </section>

          {segments.length > 0 && (
            <section className="rb-sec">
              <p className="rb-label">NAVIGATION</p>
              {segments.map(s => (
                <a key={s.id} href={s.segmentNavUrl} target="_blank" rel="noopener noreferrer" className="rb-navlink">
                  {coarse(s.name)} 段導航 →
                </a>
              ))}
            </section>
          )}

          <TextRoute cities={cities} />

          {/* ── 翻頁：上一天／下一天 ── */}
          <nav className="rb-pager">
            <button className="rb-page-btn rb-glass" disabled={!prevDay} onClick={() => flipDay(prevDay)}>
              ← {prevDay ? `DAY ${dayNum(prevDay)}` : "起點"}
            </button>
            <button className="rb-page-btn rb-glass" disabled={!nextDay} onClick={() => flipDay(nextDay)}>
              {nextDay ? `DAY ${dayNum(nextDay)}` : "終點"} →
            </button>
          </nav>
        </>
      )}

      {view === "log" && (
        <>
          <section className="rb-sec"><Odometer /></section>
          <section className="rb-sec">
            <p className="rb-label">FILM LOG — 每日現場</p>
            <FilmLog />
          </section>
          <section className="rb-sec">
            <p className="rb-label">EQUIPMENT</p>
            <div className="rb-credit rb-glass">
              <div className="rb-credit-txt">
                <span className="rb-credit-k">MAIN CAMERA</span>
                <span className="rb-credit-v">INSTA360 ACE PRO 2</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={EQUIP_IMAGES.main.src} alt="Insta360 Ace Pro 2" loading="lazy" className="rb-credit-img" />
            </div>
            <div className="rb-credit rb-glass">
              <div className="rb-credit-txt">
                <span className="rb-credit-k">ALSO CARRYING</span>
                <span className="rb-credit-v">FUJIFILM X-PRO2 / DJI POCKET 3 / DJI NEO</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={EQUIP_IMAGES.camera.src} alt="Fujifilm X-Pro2" loading="lazy" className="rb-credit-img" />
            </div>
            <div className="rb-credit rb-glass">
              <div className="rb-credit-txt">
                <span className="rb-credit-k">SUPPORT</span>
                <span className="rb-credit-v">MANFROTTO ELEMENT SL</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={EQUIP_IMAGES.support.src} alt="Manfrotto 腳架" loading="lazy" className="rb-credit-img" />
            </div>
          </section>
          <Checklist />
          <p className="rb-photocredit">示意圖 · Wikimedia Commons — {photoCredits.join("；")}（Oscar 實拍上線後陸續替換）</p>
        </>
      )}

      {view === "talk" && (
        <>
          <section className="rb-sec">
            <p className="rb-label">ROAD TALK — 各地的人說話</p>
            <RegionTalk regions={regions} />
          </section>
          <section className="rb-sec">
            <CheerButton />
          </section>
        </>
      )}
    </>
  );
}
