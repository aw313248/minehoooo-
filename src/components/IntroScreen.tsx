"use client";

import { useEffect, useState } from "react";

export default function IntroScreen() {
  const [phase, setPhase] = useState<"enter" | "hold" | "leave" | "done">("enter");

  useEffect(() => {
    if (sessionStorage.getItem("intro-v3")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("intro-v3", "1");
    const hold = window.setTimeout(() => setPhase("hold"), 60);
    const leave = window.setTimeout(() => setPhase("leave"), 1250);
    const done = window.setTimeout(() => setPhase("done"), 1800);
    return () => [hold, leave, done].forEach(window.clearTimeout);
  }, []);

  const dismiss = () => {
    if (phase === "done") return;
    setPhase("leave");
    window.setTimeout(() => setPhase("done"), 340);
  };

  if (phase === "done") return null;

  return (
    <button
      type="button"
      aria-label="略過開場"
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999999,
        display: "grid",
        placeItems: "center",
        width: "100%",
        border: 0,
        background: "#070706",
        color: "#eeeae1",
        opacity: phase === "leave" ? 0 : 1,
        transform: phase === "leave" ? "scale(1.025)" : "scale(1)",
        transition: "opacity 240ms cubic-bezier(.23,1,.32,1), transform 320ms cubic-bezier(.23,1,.32,1)",
      }}
    >
      <span style={{ position: "relative", overflow: "hidden", padding: "0.25rem" }}>
        <span style={{
          display: "block",
          fontFamily: "var(--font-bebas), Impact, sans-serif",
          fontSize: "clamp(4.6rem, 16vw, 13rem)",
          lineHeight: 0.8,
          letterSpacing: "-0.025em",
          transform: phase === "enter" ? "translateY(112%)" : "translateY(0)",
          transition: "transform 760ms cubic-bezier(.16,1,.3,1)",
        }}>
          MINEH4O
        </span>
        <span style={{
          position: "absolute",
          right: "0.35rem",
          bottom: 0,
          width: "28%",
          height: 5,
          background: "#ef4b2f",
          transformOrigin: "right center",
          transform: phase === "enter" ? "scaleX(0)" : "scaleX(1)",
          transition: "transform 820ms cubic-bezier(.16,1,.3,1) 180ms",
        }} />
      </span>
      <span style={{
        position: "absolute",
        bottom: "2rem",
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "0.5rem",
        letterSpacing: "0.22em",
        opacity: phase === "enter" ? 0 : 0.38,
        transition: "opacity 500ms ease 350ms",
      }}>
        DIRECTOR · DP · TAICHUNG
      </span>
    </button>
  );
}
