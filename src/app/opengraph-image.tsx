import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MINEH4O — Oscar Lai Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(80,100,180,0.12) 0%, transparent 65%)",
          display: "flex",
        }} />

        {/* Top label */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "rgba(220,50,50,0.85)",
          }} />
          <span style={{
            fontSize: 13, letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.35)",
          }}>
            PORTFOLIO · 2026
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Tagline */}
          <div style={{
            display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap",
          }}>
            {["Director", "DP", "Screenplay", "Photography", "AIGC"].map((tag, i) => (
              <span key={i} style={{
                fontSize: 12, letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "5px 12px",
              }}>{tag}</span>
            ))}
          </div>

          {/* Name */}
          <div style={{
            fontSize: 130, fontWeight: 900, color: "#f5f5f7",
            letterSpacing: "0.02em", lineHeight: 0.88,
            display: "flex",
          }}>
            MINEH4O
          </div>

          {/* Sub name */}
          <div style={{
            fontSize: 20, color: "rgba(255,255,255,0.45)",
            marginTop: 22, letterSpacing: "0.18em",
            display: "flex",
          }}>
            賴明宏 Oscar Lai · Taiwan · Taichung
          </div>
        </div>

        {/* Bottom: URL */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <span style={{
            fontSize: 13, letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.25)",
          }}>
            minehoooo.xyz
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.15)" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)" }}>
              VISUAL PRODUCER
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
