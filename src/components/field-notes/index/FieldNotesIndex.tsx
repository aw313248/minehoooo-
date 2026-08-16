"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HiggsfieldRef from "@/components/HiggsfieldRef";
import { fieldNotes, type FieldNote, type NoteCategory } from "@/data/fieldNotes";
import styles from "./field-notes-index.module.css";

type GroupKey = "ALL" | "AI" | "TRAVEL";

const GROUPS: { key: GroupKey; label: string; categories: NoteCategory[] }[] = [
  { key: "ALL", label: "全部", categories: [] },
  { key: "AI", label: "AI 製作", categories: ["AI", "COLOR", "GEAR"] },
  { key: "TRAVEL", label: "旅行拍攝", categories: ["KINO", "TRAVEL", "STREET"] },
];

const FEATURED_SLUG = "ai-crime-film";

function NoteMeta({ note }: { note: FieldNote }) {
  return (
    <p className={styles.meta}>
      <span>{note.readingTime} 分鐘閱讀</span>
    </p>
  );
}

export default function FieldNotesIndex() {
  const [active, setActive] = useState<GroupKey>("ALL");

  const visible = useMemo(() => {
    const sorted = fieldNotes.toSorted((a, b) => b.date.localeCompare(a.date));
    const group = GROUPS.find((item) => item.key === active);
    return active === "ALL"
      ? sorted
      : sorted.filter((note) => group?.categories.includes(note.category));
  }, [active]);

  const featured = visible.find((note) => note.slug === FEATURED_SLUG) ?? visible[0];
  const remaining = featured ? visible.filter((note) => note.slug !== featured.slug) : [];

  return (
    <main className={styles.root}>
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.brand} aria-label="回到 MINEH4O 首頁">
            MINEH4O
          </Link>
          <a
            className={styles.instagram}
            href="https://www.instagram.com/minehoooo.arw/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @MINEHOOOO.ARW <span aria-hidden>↗</span>
          </a>
        </div>
      </header>

      <section className={styles.masthead} aria-labelledby="field-notes-title">
        <div className={styles.mastheadGrid}>
          <div>
            <h1 id="field-notes-title" className={styles.title}>
              現場筆記
              <span>FIELD NOTES</span>
            </h1>
            <p className={styles.promise}>
              不只看成片。從 Raw、判斷、失敗，到最後怎麼修成一個作品。
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content} aria-label="現場筆記索引">
        <div className={styles.filterBar}>
          <div className={styles.filters} aria-label="篩選筆記">
            {GROUPS.map((group) => {
              return (
                <button
                  key={group.key}
                  type="button"
                  className={styles.filter}
                  aria-pressed={active === group.key}
                  onClick={() => setActive(group.key)}
                >
                  <span>{group.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {featured ? (
          <Link href={`/field-notes/${featured.slug}`} className={styles.featured}>
            <div className={styles.featuredMedia}>
              <Image
                src={featured.heroImage}
                alt=""
                fill
                priority
                className={styles.image}
                sizes="(max-width: 760px) 100vw, 58vw"
              />
              <div className={styles.mediaWash} />
              <span className={styles.featuredFlag}>FEATURED FIELD NOTE</span>
              {featured.slug === FEATURED_SLUG ? (
                <div className={styles.rawInset}>
                  <Image
                    src="/field-notes/ai-crime-film/shot-02-corridor-keyframe.avif"
                    alt="家中走廊拍攝的 Raw Footage 關鍵幀"
                    fill
                    className={styles.image}
                    sizes="(max-width: 700px) 104px, 180px"
                  />
                  <span>RAW / HOME</span>
                </div>
              ) : null}
            </div>
            <div className={styles.featuredCopy}>
              <NoteMeta note={featured} />
              <p className={styles.category}>{featured.categoryLabel}</p>
              <h2>{featured.title}</h2>
              <p className={styles.featuredSubtitle}>{featured.subtitle}</p>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              <span className={styles.readLink}>閱讀完整製作筆記 <b aria-hidden>↗</b></span>
            </div>
          </Link>
        ) : (
          <p className={styles.empty}>這個分類的筆記還在路上。</p>
        )}

        {remaining.length > 0 ? (
          <div className={styles.indexList}>
            <h2 className={styles.indexLabel}>更多筆記</h2>
            {remaining.map((note) => (
              <Link key={note.slug} href={`/field-notes/${note.slug}`} className={styles.noteRow}>
                <div className={styles.rowMedia}>
                  <Image
                    src={note.heroImage}
                    alt=""
                    fill
                    className={styles.image}
                    sizes="(max-width: 760px) 112px, 180px"
                  />
                </div>
                <div className={styles.rowCopy}>
                  <NoteMeta note={note} />
                  <h2>{note.title}</h2>
                  <p>{note.subtitle ?? note.excerpt}</p>
                </div>
                <span className={styles.rowCategory}>{note.categoryLabel}</span>
                <span className={styles.rowArrow} aria-hidden>↗</span>
              </Link>
            ))}
          </div>
        ) : null}

        <aside className={styles.partner} aria-label="推薦工具">
          <HiggsfieldRef variant="plug" />
        </aside>
      </section>

      <footer className={styles.footer}>
        <Link href="/">回到作品集 <span aria-hidden>↗</span></Link>
      </footer>
    </main>
  );
}
