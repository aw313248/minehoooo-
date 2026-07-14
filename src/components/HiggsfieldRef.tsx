"use client";

/**
 * Higgsfield 邀請連結橫幅 — 全站共用
 * variant="banner"：AI 教學最顯眼位置（官方 Logo＋大 CTA＋誠實揭露）
 * variant="plug"  ：旅遊內容的「中場工商」卡（導向 AI 教學＋邀請連結）
 * 連結單一來源：TOOL_HIGGSFIELD.url（已含 Oscar 邀請碼）
 */

import Link from "next/link";
import { TOOL_HIGGSFIELD } from "@/data/promptBuilders";

const REF_URL = TOOL_HIGGSFIELD.url;

export default function HiggsfieldRef({ variant = "banner" }: { variant?: "banner" | "plug" }) {
  if (variant === "plug") {
    return (
      <aside className="hfp" aria-label="Oscar 的 AI 教學與 Higgsfield 邀請連結">
        <div className="hfp-card">
          <span className="hfp-tag">中場工商</span>
          <div className="hfp-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/higgsfield-icon.png" alt="Higgsfield" className="hfp-icon" loading="lazy" />
            <p className="hfp-text">
              這篇筆記免費，Oscar 平常靠 AI 影像吃飯——
              想看我怎麼用 AI 做出電影感影片，或想自己玩，
              用邀請連結註冊 Higgsfield 就是最直接的支持
            </p>
          </div>
          <div className="hfp-btns">
            <Link href="/field-notes" className="hfp-btn hfp-btn-ghost">看 Oscar 的 AI 教學 →</Link>
            <a href={REF_URL} target="_blank" rel="noopener noreferrer" className="hfp-btn hfp-btn-lime">Higgsfield 邀請連結 ↗</a>
          </div>
          <p className="hfp-note">你註冊不會多花錢；訂閱 Higgsfield 2.0 的話 Oscar 會拿到創作額度</p>
        </div>
        <style>{`
          .hfp { margin: 30px 0; }
          .hfp-card { background: #0d0d10; border: 1px solid rgba(200,255,60,0.22); border-radius: 14px; padding: 20px 22px; }
          .hfp-tag { display: inline-block; font-family: var(--font-space-mono),monospace; font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase; color: rgba(200,255,60,0.9); border: 1px solid rgba(200,255,60,0.35); border-radius: 3px; padding: 3px 8px; margin-bottom: 14px; }
          .hfp-row { display: flex; gap: 14px; align-items: flex-start; }
          .hfp-icon { width: 44px; height: 44px; border-radius: 11px; flex-shrink: 0; }
          .hfp-text { font-family: var(--font-readex),sans-serif; font-size: 14px; font-weight: 300; line-height: 1.75; color: rgba(255,255,255,0.78); margin: 0; }
          .hfp-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
          .hfp-btn { font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none; border-radius: 6px; padding: 10px 16px; transition: opacity .15s, border-color .15s; }
          .hfp-btn-ghost { color: rgba(255,255,255,0.85); border: 1px solid rgba(255,255,255,0.2); }
          .hfp-btn-ghost:hover { border-color: rgba(255,255,255,0.45); }
          .hfp-btn-lime { color: #0a0a0a; background: rgb(200,255,60); font-weight: 700; border: 1px solid rgb(200,255,60); }
          .hfp-btn-lime:hover { opacity: 0.88; }
          .hfp-note { font-family: var(--font-readex),sans-serif; font-size: 11.5px; font-weight: 300; color: rgba(255,255,255,0.4); margin: 12px 0 0; }
        `}</style>
      </aside>
    );
  }

  return (
    <aside className="hfb" aria-label="Higgsfield 邀請連結">
      <a href={REF_URL} target="_blank" rel="noopener noreferrer" className="hfb-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/higgsfield-icon.png" alt="Higgsfield" className="hfb-icon" loading="lazy" />
        <span className="hfb-mid">
          <span className="hfb-title">HIGGSFIELD × SEEDANCE 2.0</span>
          <span className="hfb-sub">本教學使用的 AI 影像平台 — 用 Oscar 的邀請連結註冊，訂閱 2.0 等於直接支持免費教學</span>
        </span>
        <span className="hfb-cta">用邀請連結開始 ↗</span>
      </a>
      <p className="hfb-note">邀請連結揭露：你不會多花一毛錢，Oscar 會獲得創作額度</p>
      <style>{`
        .hfb { margin: 26px 0; }
        .hfb-card { display: flex; align-items: center; gap: 16px; text-decoration: none; background: linear-gradient(120deg, rgba(200,255,60,0.09), rgba(200,255,60,0.03) 55%, transparent), #0c0d0a; border: 1px solid rgba(200,255,60,0.35); border-radius: 14px; padding: 16px 20px; transition: border-color .2s, transform .2s; }
        .hfb-card:hover { border-color: rgba(200,255,60,0.7); transform: translateY(-2px); }
        .hfb-icon { width: 52px; height: 52px; border-radius: 13px; flex-shrink: 0; box-shadow: 0 6px 22px rgba(200,255,60,0.22); }
        .hfb-mid { display: flex; flex-direction: column; gap: 5px; min-width: 0; flex: 1; }
        .hfb-title { font-family: var(--font-space-mono),monospace; font-size: 12px; letter-spacing: 0.3em; color: rgb(210,255,90); }
        .hfb-sub { font-family: var(--font-readex),sans-serif; font-size: 12.5px; font-weight: 300; line-height: 1.6; color: rgba(255,255,255,0.72); }
        .hfb-cta { flex-shrink: 0; font-family: var(--font-space-mono),monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: #0a0a0a; background: rgb(200,255,60); border-radius: 6px; padding: 11px 16px; font-weight: 700; }
        .hfb-note { font-family: var(--font-readex),sans-serif; font-size: 10.5px; font-weight: 300; color: rgba(255,255,255,0.35); margin: 8px 0 0 2px; }
        @media (max-width: 620px) { .hfb-card { flex-wrap: wrap; } .hfb-cta { width: 100%; text-align: center; } }
      `}</style>
    </aside>
  );
}
