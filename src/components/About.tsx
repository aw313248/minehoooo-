"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { WordReveal } from "@/components/WordReveal";

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

  return (
    <section id="about" style={{ background: "var(--bg-dark)" }}>
      {/* Section header */}
      <div className="border-t border-b px-6 md:px-10 py-3 flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}>
        <span className="font-mono-label text-[9px] tracking-[0.32em]" style={{ color: "var(--text-3)" }}>
          ABOUT / 關於我
        </span>
        <span className="font-mono-label text-[9px] tracking-[0.32em]" style={{ color: "var(--text-3)" }}>
          MINEH4O
        </span>
      </div>

      {/* Top: identity + bio */}
      <div className="grid md:grid-cols-[1fr_1.7fr] border-b" style={{ borderColor: "var(--border)" }}>

        {/* Left: identity */}
        <div ref={leftRef} className="border-r p-8 md:p-14 flex flex-col gap-8"
          style={{
            borderColor: "var(--border)",
            opacity: leftIn ? 1 : 0,
            transform: leftIn ? "translateY(0) scale(1)" : "translateY(48px) scale(0.97)",
            transition: "opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}>
          {/* Profile photo — full frame, no crop */}
          <div className="mb-6 relative overflow-hidden"
            style={{ width: 160, height: 200, borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)" }}>
            <Image src="/profile.png" alt="minehoooo — Oscar Lai" fill
              className="object-contain" style={{ objectPosition: "center top" }} />
            {/* Frosted glass bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-8"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)", backdropFilter: "blur(2px)" }} />
          </div>

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

          <div className="border-t pt-6 space-y-1.5" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-3" style={{ color: "var(--text-3)" }}>
              AWARDS / 獎項
            </p>
            {[
              "「紅箱子」入圍 2023 放視大賞",
              "《光與景三部曲》獲獎 + 流量",
              "《記住你要快樂》獲獎 + 流量",
              "傳播藝術系 27th 系學會副會長",
            ].map((item) => (
              <p key={item} className="font-mono-label text-[9px] leading-relaxed" style={{ color: "var(--text-3)" }}>
                — {item}
              </p>
            ))}
          </div>
        </div>

        {/* Right: bio */}
        <div ref={bioRef} className="p-8 md:p-14 flex flex-col gap-10">
          {/* Chinese */}
          <div>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-7" style={{ color: "var(--text-3)" }}>
              ZH / 中文介紹
            </p>
            <div className="space-y-4 max-w-lg">
              {bioCn.map((line, i) => (
                <AnimLine key={i} delay={i * 0.1} inView={bioIn}>
                  <p className="text-[15px] leading-loose" style={{ color: "var(--text-2)" }}>{line}</p>
                </AnimLine>
              ))}
            </div>
          </div>

          {/* English */}
          <div className="border-t pt-8" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono-label text-[9px] tracking-[0.3em] mb-7" style={{ color: "var(--text-3)" }}>
              EN / ENGLISH
            </p>
            <div className="space-y-3 max-w-lg">
              {bioEn.map((line, i) => (
                <AnimLine key={i} delay={0.3 + i * 0.1} inView={bioIn}>
                  <p className="text-[13px] leading-loose" style={{ color: "var(--text-3)" }}>{line}</p>
                </AnimLine>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills row */}
      <div ref={skillRef} className="grid md:grid-cols-4 border-b" style={{ borderColor: "var(--border)" }}>
        {skills.map((skill, i) => (
          <div
            key={skill.en}
            className="border-r last:border-r-0 p-6 md:p-8"
            style={{
              borderColor: "var(--border)",
              opacity: skillIn ? 1 : 0,
              transform: skillIn ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
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
