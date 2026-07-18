"use client";

/**
 * 台灣機車環島 Roadbook — 前端互動層
 * 資料由 server 端傳入（已過濾：僅公開、無取消）；此檔不接觸任何 token
 * 互動：Day 切換、重新整理、Checklist（localStorage）、台灣 SVG 地圖（無外部依賴）
 */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { RoadbookData, RoadbookStop } from "@/lib/roadbook";

const STATUS_META: Record<string, { label: string; cls: string }> = {
  "已確定": { label: "已確定", cls: "ok" },
  "候選":   { label: "候選",   cls: "maybe" },
  "備案":   { label: "PLAN B", cls: "planb" },
  "已抵達": { label: "已抵達", cls: "here" },
  "已完成": { label: "已完成", cls: "done" },
};
const CAT_ICON: Record<string, string> = {
  "出發": "🏁", "早餐": "🥢", "午餐": "🍜", "住宿": "🛏", "景點": "📍",
  "晚上散步": "🌙", "加油": "⛽", "休息": "☕", "目前位置": "🛵",
};

function timeAgo(iso?: string): string {
  if (!iso) return "—";
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 1) return "剛剛";
  if (m < 60) return `${m} 分鐘前`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} 小時前`;
  return `${Math.floor(h / 24)} 天前`;
}

/* ── 台灣 SVG 地圖（簡化輪廓，等距投影，無外部依賴）── */
const TW = { latMin: 21.85, latMax: 25.35, lngMin: 119.95, lngMax: 122.05, w: 240, h: 400 };
function proj(lat: number, lng: number) {
  const x = ((lng - TW.lngMin) / (TW.lngMax - TW.lngMin)) * TW.w;
  const y = ((TW.latMax - lat) / (TW.latMax - TW.latMin)) * TW.h;
  return { x, y };
}
const TAIWAN_PATH =
  "M118 8 L138 14 L150 30 L160 52 L170 78 L180 110 L186 140 L188 172 L184 205 L176 238 L166 268 L152 298 L136 326 L118 352 L102 374 L88 388 L74 392 L62 380 L54 358 L48 330 L44 300 L42 268 L44 236 L48 204 L54 172 L62 140 L72 110 L84 80 L96 50 L106 26 Z";

function TaiwanMap({ stops }: { stops: RoadbookStop[] }) {
  const pts = stops.filter(s => s.lat != null && s.lng != null);
  return (
    <div className="rb-map">
      <svg viewBox={`0 0 ${TW.w} ${TW.h}`} className="rb-map-svg" role="img" aria-label="台灣環島路線圖">
        <path d={TAIWAN_PATH} className="rb-map-island" />
        {pts.map(s => {
          const { x, y } = proj(s.lat as number, s.lng as number);
          const cls =
            s.status === "已完成" ? "rb-dot-done" :
            s.status === "已抵達" || s.isCurrent ? "rb-dot-here" :
            s.status === "候選" ? "rb-dot-maybe" :
            s.status === "備案" ? "rb-dot-planb" : "rb-dot-ok";
          return (
            <g key={s.id}>
              <circle cx={x} cy={y} r={s.isCurrent ? 6 : 4} className={cls} />
              <text x={x + 8} y={y + 3} className="rb-map-lbl">{s.name}</text>
            </g>
          );
        })}
      </svg>
      {pts.length === 0 && (
        <p className="rb-map-empty">路線標記會在座標補上後出現在島上 — 行程照常在上面的清單裡</p>
      )}
    </div>
  );
}

/* ── Checklist（localStorage，只存在這台裝置）── */
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
      <p className="rb-cl-title">{title}</p>
      {items.map(i => {
        const k = `${prefix}:${i}`;
        return (
          <button key={k} className="rb-cl-item" data-on={!!checked[k]} onClick={() => toggle(k)}>
            <span className="rb-cl-box" aria-hidden>{checked[k] ? "✓" : ""}</span>
            <span className="rb-cl-txt">{i}</span>
          </button>
        );
      })}
    </div>
  );
  return (
    <div className="rb-cl">
      {group("行前一次", PRE_TRIP, "pre")}
      {group("每天出發前", DAILY, "day")}
      <p className="rb-cl-note">勾選狀態只存在你這台裝置，不會上傳</p>
    </div>
  );
}

function RefreshButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      className="rb-refresh"
      disabled={busy}
      onClick={() => { setBusy(true); router.refresh(); setTimeout(() => setBusy(false), 1500); }}
    >
      {busy ? "更新中…" : "↻ 重新整理行程"}
    </button>
  );
}

/* ── 主畫面 ── */
export default function RoadbookView({ data }: { data: RoadbookData }) {
  const [day, setDay] = useState(data.currentDay);
  const dayStops = useMemo(() => data.stops.filter(s => s.day === day), [data.stops, day]);
  const planB = dayStops.filter(s => s.status === "備案");
  const main = dayStops.filter(s => s.status !== "備案");
  const segments = dayStops.filter(s => s.segmentNavUrl);
  const cities = useMemo(() => {
    const seen: string[] = [];
    dayStops.forEach(s => {
      const c = (s.address ?? "").slice(0, 3);
      if (c && !seen.includes(c)) seen.push(c);
    });
    return seen.join(" → ");
  }, [dayStops]);

  if (!data.ok) {
    return (
      <div className="rb-error">
        <p className="rb-error-t">行程資料暫時連不上</p>
        <p className="rb-error-s">
          Roadbook 的資料住在 Notion，現在讀取不到 —
          可能是還沒完成連接設定，或 Notion 暫時沒回應，
          稍後重新整理就好，網站其他頁面都正常
        </p>
        <RefreshButton />
      </div>
    );
  }

  return (
    <>
      {/* Hero 資訊 */}
      <div className="rb-hero">
        <div className="rb-hero-day">
          <span className="rb-hero-daynum">{data.currentDay.toUpperCase()}</span>
          {cities && day === data.currentDay && <span className="rb-hero-route">{cities}</span>}
        </div>
        <div className="rb-hero-stats">
          <span className="rb-stat"><b>7</b> DAYS / <b>6</b> NIGHTS・COUNTERCLOCKWISE</span>
          {data.currentStop && <span className="rb-stat rb-stat-now">🛵 目前：{data.currentStop.name}</span>}
          <span className="rb-stat">已走過 {data.completedCount} / {data.totalPlanned} 站</span>
          <span className="rb-stat">最後更新：{timeAgo(data.lastUpdated)}</span>
        </div>
        <RefreshButton />
      </div>

      {/* Day 切換 */}
      <div className="rb-days" role="tablist" aria-label="選擇天數">
        {data.days.map(d => (
          <button key={d} role="tab" aria-selected={d === day} className="rb-day-tab"
            data-active={d === day} data-current={d === data.currentDay}
            onClick={() => setDay(d)}>
            {d}{d === data.currentDay && <span className="rb-day-dot" aria-hidden />}
          </button>
        ))}
      </div>

      {/* 今日時間軸 */}
      <div className="rb-tl">
        {main.length === 0 && <p className="rb-empty">這一天還沒有公開行程</p>}
        {main.map(s => {
          const st = STATUS_META[s.status] ?? STATUS_META["已確定"];
          return (
            <div key={s.id} className="rb-stop" data-status={st.cls} data-current={s.isCurrent}>
              <div className="rb-stop-rail" aria-hidden>
                <span className="rb-stop-dot" />
              </div>
              <div className="rb-stop-body">
                <div className="rb-stop-head">
                  <span className="rb-stop-time">{s.time ?? "—"}</span>
                  <span className="rb-stop-cat">{CAT_ICON[s.category] ?? "📍"} {s.category}</span>
                  <span className={`rb-badge rb-badge-${st.cls}`}>{st.label}</span>
                  {s.isCurrent && <span className="rb-badge rb-badge-now">目前位置</span>}
                </div>
                <p className="rb-stop-name">{s.name}</p>
                {s.address && s.category !== "住宿" && <p className="rb-stop-addr">{s.address}</p>}
                {s.note && <p className="rb-stop-note">{s.note}</p>}
                {s.mapsUrl && (
                  <a href={s.mapsUrl} target="_blank" rel="noopener noreferrer" className="rb-stop-map">
                    Google Maps ↗
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 分段導航（只在 Notion 有整段導航網址時出現） */}
      {segments.length > 0 && (
        <div className="rb-seg">
          <p className="rb-sec-t">分段導航</p>
          {segments.map(s => (
            <a key={s.id} href={s.segmentNavUrl} target="_blank" rel="noopener noreferrer" className="rb-seg-btn">
              🧭 {s.name} 段導航 ↗
            </a>
          ))}
        </div>
      )}

      {/* Plan B */}
      {planB.length > 0 && (
        <div className="rb-planb">
          <p className="rb-sec-t">PLAN B — 備案</p>
          <p className="rb-planb-hint">下雨、公休、排隊太久、時間或體力不足時啟用</p>
          {planB.map(s => (
            <div key={s.id} className="rb-planb-item">
              <span className="rb-badge rb-badge-planb">PLAN B</span>
              <span className="rb-planb-name">{s.name}</span>
              {s.note && <span className="rb-planb-note">{s.note}</span>}
              {s.mapsUrl && (
                <a href={s.mapsUrl} target="_blank" rel="noopener noreferrer" className="rb-stop-map">Maps ↗</a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 台灣地圖 */}
      <div className="rb-sec">
        <p className="rb-sec-t">環島地圖</p>
        <TaiwanMap stops={data.stops} />
      </div>

      {/* 拍攝計畫（第一階段靜態） */}
      <div className="rb-sec">
        <p className="rb-sec-t">拍攝裝備</p>
        <div className="rb-gear">
          {["Fujifilm X-Pro2", "DJI Pocket 3", "DJI Neo", "Manfrotto 腳架"].map(g => (
            <span key={g} className="rb-gear-item">{g}</span>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="rb-sec">
        <p className="rb-sec-t">Checklist</p>
        <Checklist />
      </div>
    </>
  );
}
