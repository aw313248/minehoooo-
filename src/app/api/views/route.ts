import { NextRequest, NextResponse } from "next/server";

/**
 * 批次讀取筆記瀏覽數（列表頁用）
 * GET /api/views?slugs=a,b,c → { views: { a: 12, b: 5, c: 0 } | null }
 */

const URL_ =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
const TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!URL_ || !TOKEN) return NextResponse.json({ views: null });
  const slugs = (req.nextUrl.searchParams.get("slugs") ?? "")
    .split(",")
    .filter(s => /^[a-z0-9-]{1,64}$/.test(s))
    .slice(0, 50);
  if (!slugs.length) return NextResponse.json({ views: {} });
  try {
    const r = await fetch(`${URL_}/mget/${slugs.map(s => encodeURIComponent(`views:${s}`)).join("/")}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: "no-store",
    });
    if (!r.ok) throw new Error(String(r.status));
    const result: (string | null)[] = (await r.json()).result;
    const views: Record<string, number> = {};
    slugs.forEach((s, i) => { views[s] = Number(result[i] ?? 0); });
    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: null });
  }
}
