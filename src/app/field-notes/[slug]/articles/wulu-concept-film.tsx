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
        <p key="p1">
          WULU（霧鹿）是一個完全虛構的台灣單一麥芽威士忌品牌
        </p>
        <p key="p2">
          這個專案只有一個問題：
          如果今天有一個品牌找我製作，
          我能否先利用 AI 完成一支具有品牌感的 Concept Film？
        </p>
        <p key="p3">
          目的不是證明 AI 可以取代任何職業。
          而是測試整個工作流程
        </p>
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     Brand Banner — Key Visual
     ══════════════════════════════════════════════════════════════ */
  {
    type: "image",
    item: {
      src:     "/field-notes/wulu/brand-banner.png",
      alt:     "WULU 霧鹿 — Taiwan Single Malt Whisky No.7",
      caption: "WULU 霧鹿 · No.7 · Taiwan Single Malt Whisky",
    },
    frame: "banner",
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
    type:        "video-lazy",
    src:         "/field-notes/wulu/film.mp4",
    aspectRatio: "16/9",
    caption:     "WULU 霧鹿 — AI Concept Film · 2026",
  },

  /* ══════════════════════════════════════════════════════════════
     IG Reel 版本
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "ig-reel",
    text: "IG 版本",
    sub:  "46 秒，針對社群重新剪輯",
  },
  {
    type:        "video-lazy",
    src:         "/field-notes/wulu/ig-reel.mp4",
    aspectRatio: "9/16",
    maxWidth:    "360px",
    caption:     "WULU 霧鹿 · IG Reel · 46 sec",
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
      src:     "/field-notes/wulu/storyboard.png",
      alt:     "WULU Storyboard — 15 個鏡頭分鏡表",
      caption: "15 個鏡頭，每一格對應一個獨立剪輯點",
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
    type:  "prompt-copy",
    label: "AI Video Prompt · Seedance · 逐字",
    text:  `Use @Image1 as a numbered storyboard sheet. Interpret the 15 numbered panels (01 to 15) as sequential cinematic cuts in reading order, left to right, top to bottom. Do not animate the storyboard as one single image. Each panel is one cut, approximately 1 second each. 15 seconds total.

This is a premium Taiwan single malt whisky commercial — WULU 霧鹿. Deep, slow, atmospheric, building to a climax. High-mountain mist meets master distillery craft.

01 Opening: Bottle on a dark oak cask, mountain mist drifting, candle flickering. Slow push-in.
02 Hero: Full bottle against dark fog. Static. Mist drifts behind.
03 Label: Macro of the WULU 霧鹿 label. Light rakes across paper texture.
04 Wax Seal: Top-down macro of the forest-green wax cork. Slow tilt, light glints.
05 Cask Number: Extreme macro of hand-inked "No.7". Static, candlelight drift.
06 Whisky Pour: Amber whisky pours into a crystal glass. Side macro, natural speed.
07 Golden Swirl: Top-down, whisky swirling in the glass, light dancing.
08 Candlelight Glass: A hand holds the glass near a candle flame, mist behind, liquid glows.
09 Distillery: Wide atmospheric — bottle among aging oak casks in a dim mountain warehouse.
10 360 Orbit: A ribbon of golden light swirls and orbits around the bottle against black.
11 Liquid Macro: Extreme through-glass macro of amber-gold whisky, glowing and shifting.
12 Pour Slow-Mo: High-speed slow-motion whisky pour, droplets suspended, crown splash.
13 Mountain Dusk: Wide — bottle against the Central Mountain Range at sunset, rolling fog below.
14 Final Hero: Bottle under a single warm gold spotlight, mist curling at its base. Hold.
15 End Frame: Gold "WULU 霧鹿 No.7" logo on black. Static, faint shimmer, settle.

The energy builds: quiet and reverent in 01–05, richer and more sensory through 06–12, majestic and resolved in 13–15.

Camera is restrained throughout — slow push-ins, macro raking, one orbit in frame 10. Movement comes from mist, candlelight, pouring and swirling liquid, the slow-mo splash, and rolling mountain fog. Never let the camera show off.

Deep gold and amber tones meeting cool mountain-mist blue. Candlelight warmth. Premium artisan spirits photography, ultra-detailed, cinematic. Taiwan high-mountain whisky soul.

No on-screen text changes, no watermark. Audio added in post.`,
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
        <p key="p4">
          每個品牌，都有一個真正的核心。
          可能是一座山，可能是一片海，也可能是一種精神
        </p>
        <p key="p5">
          真正需要思考的只有一件事：
        </p>
        <p key="p6">
          如果這個品牌是一個人，它會是什麼樣的人？
        </p>
        <p key="p7">
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
      <p key="p8">
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
        <li key="i0" style={{ fontFamily: "var(--font-readex),sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, listStyleType: "none", paddingLeft: 0 }}>材質 — 玻璃、木頭、霧、水滴、蠟封</li>
        <li key="i1" style={{ fontFamily: "var(--font-readex),sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, listStyleType: "none", paddingLeft: 0 }}>色彩 — 琥珀金、森林綠、冷霧藍</li>
        <li key="i2" style={{ fontFamily: "var(--font-readex),sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, listStyleType: "none", paddingLeft: 0 }}>光影 — 燭光、自然光、聚光</li>
        <li key="i3" style={{ fontFamily: "var(--font-readex),sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, listStyleType: "none", paddingLeft: 0 }}>空間 — 酒窖、高山、木桶</li>
        <li key="i4" style={{ fontFamily: "var(--font-readex),sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, listStyleType: "none", paddingLeft: 0 }}>運鏡 — 慢推、Macro、Orbit</li>
      </ul>
    ),
  },
  {
    type: "image",
    item: {
      src:     "/field-notes/wulu/brand-board.png",
      alt:     "WULU 霧鹿 品牌視覺板",
      caption: "從品牌核心到畫面元素——完整的視覺語言",
    },
    frame: "wide",
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
        <p key="p9">
          每個鏡頭不是越炫越好。
          而是每一秒都知道：這一秒，觀眾應該看什麼
        </p>
        <p key="p10">
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
        <p key="p11">
          第一秒決定觀眾會不會繼續看
        </p>
        <p key="p12">
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
        <p key="p13">
          AI 很容易生成漂亮的畫面。
          但真正有品牌感的是光
        </p>
        <p key="p14">
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
        <strong key="s1">工作流程框架：</strong>
        <span key="s2">品牌內核 → 核心視覺 → 鏡頭節奏 → 光影設計 → Prompt → AI Generation</span>
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
        <p key="p15">
          很多人認為：只要拿到 Prompt，就可以生成同樣的作品
        </p>
        <p key="p16">
          但我自己的經驗是——Prompt 更像是最後一步。
          真正花時間的，其實是品牌定位、視覺設計、鏡頭安排、節奏與光影
        </p>
        <p key="p17">
          當這些都建立完成後，
          Prompt 才有辦法把想像完整地傳達給 AI
        </p>
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
        <p key="p18">
          如果你做出了自己的版本，歡迎分享給我
        </p>
        <p key="p19">
          我很期待看到同一份 Prompt，在不同創作者手中，
          會長出什麼樣的作品
        </p>
      </>
    ),
  },
];

export default wuluBlocks;
