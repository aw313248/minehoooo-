"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";

const QUICK_LINKS = [
  { page: 2, zh: "攝影", en: "PHOTO" },
  { page: 3, zh: "影像", en: "VIDEO" },
  { page: 4, zh: "AIGC", en: "AIGC" },
] as const;

function goto(page: number) {
  window.dispatchEvent(new CustomEvent("navto", { detail: page }));
}

export default function MobileNav() {
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const handler = (e: Event) => {
      const p = (e as CustomEvent<number>).detail;
      setPage(p);
      setVisible(p > 0);
    };
    window.addEventListener("pagechange", handler);
    return () => window.removeEventListener("pagechange", handler);
  }, []);

  return (
    <nav aria-label={lang === "zh" ? "作品分類快捷導覽" : "Work category shortcuts"}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
        background: "rgba(0,0,0,0.96)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "8px 12px calc(8px + env(safe-area-inset-bottom))",
      }}>
      <div className="grid grid-cols-4 gap-1 w-full max-w-md mx-auto">
        {QUICK_LINKS.map(item => {
          const active = page === item.page;
          return (
            <button key={item.page} onClick={() => goto(item.page)}
              aria-current={active ? "page" : undefined}
              className="font-mono-label flex min-h-11 items-center justify-center rounded-full transition-colors"
              style={{
                background: active ? "rgba(255,255,255,0.12)" : "transparent",
                border: "none",
                color: active ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
                fontSize: 10,
                letterSpacing: lang === "zh" ? "0.16em" : "0.12em",
              }}>
              {lang === "zh" ? item.zh : item.en}
            </button>
          );
        })}
        <Link href="/works"
          className="font-mono-label flex min-h-11 items-center justify-center rounded-full"
          style={{
            color: "rgba(255,255,255,0.72)",
            textDecoration: "none",
            fontSize: 10,
            letterSpacing: lang === "zh" ? "0.12em" : "0.08em",
          }}>
          {lang === "zh" ? "全部作品" : "ALL WORKS"}
        </Link>
      </div>
    </nav>
  );
}
