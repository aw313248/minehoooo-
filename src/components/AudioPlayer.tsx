"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const audio = new Audio("/I'm Giving Up - Everet Almond.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <div
      className="fixed z-50"
      style={{ bottom: "5.5rem", right: "1.5rem" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Track label */}
      <div
        className="font-mono-label text-[8px] tracking-[0.2em] text-right mb-2 transition-all duration-300"
        style={{
          color: "rgba(255,255,255,0.3)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          whiteSpace: "nowrap",
        }}
      >
        I&apos;M GIVING UP — EVERET ALMOND
      </div>

      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="flex items-center justify-center gap-[3px]"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "8px 12px",
          cursor: "pointer",
          transition: "all .3s ease",
          ...(hovered && { background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }),
        }}
      >
        {playing ? (
          /* Animated bars */
          <span className="flex items-end gap-[2.5px]" style={{ height: 12 }}>
            {[1, 1.6, 0.7, 1.3, 0.9].map((h, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 2,
                  height: `${h * 6}px`,
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: 1,
                  animation: `bar-bounce ${0.7 + i * 0.13}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </span>
        ) : (
          /* Play icon */
          <svg width="10" height="12" viewBox="0 0 10 12" fill="rgba(255,255,255,0.6)">
            <path d="M0 0L10 6L0 12V0Z" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes bar-bounce {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.0); }
        }
      `}</style>
    </div>
  );
}
