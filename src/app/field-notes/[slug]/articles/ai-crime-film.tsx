/**
 * AI 犯罪短片 — 在家拍四個動作，做出一支地下犯罪電影
 * 資料層：src/data/aiCrimeFilm.ts（shot-mapping 2026-07-14 核可版）
 * 規範：秒數對齊寫「本次實測建議」；成本區隱藏至驗證；用詞 Target Frame／Sequence Storyboard
 */
import type { Block } from "@/components/field-notes/editorial/types";
import { crimeShots, workflowComparison, crimeMistakes, crimeCosts } from "@/data/aiCrimeFilm";

const M = "/field-notes/ai-crime-film";

const blocks: Block[] = [

  /* ═══ 00 · Hero ═══ */
  {
    type: "video-lazy",
    src: `${M}/hero-loop.mp4`,
    caption: "8 秒精華循環 — 完整成片在第 11 章",
    aspectRatio: "16/9",
    autoPlay: true,
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          這支片的所有「動作」，
          都是我在自己家裡拍的：
          <strong key="s">走路、停下、開箱、吃東西 — 四個動作</strong>
        </p>
        <p key="2">
          剩下的九龍城寨、地下賭場、霓虹和槍手，
          全部來自角色設定、Target Frame、Sequence Storyboard
          和 Seedance 2.0，
          最後在 DaVinci 調光收尾
        </p>
      </>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        <strong>這篇筆記的核心觀點：</strong><br />
        影片告訴 AI 我要怎麼演，
        圖片告訴 AI 電影長什麼樣
      </>
    ),
  },
  { type: "higgsfield", variant: "banner" },

  /* ═══ 01 · 30 秒看懂流程 ═══ */
  {
    type: "headline",
    id:   "process",
    text: "30 秒看懂整條流程",
    sub:  "Workflow · 01",
    num:  "01",
  },
  {
    type: "flow-steps",
    steps: [
      { num: "01", en: "Concept",   zh: "構想與腳本",  thumb: `${M}/storyboard-sequence-12-panel.avif`, thumbType: "image", anchor: "shots" },
      { num: "02", en: "Act",       zh: "在家拍動作",  thumb: `${M}/posters/shot-02-corridor-generated.jpg`, thumbType: "image", anchor: "checklist-shoot" },
      { num: "03", en: "Keyframe",  zh: "挑關鍵幀",    thumb: `${M}/shot-01-casino-door-keyframe.avif`, thumbType: "image", anchor: "checklist-keyframe" },
      { num: "04", en: "Design",    zh: "生成目標畫面", thumb: `${M}/shot-01-casino-door-target.avif`, thumbType: "image", anchor: "shots" },
      { num: "05", en: "Seedance",  zh: "生成影片",    thumb: `${M}/posters/shot-04-steak-generated.jpg`, thumbType: "image", anchor: "versus" },
      { num: "06", en: "Grade",     zh: "剪輯與調光",  thumb: `${M}/grade-2-cool-tone.avif`, thumbType: "image", anchor: "grading" },
    ],
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          先看一組完整的過程 —
          同一顆鏡頭，從我家走廊到賭場走廊：
        </p>
      </>
    ),
  },
  {
    type: "stage-switcher",
    title: "SHOT 02 · 從我家走廊到賭場走廊",
    stages: [
      { key: "raw", num: "01", label: "RAW", zh: "原影片", mediaType: "video", src: `${M}/shot-02-corridor-raw.mp4`, poster: `${M}/shot-02-corridor-keyframe.avif`, note: "在家拍的 5 秒直線位移 — 沒有佈景、沒有燈光，只有動作" },
      { key: "kf", num: "02", label: "KEYFRAME", zh: "關鍵幀", mediaType: "image", src: `${M}/shot-02-corridor-keyframe.avif`, note: "從 Raw 挑出姿勢最清楚的一格" },
      { key: "tf", num: "03", label: "TARGET FRAME", zh: "目標畫面", mediaType: "image", src: `${M}/shot-02-corridor-target.avif`, note: "Image-to-Image：同一個姿勢，換上電影的皮" },
      { key: "gen", num: "04", label: "GENERATED", zh: "生成結果", mediaType: "video", src: `${M}/shot-02-corridor-generated.mp4`, poster: `${M}/posters/shot-02-corridor-generated.jpg`, note: "Seedance 2.0 — 位移與速度都吃到 Raw 的表演" },
      { key: "fin", num: "05", label: "FINAL GRADE", zh: "調光成片", mediaType: "video", src: `${M}/final-film.mp4`, poster: `${M}/posters/final-film.jpg`, note: "調光後的完整成片 — 統一色溫與黑位之後，素材才真正屬於同一部電影" },
    ],
  },

  /* ═══ 02 · 素材職責 ═══ */
  {
    type: "headline",
    id:   "roles",
    text: "每種素材只負責一件事",
    sub:  "Asset Roles · 02",
    num:  "02",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          這條流程能走通，
          靠的是每個素材的職責分得非常清楚，
          誰都不越界：
        </p>
        <p key="2">
          <strong key="a">Raw Footage</strong> — 動作、節奏、表演<br key="b1" />
          <strong key="b">關鍵幀 Keyframe</strong> — 姿勢、機位、構圖起點<br key="b2" />
          <strong key="c">Target Frame 目標畫面</strong> — 場景、美術、燈光、最終長相<br key="b3" />
          <strong key="d">Element（@OSCAR-1）</strong> — 身份、臉、髮型、服裝一致性<br key="b4" />
          <strong key="e">道具參考圖</strong> — 款式與顏色鎖定<br key="b5" />
          <strong key="f">Prompt</strong> — 優先級、鏡頭語言、限制條件<br key="b6" />
          <strong key="g">後期</strong> — 節奏、色彩、聲音、統一感
        </p>
      </>
    ),
  },
  {
    type: "image-pair",
    left:  { src: `${M}/actor-oscar-suit.avif`,      alt: "黑西裝版角色設定圖" },
    right: { src: `${M}/prop-black-briefcase.avif`,  alt: "黑色公事包道具圖（閉合與裝滿現金的開啟狀態）" },
    leftLabel:  "角色 — 黑西裝 OSCAR",
    rightLabel: "道具 — 黑色公事包（開關箱是同一只）",
  },
  {
    type: "callout",
    content: (
      <>
        <strong>Element 的正確用法：</strong><br />
        角色三視圖建立成 @OSCAR-1 之後，
        就不要再把白底三視圖當場景參考圖上傳 —
        會出現多個角色、白底污染、三視圖版面滲進影片，
        Element 負責的是身份，不是畫面
      </>
    ),
  },

  /* ═══ 03 · Shot 0–4 ═══ */
  {
    type: "headline",
    id:   "shots",
    text: "五顆鏡頭，逐顆拆解",
    sub:  "Shot Breakdown · 03",
    num:  "03",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          每一顆都有完整的過程可以切換著看：
          原影片 → 關鍵幀 → 目標畫面 → 生成結果，
          成功點、問題和修正也都寫在卡片裡 —
          <strong key="s">包括失敗的部分，那才是值錢的</strong>
        </p>
      </>
    ),
  },
  ...crimeShots.map((shot): Block => ({ type: "shot-breakdown", shot })),
  {
    type: "callout",
    content: (
      <>
        <strong>關於秒數的觀察（本次實測建議，非官方規定）：</strong><br />
        對照上面五顆卡片的數字 —
        Raw 5.7s→生成 5.0s、8.6s→9.0s、7.5s→8.0s，
        當生成長度跟 Raw 非常接近時，動作完整度明顯較高；
        反過來，把 12.6 秒的完整走位硬壓成 5 秒，
        模型就自己挑精華，直接跳過走路（第 05 章有完整案例）
      </>
    ),
  },

  /* ═══ 04 · 兩種工作流 ═══ */
  {
    type: "headline",
    id:   "versus",
    text: "兩種工作流：掌控 vs 驚喜",
    sub:  "Raw Driven vs Storyboard Driven · 04",
    num:  "04",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          上面五顆是「一顆一顆生」的 Raw Footage 驅動，
          我另外做了一個實驗：
          不給任何 Raw，
          只給 12 格 Sequence Storyboard＋開場圖＋結尾圖＋角色與道具，
          讓 Seedance 直接生一段 15 秒的 sequence
        </p>
      </>
    ),
  },
  {
    type: "image",
    item: {
      src: `${M}/storyboard-sequence-12-panel.avif`,
      alt: "12 格 Sequence Storyboard 分鏡表",
      caption: "Sequence Storyboard — 12 格，從城市遠景到牛排包圍的完整敘事",
    },
  },
  {
    type: "video-lazy",
    src: `${M}/final-storyboard-version.mp4`,
    caption: "▶ Storyboard 驅動版 — 15 秒 sequence，模型自己補了運鏡和過場",
    aspectRatio: "16/9",
  },
  { type: "workflow-comparison", data: workflowComparison },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          我的結論：
          <strong key="s">關鍵敘事鏡頭用 Raw 驅動，探索性的段落交給 Storyboard 驅動</strong>，
          前者保表演，後者偶爾會給你沒想過的電影語言 —
          代價是它也可能把你的分鏡表當成幻燈片
        </p>
      </>
    ),
  },

  /* ═══ 05 · 十大錯誤 ═══ */
  {
    type: "headline",
    id:   "mistakes",
    text: "這次踩過的十個雷",
    sub:  "Don't Repeat · 05",
    num:  "05",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          先看最貴的一課 —
          <strong key="s">秒數不對齊，模型就自己當導演</strong>：
        </p>
      </>
    ),
  },
  {
    type: "video-lazy",
    src: `${M}/fail-shot-01-generated.mp4`,
    caption: "▶ 失敗版 Shot 01 — 12.6 秒走位壓成 5 秒：模型跳過走路，人直接出現在門口",
    aspectRatio: "16/9",
  },
  {
    type: "image-pair",
    left:  { src: `${M}/fail-analysis-duration.avif`, alt: "ChatGPT 對失敗原因的分析：秒數壓縮導致模型跳過走位" },
    right: { src: `${M}/fail-analysis-motion.avif`,   alt: "ChatGPT 分析：畫面動態元素與運鏡需要時常緊盯" },
    leftLabel:  "當時的失敗分析（原始對話）",
    rightLabel: "動態元素要時常緊盯",
  },
  {
    type: "image",
    item: {
      src: `${M}/prop-wrong-color-briefcase.avif`,
      alt: "第一版酒紅色公事包道具圖 — 與電影設定不符的反面教材",
      caption: "反面教材 — 第一版公事包是酒紅色的 Motel 主題，電影要的是黑色：道具圖要一開始就鎖定",
    },
  },
  { type: "faq", items: crimeMistakes },

  /* ═══ 06 · 關鍵幀 Checklist ═══ */
  {
    type: "headline",
    id:   "checklist-keyframe",
    text: "關鍵幀怎麼挑",
    sub:  "Keyframe Checklist · 06",
    num:  "06",
  },
  {
    type: "callout",
    content: (
      <>
        <strong>最好看的幀，不一定是最好生成的幀</strong><br />
        快速動作的最高點常有動態模糊，
        反而不如動作前後那一格穩定 —
        挑的是最容易被 AI 理解的畫面，不是最戲劇化的
      </>
    ),
  },
  {
    type: "prompt-copy",
    label: "關鍵幀挑選 CHECKLIST（可複製收藏）",
    text: `□ 姿勢最清楚
□ 手部與道具可辨識
□ 臉部沒有嚴重模糊
□ 身體輪廓完整、沒被裁切
□ 遮擋少
□ 與最終構圖最接近
□ 動作處於可讀的中間或結尾狀態
□ 有明確位移的鏡頭：Start 幀與 End 幀都要準備，不要只給終點`,
  },

  /* ═══ 07 · 拍攝 Checklist ═══ */
  {
    type: "headline",
    id:   "checklist-shoot",
    text: "在家拍 Raw Footage 的規矩",
    sub:  "Shooting Checklist · 07",
    num:  "07",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          拍攝時不需要真正的電影場景 —
          我家的走廊、沙發和餐桌就夠了，
          重要的是動作本身的品質：
        </p>
      </>
    ),
  },
  {
    type: "prompt-copy",
    label: "RAW FOOTAGE 拍攝 CHECKLIST（可複製收藏）",
    text: `□ 動作完整，起點與終點清楚
□ 身體沒有被畫面裁切
□ 鏡頭不要晃動過度
□ 動作不要太快
□ 手部不要長時間被遮擋
□ 道具尺寸與最終想像接近
□ 開始和結束各保留短暫停頓
□ 一顆鏡頭只拍一個主要動作`,
  },

  /* ═══ 08 · Prompt 設計 ═══ */
  {
    type: "headline",
    id:   "prompts",
    text: "Prompt 是導演的工作分配單",
    sub:  "Prompt Design · 08",
    num:  "08",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          Prompt 不能只描述「畫面裡有什麼」，
          還要描述<strong key="s">「攝影機如何發現資訊」</strong> —
          讓鏡頭發現資訊，而不是把資訊擺在畫面裡
        </p>
        <p key="2">
          我的 Prompt 固定拆成七個部分，按優先級排：
        </p>
        <p key="3">
          1. 素材角色分工（誰管動作、誰管畫面）<br key="b1" />
          2. 人物主要動作（最高優先，不可犧牲）<br key="b2" />
          3. 攝影機運動（slow push-in、pull-back reveal、rack focus…）<br key="b3" />
          4. 場景固定條件（同一鏡內建築不得改變）<br key="b4" />
          5. 背景人物行為（各做各的事，反應時間錯開）<br key="b5" />
          6. 不允許發生的錯誤（morph、同步反應、換裝）<br key="b6" />
          7. 生成設定（秒數、解析度、音訊開關）
        </p>
      </>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        <strong>背景動態的鐵則：背景人物不能同步反應</strong><br />
        有人打牌、有人抽煙、有人晚一點才轉頭，
        荷官繼續發牌、風扇繼續轉、煙霧繼續飄 —
        同步抬槍、同步轉頭、同步後退，一眼就是 AI
      </>
    ),
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          完整的逐字 Prompt 正在整理版本演變（含失敗版），
          會在補完後更新到這一章
        </p>
      </>
    ),
  },

  /* ═══ 09 · 調光 ═══ */
  {
    type: "headline",
    id:   "grading",
    text: "調光：讓素材屬於同一部電影",
    sub:  "Color Grading · 09",
    num:  "09",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          AI 生成的每顆鏡頭色彩都各自為政 —
          「降低 AI 感」不是套一顆 LUT，
          <strong key="s">是鏡頭與鏡頭之間的一致性</strong>：
          統一曝光、統一色溫、收斂過鮮的顏色、對齊黑位、壓掉數位銳利感
        </p>
        <p key="2">
          我在 DaVinci 的七個步驟，每一步都有截圖：
        </p>
      </>
    ),
  },
  {
    type: "stage-switcher",
    title: "DAVINCI 調光七步驟",
    stages: [
      { key: "g0", num: "00", label: "SOURCE", zh: "生成原色", mediaType: "image", src: `${M}/grade-0-source.avif`, note: "Seedance 直出 — 顏色過鮮、各鏡頭黑位不一" },
      { key: "g1", num: "01", label: "DESATURATE", zh: "先去飽和", mediaType: "image", src: `${M}/grade-1-desaturate.avif`, note: "把 AI 的糖果色先收下來" },
      { key: "g2", num: "02", label: "COOL TONE", zh: "冷調定調", mediaType: "image", src: `${M}/grade-2-cool-tone.avif`, note: "整部片的犯罪片底色在這一步決定" },
      { key: "g3", num: "03", label: "LOCAL COLOR", zh: "局部色彩", mediaType: "image", src: `${M}/grade-3-local-color.avif`, note: "把霓虹紅藍洋紅救回來 — 只亮該亮的" },
      { key: "g4", num: "04", label: "SHARPEN", zh: "整體銳度", mediaType: "image", src: `${M}/grade-4-sharpen.avif`, note: "因應不同平台的壓縮補一點銳度" },
      { key: "g5", num: "05", label: "GLOW", zh: "光暈", mediaType: "image", src: `${M}/grade-5-glow.avif`, note: "霓虹的柔光暈染，壓掉數位感" },
      { key: "g6", num: "06", label: "VIGNETTE", zh: "聚焦暗角", mediaType: "image", src: `${M}/grade-6-vignette.avif`, note: "視線引導的最後一步" },
    ],
  },

  /* ═══ 10 · 成本 ═══ */
  {
    type: "headline",
    id:   "cost",
    text: "成本",
    sub:  "Credits · 10",
    num:  "10",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">{crimeCosts.note}</p>
        <p key="2">
          可以先說的原則：
          音訊與更高解析度都會增加 credits 消耗，
          所以「720p＋Audio Off 測試、確認後才出高規格版」
          本身就是成本控制的一部分
        </p>
      </>
    ),
  },

  /* ═══ 11 · 最終成片 ═══ */
  {
    type: "headline",
    id:   "final",
    text: "最終成片",
    sub:  "Final Film · 11",
    num:  "11",
  },
  {
    type: "video-lazy",
    src: `${M}/final-film.mp4`,
    caption: "▶ 調光後完整版 — 29.6 秒，有聲音，點擊播放",
    aspectRatio: "16/9",
  },

  /* ═══ 12 · 結論 ═══ */
  {
    type: "headline",
    id:   "conclusion",
    text: "結論",
    sub:  "Wrap · 12",
    num:  "12",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          這不是按下一個按鈕就能拍電影 —
          是<strong key="s">重新分配製作流程</strong>：
          真人先負責表演與動作，
          AI 負責世界、美術與延伸鏡頭，
          導演仍然負責取捨
        </p>
        <p key="2">
          生成會失敗、角色會漂、場景會 morph、
          Storyboard 不等於穩定、後期仍然重要 —
          導演的工作變成決定「保留什麼、捨棄什麼」
        </p>
        <p key="3">
          <strong key="s2">現在的大場面，可能只需要你家的一面牆</strong>
        </p>
      </>
    ),
  },
  {
    type: "comment-cta",
    label: "你會想先試哪一顆鏡頭？或你有別的做法？留言聊聊",
    sub: "留言會變成這一頁的漂浮泡泡",
  },
  {
    type: "oscar-notes",
    content: (
      <>
        <p key="1">
          整個專案最花時間的不是生成，
          是想清楚「每個素材該負責什麼」—
          想清楚之後，AI 才開始聽話
        </p>
        <p key="2">
          下一步我想挑戰對話戲和多角色 —
          有想看的題材，留言告訴我
        </p>
      </>
    ),
  },
  {
    type: "headline",
    id:   "next",
    text: "下一站",
    sub:  "Next Stop",
  },
  {
    type: "related",
    slugs: ["wulu-concept-film", "seedance-aerial"],
  },
];

export default blocks;
