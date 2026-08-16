import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * 「我還可以去哪」推薦 — Redis list per region + 全域 list（每晚 digest 用）
 * GET  ?region=嘉義        → { suggestions: [...] }（最新 30）
 * GET  ?region=all&key=... → 全部（digest 用，需 ROADBOOK_DIGEST_KEY）
 * POST { region, place, why?, name? } → 新增（每 IP 20 秒一則）
 */

const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
export const dynamic = "force-dynamic";

const BAD = ["幹你", "垃圾", "去死", "智障", "白癡", "fuck", "shit", "bitch"];

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

const parse = (raw: string[]) =>
  raw.map(s => { try { return JSON.parse(s); } catch { return null; } }).filter(Boolean);

function validDigestKey(provided: string | null, expected: string): boolean {
  if (!provided || !expected) return false;
  const providedHash = createHash("sha256").update(provided).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(providedHash, expectedHash);
}

export async function GET(req: NextRequest) {
  const region = req.nextUrl.searchParams.get("region") ?? "";
  if (region === "all") {
    const digestKey = process.env.ROADBOOK_DIGEST_KEY ?? "";
    if (!digestKey) return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    if (!validDigestKey(req.nextUrl.searchParams.get("key"), digestKey))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!URL_ || !TOKEN) return NextResponse.json({ suggestions: null });
  try {
    if (region === "all") {
      const raw = (await redis(["LRANGE", "rb:suggest:all", 0, 199])) as string[];
      return NextResponse.json({ suggestions: parse(raw) });
    }
    if (!/^[一-鿿]{1,6}$/.test(region)) return NextResponse.json({ suggestions: [] });
    const raw = (await redis(["LRANGE", `rb:suggest:${region}`, 0, 29])) as string[];
    return NextResponse.json({ suggestions: parse(raw) });
  } catch { return NextResponse.json({ suggestions: null }); }
}

export async function POST(req: NextRequest) {
  if (!URL_ || !TOKEN) return NextResponse.json({ ok: false }, { status: 503 });
  let body: { region?: string; place?: string; why?: string; name?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const region = (body.region ?? "").trim().slice(0, 6);
  const place = (body.place ?? "").trim().slice(0, 30);
  const why = (body.why ?? "").trim().slice(0, 60);
  const name = (body.name ?? "").trim().slice(0, 16);
  if (!/^[一-鿿]{1,6}$/.test(region) || place.length < 2)
    return NextResponse.json({ ok: false, err: "地點至少兩個字" }, { status: 400 });
  const lower = `${place}${why}`.toLowerCase();
  if (BAD.some(w => lower.includes(w))) return NextResponse.json({ ok: false, err: "換個說法吧" }, { status: 400 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  try {
    const gate = await redis(["SET", `rb:sgate:${ip}`, "1", "NX", "EX", 20]);
    if (gate === null) return NextResponse.json({ ok: false, err: "慢一點，20 秒後再推薦" }, { status: 429 });
    const item = JSON.stringify({ region, place, why, n: name, ts: Date.now() });
    await redis(["LPUSH", `rb:suggest:${region}`, item]);
    await redis(["LTRIM", `rb:suggest:${region}`, 0, 99]);
    await redis(["LPUSH", "rb:suggest:all", item]);
    await redis(["LTRIM", "rb:suggest:all", 0, 499]);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ ok: false }, { status: 500 }); }
}
