"use client";

/**
 * 台灣機車環島 Roadbook — 前端視覺層（call sheet / 公路電影 editorial）
 * 資料由 server 端傳入（已過濾：僅公開、無取消）；此檔不接觸任何 token
 * 視覺規範：#050505 底、#F2F0EA 主文字、#E3C66B accent、#88C999 目前位置、#C98752 Plan B
 */

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { RoadbookData, RoadbookStop } from "@/lib/roadbook";

/* ── 中文城市 → 英文路牌字 ── */
const CITY_EN: Record<string, string> = {
  "台中": "TAICHUNG", "臺中": "TAICHUNG",
  "彰化": "CHANGHUA", "雲林": "YUNLIN", "嘉義": "CHIAYI",
  "台南": "TAINAN", "臺南": "TAINAN",
  "高雄": "KAOHSIUNG", "屏東": "PINGTUNG",
  "台東": "TAITUNG", "臺東": "TAITUNG",
  "花蓮": "HUALIEN", "宜蘭": "YILAN",
  "台北": "TAIPEI", "臺北": "TAIPEI", "新北": "NEW TAIPEI",
  "基隆": "KEELUNG", "桃園": "TAOYUAN", "新竹": "HSINCHU",
  "苗栗": "MIAOLI", "南投": "NANTOU",
};
const CAT_EN: Record<string, string> = {
  "出發": "DEPART", "早餐": "BREAKFAST", "午餐": "LUNCH", "晚餐": "DINNER",
  "住宿": "STAY", "景點": "SPOT", "晚上散步": "NIGHT WALK",
  "加油": "FUEL", "休息": "REST", "目前位置": "NOW",
};

function cityOf(s: RoadbookStop): string | undefined {
  const src = `${s.address ?? ""}${s.name}`;
  for (const zh of Object.keys(CITY_EN)) if (src.includes(zh)) return CITY_EN[zh];
  return undefined;
}

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

/* ── 極簡台灣地圖：只在有座標時出現；細灰輪廓＋暖黃路線＋綠色呼吸點 ── */
const TW = { latMin: 21.85, latMax: 25.35, lngMin: 119.95, lngMax: 122.05, w: 240, h: 400 };
const proj = (lat: number, lng: number) => ({
  x: ((lng - TW.lngMin) / (TW.lngMax - TW.lngMin)) * TW.w,
  y: ((TW.latMax - lat) / (TW.latMax - TW.latMin)) * TW.h,
});
const TAIWAN_PATH =
  "M118 8 L138 14 L150 30 L160 52 L170 78 L180 110 L186 140 L188 172 L184 205 L176 238 L166 268 L152 298 L136 326 L118 352 L102 374 L88 388 L74 392 L62 380 L54 358 L48 330 L44 300 L42 268 L44 236 L48 204 L54 172 L62 140 L72 110 L84 80 L96 50 L106 26 Z";

function TaiwanMap({ stops }: { stops: RoadbookStop[] }) {
  const pts = stops
    .filter(s => s.lat != null && s.lng != null)
    .map(s => ({ s, ...proj(s.lat as number, s.lng as number) }));
  if (pts.length === 0) return null;
  const line = pts.map(p => `${p.x},${p.y}`).join(" ");
  return (
    <section className="rb-sec">
      <p className="rb-label">ROUTE MAP</p>
      <svg viewBox={`0 0 ${TW.w} ${TW.h}`} className="rb-map" role="img" aria-label="環島路線圖">
        <path d={TAIWAN_PATH} className="rb-map-island" />
        {pts.length > 1 && <polyline points={line} className="rb-map-line" />}
        {pts.map(({ s, x, y }) => (
          <circle
            key={s.id} cx={x} cy={y}
            r={s.isCurrent ? 4 : 2.5}
            className={s.isCurrent ? "rb-map-now" : "rb-map-pt"}
            data-done={s.status === "已完成" || s.status === "已抵達"}
          />
        ))}
      </svg>
    </section>
  );
}

/* ── 座標不足時的文字路線 ── */
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

/* ── 主畫面 ── */
export default function RoadbookView({ data }: { data: RoadbookData }) {
  const [day, setDay] = useState(data.currentDay);
  const dayStops = useMemo(() => data.stops.filter(s => s.day === day), [data.stops, day]);
  const main = dayStops.filter(s => s.status !== "備案");
  const planB = dayStops.filter(s => s.status === "備案");
  const segments = dayStops.filter(s => s.segmentNavUrl);
  const cities = useMemo(() => {
    const seen: string[] = [];
    dayStops.forEach(s => { const c = cityOf(s); if (c && !seen.includes(c)) seen.push(c); });
    return seen;
  }, [dayStops]);
  const hasCoords = data.stops.some(s => s.lat != null && s.lng != null);

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
      {/* ── 首屏：公路電影 opening title ── */}
      <section className="rb-hero">
        <p className="rb-hero-live"><span className="rb-livedot" aria-hidden /> LIVE FIELD NOTE</p>
        <p className="rb-hero-day">DAY {dayNum(data.currentDay)}</p>
        {cities.length > 0 && day === data.currentDay && (
          <p className="rb-hero-route">{cities.join("  →  ")}</p>
        )}
        <div className="rb-hero-title">
          <span className="rb-hero-zh">台灣機車環島</span>
          <span className="rb-hero-date">07.19 — 07.25</span>
        </div>
        <div className="rb-hero-bar">
          {data.currentStop && (
            <div className="rb-bar-cell">
              <span className="rb-bar-k">CURRENTLY</span>
              <span className="rb-bar-v rb-bar-now">{data.currentStop.name}</span>
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

      {/* ── Day 切換：數字＋細線 ── */}
      <nav className="rb-days" role="tablist" aria-label="選擇天數">
        {data.days.map(d => (
          <button
            key={d} role="tab" aria-selected={d === day}
            className="rb-daynum" data-active={d === day} data-current={d === data.currentDay}
            onClick={() => setDay(d)}
          >
            {dayNum(d)}
            {d === data.currentDay && <span className="rb-daynum-dot" aria-hidden />}
          </button>
        ))}
      </nav>

      {/* ── 今日行程：垂直路線（key=day 觸發淡入）── */}
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
                <h3 className="rb-stop-name">
                  {s.name}
                  {s.isCurrent && <span className="rb-stop-here">● HERE</span>}
                  {s.status === "候選" && <span className="rb-stop-tent">TENTATIVE</span>}
                </h3>
                {en && <p className="rb-stop-en">{en}</p>}
                {s.note && <p className="rb-stop-note">{s.note}</p>}
                {s.mapsUrl && (
                  <a href={s.mapsUrl} target="_blank" rel="noopener noreferrer" className="rb-maplink">
                    [ OPEN MAP ]
                  </a>
                )}
              </div>
            </article>
          );
        })}

        {/* Plan B — 雜誌旁註 */}
        {planB.length > 0 && (
          <aside className="rb-planb">
            {planB.map((s, i) => (
              <div key={s.id} className="rb-planb-item">
                <p className="rb-planb-k">PLAN B / {String(i + 1).padStart(2, "0")}</p>
                <p className="rb-planb-name">{s.name}</p>
                {s.note && <p className="rb-planb-note">{s.note}</p>}
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

      {/* 分段導航（只在 Notion 有整段導航網址時出現） */}
      {segments.length > 0 && (
        <section className="rb-sec">
          <p className="rb-label">NAVIGATION</p>
          {segments.map(s => (
            <a key={s.id} href={s.segmentNavUrl} target="_blank" rel="noopener noreferrer" className="rb-navlink">
              {s.name} 段導航 →
            </a>
          ))}
        </section>
      )}

      {/* 地圖：有座標才畫；沒有就用文字路線 */}
      {hasCoords ? <TaiwanMap stops={data.stops} /> : <TextRoute cities={cities} />}

      {/* 裝備 — editorial credits */}
      <section className="rb-sec">
        <p className="rb-label">EQUIPMENT</p>
        <div className="rb-credit">
          <span className="rb-credit-k">CAMERA</span>
          <span className="rb-credit-v">FUJIFILM X-PRO2 / DJI POCKET 3 / DJI NEO</span>
        </div>
        <div className="rb-credit">
          <span className="rb-credit-k">SUPPORT</span>
          <span className="rb-credit-v">MANFROTTO ELEMENT SL</span>
        </div>
      </section>

      <Checklist />
    </>
  );
}
