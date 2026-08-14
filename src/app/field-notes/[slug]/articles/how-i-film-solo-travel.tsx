import type { Block } from "@/components/field-notes/editorial/types";

const blocks: Block[] = [
  {
    type: "callout",
    content: (
      <>
        <strong>旅行的本質是旅行</strong><br />
        相機、手機、腳架都只是記錄。拍到六、七十分，我就會收手，剩下的留給肉眼跟五感
      </>
    ),
  },
  {
    type: "image",
    frame: "wide",
    item: {
      src: "/field-notes/solo-travel-ai/oscar-frame-first.jpg",
      alt: "可愛版 Oscar 蹲在低機位腳架旁，用手機確認旅行畫面",
      caption: "AI 旅行手帳｜先決定自己要出現在畫面哪裡，再決定腳架要放哪裡",
    },
  },
  {
    type: "flow-steps",
    steps: [
      {
        num: "01",
        en: "FRAME",
        zh: "手機先抓鏡位",
        thumb: "/field-notes/solo-travel-ai/oscar-frame-first.jpg",
        thumbType: "image",
        anchor: "frame-first",
      },
      {
        num: "02",
        en: "SET",
        zh: "再調整腳架",
        thumb: "/field-notes/solo-travel-ai/oscar-find-own-angle.jpg",
        thumbType: "image",
        anchor: "frame-first",
      },
      {
        num: "03",
        en: "ENTER",
        zh: "最後走進畫面",
        thumb: "/field-notes/solo-travel-ai/oscar-walk-into-frame.jpg",
        thumbType: "image",
        anchor: "enter-frame",
      },
    ],
  },

  {
    type: "headline",
    id: "frame-first",
    num: "01",
    text: "先抓鏡位，再架腳架",
    sub: "不要一到現場就把腳架全部打開",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          我會先找一個相對平坦、也不會擋到別人的位置，拿手機看畫面，先決定自己要站在哪裡、背景要留下多少，再開始架腳架
        </p>
        <p>
          以前在劇組的經驗是，腳架先架好，後面才發現高度不夠或角度要更低，就會一直搬、一直調。先用手機把鏡位抓出來，現場會快很多
        </p>
        <p>
          這次旅行我帶的是 <strong>M.FOTO 腳架</strong>，需要低機位，或是臨時換高度、段數和角度時都能再調，不用一開始就把自己鎖死在同一個視角
        </p>
      </>
    ),
  },
  {
    type: "setup-cards",
    items: [
      { value: "先看", label: "FRAME" },
      { value: "再架", label: "TRIPOD" },
      { value: "留位", label: "MARK" },
      { value: "試走", label: "TAKE" },
    ],
    footer: "先把畫面想清楚，再處理器材，通常會比邊架邊猜快很多",
  },
  {
    type: "image-pair",
    left: {
      src: "/field-notes/solo-travel-ai/oscar-frame-first.jpg",
      alt: "可愛版 Oscar 先用手機確認構圖，再調整旅行腳架",
      caption: "先看手機裡的畫面，再決定腳架位置",
    },
    right: {
      src: "/field-notes/solo-travel-ai/oscar-walk-into-frame.jpg",
      alt: "可愛版 Oscar 在台灣山海與稻田間自然走進鏡頭",
      caption: "架好之後，不用演，先自然走進畫面",
    },
    leftLabel: "FRAME",
    rightLabel: "ENTER",
  },

  {
    type: "headline",
    id: "enter-frame",
    num: "02",
    text: "不用演，先走進畫面就好",
    sub: "我也還在練習怎麼自然地出現在鏡頭裡",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          我現在最常拍的，其實就是一個人走進畫面。架好、按下錄影、走過去，不用一直看鏡頭，也不用急著安排很多表演
        </p>
        <p>
          先把「自然地出現在畫面裡」練熟，簡簡單單就可以開始有故事。等自己越來越不怕鏡頭，再慢慢加動作
        </p>
      </>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        一個人拍不是要假裝旁邊有人，而是讓鏡頭安靜地等你走進去
      </>
    ),
  },

  {
    type: "headline",
    id: "telephoto",
    num: "03",
    text: "我喜歡用長焦，把人放進故事裡",
    sub: "先抓距離，再找一個不會動的對照物",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          我個人很喜歡用長焦拍旅行，只要先抓好自己和鏡頭的距離，再記住一個對照物，就知道等等要走到哪裡
        </p>
        <p>
          像在臺東拍火車，現場人很多，我不會硬站在大家都站的位置，而是繞一下，找一個能把火車、人和環境放進同一個故事的角度
        </p>
        <p>
          長焦不是為了把背景拍糊而已，它會讓畫面裡的距離靠得更近，也比較容易把混亂的現場整理成一個簡單的畫面
        </p>
      </>
    ),
  },

  {
    type: "headline",
    id: "one-motion",
    num: "04",
    text: "一次只讓一件事動",
    sub: "這是我拍攝時最常守的一條規則",
  },
  {
    type: "callout",
    content: (
      <>
        <strong>畫面裡的人在動，鏡頭就不要動</strong><br />
        <strong>鏡頭要動，畫面就收近一點、單純一點</strong>
      </>
    ),
  },
  {
    type: "text",
    content: (
      <>
        <p>
          人走路、火車經過、機車進場，畫面本身已經有動作，固定鏡頭反而更看得懂。真的要移動鏡頭時，我會把資訊減少，讓觀眾知道現在該看哪裡
        </p>
        <p>
          不需要每一顆鏡頭都很厲害，剪在一起有呼吸、有方向，比每一顆都在炫技更重要
        </p>
      </>
    ),
  },
  {
    type: "image",
    frame: "wide",
    item: {
      src: "/field-notes/solo-travel-ai/oscar-telephoto-train.jpg",
      alt: "可愛版 Oscar 走進臺東火車、田野與月台組成的長焦畫面",
      caption: "AI 旅行手帳｜火車和人在動，長焦鏡頭只要好好待著",
    },
  },

  {
    type: "headline",
    id: "own-view",
    num: "05",
    text: "不要只去別人說的最佳拍照點",
    sub: "最有趣的地方，通常不是地圖上那一個點",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          網路上的打卡點可以當參考，但不用把它當答案。大家都站在同一格、拍同一個方向，最後得到的只是同一張照片
        </p>
        <p>
          我更喜歡自己繞一點路，看看光從哪裡來、人在什麼位置、什麼東西剛好只有我注意到。真正的最佳景點，往往是在沒人在乎的角落，因為那裡才看得到你的視角
        </p>
        <p>
          這個「最佳」不是地點給你的，是你自己
        </p>
      </>
    ),
  },
  {
    type: "image",
    frame: "wide",
    item: {
      src: "/field-notes/solo-travel-ai/oscar-find-own-angle.jpg",
      alt: "可愛版 Oscar 蹲在台灣巷弄的水窪旁尋找自己的低角度構圖",
      caption: "AI 旅行手帳｜最佳角度，常常是你願意蹲下來才看見的那一個",
    },
  },

  {
    type: "headline",
    id: "stop",
    num: "06",
    text: "拍到六、七十分，就收手",
    sub: "今天是來旅行，不是來交片",
  },
  {
    type: "text",
    content: (
      <>
        <p>
          我只要確定有拍到，就不會一直追求完美。更多東西要用肉眼、耳朵、氣味和當下的感覺去記住，不是全部都塞進記憶卡
        </p>
        <p>
          不要因為想留下旅行，最後反而沒有真的在旅行。器材是幫你記錄，不是叫你一直工作
        </p>
      </>
    ),
  },
  {
    type: "closing",
    content: (
      <>
        先感受，再找位置<br />
        拍到了，就繼續旅行<br /><br />
        <strong>希望你也能找到屬於自己的視角</strong>
      </>
    ),
  },
  {
    type: "comment-cta",
    label: "跟我分享你最想拍下的旅行",
    sub: "或把這篇先存起來，下次一個人出發時再打開",
  },
  {
    type: "related",
    slugs: ["taiwan-roadbook", "kino-iphone-guide"],
  },
];

export default blocks;
