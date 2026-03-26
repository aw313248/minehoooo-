"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [volume,  setVolume]  = useState(0.35);

  useEffect(() => {
    const audio = new Audio("/I'm Giving Up - Everet Almond.mp3");
    audio.loop   = true;
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

  function handleVolume(v: number) {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }

  const btnStyle: React.CSSProperties = {
    background:    hovered ? "rgba(255,255,255,0.1)"  : "rgba(255,255,255,0.06)",
    borderWidth:   "1px",
    borderStyle:   "solid",
    borderColor:   hovered ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    padding:       "8px 12px",
    cursor:        "pointer",
    transition:    "background .3s ease, border-color .3s ease",
    display:       "flex",
    alignItems:    "center",
    justifyContent:"center",
    gap:           "3px",
  };

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

      {/* Row: volume slider (left) + play button (right) */}
      <div className="flex items-center justify-end gap-2">

        {/* Volume slider — slides in from right, sits left of button */}
        <div
          className="flex items-center gap-2 transition-all duration-300"
          style={{
            opacity:   hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(10px)",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            {volume > 0.5 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
            {volume > 0   && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
          </svg>
          <input
            type="range" min={0} max={1} step={0.01} value={volume}
            onChange={e => handleVolume(Number(e.target.value))}
            className="audio-volume-slider"
            style={{ width: 72, cursor: "pointer" }}
            aria-label="Volume"
          />
        </div>

        {/* Play / Pause button */}
        <button onClick={toggle} aria-label={playing ? "Pause music" : "Play music"} style={btnStyle}>
        {playing ? (
          <span className="flex items-end gap-[2.5px]" style={{ height: 12 }}>
            {[1, 1.6, 0.7, 1.3, 0.9].map((h, i) => (
              <span key={i} style={{
                display:    "block",
                width:      2,
                height:     `${h * 6}px`,
                background: "rgba(255,255,255,0.7)",
                borderRadius: 1,
                animation:  `bar-bounce ${0.7 + i * 0.13}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.1}s`,
              }} />
            ))}
          </span>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="rgba(255,255,255,0.6)">
            <path d="M0 0L10 6L0 12V0Z" />
          </svg>
        )}
      </button>
      </div>{/* end row */}

      <style>{`
        @keyframes bar-bounce {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.0); }
        }
        .audio-volume-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 2px;
          background: rgba(255,255,255,0.15);
          border-radius: 1px;
          outline: none;
        }
        .audio-volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.75);
          cursor: pointer;
          transition: background .2s;
        }
        .audio-volume-slider::-webkit-slider-thumb:hover {
          background: #fff;
        }
        .audio-volume-slider::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.75);
          border: none;
          cursor: pointer;
        }
        .audio-volume-slider::-moz-range-track {
          background: rgba(255,255,255,0.15);
          height: 2px;
          border-radius: 1px;
        }
      `}</style>
    </div>
  );
}
