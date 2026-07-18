"use client";

/**
 * 台灣機車環島 Roadbook — 地圖舞台（scroll-driven camera）
 * 滑到哪個章節（activeId），鏡頭就聚焦當日區域、猴子騎到那一站
 * 真台灣輪廓（OSM）；自繪 SVG，無付費地圖 API
 */

import { useMemo } from "react";
import type { RoadbookStop } from "@/lib/roadbook";
import { TW, proj, TAIWAN_PATH, RING, cityKeyOf, CITY_EN, coarse } from "./geo";

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

export default function RideMap({ stops, activeDay, activeId, mode = "journey" }: {
  stops: RoadbookStop[]; activeDay: string; activeId?: string; mode?: "journey" | "full";
}) {
  const ring = useMemo(buildRing, []);
  const cityDist = useMemo(() => {
    const m: Record<string, number> = {};
    ring.pts.forEach((p, i) => { if (p.key && m[p.key] === undefined) m[p.key] = ring.cum[i]; });
    return m;
  }, [ring]);

  const distOf = (s: RoadbookStop) => {
    const key = cityKeyOf(s.name, s.address);
    return key !== undefined && cityDist[key] !== undefined ? cityDist[key] : undefined;
  };

  const mainDay = stops.filter(s => s.day === activeDay && s.status !== "備案");
  const prevDist = Math.max(0, ...stops
    .filter(s => dayN(s.day) < dayN(activeDay))
    .map(s => distOf(s) ?? 0));

  /* 目前章節的站：往回找最近一個有座標城市的站 */
  let idx = activeId ? mainDay.findIndex(s => s.id === activeId) : 0;
  if (idx < 0) idx = 0;
  let dNow = prevDist;
  let focusStop: RoadbookStop | undefined;
  for (let i = idx; i >= 0; i--) {
    const d = mainDay[i] ? distOf(mainDay[i]) : undefined;
    if (d !== undefined) { dNow = Math.max(prevDist === 0 ? d : Math.max(d, prevDist === 0 ? 0 : 0), d); focusStop = mainDay[i]; break; }
  }
  if (!focusStop) focusStop = mainDay[0];
  dNow = Math.max(dNow, 0);
  const rider = pointAt(ring, dNow);

  /* 當日站點群（含備案弱化）＋鏡頭範圍 */
  const dayAll = stops.filter(s => s.day === activeDay);
  const dayPts = dayAll
    .map(s => ({ s, d: distOf(s) }))
    .filter((x): x is { s: RoadbookStop; d: number } => x.d !== undefined)
    .map(x => ({
      ...x,
      p: x.s.lat != null && x.s.lng != null ? proj(x.s.lat, x.s.lng) : pointAt(ring, x.d),
    }));

  /* 三層鏡頭：journey = 聚焦目前城市＋下一站；full = 當日總覽 */
  const focusCity = focusStop ? cityKeyOf(focusStop.name, focusStop.address) : undefined;
  const cluster = dayPts.filter(x => cityKeyOf(x.s.name, x.s.address) === focusCity);
  const nextDiff = (() => {
    const i0 = focusStop ? mainDay.findIndex(x => x.id === focusStop.id) : -1;
    for (let i = i0 + 1; i < mainDay.length; i++) {
      const k2 = cityKeyOf(mainDay[i].name, mainDay[i].address);
      if (k2 && k2 !== focusCity) return dayPts.find(x => x.s.id === mainDay[i].id);
    }
    return undefined;
  })();

  const cam = useMemo(() => {
    const focusPts = mode === "full" || cluster.length === 0
      ? [{ x: rider.x, y: rider.y }, ...dayPts.map(x => x.p)]
      : [{ x: rider.x, y: rider.y }, ...cluster.map(x => x.p), ...(nextDiff ? [nextDiff.p] : [])];
    const xs = focusPts.map(pt => pt.x), ys = focusPts.map(pt => pt.y);
    const minX = Math.min(...xs) - 26, maxX = Math.max(...xs) + 26;
    const minY = Math.min(...ys) - 30, maxY = Math.max(...ys) + 30;
    const maxZoom = mode === "full" ? 3 : 4;
    const scale = Math.min(maxZoom, Math.max(1, Math.min(TW.w / (maxX - minX), TW.h / (maxY - minY))));
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    return { scale, tx: TW.w / 2 - scale * cx, ty: TW.h / 2 - scale * cy };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDay, dNow, dayPts.length, mode, focusCity]);

  const k = cam.scale; // 反向縮放，讓字與角色維持螢幕大小
  const trail: string[] = [];
  ring.pts.forEach((p, i) => { if (ring.cum[i] <= dNow) trail.push(`${p.x},${p.y}`); });
  trail.push(`${rider.x},${rider.y}`);

  const ahead = pointAt(ring, dNow + 3);
  const behind = pointAt(ring, dNow - 3);
  const deg = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
  const movingRight = ahead.x >= behind.x;
  const nearCity = focusStop ? cityKeyOf(focusStop.name, focusStop.address) : undefined;

  return (
    <div className="rb-mappanel rb-glass" aria-hidden>
      <svg viewBox={`0 0 ${TW.w} ${TW.h}`} className="rb-mappanel-svg" preserveAspectRatio="xMidYMid meet">
        <g className="rb-cam" style={{ transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${k})` }}>
          <path d={TAIWAN_PATH} className="rb-rm-island" vectorEffect="non-scaling-stroke" />
          <polyline points={ring.pts.map(p => `${p.x},${p.y}`).join(" ")} className="rb-rm-route" vectorEffect="non-scaling-stroke" />
          {trail.length > 1 && <polyline points={trail.join(" ")} className="rb-rm-trail" vectorEffect="non-scaling-stroke" />}

          {/* 站點：journey 只標目前城市的站＋下一站城市；其他站留暗點不標字 */}
          {(() => {
            const occ: Record<string, number> = {};
            const showLbl = (s2: RoadbookStop) =>
              mode === "full" || cityKeyOf(s2.name, s2.address) === focusCity;
            return dayPts.map(({ s, d, p }, i2) => {
              const west = p.x < TW.w * 0.55;
              const active = s.id === focusStop?.id;
              const labeled = showLbl(s);
              const posKey = `${Math.round(p.x)}:${Math.round(p.y)}`;
              const row = occ[posKey] ?? 0;
              occ[posKey] = row + 1;
              return (
                <g key={s.id + i2}>
                  {row === 0 && (
                    <circle cx={p.x} cy={p.y} r={(active ? 4.2 : labeled ? 3 : 2.2) / k}
                      className="rb-rm-stop" data-lit={d <= dNow + 0.5} data-active={active}
                      data-dim={!labeled} data-planb={s.status === "備案"} />
                  )}
                  {labeled && (
                    <text x={west ? p.x + 9 / k : p.x - 9 / k} y={p.y + (3 + row * 11) / k}
                      textAnchor={west ? "start" : "end"}
                      className="rb-rm-lbl" data-lit={d <= dNow + 0.5} data-active={active}
                      style={{ fontSize: `${(active ? 10.5 : 9) / k}px` }}>
                      {coarse(s.name)}
                    </text>
                  )}
                </g>
              );
            });
          })()}
          {/* 下一站城市名（journey 模式的方向提示） */}
          {mode === "journey" && nextDiff && (() => {
            const nk = cityKeyOf(nextDiff.s.name, nextDiff.s.address);
            const west = nextDiff.p.x < TW.w * 0.55;
            return (
              <text x={west ? nextDiff.p.x + 9 / k : nextDiff.p.x - 9 / k} y={nextDiff.p.y + 3 / k}
                textAnchor={west ? "start" : "end"} className="rb-rm-lbl"
                style={{ fontSize: `${8.5 / k}px`, opacity: .55 }}>
                {nk?.replace("臺", "台") ?? ""} →
              </text>
            );
          })()}

          {/* 騎士猴：頭燈朝行進方向、小尾煙 */}
          <g className="rb-rm-rider" style={{ transform: `translate(${rider.x}px, ${rider.y}px)` }}>
            <defs>
              <linearGradient id="rbBeam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,236,160,.8)" />
                <stop offset="100%" stopColor="rgba(255,236,160,0)" />
              </linearGradient>
            </defs>
            <g style={{ transform: `scale(${1 / k})` }}>
              <g style={{ transform: `rotate(${deg}deg)`, transition: "transform 1.2s cubic-bezier(0.65,0,0.35,1)" }}>
                <path d="M5 0 L28 -6 L28 6 Z" fill="url(#rbBeam)" className="rb-rm-beam" />
                <circle cx="-9" cy="1" r="1.6" className="rb-rm-smoke" />
                <circle cx="-12" cy="-1" r="1.2" className="rb-rm-smoke rb-rm-smoke2" />
              </g>
              <ellipse cx="0" cy="3.5" rx="7" ry="1.7" className="rb-rm-shadow" />
              <image
                href="/field-notes/taiwan-roadbook/rider.png"
                x="-10" y="-30" width="20" height="33.7"
                style={{ transform: movingRight ? "scaleX(-1)" : undefined, transformOrigin: "0px -13px" }}
              />
            </g>
          </g>
        </g>
      </svg>
      <div className="rb-mappanel-cap">
        <span className="rb-bgmap-city">{nearCity ? CITY_EN[nearCity] : ""}</span>
        <span className="rb-bgmap-spot">{focusStop ? coarse(focusStop.name) : ""}</span>
      </div>
    </div>
  );
}
