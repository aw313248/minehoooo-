import type { Block } from "@/components/field-notes/editorial/types";

const M = "/field-notes/mozart-birthplace";
const OFFICIAL = "https://mozarteum.at/en/mozart-museums/mozarts-birthplace";
const TICKETS = "https://shop.mozarteum.at/en";
const VISITOR = "https://mozarteum.at/en/mozart-museums/visit-informations";
const APP = "https://mozarteum.at/en/mozart-museums/app";
const BIRTH_MAP = "https://www.google.com/maps/search/?api=1&query=Mozarts%20Geburtshaus%20Getreidegasse%209%20Salzburg";
const BIRTH_EMBED = "https://maps.google.com/maps?q=Mozarts%20Geburtshaus%2C%20Getreidegasse%209%2C%205020%20Salzburg&z=16&output=embed";
const RESIDENCE = "https://mozarteum.at/en/mozart-museums/mozarts-residence";
const RESIDENCE_MAP = "https://www.google.com/maps/search/?api=1&query=Mozart-Wohnhaus%20Makartplatz%208%20Salzburg";
const RESIDENCE_EMBED = "https://maps.google.com/maps?q=Mozart-Wohnhaus%2C%20Makartplatz%208%2C%205020%20Salzburg&z=16&output=embed";
const VIENNA = "https://www.mozarthausvienna.at/en/plan-your-visit";
const VIENNA_MAP = "https://www.google.com/maps/search/?api=1&query=Mozarthaus%20Vienna%20Domgasse%205%20Vienna";
const VIENNA_EMBED = "https://maps.google.com/maps?q=Mozarthaus%20Vienna%2C%20Domgasse%205%2C%201010%20Vienna&z=16&output=embed";
const FURST = "https://www.original-mozartkugel.com/en/original-salzburger-mozartkugel";
const FURST_SHOPS = "https://www.original-mozartkugel.com/en/locations";
const FURST_MAP = "https://www.google.com/maps/search/?api=1&query=Cafe%20Konditorei%20Fuerst%20Brodgasse%2013%20Salzburg";

const blocks: Block[] = [
  {
    type: "info-card",
    name: "Mozarts Geburtshaus",
    sub: "莫札特出生地",
    rows: [
      { label: "地址", value: "Getreidegasse 9, 5020 Salzburg, Austria" },
      { label: "開放時間", value: "每日 09:00–17:30；閉館前 30 分鐘停止入場" },
      { label: "建議停留", value: "約 1–1.5 小時" },
      { label: "現場設施", value: "三層展區、訪客廁所、免費 Wi‑Fi" },
    ],
    links: [
      { label: "Google Maps", href: BIRTH_MAP },
      { label: "官方網站", href: OFFICIAL },
      { label: "官方購票", href: TICKETS },
    ],
    footnote: "先存地址再出發。亮黃色外牆就在薩爾茲堡老城的糧食胡同（Getreidegasse）裡。",
  },
  {
    type: "image",
    item: {
      src: `${M}/facade-official.jpg`,
      alt: "薩爾茲堡 Getreidegasse 9 的莫札特出生地黃色外牆",
      caption: "Getreidegasse 9 的莫札特出生地。｜International Mozarteum Foundation 官方照片",
    },
    frame: "banner",
  },
  { type: "headline", id: "practical", text: "先把現場真的會用到的講完", sub: "BEFORE YOU GO · 01", num: "01" },
  {
    type: "info-card",
    name: "現場使用資訊",
    sub: "去之前先存這張",
    rows: [
      { label: "廁所", value: "有，館內提供訪客廁所" },
      { label: "無障礙", value: "受歷史建築限制，出生地不適合輪椅進入；Makartplatz 的莫札特故居可無障礙參觀" },
      { label: "拍攝規定", value: "可無閃光拍照；禁止錄影與使用自拍棒" },
      { label: "行李", value: "沒有寄物櫃；大型背包、旅行袋與行李箱不可帶入" },
      { label: "展場語言", value: "德文、英文；其他語言可下載手機版房間說明" },
      { label: "館內網路", value: "免費 Wi‑Fi：Museum" },
    ],
    links: [{ label: "官方參觀須知", href: VISITOR }],
    footnote: "如果同行者使用輪椅，建議改排 Makartplatz 8 的莫札特故居。",
  },
  {
    type: "app-rec",
    name: "Mozart Museums Salzburg",
    tagline: "免費官方導覽 App · 可離線使用",
    appStoreUrl: APP,
    website: APP,
    reason: "裡面有音樂、文字、圖片、樓層資訊與更完整的背景。出發前先下載好內容，到現場不用站在門口跟網路搏鬥。",
  },
  { type: "headline", id: "route", text: "三個莫札特地點，真的不是同一間", sub: "MOZART MAP · 02", num: "02" },
  {
    type: "place-switcher",
    places: [
      {
        name: "莫札特出生地",
        city: "SALZBURG · GETREIDEGASSE 9",
        address: "Getreidegasse 9, 5020 Salzburg",
        desc: "莫札特 1756 年出生的地方，也是童年與家庭生活的核心地點。認亮黃色外牆。",
        image: `${M}/facade-official.jpg`, mapSrc: BIRTH_EMBED, mapHref: BIRTH_MAP, officialHref: OFFICIAL,
      },
      {
        name: "莫札特故居",
        city: "SALZBURG · MAKARTPLATZ 8",
        address: "Makartplatz 8, 5020 Salzburg",
        desc: "全家 1773 年搬入的八房公寓；莫札特住到 1780 年底。這裡可無障礙參觀。",
        image: `${M}/residence-salzburg.jpg`, mapSrc: RESIDENCE_EMBED, mapHref: RESIDENCE_MAP, officialHref: RESIDENCE,
      },
      {
        name: "維也納莫札特之家",
        city: "VIENNA · DOMGASSE 5",
        address: "Domgasse 5, 1010 Vienna",
        desc: "莫札特 1784–1787 年居住與創作的公寓，也是維也納唯一保存下來的莫札特住所。",
        image: `${M}/mozarthaus-vienna.jpg`, mapSrc: VIENNA_EMBED, mapHref: VIENNA_MAP, officialHref: VIENNA,
      },
    ],
  },
  { type: "headline", id: "tickets", text: "票價漲了，而且我當時真的比較便宜", sub: "TICKETS · 03", num: "03" },
  {
    type: "setup-cards",
    items: [
      { value: "€15", label: "2026 年 6 月｜成人票" },
      { value: "€12", label: "2026 年 6 月｜27 歲以下學生票" },
      { value: "€18", label: "現在｜成人票" },
      { value: "€15", label: "現在｜學生 ≤27／敬老／10 人團體" },
    ],
    footer: "目前家庭票 €32（2 位成人＋兒童）；15–18 歲 €7；6–14 歲 €6；未滿 6 歲免費。票價查核日期：2026-09-20。優惠票記得帶有效證件。",
  },
  {
    type: "text",
    content: <><p>一般散客可以直接到館內售票處買，並非一定要提前預約。旺季不想排隊，先買官方網路票比較省事。</p><p><strong>網路票只走官方商店。</strong>館方明確提醒，第三方平台購買的票券可能不被接受。</p></>,
  },
  { type: "cta", message: "要買就從官方買", sub: "官網票或現場售票處皆可；第三方票可能不被接受", cta: "打開官方售票", href: TICKETS },
  { type: "headline", id: "inside", text: "裡面不是只有一間嬰兒房", sub: "THREE FLOORS · 04", num: "04" },
  {
    type: "text",
    content: <><p>莫札特 1756 年 1 月 27 日出生在這裡。莫札特一家在這棟房子的三樓住了 26 年，直到 1773 年才搬去現在的「莫札特故居」。</p><p>今天的展覽一路穿過三層樓：家族生活、他如何開始做音樂、朋友與贊助人、歌劇，還有家族畫像、信件、樂譜與樂器。</p><p><strong>先破一個幻想：</strong>房子在莫札特一家搬走後曾局部整修，因此現在看到的是歷史空間與後來策展的組合，不是 250 年完全沒動過的密室。</p></>,
  },
  {
    type: "image-pair",
    left: { src: `${M}/kitchen.jpg`, alt: "莫札特出生地館內的薩爾茲堡歷史地圖展示" },
    right: { src: `${M}/family.jpg`, alt: "莫札特出生地館內展示的歷史外牆照片" },
    leftLabel: "當時的薩爾茲堡地圖", rightLabel: "出生地以前長這樣",
  },
  {
    type: "image",
    item: { src: `${M}/family-portrait.jpg`, alt: "約 1780 年的莫札特家族畫像", caption: "約 1780 年的莫札特家族畫像：左側是 Wolfgang 與姊姊 Nannerl，右側拿小提琴的是父親 Leopold，牆上是已過世的母親 Anna Maria。｜Johann Nepomuk della Croce，Wikimedia Commons，公共領域" },
    frame: "wide",
  },
  { type: "headline", id: "violin", text: "我六歲還在吃鼻涕，他六歲已經拿這把提琴", sub: "THE REAL THING · 05", num: "05" },
  {
    type: "image",
    item: { src: `${M}/childhood-violin-official.jpg`, alt: "莫札特童年小提琴", caption: "官方館藏中的莫札特童年小提琴，推測製於 1740 年代，1896 年捐給莫札特基金會。｜International Mozarteum Foundation 官方照片" },
    frame: "wide",
  },
  {
    type: "text",
    content: <><p>這把不是「看起來很像」。官方館藏資料直接稱它為莫札特的童年小提琴，由薩爾茲堡宮廷製琴師 Andreas Ferdinand Mayr 製作。</p><p>館內還有手稿、戒指、家族資料與畫像，但不要看到手寫五線譜就全部喊「莫札特本人寫的」。展場會同時出現真跡、同時代材料與後來整理的展示，認標牌比認字跡可靠。</p></>,
  },
  {
    type: "image-pair",
    left: { src: `${M}/score.jpg`, alt: "館內樂譜展示" },
    right: { src: `${M}/flute.jpg`, alt: "館內魔笛相關展示" },
    leftLabel: "手寫樂譜先看展品標示", rightLabel: "《魔笛》相關展示",
  },
  { type: "headline", id: "window", text: "我最喜歡的，其實是窗戶", sub: "THE SAME VIEW · 06", num: "06" },
  {
    type: "image-pair",
    left: { src: `${M}/window.jpg`, alt: "從莫札特出生地窗戶向外看" },
    right: { src: `${M}/portrait-lange.jpg`, alt: "Joseph Lange 所畫的莫札特未完成肖像" },
    leftLabel: "從出生地的窗戶往外看", rightLabel: "約 1782–1785 年的莫札特肖像",
  },
  {
    type: "text",
    content: <><p>外面的城市早就不一樣了，但你跟一個從小讀到大的音樂家，曾經站在同一棟房子裡，從同一扇窗往外看。</p><p>這不是什麼大型聲光特效，卻是整間館最有「跨時代」感的地方。那天天氣甚至不太好，反而更像時間沒有完全走掉。</p></>,
  },
  { type: "headline", id: "hair", text: "然後，為什麼連頭髮都有", sub: "MOZART RELICS · 07", num: "07" },
  {
    type: "image",
    item: { src: `${M}/hair-wikimedia.jpg`, alt: "莫札特出生地博物館展出的莫札特童年髮束", caption: "莫札特出生地博物館的髮束展示。｜Mateus2019／Wikimedia Commons／CC BY-SA 4.0" },
    frame: "wide",
  },
  {
    type: "callout",
    content: <>館內展出被歸於莫札特的髮束，但保存為「莫札特遺物」不等於完成現代身分鑑定。館方曾比較多撮傳承下來的頭髮，結果只能證明其中三撮來自同一人，<strong>那個人究竟是不是莫札特，仍無法確認。</strong></>,
  },
  { type: "headline", id: "chocolate", text: "藍銀色才是原創，但紅色不是假貨", sub: "MOZARTKUGEL · EXTRA", num: "EX" },
  {
    type: "text",
    content: <><p>1890 年左右，薩爾茲堡甜點師 Paul Fürst 做出由開心果杏仁膏、牛軋糖與黑巧克力組成的圓形糖果。1905 年它在巴黎展覽獲獎，接著整個奧匈帝國出現大量類似產品，莫札特球就這樣從地方點心變成觀光名物。</p><p><strong>藍銀包裝的 Fürst 才能叫「Original Salzburger Mozartkugel」</strong>，至今仍依家族配方手工製作。紅色包裝多半是 Mirabell 等其他品牌的 Mozartkugel，不是 Fürst 原創版，但也不能直接說是假貨。</p></>,
  },
  {
    type: "image",
    item: { src: `${M}/furst-blue-silver.jpg`, alt: "Fürst 藍銀包裝 Original Salzburger Mozartkugel", caption: "要找的是這個藍銀包裝。紅色不是假貨，只是不是 Fürst 的原創版本。｜Cafe Konditorei Fürst 官方商品照" },
    frame: "wide",
  },
  {
    type: "info-card",
    name: "Cafe Konditorei Fürst · Stammhaus",
    sub: "原創莫札特球本店",
    rows: [
      { label: "地址", value: "Brodgasse 13, 5020 Salzburg" },
      { label: "怎麼認", value: "認藍銀色包裝與 Fürst 品牌" },
      { label: "離出生地", value: "同在薩爾茲堡老城，步行可到" },
    ],
    links: [{ label: "Google Maps", href: FURST_MAP }, { label: "官方門市", href: FURST_SHOPS }, { label: "原創故事", href: FURST }],
    footnote: "原創版只在 Fürst 的薩爾茲堡門市、Elsbethen 工坊與官方網店販售。",
  },
  {
    type: "sources",
    items: [
      { label: "International Mozarteum Foundation｜Mozart's Birthplace", href: OFFICIAL, note: "地址、時間、票價、展覽、童年小提琴" },
      { label: "Mozart Museums｜Visitor information", href: VISITOR, note: "無障礙、廁所、拍攝、行李、Wi‑Fi" },
      { label: "Mozart Museums Salzburg App", href: APP, note: "官方 App、離線與多語功能" },
      { label: "Mozart Residence", href: RESIDENCE, note: "1773 年搬入與八房公寓" },
      { label: "Mozarthaus Vienna", href: VIENNA, note: "維也納唯一保存住所" },
      { label: "Cafe Konditorei Fürst｜Our history", href: "https://www.original-mozartkugel.com/en/about-us/our-history", note: "1890 年發明、1905 年獲獎與製法" },
      { label: "Wikimedia Commons｜Mozart hair exhibit", href: "https://commons.wikimedia.org/wiki/File:AUT_%E2%80%94_Bundesland_Salzburg_%E2%80%94_Salzburg_(Stadt)_%E2%80%94_Getreidegasse_9_(Mozartmuseum_%E2%80%94_Haare_von_Wolfgang_Amadeus_Mozart_im_Kindesalter)_Mattes_2022-10-30.jpg", note: "出生地館內髮束展示，CC BY-SA 4.0" },
      { label: "Wikimedia Commons｜Mozart family portrait", href: "https://commons.wikimedia.org/wiki/File:Croce_MozartFamilyPortrait.jpg", note: "約 1780 年家族畫像，公共領域" },
      { label: "Cafe Konditorei Fürst｜Locations", href: FURST_SHOPS, note: "原創藍銀莫札特球販售地點" },
    ],
  },
  { type: "closing", content: <>下次去薩爾茲堡，先看莫札特六歲在幹嘛，再想想自己六歲在幹嘛。答案如果太痛苦，就去買一顆藍銀巧克力。</> },
];

export default blocks;
