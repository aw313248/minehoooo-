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
     00 · 開場
     ══════════════════════════════════════════════════════════════ */
  {
    type: "text",
    content: (
      <>
        <p key="1">先講結論，</p>
        <p key="2"><strong key="s">吃飯的時候，多起來走一走</strong></p>
        <p key="3">
          這篇筆記有兩件事：
          一間我意外走進去的五百年老餐廳，
          還有一支「素材根本沒拍完整」的影片是怎麼剪出來的
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
          那天在維也納，就是跟大家吃個飯，
          沒有拍攝計畫，沒有功課，什麼都沒有
        </p>
        <p key="2">
          吃到一半，我突然想離開座位，在餐廳裡亂逛
        </p>
        <p key="3">
          我平常吃飯不太會做這件事——
          <strong key="s">這也是我現在最後悔的地方</strong>
        </p>
        <p key="4">
          這間店的外觀真的不起眼，
          裡面卻像地窖，一間房接著一間房，越走越深，
          店員看到我在亂晃，也沒有阻止我
        </p>
        <p key="5">
          然後我推開其中一間房——
          整個天花板、整面牆，全部都是簽名
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
        盤子邊緣就印著 Griechenbeisl 的字樣，
        湯是清湯底的傳統前菜，
        啤酒是奧地利的 Gösser
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
    ],
    links: [
      { label: "Google Maps", href: MAPS_PLACE },
      { label: "官方網站",     href: OFFICIAL },
    ],
    footnote: "營業時間與訂位資訊會變動，前往之前請再到官方網站或 Google Maps 確認一次",
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
        year: "約 550 年前",
        title: "餐館開始服務客人",
        desc: "官方網站自述「The Griechenbeisl has been serving guests for 550 years」，是維也納自稱最老的餐館 The oldest Inn in town",
        tag: "official",
      },
      {
        year: "早期",
        title: "曾用過不同店名",
        desc: "先後叫過「黃鷹之家 Gasthaus zum gelben Adler」與「金天使之家 Gasthaus zum goldenen Engel」",
        tag: "official",
      },
      {
        year: "17 世紀",
        title: "親愛的奧古斯丁在這裡演出",
        desc: "民謠歌手 Der liebe Augustin 常帶著風笛在店裡表演，他的傳說留在下面第 07 章",
        tag: "official",
      },
      {
        year: "希臘商人時代",
        title: "得到現在的名字",
        desc: "希臘商人在這一區聚居經商之後，店逐漸被維也納人叫成 Griechenbeisl——「希臘小酒館」，Beisl 是維也納方言的小酒館",
        tag: "official",
      },
      {
        year: "19–20 世紀",
        title: "藝術家、學者、政治人物的聚會所",
        desc: "官方列出的簽名包括：維也納市長 Karl Lueger、俾斯麥 Graf Bismarck、畫家席勒 Egon Schiele、泰山演員 Johnny Weissmüller",
        tag: "official",
      },
      {
        year: "名人食客",
        title: "馬克吐溫、貝多芬、莫札特都吃過",
        desc: "官方網站首頁寫著 Mark Twain、Beethoven、Mozart、Pavarotti、Johnny Cash 曾在此用餐——注意這說的是「來吃過飯」，牆上哪些是本人親筆簽名要另外考證",
        tag: "official",
      },
      {
        year: "現在",
        title: "一樓五廳、二樓三廳",
        desc: "一樓有圓廳、齊特琴室、Karlsbader、Mark Twain Room 等五間，二樓有獵人廳、燭光廳、Biedermeier 廳，全部可以包場",
        tag: "official",
      },
      {
        year: "2026-06-12",
        title: "一個台中人吃飯吃到一半亂逛，誤入 Mark Twain Room",
        desc: "本篇筆記的起點",
        tag: "oscar",
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
          簽名牆上看得到日文簽名「山本耕史」「戶田惠梨香」，
          相框照片的部分有鋼琴家郎朗、米倉涼子、假屋崎省吾，
          還有更多我認不出來的人物
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
    type: "image",
    item: {
      src: `${GB}/pavarotti-wall.avif`,
      alt: "牆上的帕華洛帝簽名照與 Engelbert 相框",
      caption: "帕華洛帝的簽名照片，下面是 Engelbert 的簽名證書",
    },
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

  /* ══════════════════════════════════════════════════════════════
     08 · Reels 拆解
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "reels",
    text: "這支影片是怎麼剪的",
    sub:  "Reels Breakdown · 08",
    num:  "08",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          現在換帽子，
          從旅行筆記切到創作者筆記
        </p>
        <p key="2">
          這支 Reels 最大的問題是：
          <strong key="s">我根本沒有拍攝計畫</strong>，
          素材是吃飯吃到一半亂拍的，
          最關鍵的「走進餐廳、一路探索」的運鏡畫面，完全不存在
        </p>
      </>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        <strong>Hook（開頭第一句）：</strong><br />
        「我現在最後悔的，就是以前吃飯的時候不夠白目。」
      </>
    ),
  },
  {
    type: "text",
    content: (
      <>
        <p key="1"><strong key="s">資訊揭露順序，照懸念排：</strong></p>
        <p key="2">
          聚餐 → 突然想亂逛 → Google Maps 找不到入口 →
          （這裡本來該有走路素材，偏偏沒有）→
          直接跳進簽名房 → 現代名人 → 誤認李昌鈺 →
          歷史名人揭露 → Mark Twain Room 點題 →
          親愛的奧古斯丁收尾 → 導流到這篇筆記
        </p>
      </>
    ),
  },
  {
    type: "text",
    content: (
      <>
        <p key="1"><strong key="s">素材缺一大塊，怎麼辦：</strong></p>
        <p key="2">
          我的原則是——
          <strong key="s2">不生成假的紀錄畫面，不假裝有拍到</strong>，
          缺的就承認缺，然後想辦法讓缺口變成故事的一部分
        </p>
      </>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        <strong>缺素材的五個解法：</strong><br />
        1. 直接在旁白承認「偏偏沒有拍到」——誠實本身就有喜感<br />
        2. 用 Google Maps 螢幕錄影補「地理懸念」：地圖上找不到門口，剛好接住敘事<br />
        3. 靜態照片加推近、裁切、鏡頭晃動，配上空間音效，觀眾會自己腦補出空間感<br />
        4. 用旁白把缺少的「行動」講出來，畫面只負責情緒<br />
        5. 素材的缺口 = 故事的轉折點，「我沒拍到」比「我拍到了」更像真的
      </>
    ),
  },
  {
    type: "text",
    content: (
      <>
        <p key="1"><strong key="s">留言點，二選一：</strong></p>
        <p key="2">
          「你第一眼也有把他看成李昌鈺博士嗎？」
          或
          「有人看得出這到底是誰嗎？」
        </p>
        <p key="3"><strong key="s2">筆記導流（影片結尾唸的那句）：</strong></p>
        <p key="4">
          「我把這間店的位置、那個人的故事、官方歷史的中文整理，
          還有我怎麼把一段根本沒拍完整的素材剪成影片，
          全部放在首頁筆記了。」
        </p>
      </>
    ),
  },

  /* ══════════════════════════════════════════════════════════════
     09 · 資料來源
     ══════════════════════════════════════════════════════════════ */
  {
    type: "headline",
    id:   "sources",
    text: "資料來源",
    sub:  "Sources · 09",
    num:  "09",
  },
  {
    type: "sources",
    items: [
      { label: "Griechenbeisl 官方網站 — Our Story", href: OFFICIAL_STORY, note: "餐廳歷史、曾用店名、命名由來、奧古斯丁、官方確認的簽名名單、廳室配置（本文 A 類資訊的唯一來源）" },
      { label: "Griechenbeisl 官方網站 — 首頁與 Impressum", href: OFFICIAL, note: "「最老餐館」自述、名人食客名單、地址 Fleischmarkt 11, 1010 Wien" },
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
