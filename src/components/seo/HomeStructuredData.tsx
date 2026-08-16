import { worksData } from "@/data/works";

const SITE_URL = "https://minehoooo.xyz";
const FEATURED_SLUGS = new Set([
  "chen-zhuo-all-fools-day",
  "chen-zhuo-lumen",
  "chen-zhuo-aperture",
  "chen-zhuo-deprived",
  "bring-me-your-lovely",
]);

export default function HomeStructuredData() {
  const featuredVideos = worksData
    .filter((work) => FEATURED_SLUGS.has(work.slug) && work.youtubeId)
    .map((work) => ({
      "@type": "VideoObject",
      "@id": `${SITE_URL}/work/${work.slug}#video`,
      name: work.title,
      description: work.metaDescription,
      thumbnailUrl: `https://img.youtube.com/vi/${work.youtubeId}/maxresdefault.jpg`,
      uploadDate: `${work.uploadDate}T00:00:00+08:00`,
      duration: work.duration,
      contentUrl: `https://www.youtube.com/watch?v=${work.youtubeId}`,
      embedUrl: `https://www.youtube.com/embed/${work.youtubeId}`,
      inLanguage: "zh-TW",
      director: { "@id": `${SITE_URL}/#person` },
    }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Oscar Lai",
        alternateName: ["賴明宏", "MINEH4O", "minehoooo"],
        url: SITE_URL,
        image: `${SITE_URL}/profile.png`,
        jobTitle: "Director · Director of Photography · Visual Producer",
        description: "台灣影像創作者，專注音樂錄影帶導演、攝影與 AIGC 創作。",
        homeLocation: {
          "@type": "Place",
          name: "Taichung, Taiwan",
        },
        sameAs: [
          "https://instagram.com/minehoooo.arw",
          "https://instagram.com/mlpon6",
          "https://www.youtube.com/@BigCataw313248",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "MINEH4O — Oscar Lai Portfolio",
        url: SITE_URL,
        inLanguage: ["zh-TW", "en"],
        author: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        name: "MINEH4O — 賴明宏 Oscar Lai Portfolio",
        url: SITE_URL,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      ...featuredVideos,
    ],
  };

  return (
    <script
      id="home-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
