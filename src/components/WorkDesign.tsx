"use client";

import { useInView } from "@/hooks/useInView";
import { AnimLine } from "@/components/AnimLine";
import Image from "next/image";

const ALBUM = {
  src: "/design/web/album-yiqianzuoshan.jpg",
  title: "一千座山一千條河",
  titleEn: "A Thousand Mountains",
  client: "陳卓 Jon Chen",
  year: "2025",
  role: "ALBUM COVER DESIGN",
  desc: "Album artwork for Jon Chen's debut album — a visual translation of vastness and solitude.",
};

const projects = [
  {
    slug: "petit",
    title: "petit 專訪",
    titleEn: "Petit Interview",
    sub: "Editorial · Portrait",
    year: "2025",
    role: "DP · RETOUCHING",
    images: ["/design/web/petit-1.jpg", "/design/web/petit-2.jpg", "/design/web/petit-3.jpg"],
    portrait: true,
  },
  {
    slug: "probeer",
    title: "Probeer",
    titleEn: "Probeer",
    sub: "Editorial · Brand",
    year: "2025",
    role: "DP · RETOUCHING",
    images: ["/design/web/probeer-1.jpg", "/design/web/probeer-2.jpg"],
    portrait: false,
  },
  {
    slug: "park2",
    title: "PARK2 國際親吻日",
    titleEn: "International Kissing Day",
    sub: "Event · Campaign",
    year: "2025",
    role: "DP · RETOUCHING",
    images: ["/design/web/park2-1.jpg", "/design/web/park2-2.jpg", "/design/web/park2-3.jpg"],
    portrait: false,
  },
  {
    slug: "wedding",
    title: "婚攝紀實",
    titleEn: "Wedding Documentary",
    sub: "Wedding · Portrait",
    year: "2024",
    role: "DP · RETOUCHING",
    images: ["/design/web/wedding-1.jpg", "/design/web/wedding-2.jpg"],
    portrait: false,
  },
];

function ProjectCard({ p, delay, inView }: { p: typeof projects[0]; delay: number; inView: boolean }) {
  return (
    <AnimLine delay={delay} inView={inView}>
      <div className="group">
        {/* Image grid */}
        <div
          className="grid gap-1 mb-4"
          style={{ gridTemplateColumns: p.images.length === 3 ? "1fr 1fr 1fr" : p.portrait ? "1fr 1fr" : "1fr 1fr" }}
        >
          {p.images.map((src, i) => (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{ aspectRatio: p.portrait ? "2/3" : "3/2", background: "#0a0a0a" }}
            >
              <Image
                src={src}
                alt={`${p.title} ${i + 1}`}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              {/* Subtle dark overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(0,0,0,0.12)" }}
              />
            </div>
          ))}
        </div>

        {/* Info row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[14px] font-medium leading-tight" style={{ color: "var(--text)" }}>
              {p.title}
            </p>
            <p className="font-mono-label text-[9px] mt-0.5" style={{ color: "var(--text-3)" }}>
              {p.sub} · {p.year}
            </p>
          </div>
          <span
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 7, letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.14)",
              padding: "2px 7px", borderRadius: 1,
              whiteSpace: "nowrap", flexShrink: 0, marginTop: 2,
            }}
          >
            {p.role}
          </span>
        </div>
      </div>
    </AnimLine>
  );
}

export default function WorkDesign() {
  const { ref: heroRef, inView: heroIn } = useInView(0.04);
  const { ref: gridRef, inView: gridIn } = useInView(0.04);

  return (
    <section style={{ background: "#000" }}>

      {/* ── ALBUM COVER FEATURED ── */}
      <div ref={heroRef} className="grid md:grid-cols-2 border-b" style={{ borderColor: "var(--border)" }}>

        {/* Left: album image */}
        <div
          className="relative overflow-hidden border-r"
          style={{ borderColor: "var(--border)", minHeight: 400 }}
        >
          <Image
            src={ALBUM.src}
            alt={ALBUM.title}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
            priority={false}
            style={{
              transition: "transform 1.2s cubic-bezier(.16,1,.3,1)",
              transform: heroIn ? "scale(1.0)" : "scale(1.06)",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
            }}
          />
          {/* Tag */}
          <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 2 }}>
            <span
              className="font-mono-label text-[7px] tracking-widest px-2 py-1"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              ALBUM COVER
            </span>
          </div>
        </div>

        {/* Right: album info */}
        <div
          className="p-8 md:p-12 flex flex-col justify-between"
          style={{
            opacity: heroIn ? 1 : 0,
            transition: "opacity .9s ease .2s",
          }}
        >
          {/* Section header */}
          <div>
            <div style={{ height: 1, background: "linear-gradient(to right, rgba(255,255,255,0.14), transparent)", marginBottom: 10 }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: "2.5rem" }}>
              <span className="font-display" style={{ fontSize: "clamp(1.4rem,2.5vw,2.4rem)", color: "rgba(255,255,255,0.06)", letterSpacing: "0.02em" }}>05</span>
              <span className="font-display" style={{ fontSize: "clamp(0.9rem,1.6vw,1.5rem)", color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}>DESIGN</span>
            </div>

            <AnimLine delay={0.25} inView={heroIn}>
              <h2 className="font-display leading-[1.05]" style={{ fontSize: "clamp(2rem,5vw,4.5rem)", color: "var(--text)", letterSpacing: "0.01em" }}>
                {ALBUM.title}
              </h2>
            </AnimLine>
            <AnimLine delay={0.35} inView={heroIn}>
              <p className="font-mono-label text-[9px] tracking-[0.25em] mt-2" style={{ color: "var(--text-3)" }}>
                {ALBUM.titleEn}
              </p>
            </AnimLine>
          </div>

          <div className="space-y-6 mt-8">
            <AnimLine delay={0.45} inView={heroIn}>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-2)" }}>
                {ALBUM.desc}
              </p>
            </AnimLine>

            {[
              { label: "CLIENT", value: ALBUM.client },
              { label: "ROLE",   value: ALBUM.role },
              { label: "YEAR",   value: ALBUM.year },
            ].map((row, i) => (
              <AnimLine key={row.label} delay={0.52 + i * 0.08} inView={heroIn}>
                <div className="flex items-baseline gap-3">
                  <p className="font-mono-label text-[9px] tracking-[0.3em] w-16 shrink-0" style={{ color: "var(--text-3)" }}>
                    {row.label}
                  </p>
                  <p className="text-[12px]" style={{ color: "var(--text-2)" }}>{row.value}</p>
                </div>
              </AnimLine>
            ))}
          </div>
        </div>
      </div>

      {/* ── PHOTOGRAPHY PROJECTS GRID ── */}
      <div ref={gridRef} className="p-8 md:p-12">
        <div className="flex items-center gap-3 mb-8">
          <p className="font-mono-label text-[9px] tracking-[0.3em] shrink-0" style={{ color: "var(--text-3)" }}>
            EDITORIAL · PHOTOGRAPHY
          </p>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} delay={0.08 + i * 0.12} inView={gridIn} />
          ))}
        </div>
      </div>

    </section>
  );
}
