export interface PhotographyPovWork {
  id: string;
  index: string;
  title: string;
  meta: string;
  image: string;
  href: string;
}

export const photographyPovWorks: PhotographyPovWork[] = [
  {
    id: "joyce",
    index: "01",
    title: "JOYCE 純愛俱樂部",
    meta: "SPECIAL SESSION · 2024",
    image: "/photos/event/20240323%20JOYCE%E7%B4%94%E6%84%9B%E4%BF%B1%E6%A8%82%E9%83%A8-00672.JPG",
    href: "/?section=photo",
  },
  {
    id: "fine-art",
    index: "02",
    title: "平面攝影精選",
    meta: "FINE ART PHOTOGRAPHY",
    image: "/photos/flat/%E5%A6%82%E5%A4%A2%E4%BC%BC%E5%B9%BB-1.JPG",
    href: "/?section=photo",
  },
  {
    id: "outdoor",
    index: "03",
    title: "戶外人像",
    meta: "OUTDOOR PORTRAIT",
    image: "/photos/outdoor/%E6%97%A5%E7%B3%BB1.jpg",
    href: "/?section=photo",
  },
  {
    id: "park2",
    index: "04",
    title: "PARK2 國際親吻日",
    meta: "CAMPAIGN PHOTOGRAPHY · 2025",
    image: "/photos/park2/park2-1.jpg",
    href: "/?section=photo",
  },
  {
    id: "wedding",
    index: "05",
    title: "婚禮紀實",
    meta: "WEDDING DOCUMENTARY · 2024",
    image: "/photos/wedding/wedding-1.jpg",
    href: "/?section=photo",
  },
];
