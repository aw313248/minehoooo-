/**
 * 台灣機車環島 Roadbook — Notion 資料層（僅限 server 端使用）
 * Token 只存在於環境變數，絕不進 client bundle。
 * 主要走 Notion 新版 data_sources API（2025-09-03），失敗時退回 databases API。
 * 規則：只取「公開顯示」=true；「取消」不進主行程；同日依「排序」升冪。
 */

const DATA_SOURCE_ID =
  process.env.NOTION_ROADBOOK_DATA_SOURCE_ID ?? "0741194a-5768-4570-8317-fab9c2e517f9";

export interface RoadbookStop {
  id: string;
  name: string;
  day: string;            // "Day 1"…"Day 7" | "未排定"
  category: string;       // 出發/早餐/午餐/住宿/景點/晚上散步/加油/休息/目前位置
  status: string;         // 已確定/候選/備案/已抵達/已完成/取消
  time?: string;
  address?: string;
  mapsUrl?: string;
  segmentNavUrl?: string;
  order: number;
  note?: string;
  isCurrent: boolean;
  lat?: number;
  lng?: number;
  lastEdited: string;
}

export interface RoadbookData {
  ok: boolean;
  stops: RoadbookStop[];
  days: string[];
  currentStop?: RoadbookStop;
  currentDay: string;
  completedCount: number;
  totalPlanned: number;
  lastUpdated?: string;
  error?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function text(rt: any): string | undefined {
  const s = (rt?.rich_text ?? rt?.title ?? [])
    .map((t: any) => t?.plain_text ?? "")
    .join("")
    .trim();
  return s || undefined;
}

function mapPage(page: any): RoadbookStop | null {
  const p = page?.properties;
  if (!p) return null;
  const name = text(p["名稱"]);
  if (!name) return null;
  return {
    id: String(page.id ?? "").slice(0, 8), // 只留短識別用於 React key，不輸出完整內部 ID
    name,
    day: p["Day"]?.select?.name ?? "未排定",
    category: p["分類"]?.select?.name ?? "景點",
    status: p["狀態"]?.select?.name ?? "已確定",
    time: text(p["預計時間"]),
    // 地址只保留縣市（前 3 字），區級以下不離開 server
    address: text(p["地址"])?.slice(0, 3),
    mapsUrl: p["Google Maps"]?.url ?? undefined,
    segmentNavUrl: p["整段導航"]?.url ?? undefined,
    order: typeof p["排序"]?.number === "number" ? p["排序"].number : 999,
    note: text(p["備註"])?.replace(/([市縣])[^\s·，,()（）]{1,3}[區鄉鎮](?![場館街路])/g, "$1"),
    isCurrent: p["目前位置"]?.checkbox === true,
    lat: typeof p["緯度"]?.number === "number" ? p["緯度"].number : undefined,
    lng: typeof p["經度"]?.number === "number" ? p["經度"].number : undefined,
    lastEdited: page.last_edited_time ?? "",
  };
}

async function queryNotion(token: string): Promise<any[]> {
  const body = JSON.stringify({
    filter: { property: "公開顯示", checkbox: { equals: true } },
    page_size: 100,
  });
  // 新版 data_sources API
  const tryFetch = async (url: string, version: string) => {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": version,
        "Content-Type": "application/json",
      },
      body,
      next: { revalidate: 60 },
    });
    if (!r.ok) throw new Error(`notion ${r.status}`);
    return (await r.json()).results as any[];
  };
  try {
    return await tryFetch(
      `https://api.notion.com/v1/data_sources/${DATA_SOURCE_ID}/query`,
      "2025-09-03",
    );
  } catch {
    return await tryFetch(
      `https://api.notion.com/v1/databases/${DATA_SOURCE_ID}/query`,
      "2022-06-28",
    );
  }
}

const DAY_ORDER = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "未排定"];

export async function getRoadbook(): Promise<RoadbookData> {
  const empty: RoadbookData = {
    ok: false, stops: [], days: [], currentDay: "Day 1",
    completedCount: 0, totalPlanned: 0,
  };
  const token = process.env.NOTION_TOKEN;
  if (!token) return { ...empty, error: "notion-not-configured" };
  try {
    const pages = await queryNotion(token);
    const all = pages.map(mapPage).filter((s): s is RoadbookStop => s !== null);
    // 「取消」完全不進主行程
    const stops = all
      .filter(s => s.status !== "取消")
      .sort((a, b) =>
        DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day) || a.order - b.order);
    const days = DAY_ORDER.filter(d => stops.some(s => s.day === d));
    // 目前位置只取一筆（多筆時取最後更新最新的）
    const currents = stops.filter(s => s.isCurrent)
      .sort((a, b) => b.lastEdited.localeCompare(a.lastEdited));
    const currentStop = currents[0];
    const firstOpenDay =
      days.find(d => stops.some(s => s.day === d && s.status !== "已完成")) ?? days[0] ?? "Day 1";
    const currentDay = currentStop?.day ?? firstOpenDay;
    const completedCount = stops.filter(s => s.status === "已完成" || s.status === "已抵達").length;
    const lastUpdated = stops.map(s => s.lastEdited).sort().at(-1);
    return {
      ok: true, stops, days, currentStop, currentDay,
      completedCount, totalPlanned: stops.length, lastUpdated,
    };
  } catch {
    // 不外洩內部錯誤內容
    return { ...empty, error: "notion-unavailable" };
  }
}
