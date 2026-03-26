"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { WordReveal } from "@/components/WordReveal";
import { AnimLine } from "@/components/AnimLine";

const MAIN_VIDEO = "u5WaOT1m670";

const extraVideos = [
  {
    id: "ZbaSBFVP-Tg",
    title: "AIGC 創作短片",
    sub: "AI Generated · Short Film",
    role: "DIR · AI",
  },
  {
    id: "eI1O_9jBHU0",
    title: "BRING ME YOUR LOVELY",
    sub: "Kolli (NN) · MV · AI Hybrid",
    role: "DIR · DP · AI",
  },
];

const details = [
  { label: "TOOLS / 工具",    value: "Midjourney · ComfyUI · Stable Diffusion · After Effects" },
  { label: "DOMAIN / 領域",   value: "AI Generated Imagery · AI Film · Creative Exploration" },
  { label: "APPROACH / 理念", value: "不是讓 AI 替代創作，而是讓 AI 擴展人眼看不到的視覺邊界" },
];

export default function WorkAIGC() {
  const [playing, setPlaying] = useState(false);
  const { ref: hRef, inView: hIn } = useInView(0.05);
  const { ref: vRef, inView: vIn } = useInView(0.04);

  return (
    <section style={{ background: "#000", minHeight: "100vh", position: "relative" }}>

      {/* Atmospheric background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "20%", left: "30%",
          width: "50vw", height: "40vh",
          background: "radial-gradient(ellipse, rgba(100,40,200,0.08) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "10%",
          width: "30vw", height: "30vh",
          background: "radial-gradient(ellipse, rgba(200,80,80,0.06) 0%, transparent 70%)",
        }} />
      </div>

      {/* Header — sticky */}
      <div ref={hRef} className="relative border-b px-8 md:px-14 pt-20 pb-6"
        style={{
          borderColor: "var(--border)",
          position: "sticky", top: 0, zIndex: 10,
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}>
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono-label text-[9px] tracking-[0.35em] block mb-2"
              style={{ color: "var(--text-3)", opacity: hIn ? 1 : 0, transition: "opacity .8s ease" }}>
              04 — AIGC 創作
            </span>
            <h2 className="font-display leading-none" style={{ fontSize: "clamp(3rem,8vw,10rem)", color: "var(--text)" }}>
              <WordReveal text="AIGC" inView={hIn} baseDelay={0.05} stagger={0.07} />
            </h2>
          </div>
          <p className="font-mono-label text-[9px] text-right hidden md:block pb-2" style={{ color: "var(--text-3)" }}>
            AI Generated Content<br />Creative Exploration
          </p>
        </div>
      </div>

      {/* Body */}
      <div>
        <div ref={vRef} className="grid md:grid-cols-[1.6fr_1fr] border-b"
          style={{ minHeight: "85vh", borderColor: "var(--border)" }}>

          {/* Left: featured video */}
          <div className="relative border-r p-8 md:p-12 flex flex-col justify-center"
            style={{
              borderColor: "var(--border)",
              opacity: vIn ? 1 : 0,
              transform: vIn ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
              transition: "opacity .9s ease, transform .9s cubic-bezier(.16,1,.3,1)",
            }}>

            {/* Player */}
            <div className="relative w-full overflow-hidden cursor-pointer mb-5"
              style={{ aspectRatio: "16/9", borderRadius: 4, background: "#050505" }}
              onClick={() => setPlaying(true)}>
              {!playing ? (
                <div className="absolute inset-0 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://img.youtube.com/vi/${MAIN_VIDEO}/maxresdefault.jpg`} alt="AIGC Reel"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${MAIN_VIDEO}/hqdefault.jpg`; }} />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(80,0,160,0.3) 0%, rgba(0,0,0,0.4) 100%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.18)" }}>
                      <svg className="w-6 h-6 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {["AIGC", "AI FILM", "DIR · DP"].map(t => (
                      <span key={t} className="font-mono-label text-[7px] tracking-widest px-2 py-0.5"
                        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.7)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <iframe className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${MAIN_VIDEO}?autoplay=1&rel=0&modestbranding=1&color=white`}
                  title="AIGC Reel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] font-medium" style={{ color: "var(--text)" }}>
                  我把腦子裡的畫面做出來了
                </p>
                <p className="font-mono-label text-[9px] mt-0.5" style={{ color: "var(--text-3)" }}>
                  AIGC Short Film · AI Generated Imagery
                </p>
              </div>
              {playing && (
                <button onClick={() => setPlaying(false)}
                  className="font-mono-label text-[8px] tracking-widest px-3 py-1.5 shrink-0"
                  style={{ color: "var(--text-3)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  STOP
                </button>
              )}
            </div>
          </div>

          {/* Right: details */}
          <div className="p-8 md:p-12 flex flex-col justify-between"
            style={{
              opacity: vIn ? 1 : 0,
              transition: "opacity .9s ease .15s",
            }}>
            <div className="space-y-7">
              {details.map((d, i) => (
                <div key={d.label}>
                  <AnimLine delay={0.15 + i * 0.12} inView={vIn}>
                    <p className="font-mono-label text-[9px] tracking-[0.3em] mb-2" style={{ color: "var(--text-3)" }}>
                      {d.label}
                    </p>
                  </AnimLine>
                  <AnimLine delay={0.22 + i * 0.12} inView={vIn}>
                    <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-2)" }}>
                      {d.value}
                    </p>
                  </AnimLine>
                </div>
              ))}
            </div>

            {/* Decorative: generative art preview lines */}
            <div className="mt-8 space-y-1.5">
              <p className="font-mono-label text-[9px] tracking-[0.3em] mb-3" style={{ color: "var(--text-3)" }}>
                VISUAL SIGNATURE
              </p>
              {[0.7, 0.5, 0.85, 0.4, 0.6].map((w, i) => (
                <div key={i} className="h-px" style={{
                  width: `${w * 100}%`,
                  background: `linear-gradient(to right, rgba(${100 + i * 30},${50 + i * 20},255,0.4), transparent)`,
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* More AIGC works */}
        <div className="px-8 md:px-14 py-10 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 mb-6">
            <p className="font-mono-label text-[9px] tracking-[0.3em] shrink-0" style={{ color: "var(--text-3)" }}>MORE AIGC WORKS / 更多作品</p>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {extraVideos.map((v, i) => (
              <AnimLine key={v.id} delay={0.1 + i * 0.12} inView={vIn}>
                <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative overflow-hidden mb-3"
                    style={{ aspectRatio: "16/9", borderRadius: 3, background: "#050505" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`; }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(80,0,160,0.25) 0%, rgba(0,0,0,0.3) 100%)" }} />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {["AIGC", "AI"].map(t => (
                        <span key={t} className="font-mono-label text-[7px] tracking-widest px-2 py-0.5"
                          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.7)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.18)" }}>
                        <svg className="w-5 h-5 ml-0.5" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] font-medium" style={{ color: "var(--text)" }}>{v.title}</p>
                  <p className="font-mono-label text-[9px] mt-0.5" style={{ color: "var(--text-3)" }}>{v.sub}</p>
                  <span style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: 7, letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.7)",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "2px 7px", borderRadius: 1,
                    display: "inline-block", marginTop: 8,
                  }}>{v.role}</span>
                </a>
              </AnimLine>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
