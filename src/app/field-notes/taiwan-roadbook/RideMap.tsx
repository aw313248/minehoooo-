"use client";

/**
 * 台灣機車環島 Roadbook — 捲動跟隨小地圖
 * 頁面往下滑，騎士 icon 沿逆時針環島路線移動，經過的站點逐一亮起
 * 進度來源：整頁捲動（hero 結束 → 頁尾）對映到全部公開站點的順序
 * 偽 3D：CSS perspective 傾角，無 WebGL、無外部依賴
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { RoadbookStop } from "@/lib/roadbook";
import { TW, proj, TAIWAN_PATH, RING, cityKeyOf, CITY_EN } from "./geo";

/* 環島路線投影點 + 每個節點的累積距離 */
function buildRing() {
  const pts = RING.map(([key, lat, lng]) => ({ key, ...proj(lat, lng) }));
  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++)
    cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  return { pts, cum, total: cum[cum.length - 1] };
}

/* 距離 → 路線上的座標 */
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

export default function RideMap({ stops }: { stops: RoadbookStop[] }) {
  const ring = useMemo(buildRing, []);

  /* 城市 key → 路線累積距離（取該城市節點位置） */
  const cityDist = useMemo(() => {
    const m: Record<string, number> = {};
    ring.pts.forEach((p, i) => { if (p.key && m[p.key] === undefined) m[p.key] = ring.cum[i]; });
    return m;
  }, [ring]);

  /* 站點 → 路線距離（無法辨識城市的站點跳過，不會壞） */
  const waypoints = useMemo(() => {
    const w: { stop: RoadbookStop; dist: number }[] = [];
    stops.forEach(s => {
      const key = cityKeyOf(s.name, s.address);
      if (key && cityDist[key] !== undefined) w.push({ stop: s, dist: cityDist[key] });
    });
    return w;
  }, [stops, cityDist]);

  const [visible, setVisible] = useState(false);
  const [f, setF] = useState(0); // 0..1 旅程進度
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const tl = document.querySelector<HTMLElement>(".rb-days");
        if (!tl) return;
        const start = tl.offsetTop - window.innerHeight * 0.6;
        const end = document.documentElement.scrollHeight - window.innerHeight;
        const y = window.scrollY;
        setVisible(y > start * 0.55 && waypoints.length > 0);
        setF(end > start ? Math.max(0, Math.min(1, (y - start) / (end - start))) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, [waypoints.length]);

  if (waypoints.length === 0) return null;

  /* 進度 → 站點區間內插 */
  const n = waypoints.length;
  const pos = f * (n - 1);
  const i = Math.min(Math.floor(pos), n - 2 < 0 ? 0 : n - 2);
  const frac = n > 1 ? pos - i : 0;
  const dNow = n > 1
    ? waypoints[i].dist + (waypoints[i + 1].dist - waypoints[i].dist) * frac
    : waypoints[0].dist;
  const rider = pointAt(ring, dNow);
  const nearest = waypoints[Math.round(pos)] ?? waypoints[0];
  const nearCity = cityKeyOf(nearest.stop.name, nearest.stop.address);

  /* 已走過路段的 polyline 點集 */
  const trail: string[] = [];
  ring.pts.forEach((p, k) => { if (ring.cum[k] <= dNow) trail.push(`${p.x},${p.y}`); });
  trail.push(`${rider.x},${rider.y}`);

  return (
    <aside className="rb-ridemap" data-on={visible} aria-hidden>
      <div className="rb-ridemap-tilt">
        <svg viewBox={`0 0 ${TW.w} ${TW.h}`} className="rb-ridemap-svg">
          <path d={TAIWAN_PATH} className="rb-rm-island" />
          <polyline
            points={ring.pts.map(p => `${p.x},${p.y}`).join(" ")}
            className="rb-rm-route"
          />
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
          {/* 騎士：線條風機車＋騎士，車頭朝行進方向 */}
          <g transform={`translate(${rider.x}, ${rider.y})`} className="rb-rm-rider">
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
        <div className="rb-ridemap-cap">
          <span className="rb-ridemap-city">{nearCity ? CITY_EN[nearCity] : ""}</span>
          <span className="rb-ridemap-spot">{nearest.stop.name}</span>
        </div>
      </div>
    </aside>
  );
}
