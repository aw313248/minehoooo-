/**
 * 台灣機車環島 Roadbook — 站點示意圖對映
 * 目前為 Wikimedia Commons 授權示意圖（isPlaceholder=true）
 * Oscar 上傳自己的照片後：換 src、isPlaceholder 改 false、credit 移除
 */

const S = "/field-notes/taiwan-roadbook/spots";

export interface SpotImage {
  match: string;
  src: string;
  isPlaceholder: boolean;
  credit?: string; // Wikimedia 授權需標示作者
}

export const spotImages: SpotImage[] = [
  { match: "台中出發", src: "/field-notes/taiwan-roadbook/cover.jpg", isPlaceholder: false },
  { match: "阿波鴨肉", src: `${S}/apo-duck.jpg`, isPlaceholder: true, credit: "Berthe · CC BY-SA 3.0" },
  { match: "奇美博物館", src: `${S}/chimei.jpg`, isPlaceholder: true, credit: "Mk2010 · CC BY-SA 3.0" },
  { match: "嘉簡住", src: `${S}/chiayi-stay.jpg`, isPlaceholder: true, credit: "Pascal Terjan · CC BY-SA 2.0" },
  { match: "河樂廣場", src: `${S}/spring-plaza.jpg`, isPlaceholder: true, credit: "總統府 · CC BY 2.0" },
  { match: "神農街", src: `${S}/shennong.jpg`, isPlaceholder: true, credit: "Tze Chiang Hao · CC BY-SA 4.0" },
  { match: "國華街", src: `${S}/guohua.jpg`, isPlaceholder: true, credit: "Allervous · CC BY-SA 4.0" },
  { match: "海安路", src: `${S}/haian.jpg`, isPlaceholder: true, credit: "米田賢一 · CC BY 3.0" },
  { match: "美術館二館", src: `${S}/tnam2.jpg`, isPlaceholder: true, credit: "Chang tt · CC BY-SA 4.0" },
];

export const EQUIP_IMAGES = {
  camera: { src: `${S}/xpro2.jpg`, credit: "Morio · CC BY-SA 4.0" },
  support: { src: `${S}/manfrotto.jpg`, credit: "Dmitry Makeev · CC BY-SA 4.0" },
};

export function imageFor(name: string): SpotImage | undefined {
  return spotImages.find(s => name.includes(s.match));
}

/* 頁尾致謝（CC 授權要求標示） */
export const photoCredits = [
  ...spotImages.filter(s => s.credit).map(s => `${s.match}：${s.credit}`),
  `X-Pro2：${EQUIP_IMAGES.camera.credit}`,
  `腳架：${EQUIP_IMAGES.support.credit}`,
];
