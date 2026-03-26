"use client";

/** Shared AnimLine — slides content up from a masked clip, triggered by inView */
export function AnimLine({
  children,
  delay,
  inView,
}: {
  children: React.ReactNode;
  delay: number;
  inView: boolean;
}) {
  return (
    <div style={{ overflow: "hidden", paddingBottom: 2 }}>
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(34px)",
          transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
