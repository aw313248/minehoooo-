import { NextRequest, NextResponse } from "next/server";

/**
 * 筆記瀏覽數 — Upstash Redis (Vercel Marketplace 免費版)
 * GET  /api/views/:slug  → { views: number | null }（null = 資料庫未接）
 * POST /api/views/:slug  → 計數 +1 並回傳新值
 * 支援兩種環境變數命名（Vercel KV 舊名 / Upstash 原名），擇一存在即可
 */

const URL_ =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
const TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";

export const dynamic = "force-dynamic";

async function redis(cmd: string[]): Promise<unknown> {
  const r = await fetch(`${URL_}/${cmd.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return (await r.json()).result;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!URL_ || !TOKEN) return NextResponse.json({ views: null });
  try {
    const v = await redis(["GET", `views:${slug}`]);
    return NextResponse.json({ views: Number(v ?? 0) });
  } catch {
    return NextResponse.json({ views: null });
  }
}

export async function POST(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!URL_ || !TOKEN) return NextResponse.json({ views: null });
  // slug 白名單防灌水：只接受合法字元
  if (!/^[a-z0-9-]{1,64}$/.test(slug)) return NextResponse.json({ views: null }, { status: 400 });
  try {
    const v = await redis(["INCR", `views:${slug}`]);
    return NextResponse.json({ views: Number(v) });
  } catch {
    return NextResponse.json({ views: null });
  }
}
