import { NextRequest, NextResponse } from "next/server";

/**
 * 彈幕留言 — Redis list per note
 * GET  → { comments: {n,t,ts}[] | null }（最新 60 則）
 * POST { name?, text } → 新增（60 字上限、基本過濾、每 IP 20 秒一則）
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

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!URL_ || !TOKEN || !/^[a-z0-9-]{1,64}$/.test(slug)) return NextResponse.json({ comments: null });
  try {
    const raw = (await redis(["LRANGE", `comments:${slug}`, 0, 59])) as string[];
    return NextResponse.json({ comments: raw.map(s => { try { return JSON.parse(s); } catch { return null; } }).filter(Boolean) });
  } catch { return NextResponse.json({ comments: null }); }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!URL_ || !TOKEN || !/^[a-z0-9-]{1,64}$/.test(slug)) return NextResponse.json({ ok: false }, { status: 400 });
  let body: { name?: string; text?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const text = (body.text ?? "").trim().slice(0, 60);
  const name = (body.name ?? "").trim().slice(0, 16);
  if (text.length < 2) return NextResponse.json({ ok: false, err: "太短" }, { status: 400 });
  const lower = text.toLowerCase();
  if (BAD.some(w => lower.includes(w))) return NextResponse.json({ ok: false, err: "換個說法吧" }, { status: 400 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  try {
    const gate = await redis(["SET", `cgate:${slug}:${ip}`, "1", "NX", "EX", 20]);
    if (gate === null) return NextResponse.json({ ok: false, err: "慢一點，20 秒後再留" }, { status: 429 });
    await redis(["LPUSH", `comments:${slug}`, JSON.stringify({ n: name, t: text, ts: Date.now() })]);
    await redis(["LTRIM", `comments:${slug}`, 0, 199]);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ ok: false }, { status: 500 }); }
}
