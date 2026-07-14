/**
 * MINEH4O · AI Workflow Prompt Builder configs
 *
 * Each AI tutorial article uses one PromptBuilderConfig.
 * Add a new entry here to launch a new tutorial — never duplicate the
 * <PromptBuilder /> UI.
 */

export type PromptBuilderFieldType = "short" | "long";

export interface PromptField {
  key: string;
  label: string;        // bilingual short label shown in the row header
  labelEn: string;
  labelZh: string;
  placeholder: string;
  example: string;
  type?: PromptBuilderFieldType; // default "short"
}

export interface WhyItem {
  icon: WhyIcon;
  en: string;
  zh: string;
  desc: string;
}

export type WhyIcon =
  | "location"   // pin
  | "route"      // path arrow
  | "fpv"        // drone
  | "landmark"   // building
  | "lighting"   // sun
  | "control";   // prohibition

export interface PromptBuilderConfig {
  id: string;
  eyebrow: string;       // e.g. "HIGGSFIELD × SEEDANCE"
  title: string;         // e.g. "Build the Shot"
  titleZh: string;       // e.g. "FPV 城市空拍生成器"
  description: string;
  fields: PromptField[];
  template: string;            // {{key}} → field value
  chineseTemplate?: string;
  whyItWorks: WhyItem[];       // 6 cards
  warnings?: string[];
  negative?: string[];
}

/* ── Render a template with current values ──────────────────────────── */
export function applyTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
    const v = values[key];
    return v && v.trim().length > 0 ? v.trim() : `[${key}]`;
  });
}

/** Build the Oscar-example version of the prompt (all fields filled with examples). */
export function buildExamplePrompt(
  config: PromptBuilderConfig,
  lang: "en" | "zh" = "en",
): string {
  const values: Record<string, string> = {};
  for (const f of config.fields) values[f.key] = f.example;
  const template = lang === "zh" && config.chineseTemplate ? config.chineseTemplate : config.template;
  return applyTemplate(template, values);
}

/** Shared `TOOL` metadata for the article — referenced by QuickStart, ToolBadge, etc. */
export interface ToolInfo {
  name: string;      // e.g. "HIGGSFIELD × SEEDANCE"
  url: string;       // external software URL
  toolPagePath: string; // internal tool intro page
}

export const TOOL_HIGGSFIELD: ToolInfo = {
  name: "HIGGSFIELD × SEEDANCE",
  // Oscar 的邀請連結 — 讀者訂閱 Higgsfield 2.0，Oscar 可獲得使用額度（頁面上有揭露）
  url: "https://higgsfield.ai/?ref=seedance_CGSr2hyNc_U",
  toolPagePath: "/tools/higgsfield-seedance",
};

/* ─────────────────────────────────────────────────────────────────────
   Article 01 · Higgsfield × Seedance · FPV City Aerial
   Case study: Toyo Ito's National Taichung Theater FPV flight
   ───────────────────────────────────────────────────────────────────── */
export const seedanceAerial: PromptBuilderConfig = {
  id: "higgsfield-seedance-fpv-route",

  eyebrow: "HIGGSFIELD × SEEDANCE",
  title: "Build the Shot",
  titleZh: "FPV 城市空拍生成器",
  description: "建立你的 FPV 城市空拍提示詞。",

  fields: [
    {
      key: "location",
      label: "場域名稱",
      labelEn: "Location",
      labelZh: "場域名稱",
      placeholder: "例如：臺中國家歌劇院與周圍城市街區",
      example: "the National Taichung Theater and its surrounding city blocks",
    },
    {
      key: "architecture",
      label: "建築特色",
      labelEn: "Architecture",
      labelZh: "建築特色",
      placeholder: "例如：曲面白色牆體、洞穴般的開口與流動結構",
      example:
        "Toyo Ito's iconic Sound Cave architecture — curved white walls, cave-like openings, flowing void structures and reflective glass interiors",
      type: "long",
    },
    {
      key: "start",
      label: "起始位置",
      labelEn: "Start",
      labelZh: "起始位置",
      placeholder: "例如：城市天際線上方，俯瞰住宅高樓",
      example: "high above the city skyline, overlooking modern residential high-rise towers",
    },
    {
      key: "route",
      label: "路徑節點",
      labelEn: "Route",
      labelZh: "路徑節點",
      placeholder: "例如：穿過高樓 → 掠過屋頂 → 俯衝至入口 → 穿越開口",
      example:
        "descend rapidly through the gap between glass-and-concrete towers, sweep right across the rooftops, dive toward the white organic facade, weave through the cave-like openings, pull out over the front plaza and circular water feature",
      type: "long",
    },
    {
      key: "end",
      label: "結束位置",
      labelEn: "End",
      labelZh: "結束位置",
      placeholder: "例如：繞過廣場後下降至街道路口",
      example: "after sweeping around the perimeter road, descend to street level at the intersection",
      type: "long",
    },
    {
      key: "lighting",
      label: "光線與色調",
      labelEn: "Lighting",
      labelZh: "光線與色調",
      placeholder: "例如：陰天自然光、低飽和冷色調",
      example: "soft overcast natural daylight, slightly cool palette of concrete grays, glass reflections and muted greens",
      type: "long",
    },
  ],

  template:
    "Please remove the red line, arrows, \"Start\" and \"End\" text labels, " +
    "and all guide marks from the final video. " +
    "The marked path is only used as camera motion guidance for the FPV drone.\n\n" +
    "Create a continuous first-person FPV drone shot of {{location}}. " +
    "Follow the marked path exactly from Start to End.\n\n" +
    "Architecture:\n" +
    "{{architecture}}\n\n" +
    "Camera journey:\n" +
    "- Begin at {{start}}\n" +
    "- Follow this route: {{route}}\n" +
    "- End at {{end}}\n\n" +
    "Style:\n" +
    "- cinematic FPV drone footage with fluid, weightless motion\n" +
    "- ultra-fast but readable, allowing the viewer to sense each landmark passing\n" +
    "- {{lighting}}\n" +
    "- subtle motion blur on edges to suggest speed\n" +
    "- documentary-real architectural cinematography tone\n\n" +
    "Aesthetic references:\n" +
    "- contemporary architectural showreels\n" +
    "- modern Asian urban drone cinematography\n" +
    "- desaturated cinematic palette\n\n" +
    "Negative prompt:\n" +
    "- no red line, no arrows, no text overlays\n" +
    "- no people in close-up\n" +
    "- no slow motion or freeze frames\n" +
    "- no fish-eye distortion\n" +
    "- no cartoon or stylized rendering\n" +
    "- no day-to-night transition\n" +
    "- no rain or added weather effects",

  chineseTemplate:
    "請從最終影片中移除紅色路徑線、箭頭、Start 與 End 文字標記，\n" +
    "以及所有引導符號。畫面上的路徑只是給 FPV 無人機的運鏡指引。\n\n" +
    "創造一段一鏡到底的 FPV 空拍鏡頭，飛越 {{location}}。\n" +
    "依照圖中標記的路徑，精準從 Start 飛到 End。\n\n" +
    "建築特色：\n" +
    "{{architecture}}\n\n" +
    "運鏡路徑：\n" +
    "- 起始：{{start}}\n" +
    "- 路徑：{{route}}\n" +
    "- 結束：{{end}}\n\n" +
    "風格：\n" +
    "- 流暢、無重力感的電影級 FPV 飛行\n" +
    "- 速度快但每個地標都看得清楚\n" +
    "- {{lighting}}\n" +
    "- 邊緣輕微動態模糊強化速度感\n" +
    "- 紀錄片式的建築電影感\n\n" +
    "美學參考：\n" +
    "- 當代建築 showreel 風格\n" +
    "- 現代亞洲城市空拍視角\n" +
    "- 低飽和電影調色\n\n" +
    "Negative prompt：\n" +
    "- 不要紅線、箭頭、文字疊加\n" +
    "- 不要人物特寫\n" +
    "- 不要慢動作或定格\n" +
    "- 不要魚眼變形\n" +
    "- 不要卡通或風格化渲染\n" +
    "- 不要日夜轉換\n" +
    "- 不要下雨或天氣效果",

  whyItWorks: [
    {
      icon: "location",
      en: "LOCATION",
      zh: "場域",
      desc: "明確指定城市與建築。模型知道飛越什麼。",
    },
    {
      icon: "route",
      en: "ROUTE",
      zh: "路徑",
      desc: "從 Start 到 End 逐段移動。一鏡到底的骨架。",
    },
    {
      icon: "fpv",
      en: "FPV MOTION",
      zh: "運鏡",
      desc: "快速、流暢，但仍可辨識每個地標。",
    },
    {
      icon: "landmark",
      en: "LANDMARKS",
      zh: "地標",
      desc: "每個段落都有視覺錨點，避免抽幀。",
    },
    {
      icon: "lighting",
      en: "LIGHTING",
      zh: "光線",
      desc: "保留原始圖片的自然光與色溫。",
    },
    {
      icon: "control",
      en: "CONTROL",
      zh: "控制",
      desc: "移除引導線、文字與變形 — Negative prompt 守關。",
    },
  ],

  warnings: [
    "上傳給 Higgsfield × Seedance 的圖必須包含紅線、箭頭、Start、End 標記。這些是給模型的運鏡指引。",
    "Prompt 要求生成後的影片移除引導標記。不要在上傳前先把線擦掉。",
  ],

  negative: [
    "no red line, no arrows, no text overlays",
    "no people in close-up",
    "no slow motion or freeze frames",
    "no fish-eye distortion",
    "no cartoon or stylized rendering",
    "no day-to-night transition",
    "no rain or added weather effects",
  ],
};

/* ── Index by article slug ─────────────────────────────────────────── */
export const promptBuilders: Record<string, PromptBuilderConfig> = {
  "seedance-aerial": seedanceAerial,
};

export function getPromptBuilder(slug: string): PromptBuilderConfig | undefined {
  return promptBuilders[slug];
}
