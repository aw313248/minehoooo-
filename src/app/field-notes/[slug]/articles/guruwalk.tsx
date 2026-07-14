/**
 * GuruWalk — 旅遊工具小筆記（特別簡單版）
 * 從維也納 Griechenbeisl 筆記獨立出來：它是所有旅行都能用的工具
 * 查證：官網中文介面、小費制、台北/台中場次（2026-07）
 */
import type { Block } from "@/components/field-notes/editorial/types";

const blocks: Block[] = [

  {
    type: "text",
    content: (
      <>
        <p key="1">
          這是一篇特別簡單的筆記，
          因為工具本身就很簡單
        </p>
        <p key="2">
          出國如果你喜歡深度旅遊，
          很多人在用的一招是：
          <strong key="s">跟當地人帶的免費徒步導覽團</strong>，
          行程免費參加，
          結束後照你對導遊的喜好給小費就好
        </p>
        <p key="3">
          GuruWalk 就是找這種團的平台
        </p>
      </>
    ),
  },
  {
    type: "app-rec",
    name: "GuruWalk",
    tagline: "FREE WALKING TOURS · 小費制在地導覽",
    appStoreUrl: "https://apps.apple.com/tw/app/guruwalk/id1505278935",
    website: "https://www.guruwalk.com/",
    icon: "/field-notes/guruwalk/icon.jpg",
    reason: "跟著當地導遊用走的認識一座城市——歐洲、亞洲、全世界的老城區幾乎都有團。行程免費，結束後依滿意度給小費（官方建議上限約 $50）",
  },

  {
    type: "headline",
    id:   "why",
    text: "我覺得它棒在哪",
    sub:  "Why · 01",
    num:  "01",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          <strong key="s1">導遊很用心</strong>——
          很多導遊會直接在自己的頁面分享路線筆記和在地美食推薦，
          還沒出發就先賺到一份攻略
        </p>
        <p key="2">
          <strong key="s2">資訊很透明</strong>——
          每個團直接標示導覽語言和評價星等，
          西班牙語團、英語團一眼看清楚，不會到現場才發現聽不懂
        </p>
        <p key="3">
          <strong key="s3">官網內容很豐富</strong>——
          而且有中文介面可以逛，
          出發前先把目的地的團翻一遍，行程就有底了
        </p>
        <p key="4">
          <strong key="s4">付費方式很人性</strong>——
          活動結束後，照你對導遊的喜好給相應的小費就可以了
        </p>
      </>
    ),
  },

  {
    type: "headline",
    id:   "taiwan",
    text: "先在台灣試跟一次",
    sub:  "Taiwan · 02",
    num:  "02",
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          它不是只有歐洲——
          <strong key="s">台灣就有團</strong>：
          台北老城區的導覽是招牌，
          台中、台南、高雄也都找得到
        </p>
        <p key="2">
          出國前先在自己的城市跟一次，
          你就知道這種旅行方式合不合你
        </p>
      </>
    ),
  },
  {
    type: "callout",
    content: (
      <>
        <strong>三步上手：</strong><br />
        1. 裝 App 或開官網，搜尋目的地城市<br />
        2. 看語言標示和星等挑一個團，免費預約（不用信用卡）<br />
        3. 走完之後，照你的喜好給導遊小費
      </>
    ),
  },
  {
    type: "text",
    content: (
      <>
        <p key="1">
          這篇是免費分享，
          沒有業配、沒有分潤，
          純粹覺得好用就放上來讓大家學習使用
        </p>
      </>
    ),
  },
  {
    type: "sources",
    items: [
      { label: "GuruWalk 官方網站", href: "https://www.guruwalk.com/", note: "小費制模式、中文介面、各城市場次（2026-07 查證）" },
      { label: "GuruWalk 台灣場次總覽", href: "https://www.guruwalk.com/c/taiwan", note: "台北／台中／台南／高雄" },
      { label: "App Store（台灣區）", href: "https://apps.apple.com/tw/app/guruwalk/id1505278935" },
    ],
  },
  {
    type: "headline",
    id:   "next",
    text: "下一站",
    sub:  "Next Stop",
  },
  {
    type: "related",
    slugs: ["vienna-griechenbeisl", "kino-iphone-guide"],
  },
];

export default blocks;
