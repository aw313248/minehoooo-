"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FieldNote } from "@/data/fieldNotes";
import styles from "./montbell-rain-trekker.module.css";

const MONTBELL_URL = "https://www.montbell.com.tw/products/rain-trekker-gtx%E7%94%B7%E6%AC%BE%E9%9B%A8%E4%B8%AD%E8%88%9E%E8%80%85%E9%9B%A8%E8%A1%A31128729";
const PATAGONIA_URL = "https://www.patagonia.com/product/mens-torrentshell-3-layer-rain-jacket/85241.html";
const COMMONS_URL = "https://commons.wikimedia.org/wiki/File:Geya_Bus_FAE-780_at_Cheng_Ching_Hospital_Station_20170708.jpg";

const score = [
  { label: "機能", value: 4, note: "夠用，不追極端規格" },
  { label: "重量", value: 5, note: "願意一直帶著" },
  { label: "收納", value: 5, note: "脫下來不佔手" },
  { label: "價格", value: 4, note: "不是最便宜，但合理" },
  { label: "外型", value: 5, note: "對，這很重要" },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`${styles.reveal} ${className}`} data-reveal>{children}</div>;
}

export default function MontbellRainTrekkerArticle({ note }: { note: FieldNote }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const root = document.documentElement;
      setProgress(root.scrollTop / Math.max(1, root.scrollHeight - root.clientHeight));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => { element.dataset.visible = "true"; });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
    elements.forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.progress} aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <nav className={styles.nav} aria-label="文章導覽">
        <Link href="/field-notes">← FIELD NOTES</Link>
        <Link href="/">MINEH4O</Link>
      </nav>

      <header className={styles.hero}>
        <Image
          src="/field-notes/montbell-rain-trekker/rain-trekker-official.jpg"
          alt="Mont-bell Rain Trekker 深綠色防水外套"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroWash} />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>FIELD NOTES — ISSUE #{note.issue} · TAICHUNG</p>
          <h1>
            我沒有買<br />
            最便宜的雨衣
            <em>因為這件比較帥</em>
          </h1>
          <div className={styles.heroMeta}>
            <span>MONT-BELL RAIN TREKKER</span>
            <span>{note.readingTime} MIN READ</span>
            <span>2026.08.24</span>
          </div>
        </div>
        <a className={styles.scrollCue} href="#decision">往下看我的選擇標準 ↓</a>
      </header>

      <article className={styles.article}>
        <section className={styles.quickAnswer}>
          <Reveal>
            <p className={styles.kicker}>THE ANSWER I PROMISED IN THE VIDEO</p>
            <h2>先講答案：<br />我穿的是 Mont-bell Rain Trekker。</h2>
          </Reveal>
          <div className={styles.answerGrid}>
            <Reveal className={styles.answerCard}>
              <span>它是什麼？</span>
              <p>
                一件<strong>防水透濕的外層 Shell</strong>。它不負責把你穿暖，主要工作就是把雨和風擋在外面；冷的時候，再靠裡面的美麗諾或羽絨保暖。
              </p>
            </Reveal>
            <Reveal className={`${styles.answerCard} ${styles.answerMain}`}>
              <span>我為什麼買？</span>
              <p>
                因為它<strong>夠輕、收得小、活動不卡</strong>，而且同級外套都看過一輪後，我最喜歡它穿起來的樣子。
              </p>
            </Reveal>
          </div>
          <Reveal className={styles.notSponsored}>
            影片裡說的是真的：這次不是業配。只是如果 Mont-bell 看到，我沒有拒絕業配。
          </Reveal>
          <div className={styles.reelStrip}>
            {[
              ["/field-notes/montbell-rain-trekker/video-hero.jpg", "TAICHUNG RAIN", "實際穿進臺中的大雨裡"],
              ["/field-notes/montbell-rain-trekker/video-dry.jpg", "OPEN THE SHELL", "進電梯後直接把外套翻開"],
              ["/field-notes/montbell-rain-trekker/video-detail.jpg", "STILL DRY", "這次短影音裡，內層仍然是乾的"],
            ].map(([src, label, caption]) => (
              <Reveal className={styles.reelFrame} key={src}>
                <Image src={src} alt={caption} fill sizes="(max-width: 820px) 78vw, 33vw" />
                <div><span>{label}</span><p>{caption}</p></div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className={styles.opening}>
          <p className={styles.kicker}>THE REAL BRIEF</p>
          <p className={styles.lead}>
            我不是在找一件規格最強的雨衣。我在找一件旅行、登山、外景拍攝都能用，
            <strong>不下雨時也願意一直放在包包裡</strong>的外殼。
          </p>
          <blockquote>
            一件規格很強、但你不想穿的外套，CP 值其實很低。
          </blockquote>
        </Reveal>

        <section className={styles.needSection} id="decision">
          <Reveal>
            <div className={styles.sectionHead}>
              <span>01</span>
              <div>
                <p>我的需求</p>
                <h2>雨來了要能穿，雨停了要能消失。</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.needGrid}>
            {["旅行遇雨", "登山", "外景拍攝", "背攝影器材", "肩膀能活動", "收進背包"].map((item, index) => (
              <Reveal key={item} className={styles.needCard}>
                <span>0{index + 1}</span>
                <strong>{item}</strong>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.productStage}>
          <div className={styles.productSticky}>
            <Reveal className={styles.productCopy}>
              <p className={styles.kicker}>THE ONE I BOUGHT</p>
              <h2>夠輕。<br />收得小。<br /><i>而且帥。</i></h2>
              <p>
                腋下拉鍊對我沒有那麼重要。我真正每天會感受到的，是它背在包裡的重量、
                脫下來之後佔多少空間，還有穿上去時我喜不喜歡自己。
              </p>
            </Reveal>
            <div className={styles.productVisual}>
              <div className={styles.productHalo} aria-hidden="true" />
              <Image
                src="/field-notes/montbell-rain-trekker/rain-trekker-official.jpg"
                alt="Mont-bell Rain Trekker GTX 男款雨衣官方產品照"
                width={480}
                height={480}
                className={styles.productImage}
              />
              <span className={styles.productStamp}>PACKABLE<br />SHELL</span>
              <a href={MONTBELL_URL} target="_blank" rel="noreferrer" className={styles.imageCredit}>
                產品圖／Mont-bell Taiwan 官方
              </a>
            </div>
          </div>
        </section>

        <section className={styles.factSection}>
          <Reveal>
            <div className={styles.sectionHead}>
              <span>02</span>
              <div>
                <p>目前官方男款 #1128729</p>
                <h2>規格不是主角，但它要過基本門檻。</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.factGrid}>
            <Reveal className={styles.factCard}><strong>301<small>g</small></strong><span>平均重量</span></Reveal>
            <Reveal className={styles.factCard}><strong>8×8×17<small>cm</small></strong><span>官方收納尺寸</span></Reveal>
            <Reveal className={styles.factCard}><strong>3<small>L</small></strong><span>GORE-TEX／50D Nylon</span></Reveal>
          </div>
          <Reveal>
            <p className={styles.factNote}>
              這裡列的是 2026 年 8 月 24 日臺灣官網上的現行男款資料。Rain Trekker 不同年份、性別與型號的重量和材質可能不同；你的實際版本仍以衣服內標與型號為準。
            </p>
          </Reveal>
        </section>

        <section className={styles.candidates}>
          <Reveal>
            <div className={styles.sectionHead}>
              <span>03</span>
              <div>
                <p>我當時比過的選項</p>
                <h2>便宜沒有錯，只是每一件要補的缺口不同。</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.candidateList}>
            <Reveal className={styles.candidateRow}>
              <div><span>DECATHLON</span><h3>Quechua MH150</h3></div>
              <p>當時看到約 NT$1,749。不到兩千元就有完整防水機能，如果只是城市旅行、偶爾下雨或預算有限，我到現在還是覺得合理。</p>
              <strong>最便宜、夠用</strong>
            </Reveal>
            <Reveal className={styles.candidateRow}>
              <div><span>DECATHLON</span><h3>城市機能防水外套</h3></div>
              <p>當時看到約 NT$1,649，外型也不錯。但功能跟我原本的外套重疊，便宜不代表真的補上裝備缺口。</p>
              <strong>功能重疊</strong>
            </Reveal>
            <Reveal className={`${styles.candidateRow} ${styles.candidateFocus}`}>
              <div><span>PATAGONIA</span><h3>Torrentshell 3L</h3></div>
              <p>這才是應該放進同一輪看的對手：同樣是三層防水外殼、可以收納，定位更接近日常登山與長期使用。</p>
              <strong>同級比較</strong>
            </Reveal>
            <Reveal className={`${styles.candidateRow} ${styles.candidateWinner}`}>
              <div><span>MONT-BELL</span><h3>Rain Trekker</h3></div>
              <p>沒有一個單項規格誇張到碾壓，但在重量、收納、活動性、價格和外型之間，最接近我要的平衡。</p>
              <strong>我最後買的</strong>
            </Reveal>
          </div>
          <p className={styles.historyNote}>迪卡儂價格與規格是我的當時購買紀錄，不代表目前售價；精確舊型號確認後再補，不用假裝每個數字都還有效。</p>
        </section>

        <section className={styles.compareSection}>
          <Reveal>
            <div className={styles.sectionHead}>
              <span>04</span>
              <div>
                <p>Mont-bell vs Patagonia</p>
                <h2>同樣能擋雨，差別是你想把重量花在哪裡。</h2>
              </div>
            </div>
          </Reveal>
          <Reveal className={styles.tableWrap}>
            <div className={styles.compareTable} role="table" aria-label="Rain Trekker 與 Torrentshell 3L 官方規格比較">
              <div className={styles.tableHeader} role="row">
                <span role="columnheader">目前官方資料</span>
                <strong role="columnheader">RAIN TREKKER GTX</strong>
                <strong role="columnheader">TORRENTSHELL 3L</strong>
              </div>
              {[
                ["重量", "301g", "400g"],
                ["結構", "GORE-TEX 3L／50D", "H2No 3L／50D"],
                ["收納", "附收納袋／8×8×17cm", "收進左側口袋"],
                ["腋下拉鍊", "官方特色未列", "有"],
                ["官方標價", "臺灣 NT$7,680", "美國 US$189"],
              ].map(([label, a, b]) => (
                <div className={styles.tableRow} role="row" key={label}>
                  <span role="cell">{label}</span><b role="cell">{a}</b><b role="cell">{b}</b>
                </div>
              ))}
            </div>
            <p>價格來自不同市場，只用來辨識產品定位，不能直接當臺灣到手價比較。真正比價應該在同一天、同一地區、同尺寸下完成。</p>
          </Reveal>
          <Reveal className={styles.verdict}>
            <span>MY VERDICT</span>
            <p>
              Patagonia 沒有不好。只是對我來說，Pit Zip 的價值沒有大到能抵過每天背著的重量；
              <strong>Rain Trekker 已經夠防水、比較輕、能收得小，而且我更喜歡它穿起來的樣子。</strong>
            </p>
          </Reveal>
        </section>

        <section className={styles.storeSection}>
          <Reveal className={styles.storeCopy}>
            <div className={styles.sectionHead}>
              <span>05</span>
              <div>
                <p>為什麼最後現場買</p>
                <h2>價差不大時，我買的是確定性。</h2>
              </div>
            </div>
            <p>網拍有便宜，但沒有便宜到值得我承擔尺寸、版型、色差和退換貨的風險。這件會跟著我拍攝、旅行、登山，我需要先知道肩膀能不能動、裡面加衣服會不會卡，背上器材後還舒不舒服。</p>
          </Reveal>
          <div className={styles.storeGrid}>
            {[
              ["01", "試穿", "肩膀、袖長、帽兜、下擺都能當場確認"],
              ["02", "看實品", "顏色、版型與商品狀況不用賭"],
              ["03", "直接拿走", "沒有物流等待，也沒有退貨成本"],
              ["04", "售後單純", "拉鍊、壓膠與防水問題有明確管道"],
            ].map(([num, title, body]) => (
              <Reveal key={num} className={styles.storeCard}><span>{num}</span><h3>{title}</h3><p>{body}</p></Reveal>
            ))}
          </div>
        </section>

        <section className={styles.systemSection}>
          <Reveal>
            <div className={styles.sectionHead}>
              <span>06</span>
              <div>
                <p>後來我才懂的事</p>
                <h2>不是找一件萬能外套，是讓每一層只做好一件事。</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.layerStack}>
            <Reveal className={styles.layer}><span>01</span><b>BASE</b><strong>Merino 190g/m²</strong><p>保暖、排濕、抗臭</p></Reveal>
            <Reveal className={styles.layer}><span>02</span><b>WIND</b><strong>Decathlon MH500</strong><p>防風、防曬，約 150g 等級</p></Reveal>
            <Reveal className={`${styles.layer} ${styles.shellLayer}`}><span>03</span><b>SHELL</b><strong>Mont-bell Rain Trekker</strong><p>防水、防風</p></Reveal>
            <Reveal className={styles.layer}><span>04</span><b>WARMTH</b><strong>Down Insulation</strong><p>保暖、可壓縮；目前仍在補</p></Reveal>
          </div>
          <Reveal className={styles.systemQuote}>
            Rain Trekker 不需要保暖。羽絨不需要負責下雨。美麗諾不需要擋風。每一層把一件事做好，組起來反而比一件又厚又重的萬能外套更好用。
          </Reveal>
        </section>

        <section className={styles.scoreSection}>
          <Reveal>
            <div className={styles.sectionHead}>
              <span>07</span>
              <div>
                <p>OSCAR GEAR SCORE</p>
                <h2>我以後評裝備，就看這五件事。</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.scoreGrid}>
            {score.map((item) => (
              <Reveal className={styles.scoreRow} key={item.label}>
                <div><strong>{item.label}</strong><span>{item.note}</span></div>
                <div className={styles.dots} aria-label={`${item.value} 分，共 5 分`}>
                  {Array.from({ length: 5 }, (_, index) => <i key={index} data-on={index < item.value} />)}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.recommendSection}>
          <Reveal>
            <p className={styles.kicker}>SO, WHO SHOULD BUY IT?</p>
            <h2>我會怎麼推薦臺中人</h2>
          </Reveal>
          <div className={styles.recommendGrid}>
            <Reveal className={styles.recommendCard}>
              <span>NT$2,000 以下</span><h3>先買迪卡儂</h3><p>只是需要一件可靠雨衣、偶爾旅行或預算有限，不用硬上 Mont-bell。</p>
            </Reveal>
            <Reveal className={styles.recommendCard}>
              <span>旅行＋偶爾登山</span><h3>開始值得看 Mont-bell</h3><p>重量、收納和活動性會開始有價值，尤其你真的會一直把它放在包裡。</p>
            </Reveal>
            <Reveal className={`${styles.recommendCard} ${styles.recommendMain}`}>
              <span>常旅行／戶外工作</span><h3>我會把預算放在 Rain Trekker</h3><p>一年穿很多次時，重量和穿著體驗每天都會重新計算一次。</p>
            </Reveal>
          </div>
          <Reveal className={styles.finalLine}>
            <p>我最後選的不是最便宜，也不是規格最滿。</p>
            <strong>是我真的會一直帶出門的那一件。</strong>
          </Reveal>
        </section>

        <section className={styles.sources}>
          <p>資料與圖片來源 · 查核日 2026.08.24</p>
          <a href={MONTBELL_URL} target="_blank" rel="noreferrer">Mont-bell Taiwan｜Rain Trekker GTX 男款 #1128729 ↗</a>
          <a href={PATAGONIA_URL} target="_blank" rel="noreferrer">Patagonia｜Men&apos;s Torrentshell 3L Rain Jacket #85241 ↗</a>
          <a href={COMMONS_URL} target="_blank" rel="noreferrer">臺中雨景｜Cheng-en Cheng，CC BY-SA 2.0 ↗</a>
          <small>本文中的主觀評分、購買理由與當時價格為 Oscar 的個人使用紀錄；商品規格與價格可能調整，購買前請重新查看官方頁面。</small>
        </section>

        <footer className={styles.footer}>
          <Link href="/field-notes">← 回到全部筆記</Link>
          <a href={MONTBELL_URL} target="_blank" rel="noreferrer">查看官方產品頁 ↗</a>
        </footer>
      </article>
    </main>
  );
}
