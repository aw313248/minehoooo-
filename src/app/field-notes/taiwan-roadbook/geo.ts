/**
 * 台灣機車環島 Roadbook — 地理資料（純資料，client 安全）
 * RING = 逆時針環島幹道節點（靜態地理，非行程；行程仍唯一來自 Notion）
 */

export const TW = { latMin: 21.8, latMax: 25.4, lngMin: 119.95, lngMax: 122.05, w: 240, h: 400 };

export const proj = (lat: number, lng: number) => ({
  x: ((lng - TW.lngMin) / (TW.lngMax - TW.lngMin)) * TW.w,
  y: ((TW.latMax - lat) / (TW.latMax - TW.latMin)) * TW.h,
});

export const TAIWAN_PATH =
  "M118 8 L138 14 L150 30 L160 52 L170 78 L180 110 L186 140 L188 172 L184 205 L176 238 L166 268 L152 298 L136 326 L118 352 L102 374 L88 388 L74 392 L62 380 L54 358 L48 330 L44 300 L42 268 L44 236 L48 204 L54 172 L62 140 L72 110 L84 80 L96 50 L106 26 Z";

export const CITY_EN: Record<string, string> = {
  "台中": "TAICHUNG", "臺中": "TAICHUNG",
  "彰化": "CHANGHUA", "雲林": "YUNLIN", "嘉義": "CHIAYI",
  "台南": "TAINAN", "臺南": "TAINAN",
  "高雄": "KAOHSIUNG", "屏東": "PINGTUNG", "恆春": "HENGCHUN", "墾丁": "KENTING",
  "台東": "TAITUNG", "臺東": "TAITUNG",
  "花蓮": "HUALIEN", "宜蘭": "YILAN", "蘇澳": "SUAO",
  "台北": "TAIPEI", "臺北": "TAIPEI", "新北": "NEW TAIPEI",
  "基隆": "KEELUNG", "桃園": "TAOYUAN", "新竹": "HSINCHU",
  "苗栗": "MIAOLI", "南投": "NANTOU",
};

export const CAT_EN: Record<string, string> = {
  "出發": "DEPART", "早餐": "BREAKFAST", "午餐": "LUNCH", "晚餐": "DINNER",
  "住宿": "STAY", "景點": "SPOT", "晚上散步": "NIGHT WALK",
  "加油": "FUEL", "休息": "REST", "目前位置": "NOW",
};

export function cityKeyOf(name: string, address?: string): string | undefined {
  const src = `${address ?? ""}${name}`;
  for (const zh of Object.keys(CITY_EN)) if (src.includes(zh)) return zh;
  return undefined;
}

/* 逆時針環島幹道節點：[cityKey|null, lat, lng]，cityKey 對應 CITY_EN */
export const RING: Array<[string | null, number, number]> = [
  ["台中", 24.14, 120.66],
  ["彰化", 24.07, 120.54],
  ["雲林", 23.80, 120.46],
  ["嘉義", 23.48, 120.44],
  ["台南", 23.00, 120.20],
  ["高雄", 22.63, 120.30],
  ["屏東", 22.47, 120.45],
  [null,   22.37, 120.59],
  [null,   22.19, 120.70],
  ["恆春", 22.00, 120.75],
  ["墾丁", 21.92, 120.84],
  [null,   22.20, 120.88],
  [null,   22.34, 120.90],
  [null,   22.62, 121.01],
  ["台東", 22.76, 121.15],
  [null,   22.97, 121.30],
  [null,   23.10, 121.38],
  [null,   23.32, 121.45],
  [null,   23.60, 121.52],
  ["花蓮", 23.98, 121.61],
  [null,   24.17, 121.66],
  [null,   24.46, 121.80],
  ["蘇澳", 24.60, 121.85],
  ["宜蘭", 24.75, 121.75],
  [null,   24.85, 121.82],
  ["基隆", 25.13, 121.74],
  ["台北", 25.04, 121.56],
  ["桃園", 24.99, 121.30],
  ["新竹", 24.80, 120.97],
  ["苗栗", 24.49, 120.68],
  [null,   24.35, 120.62],
  ["台中", 24.14, 120.66],
];
