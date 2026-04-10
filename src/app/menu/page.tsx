import { client, MenuContent } from "@/lib/microcms";
import MenuView from "@/components/MenuView";

const mockMenu: MenuContent[] = [
  { id: "1", category: "Signature", name: "Nara Shikanai Curry", price: "¥1,200", description: "奈良のカレーグランプリ優勝作品", createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "" },
  { id: "2", category: "Whisky", name: "Single Malt Selection", price: "¥1,000 ~", description: "厳選されたシングルモルト", createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "" },
  { id: "3", category: "Cocktail", name: "Standard Cocktails", price: "¥800 ~", description: "お好みに合わせた一杯を", createdAt: "", updatedAt: "", publishedAt: "", revisedAt: "" },
];

export default async function MenuPage() {
  let menuItems = mockMenu;

  try {
    const res = await client.get({ endpoint: 'menu', queries: { limit: 100 } });
    if (res.contents && res.contents.length > 0) {
      menuItems = res.contents;
    }
  } catch (e) {
    console.warn("microCMS menu fetch failed during build.", e);
  }

  return <MenuView menuItems={menuItems} />;
}
