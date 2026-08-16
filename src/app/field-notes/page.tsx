import FieldNotesIndex from "@/components/field-notes/index/FieldNotesIndex";
import { fieldNotes } from "@/data/fieldNotes";

const SITE_URL = "https://minehoooo.xyz";

export default function FieldNotesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/field-notes#collection`,
    name: "MINEH4O 現場筆記",
    url: `${SITE_URL}/field-notes`,
    description: "從現場判斷、Raw 素材與失敗修正，到最後成片。",
    author: { "@type": "Person", name: "Oscar Lai", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: fieldNotes.map((note, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: note.title,
        url: `${SITE_URL}/field-notes/${note.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        id="field-notes-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <FieldNotesIndex />
    </>
  );
}
