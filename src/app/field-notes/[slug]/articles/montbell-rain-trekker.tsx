"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FieldNote } from "@/data/fieldNotes";
import styles from "./montbell-rain-trekker.module.css";

const MONTBELL_URL = "https://www.montbell.com.tw/products/rain-trekker-gtx%E7%94%B7%E6%AC%BE%E9%9B%A8%E4%B8%AD%E8%88%9E%E8%80%85%E9%9B%A8%E8%A1%A31128729";
const PCHOME_URL = "https://24h.pchome.com.tw/prod/DEBLEN-A900IT5KX";
const MOMO_URL = "https://www.momoshop.com.tw/search/%E9%98%B2%E6%B0%B4%E5%A4%96%E5%A5%97";
const DECATHLON_URL = "https://www.decathlon.tw/p/%E7%94%B7%E6%AC%BE%E7%99%BB%E5%B1%B1-15000mm%E9%98%B2%E6%B0%B4%E5%A4%96%E5%A5%97-mh150-%E8%97%8D%E8%89%B2-quechua-8540225.html";
const PRO_OUTDOOR_URL = "https://www.prooutdoor.com.tw/collections/water-proof/products/patagonia%C2%AE%E7%94%B7%E6%AC%BE-torrentshell-3l-rain-jacket-%E5%89%AF%E6%9C%AC";
const PATAGONIA_URL = "https://www.patagonia.com/product/mens-torrentshell-3-layer-rain-jacket/85241.html";

const channelCards = [
  {
    channel: "PCHOME 24H",
    lead: "Mont-bell Rain Trekker",
    priceLabel: "頁面價",
    price: "NT$6,910",
    detail: "廠商出貨｜不是 24h 到貨",
    brands: ["mont-bell", "The North Face", "Columbia", "MAMMUT", "AIGLE", "ATUNAS", "CHUMS", "Mountain Hardwear", "TRAVELER", "Hilltop", "JORDON"],
    href: PCHOME_URL,
    linkLabel: "查看 PChome 頁面",
  },
  {
    channel: "MOMO",
    lead: "今天不硬填同款價格",
    priceLabel: "即時價",
    price: "未取得即時價",
    detail: "搜尋得到舊促銷快取｜不能拿 7 月價格假裝今天",
    brands: ["mont-bell", "The North Face", "ATUNAS", "AIGLE", "Patagonia", "Mountain Hardwear", "TRAVELER", "Hilltop", "JORDON"],
    href: MOMO_URL,
    linkLabel: "查看 momo 搜尋頁",
  },
  {
    channel: "品牌直售",
    lead: "Mont-bell 官方",
    priceLabel: "台灣官方定價",
    price: "NT$7,680",
    detail: "Rain Trekker 男款 #1128729｜可直接核對型號與規格",
    brands: ["mont-bell", "The North Face"],
    href: MONTBELL_URL,
    linkLabel: "查看 Mont-bell 官方",
  },
  {
    channel: "品牌直售",
    lead: "Decathlon Quechua MH150",
    priceLabel: "台灣官方價",
    price: "NT$1,749",
    detail: "男款 #8540225｜官方頁面顯示非活動價",
    brands: ["Decathlon", "Quechua"],
    href: DECATHLON_URL,
    linkLabel: "查看 Decathlon 官方",
  },
  {
    channel: "台灣正式代理",
    lead: "Patagonia Torrentshell 3L",
    priceLabel: "正式代理售價",
    price: "NT$7,560",
    detail: "男款 #85241｜Pro Outdoor 正式代理商品頁",
    brands: ["Patagonia", "Pro Outdoor"],
    href: PRO_OUTDOOR_URL,
    linkLabel: "查看 Patagonia 台灣代理",
  },
];

const score = [
  { label: "機能", value: 4, note: "夠用，不追極端規格" },
  { label: "重量", value: 5, note: "願意一直帶著" },
  { label: "收納", value: 5, note: "脫下來不佔手" },
  { label: "價格", value: 4, note: "不是最便宜，但合理" },
  { label: "外型", value: 5, note: "對，這很重要" },
];

const compareProducts = [
  {
    brand: "DECATHLON",
    model: "Quechua MH150",
    image: "/field-notes/montbell-rain-trekker/decathlon-mh150-official.jpg",
    imageAlt: "Decathlon Quechua MH150 深藍色防水外套官方產品照",
    price: "NT$1,749",
    priceLabel: "台灣官方價",
    weight: "約 490g",
    weightLabel: "我當時比較的款式資料",
    advantage: "口袋多｜透氣孔多｜預算最低",
    tradeoff: "我穿去爬山時｜毛毛雨還行｜雨一大會濕到裡面",
    href: DECATHLON_URL,
  },
  {
    brand: "PATAGONIA",
    model: "Torrentshell 3L",
    image: "/field-notes/montbell-rain-trekker/patagonia-torrentshell-official.jpg",
    imageAlt: "Patagonia Torrentshell 3L 灰色防水外套官方產品照",
    price: "NT$7,560",
    priceLabel: "台灣正式代理售價",
    weight: "400g",
    weightLabel: "品牌現行男款資料",
    advantage: "三層結構｜有腋下拉鍊｜配置紮實",
    tradeoff: "同價帶的強對手｜但它多出的通風配置不是我的優先項目",
    href: PRO_OUTDOOR_URL,
  },
  {
    brand: "MONT-BELL",
    model: "Rain Trekker GTX",
    image: "/field-notes/montbell-rain-trekker/rain-trekker-official.jpg",
    imageAlt: "Mont-bell Rain Trekker GTX 深綠色防水外套官方產品照",
    price: "NT$6,500",
    priceLabel: "我在大遠百的活動實付",
    weight: "301g",
    weightLabel: "品牌現行男款資料",
    advantage: "最輕｜收得最小｜也是我覺得最好看",
    tradeoff: "不是單項規格碾壓｜而是最接近我的使用平衡",
    href: MONTBELL_URL,
    winner: true,
  },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`${styles.reveal} ${className}`} data-reveal>{children}</div>;
}

function LineText({ text }: { text: string }) {
  return <>{text.split("｜").map((line) => <span className={styles.copyLine} key={line}>{line}</span>)}</>;
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
          src="/field-notes/montbell-rain-trekker/video-hero.jpg"
          alt="Oscar 穿著 Mont-bell Rain Trekker 走在臺中大雨中"
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
        <section className={styles.marketSection} id="today-market">
          <Reveal>
            <div className={styles.sectionHead}>
              <span>01</span>
              <div>
                <p>2026 08 24｜今天買得到什麼</p>
                <h2>先看通路<br />再談我最後買哪件</h2>
              </div>
            </div>
            <p className={styles.marketIntro}>
              <LineText text="同一件外套在不同通路不一定同時上架｜我只列今天能核對型號與來源的頁面價格｜momo 的同款即時價無法證實｜所以我不拿舊促銷數字補空格" />
            </p>
          </Reveal>
          <Reveal className={styles.purchasePrice}>
            <div className={styles.purchaseIntro}>
              <span>MY ACTUAL PURCHASE</span>
              <h3>台中大遠百<br />門市活動成交</h3>
              <p>這是我當時真正付出去的價格<br />不是現在的品牌牌價</p>
            </div>
            <div className={styles.purchaseNumber}>
              <span>我的實付</span>
              <strong>NT$6,500</strong>
            </div>
            <div className={styles.purchaseOfficial}>
              <span>目前官方定價</span>
              <strong>NT$7,680</strong>
              <small>兩個價格分開記錄<br />避免把歷史活動價當成官方現價</small>
            </div>
          </Reveal>
          <div className={styles.swipeLabel}>左右滑動看通路 →</div>
          <div className={styles.marketRail} aria-label="2026 年 8 月 24 日防水外套通路比較">
            {channelCards.map((card) => (
              <Reveal className={styles.marketCard} key={`${card.channel}-${card.lead}`}>
                <span className={styles.marketChannel}>{card.channel}</span>
                <div>
                  <h3>{card.lead}</h3>
                  <span className={styles.priceLabel}>{card.priceLabel}</span>
                  <strong>{card.price}</strong>
                  <p>{card.detail}</p>
                </div>
                <small>這次查到的相關品牌</small>
                <div className={styles.brandCloud} aria-label={`${card.channel} 本次查到的相關品牌`}>
                  {card.brands.map((brand) => <span key={brand}>{brand}</span>)}
                </div>
                <a href={card.href} target="_blank" rel="noreferrer">{card.linkLabel} ↗</a>
              </Reveal>
            ))}
          </div>
          <Reveal className={styles.marketNote}>
            <LineText text="這不是四個平台都有同一款的假完整比價｜是我今天真的查得到的頁面快照｜價格與尺寸可能隨時變動｜下單前還是要回商品頁確認" />
          </Reveal>
        </section>

        <section className={styles.quickAnswer}>
          <Reveal>
            <p className={styles.kicker}>THE ANSWER I PROMISED IN THE VIDEO</p>
            <h2>先講答案<br />我穿的是 Mont-bell Rain Trekker</h2>
          </Reveal>
          <div className={styles.answerGrid}>
            <Reveal className={styles.answerCard}>
              <span>它是什麼？</span>
              <p>
                <LineText text="一件防水透濕的外層 Shell｜它不負責把你穿暖｜主要工作就是把雨和風擋在外面｜冷的時候再靠裡面的美麗諾或羽絨保暖" />
              </p>
            </Reveal>
            <Reveal className={`${styles.answerCard} ${styles.answerMain}`}>
              <span>我為什麼買？</span>
              <p>
                <LineText text="因為它夠輕｜收得小｜活動不卡｜同級外套都看過一輪後｜我最喜歡它穿起來的樣子" />
              </p>
            </Reveal>
          </div>
          <Reveal className={styles.notSponsored}>
            <LineText text="影片裡說的是真的｜這次不是業配｜只是如果 Mont-bell 看到｜我沒有拒絕業配" />
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
            <LineText text="我不是在找規格最強的雨衣｜我要的是旅行 登山 外景拍攝都能用｜不下雨時也願意一直放在包包裡的外殼" />
          </p>
          <blockquote>
            <LineText text="一件規格很強｜但你不想穿的外套｜CP 值其實很低" />
          </blockquote>
        </Reveal>

        <section className={styles.gateSection} id="decision">
          <Reveal>
            <div className={styles.sectionHead}>
              <span>02</span>
              <div>
                <p>挑衝鋒衣先過三關</p>
                <h2>不是只看防水數字<br />是先問它能不能完成任務</h2>
              </div>
            </div>
          </Reveal>
          <Reveal className={styles.gateVisual}>
            <Image
              src="/field-notes/montbell-rain-trekker/shell-three-gates.jpg"
              alt="概念圖以三個畫面呈現大雨防水 透氣活動與輕量收納"
              width={1536}
              height={1024}
              sizes="(max-width: 820px) 100vw, 1120px"
            />
            <span>ChatGPT 概念圖｜不是品牌規格或實穿證據</span>
          </Reveal>
          <div className={styles.swipeLabel}>左右滑動看三個門檻 →</div>
          <div className={styles.gateRail} aria-label="選擇防水外殼的三個門檻">
            {[
              ["01", "大雨扛不扛得住", "先看防水膜 全壓膠 拉鍊 帽兜與袖口｜毛毛雨沒事不代表連續大雨也守得住"],
              ["02", "穿久會不會悶卡", "透氣孔很有用｜肩膀與手臂也要能動｜但這些不能交換掉防水底線"],
              ["03", "雨停還會不會帶", "重量與收納體積決定它會不會一直留在包裡｜帥則是最後讓我真的想穿的決勝點"],
            ].map(([num, title, body]) => (
              <Reveal key={num} className={styles.gateCard}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p><LineText text={body} /></p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.productStage}>
          <div className={styles.productSpotlight}>
            <div className={styles.productCopy}>
              <p className={styles.kicker}>THE ONE I BOUGHT</p>
              <h2>夠輕<br />收得小<br /><i>而且帥</i></h2>
              <p>
                <LineText text="腋下拉鍊對我沒有那麼重要｜我真正每天會感受到的｜是它背在包裡的重量｜脫下來佔多少空間｜還有穿上去時我喜不喜歡自己" />
              </p>
            </div>
            <div className={styles.productVisual}>
              <Image
                src="/field-notes/montbell-rain-trekker/rain-trekker-official.jpg"
                alt="Mont-bell Rain Trekker GTX 男款雨衣官方產品照"
                width={480}
                height={480}
                className={styles.productImage}
              />
              <span className={styles.productStamp}>301g<br />8 × 8 × 17cm</span>
              <a href={MONTBELL_URL} target="_blank" rel="noreferrer" className={styles.imageCredit}>
                產品圖／Mont-bell Taiwan 官方
              </a>
            </div>
          </div>
        </section>

        <section className={styles.factSection}>
          <Reveal>
            <div className={styles.sectionHead}>
              <span>03</span>
              <div>
                <p>目前官方男款 #1128729</p>
                <h2>規格不是主角<br />但它要先過基本門檻</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.factGrid}>
            <Reveal className={styles.factCard}>
              <span className={styles.factLabel}>重量</span>
              <strong>301<small>g</small></strong>
              <h3>拿起來<br />大約一瓶 300mL 水的重量</h3>
              <p>不是完全沒重量<br />但不像再塞一件厚外套進包包</p>
            </Reveal>
            <Reveal className={styles.factCard}>
              <span className={styles.factLabel}>收納</span>
              <strong>8×8×17<small>cm</small></strong>
              <h3>收起來<br />約一個 500mL 保溫杯占的空間</h3>
              <p>不穿時可以塞回包裡<br />不用一路拿在手上</p>
            </Reveal>
            <Reveal className={styles.factCard}>
              <span className={styles.factLabel}>結構</span>
              <strong>3<small>L</small></strong>
              <h3>不是三件衣服<br />是像三明治的三層結構</h3>
              <p>外層面對摩擦<br />中間防水透濕<br />內層保護薄膜</p>
            </Reveal>
          </div>
          <Reveal>
            <p className={styles.factNote}>
              <LineText text="這裡列的是 2026 年 8 月 24 日臺灣官網現行男款資料｜不同年份 性別與型號的重量和材質可能不同｜實際版本仍以衣服內標與型號為準" />
            </p>
          </Reveal>
        </section>

        <section className={styles.candidates}>
          <Reveal>
            <div className={styles.sectionHead}>
              <span>04</span>
              <div>
                <p>三件外套放在同一條尺上</p>
                <h2>差異最大的不是品牌<br />是預算 重量與取捨</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.productCompareGrid}>
            {compareProducts.map((product) => (
              <Reveal className={`${styles.compareProduct} ${product.winner ? styles.compareWinner : ""}`} key={product.model}>
                <a href={product.href} target="_blank" rel="noreferrer" className={styles.compareImage}>
                  <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 820px) 100vw, 33vw" />
                </a>
                <div className={styles.compareProductCopy}>
                  <span>{product.brand}</span>
                  <h3>{product.model}</h3>
                  <small>{product.priceLabel}</small>
                  <strong>{product.price}</strong>
                  <div className={styles.weightLine}>
                    <b>{product.weight}</b>
                    <small>{product.weightLabel}</small>
                  </div>
                  <p className={styles.productAdvantage}><LineText text={product.advantage} /></p>
                  <p className={styles.productTradeoff}><LineText text={product.tradeoff} /></p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className={styles.historyNote}><LineText text="產品圖皆來自各品牌或台灣正式代理商品頁｜MH150 的大雨表現是我的個人實穿紀錄｜不代表每一件產品都會得到相同結果" /></p>
        </section>

        <section className={styles.compareSection}>
          <Reveal>
            <div className={styles.sectionHead}>
              <span>05</span>
              <div>
                <p>Mont-bell vs Patagonia</p>
                <h2>同樣能擋雨<br />差別是你想把重量花在哪裡</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.differenceList}>
            <Reveal className={styles.differenceRow}>
              <span>01｜預算門檻</span>
              <h3>不到兩千<br />或六到七千</h3>
              <p><strong>MH150 是入門價位</strong><br />Rain Trekker 和 Torrentshell 才是同價帶對手</p>
            </Reveal>
            <Reveal className={styles.differenceRow}>
              <span>02｜每天背著走</span>
              <h3>301g<br />比 400g 少 99g</h3>
              <p><strong>Mont-bell 的差異最直接</strong><br />不是一個漂亮數字<br />是它比較容易一直留在包裡</p>
            </Reveal>
            <Reveal className={styles.differenceRow}>
              <span>03｜功能取捨</span>
              <h3>口袋<br />通風<br />還是輕與好收</h3>
              <p><strong>Decathlon 給我更多口袋</strong><br />Patagonia 給我腋下拉鍊<br />Mont-bell 給我最在乎的輕 好收 還有帥</p>
            </Reveal>
          </div>
          <Reveal className={styles.verdict}>
            <span>MY VERDICT</span>
            <p>
              <LineText text="Patagonia 沒有不好｜只是對我來說 Pit Zip 的價值｜沒有大到能抵過每天背著的重量｜Rain Trekker 已經夠防水｜比較輕｜能收得小｜而且我更喜歡它穿起來的樣子" />
            </p>
          </Reveal>
        </section>

        <section className={styles.storeSection}>
          <Reveal className={styles.storeCopy}>
            <div className={styles.sectionHead}>
              <span>06</span>
              <div>
                <p>為什麼最後現場買</p>
                <h2>價差不大時<br />我買的是確定性</h2>
              </div>
            </div>
            <p><LineText text="我最後是在台中大遠百現場買｜當時剛好遇到門市活動｜網拍沒有便宜到值得我承擔尺寸 版型 色差與退換貨的風險｜這件會跟著我拍攝 旅行 登山｜我要先知道背上器材後還舒不舒服" /></p>
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
              <span>07</span>
              <div>
                <p>後來我才懂的事</p>
                <h2>不是找一件萬能外套<br />是讓每一層只做好一件事</h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.systemLayout}>
            <Reveal className={styles.systemPhoto}>
              <Image src="/field-notes/montbell-rain-trekker/video-detail.jpg" alt="Oscar 穿著 Mont-bell Rain Trekker 的外套細節" fill sizes="(max-width: 820px) 100vw, 42vw" />
              <span>實際穿著畫面<br />Shell 只負責防雨與擋風</span>
            </Reveal>
            <div className={styles.layerStack}>
            <Reveal className={styles.layer}><span>01</span><b>BASE</b><strong>Merino 190g/m²</strong><p>保暖、排濕、抗臭</p></Reveal>
            <Reveal className={styles.layer}><span>02</span><b>WIND</b><strong>Decathlon MH500</strong><p>防風、防曬，約 150g 等級</p></Reveal>
            <Reveal className={`${styles.layer} ${styles.shellLayer}`}><span>03</span><b>SHELL</b><strong>Mont-bell Rain Trekker</strong><p>防水、防風</p></Reveal>
            <Reveal className={styles.layer}><span>04</span><b>WARMTH</b><strong>Down Insulation</strong><p>保暖、可壓縮；目前仍在補</p></Reveal>
            </div>
          </div>
          <Reveal className={styles.systemQuote}>
            <LineText text="Rain Trekker 不需要保暖｜羽絨不需要負責下雨｜美麗諾不需要擋風｜每一層把一件事做好｜組起來反而比一件又厚又重的萬能外套更好用" />
          </Reveal>
        </section>

        <section className={styles.scoreSection}>
          <Reveal>
            <div className={styles.sectionHead}>
              <span>08</span>
              <div>
                <p>OSCAR GEAR SCORE</p>
                <h2>我以後評裝備<br />就看這五件事</h2>
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
              <span>通勤／毛毛雨</span><h3>迪卡儂可以看</h3><p><LineText text="價格低｜口袋多｜透氣孔多｜但我不會再把它當登山大雨的主力防水" /></p>
            </Reveal>
            <Reveal className={styles.recommendCard}>
              <span>旅行＋偶爾登山</span><h3>開始值得看專業外殼</h3><p><LineText text="Mont-bell Patagonia TNF 都該一起試｜不要只看平台上誰折最多" /></p>
            </Reveal>
            <Reveal className={`${styles.recommendCard} ${styles.recommendMain}`}>
              <span>常旅行／戶外工作</span><h3>我會把預算放在 Rain Trekker</h3><p><LineText text="一年穿很多次｜重量 收納與穿著體驗｜每天都會重新計算一次" /></p>
            </Reveal>
          </div>
          <Reveal className={styles.finalLine}>
            <p>我最後選的不是最便宜<br />也不是規格最滿</p>
            <strong>是我真的會一直帶出門的那一件</strong>
          </Reveal>
        </section>

        <section className={styles.sources}>
          <p>資料與圖片來源 · 查核日 2026.08.24</p>
          <a href={MONTBELL_URL} target="_blank" rel="noreferrer">Mont-bell Taiwan｜Rain Trekker GTX 男款 #1128729 ↗</a>
          <a href={PCHOME_URL} target="_blank" rel="noreferrer">PChome 24h｜Rain Trekker 當日頁面 ↗</a>
          <a href={MOMO_URL} target="_blank" rel="noreferrer">momo｜防水外套搜尋頁 ↗</a>
          <a href={DECATHLON_URL} target="_blank" rel="noreferrer">Decathlon Taiwan｜MH150 男款 #8540225 ↗</a>
          <a href={PRO_OUTDOOR_URL} target="_blank" rel="noreferrer">Pro Outdoor｜Patagonia Torrentshell 3L 臺灣授權通路 ↗</a>
          <a href={PATAGONIA_URL} target="_blank" rel="noreferrer">Patagonia｜Men&apos;s Torrentshell 3L Rain Jacket #85241 ↗</a>
          <small><LineText text="本文中的主觀評分與購買理由為 Oscar 的個人使用紀錄｜通路價格是 2026 年 8 月 24 日可查頁面快照｜活動 庫存與尺寸可能調整｜購買前請重新查看商品頁" /></small>
        </section>

        <footer className={styles.footer}>
          <Link href="/field-notes">← 回到全部筆記</Link>
          <a href={MONTBELL_URL} target="_blank" rel="noreferrer">查看官方產品頁 ↗</a>
        </footer>
      </article>
    </main>
  );
}
