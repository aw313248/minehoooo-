/**
 * 維也納 Griechenbeisl — 旅行筆記 × Reels 拆解
 * 素材：Oscar 2026-06-12 現場照片與影片（手機匯出）
 * 資料來源分三類，不混寫：
 *   A 官方網站明確記載（griechenbeisl.at）
 *   B 其他資料補充（標示「資料補充」）
 *   C Oscar 現場照片的個人判斷（標示「現場筆記」）
 */
import type { Block } from "@/components/field-notes/editorial/types";

const GB = "/field-notes/griechenbeisl";

const MAPS_PLACE   = "https://www.google.com/maps/search/?api=1&query=Griechenbeisl%20Fleischmarkt%2011%201010%20Wien";
const MAPS_PANO    = "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=48.21105,16.37656";
const MAPS_EMBED   = "https://maps.google.com/maps?q=Griechenbeisl%2C%20Fleischmarkt%2011%2C%201010%20Wien&z=17&output=embed";
const OFFICIAL     = "https://www.griechenbeisl.at/";
const OFFICIAL_STORY = "https://www.griechenbeisl.at/our-story/";

const blocks: Block[] = [

  /* ══════════════════════════════════════════════════════════════
     00 · 正片 + 開場
     ══════════════════════════════════════════════════════════════ */
  {
    type: "video-lazy",
    src: `${GB}/final-reel.mp4`,
    caption: "▶ 正片 — 我在維也納誤入的 500 年餐廳（62 秒，有聲音）",
    aspectRatio: "9/16",
    maxWidth: "320px",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">先講結論，</p>
        <p key="2"><strong key="s">吃飯的時候，多起來走一走</strong></p>
        <p key="3">
          上面那支影片就是這個故事的正片，
          這篇筆記是它的完整背景：
          店的位置、五百年的官方歷史、牆上每個名字的來歷
        </p>
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     01 · 發現故事
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "story",
    text: "那天只是一場聚餐",
    sub:  "Discovery · 01",
    num:  "01",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          那天是跟團的聚餐，
          本來以為就只是一間普通的餐廳，
          沒有拍攝計畫，沒有功課，什麼都沒有
        </p>
        <p key="2">
          吃到一半，我突然想離開座位，在餐廳裡亂逛，
          服務人員看到了，也沒有攔我
        </p>
        <p key="3">
          我平常吃飯不太會做這件事——
          <strong key="s">這也是我現在最後悔的地方</strong>
        </p>
        <p key="4">
          奇怪的是，從外面看，它明明是白天戶外的餐廳，
          走進去卻像走進一個地窖——
          但你又很清楚自己不在地下，
          一間房接著一間房，越走越深
        </p>
        <p key="5">
          然後我推開其中一間房——
          整個天花板、整面牆，全部都是簽名，
          當下真的被震撼到
        </p>
        <p key="6">
          回來一 Google 才知道這裡有多扯：
          <strong key="s2">五百年的店，莫札特和馬克吐溫都來過</strong>，
          而我是點完餐才發現的
        </p>
      </>
    ),
  },
  {
    type: "image-pair",
    left:  { src: `${GB}/beer-selfie.avif`,    alt: "Oscar 在 Griechenbeisl 喝 Gösser 啤酒" },
    right: { src: `${GB}/interior-motto.avif`, alt: "餐廳內裝：深色木牆、油燈與德文格言" },
    leftLabel:  "聚餐進行中",
    rightLabel: "牆上的德文格言",
  },
  {
    type: "video-lazy",
    src: `${GB}/hero-dining.mp4`,
    caption: "拱型天花板的用餐室 — 現場實拍",
    aspectRatio: "9/16",
    maxWidth: "300px",
    autoPlay: true,
  },
  {
    type: "callout",
    content: (
      <>
        <strong>維也納料理順帶一提：</strong><br />
        我點的是洋蔥烤牛肉 Rostbraten 配烤馬鈴薯，
        肉嫩到是我在歐洲餐廳裡少數吃到這麼嫩的，
        盤子邊緣就印著 Griechenbeisl 的字樣，
        濃湯居然喝得到一點亞洲的味道，
        另外蜂蜜啤酒超級好喝，這句沒有業配
      </>
    ),
  },
  {
    type: "image-pair",
    left:  { src: `${GB}/dish-rostbraten.avif`, alt: "Rostbraten 洋蔥烤牛肉，盤緣印有 Griechenbeisl 字樣" },
    right: { src: `${GB}/soup.avif`,            alt: "傳統維也納清湯前菜" },
    leftLabel:  "ROSTBRATEN",
    rightLabel: "前菜湯",
  },

  /* ══════════════════════════════════════════════════════════════
     02 · Google 街景
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "maps",
    text: "連 Google 街景都找不到門口",
    sub:  "Google Maps · 02",
    num:  "02",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          回台灣之後我想用 Google Maps 重走一次那天的路線，
          結果發生一件好笑的事
        </p>
        <p key="2">
          <strong key="s">不管我怎麼旋轉街景，都一直沒辦法清楚看到這間店的入口</strong>
        </p>
        <p key="3">
          它躲在老城區 Fleischmarkt 和 Griechengasse 交會的巷子裡，
          街景能走到的位置，看出去就是一條鵝卵石小巷，
          門口就是很難直接看清楚
        </p>
        <p key="4">
          這是我自己使用 Google Maps 的真實體驗，
          不是什麼陰謀論，
          但也剛好說明了一件事——
          這間店，真的就是要走進那條巷子才會遇到
        </p>
      </>
    ),
  },
  {
    type: "cta",
    message: "不信的話，你自己去街景找找看",
    sub: "打開 Google 街景，在巷子裡轉一圈，看你能不能找到 Griechenbeisl 的門口",
    cta: "打開街景挑戰",
    href: MAPS_PANO,
  },
  {
    type: "video-lazy",
    src: `${GB}/hero-entrance.mp4`,
    caption: "實際走進去長這樣 — 入口走廊實拍",
    aspectRatio: "9/16",
    maxWidth: "300px",
    autoPlay: true,
  },

  /* ══════════════════════════════════════════════════════════════
     03 · 資料卡
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "info",
    text: "這間店",
    sub:  "Field Data · 03",
    num:  "03",
  },
  {
    type: "info-card",
    name: "Griechenbeisl",
    sub:  "希臘小酒館 · Vienna, Austria",
    rows: [
      { label: "地址",      value: "Fleischmarkt 11, 1010 Wien" },
      { label: "類型",      value: "傳統維也納料理" },
      { label: "招牌廳室",  value: "Mark Twain Room 簽名廳" },
      { label: "自述歷史",  value: "已服務客人約 550 年（官方網站）" },
      { label: "主餐價位",  value: "約 €20–34，甜點 €9–14（2026 官方菜單，未含服務費）" },
      { label: "Google 評價", value: "4.5★ · 6,500+ 則（2026-07 查詢）" },
    ],
    links: [
      { label: "Google Maps", href: MAPS_PLACE },
      { label: "官方網站",     href: OFFICIAL },
    ],
    footnote: "營業時間與訂位資訊會變動，前往之前請再到官方網站或 Google Maps 確認一次",
  },
  {
    type: "callout",
    content: (
      <>
        <strong>官方招牌怎麼點（2026 菜單）：</strong><br />
        菜單上標成 House Special 的是脆皮烤豬腳（雙人份 €49.9），
        經典款是小牛維也納炸排 €33.9 和水煮牛肉 Tafelspitz €28.9，
        甜點必點手工 Kaiserschmarrn 奧地利帝王煎餅 €13.9（要等 20 分鐘，值得），<br />
        一人正常吃大約 €35–55，約台幣 1,200–1,900，未含服務費
      </>
    ),
  },
  {
    type: "map-embed",
    src: MAPS_EMBED,
    title: "Griechenbeisl 位置地圖",
    aspect: "16/10",
  },

  /* ══════════════════════════════════════════════════════════════
     04 · 歷史時間軸
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "history",
    text: "五百年，用一條時間軸講完",
    sub:  "History · 04",
    num:  "04",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          以下整理自餐廳官方網站的英文內容，
          我翻成中文並重新排序，
          官方沒有明確寫的部分，會標成「資料補充」或「現場筆記」
        </p>
      </>
    ),
  },
  {
    type: "timeline",
    events: [
      {
        year: "約 1200",
        title: "建築的骨架比餐廳更老",
        desc: "維基百科：建築內含約 1200 年維也納舊城牆塔樓的殘構，14 世紀被併入哥德式住宅",
        tag: "extra",
      },
      {
        year: "1447",
        title: "首次出現在文獻紀錄",
        desc: "當時統治奧地利的是哈布斯堡的腓特烈三世，達文西還要再等 5 年才出生。官方自述至今服務約 550 年",
        tag: "extra",
        img: { src: "/field-notes/griechenbeisl/history/friedrich-iii.avif", alt: "腓特烈三世畫像", caption: "1447 年的奧地利統治者（Wikimedia Commons）" },
      },
      {
        year: "1440 年代",
        title: "同時期的歐洲：古騰堡剛發明活字印刷",
        desc: "餐廳留下文獻紀錄的那幾年，古騰堡正在調試活字印刷機——資訊時代的第一聲",
        tag: "extra",
        img: { src: "/field-notes/griechenbeisl/history/gutenberg-bible.avif", alt: "古騰堡聖經內頁", caption: "古騰堡聖經（Wikimedia Commons）" },
      },
      {
        year: "同一年的中國",
        title: "鄭和下西洋結束 14 年，船隊解散",
        desc: "兩年後，明英宗御駕親征瓦剌，在土木堡兵敗被俘——皇帝本人被抓走的那種年代",
        tag: "extra",
        img: { src: "/field-notes/griechenbeisl/history/ming-yingzong.avif", alt: "明英宗坐像", caption: "明英宗朱祁鎮——土木堡之變的主角（Wikimedia Commons）" },
      },
      {
        year: "同一年的台灣",
        title: "連一行文字紀錄都還沒有",
        desc: "還要再等 177 年，荷蘭人才會在 1624 年登陸大員。這間餐廳開始寫進文獻的時候，我們的島連名字都還沒被寫下來——人家在餐廳吃飯留簽名，我們連被寫都輪不到",
        tag: "extra",
        highlight: true,
      },
      {
        year: "1492",
        title: "哥倫布抵達美洲——餐廳文獻的 45 年後",
        desc: "換句話說：這間店有文獻紀錄的時候，歐洲人連美洲在哪都還不知道",
        tag: "extra",
        img: { src: "/field-notes/griechenbeisl/history/columbus.avif", alt: "哥倫布登陸美洲油畫", caption: "哥倫布登陸美洲，1492（Wikimedia Commons）" },
      },
      {
        year: "17 世紀中葉",
        title: "得到現在的名字",
        desc: "希臘商人在這一區聚居經商之後，店逐漸被叫成 Griechenbeisl——「希臘小酒館」",
        tag: "official",
      },
      {
        year: "19–20 世紀",
        title: "藝術家、學者、政治人物的聚會所",
        desc: "官方列出的簽名：維也納市長 Karl Lueger、俾斯麥、畫家席勒 Egon Schiele、泰山演員 Johnny Weissmüller",
        tag: "official",
      },
      {
        year: "名人時刻",
        title: "馬克吐溫、貝多芬、莫札特都吃過",
        desc: "官方網站首頁：Mark Twain、Beethoven、Mozart、Pavarotti、Johnny Cash 曾在此用餐",
        tag: "official",
      },
      {
        year: "2026-06-12",
        title: "一個台中人吃飯吃到一半亂逛，誤入 Mark Twain Room",
        desc: "本篇筆記的起點——你手上這篇，就是這條時間軸最新的一格",
        tag: "oscar",
        highlight: true,
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
     05 · Mark Twain Room
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "twain",
    text: "Mark Twain Room",
    sub:  "The Signature Room · 05",
    num:  "05",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          這間房以馬克吐溫命名，
          天花板和牆面留著一層又一層的簽名，
          官方說法是：來過這裡的藝術家、學者、政治人物，
          很多人把名字永遠留在了這面牆上
        </p>
        <p key="2">
          <strong key="s">有一件事要分清楚：</strong>
          「曾經到訪過這間餐廳」和「牆上可以被確認的親筆簽名」是兩回事，
          官方確認的簽名有 Karl Lueger、俾斯麥、席勒、Johnny Weissmüller 這些人，
          至於莫札特、貝多芬——官方說的是他們「在這裡吃過飯」，
          我不會指著牆上某一筆說那就是莫札特
        </p>
      </>
    ),
  },
  {
    type: "image-pair",
    left:  { src: `${GB}/ceiling-oscar.avif`,   alt: "Oscar 抬頭看 Mark Twain Room 佈滿簽名的天花板" },
    right: { src: `${GB}/ceiling-oscar-2.avif`, alt: "金色天花板上的歷代簽名與帆船模型" },
    leftLabel:  "整個天花板都是簽名",
    rightLabel: "看到下巴痠",
  },
  {
    type: "video-lazy",
    src: `${GB}/twain-look.mp4`,
    caption: "站在房間中央轉一圈 — Mark Twain Room 實拍",
    aspectRatio: "9/16",
    maxWidth: "300px",
    autoPlay: true,
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          比較意外的是牆上也有不少現代亞洲面孔，
          <strong key="s">以下是我在現場照片裡自己辨認的，屬於個人判斷，歡迎指正：</strong>
        </p>
        <p key="2">
          簽名牆上看得到「山本耕史」——
          大河劇《新選組！》的土方歲三、《鎌倉殿的 13 人》的三浦義村，
          旁邊還有一個一開始被我認成戶田惠梨香的「戸田恵子」——
          放大一看是三個字，
          <strong key="k">是幫麵包超人配音超過三十年的那位戶田惠子</strong>
        </p>
        <p key="3">
          相框照片的部分有郎朗——
          在白宮和奧運開幕式都彈過琴的那位國際鋼琴家，
          《派遣女醫 X》裡「我不會失敗」的米倉涼子，
          還有日本花藝大師假屋崎省吾，
          以及更多我認不出來的人物
        </p>
      </>
    ),
  },
  {
    type: "image",
    item: {
      src: `${GB}/wall-signatures.avif`,
      alt: "簽名牆特寫：可見日文簽名與奧古斯丁小雕像",
      caption: "簽名牆特寫 — 右下角站著的小人，就是第 07 章的主角奧古斯丁",
    },
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          牆上還掛著一張很珍貴的照片：
          <strong key="s">世界三大男高音之一的帕華洛帝 Luciano Pavarotti</strong>，
          親自舉著筆在這片天花板上簽名的瞬間，
          照片下方就貼著他的名牌
        </p>
      </>
    ),
  },
  {
    type: "image",
    item: {
      src: `${GB}/pavarotti-close.avif`,
      alt: "帕華洛帝在 Griechenbeisl 天花板上簽名的裱框照片特寫",
      caption: "帕華洛帝本人簽天花板的瞬間 — 放大版，名牌寫著 Luciano Pavarotti",
    },
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          沒聽過帕華洛帝？直接在這裡聽——
          Nessun Dorma《公主徹夜未眠》，他最有名的一首，
          聽完你就懂為什麼全世界的牆都想要他的簽名
        </p>
      </>
    ),
  },
  {
    type: "youtube",
    id: "8uqPnY5hQDs",
    title: "Pavarotti — Nessun Dorma（官方現場）",
  },
  {
    type: "callout",
    content: (
      <>
        <strong>誤認還不只一次：</strong><br />
        牆上有一幅畫像，我一度以為是年輕的莫札特，
        回來放大畫像下面的花體字——
        Ignaz Czapka，1838 到 1848 年的維也納市長，
        在這面牆上，連認錯人都會認錯得很有歷史
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     06 · 疑似金大中
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "guess",
    text: "我第一眼真的以為是李昌鈺博士",
    sub:  "Guess Who · 06",
    num:  "06",
  },
  {
    type: "image",
    item: {
      src: `${GB}/guess-who.avif`,
      alt: "牆上一張裱框照片：一位東亞面孔的先生正在牆上簽名",
      caption: "Mark Twain Room 牆上的裱框照片",
    },
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          在一堆西方面孔裡看到這張照片，
          我第一眼真的以為是李昌鈺博士
        </p>
        <p key="2">
          <strong key="s">但旁邊怎麼全部都是韓文？</strong>
          你看得出來這是誰嗎
        </p>
        <p key="3">
          照片旁的韓文疑似是「김대중」，
          有可能是韓國前總統金大中，
          不過我還沒拿到餐廳官方的完整名單做第二次確認，
          所以這裡先不寫死，
          等哪天確認了再回來更新這一段
        </p>
      </>
    ),
  },
  {
    type: "comment-cta",
    label: "你第一眼覺得照片裡的人是誰？留言告訴我",
    sub: "留言會變成這一頁的漂浮泡泡",
  },

  /* ══════════════════════════════════════════════════════════════
     07 · 親愛的奧古斯丁
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "augustin",
    text: "門口地板下的那個人",
    sub:  "Der liebe Augustin · 07",
    num:  "07",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          離開之前記得看一眼門口的地板，
          鐵欄下面有一個人形模型，
          他叫奧古斯丁 Der liebe Augustin——
          維也納人的「親愛的奧古斯丁」
        </p>
        <p key="2">
          傳說是這樣的：
          17 世紀維也納瘟疫流行期間，
          這位常在店裡演出的風笛民謠歌手有天喝掛了，
          被誤認成死者，掉進了掩埋瘟疫死者的坑裡
        </p>
        <p key="3">
          隔天他在坑裡醒來，
          吹著風笛，活著離開，
          變成維也納最有名的民間傳說之一，
          還有一首以他為名的民謠《Oh du lieber Augustin》流傳到今天
        </p>
        <p key="4">
          餐廳入口下方的「瘟疫坑」模型，
          就是官方對這段傳說的紀念——
          以上是傳說的常見版本，把它當故事聽就好，
          別把每個細節都當成史實
        </p>
      </>
    ),
  },
  {
    type: "video-lazy",
    src: `${GB}/augustin-pit.mp4`,
    caption: "門口鐵欄下的奧古斯丁與瘟疫坑模型 — 現場實拍",
    aspectRatio: "9/16",
    maxWidth: "300px",
    autoPlay: true,
  },
  {
    type: "cta",
    message: "《Oh du lieber Augustin》這首歌長怎樣？",
    sub: "歌詞唱著「一切都完了」，曲調卻歡樂到不行——很維也納。旋律你八成聽過：跟童謠 The More We Get Together 是同一條",
    cta: "YouTube 聽這首民謠",
    href: "https://www.youtube.com/results?search_query=O+du+lieber+Augustin",
  },

  /* ══════════════════════════════════════════════════════════════
     08 · 資料來源
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "sources",
    text: "資料來源",
    sub:  "Sources · 08",
    num:  "08",
  },
  {
    type: "sources",
    items: [
      { label: "Griechenbeisl 官方網站 — Our Story", href: OFFICIAL_STORY, note: "餐廳歷史、曾用店名、命名由來、奧古斯丁、官方確認的簽名名單、廳室配置（本文 A 類資訊的唯一來源）" },
      { label: "Griechenbeisl 官方網站 — 首頁與 Impressum", href: OFFICIAL, note: "「最老餐館」自述、名人食客名單、地址 Fleischmarkt 11, 1010 Wien" },
      { label: "Wikipedia — Griechenbeisl", href: "https://en.wikipedia.org/wiki/Griechenbeisl", note: "1447 首次文獻紀錄、約 1200 年塔樓殘構、1852 皮爾森引進、希臘商人 17 世紀中葉（資料補充類的來源）" },
      { label: "Griechenbeisl 2026 官方菜單 PDF", href: "https://www.griechenbeisl.at/wp-content/uploads/2026/06/GB-Speisekarte-_-Pilze-2026.pdf", note: "價位區間依此整理" },
      { label: "Google Maps 商家頁", href: MAPS_PLACE, note: "位置、評分與營業資訊（會變動，以現場為準）" },
      { label: "Oscar 現場照片與影片（2026-06-12）", note: "簽名與相框人物辨認屬個人現場判斷（C 類），歡迎指正" },
      { label: "《Oh du lieber Augustin》民謠與奧古斯丁傳說", note: "民間傳說常見版本（B 類），本文以「傳說」描述，不當作史實" },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
     Oscar's Notes + 收尾
     ══════════════════════════════════════════════════════════════ */
  {
    type: "oscar-notes",
    content: (
      <>
        <p key="1">
          這篇筆記對我來說有兩層，
          一層是把那天的運氣記下來，
          一層是提醒自己：
          <strong key="s">最好的素材常常在你沒開機的時候出現</strong>
        </p>
        <p key="2">
          我沒辦法回去補拍那條走廊了，
          但下次吃飯，我一定會更白目一點
        </p>
      </>
    ),
  },
  {
    type: "cta",
    message: "影片、接案、或你也認得牆上那個人",
    sub: "都歡迎來 IG 找我聊",
    cta: "IG @minehoooo.arw",
    href: "https://www.instagram.com/minehoooo.arw/",
  },
  {
    type: "headline",
    id:   "next",
    text: "下一站",
    sub:  "Next Stop",
  },
  {
    type: "related",
    slugs: ["kino-iphone-guide", "wulu-concept-film"],
  },
];

export default blocks;
