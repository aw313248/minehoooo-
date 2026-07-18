import { NextRequest, NextResponse } from "next/server";

/**
 * 環島加油計數 — Redis 單一計數器
 * GET  → { count: number | null }
 * POST → +1（每 IP 2 秒一次），回傳最新 count
 */

const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
export const dynamic = "force-dynamic";

async function redis(cmd: (string | number)[]): Promise<unknown> {
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return (await r.json()).result;
}

export async function GET() {
  if (!URL_ || !TOKEN) return NextResponse.json({ count: null });
  try {
    const v = await redis(["GET", "rb:cheer"]);
    return NextResponse.json({ count: Number(v ?? 0) });
  } catch { return NextResponse.json({ count: null }); }
}

export async function POST(req: NextRequest) {
  if (!URL_ || !TOKEN) return NextResponse.json({ count: null }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  try {
    const gate = await redis(["SET", `rb:cheergate:${ip}`, "1", "NX", "EX", 2]);
    if (gate === null) {
      const v = await redis(["GET", "rb:cheer"]);
      return NextResponse.json({ count: Number(v ?? 0) });
    }
    const count = await redis(["INCR", "rb:cheer"]);
    return NextResponse.json({ count: Number(count) });
  } catch { return NextResponse.json({ count: null }, { status: 500 }); }
}
