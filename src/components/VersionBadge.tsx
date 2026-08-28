"use client";

/**
 * Tiny version indicator — fixed bottom-left, opacity-fade unless hovered.
 * Shows commit hash + build time so you can verify what version is loaded
 * (kills the "did you push?" question forever).
 */
export default function VersionBadge() {
  const commit = process.env.NEXT_PUBLIC_COMMIT_SHA || "dev";
  const builtAt = process.env.NEXT_PUBLIC_BUILD_TIME || "";

  return (
    <div
      aria-label={`Build ${commit}`}
      className="hidden md:block"
      style={{
        position: "fixed",
        left: 10,
        bottom: 10,
        zIndex: 30,
        padding: "4px 10px",
        borderRadius: 999,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: 9,
        letterSpacing: "0.15em",
        color: "rgba(255,255,255,0.4)",
        opacity: 0.4,
        transition: "opacity .25s ease, color .25s ease",
        pointerEvents: "auto",
        userSelect: "none",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.color = "rgba(255,255,255,0.85)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "0.4";
        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
      }}
      title={`Commit ${commit} · built ${builtAt} UTC`}
    >
      v.{commit}
      {builtAt && (
        <span style={{ opacity: 0.55, marginLeft: 8 }}>· {builtAt}</span>
      )}
    </div>
  );
}
