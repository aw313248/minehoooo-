"use client";

/**
 * 台灣機車環島 Roadbook — 整頁背景地圖（跟隨選取的 Day）
 * 翻到哪一天，騎士就沿逆時針環島線騎到那天的最後一站（CSS transition 平滑移動）
 * 真台灣輪廓（OSM 195 點）；偽 3D 免 WebGL
 */

import { useEffect, useMemo, useState } from "react";
import type { RoadbookStop } from "@/lib/roadbook";
import { TW, proj, TAIWAN_PATH, RING, cityKeyOf, CITY_EN } from "./geo";
import { coarse } from "./geo";

function buildRing() {
  const pts = RING.map(([key, lat, lng]) => ({ key, ...proj(lat, lng) }));
  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++)
    cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  return { pts, cum, total: cum[cum.length - 1] };
}

function pointAt(ring: ReturnType<typeof buildRing>, d: number) {
  const { pts, cum, total } = ring;
  const t = Math.max(0, Math.min(d, total));
  let i = 1;
  while (i < cum.length - 1 && cum[i] < t) i++;
  const seg = cum[i] - cum[i - 1] || 1;
  const f = (t - cum[i - 1]) / seg;
  return {
    x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f,
    y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f,
  };
}

const dayN = (d: string) => Number(d.match(/\d+/)?.[0] ?? 99);

export default function RideMap({ stops, activeDay }: { stops: RoadbookStop[]; activeDay: string }) {
  const ring = useMemo(buildRing, []);
  const cityDist = useMemo(() => {
    const m: Record<string, number> = {};
    ring.pts.forEach((p, i) => { if (p.key && m[p.key] === undefined) m[p.key] = ring.cum[i]; });
    return m;
  }, [ring]);

  const waypoints = useMemo(() => {
    const w: { stop: RoadbookStop; dist: number }[] = [];
    stops.forEach(s => {
      const key = cityKeyOf(s.name, s.address);
      if (key && cityDist[key] !== undefined) w.push({ stop: s, dist: cityDist[key] });
    });
    return w;
  }, [stops, cityDist]);

  const [on, setOn] = useState(false);
  useEffect(() => { setOn(true); }, []);

  if (waypoints.length === 0) return null;

  /* 到選取日為止的所有站 */
  const upTo = waypoints.filter(w => dayN(w.stop.day) <= dayN(activeDay));
  const dayStops = waypoints.filter(w => w.stop.day === activeDay);
  const lastOfDay = dayStops.at(-1) ?? upTo.at(-1) ?? waypoints[0];
  const dNow = Math.max(0, ...upTo.map(w => w.dist), lastOfDay.dist);
  const rider = pointAt(ring, dNow);
  const nearCity = cityKeyOf(lastOfDay.stop.name, lastOfDay.stop.address);

  const trail: string[] = [];
  ring.pts.forEach((p, k) => { if (ring.cum[k] <= dNow) trail.push(`${p.x},${p.y}`); });
  trail.push(`${rider.x},${rider.y}`);

  return (
    <aside className="rb-bgmap" data-on={on} aria-hidden>
      <svg viewBox={`0 0 ${TW.w} ${TW.h}`} className="rb-bgmap-svg" preserveAspectRatio="xMidYMid meet">
        <path d={TAIWAN_PATH} className="rb-rm-island" />
        <polyline points={ring.pts.map(p => `${p.x},${p.y}`).join(" ")} className="rb-rm-route" />
        {trail.length > 1 && <polyline points={trail.join(" ")} className="rb-rm-trail" />}
        {waypoints.map((w, k) => {
          const p = pointAt(ring, w.dist);
          return (
            <circle
              key={w.stop.id + k} cx={p.x} cy={p.y} r={3}
              className="rb-rm-stop" data-lit={w.dist <= dNow + 0.5}
            />
          );
        })}
        {/* 當日站點名稱：直接標在島上（同城市併成一組，機車騎到就知道那裡有什麼） */}
        {(() => {
          const groups: Record<string, { x: number; y: number; names: string[]; lit: boolean }> = {};
          dayStops.forEach(w => {
            const key = cityKeyOf(w.stop.name, w.stop.address) ?? "?";
            const p = pointAt(ring, w.dist);
            const g = (groups[key] ??= { x: p.x, y: p.y, names: [], lit: false });
            if (g.names.length < 4) g.names.push(coarse(w.stop.name));
            if (w.dist <= dNow + 0.5) g.lit = true;
          });
          return Object.entries(groups).map(([key, g]) => {
            const west = g.x < TW.w * 0.55;
            const tx = west ? g.x + 9 : g.x - 9;
            return (
              <g key={key} textAnchor={west ? "start" : "end"}>
                <text x={tx} y={g.y - (g.names.length - 1) * 4 - 6} className="rb-rm-lblcity">
                  {CITY_EN[key] ?? ""}
                </text>
                {g.names.map((n, j) => (
                  <text key={n + j} x={tx} y={g.y - (g.names.length - 1) * 4 + j * 8 + 2}
                    className="rb-rm-lbl" data-lit={g.lit}>
                    {n}
                  </text>
                ))}
              </g>
            );
          });
        })()}
        {/* 騎士：翻頁時平滑騎到新位置 */}
        <g className="rb-rm-rider" style={{ transform: `translate(${rider.x}px, ${rider.y}px)` }}>
          <circle r={9} className="rb-rm-glow" />
          <g transform="translate(-7,-8) scale(0.62)">
            <circle cx="5" cy="16" r="3.4" className="rb-rm-line" />
            <circle cx="18" cy="16" r="3.4" className="rb-rm-line" />
            <path d="M5 16 L9 10 L15 10 L18 16 M9 10 L7 6 M15 10 L16.5 5.5" className="rb-rm-line" />
            <circle cx="11.5" cy="2.5" r="2.4" className="rb-rm-head" />
            <path d="M11.5 5 L10 9.5" className="rb-rm-line" />
          </g>
        </g>
      </svg>
      <div className="rb-bgmap-cap" data-on={on}>
        <span className="rb-bgmap-city">{nearCity ? CITY_EN[nearCity] : ""}</span>
        <span className="rb-bgmap-spot">{coarse(lastOfDay.stop.name)}</span>
      </div>
    </aside>
  );
}
