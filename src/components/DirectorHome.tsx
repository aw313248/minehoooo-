"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import styles from "./DirectorHome.module.css";

type SelectedWork = {
  index: string;
  slug: string;
  title: string;
  artist: string;
  role: string;
  year: string;
  category: string;
  youtubeId: string;
  focal?: string;
};

const selectedWorks: SelectedWork[] = [
  {
    index: "01",
    slug: "chen-zhuo-all-fools-day",
    title: "愚人節",
    artist: "陳卓 JON CHEN",
    role: "DIRECTOR · DP",
    year: "2026",
    category: "MUSIC VIDEO",
    youtubeId: "d9_EuYkmfzM",
    focal: "50% 42%",
  },
  {
    index: "02",
    slug: "bring-me-your-lovely",
    title: "BRING ME YOUR LOVELY",
    artist: "KOLLI (NN)",
    role: "DIRECTOR · DP · AI",
    year: "2025",
    category: "AI HYBRID MV",
    youtubeId: "eI1O_9jBHU0",
    focal: "50% 46%",
  },
  {
    index: "03",
    slug: "tiang-remember-to-be-happy",
    title: "記住你要快樂",
    artist: "帝仰 TIANG",
    role: "DIRECTOR · COLOR",
    year: "2023",
    category: "MUSIC VIDEO",
    youtubeId: "kL8_Sk0JmKM",
    focal: "50% 35%",
  },
  {
    index: "04",
    slug: "lil-rad-loving-after-all",
    title: "愛人這件事",
    artist: "LIL RAD × COY6OI",
    role: "DP · COLOR",
    year: "2025",
    category: "MUSIC VIDEO",
    youtubeId: "GCDxrVigSfw",
    focal: "50% 40%",
  },
  {
    index: "05",
    slug: "cpbl-all-star-taiwolf-2025",
    title: "精銳",
    artist: "TAIWOLF × 中華職棒",
    role: "EDITOR",
    year: "2025",
    category: "DOCUMENTARY",
    youtubeId: "bKl5uW-69iQ",
    focal: "50% 36%",
  },
];

const photos = [
  { src: "/photos/event/20240323 JOYCE純愛俱樂部-04179.JPG", alt: "JOYCE 純愛俱樂部活動攝影", label: "JOYCE / SPECIAL SESSION" },
  { src: "/photos/outdoor/大圖.jpg", alt: "戶外人像攝影作品", label: "PORTRAIT / OUTDOOR" },
  { src: "/photos/taichung-part2/petit-2.jpg", alt: "臺中勤美人像攝影", label: "TAICHUNG / EDITORIAL" },
  { src: "/photos/park2/park2-1.jpg", alt: "PARK2 國際親吻日活動攝影", label: "PARK2 / CAMPAIGN" },
  { src: "/photos/flat/如夢似幻-6.JPG", alt: "平面攝影作品", label: "DREAMSCAPE / FINE ART" },
];

const notes = [
  {
    href: "/field-notes/taiwan-roadbook",
    image: "/field-notes/taiwan-roadbook/cover.jpg",
    eyebrow: "FIELD NOTE · TRAVEL",
    title: "一個人，騎車環島",
  },
  {
    href: "/field-notes/ai-crime-film",
    image: "/field-notes/ai-crime-film/og.jpg",
    eyebrow: "FIELD NOTE · AIGC",
    title: "AI 犯罪短片實驗",
  },
  {
    href: "/field-notes/seedance-aerial",
    image: "/field-notes/seedance-map-route/social-cover.jpg",
    eyebrow: "FIELD NOTE · PROCESS",
    title: "把路徑圖變成空拍鏡頭",
  },
];

function Mark() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true">
      <path d="M128 192v64H64.5L32 223 0 192v-64h64zm128 0v64h-63.5L160 223l-32-31v-64h64zM128 64v64H64.5L32 95 0 64V0h64zm128 0v64h-63.5L160 95l-32-31V0h64z" fill="currentColor" />
    </svg>
  );
}

function WorkPanel({ work, first }: { work: SelectedWork; first: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], reduceMotion ? [1, 1, 1, 1] : [0.88, 1, 1, 0.94]);
  const copyY = useTransform(scrollYProgress, [0.1, 0.42, 0.72, 0.95], reduceMotion ? [0, 0, 0, 0] : [80, 0, 0, -55]);
  const copyOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.78, 0.96], [0, 1, 1, 0]);
  const frameTransform = useMotionTemplate`translate3d(0, 0, 0) scale(${scale})`;
  const copyTransform = useMotionTemplate`translate3d(0, ${copyY}px, 0)`;

  return (
    <section ref={ref} className={`${styles.workPanel} ${first ? styles.firstWork : ""}`} aria-labelledby={`work-${work.index}`}>
      <motion.div className={styles.workFrame} style={{ transform: frameTransform }}>
        <div className={styles.workMedia}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${work.youtubeId}/maxresdefault.jpg`}
            alt=""
            style={{ objectPosition: work.focal }}
          />
          <div className={styles.mediaShade} />
        </div>

        <div className={styles.workTopline}>
          <span>{work.index} / 05</span>
          <span>{work.category}</span>
          <span>{work.year}</span>
        </div>

        <motion.div className={styles.workCopy} style={{ transform: copyTransform, opacity: copyOpacity }}>
          <p>{work.artist}</p>
          <h2 id={`work-${work.index}`}>{work.title}</h2>
          <div className={styles.workBottomline}>
            <span>{work.role}</span>
            <span className={styles.viewCue}>VIEW FILM <b>↗</b></span>
          </div>
        </motion.div>

        <Link className={styles.workLink} href={`/works/${work.slug}`} aria-label={`查看作品：${work.title}`} />
      </motion.div>
    </section>
  );
}

export default function DirectorHome() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressTransform = useMotionTemplate`scaleX(${progressScale})`;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtml = html.style.overflow;
    const previousBody = body.style.overflow;
    const previousHeight = body.style.height;
    html.style.overflow = "auto";
    body.style.overflow = "auto";
    body.style.height = "auto";
    return () => {
      html.style.overflow = previousHtml;
      body.style.overflow = previousBody;
      body.style.height = previousHeight;
    };
  }, []);

  return (
    <main className={styles.site}>
      <motion.div className={styles.progress} style={{ transform: progressTransform }} />

      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="回到首頁">
          <span className={styles.mark}><Mark /></span>
          <span>MINEH4O</span>
        </a>
        <nav className={styles.desktopNav} aria-label="主要導覽">
          <a href="#work">WORK</a>
          <a href="#photography">PHOTO</a>
          <Link href="/field-notes">NOTES</Link>
          <a href="#about">ABOUT</a>
        </nav>
        <a className={styles.contactButton} href="mailto:cyuttkengineer@gmail.com">LET&apos;S WORK ↗</a>
      </header>

      <section id="top" className={styles.opening} aria-labelledby="opening-title">
        <div className={styles.openingBackdrop} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://img.youtube.com/vi/d9_EuYkmfzM/maxresdefault.jpg" alt="" />
        </div>
        <div className={styles.openingGrid}>
          <p className={styles.openingEyebrow}>DIRECTOR · DP · VISUAL STORYTELLER</p>
          <p className={styles.openingPlace}>TAICHUNG, TAIWAN<br />AVAILABLE WORLDWIDE</p>
          <h1 id="opening-title">
            <span>IMAGES</span>
            <span>THAT</span>
            <span className={styles.accentWord}>SPEAK.</span>
          </h1>
          <p className={styles.openingIntro}>賴明宏 Oscar Lai。從現場、後製到生成影像，讓每一個畫面都有立場。</p>
          <a className={styles.scrollCue} href="#work"><span>SCROLL TO WORK</span><b>↓</b></a>
        </div>
      </section>

      <section id="work" className={styles.workIntro}>
        <p>SELECTED MOVING IMAGES</p>
        <h2>不先介紹我。<br />先看作品。</h2>
        <span>05 SELECTED WORKS · 2023—2026</span>
      </section>

      <div className={styles.works}>
        {selectedWorks.map((work, index) => <WorkPanel key={work.slug} work={work} first={index === 0} />)}
      </div>

      <div className={styles.allWorkRow}>
        <p>完整影像作品、獎項與製作職位</p>
        <Link href="/works">ALL MOVING IMAGES <span>↗</span></Link>
      </div>

      <section id="photography" className={styles.photoSection} aria-labelledby="photo-title">
        <div className={styles.sectionHead}>
          <p>06 — STILL IMAGES</p>
          <h2 id="photo-title">PHOTOGRAPHY</h2>
          <span>不是附加服務。是我看世界的方法。</span>
        </div>
        <div className={styles.photoRail}>
          {photos.map((photo, index) => (
            <figure key={photo.src} className={styles.photoCard}>
              <div className={styles.photoImage}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 78vw, 32vw" />
              </div>
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{photo.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.notesSection} aria-labelledby="notes-title">
        <div className={styles.notesHeading}>
          <p>FIELD NOTES / R&amp;D</p>
          <h2 id="notes-title">我怎麼看、<br />怎麼試、怎麼做。</h2>
          <Link href="/field-notes">全部現場筆記 ↗</Link>
        </div>
        <div className={styles.noteList}>
          {notes.map((note, index) => (
            <Link key={note.href} href={note.href} className={styles.noteCard}>
              <div className={styles.noteImage}>
                <Image src={note.image} alt="" fill sizes="(max-width: 767px) 100vw, 45vw" />
              </div>
              <div className={styles.noteMeta}>
                <span>{note.eyebrow}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{note.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
        <div className={styles.aboutPortrait}>
          <Image src="/oscar-portrait.jpg" alt="賴明宏 Oscar Lai" fill sizes="(max-width: 767px) 100vw, 45vw" />
          <span>OSCAR LAI / MINEH4O</span>
        </div>
        <div className={styles.aboutCopy}>
          <p>07 — ABOUT</p>
          <h2 id="about-title">人一定是<br />在作品之前。</h2>
          <div className={styles.aboutBody}>
            <p>我是賴明宏，台中的導演與影像工作者。高中拿起相機，大學學會電影語言，後來把攝影、剪輯、調色和 AIGC 都變成說故事的工具。</p>
            <p>我在乎畫面的邏輯，也在乎片場裡的信任。器材能做出影像，對話才會留下真正值得看的畫面。</p>
          </div>
          <dl className={styles.aboutFacts}>
            <div><dt>BASE</dt><dd>TAICHUNG · TAIWAN</dd></div>
            <div><dt>WORKING IN</dt><dd>DIRECTING · DP · POST · AIGC</dd></div>
            <div><dt>SINCE</dt><dd>2019 — NOW</dd></div>
          </dl>
        </div>
      </section>

      <footer id="contact" className={styles.footer}>
        <p>HAVE A STORY IN MIND?</p>
        <a href="mailto:cyuttkengineer@gmail.com" className={styles.footerTitle}>LET&apos;S MAKE<br />IT MOVE.</a>
        <div className={styles.footerBottom}>
          <a href="mailto:cyuttkengineer@gmail.com">CYUTTKENGINEER@GMAIL.COM</a>
          <a href="https://instagram.com/minehoooo.arw" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
          <span>© MINEH4O 2026</span>
        </div>
      </footer>

      <nav className={styles.mobileNav} aria-label="手機版主要導覽">
        <a href="#work">WORK</a>
        <a href="#photography">PHOTO</a>
        <Link href="/field-notes">NOTES</Link>
        <a href="#about">ABOUT</a>
      </nav>
    </main>
  );
}
