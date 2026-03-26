"use client";

interface Props {
  text: string;
  inView: boolean;
  baseDelay?: number;
  className?: string;
  stagger?: number;
}

/**
 * Apple-style word-by-word reveal from below.
 * Each word slides up out of its overflow:hidden wrapper.
 */
export function WordReveal({ text, inView, baseDelay = 0, className, stagger = 0.07 }: Props) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom" }}
        >
          <span
            style={{
              display: "inline-block",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0) skewY(0deg)" : "translateY(110%) skewY(3deg)",
              transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}s,
                           transform 0.75s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Character-by-character reveal with blur — for hero/display headings
 */
export function CharReveal({ text, inView, baseDelay = 0, className, stagger = 0.045 }: Props) {
  const chars = text.split("");
  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) skewY(0deg)" : "translateY(30%) skewY(4deg)",
            filter: inView ? "blur(0)" : "blur(5px)",
            transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}s,
                         transform 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}s,
                         filter 0.5s ease ${baseDelay + i * stagger}s`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
