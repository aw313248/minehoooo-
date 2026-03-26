"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const bioCn = [
  "我叫明宏，英文名 Oscar，高中以前，我還說不清楚這個名字對我有什麼意義",
  "從國中接觸 YouTube 開始，剪輯、特效、配樂、說故事——全靠自學，這些累積奠定了我對影像最早的敏感度",
  "上了大學才真正認識「電影」，在故事結構不斷被拆解、重組的過程中，反覆體會那種「原來，我怎麼沒發現？！」的衝擊感，那種既視感讓我對影像的動力越來越強",
  "偶爾理性地像個木頭，鑽研每顆鏡頭的調度；偶爾感性到在電影前面無表情地讓淚水流過",
  "也曾任系學會副會長——在不同立場間來回調度，學會從多個角度理解人與衝突",
  "透過畫面說故事，這件事讓我熱血，現在還是",
];

const bioEn = [
  "My name is Oscar, or Ming-Hong — before high school, I had no idea what weight that name would carry",
  "It started with YouTube in middle school — editing, effects, sound design, storytelling, all self-taught — that obsession laid the foundation for everything I do now",
  "University brought cinema — real cinema — stories taken apart and reassembled until the seams show, every collision brought the same feeling: 'Wait — how did I miss that?' and every time, it made the drive stronger",
  "Equal parts analytical and emotional — sometimes the most methodical person in the room mapping every lens movement frame by frame, sometimes sitting stone-faced in a theater as tears run down silently",
  "Served as VP of my department's student council — learning to navigate between perspectives, translate competing interests, and turn friction into understanding",
  "Using images to tell stories: still the most electric thing I know how to do",
];

const skills = [
  { en: "Visual Design",          zh: "視覺設計",    tools: "Photoshop · Illustrator" },
  { en: "AIGC Creation",          zh: "AIGC 創作",   tools: "Midjourney · ComfyUI · Stable Diffusion" },
  { en: "Video Post-Production",  zh: "影片後製",    tools: "DaVinci Resolve · Premiere Pro" },
  { en: "Photography",            zh: "攝影",        tools: "Commercial · Event · Wedding · Motion" },
];

function AnimLine({ children, delay, inView }: { children: React.ReactNode; delay: number; inView: boolean }) {
  return (
    <div style={{ overflow: "hidden", paddingBottom: "2px" }}>
      <div style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}>
        {children}
      </div>
    </div>
  );
}

export default function About() {
  const { ref: leftRef,  inView: leftIn  } = useInView(0.07, true);
  const { ref: bioRef,   inView: bioIn   } = useInView(0.05, true);
  const { ref: skillRef, inView: skillIn } = useInView(0.05, true);
  const { ref: skRowRef, inView: skRowIn } = useInView(0.05, true);

  return (
    <section id="about" style={{ background: "var(--bg-dark)" }}>
      {/* Section header */}
      <div className="border-t border-b px-6 md:px-10 py-3 flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}>
        <span className="font-mono-label text-[9px] tracking-[0.32em]" style={{ color: "var(--text-3)" }}>
          01 — ABOUT / 關於我
        </span>
        <span className="font-mono-label text-[9px] tracking-[0.32em]" style={{ color: "var(--text-3)" }}>
          MINEH4O
        </span>
      </div>

      {/* Top: identity (left) + large photo (right) */}
      <div className="grid md:grid-cols-[1.1fr_0.9fr] border-b" style={{ borderColor: "var(--border)" }}>

        {/* Left: identity */}
        <div ref={leftRef} className="border-r p-8 md:p-14 flex flex-col gap-8"
          style={{
            borderColor: "var(--border)",
            opacity: leftIn ? 1 : 0,
            transform: leftIn ? "translateY(0) scale(1)" : "translateY(48px) scale(0.97)",
            transition: "opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}>

          <div>
            <h2 className="font-display leading-none" style={{ fontSize: "clamp(3.5rem, 7vw, 8rem)", color: "var(--text)" }}>
              OSCAR
            </h2>
            <p className="font-mono-label text-[11px] tracking-[0.22em] mt-1.5" style={{ color: "var(--text-2)" }}>
              賴明宏 Lie Ming-Hong
            </p>
            <p className="font-mono-label text-[9px] tracking-[0.22em] mt-0.5" style={{ color: "var(--text-3)" }}>
              @minehoooo
            </p>
          </div>

          <div className="space-y-5">
            {[
              { label: "ROLE / 職稱",       value: "Director · DP · Screenplay\n導演 · 攝影師 · 編劇" },
              { label: "EDUCATION / 學歷",  value: "朝陽科技大學\n傳播藝術系 · 電影組" },
              { label: "BASED IN / 所在地", value: "Taiwan · Taichung" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono-label text-[9px] tracking-[0.3em] mb-1.5" style={{ color: "var(--text-3)" }}>
                  {item.label}
                </p>
                <p className="font-mono-label text-[10px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text-2)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-6 space-y-2" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-3" style={{ color: "var(--text-3)" }}>
              SELECTED CREDITS / 部分合作
            </p>
            {[
              { text: "陳芳語 Kimberley Chen — MV COLOR",  accent: true },
              { text: "陳卓 Jon Chen 光與景三部曲 — DIR · DP", accent: true },
              { text: "Kolli — MV DIR · DP",              accent: true },
              { text: "多位知名音樂人 MV 攝影 · 調色" },
              { text: "「紅箱子」入圍 2023 放視大賞" },
              { text: "傳播藝術系 27th 系學會副會長" },
            ].map((item) => (
              <p key={item.text} className="font-mono-label text-[9px] leading-relaxed"
                style={{ color: item.accent ? "var(--text-2)" : "var(--text-3)" }}>
                — {item.text}
              </p>
            ))}
          </div>
        </div>

        {/* Right: large profile photo */}
        <div ref={bioRef} className="relative overflow-hidden"
          style={{
            minHeight: "60vh",
            opacity: bioIn ? 1 : 0,
            transform: bioIn ? "scale(1)" : "scale(1.03)",
            transition: "opacity 1.1s ease .1s, transform 1.4s cubic-bezier(.16,1,.3,1) .1s",
          }}>
          <Image
            src="/profile.png"
            alt="minehoooo — Oscar Lai"
            fill
            className="object-cover"
            style={{ objectPosition: "center top" }}
          />
          {/* Subtle left fade to blend with border */}
          <div className="absolute inset-y-0 left-0 w-12 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--bg-dark), transparent)" }} />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to top, var(--bg-dark), transparent)" }} />
          {/* Name tag at bottom */}
          <div className="absolute bottom-6 left-6">
            <p className="font-mono-label text-[8px] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.4)" }}>
              MINEH4O · @minehoooo
            </p>
          </div>
        </div>
      </div>

      {/* Bio — full width below */}
      <div ref={skillRef} className="grid md:grid-cols-2 border-b" style={{ borderColor: "var(--border)" }}>
        {/* Chinese */}
        <div className="border-r p-8 md:p-12" style={{ borderColor: "var(--border)" }}>
          <p className="font-mono-label text-[9px] tracking-[0.3em] mb-7" style={{ color: "var(--text-3)" }}>
            ZH / 中文介紹
          </p>
          <div className="space-y-4">
            {bioCn.map((line, i) => (
              <AnimLine key={i} delay={i * 0.08} inView={skillIn}>
                <p className="text-[14px] leading-loose" style={{ color: "var(--text-2)" }}>{line}</p>
              </AnimLine>
            ))}
          </div>
        </div>
        {/* English */}
        <div className="p-8 md:p-12">
          <p className="font-mono-label text-[9px] tracking-[0.3em] mb-7" style={{ color: "var(--text-3)" }}>
            EN / ENGLISH
          </p>
          <div className="space-y-3">
            {bioEn.map((line, i) => (
              <AnimLine key={i} delay={0.1 + i * 0.08} inView={skillIn}>
                <p className="text-[13px] leading-loose" style={{ color: "var(--text-3)" }}>{line}</p>
              </AnimLine>
            ))}
          </div>
        </div>
      </div>

      {/* Skills row */}
      <div ref={skRowRef} className="grid md:grid-cols-4 border-b" style={{ borderColor: "var(--border)" }}>
        {skills.map((skill, i) => (
          <div
            key={skill.en}
            className="border-r last:border-r-0 p-6 md:p-8"
            style={{
              borderColor: "var(--border)",
              opacity: skRowIn ? 1 : 0,
              transform: skRowIn ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
              transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
            }}
          >
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-3" style={{ color: "var(--text-3)" }}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="text-[15px] font-medium mb-0.5" style={{ color: "var(--text)" }}>{skill.en}</h3>
            <p className="text-[13px] mb-3" style={{ color: "var(--text-2)" }}>{skill.zh}</p>
            <p className="font-mono-label text-[9px] leading-relaxed tracking-wider" style={{ color: "var(--text-3)" }}>
              {skill.tools}
            </p>
          </div>
        ))}
      </div>

      {/* Domain bar */}
      <div className="px-6 md:px-10 py-3 flex items-center gap-2" style={{ background: "var(--bg-card)" }}>
        <span className="font-mono-label text-[9px] tracking-[0.3em]" style={{ color: "var(--text-3)" }}>
          MAIN DOMAIN /
        </span>
        <span className="font-mono-label text-[9px] tracking-[0.18em]" style={{ color: "var(--text-2)" }}>
          Video Production & Post-Production · 影像製作與後製作業
        </span>
      </div>
    </section>
  );
}
