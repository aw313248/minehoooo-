export interface WorkEntry {
  slug: string;
  youtubeId: string;
  title: string;
  titleEn: string;
  artist: string;
  role: string;
  category: string;
  uploadDate: string;
  duration: string;
  metaDescription: string;
  keywords: string[];
  description: string[];   // paragraphs in zh-TW
  relatedSlugs?: string[];
}

export const worksData: WorkEntry[] = [
  {
    slug: "liang-chengyu-i-am-human",
    youtubeId: "xKo8NW2mBso",
    title: "梁承煜《我也是個人》",
    titleEn: "梁承煜 我也是個人 MV — MINEH4O",
    artist: "梁承煜",
    role: "DIR · EDIT · COLOR",
    category: "MUSIC VIDEO",
    uploadDate: "2024-01-01",
    duration: "PT3M30S",
    metaDescription: "在地影像工作者 MINEH4O 為梁承煜《我也是個人》擔任導演、剪輯與調色。室內單一場景，影像極簡克制，把所有重量交還給歌聲本身。",
    keywords: ["梁承煜 MV", "梁承煜 我也是個人", "我也是個人 MV 導演", "MINEH4O", "在地影像工作者", "台灣 MV 製作"],
    description: [
      "《我也是個人》是一個關於自我確認的作品。",
      "影像選擇在室內單一場景完成，沒有外景、沒有人群，只有梁承煜與鏡頭之間的距離。這個決定不是限制，是選擇。當畫面夠安靜，聽的人才能把注意力真正放在歌聲上。",
      "導演、剪輯、調色均由在地影像工作者 MINEH4O（賴明宏）執行。",
    ],
    relatedSlugs: ["liang-chengyu-keep-moving-forward"],
  },
  {
    slug: "liang-chengyu-keep-moving-forward",
    youtubeId: "jLLNkQod8pg",
    title: "梁承煜《向前行吧》",
    titleEn: "梁承煜 向前行吧 MV — MINEH4O",
    artist: "梁承煜",
    role: "DIR · DP",
    category: "MUSIC VIDEO",
    uploadDate: "2023-01-01",
    duration: "PT3M30S",
    metaDescription: "在地影像工作者 MINEH4O 為梁承煜《向前行吧》擔任導演及攝影指導。明亮調性，輕盈有活力，用影像呼應歌曲中前進的動力。",
    keywords: ["梁承煜 MV", "梁承煜 向前行吧", "向前行吧 MV 導演", "MINEH4O", "在地影像工作者", "台灣 MV 製作"],
    description: [
      "《向前行吧》是一支關於動能的作品。",
      "影像選擇了明亮、開闊的調性，刻意避開沉重感，讓畫面跟歌曲一起往前走。輕盈不代表沒有重量，是把重量藏在光裡。",
      "導演、攝影指導均由在地影像工作者 MINEH4O（賴明宏）執行。",
    ],
    relatedSlugs: ["liang-chengyu-i-am-human"],
  },
  {
    slug: "chen-zhuo-all-fools-day",
    youtubeId: "d9_EuYkmfzM",
    title: "陳卓《愚人節 ALL FOOL'S DAY》五週年紀念版",
    titleEn: "陳卓 愚人節 ALL FOOL'S DAY MV — MINEH4O",
    artist: "陳卓 Jon Chen",
    role: "DIR · DP",
    category: "MUSIC VIDEO",
    uploadDate: "2026-04-01",
    duration: "PT4M12S",
    metaDescription: "陳卓《愚人節 ALL FOOL'S DAY》五週年紀念版 MV，由在地影像工作者 MINEH4O（賴明宏）擔任導演及攝影指導。2026 年發行。",
    keywords: ["陳卓 愚人節 MV", "愚人節 ALL FOOL'S DAY", "愚人節 MV 導演", "陳卓 MV", "MINEH4O", "在地影像工作者"],
    description: [
      "《愚人節》是陳卓與 MINEH4O 合作五年的見證。",
      "2026 年五週年紀念版，同樣的歌，不同的自己，重新站在鏡頭前。",
      "導演、攝影指導均由在地影像工作者 MINEH4O（賴明宏）執行。",
    ],
    relatedSlugs: ["chen-zhuo-lumen", "chen-zhuo-aperture", "chen-zhuo-deprived"],
  },
  {
    slug: "chen-zhuo-lumen",
    youtubeId: "erQ9lR_rNik",
    title: "陳卓《流明 LUMEN》光與景三部曲 Ⅰ",
    titleEn: "陳卓 流明 LUMEN MV — MINEH4O",
    artist: "陳卓 Jon Chen",
    role: "DIR · DP",
    category: "MUSIC VIDEO",
    uploadDate: "2023-10-01",
    duration: "PT3M45S",
    metaDescription: "陳卓光與景三部曲第一部《流明 LUMEN》，由在地影像工作者 MINEH4O 擔任導演及攝影指導。台灣 MV 影像系列作品。",
    keywords: ["陳卓 流明", "陳卓 光與景三部曲", "流明 LUMEN MV", "MINEH4O", "在地影像工作者"],
    description: [
      "《流明》是光與景三部曲的起點，關於光的存在本身。",
      "導演、攝影指導均由在地影像工作者 MINEH4O（賴明宏）執行。",
    ],
    relatedSlugs: ["chen-zhuo-aperture", "chen-zhuo-deprived", "chen-zhuo-all-fools-day"],
  },
  {
    slug: "chen-zhuo-aperture",
    youtubeId: "cIsS50e6YQ0",
    title: "陳卓《光圈 APERTURE》光與景三部曲 Ⅱ",
    titleEn: "陳卓 光圈 APERTURE MV — MINEH4O",
    artist: "陳卓 Jon Chen",
    role: "DIR · DP",
    category: "MUSIC VIDEO",
    uploadDate: "2024-01-01",
    duration: "PT4M00S",
    metaDescription: "陳卓光與景三部曲第二部《光圈 APERTURE》，由在地影像工作者 MINEH4O 擔任導演及攝影指導。",
    keywords: ["陳卓 光圈", "陳卓 光與景三部曲", "光圈 APERTURE MV", "MINEH4O", "在地影像工作者"],
    description: [
      "《光圈》是三部曲的轉折點，光開始有了邊界。",
      "導演、攝影指導均由在地影像工作者 MINEH4O（賴明宏）執行。",
    ],
    relatedSlugs: ["chen-zhuo-lumen", "chen-zhuo-deprived", "chen-zhuo-all-fools-day"],
  },
  {
    slug: "chen-zhuo-deprived",
    youtubeId: "sxrucEXI9-A",
    title: "陳卓《沒收 DEPRIVED》光與景三部曲 Ⅲ",
    titleEn: "陳卓 沒收 DEPRIVED MV — MINEH4O",
    artist: "陳卓 Jon Chen",
    role: "DIR · DP",
    category: "MUSIC VIDEO",
    uploadDate: "2024-04-01",
    duration: "PT4M10S",
    metaDescription: "陳卓光與景三部曲終章《沒收 DEPRIVED》，由在地影像工作者 MINEH4O 擔任導演及攝影指導。",
    keywords: ["陳卓 沒收", "陳卓 光與景三部曲", "沒收 DEPRIVED MV", "MINEH4O", "在地影像工作者"],
    description: [
      "《沒收》是三部曲的結束，也是某種失去之後的靜止。",
      "導演、攝影指導均由在地影像工作者 MINEH4O（賴明宏）執行。",
    ],
    relatedSlugs: ["chen-zhuo-lumen", "chen-zhuo-aperture", "chen-zhuo-all-fools-day"],
  },
  {
    slug: "bring-me-your-lovely",
    youtubeId: "eI1O_9jBHU0",
    title: "Kolli (NN)《BRING ME YOUR LOVELY》",
    titleEn: "Kolli BRING ME YOUR LOVELY AI Hybrid MV — MINEH4O",
    artist: "Kolli (NN)",
    role: "DIR · DP · AI",
    category: "MUSIC VIDEO",
    uploadDate: "2025-03-01",
    duration: "PT3M30S",
    metaDescription: "Kolli (NN)《BRING ME YOUR LOVELY》AI Hybrid Music Video，由在地影像工作者 MINEH4O 擔任導演、攝影及 AI 影像製作。",
    keywords: ["Kolli BRING ME YOUR LOVELY", "AI Hybrid MV", "AIGC MV 台灣", "MINEH4O", "在地影像工作者"],
    description: [
      "《BRING ME YOUR LOVELY》是一次影像邊界的實驗。",
      "實拍與 AI 生成影像的混合，不是為了炫技，是因為這首歌需要那種不真實感。",
      "導演、攝影、AI 影像均由在地影像工作者 MINEH4O（賴明宏）執行。",
    ],
    relatedSlugs: ["chen-zhuo-all-fools-day"],
  },
];

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return worksData.find(w => w.slug === slug);
}

export const workSlugs = worksData.map(w => w.slug);
