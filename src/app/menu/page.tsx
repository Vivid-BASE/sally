import { client, MenuContent } from "@/lib/microcms";
import MenuView from "@/components/MenuView";

export default async function MenuPage() {
  let menuItems: MenuContent[] = [];

  try {
    const res = await client.get({ endpoint: 'menu', queries: { limit: 100 } });
    if (res.contents && res.contents.length > 0) {
      menuItems = res.contents;
    }
  } catch (e) {
    console.error("microCMS menu fetch failed. Endpoint: 'menu'. Error details:", e);
  }

  return <MenuView menuItems={menuItems} />;
}
