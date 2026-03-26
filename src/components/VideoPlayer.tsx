"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${playing ? 1 : 0}&rel=0&modestbranding=1&color=white&iv_load_policy=3`;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[160px]"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.5s ease",
          }}
        />
      </div>

      {/* Back button */}
      <div
        className="absolute top-8 left-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-16px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl">

        {/* Title area */}
        <div
          className="mb-8 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}
        >
          <p className="text-gray-600 text-xs tracking-[0.3em] uppercase mb-3">Featured Video</p>
          <h1 className="text-white text-3xl md:text-4xl font-semibold tracking-tight">
            精選影片
          </h1>
        </div>

        {/* Player container */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1) translateY(0)" : "scale(0.97) translateY(32px)",
            transition: "opacity 0.9s ease 0.3s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          {/* Outer glow ring */}
          <div className="relative rounded-[20px] p-[1px] bg-gradient-to-b from-white/10 to-white/[0.03]"
            style={{
              boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            {/* Frosted glass header bar */}
            <div className="bg-[#1a1a1a] rounded-t-[19px] px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div className="flex-1 flex justify-center">
                <div className="bg-[#2a2a2a] rounded-md px-4 py-1 text-gray-500 text-xs w-64 text-center truncate">
                  youtube.com/watch?v={videoId}
                </div>
              </div>
              <div className="w-16" />
            </div>

            {/* Video */}
            <div className="relative bg-black rounded-b-[19px] overflow-hidden" style={{ paddingTop: "56.25%" }}>
              {!playing ? (
                /* Thumbnail + Play button */
                <div className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                  onClick={() => setPlaying(true)}
                >
                  {/* YouTube thumbnail */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                  {/* Play button */}
                  <div
                    className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    }}
                  >
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={embedUrl}
                  title="Video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div
          className="mt-8 flex items-center justify-center gap-6 text-gray-600 text-sm"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.7s",
          }}
        >
          <button
            onClick={() => setPlaying(!playing)}
            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
          >
            {playing ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                暫停
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                播放
              </>
            )}
          </button>
          <span>·</span>
          <a
            href={`https://youtu.be/${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors flex items-center gap-1"
          >
            在 YouTube 開啟
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}
