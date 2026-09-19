"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ai-knows-your-face.module.css";

const prompts = [
  {
    label: "PROMPT 01 / 讓 GPT 幫你選一個時代",
    title: "你覺得我適合活在哪個年代？",
    copy: `請根據我們過去的對話，以及你目前對我的個性、工作、審美與生活方式的了解，替我設計一個最適合我的人物形象。

請先根據我的實際年齡來判斷；如果你不知道我的年齡，先問我，不要自行編造。

接著告訴我：
1. 我最適合哪一個時代與地區
2. 我在那個時代可能會是什麼身分或職業
3. 適合我的髮型、五官氣質、服裝、配件與姿態
4. 這些選擇分別對應到我哪些個性特徵

最後，請把以上內容整合成一段可以直接交給 AI 生圖工具使用的英文 Prompt。畫面要像真實人物攝影，不要只寫抽象形容詞；要具體描述年代、服裝材質、場景、光線、鏡位與表情。`,
  },
  {
    label: "PROMPT 02 / 讓 GPT 說它眼中的你",
    title: "不要問朋友，問那個看完你所有廢話的 AI",
    copy: `根據你在我們過去對話中對我的了解，描述你認為我真正給人的第一印象，以及熟悉之後會發現的反差。

請把這些觀察轉換成一個完整的人物造型提案，內容包含：
- 符合我年齡的外貌特徵
- 最能代表我的時代背景
- 髮型、穿搭、配件與色彩
- 適合我的場景、表情、姿勢與鏡頭焦段
- 為什麼這套形象像我，而不只是好看

最後輸出一段可以直接用於 AI 生圖的英文 Prompt，不要美化成完美的人，也不要改變我的族裔與真實年齡。保留我原本可能有點奇怪、但有辨識度的地方。

其他的敘述都不需要，全部都變成一隻牛。`,
  },
];

export default function AiKnowsYourFaceArticle() {
  const [copied, setCopied] = useState<number | null>(null);

  const copyPrompt = async (index: number) => {
    await navigator.clipboard.writeText(prompts[index].copy);
    setCopied(index);
    window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <main className={styles.page}>
      <div className={styles.texture} aria-hidden />
      <nav className={styles.nav}>
        <Link href="/field-notes">← FIELD NOTES</Link>
        <span>AI FACE REPORT / 2026</span>
      </nav>

      <section className={styles.result} aria-labelledby="ai-result">
        <p className={styles.status}>ANALYSIS COMPLETE</p>
        <h1 id="ai-result">
          <span>你</span><span>超</span><span>醜</span>
        </h1>
        <div className={styles.resultFoot}>
          <p className={styles.note}>我想我的 AI 是這樣跟我說的</p>
          <p className={styles.disclaimer}>本頁不代表所有 AI 的審美，只代表我的 AI 很沒有禮貌</p>
        </div>
      </section>

      <section className={styles.promptSection} aria-labelledby="prompt-title">
        <div className={styles.promptIntro}>
          <p>OK，笑完了來點真的</p>
          <h2 id="prompt-title">讓那個最了解你的 AI<br />幫你決定你該長怎樣</h2>
          <span>這兩段可以直接丟給 ChatGPT。至少理論上可以。</span>
        </div>

        <div className={styles.promptGrid}>
          {prompts.map((prompt, index) => (
            <article className={styles.promptCard} key={prompt.label}>
              <div className={styles.promptHead}>
                <p>{prompt.label}</p>
                <button type="button" onClick={() => copyPrompt(index)}>
                  {copied === index ? "已複製，祝你好運" : "複製 Prompt"}
                </button>
              </div>
              <h3>{prompt.title}</h3>
              <pre>{prompt.copy}</pre>
            </article>
          ))}
        </div>

        <p className={styles.footerNote}>請養成看完 Prompt 再複製的好習慣</p>
      </section>
    </main>
  );
}
