/**
 * AI 犯罪短片教學 — 內容資料層
 * 依 docs/shot-mapping.md（2026-07-14 核可版）建立
 * 原則：欄位允許缺省（Shot 0 無 Raw）；credits 未驗證前不公開
 */

const M = "/field-notes/ai-crime-film";

export interface CrimeShot {
  id: string;
  title: string;
  storyFunction: string;
  generationMethod: "raw-driven" | "storyboard-driven" | "image-driven";
  hasRawFootage: boolean;
  rawVideo?: string;
  rawDuration?: number;
  keyframe?: string;
  targetFrame?: string;
  generatedVideo?: string;
  generatedPoster?: string;
  generatedDuration: number;
  inputAssets: string[];
  cameraLanguage?: string;
  promptSummary?: string;
  whatWorked: string[];
  whatFailed: string[];
  fix?: string;
  credits?: { value: number; status: "unverified" | "verified"; source: string };
}

export const crimeShots: CrimeShot[] = [
  {
    id: "00",
    title: "城市建立鏡頭",
    storyFunction: "開場 — 用九龍城寨式的賽博龐克天際線告訴觀眾這是什麼世界",
    generationMethod: "image-driven",
    hasRawFootage: false,
    targetFrame: `${M}/shot-00-city-target.avif`,
    generatedVideo: `${M}/shot-00-city-generated.mp4`,
    generatedPoster: `${M}/posters/shot-00-city-generated.jpg`,
    generatedDuration: 5.0,
    inputAssets: ["城市 Target Frame", "Sequence Storyboard"],
    cameraLanguage: "Extreme wide establishing・slow push-in",
    promptSummary: "高密度香港式城市、頂樓違建與空橋、紅藍洋紅霓虹、潮濕反光地面；鏡頭緩慢推進，人物在空橋上小比例走動",
    whatWorked: ["城市密度與霓虹氛圍一次到位", "沒有 Raw 也能穩定建立世界觀"],
    whatFailed: ["背景飛行物偶爾出現不合理路徑"],
    fix: "在 Prompt 限制空中載具數量與方向，保持遠景層次",
  },
  {
    id: "01",
    title: "地下賭場入口",
    storyFunction: "主角提著公事包走過霓虹招牌，第一次亮相",
    generationMethod: "raw-driven",
    hasRawFootage: true,
    rawVideo: `${M}/shot-01-casino-door-raw.mp4`,
    rawDuration: 5.7,
    keyframe: `${M}/shot-01-casino-door-keyframe.avif`,
    targetFrame: `${M}/shot-01-casino-door-target.avif`,
    generatedVideo: `${M}/shot-01-casino-door-generated.mp4`,
    generatedPoster: `${M}/posters/shot-01-casino-door-generated.jpg`,
    generatedDuration: 5.0,
    inputAssets: ["Raw Footage", "Target Frame", "@OSCAR-1", "黑色公事包"],
    cameraLanguage: "Lateral tracking・招牌前景遮擋",
    promptSummary: "門口橫向走位、在「地下賭場」霓虹下停頓看向門；場景鎖定、只允許人物與霓虹動",
    whatWorked: ["走位節奏跟 Raw 高度一致", "公事包全程保持黑色"],
    whatFailed: ["第一版 12.6 秒原片壓 5 秒 — 模型直接跳過走位，從門口開始（見失敗章）"],
    fix: "裁切 Raw 到約 5 秒、讓輸入輸出長度非常接近，並明確定義 Start／End 狀態",
  },
  {
    id: "02",
    title: "狹窄走廊前進",
    storyFunction: "提箱朝鏡頭走來 — 全片最有壓迫感的一顆",
    generationMethod: "raw-driven",
    hasRawFootage: true,
    rawVideo: `${M}/shot-02-corridor-raw.mp4`,
    rawDuration: 5.0,
    keyframe: `${M}/shot-02-corridor-keyframe.avif`,
    targetFrame: `${M}/shot-02-corridor-target.avif`,
    generatedVideo: `${M}/shot-02-corridor-generated.mp4`,
    generatedPoster: `${M}/posters/shot-02-corridor-generated.jpg`,
    generatedDuration: 5.0,
    inputAssets: ["Raw Footage", "Target Frame", "@OSCAR-1", "黑色公事包"],
    cameraLanguage: "Backward tracking・前後景層次",
    promptSummary: "家中走廊的直線位移對映到賭場走廊；鏡頭後退、人物直行、兩側霓虹與蒸氣持續",
    whatWorked: ["位移方向與速度完全吃到 Raw 的表演", "走廊透視穩定沒有 morph"],
    whatFailed: ["早期版本曾把走廊逐漸變形成賭場入口（場景 morph）"],
    fix: "Start／End 圖固定同一條走廊，場景轉換交給剪接，不交給模型",
  },
  {
    id: "03",
    title: "交貨開箱",
    storyFunction: "打開公事包、抽出文件 — 戲劇資訊的交付點",
    generationMethod: "raw-driven",
    hasRawFootage: true,
    rawVideo: `${M}/shot-03-handoff-raw.mp4`,
    rawDuration: 8.6,
    keyframe: `${M}/shot-03-handoff-keyframe.avif`,
    targetFrame: `${M}/shot-03-handoff-target.avif`,
    generatedVideo: `${M}/shot-03-handoff-generated.mp4`,
    generatedPoster: `${M}/posters/shot-03-handoff-generated.jpg`,
    generatedDuration: 9.0,
    inputAssets: ["Raw Footage", "Target Frame", "@OSCAR-1", "黑色公事包"],
    cameraLanguage: "Over-the-shoulder・手部特寫接力",
    promptSummary: "沙發開箱動作對映到賭場桌面交易；開箱、抽紙兩個階段都要完整呈現",
    whatWorked: ["8.6 秒的完整動作用 9 秒生成 — 開箱到抽紙一氣呵成", "開箱前後是同一只箱子"],
    whatFailed: ["手部細節在快速動作處偶爾融化"],
    fix: "Raw 拍攝時放慢手部動作、保留起止停頓",
  },
  {
    id: "04",
    title: "牛排包圍",
    storyFunction: "結尾 — 主角淡定吃牛排，人群與槍手環繞的反差收場",
    generationMethod: "raw-driven",
    hasRawFootage: true,
    rawVideo: `${M}/shot-04-steak-raw.mp4`,
    rawDuration: 7.5,
    keyframe: `${M}/shot-04-steak-keyframe.avif`,
    targetFrame: `${M}/shot-04-steak-target.avif`,
    generatedVideo: `${M}/shot-04-steak-generated.mp4`,
    generatedPoster: `${M}/posters/shot-04-steak-generated.jpg`,
    generatedDuration: 8.0,
    inputAssets: ["Raw Footage", "Target Frame", "@OSCAR-1"],
    cameraLanguage: "Slow push-in・背景群眾錯峰反應",
    promptSummary: "餐桌用餐動作對映到賭場宴席；背景人物各做各的事、反應時間錯開，禁止同步動作",
    whatWorked: ["刀叉節奏與「不在意」的表演都保留", "背景人群沒有出現同步反應"],
    whatFailed: ["個別背景人物視線偶爾飄向鏡頭"],
    fix: "在 Prompt 明確分配每群背景人物的行為與注意力方向",
  },
];

/* 兩種工作流對照 */
export const workflowComparison = {
  a: { key: "raw", name: "Raw Footage 驅動", sub: "一顆一顆生成", tone: "高掌控・較克制・適合動作展示" },
  b: { key: "storyboard", name: "Storyboard 驅動", sub: "整段一次生成", tone: "高自由・可能有驚喜・更容易漂移" },
  rows: [
    { label: "動作準確度", a: "高 — 貼著 Raw 的表演走", b: "低 — 模型自行詮釋" },
    { label: "角色一致性", a: "高（Element＋單顆控制）", b: "中 — 可能漂移" },
    { label: "運鏡自由度", a: "低 — 你說了算", b: "高 — 模型會自己補特寫、反應鏡頭與過場" },
    { label: "場景穩定性", a: "高", b: "中低 — 可能 morph 或變拼貼" },
    { label: "生成長度", a: "跟著每顆 Raw（本片 5–9 秒）", b: "一次 15 秒 sequence" },
    { label: "適合用途", a: "關鍵敘事鏡頭、動作戲", b: "探索剪法、B-roll、意外之喜" },
    { label: "最大風險", a: "鏡頭語言保守", b: "把 Storyboard 當幻燈片、剪接不可控" },
  ],
};

/* 十大錯誤（不要再踩） */
export const crimeMistakes = [
  { q: "01 原影片與生成秒數差太多", a: "12.6 秒的完整走位壓成 5 秒，模型直接挑它認為的精華：跳過走路，從門口開始。修正：裁切 Raw、讓輸入與輸出長度非常接近，並定義 Start／End 狀態（本次實測建議，非官方規定）" },
  { q: "02 終點圖被誤當起點", a: "只給一張最好看的終點圖，模型會從終點開始演。有明確位移的鏡頭，Start 圖與 End 圖都要給" },
  { q: "03 同一鏡頭要求太多動作", a: "精準走位＋大幅運鏡＋多人演出＋場景變化同時要求，最重要的動作一定被犧牲。一顆鏡頭只處理一個主要難題" },
  { q: "04 場景 morph", a: "走廊走一走變成賭場入口 — 模型用場景變形代替人物移動。同一鏡內建築必須固定，場景轉換用剪接不用融化" },
  { q: "05 角色三視圖重複上傳", a: "已經建立 @OSCAR-1 Element 後又把白底三視圖當場景參考圖上傳：出現多個角色、白底污染、三視圖版面滲入影片" },
  { q: "06 道具顏色不一致", a: "第一版公事包是酒紅色，電影要的是黑色。道具圖要跨鏡頭鎖定同一款式同一顏色" },
  { q: "07 Sequence Storyboard 被當成拼貼", a: "12 格分鏡直接被模型排成幻燈片輪播。要在 Prompt 說明「依序作為鏡頭切換」，並給開場圖與結尾圖錨定" },
  { q: "08 背景人物同步反應", a: "同步抬槍、同步轉頭、同步後退 — 一眼 AI。分配每群人不同的行為與反應時間差" },
  { q: "09 圖片比例超出平台限制", a: "參考圖比例不在平台支援範圍會被拒收或自動裁切，構圖直接跑掉。上傳前先檢查比例" },
  { q: "10 Audio 開著但這輪不需要", a: "這一輪的重點是畫面控制時，可以先關閉音訊、把聲音留到後期 — 降低生成目標的複雜度，也省 credits" },
];

/* 成本 — 未驗證前不公開（頁面顯示整理中） */
export const crimeCosts = {
  visible: false,
  note: "成本資料整理中，將於核對方案與生成紀錄後補上",
  entries: [
    { item: "單顆 5 秒生成", credits: 23, status: "unverified", source: "creator recollection / UI observation" },
    { item: "15 秒 Storyboard 版", credits: 68, status: "unverified", source: "creator recollection / UI observation" },
    { item: "帳戶餘額（當時）", credits: 1050, status: "unverified", source: "creator recollection / UI observation" },
  ],
};
