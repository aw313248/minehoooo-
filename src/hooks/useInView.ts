"use client";
import { useEffect, useRef, useState } from "react";

/**
 * @param threshold  0–1 intersection threshold
 * @param once       true = stay visible after first trigger (no exit animation)
 *                   false (default) = in & out animation on every scroll
 */
export function useInView(threshold = 0.1, once = false) {
  const ref     = useRef<HTMLDivElement>(null);
  const onceRef = useRef(once);          // stable ref — never changes dep-array size
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (onceRef.current && entry.isIntersecting) obs.disconnect();
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]); // ← always length-1, no more hook size mismatch

  return { ref, inView };
}
