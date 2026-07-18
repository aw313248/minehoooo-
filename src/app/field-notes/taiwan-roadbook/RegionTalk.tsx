"use client";

/**
 * 台灣機車環島 Roadbook — 分區留言 + 「我還可以去哪」推薦
 * 兩層設計：
 *  TALK  — 各區自由留言（沿用全站留言 API，slug = roadbook-{region}）
 *  ROUTE+ — 結構化推薦（地點＋理由），存 /api/roadbook/suggest，Oscar 每晚收 digest
 */

import { useCallback, useEffect, useState } from "react";
import { CITY_EN } from "./geo";

interface Comment { n?: string; t: string; ts: number }
interface Suggestion { region: string; place: string; why?: string; n?: string; ts: number }

const regionSlug = (zh: string) => `roadbook-${(CITY_EN[zh] ?? zh).toLowerCase().replace(/\s+/g, "-")}`;

function ago(ts: number) {
  const m = Math.max(0, Math.round((Date.now() - ts) / 60000));
  if (m < 60) return `${m || 1} 分鐘前`;
  const h = Math.floor(m / 60);
  return h < 24 ? `${h} 小時前` : `${Math.floor(h / 24)} 天前`;
}

export default function RegionTalk({ regions }: { regions: string[] }) {
  const [region, setRegion] = useState(regions[0] ?? "台中");
  const [layer, setLayer] = useState<"talk" | "route">("talk");

  /* TALK */
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  /* ROUTE+ */
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [place, setPlace] = useState("");
  const [why, setWhy] = useState("");
  const [msg, setMsg] = useState("");

  const load = useCallback(() => {
    fetch(`/api/comments/${regionSlug(region)}`)
      .then(r => r.json()).then(d => setComments(d.comments ?? [])).catch(() => setComments([]));
    fetch(`/api/roadbook/suggest?region=${encodeURIComponent(region)}`)
      .then(r => r.json()).then(d => setSuggestions(d.suggestions ?? [])).catch(() => setSuggestions([]));
  }, [region]);
  useEffect(load, [load]);

  const sendTalk = () => {
    if (text.trim().length < 2) return;
    setMsg("");
    fetch(`/api/comments/${regionSlug(region)}`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, text }),
    }).then(r => r.json()).then(d => {
      if (d.ok) { setText(""); load(); } else setMsg(d.err ?? "再試一次");
    }).catch(() => setMsg("再試一次"));
  };

  const sendRoute = () => {
    if (place.trim().length < 2) { setMsg("地點至少兩個字"); return; }
    setMsg("");
    fetch("/api/roadbook/suggest", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ region, place, why, name }),
    }).then(r => r.json()).then(d => {
      if (d.ok) { setPlace(""); setWhy(""); setMsg("收到！Oscar 每晚收整理"); load(); }
      else setMsg(d.err ?? "再試一次");
    }).catch(() => setMsg("再試一次"));
  };

  return (
    <div className="rb-talk">
      {/* 區域切換 */}
      <div className="rb-talk-regions" role="tablist" aria-label="選擇地區">
        {regions.map(r => (
          <button key={r} role="tab" aria-selected={r === region} className="rb-talk-region"
            data-active={r === region} onClick={() => { setRegion(r); setMsg(""); }}>
            {r}
          </button>
        ))}
      </div>

      {/* 兩層切換 */}
      <div className="rb-talk-layers">
        <button className="rb-talk-layer" data-active={layer === "talk"} onClick={() => setLayer("talk")}>
          {region}人留言
        </button>
        <button className="rb-talk-layer" data-active={layer === "route"} onClick={() => setLayer("route")}>
          我還可以去哪 →
        </button>
      </div>

      {layer === "talk" ? (
        <div className="rb-talk-panel">
          <div className="rb-talk-list">
            {comments === null && <p className="rb-talk-empty">載入中…</p>}
            {comments?.length === 0 && <p className="rb-talk-empty">{region}的朋友，第一則留言是你的</p>}
            {comments?.slice(0, 12).map((c, i) => (
              <p key={c.ts + "" + i} className="rb-talk-item">
                <span className="rb-talk-n">{c.n || "路人"}</span>
                {c.t}
                <span className="rb-talk-ago">{ago(c.ts)}</span>
              </p>
            ))}
          </div>
          <div className="rb-talk-form">
            <input className="rb-talk-in rb-talk-in-name" placeholder="名字（可空）" maxLength={16}
              value={name} onChange={e => setName(e.target.value)} />
            <input className="rb-talk-in" placeholder={`跟騎在路上的 Oscar 說句話`} maxLength={60}
              value={text} onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendTalk()} />
            <button className="rb-talk-send" onClick={sendTalk}>送出</button>
          </div>
        </div>
      ) : (
        <div className="rb-talk-panel">
          <p className="rb-talk-hint">推薦 {region} 還值得繞去的地方——每晚彙整直接送到 Oscar 手上</p>
          <div className="rb-talk-form rb-talk-form-col">
            <input className="rb-talk-in" placeholder="地點（必填）" maxLength={30}
              value={place} onChange={e => setPlace(e.target.value)} />
            <input className="rb-talk-in" placeholder="為什麼值得去？（可空）" maxLength={60}
              value={why} onChange={e => setWhy(e.target.value)} />
            <div className="rb-talk-row">
              <input className="rb-talk-in rb-talk-in-name" placeholder="名字（可空）" maxLength={16}
                value={name} onChange={e => setName(e.target.value)} />
              <button className="rb-talk-send" onClick={sendRoute}>推薦給 Oscar</button>
            </div>
          </div>
          <div className="rb-talk-list">
            {suggestions?.slice(0, 8).map((s, i) => (
              <p key={s.ts + "" + i} className="rb-talk-item">
                <span className="rb-talk-n rb-talk-n-route">📍 {s.place}</span>
                {s.why}
                <span className="rb-talk-ago">{s.n ? `${s.n} · ` : ""}{ago(s.ts)}</span>
              </p>
            ))}
          </div>
        </div>
      )}
      {msg && <p className="rb-talk-msg">{msg}</p>}
    </div>
  );
}
