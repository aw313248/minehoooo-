import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0 2rem 0 3rem", overflow: "hidden", position: "relative" }}>

      {/* Watermark */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-end",
        pointerEvents: "none", overflow: "hidden",
      }}>
        <span style={{
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: "clamp(18rem, 55vw, 80rem)",
          color: "rgba(255,255,255,0.016)",
          letterSpacing: "0.02em",
          lineHeight: 1,
          userSelect: "none",
          paddingRight: "2%",
        }}>
          404
        </span>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: 9, letterSpacing: "0.38em", color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>
          PAGE NOT FOUND
        </p>
        <h1 style={{
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: "clamp(4rem, 14vw, 16rem)",
          color: "#f5f5f7",
          lineHeight: 1,
          letterSpacing: "0.01em",
          marginBottom: "1.5rem",
          animation: "textGlitch 5s ease-in-out infinite",
        }}>
          LOST FRAME
        </h1>
        <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", marginBottom: "3rem", maxWidth: 320, lineHeight: 1.8 }}>
          這個畫面不存在。<br />
          This shot doesn&apos;t exist in the edit.
        </p>
        <Link href="/"
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: 9, letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "10px 22px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(16px)",
            textDecoration: "none",
            display: "inline-block",
            transition: "all .3s ease",
          }}>
          ← BACK TO PORTFOLIO
        </Link>
      </div>

      {/* Bottom label */}
      <div style={{ position: "absolute", bottom: "2rem", left: "3rem", right: "3rem", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)" }}>
          MINEH4O
        </span>
        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)" }}>
          minehoooo.xyz
        </span>
      </div>
    </main>
  );
}
