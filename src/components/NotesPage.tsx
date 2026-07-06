"use client";

/**
 * NotesPage — 主頁 pager 的「現場筆記」分頁
 * 列出所有筆記卡（封面＋標題＋日期）＋即時瀏覽數（/api/views 批次讀取）
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { fieldNotes } from "@/data/fieldNotes";
import { useInView } from "@/hooks/useInView";

export default function NotesPage() {
  const { ref, inView } = useInView(0.05);
  const [views, setViews] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetch(`/api/views?slugs=${fieldNotes.map(n => n.slug).join(",")}`)
      .then(r => r.json())
      .then(d => { if (d.views) setViews(d.views); })
      .catch(() => {});
  }, []);

  const sorted = [...fieldNotes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center px-4 md:px-14 py-20" style={{ background: "var(--bg-dark, #0a0a0b)" }}>
      <div style={{ opacity: inView ? 1 : 0, transition: "opacity .8s ease" }}>
        <p className="font-mono-label text-[9px] tracking-[0.42em] mb-2" style={{ color: "var(--white-soft)" }}>08 — FIELD NOTES</p>
        <h2 className="font-display leading-none mb-3" style={{ fontSize: "clamp(2rem, 5vw, 4.4rem)", color: "var(--text)" }}>
          現場筆記
        </h2>
        <p className="text-[13px] mb-10" style={{ color: "var(--text-2)", maxWidth: 480 }}>
          拍攝設定、AI 工具、旅行拍片的完整過程 — 全部免費公開，瀏覽數即時
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-[1100px]">
          {sorted.map((n, i) => (
            <Link key={n.slug} href={`/field-notes/${n.slug}`}
              className="group relative block overflow-hidden"
              style={{
                borderRadius: 16, border: "1px solid rgba(255,255,255,0.09)", background: "#0a0a0c",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity .7s ease ${i * 0.1}s, transform .7s cubic-bezier(.16,1,.3,1) ${i * 0.1}s, border-color .3s`,
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,225,140,0.35)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}>
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.heroImage} alt={n.title} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.85)" }} />
                <span className="absolute top-3 left-3 font-mono-label text-[8px] tracking-[0.3em] px-2 py-1"
                  style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", borderRadius: 4, color: "rgba(255,225,140,0.9)" }}>
                  {n.categoryLabel}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[14px] font-medium leading-snug mb-2" style={{ color: "var(--text)" }}>{n.title}</p>
                <div className="flex items-center gap-2 flex-wrap font-mono-label text-[9px] tracking-[0.16em]" style={{ color: "var(--text-3)" }}>
                  <span>{n.date}</span>
                  <span aria-hidden>·</span>
                  <span>{n.readingTime} MIN</span>
                  {views && typeof views[n.slug] === "number" && (
                    <>
                      <span aria-hidden>·</span>
                      <span style={{ color: "rgba(255,225,140,0.85)" }}>{views[n.slug].toLocaleString()} VIEWS</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/field-notes"
          className="inline-block mt-10 font-mono-label text-[10px] tracking-[0.28em] uppercase px-6 py-3 transition-colors"
          style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, color: "var(--text-2)" }}>
          進入筆記首頁 →
        </Link>
      </div>
    </section>
  );
}
