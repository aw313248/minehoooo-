"use client";

import { useEffect } from "react";

const TITLES = [
  "MINEH4O — 賴明宏 Oscar Lai | Director · DP · Visual Producer",
  "About — MINEH4O",
  "Photography — MINEH4O",
  "Video — MINEH4O",
  "AIGC — MINEH4O",
  "Contact — MINEH4O",
];

export default function PageTitle() {
  useEffect(() => {
    const handler = (e: Event) => {
      const page = (e as CustomEvent<number>).detail;
      document.title = TITLES[page] ?? TITLES[0];
    };
    window.addEventListener("pagechange", handler);
    return () => window.removeEventListener("pagechange", handler);
  }, []);

  return null;
}
