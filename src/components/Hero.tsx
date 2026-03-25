"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] bg-repeat" />

      {/* Glow behind text */}
      <div
        className="absolute w-[600px] h-[300px] rounded-full blur-[120px] bg-white/5 transition-opacity duration-1000"
        style={{ opacity: visible ? 1 : 0 }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center select-none">
        {/* boom image */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1) rotate(0deg)" : "scale(0.4) rotate(-15deg)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className="flex justify-center mb-6"
        >
          <div
            style={{
              animation: visible ? "float 3s ease-in-out infinite" : "none",
            }}
          >
            <Image
              src="/boom.png"
              alt="boom"
              width={200}
              height={200}
              className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              priority
            />
          </div>
        </div>

        {/* 小鳥 */}
        <h1
          className="font-black text-white leading-none tracking-tight"
          style={{
            fontSize: "clamp(8rem, 22vw, 22rem)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
          }}
        >
          小鳥
        </h1>

        {/* Subtitle */}
        <p
          className="text-gray-500 text-sm md:text-base tracking-[0.4em] uppercase mt-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s",
          }}
        >
          Portfolio · 2026
        </p>

        {/* Watch button */}
        <div
          className="mt-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease 0.7s, transform 0.9s ease 0.7s",
          }}
        >
          <a
            href="/video"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm text-white/70 hover:text-white transition-all duration-300 group"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors"
            >
              <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            觀看影片
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-700"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-gray-700 to-transparent" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}
