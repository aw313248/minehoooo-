"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fieldNotes, type NoteCategory } from "@/data/fieldNotes";
import styles from "./field-notes-index.module.css";

type GroupKey = "ALL" | "AI" | "TRAVEL";

const GROUPS: { key: GroupKey; label: string; categories: NoteCategory[] }[] = [
  { key: "ALL", label: "全部", categories: [] },
  { key: "AI", label: "AI 製作", categories: ["AI", "COLOR", "GEAR"] },
  { key: "TRAVEL", label: "旅行拍攝", categories: ["KINO", "TRAVEL", "STREET"] },
];

const FEATURED_SLUG = "ai-crime-film";

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
          <p className={styles.mastheadIdentity}>OSCAR LAI / DIRECTOR&apos;S JOURNAL</p>
          <h1 id="field-notes-title" className={styles.title}>
            FIELD NOTES
          </h1>
          <div className={styles.mastheadFooter}>
            <p className={styles.titleZh}>現場筆記</p>
            <p className={styles.promise}>
              成片之外，留下導演真正做決定的地方：Raw、判斷、失敗與修正。
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content} aria-label="現場筆記索引">
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
              <span className={styles.featuredFlag}>PROCESS 03 / AI FILM / 2026</span>
              <div className={styles.featuredCopy}>
                <h2>{featured.title}</h2>
                <p className={styles.featuredSubtitle}>{featured.subtitle}</p>
                <span className={styles.readLink}>ENTER PROCESS <b aria-hidden>↗</b></span>
              </div>
            </div>
          </Link>
        ) : (
          <p className={styles.empty}>這個分類的筆記還在路上。</p>
        )}

        <div className={styles.filterBar}>
          <div className={styles.filters} aria-label="篩選筆記">
            {GROUPS.map((group) => (
              <button key={group.key} type="button" className={styles.filter} aria-pressed={active === group.key} onClick={() => setActive(group.key)}>
                <span>{group.label}</span>
              </button>
            ))}
          </div>
        </div>

        {remaining.length > 0 ? (
          <div className={styles.indexList}>
            <div className={styles.indexHead}>
              <h2 className={styles.indexLabel}>DIRECTOR&apos;S INDEX</h2>
              <span>{String(remaining.length).padStart(2, "0")} STORIES</span>
            </div>
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
                  <p className={styles.rowOverline}>{note.categoryLabel} / {note.date.slice(0, 4)}</p>
                  <h2>{note.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

      </section>

      <footer className={styles.footer}>
        <Link href="/">回到作品集 <span aria-hidden>↗</span></Link>
      </footer>
    </main>
  );
}
