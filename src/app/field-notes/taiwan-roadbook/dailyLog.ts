/**
 * 台灣機車環島 Roadbook — 每日日誌（Oscar 每天回報後更新）
 * km = 當日騎乘公里數（null = 騎行中、當晚更新）
 * photos = public/field-notes/taiwan-roadbook/days/ 底下的圖檔
 * 每天收到 Oscar 的照片與里程後：新增 photos、填 km、commit + push
 */

const D = "/field-notes/taiwan-roadbook/days";

export interface DayLog {
  day: string;      // "Day 1"
  date: string;     // "07.19"
  km: number | null;
  photos: string[];
  note?: string;
}

export const dailyLog: DayLog[] = [
  {
    day: "Day 1",
    date: "07.19",
    km: null,
    photos: [`${D}/day1-01.jpg`, `${D}/day1-02.jpg`, `${D}/day1-03.jpg`],
    note: "出發日：前一晚把 Ace Pro 2、Neo 2 和一整桌家當塞進包裡，還手滑搶到一晚兩百八的台南床位——台中往嘉義、台南，騎行中",
  },
];

export const totalKm = () => dailyLog.reduce((s, d) => s + (d.km ?? 0), 0);
export const DAYS_DIR = D;
