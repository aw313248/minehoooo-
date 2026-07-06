"use client";

import { useEffect, useState } from "react";

/**
 * 筆記瀏覽數 — 讀取（並可 +1）單篇計數
 * - increment：進文章頁時記一次（同分頁重整不重複計，用 sessionStorage 擋）
 * - 資料庫未接（API 回 null）時整個隱藏，不佔版面
 */
export default function NoteViews({ slug, increment = false, style }: {
  slug: string; increment?: boolean; style?: React.CSSProperties;
}) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const seenKey = `viewed:${slug}`;
    const shouldCount = increment && !sessionStorage.getItem(seenKey);
    fetch(`/api/views/${slug}`, { method: shouldCount ? "POST" : "GET" })
      .then(r => r.json())
      .then(d => {
        if (!alive) return;
        if (typeof d.views === "number") setViews(d.views);
        if (shouldCount) sessionStorage.setItem(seenKey, "1");
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [slug, increment]);

  if (views === null) return null;
  return (
    <span style={{
      fontFamily: "var(--font-space-mono),monospace", fontSize: 12.5, fontWeight: 700,
      letterSpacing: "0.14em", color: "rgba(255,225,140,0.95)", ...style,
    }}>
      即時瀏覽 {views.toLocaleString()}
    </span>
  );
}
