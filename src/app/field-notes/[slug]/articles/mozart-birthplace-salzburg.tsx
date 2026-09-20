import type { Block } from "@/components/field-notes/editorial/types";

const M = "/field-notes/mozart-birthplace";
const OFFICIAL = "https://mozarteum.at/en/mozart-museums/mozarts-birthplace";
const TICKETS = "https://shop.mozarteum.at/en";
const VISITOR_INFO = "https://mozarteum.at/en/mozart-museums/visit-informations";
const APP = "https://mozarteum.at/en/mozart-museums/app";
const BIRTH_MAP = "https://www.google.com/maps/search/?api=1&query=Mozarts%20Geburtshaus%20Getreidegasse%209%20Salzburg";
const BIRTH_EMBED = "https://maps.google.com/maps?q=Mozarts%20Geburtshaus%2C%20Getreidegasse%209%2C%205020%20Salzburg&z=16&output=embed";
const RESIDENCE = "https://mozarteum.at/en/mozart-museums/mozarts-residence";
const RESIDENCE_MAP = "https://www.google.com/maps/search/?api=1&query=Mozart-Wohnhaus%20Makartplatz%208%20Salzburg";
const VIENNA = "https://www.mozarthausvienna.at/en/plan-your-visit";
const VIENNA_MAP = "https://www.google.com/maps/search/?api=1&query=Mozarthaus%20Vienna%20Domgasse%205%20Vienna";
const FURST = "https://www.original-mozartkugel.com/en/original-salzburger-mozartkugel";
const FURST_SHOPS = "https://www.original-mozartkugel.com/en/locations";
const FURST_MAP = "https://www.google.com/maps/search/?api=1&query=Cafe%20Konditorei%20Fuerst%20Brodgasse%2013%20Salzburg";

const blocks: Block[] = [
  {
    type: "info-card",
    name: "Mozarts Geburtshaus",
    sub: "莫札特出生地 · Salzburg, Austria",
    rows: [
      { label: "地址", value: "Getreidegasse 9, 5020 Salzburg, Austria" },
      { label: "開放時間", value: "每日 09:00–17:30；閉館前 30 分鐘停止入場" },
      { label: "建議停留", value: "官方估計約 1 小時；我會留 1–1.5 小時" },
      { label: "現場", value: "三層展區、有訪客廁所、有免費 Wi‑Fi" },
    ],
    links: [
      { label: "Google Maps", href: BIRTH_MAP },
      { label: "官方網站", href: OFFICIAL },
      { label: "官方購票", href: TICKETS },
    ],
    footnote: "這棟亮黃色建築就在糧食胡同裡。地址先截圖，免得到了薩爾茲堡只顧著看巧克力。",
  },
  { type: "map-embed", src: BIRTH_EMBED, title: "莫札特出生地位置", aspect: "16/10" },
  {
    type: "image",
    item: { src: `${M}/building.jpg`, alt: "薩爾茲堡莫札特出生地黃色外牆", caption: "黃色這棟就是。不是附近每一棟黃色房子都算。｜Oscar 現場影片截圖" },
    frame: "phone",
  },
  {
    type: "headline", id: "why", text: "裡面不是只有一間嬰兒房", sub: "THREE FLOORS · 01", num: "01",
  },
  {
    type: "text",
    content: <>
      <p>莫札特 1756 年 1 月 27 日出生在這裡。莫札特一家在這棟房子的三樓住了 26 年，直到 1773 年才搬去現在的「莫札特故居」。</p>
      <p>今天的展覽一路穿過三層樓：家族生活、他怎麼開始做音樂、朋友與贊助人、歌劇，還有家族畫像、信件、樂譜與樂器。</p>
      <p><strong>先破一個幻想：</strong>館內的地板和爐灶不是全都保留自莫札特時代。官方說房子在他們搬走後曾局部整修，所以你看到的是歷史空間加上後來的展示，不是 250 年完全沒動過的密室。</p>
    </>,
  },
  {
    type: "image-pair",
    left: { src: `${M}/kitchen.jpg`, alt: "莫札特出生地館內廚房展示", caption: "生活空間展示" },
    right: { src: `${M}/family.jpg`, alt: "莫札特家族資料展示", caption: "家族資料與關係" },
    leftLabel: "家裡長怎樣", rightLabel: "他們家到底有誰",
  },
  {
    type: "headline", id: "violin", text: "我六歲還在吃鼻涕，他六歲已經拿這把提琴", sub: "THE REAL THING · 02", num: "02",
  },
  {
    type: "image",
    item: { src: `${M}/violin.jpg`, alt: "館內展出的莫札特童年小提琴", caption: "官方確認為莫札特的童年小提琴，約製於 1740 年代，1896 年捐給莫札特基金會。｜Oscar 現場影片截圖" },
    frame: "phone",
  },
  {
    type: "text",
    content: <>
      <p>這把不是「看起來很像」。官方館藏資料直接稱它為莫札特的童年小提琴，由薩爾茲堡宮廷製琴師 Andreas Ferdinand Mayr 製作，推測完成於 1740 年代。</p>
      <p>館內也有手稿、戒指、家族資料與畫像，但不要看到手寫五線譜就全部喊「莫札特本人寫的」。展場裡會同時出現真跡、同時代材料與後來整理的展示，認標牌比認字跡可靠。</p>
    </>,
  },
  {
    type: "image-pair",
    left: { src: `${M}/score.jpg`, alt: "館內樂譜展示", caption: "手寫樂譜先看展品標示再下結論" },
    right: { src: `${M}/flute.jpg`, alt: "館內金色魔笛展示", caption: "《魔笛》相關展示" },
    leftLabel: "不要每張都喊真跡", rightLabel: "金色魔笛出場",
  },
  {
    type: "headline", id: "window", text: "我最喜歡的，其實是窗戶", sub: "THE SAME VIEW · 03", num: "03",
  },
  {
    type: "image",
    item: { src: `${M}/window.jpg`, alt: "從莫札特出生地窗戶向外看", caption: "幾百年後，我們站在同一棟房子裡，看向他也可能看過的方向。｜Oscar 現場影片截圖" },
    frame: "phone",
  },
  {
    type: "text",
    content: <>
      <p>外面的城市早就不一樣了，但你跟一個從小讀到大的音樂家，曾經站在同一棟房子裡，從同一扇窗往外看。</p>
      <p>這不是什麼大型聲光特效，卻是整間館最有「跨時代」感的地方。那天甚至天氣不太好，反而更像時間沒有完全走掉。</p>
    </>,
  },
  {
    type: "headline", id: "hair", text: "然後，為什麼連頭髮都有", sub: "MOZART RELICS · 04", num: "04",
  },
  {
    type: "image",
    item: { src: `${M}/hair.jpg`, alt: "莫札特出生地館內毛髮與紀念物展示", caption: "音樂家的故居逛到最後，突然變成毛髮鑑定現場。｜Oscar 現場影片截圖" },
    frame: "phone",
  },
  {
    type: "callout",
    content: <>館內展出被歸於莫札特的髮束，但「被保存為莫札特遺物」不等於已經百分之百完成身分證式認證。最安全的講法就是：<strong>這是館藏認定與傳承下來的莫札特髮束，真實性仍有討論空間。</strong></>,
  },
  {
    type: "headline", id: "tickets", text: "票價漲了，而且我當時真的比較便宜", sub: "TICKETS · 05", num: "05",
  },
  {
    type: "setup-cards",
    items: [
      { value: "€15", label: "2026 年 6 月｜成人票（影片現場拍攝）" },
      { value: "€12", label: "2026 年 6 月｜27 歲以下學生票（影片現場拍攝）" },
      { value: "€18", label: "現在｜成人票（2026-09-20 官網）" },
      { value: "€15", label: "現在｜學生 ≤27／敬老／10 人團體" },
    ],
    footer: "現在家庭票 €32（2 位成人＋兒童）；6–14 歲 €6；15–18 歲 €7；未滿 6 歲免費。優惠票記得帶有效證件。",
  },
  {
    type: "text",
    content: <>
      <p>一般散客可以直接在館內售票處買，不是非預約不可。旺季不想把人生花在排隊，先走官方網路票比較省事。</p>
      <p><strong>不要買第三方票。</strong>館方目前明確警告，只接受莫札特基金會官方網店販售的網路票。</p>
    </>,
  },
  {
    type: "cta", message: "要買就從官方買", sub: "官網票或現場售票處皆可；第三方票可能不被接受", cta: "打開官方售票", href: TICKETS,
  },
  {
    type: "headline", id: "practical", text: "去之前先知道，不然會站在門口下載到老", sub: "BEFORE YOU GO · 06", num: "06",
  },
  {
    type: "app-rec",
    name: "Mozart Museums Salzburg",
    tagline: "免費官方導覽 App · 可離線使用",
    appStoreUrl: APP,
    website: APP,
    reason: "有音樂、文字、圖片、特展、樓層資訊與更深入的背景。館內網路不一定是你人生最快的一次下載，建議出發前先裝好、把內容下載完。",
  },
  {
    type: "info-card",
    name: "現場實用資訊",
    rows: [
      { label: "廁所", value: "有，館內提供訪客廁所" },
      { label: "無障礙", value: "出生地因建築限制，輪椅無法無障礙進入；莫札特故居可無障礙參觀" },
      { label: "拍攝", value: "可無閃光拍照；官方目前禁止錄影，也不能用自拍棒" },
      { label: "行李", value: "無寄物櫃；大型背包、旅行袋與行李箱不可帶入" },
      { label: "文字", value: "展標為德文、英文；手機可下載其他語言房間說明" },
      { label: "網路", value: "免費 Wi‑Fi：Museum" },
    ],
    links: [{ label: "官方參觀須知", href: VISITOR_INFO }],
    footnote: "無障礙資訊很重要：出生地不是無障礙友善館舍；若同行者使用輪椅，優先安排 Makartplatz 的莫札特故居。",
  },
  {
    type: "headline", id: "route", text: "不要把三個莫札特地點混成同一間", sub: "MOZART MAP · 07", num: "07",
  },
  {
    type: "info-card",
    name: "① 出生地 · Mozarts Geburtshaus",
    sub: "Salzburg · Getreidegasse 9",
    rows: [{ label: "關係", value: "1756 年出生；童年與家庭生活的核心地點" }, { label: "怎麼認", value: "糧食胡同裡的亮黃色外牆" }],
    links: [{ label: "地圖", href: BIRTH_MAP }, { label: "官方", href: OFFICIAL }],
  },
  {
    type: "info-card",
    name: "② 故居 · Mozart-Wohnhaus",
    sub: "Salzburg · Makartplatz 8",
    rows: [{ label: "關係", value: "全家 1773 年搬入；莫札特住到 1780 年底" }, { label: "差別", value: "八房公寓、家庭社交與薩爾茲堡創作時期；可無障礙參觀" }],
    links: [{ label: "地圖", href: RESIDENCE_MAP }, { label: "官方", href: RESIDENCE }],
  },
  {
    type: "info-card",
    name: "③ 維也納莫札特之家 · Mozarthaus Vienna",
    sub: "Vienna · Domgasse 5",
    rows: [{ label: "關係", value: "莫札特 1784–1787 年居住與創作的公寓" }, { label: "差別", value: "維也納唯一保存下來的莫札特住所；《費加洛婚禮》時期，不是他的『最後故居』" }],
    links: [{ label: "地圖", href: VIENNA_MAP }, { label: "官方", href: VIENNA }],
    footnote: "路線概念：薩爾茲堡看出生與成長，維也納看他成為職業作曲家的生活。不是三棟都在同一條街。",
  },
  {
    type: "headline", id: "chocolate", text: "藍銀色才是原創，但紅色不是假貨", sub: "MOZARTKUGEL · EXTRA", num: "EX",
  },
  {
    type: "text",
    content: <>
      <p>1890 年左右，薩爾茲堡甜點師 Paul Fürst 做出開心果杏仁膏、牛軋糖與黑巧克力組成的圓形糖果，最早也叫 Mozart-Bonbon。1905 年它在巴黎展覽獲獎，接著整個奧匈帝國開始出現類似產品，莫札特球就這樣從地方點心變成觀光名物。</p>
      <p><strong>藍銀包裝的 Fürst 才能叫「Original Salzburger Mozartkugel」</strong>，而且至今仍依家族配方與插棒浸巧克力的方式手工製作。紅色包裝多半是 Mirabell 等其他品牌的 Mozartkugel，不是 Fürst 原創版，但不能直接說是假貨。</p>
      <p>你要找那顆藍銀的，最穩就是去 Fürst 自家店。原創版只在他們薩爾茲堡門市、Elsbethen 工坊和官方網店販售。</p>
    </>,
  },
  {
    type: "info-card",
    name: "Cafe Konditorei Fürst · Stammhaus",
    sub: "原創莫札特球本店",
    rows: [
      { label: "地址", value: "Brodgasse 13, 5020 Salzburg" },
      { label: "怎麼買", value: "認藍銀色包裝與 Fürst；現場新鮮版本保存期較短" },
      { label: "離出生地", value: "同在薩爾茲堡老城，步行可到" },
    ],
    links: [{ label: "Google Maps", href: FURST_MAP }, { label: "官方門市", href: FURST_SHOPS }, { label: "原創故事", href: FURST }],
    footnote: "你之前覺得特別好吃不是錯覺：它跟大量製造的版本本來就不是同一個製程。",
  },
  {
    type: "sources",
    items: [
      { label: "International Mozarteum Foundation｜Mozart's Birthplace", href: OFFICIAL, note: "地址、時間、票價、展覽、童年小提琴" },
      { label: "Mozart Museums｜Visitor information", href: VISITOR_INFO, note: "無障礙、廁所、拍攝、行李、Wi‑Fi" },
      { label: "Mozart Museums Salzburg App", href: APP, note: "官方 App、離線與多語功能" },
      { label: "Mozart Residence", href: RESIDENCE, note: "1773 年搬入與八房公寓" },
      { label: "Mozarthaus Vienna", href: VIENNA, note: "維也納唯一保存住所" },
      { label: "Cafe Konditorei Fürst｜Our history", href: "https://www.original-mozartkugel.com/en/about-us/our-history", note: "1890 年發明、1905 年獲獎與製法" },
      { label: "Cafe Konditorei Fürst｜Locations", href: FURST_SHOPS, note: "原創藍銀莫札特球販售地點" },
    ],
  },
  {
    type: "closing",
    content: <>下次去薩爾茲堡，先看莫札特六歲在幹嘛，再想想自己六歲在幹嘛。答案如果太痛苦，就去買一顆藍銀巧克力。</>,
  },
];

export default blocks;
