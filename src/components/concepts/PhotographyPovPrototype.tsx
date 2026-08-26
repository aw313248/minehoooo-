"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { photographyPovWorks } from "@/data/photographyPov";
import styles from "@/app/concepts/photography-pov/photography-pov.module.css";

const REVEAL_END = 0.22;
const CAMERA_END = 0.38;
const SELECTOR_START = 0.4;
const SELECTOR_END = 0.88;

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function workIndexFromProgress(progress: number, count: number) {
  const local = Math.max(
    0,
    Math.min(0.999, (progress - SELECTOR_START) / (SELECTOR_END - SELECTOR_START)),
  );

  return Math.min(count - 1, Math.floor(local * count));
}

export default function PhotographyPovPrototype() {
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const activeIndex = workIndexFromProgress(progress, photographyPovWorks.length);
  const activeWork = photographyPovWorks[activeIndex];
  const revealProgress = clamp(progress / REVEAL_END);
  const cameraProgress = clamp((progress - REVEAL_END) / (CAMERA_END - REVEAL_END));
  const selectorProgress = clamp((progress - SELECTOR_START) / 0.14);
  const isExpanded = progress > SELECTOR_END;
  const flashOpacity = clamp(1 - Math.abs(progress - CAMERA_END) / 0.025) * 0.88;

  const updateProgress = useCallback(() => {
    const root = scrollRootRef.current;
    const section = sectionRef.current;

    if (!root || !section) return;

    const sectionRect = section.getBoundingClientRect();
    const viewportHeight = root.clientHeight;
    const scrollableDistance = Math.max(1, sectionRect.height - viewportHeight);
    setProgress(clamp(-sectionRect.top / scrollableDistance));
  }, []);

  useEffect(() => {
    const root = scrollRootRef.current;
    if (!root) return;

    const scheduleProgressUpdate = () => {
      if (animationFrameRef.current !== null) return;
      animationFrameRef.current = requestAnimationFrame(() => {
        animationFrameRef.current = null;
        updateProgress();
      });
    };

    scheduleProgressUpdate();
    root.addEventListener("scroll", scheduleProgressUpdate, { passive: true });
    window.addEventListener("resize", scheduleProgressUpdate);

    return () => {
      root.removeEventListener("scroll", scheduleProgressUpdate);
      window.removeEventListener("resize", scheduleProgressUpdate);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [updateProgress]);

  const selectWork = useCallback((index: number) => {
    const root = scrollRootRef.current;
    const section = sectionRef.current;
    if (!root || !section) return;

    const interval = (SELECTOR_END - SELECTOR_START) / photographyPovWorks.length;
    const targetProgress = SELECTOR_START + interval * (index + 0.5);
    const distance = Math.max(1, section.clientHeight - root.clientHeight);

    root.scrollTo({
      top: section.offsetTop + distance * targetProgress,
      behavior: "smooth",
    });
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!event.key.startsWith("Arrow")) return;

    event.preventDefault();
    const direction = event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 1;
    selectWork((activeIndex + direction + photographyPovWorks.length) % photographyPovWorks.length);
  };

  return (
    <main
      ref={scrollRootRef}
      className={styles.scrollRoot}
      aria-label="Photography POV concept prototype"
    >
      <section
        ref={sectionRef}
        className={styles.track}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Photography portfolio selector"
      >
        <div className={styles.sticky}>
          <div className={styles.world} aria-hidden="true">
            <Image
              src="/concepts/photography-pov/world-placeholder-v1.png"
              alt=""
              fill
              priority
              sizes="(min-width: 900px) 58vw, 100vw"
            />
          </div>

          <div
            className={styles.worldShade}
            aria-hidden="true"
            style={{ opacity: 1 - revealProgress * 0.5 }}
          />
          <div
            className={styles.curtainLeft}
            aria-hidden="true"
            style={{ transform: `translateX(${-110 * revealProgress}%)` }}
          />
          <div
            className={styles.curtainRight}
            aria-hidden="true"
            style={{ transform: `translateX(${110 * revealProgress}%)` }}
          />
          <div className={styles.flash} aria-hidden="true" style={{ opacity: flashOpacity }} />

          <div className={styles.contentSafe}>
            <p className={styles.eyebrow}>PHOTOGRAPHY POV</p>
            <p className={styles.instruction}>
              {progress < REVEAL_END ? "拉開窗簾" : "往下滑，轉動作品"}
            </p>

            <div
              className={styles.cameraPortal}
              data-expanded={isExpanded}
              style={{
                "--camera-progress": cameraProgress,
                "--selector-progress": selectorProgress,
                "--portal-left": `${63 - selectorProgress * 13}%`,
                "--portal-top": `${58 - selectorProgress * 13}%`,
                "--portal-width": `min(${31 + selectorProgress * 37}vw, 390px)`,
                opacity: cameraProgress,
              } as React.CSSProperties}
            >
              <div className={styles.cameraFrame}>
                <Image
                  src={activeWork.image}
                  alt={activeWork.title}
                  fill
                  sizes="(min-width: 900px) 38vw, 78vw"
                  className={styles.workImage}
                />
                <div className={styles.cameraUi} aria-hidden="true">
                  <span>REC</span>
                  <span>ISO 400</span>
                </div>
              </div>
              <div className={styles.dial} aria-hidden="true" style={{ transform: `rotate(${activeIndex * 36}deg)` }}>
                <i />
              </div>
            </div>

            <div className={styles.copy} data-visible={progress >= SELECTOR_START}>
              <p className={styles.counter}>{activeWork.index} / 05</p>
              <h1>{activeWork.title}</h1>
              <p className={styles.meta}>{activeWork.meta}</p>
              <a className={styles.workLink} href={activeWork.href} tabIndex={progress >= SELECTOR_START ? 0 : -1}>
                展開完整作品
              </a>
            </div>

            <div className={styles.selector} data-visible={progress >= SELECTOR_START} aria-label="選擇攝影作品">
              {photographyPovWorks.map((work, index) => (
                <button
                  key={work.id}
                  type="button"
                  aria-pressed={index === activeIndex}
                  aria-label={`選擇 ${work.title}`}
                  onClick={() => selectWork(index)}
                  className={styles.selectorButton}
                  data-active={index === activeIndex}
                >
                  {work.index}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
