import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fieldNotes } from "@/data/fieldNotes";

export const metadata: Metadata = {
  title: "現場筆記 / Field Notes | MINEH4O",
  description: "Oscar 的影像工作筆記、AI 工具實作、Prompt 心法 — 從現場到後製，做能說話的畫面。",
};

export default function FieldNotesIndex() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Top bar */}
      <header className="sticky top-0 z-30 px-5 md:px-10 py-4"
        style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"
            style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>
            <span style={{ fontSize: 16 }}>←</span>
            <span className="font-mono-label text-[10px] uppercase tracking-[0.32em]">MINEH4O</span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-16">

        {/* Masthead */}
        <div className="mb-10 md:mb-14">
          <p className="font-mono-label text-[10px] uppercase tracking-[0.4em] mb-3"
            style={{ color: "rgba(255,255,255,0.55)" }}>
            06 — FIELD NOTES
          </p>
          <h1 className="font-display leading-none mb-4"
            style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)", letterSpacing: "0.01em" }}>
            現場筆記
          </h1>
          <p className="text-[14px] md:text-[16px] max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
            影像工作筆記、AI 工具實作、Prompt 心法。<br/>
            從現場到後製，分享做能說話的畫面的思考過程。
          </p>
        </div>

        {/* Articles list */}
        <div className="grid gap-5">
          {fieldNotes.map((note, i) => (
            <Link key={note.slug} href={`/field-notes/${note.slug}`}
              className="group relative block overflow-hidden"
              style={{
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "#0a0a0a",
                opacity: 0,
                animation: `fadeInUp .8s cubic-bezier(.16,1,.3,1) ${0.1 + i * 0.08}s forwards`,
                textDecoration: "none",
                color: "inherit",
              }}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-0">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <Image src={note.heroImage} alt={note.title}
                    fill className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.85)" }} />
                </div>
                {/* Meta */}
                <div className="p-5 md:p-7 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono-label text-[9px] uppercase tracking-[0.32em] px-2.5 py-1"
                      style={{
                        color: "rgba(255,225,140,0.95)",
                        background: "rgba(255,210,70,0.12)",
                        border: "1px solid rgba(255,210,70,0.4)",
                        borderRadius: 999,
                      }}>
                      {note.category}
                    </span>
                    <span className="font-mono-label text-[9px] uppercase tracking-[0.22em]"
                      style={{ color: "rgba(255,255,255,0.45)" }}>
                      {note.date}
                    </span>
                  </div>
                  <h2 className="font-display leading-tight mb-2"
                    style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", letterSpacing: "0" }}>
                    {note.title}
                  </h2>
                  {note.subtitle && (
                    <p className="text-[13px] md:text-[14px] mb-3"
                      style={{ color: "rgba(255,255,255,0.6)" }}>
                      {note.subtitle}
                    </p>
                  )}
                  <p className="text-[13px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.55)" }}>
                    {note.excerpt}
                  </p>
                  <span className="font-mono-label text-[10px] uppercase tracking-[0.32em] mt-4 inline-flex items-center gap-2"
                    style={{ color: "rgba(255,255,255,0.7)" }}>
                    閱讀全文 <span style={{ fontSize: 14 }}>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA back to portfolio */}
        <div className="mt-14 text-center">
          <Link href="/"
            className="inline-flex items-center gap-3 px-6 py-3"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 999,
              color: "rgba(255,255,255,0.92)",
              textDecoration: "none",
            }}>
            <span className="font-mono-label text-[11px] uppercase tracking-[0.28em]">
              ← 回到 MINEH4O 作品集
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
