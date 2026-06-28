import type { Metadata } from "next";
import Link from "next/link";
import FieldNoteNav from "@/components/FieldNoteNav";
import ScrollUnlock from "@/components/ScrollUnlock";

const SITE_URL = "https://minehoooo.xyz";
const TOOL_URL = "https://higgsfield.ai/";
const TUTORIAL_PATH = "/field-notes/seedance-aerial";

export const metadata: Metadata = {
  title: "Higgsfield × Seedance | MINEH4O Tools",
  description:
    "Oscar 使用的 AI 影片工作台。將圖片、路徑與 Prompt 轉換成可用的 AI 動態鏡頭。",
  alternates: { canonical: `${SITE_URL}/tools/higgsfield-seedance` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/tools/higgsfield-seedance`,
    title: "Higgsfield × Seedance — Oscar 使用的 AI 影片工作台",
    description: "把圖片、路徑與 Prompt，轉換成可用的 AI 動態鏡頭。",
    siteName: "MINEH4O Tools",
  },
};

const GLASS: React.CSSProperties = {
  background: "rgba(255,255,255,0.055)",
  backdropFilter: "blur(22px) saturate(125%)",
  WebkitBackdropFilter: "blur(22px) saturate(125%)",
  border: "1px solid rgba(255,255,255,0.14)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.24)",
  borderRadius: 16,
};

export default function HiggsfieldToolPage() {
  return (
    <main
      className="min-h-screen bg-black text-white relative"
      style={{ overflowY: "auto" }}
    >
      <ScrollUnlock />

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.05,
          mixBlendMode: "screen",
        }}
      />

      <FieldNoteNav
        active="aigc"
        crumbEn={["MINEH4O", "AIGC", "TOOLS"]}
        crumbZh={["作品集", "AI 影像", "工具"]}
        category="HIGGSFIELD × SEEDANCE"
      />

      <div className="relative max-w-[1100px] mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-20 md:pb-24">

        {/* Masthead */}
        <p
          className="font-mono-label uppercase"
          style={{
            fontSize: 10, letterSpacing: "0.42em",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Tool · 軟體介紹
        </p>
        <h1
          className="font-display leading-[1.02] mt-3 md:mt-4"
          style={{
            fontSize: "clamp(2.4rem, 6.5vw, 4.8rem)",
            color: "var(--text)",
            letterSpacing: "-0.005em",
            textTransform: "uppercase",
          }}
        >
          Higgsfield × Seedance
        </h1>
        <p
          className="mt-4 md:mt-5 max-w-xl"
          style={{
            fontSize: "clamp(15px, 1.5vw, 17px)",
            color: "rgba(255,255,255,0.7)",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Oscar 使用的 AI 影片工作台。<br/>
          把圖片、路徑與 Prompt，轉換成可用的 AI 動態鏡頭。
        </p>

        {/* Block 1 — What it does */}
        <Block en="What it does" zh="這個工具能做什麼">
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.85, color: "rgba(255,255,255,0.78)" }}>
            上傳一張含路徑、箭頭與 Start / End 標記的圖片。<br/>
            搭配 Prompt，產生一段一鏡到底的 FPV 城市空拍鏡頭。
          </p>
        </Block>

        {/* Block 2 — Why I use it */}
        <Block en="Why I use it" zh="Oscar 為什麼選它">
          <ul className="reason-list">
            {[
              "可使用圖片作為起始畫面，地形與比例不會跑掉。",
              "適合 FPV 與建築穿梭鏡頭，運動軌跡更可控。",
              "能搭配路徑標示控制運鏡方向、起點與終點。",
              "適合快速測試多個版本，迭代不需要重做場景。",
            ].map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </Block>

        {/* Block 3 — What you need */}
        <Block en="What you need" zh="開始前準備">
          <ol className="need-list">
            <li><span className="need-num">01</span> 含路徑、箭頭與 Start / End 標記的圖片</li>
            <li><span className="need-num">02</span> Oscar 的 Prompt（可在教學頁複製）</li>
            <li><span className="need-num">03</span> Higgsfield 帳號</li>
          </ol>
        </Block>

        {/* Block 4 — Start here */}
        <Block en="Start here" zh="兩個入口" omitMargin>
          <div className="start-grid">
            <a
              href={TOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="start-btn start-btn-primary"
            >
              <span>Open Higgsfield</span>
              <span aria-hidden style={{ fontSize: 16 }}>↗</span>
            </a>
            <Link href={TUTORIAL_PATH} className="start-btn start-btn-ghost">
              <span>View Seedance Tutorial</span>
              <span aria-hidden style={{ fontSize: 16 }}>→</span>
            </Link>
          </div>
        </Block>

        {/* Footer */}
        <footer
          className="pt-10 mt-14 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <span
            className="font-mono-label uppercase"
            style={{ fontSize: 9.5, letterSpacing: "0.32em", color: "rgba(255,255,255,0.5)" }}
          >
            © MINEH4O.ARW
          </span>
          <Link
            href="/field-notes"
            className="font-mono-label uppercase"
            style={{
              fontSize: 9.5, letterSpacing: "0.32em",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.18)",
              paddingBottom: 2,
            }}
          >
            All Field Notes →
          </Link>
        </footer>
      </div>

      <style>{`
        .reason-list, .need-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .reason-list li {
          position: relative;
          padding-left: 1.2em;
          font-size: 14.5px;
          line-height: 1.8;
          color: rgba(255,255,255,0.78);
        }
        .reason-list li::before {
          content: "";
          position: absolute;
          left: 0; top: 0.95em;
          width: 8px; height: 1px;
          background: rgba(255,225,140,0.55);
        }
        .need-list li {
          display: flex;
          gap: 12px;
          align-items: baseline;
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(255,255,255,0.86);
        }
        .need-num {
          flex-shrink: 0;
          font-family: var(--font-space-mono), monospace;
          font-size: 10.5px;
          letter-spacing: 0.22em;
          color: rgba(255,225,140,0.85);
          background: rgba(255,225,140,0.05);
          border: 1px solid rgba(255,225,140,0.22);
          padding: 3px 8px;
          border-radius: 6px;
        }

        .start-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .start-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
        }
        .start-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 18px 22px;
          font-family: var(--font-space-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          white-space: nowrap;
          border-radius: 12px;
          border: 1px solid transparent;
          cursor: pointer;
          text-decoration: none;
          transition: color .2s, background .2s, border-color .2s;
        }
        .start-btn-primary {
          color: rgba(20,15,5,0.92);
          background: rgba(255,225,140,0.95);
          border-color: rgba(255,225,140,0.95);
        }
        .start-btn-primary:hover {
          background: rgba(255,235,180,1);
        }
        .start-btn-ghost {
          color: rgba(255,255,255,0.92);
          background: rgba(255,255,255,0.055);
          backdrop-filter: blur(20px) saturate(125%);
          -webkit-backdrop-filter: blur(20px) saturate(125%);
          border-color: rgba(255,255,255,0.18);
        }
        .start-btn-ghost:hover {
          color: #fff;
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.32);
        }
      `}</style>
    </main>
  );
}

function Block({
  en,
  zh,
  children,
  omitMargin = false,
}: {
  en: string;
  zh: string;
  children: React.ReactNode;
  omitMargin?: boolean;
}) {
  return (
    <section className={omitMargin ? "mt-12 md:mt-16" : "mt-10 md:mt-14"}>
      <div className="flex items-center gap-3 mb-4">
        <span
          aria-hidden
          style={{
            width: 28, height: 1,
            background: "linear-gradient(to right, rgba(255,225,140,0.6), transparent)",
          }}
        />
        <p
          className="font-mono-label uppercase"
          style={{
            fontSize: 10, letterSpacing: "0.4em",
            color: "rgba(255,225,140,0.85)",
            margin: 0,
          }}
        >
          {en}
        </p>
        <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", margin: 0 }}>
          {zh}
        </p>
      </div>
      <div style={{ ...GLASS, padding: "22px 24px 24px" }}>
        {children}
      </div>
    </section>
  );
}
