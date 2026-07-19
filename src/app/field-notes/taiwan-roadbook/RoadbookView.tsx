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
import { Odometer, CheerButton, FilmLog, JourneyProgress } from "./TripExtras";

const cityOf = (s: RoadbookStop) => {
  const k = cityKeyOf(s.name, s.address);
  return k ? CITY_EN[k] : undefined;
};
const cityZhOf = (s: RoadbookStop) => cityKeyOf(s.name, s.address)?.replace("臺", "台");

function timeAgo(iso?: string): string {
  if (!iso) return "—";
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 1) return "剛剛";
  if (m < 60) return `${m} 分鐘前`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} 小時前`;
  return `${Math.floor(h / 24)} 天前`;
}

const dayNum = (d: string) => (d.match(/\d+/)?.[0] ?? "1").padStart(2, "0");

/* ── 當日文字路線 ── */
function TextRoute({ cities }: { cities: string[] }) {
  if (cities.length === 0) return null;
  return (
    <section className="rb-sec">
      <p className="rb-label">今日路線</p>
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
      <summary className="rb-cl-summary">出發前檢查 <span aria-hidden>+</span></summary>
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
      {busy ? "更新中…" : "更新 ↻"}
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
        景點情報{story.rating ? ` · ${story.rating}` : ""} <span aria-hidden>+</span>
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
type View = "trip" | "map" | "log" | "talk";

export interface WeatherInfo { temp: number; code: number; cityZh: string }

const wLabel = (c: number) => {
  if (c === 0) return "晴 ☀️";
  if (c <= 2) return "多雲時晴 ⛅";
  if (c === 3) return "陰 ☁️";
  if (c === 45 || c === 48) return "起霧 🌫";
  if (c <= 57) return "毛毛雨 🌦";
  if (c <= 67) return "下雨 🌧";
  if (c <= 82) return "陣雨 🌧";
  if (c >= 95) return "雷雨 ⛈";
  return "";
};

const TRIP_START = new Date("2026-07-19T00:00:00+08:00");
const dayDate = (d: string) => {
  const n = Number(d.match(/\d+/)?.[0] ?? 1);
  const t = new Date(TRIP_START.getTime() + (n - 1) * 86400000);
  const wd = ["日", "一", "二", "三", "四", "五", "六"][t.getDay()];
  return `${String(t.getMonth() + 1).padStart(2, "0")}.${String(t.getDate()).padStart(2, "0")}（${wd}）`;
};

export default function RoadbookView({ data, weather }: { data: RoadbookData; weather?: WeatherInfo | null }) {
  const [day, setDay] = useState(data.currentDay);
  const [view, setView] = useState<View>("trip");
  const [activeIdx, setActiveIdx] = useState(0);
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
    setActiveIdx(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const nextStop = useMemo(() =>
    data.stops.filter(s => s.day === data.currentDay && s.status !== "備案")
      .find(s => !(s.status === "已完成" || s.status === "已抵達")),
  [data.stops, data.currentDay]);

  /* 章節同步：滑到哪一站，地圖鏡頭跟到哪 */
  useEffect(() => {
    if (view !== "trip") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rb-stop[data-idx]"));
    if (els.length === 0) return;
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) setActiveIdx(Number((e.target as HTMLElement).dataset.idx));
      });
    }, { rootMargin: "-40% 0px -45% 0px", threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [view, day, main.length]);

  if (!data.ok) {
    return (
      <div className="rb-err">
        <p className="rb-label">連線中斷</p>
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
      {/* 頂部狀態膠囊 */}
      <div className="rb-toppill rb-glass">
        <span className="rb-livedot" aria-hidden />
        <span className="rb-toppill-day">DAY {dayNum(day)}</span>
        <span className="rb-toppill-route">{cities.map(c2 => {
          const zh = Object.entries(CITY_EN).find(([, en]) => en === c2)?.[0]?.replace("臺", "台") ?? c2;
          return zh;
        }).join(" → ")}</span>
      </div>

      {/* ── 首屏 ── */}
      <section className="rb-hero">
        <p className="rb-hero-label">TAIWAN ROADBOOK</p>
        <p className="rb-hero-day">DAY {dayNum(day)}</p>
        <h2 className="rb-brand">
          <span className="rb-brand-zh">台灣機車環島</span>
          <span className="rb-brand-en">Roadbook</span>
        </h2>
        {cities.length > 0 && <p className="rb-hero-route">{cities.join("  →  ")}</p>}
        <div className="rb-hero-title">
          <span className="rb-hero-zh">七天六夜，用兩顆輪子繞台灣一圈
            <em className="rb-en-sm">Seven days around Taiwan on two wheels</em>
          </span>
          <span className="rb-hero-date">{dayDate(day)}</span>
        </div>
        <p className="rb-script" aria-hidden>Ride Taiwan</p>
        <div className="rb-hero-bar rb-glass">
          {data.currentStop && (
            <div className="rb-bar-cell">
              <span className="rb-bar-k">目前位置 <em>NOW</em></span>
              <span className="rb-bar-v rb-bar-now">{coarse(data.currentStop.name)}</span>
            </div>
          )}
          {nextStop && (
            <div className="rb-bar-cell">
              <span className="rb-bar-k">下一站 <em>NEXT</em></span>
              <span className="rb-bar-v rb-bar-next">{coarse(nextStop.name)}</span>
            </div>
          )}
          {weather && (
            <div className="rb-bar-cell">
              <span className="rb-bar-k">{weather.cityZh}天氣 <em>WEATHER</em></span>
              <span className="rb-bar-v">{weather.temp}° {wLabel(weather.code)}</span>
            </div>
          )}
          <div className="rb-bar-cell">
            <span className="rb-bar-k">最後更新 <em>UPDATED</em></span>
            <span className="rb-bar-v">{timeAgo(data.lastUpdated)}</span>
          </div>
          <SyncButton />
        </div>
        <div className="rb-cta-row">
          {nextStop?.mapsUrl && (
            <a href={nextStop.mapsUrl} target="_blank" rel="noopener noreferrer" className="rb-navcard rb-glass">
              <span className="rb-navcard-ico" aria-hidden>
                <svg viewBox="0 0 24 24" width="21" height="21"><path d="M3 11.5 21 3l-8.5 18-2.2-7.3L3 11.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>
              </span>
              <span className="rb-navcard-txt">
                <span className="rb-navcard-k">導航到下一站 <em>NAVIGATE TO NEXT STOP</em></span>
                <span className="rb-navcard-name">{coarse(nextStop.name)}
                  {cityOf(nextStop) && <em>{cityOf(nextStop)}</em>}
                </span>
              </span>
              <span className="rb-navcard-go" aria-hidden>→</span>
            </a>
          )}
          <button className="rb-cta-sub rb-glass" onClick={() => {
            document.querySelector(".rb-story")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            展開今天行程 <em className="rb-en-sm">VIEW TODAY</em>
          </button>
        </div>
      </section>

      {/* ── 旅程累積：每天完成後往前推進 ── */}
      <JourneyProgress currentDay={data.currentDay} stopsDone={data.completedCount} />

      {/* ── 分頁切換（玻璃 segmented control）── */}
      <nav className="rb-views rb-glass" role="tablist" aria-label="頁面切換">
        {([["trip", "行程"], ["map", "地圖"], ["log", "紀錄"], ["talk", "留言"]] as [View, string][]).map(([v, label]) => (
          <button key={v} role="tab" aria-selected={view === v} className="rb-view-tab"
            data-active={view === v} onClick={() => setView(v)}>
            {label}
          </button>
        ))}
      </nav>

      {view === "trip" && (
        <div className="rb-story">
          {/* 地圖舞台：桌機右側 sticky、手機上方固定 */}
          <div className="rb-mapwrap">
            <RideMap stops={data.stops} activeDay={day} activeId={main[activeIdx]?.id}
              night={(() => {
                const a = main[activeIdx];
                if (!a) return false;
                const h = Number(a.time?.match(/^(\d{1,2})/)?.[1] ?? NaN);
                return (!Number.isNaN(h) && h >= 18) || a.category === "晚上散步" || a.category === "晚餐";
              })()} />
          </div>

          <div className="rb-chapters">
          <DayRail days={data.days} day={day} currentDay={data.currentDay} onPick={flipDay} />

          {/* ── 當日行程（章節）── */}
          <section className="rb-tl" key={day}>
            {main.length === 0 && <p className="rb-tl-empty">這一天還沒有公開行程</p>}
            {main.map((s, i) => {
              const done = !s.isCurrent && (s.status === "已完成" || s.status === "已抵達");
              const en = [cityOf(s), CAT_EN[s.category]].filter(Boolean).join(" · ");
              const narration = storyFor(s.name)?.why;
              return (
                <article key={s.id} className="rb-stop" data-idx={i} data-active={i === activeIdx}
                  data-done={done} data-maybe={s.status === "候選"} data-current={s.isCurrent}>
                  <div className="rb-stop-time">{s.time ?? ""}</div>
                  <div className="rb-stop-rail" aria-hidden>
                    <span className="rb-stop-node" />
                    {i < main.length - 1 && <span className="rb-stop-line" />}
                  </div>
                  <div className="rb-stop-body">
                    <p className="rb-scene-slug">
                      {done && <span className="rb-scene-tick" aria-hidden>✓ </span>}
                      SCENE {String(i + 1).padStart(2, "0")}
                    </p>
                    <div className="rb-stop-card rb-glass">
                      {(() => { const img = imageFor(s.name); return img ? (
                        <div className="rb-stop-photo">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.src} alt={coarse(s.name)} loading="lazy" />
                          {img.isPlaceholder && <span className="rb-stop-photo-tag">示意圖</span>}
                        </div>
                      ) : null; })()}
                      <div className="rb-stop-info">
                        <p className="rb-stop-cat">{s.category}
                          {CAT_EN[s.category] && <em>{CAT_EN[s.category]}</em>}
                          {s.isCurrent && <span className="rb-stop-here">● 在這裡</span>}
                          {s.status === "候選" && <span className="rb-stop-tent">候選中</span>}
                        </p>
                        <h3 className="rb-stop-name">{coarse(s.name)}</h3>
                        {cityZhOf(s) && (
                          <p className="rb-stop-city">{cityZhOf(s)}
                            {cityOf(s) && <em>{cityOf(s)}</em>}
                          </p>
                        )}
                        {done && (
                          <p className="rb-stop-done">
                            <span aria-hidden>✓</span> COMPLETED{s.time ? ` · ${s.time}` : ""}
                          </p>
                        )}
                      </div>
                      {s.mapsUrl && (
                        <a href={s.mapsUrl} target="_blank" rel="noopener noreferrer"
                          className="rb-stop-pin" aria-label={`${coarse(s.name)} 打開地圖`}>
                          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 21c-4-4.5-6.5-7.7-6.5-10.7a6.5 6.5 0 1 1 13 0C18.5 13.3 16 16.5 12 21Z" fill="none" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>
                        </a>
                      )}
                    </div>
                    {i === activeIdx && narration && (
                      <p className="rb-scene-line" key={"n" + s.id}>「{narration}」</p>
                    )}
                    {s.note && <p className="rb-stop-note">{coarse(s.note)}</p>}
                    <FieldIntel stop={s} />
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
                        [ 打開地圖 ]
                      </a>
                    )}
                  </div>
                ))}
              </aside>
            )}
          </section>

          {segments.length > 0 && (
            <section className="rb-sec">
              <p className="rb-label">分段導航</p>
              {segments.map(s => (
                <a key={s.id} href={s.segmentNavUrl} target="_blank" rel="noopener noreferrer" className="rb-navlink">
                  {coarse(s.name)} 段導航 →
                </a>
              ))}
            </section>
          )}

          <TextRoute cities={cities} />

          {/* 收尾 quote */}
          <div className="rb-quote rb-glass">
            <span className="rb-quote-mark" aria-hidden>“</span>
            <p className="rb-quote-txt">最好的回憶，都在路上
              <em className="rb-en-sm">The best memories are made on the road</em>
            </p>
          </div>

          {/* ── 翻頁：上一天／下一天 ── */}
          <nav className="rb-pager">
            <button className="rb-page-btn rb-glass" disabled={!prevDay} onClick={() => flipDay(prevDay)}>
              ← {prevDay ? `DAY ${dayNum(prevDay)}` : "起點"}
            </button>
            <button className="rb-page-btn rb-glass" disabled={!nextDay} onClick={() => flipDay(nextDay)}>
              {nextDay ? `DAY ${dayNum(nextDay)}` : "終點"} →
            </button>
          </nav>
          </div>
        </div>
      )}

      {view === "map" && (
        <>
          <DayRail days={data.days} day={day} currentDay={data.currentDay} onPick={flipDay} />
          <div className="rb-fullmap">
            <RideMap stops={data.stops} activeDay={day} mode="full" onPick={id => {
              const i = main.findIndex(s2 => s2.id === id);
              setView("trip");
              if (i >= 0) {
                setActiveIdx(i);
                setTimeout(() => {
                  document.querySelector(`.rb-stop[data-idx="${i}"]`)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 80);
              }
            }} />
          </div>
          <p className="rb-fullmap-hint">當日所有公開站點總覽・點任一站直接跳到那個章節</p>
        </>
      )}

      {view === "log" && (
        <>
          <section className="rb-sec"><Odometer /></section>
          <section className="rb-sec">
            <p className="rb-label">每日現場</p>
            <FilmLog />
          </section>
          <section className="rb-sec">
            <p className="rb-label">拍攝裝備</p>
            <div className="rb-credit rb-glass">
              <div className="rb-credit-txt">
                <span className="rb-credit-k">主力相機</span>
                <span className="rb-credit-v">INSTA360 ACE PRO 2</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={EQUIP_IMAGES.main.src} alt="Insta360 Ace Pro 2" loading="lazy" className="rb-credit-img" />
            </div>
            <div className="rb-credit rb-glass">
              <div className="rb-credit-txt">
                <span className="rb-credit-k">隨行裝備</span>
                <span className="rb-credit-v">DJI OSMO 360 / DJI NEO 2</span>
              </div>
            </div>
            <div className="rb-credit rb-glass">
              <div className="rb-credit-txt">
                <span className="rb-credit-k">腳架</span>
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
            <p className="rb-label">各地留言</p>
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
