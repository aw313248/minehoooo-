/**
 * 台灣機車環島 Roadbook — 景點現場情報（FIELD INTEL）
 * 由 name 關鍵字比對 Notion 行程；行程本身仍唯一來自 Notion
 * crowd = 網路上的公評（查證後改寫）；why = Oscar 去的理由；special = 特別之處
 * 每天行程往前推進時，在這裡補下一批景點
 */

export interface SpotStory {
  match: string;
  rating?: string;
  crowd: string;
  why: string;
  special: string;
  srcLabel?: string;
  srcUrl?: string;
}

export const spotStories: SpotStory[] = [
  {
    match: "阿波鴨肉",
    crowd: "嘉義在地 30 年老店，2000+ 則評價，用餐時間店裡店外都是人，翻桌率出了名的快",
    why: "大家都說嘉義只有火雞肉飯，在地人給的答案是這碗 40 元的鴨肉麵",
    special: "乾麵才有獨門粉紅辣醬——煙燻鴨肉絲淋上去，鹹中帶甜；炒鴨肉跟滷鴨肝也是隱藏必點",
    srcLabel: "布雷克的出走旅行視界",
    srcUrl: "https://blaketravel.tw/blog/post/abo",
  },
  {
    match: "奇美博物館",
    rating: "GOOGLE 4.7 ★",
    crowd: "被網友稱「最台最棒博物館沒有之一」，一張 200 元門票逛到歐洲等級收藏",
    why: "衝著全球最大的提琴收藏來的，順便驗證 4.7 星到底是不是真的",
    special: "白色宮殿建築本身就是一顆鏡頭；提琴廳、動物廳、兵器廳，跟大英博物館合作的法老特展",
    srcLabel: "奇美博物館官網",
    srcUrl: "https://www.chimeimuseum.org/",
  },
  {
    match: "臺南市美術館二館",
    crowd: "日本建築師坂茂設計，開館以來一直是台南最熱門的建築打卡點",
    why: "奇美時間不夠時的備案——同樣是為了建築跟光影去的",
    special: "以台南市花鳳凰花為靈感的五角碎形屋頂，陽光穿過像樹蔭，光影會隨時間移動",
    srcLabel: "臺南市美術館",
    srcUrl: "https://www.tnam.museum/about_us/building",
  },
  {
    match: "東門町",
    crowd: "2025 年 6 月才開幕的嘉義新館，百年日治派出所改建，喜歡老建築的人一致好評",
    why: "時間夠才進去——嘉義市唯一現存的日治警察建築，磚木洋小屋",
    special: "派出所＋雙宿舍三館合院、雲型大理石台階；首展「文學東市場」用詩籤換創作",
    srcLabel: "微笑台灣",
    srcUrl: "https://smiletaiwan.cw.com.tw/article/8266",
  },
  {
    match: "阿棠牛肉",
    rating: "GOOGLE 4.4 ★",
    crowd: "台南中西區的排隊人氣店，在地人跟觀光客都推，用餐時間內用外帶都要排",
    why: "住宿附近走路就到，晚上第一站先補一碗熱的",
    special: "蔬菜洋蔥蘋果熬的清甜湯頭配軟Q溫體牛；蒜頭牛肉湯是只有這家才有的隱藏版",
    srcLabel: "周花花食記",
    srcUrl: "https://tenjo.tw/atangbeef/",
  },
  {
    match: "冷熱冰",
    rating: "GOOGLE 4.1 ★",
    crowd: "潮州圓環的扛霸子老店，2000+ 則評論，跟阿倫冰店並列在地兩大冷熱冰",
    why: "騎到屏東正熱的時候，一碗上面剉冰下面熱料的怪東西聽起來剛好",
    special: "熱芋頭、現做小湯圓鋪底再蓋剉冰，一口同時燙和冰；小湯圓是靈魂",
    srcLabel: "撲克馬旅遊筆記",
    srcUrl: "https://bookmarktrip.com/pingtung-food/chaozhou-hotice/",
  },
  {
    match: "潮州日式",
    crowd: "免門票的日式宿舍群，還能免費借和服，網路上都說是潮州順遊首選",
    why: "時間夠才彎進去——就在圓環冷熱冰旁邊，順路收一片日式屋簷",
    special: "日治時期辨務署與宿舍群，林少貓抗日事件的主戰場之一；鯉魚旗＋老木屋很好拍",
    srcLabel: "屏東縣文化處",
    srcUrl: "https://www.cultural.pthg.gov.tw/News_Content.aspx?n=93F8E7F9D5CBE6CC&sms=A66DF58E28B9346A&s=F4921AD853B1885D",
  },
  {
    match: "恆春古城",
    crowd: "恆春市中心的百年城門，海角七號裡遊覽車卡住過不去的就是這座西門",
    why: "進恆春的儀式感——騎機車穿過百年城門這件事本身就值得拍",
    special: "全台保存最完整的古城之一，西門至今還能單向通行；騎過去等於騎進電影場景",
    srcLabel: "獨立評論・魚夫",
    srcUrl: "https://opinion.cw.com.tw/blog/profile/194/article/5890",
  },
  {
    match: "阿嘉的家",
    crowd: "海角七號上映快二十年，這棟白牆紅頂老屋還是恆春老街最熱的打卡點",
    why: "「留下來，或者我跟你走」——朝聖一下台灣電影的名場面",
    special: "百年老屋，白牆紅頂配毛玻璃木窗；現在是民宿，隔壁波波廚房的麵包順路帶",
    srcLabel: "自由時報",
    srcUrl: "https://news.ltn.com.tw/news/life/breakingnews/2510333",
  },
  {
    match: "最南點",
    crowd: "環島人的必收成就點，木棧道走十分鐘換一張「台灣最南」的證明",
    why: "逆時針環島的折返點——騎到這裡，剩下的路都是往家的方向",
    special: "尖碑面向巴士海峽與太平洋交界，左太平洋右台灣海峽；環島儀式感的最高點",
  },
  {
    match: "船帆石",
    crowd: "墾丁地標級的 18 公尺珊瑚礁巨岩，路過的人都要跟它合照一張",
    why: "順路停一下就好——它就站在往鵝鑾鼻的路邊海上",
    special: "從台地滾落海邊的舊期珊瑚礁，像揚帆的船也像人頭；晨昏光線下最好看",
    srcLabel: "墾丁國家公園",
    srcUrl: "https://www.ktnp.gov.tw/News_Content2.aspx?n=85E1E406503C665B&sms=C88B5251F308CE96&s=AF9EF3A8785FF5A8",
  },
  {
    match: "南迴",
    crowd: "環島人公認的關鍵路段——從屏東翻到台東，山海在同一個彎道裡換手",
    why: "Day 3 的重頭戲：六小時的南迴，是這趟旅程裡最長的一段獨處",
    special: "楓港到台東沿太平洋爬升再滑下，過了壽卡就是東海岸；補給少，出發前加滿油",
  },
  {
    match: "河樂廣場",
    crowd: "舊中國城拆除後留下的親水廣場，入夜燈光亮起被評為台南最美的水岸",
    why: "白色殘構＋淺水池＋夜燈，是我想拍的「城市遺跡感」",
    special: "保留了中國城的部分結構，柱子映在水面上，晚上散步的氛圍跟白天完全不同",
  },
  {
    match: "神農街",
    crowd: "300 年五條港老街，紅燈籠＋石板路，網路上都說晚上比白天美，像走進神隱少女",
    why: "整條街就是現成的燈光佈景，手持慢走一鏡到底",
    special: "越夜越美，老屋裡藏著文創小店跟酒吧，燈籠是天然的暖色光源",
  },
  {
    match: "國華街",
    crowd: "台南小吃密度最高的一條街，多數是傳承數十年的老店",
    why: "邊走邊吃，順便補一天下來缺的熱量",
    special: "從碗粿、春捲到布丁，一條街解決；週末還會遇到市集",
  },
  {
    match: "海安路",
    crowd: "近年台南夜晚最熱鬧的徒步藝術區，藝術燈箱把整條路變成夜間展場",
    why: "跟神農街只隔一個路口，一次收兩種夜景",
    special: "路中央的藝術裝置在夜色裡最好看，適合收尾的一段慢路",
  },
];

export function storyFor(name: string): SpotStory | undefined {
  return spotStories.find(s => name.includes(s.match));
}
