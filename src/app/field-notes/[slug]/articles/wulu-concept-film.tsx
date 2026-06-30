/**
 * Field Notes — WULU 霧鹿 Concept Film Case Study
 * slug: wulu-concept-film  (articleType: "editorial-v2")
 *
 * Design Studio Project Case 風格
 * 保持簡潔、專業、有思考，每段 2–5 行
 */

import type { Block } from "@/components/field-notes/editorial/types";

const wuluBlocks: Block[] = [

  /* ══════════════════════════════════════════════════════════════
     Project Intro
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "project",
    text: "WULU 霧鹿",
    sub:  "一個不存在的品牌。一支具有品牌感的 Concept Film",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          WULU（霧鹿）是一個完全虛構的台灣單一麥芽威士忌品牌
        </p>
        <p>
          這個專案只有一個問題：
          如果今天有一個品牌找我製作，
          我能否先利用 AI 完成一支具有品牌感的 Concept Film？
        </p>
        <p>
          目的不是證明 AI 可以取代任何職業。
          而是測試整個工作流程
        </p>
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     最終成果
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "result",
    text: "最終成果",
    sub:  "Final Result",
  },
  {
    type:        "video",
    placeholder: "WULU 概念影片｜需要 Oscar 補素材",
    frame:       "wide",
  },

  /* ══════════════════════════════════════════════════════════════
     Storyboard
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "storyboard",
    text: "Storyboard",
    sub:  "15 個鏡頭，每一格都是一個獨立鏡頭",
  },
  {
    type: "image",
    item: {
      src:     "",
      alt:     "WULU Storyboard",
      caption: "需要 Oscar 補素材",
    },
    frame: "wide",
  },
  {
    type: "callout",
    content: (
      <>
        所有影片都是依照 Storyboard 製作。
        每一格都是一個獨立鏡頭——
        不是把整張 Storyboard 動畫化
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     Production Workflow
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "workflow",
    text: "Production Workflow",
    sub:  "完整製作流程",
  },
  {
    type: "text",
    content: (
      <ol style={{ paddingLeft: "1.4em", margin: 0, display: "flex", flexDirection: "column", gap: "10px", listStyleType: "decimal" }}>
        {[
          "建立品牌世界觀",
          "設計 Storyboard",
          "撰寫影片 Prompt",
          "AI Video Generation",
          "剪輯、配樂、調色",
        ].map((step, i) => (
          <li key={i} style={{ fontFamily: "var(--font-readex),sans-serif", fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
            {step}
          </li>
        ))}
      </ol>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     Prompt
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "prompt",
    text: "Prompt",
    sub:  "完整使用的影片 Prompt（逐字）",
  },
  {
    type: "callout",
    content: (
      <>
        <strong style={{ color: "rgba(255,225,140,0.75)", fontWeight: 400 }}>需要 Oscar 補充：</strong>
        完整 AI Video Prompt，逐字放上，不修改
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     Creative Notes
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "creative-notes",
    text: "Creative Notes",
    sub:  "Prompt 之前，真正花時間的事",
  },

  /* 01 Brand Core */
  {
    type: "headline",
    id:   "brand-core",
    text: "提取品牌內核",
    sub:  "Brand Core · 01",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          每個品牌，都有一個真正的核心。
          可能是一座山，可能是一片海，也可能是一種精神
        </p>
        <p>
          真正需要思考的只有一件事：
        </p>
        <p>
          如果這個品牌是一個人，它會是什麼樣的人？
        </p>
        <p>
          WULU 的核心不是威士忌。
          而是高山、時間、霧、職人工藝，以及台灣。
          Prompt 只是把這些內容翻譯給 AI
        </p>
      </>
    ),
  },

  /* 02 Visual Translation */
  {
    type: "headline",
    id:   "visual-translation",
    text: "核心視覺轉換",
    sub:  "Visual Translation · 02",
  },
  {
    type: "text",
    content: (
      <p>
        品牌核心建立後，下一步是把抽象概念轉換成畫面。
        材質、色彩、光影、空間、運鏡節奏——
        每一個選擇都服務於品牌辨識度，
        不是為了好看
      </p>
    ),
  },
  {
    type: "callout",
    content: (
      <ul style={{ paddingLeft: "1.2em", margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
        {[
          "材質 — 玻璃、木頭、霧、水滴、蠟封",
          "色彩 — 琥珀金、森林綠、冷霧藍",
          "光影 — 燭光、自然光、聚光",
          "空間 — 酒窖、高山、木桶",
          "運鏡 — 慢推、Macro、Orbit",
        ].map((item, i) => (
          <li key={i} style={{ fontFamily: "var(--font-readex),sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, listStyleType: "none", paddingLeft: 0 }}>
            {item}
          </li>
        ))}
      </ul>
    ),
  },

  /* 03 Rhythm */
  {
    type: "headline",
    id:   "rhythm",
    text: "鏡頭節奏",
    sub:  "Rhythm · 03",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          每個鏡頭不是越炫越好。
          而是每一秒都知道：這一秒，觀眾應該看什麼
        </p>
        <p>
          前段建立品牌。中段建立感官。最後建立情緒。
          節奏比鏡頭數量更重要
        </p>
      </>
    ),
  },

  /* 04 Hook */
  {
    type: "headline",
    id:   "hook",
    text: "Hook",
    sub:  "第一秒 · 04",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          第一秒決定觀眾會不會繼續看
        </p>
        <p>
          Hook 不一定是最快。而是最快建立情緒。
          有時候，一個很安靜的鏡頭，
          比快速剪輯更有力量
        </p>
      </>
    ),
  },

  /* 05 Lighting */
  {
    type: "headline",
    id:   "lighting",
    text: "Lighting",
    sub:  "光影 · 05",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          AI 很容易生成漂亮的畫面。
          但真正有品牌感的是光
        </p>
        <p>
          光從哪裡來？為什麼從那裡來？
          它服務的是產品，還是情緒？
        </p>
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     Framework Callout
     ══════════════════════════════════════════════════════════════ */
  {
    type: "callout",
    content: (
      <>
        <strong>工作流程框架：</strong>
        品牌內核 → 核心視覺 → 鏡頭節奏 → 光影設計 → Prompt → AI Generation
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     Oscar's Notes / Biggest Takeaway
     ══════════════════════════════════════════════════════════════ */
  {
    type: "oscar-notes",
    content: (
      <>
        <p>
          很多人認為：只要拿到 Prompt，就可以生成同樣的作品
        </p>
        <p>
          但我自己的經驗是——Prompt 更像是最後一步。
          真正花時間的，其實是品牌定位、視覺設計、鏡頭安排、節奏與光影
        </p>
        <p>
          當這些都建立完成後，
          Prompt 才有辦法把想像完整地傳達給 AI
        </p>
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     Downloads
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "downloads",
    text: "Downloads",
    sub:  "免費下載",
  },
  {
    type: "callout",
    content: (
      <>
        Storyboard 與完整 Prompt 下載連結（需要 Oscar 補充素材與連結）
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     下一站
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "next-stop",
    text: "下一站",
    sub:  "更多 AI 實驗",
  },
  {
    type:  "related",
    slugs: ["seedance-aerial"],
  },

  /* ══════════════════════════════════════════════════════════════
     Closing
     ══════════════════════════════════════════════════════════════ */
  {
    type: "closing",
    content: (
      <>
        <p>
          如果你做出了自己的版本，歡迎分享給我
        </p>
        <p>
          我很期待看到同一份 Prompt，在不同創作者手中，
          會長出什麼樣的作品
        </p>
      </>
    ),
  },
];

export default wuluBlocks;
