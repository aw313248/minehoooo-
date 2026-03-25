"use client";

import { useEffect, useState } from "react";

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
        {/* 小鳥 */}
        <h1
          className="font-black text-white leading-none tracking-tight"
          style={{
            fontSize: "clamp(8rem, 22vw, 22rem)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
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
            transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
          }}
        >
          Portfolio · 2026
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-700"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 0.8s",
        }}
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-gray-700 to-transparent" />
      </div>
    </section>
  );
}
