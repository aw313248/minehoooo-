import { ImageResponse } from "next/og";

/**
 * Homepage OG / share preview card.
 *
 * Visual language extends the homepage Hero:
 *   - Black cinematic background
 *   - Tight editorial typography (OSCAR mega title)
 *   - Subtle grain + radial vignette
 *   - High-contrast white on black
 *   - Generous whitespace, sparse copy
 *
 * Required content:
 *   - OSCAR
 *   - DIR. / DP
 *   - AIGC VISUAL CREATOR
 *   - Oscar Lai (signature)
 *
 * Field Notes articles override this with their own per-article OG image.
 */

export const runtime = "edge";
export const alt = "MINEH4O — Oscar Lai · Director · DP · AIGC Visual Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='220' height='220' filter='url(#n)' opacity='1'/></svg>"
  );

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily:
            "system-ui, -apple-system, 'SF Pro Display', 'PingFang TC', sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle radial vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 90% 70% at 50% 55%, transparent 38%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Grain texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `url("${GRAIN_SVG}")`,
            backgroundSize: "200px 200px",
            opacity: 0.10,
            mixBlendMode: "screen",
          }}
        />

        {/* Decorative diagonal accent — top-right corner */}
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 700,
            width: 160,
            height: 1,
            background: "rgba(255,255,255,0.22)",
            transform: "rotate(-20deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 220,
            left: 120,
            width: 220,
            height: 1,
            background: "rgba(255,255,255,0.14)",
            transform: "rotate(-20deg)",
            display: "flex",
          }}
        />

        {/* ── Top row ────────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "56px 72px 0",
          }}
        >
          {/* Top-left: REC + PORTFOLIO 2026 */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "rgba(220,50,50,0.92)",
                boxShadow: "0 0 16px rgba(220,50,50,0.55)",
              }}
            />
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.42em",
                color: "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Portfolio · 2026
            </span>
          </div>

          {/* Top-right: ROLES stack — DIR. / DP / AIGC VISUAL CREATOR */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 12,
                letterSpacing: "0.42em",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              Roles
            </span>
            <span
              style={{
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: "0.04em",
                color: "#fff",
                lineHeight: 1.02,
                textTransform: "uppercase",
              }}
            >
              Dir.
            </span>
            <span
              style={{
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: "0.04em",
                color: "#fff",
                lineHeight: 1.02,
                textTransform: "uppercase",
              }}
            >
              DP
            </span>
            <span
              style={{
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.05,
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              AIGC Visual Creator
            </span>
          </div>
        </div>

        {/* ── Center: OSCAR mega title + signature ───────────────── */}
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            marginTop: -20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 280,
              fontWeight: 900,
              color: "#f5f5f7",
              letterSpacing: "0.02em",
              lineHeight: 0.88,
              textTransform: "uppercase",
            }}
          >
            OSCAR
          </div>

          {/* Signature line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginTop: 28,
            }}
          >
            <div
              style={{
                width: 60,
                height: 1,
                background: "rgba(255,225,140,0.7)",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 56,
                fontFamily:
                  "'Snell Roundhand', 'Brush Script MT', 'Apple Chancery', cursive",
                fontStyle: "italic",
                color: "rgba(255,225,140,0.92)",
                letterSpacing: "0.01em",
                lineHeight: 1,
              }}
            >
              Oscar Lai
            </span>
            <span
              style={{
                fontSize: 16,
                letterSpacing: "0.32em",
                color: "rgba(255,255,255,0.42)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              · 賴明宏
            </span>
          </div>
        </div>

        {/* ── Bottom row ─────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "0 72px 56px",
          }}
        >
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.32em",
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            minehoooo.xyz
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 1,
                background: "rgba(255,255,255,0.22)",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.42em",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Taichung · Taiwan
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
