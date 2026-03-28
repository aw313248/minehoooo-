"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { AnimLine } from "@/components/AnimLine";

const MAIN_VIDEO = "u5WaOT1m670";

const extraVideos = [
  {
    id: "ZbaSBFVP-Tg",
    title: "AIGC Short Film",
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
  { label: "TOOLS",    value: "Midjourney · ComfyUI · Stable Diffusion · After Effects" },
  { label: "DOMAIN",   value: "AI Generated Imagery · AI Film · Creative Exploration" },
  { label: "APPROACH", value: "Not replacing creativity — expanding the visual boundaries the human eye cannot reach" },
];

export default function WorkAIGC() {
  const [playing, setPlaying] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const { ref: vRef, inView: vIn } = useInView(0.04);
  const { ref: moreRef, inView: moreIn } = useInView(0.04);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    const t1 = setTimeout(() => setHeroLoaded(true), 150);
    const t2 = setTimeout(() => setIframeReady(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <section style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── CINEMATIC HERO — fullscreen AIGC featured ── */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

        {/* Background: thumbnail always, iframe on desktop after delay */}
        {!playing && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${MAIN_VIDEO}/maxresdefault.jpg`}
              alt="AIGC background"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", filter: "brightness(0.5)" }}
              onError={e => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${MAIN_VIDEO}/hqdefault.jpg`; }}
            />
            {!isMobile && iframeReady && (
              <div style={{ position: "absolute", inset: "-12%", width: "124%", height: "124%", pointerEvents: "none" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${MAIN_VIDEO}?autoplay=1&mute=1&controls=0&loop=1&playlist=${MAIN_VIDEO}&rel=0&modestbranding=1&playsinline=1&start=3`}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; encrypted-media"
                  title="AIGC background"
                />
              </div>
            )}
          </>
        )}

        {/* Full player when playing */}
        {playing && (
          <div style={{ position: "absolute", inset: 0, zIndex: 15 }}>
            <iframe className="w-full h-full"
              src={`https://www.youtube.com/embed/${MAIN_VIDEO}?autoplay=1&rel=0&modestbranding=1&color=white`}
              title="AIGC Reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen style={{ border: "none" }}
            />
          </div>
        )}

        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.4) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />
        {/* Purple tint */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(80,30,160,0.18) 0%, transparent 70%)" }} />

        {/* Top: cinematic section header */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          padding: "2rem 3rem 1.4rem",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
          opacity: heroLoaded ? 1 : 0,
          transition: "opacity .6s ease",
        }}>
          {/* Gradient rule */}
          <div style={{ height: 1, background: "linear-gradient(to right, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 60%, transparent)", marginBottom: 10 }} />
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span className="font-display leading-none" style={{ fontSize: "clamp(1.6rem,3vw,2.8rem)", color: "rgba(255,255,255,0.06)", letterSpacing: "0.02em" }}>04</span>
              <span className="font-display leading-none" style={{ fontSize: "clamp(1rem,2vw,1.8rem)", color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em" }}>AIGC</span>
            </div>
            <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.32em", color: "rgba(255,255,255,0.22)" }}>AI GENERATED · HYBRID</span>
          </div>
        </div>

        {/* Bottom left: title + info */}
        {!playing && (
          <div style={{ position: "absolute", bottom: "3.5rem", left: "3rem", right: "3rem", zIndex: 10 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity .7s ease .1s, transform .7s cubic-bezier(.16,1,.3,1) .1s",
            }}>
              <span style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: 7, letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.7)",
                background: "rgba(80,30,160,0.25)",
                border: "1px solid rgba(120,60,220,0.4)",
                padding: "2px 7px", borderRadius: 1,
              }}>DIR · DP · AI</span>
              <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.28em", color: "rgba(255,255,255,0.35)" }}>
                AI GENERATED · SHORT FILM
              </span>
            </div>

            <h2 className="font-display leading-none" style={{
              fontSize: "clamp(3.2rem, 10vw, 13rem)",
              color: "var(--text)", letterSpacing: "0.01em",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateX(0)" : "translateX(-28px)",
              transition: "opacity .9s cubic-bezier(.16,1,.3,1) .18s, transform .9s cubic-bezier(.16,1,.3,1) .18s",
            }}>
              AIGC
            </h2>

            <p className="font-mono-label" style={{
              fontSize: 10, letterSpacing: "0.18em", marginTop: 14,
              color: "rgba(255,255,255,0.45)",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateX(0)" : "translateX(-16px)",
              transition: "opacity .7s ease .32s, transform .7s cubic-bezier(.16,1,.3,1) .32s",
            }}>
              Created by <span style={{ color: "rgba(255,255,255,0.72)" }}>MINEH4O / Oscar Lai</span>
            </p>
          </div>
        )}

        {/* Bottom right: play / stop */}
        <div style={{ position: "absolute", bottom: "3.5rem", right: "3rem", zIndex: 10,
          opacity: heroLoaded ? 1 : 0, transition: "opacity .7s ease .5s" }}>
          {!playing ? (
            <button onClick={() => setPlaying(true)}
              className="group flex items-center gap-2.5"
              style={{
                background: "rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.15)", padding: "10px 20px", cursor: "pointer",
                transition: "background .3s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.13)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
              <span className="font-mono-label" style={{ fontSize: 8, letterSpacing: "0.3em", color: "var(--text)" }}>PLAY FULL</span>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>↗</span>
            </button>
          ) : (
            <button onClick={() => setPlaying(false)}
              className="font-mono-label"
              style={{ fontSize: 8, letterSpacing: "0.3em", color: "var(--text-3)",
                border: "1px solid rgba(255,255,255,0.12)", padding: "8px 16px", background: "none", cursor: "pointer" }}>
              ✕ STOP
            </button>
          )}
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "3.5rem", left: "50%", transform: "translateX(-50%)",
          zIndex: 10, opacity: heroLoaded ? 1 : 0, transition: "opacity .7s ease .7s",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        }}>
          <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.12)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.6)", animation: "slideDown 1.6s ease-in-out infinite" }} />
          </div>
          <span className="font-mono-label" style={{ fontSize: 7, letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)" }}>SCROLL</span>
        </div>
      </div>

      {/* ── DETAILS + EXTRA WORKS ── */}
      <div ref={vRef} className="grid md:grid-cols-[1fr_1fr] border-b"
        style={{ borderColor: "var(--border)" }}>

        {/* Left: approach details */}
        <div className="border-r p-8 md:p-12 flex flex-col justify-between"
          style={{
            borderColor: "var(--border)",
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

          {/* Visual signature lines */}
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

        {/* Right: more AIGC works */}
        <div ref={moreRef} className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <p className="font-mono-label text-[9px] tracking-[0.3em] shrink-0" style={{ color: "var(--text-3)" }}>MORE AIGC WORKS</p>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {extraVideos.map((v, i) => (
              <AnimLine key={v.id} delay={0.1 + i * 0.14} inView={moreIn}>
                <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative overflow-hidden mb-3"
                    style={{ aspectRatio: "16/9", borderRadius: 3, background: "#050505" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} alt={v.title}
                      loading="lazy"
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
