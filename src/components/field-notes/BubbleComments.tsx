"use client";

/**
 * BubbleComments — 教學頁彈幕泡泡
 * 鐵則：永不干擾教學 —
 *   泡泡 pointer-events:none、z-index 低於內文、只在內容欄外的側邊欄漂（桌面）
 *   手機不漂泡泡，只有右下角膠囊；prefers-reduced-motion 不動畫
 * 行為：進場出現迷你邀請（可關），關掉後右下角常駐 💬 膠囊隨時可留
 */

import { useEffect, useRef, useState } from "react";

interface C { n?: string; t: string; ts: number }

export default function BubbleComments({ slug, prompt }: { slug: string; prompt?: string }) {
  const [comments, setComments] = useState<C[]>([]);
  const [open, setOpen] = useState(false);
  const [invited, setInvited] = useState(false);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | string>("idle");
  const [enabled, setEnabled] = useState(true);
  // 手機版彈幕：一次一顆、可開關（記在 localStorage，預設開）
  const [mobileOn, setMobileOn] = useState(true);
  const [mIdx, setMIdx] = useState(0);
  const idx = useRef(0);

  useEffect(() => {
    fetch(`/api/comments/${slug}`).then(r => r.json())
      .then(d => { if (d.comments) setComments(d.comments); else setEnabled(false); })
      .catch(() => setEnabled(false));
    // 進場邀請：3 秒後出現，關過就不再跳（localStorage）
    const t = setTimeout(() => {
      if (!localStorage.getItem("bubble-invited")) setInvited(true);
    }, 3000);
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) setEnabled(false);
    // 文章內的留言點按鈕可直接打開輸入框
    const openFromArticle = () => { setOpen(true); setInvited(false); localStorage.setItem("bubble-invited", "1"); };
    window.addEventListener("bubble-comments:open", openFromArticle);
    return () => { clearTimeout(t); window.removeEventListener("bubble-comments:open", openFromArticle); };
  }, [slug]);

  const dismissInvite = () => { setInvited(false); localStorage.setItem("bubble-invited", "1"); };

  useEffect(() => {
    setMobileOn(localStorage.getItem("bubble-mobile") !== "0");
  }, []);

  // 手機彈幕輪播：每 6.5 秒換下一則（tick 遞增，單則留言也能重新觸發動畫）
  useEffect(() => {
    if (!mobileOn || comments.length === 0) return;
    const t = setInterval(() => setMIdx(i => i + 1), 6500);
    return () => clearInterval(t);
  }, [mobileOn, comments.length]);

  const toggleMobile = () => {
    setMobileOn(v => { localStorage.setItem("bubble-mobile", v ? "0" : "1"); return !v; });
  };

  const submit = async () => {
    if (text.trim().length < 2 || state === "busy") return;
    setState("busy");
    const r = await fetch(`/api/comments/${slug}`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, text }),
    }).then(r => r.json()).catch(() => ({ ok: false }));
    if (r.ok) {
      setComments(c => [{ n: name, t: text.trim(), ts: Date.now() }, ...c]);
      setText(""); setState("done");
      setTimeout(() => { setState("idle"); setOpen(false); }, 1200);
    } else setState(r.err || "失敗了，再試一次");
  };

  /* 桌面側邊欄漂浮泡泡：最多 6 顆同時，循環播放留言 */
  const floats = comments.length ? Array.from({ length: Math.min(6, comments.length) }, (_, i) => {
    const c = comments[(idx.current + i) % comments.length];
    const left = i % 2 === 0;                       // 左右輪流
    const lane = (i * 37) % 90;                     // 邊欄內的水平散布 %
    const dur = 15 + (i * 5) % 9;                   // 15–23s
    const delay = i * 1.6;
    return { c, left, lane, dur, delay, key: `${c.ts}-${i}` };
  }) : [];

  return (
    <>
      {/* ── 漂浮泡泡（僅桌面、僅側邊欄、不可互動）── */}
      {enabled && floats.map(f => (
        <div key={f.key} aria-hidden="true" className="hidden md:block"
          style={{
            position: "fixed", bottom: -80, zIndex: 5, pointerEvents: "none",
            [f.left ? "left" : "right"]: `calc(${f.lane * 0.9}px + 12px)`,
            width: 150, maxWidth: "calc(50vw - 400px)",
            animation: `bubbleFloat ${f.dur}s linear ${f.delay}s infinite`,
            opacity: 0,
          } as React.CSSProperties}>
          <div style={{
            background: "rgba(22,22,27,0.82)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14, padding: "8px 11px",
          }}>
            <p style={{ margin: 0, fontSize: 11, lineHeight: 1.5, color: "rgba(255,255,255,0.6)" }}>{f.c.t}</p>
            {f.c.n && <p style={{ margin: "3px 0 0", fontFamily: "var(--font-space-mono),monospace", fontSize: 8, letterSpacing: "0.12em", color: "rgba(255,225,140,0.55)" }}>— {f.c.n}</p>}
          </div>
        </div>
      ))}

      {/* ── 手機版彈幕：一次一顆，浮在膠囊上方，不可互動 ── */}
      {enabled && mobileOn && !open && comments.length > 0 && (
        <div key={`m-${mIdx}`} aria-hidden="true" className="md:hidden"
          style={{
            position: "fixed", right: 16, bottom: 78, zIndex: 44,
            maxWidth: "72vw", pointerEvents: "none",
            animation: "bubbleToast 6s ease both",
          }}>
          <div style={{
            background: "rgba(22,22,27,0.85)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14, padding: "8px 12px",
          }}>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: "rgba(255,255,255,0.75)" }}>{comments[mIdx % comments.length].t}</p>
            {comments[mIdx % comments.length].n && <p style={{ margin: "3px 0 0", fontFamily: "var(--font-space-mono),monospace", fontSize: 8.5, letterSpacing: "0.12em", color: "rgba(255,225,140,0.6)" }}>— {comments[mIdx % comments.length].n}</p>}
          </div>
        </div>
      )}

      {/* ── 進場邀請 / 常駐膠囊 / 輸入框 — 右下角，可關 ── */}
      <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 45, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        {open && (
          <div style={{
            background: "rgba(12,12,15,0.92)", border: "1px solid rgba(255,225,140,0.3)",
            borderRadius: 14, padding: 14, width: 252, backdropFilter: "blur(16px)",
          }}>
            <p style={{ margin: "0 0 8px", fontSize: 12, color: "rgba(255,255,255,0.85)" }}>{prompt ?? "留一句話，它會變成這頁的泡泡 ✦"}</p>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="暱稱（選填）" maxLength={16}
              style={{ width: "100%", boxSizing: "border-box", marginBottom: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "7px 10px", fontSize: 12, color: "#fff", outline: "none" }} />
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="最多 60 字" maxLength={60} rows={2}
              style={{ width: "100%", boxSizing: "border-box", resize: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "7px 10px", fontSize: 12, color: "#fff", outline: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <span style={{ fontSize: 10, color: state === "done" ? "rgba(140,220,140,0.9)" : "rgba(255,160,140,0.9)" }}>
                {state === "done" ? "上牆了 ✓" : state !== "idle" && state !== "busy" ? state : ""}
              </span>
              <button onClick={submit} disabled={state === "busy"}
                style={{ background: "rgba(255,217,100,0.9)", color: "#000", border: "none", borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                {state === "busy" ? "…" : "送出"}
              </button>
            </div>
          </div>
        )}

        {invited && !open && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(12,12,15,0.9)", border: "1px solid rgba(255,225,140,0.35)",
            borderRadius: 999, padding: "8px 8px 8px 14px", backdropFilter: "blur(12px)",
          }}>
            <button onClick={() => { setOpen(true); dismissInvite(); }}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.9)", fontSize: 12, cursor: "pointer", padding: 0 }}>
              💬 看完想說什麼？留一句話
            </button>
            <button onClick={dismissInvite} aria-label="關閉留言邀請"
              style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 20, height: 20, color: "rgba(255,255,255,0.6)", fontSize: 11, cursor: "pointer", lineHeight: 1 }}>✕</button>
          </div>
        )}

        {!invited && !open && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {enabled && comments.length > 0 && (
              <button onClick={toggleMobile} className="md:hidden"
                aria-label={mobileOn ? "關閉留言彈幕" : "開啟留言彈幕"} aria-pressed={mobileOn}
                style={{
                  fontFamily: "var(--font-space-mono),monospace", fontSize: 9, letterSpacing: "0.2em",
                  color: mobileOn ? "rgba(255,225,140,0.9)" : "rgba(255,255,255,0.45)",
                  background: "rgba(12,12,15,0.85)", backdropFilter: "blur(10px)",
                  border: `1px solid ${mobileOn ? "rgba(255,225,140,0.35)" : "rgba(255,255,255,0.15)"}`,
                  borderRadius: 999, padding: "7px 11px", cursor: "pointer",
                }}>
                彈幕 {mobileOn ? "開" : "關"}
              </button>
            )}
            <button onClick={() => setOpen(true)} aria-label="留言"
              style={{
                width: 44, height: 44, borderRadius: "50%", cursor: "pointer",
                background: "rgba(12,12,15,0.9)", border: "1px solid rgba(255,225,140,0.4)",
                backdropFilter: "blur(12px)", fontSize: 17,
              }}>💬</button>
          </div>
        )}
        {open && (
          <button onClick={() => setOpen(false)} aria-label="收合留言"
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 10, cursor: "pointer", letterSpacing: "0.2em" }}>收合 ✕</button>
        )}
      </div>

      <style>{`
        @keyframes bubbleToast {
          0%   { opacity: 0; transform: translateY(10px); }
          8%   { opacity: 1; transform: translateY(0); }
          82%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-6px); }
        }
        @keyframes bubbleFloat {
          0%   { transform: translateY(0); opacity: 0; }
          6%   { opacity: 0.85; }
          85%  { opacity: 0.5; }
          100% { transform: translateY(calc(-100vh - 120px)); opacity: 0; }
        }
      `}</style>
    </>
  );
}
