import { client, NewsContent, ProfileContent, MenuContent } from "@/lib/microcms";
import HomeView from "@/components/HomeView";

export default async function Home() {
  let news: any[] = [];
  let profile: ProfileContent | null = null;
  let menuItems: MenuContent[] = [];

  try {
    // Fetch News
    const newsRes = await client.get({ endpoint: 'news', queries: { limit: 4 } });
    if (newsRes.contents && newsRes.contents.length > 0) {
      news = newsRes.contents.map((item: NewsContent, index: number) => ({
        img: item.image?.url || "/images/photo_image4_l.jpg",
        title: item.title,
        delay: index * 0.1
      }));
    }

    // Fetch Profile
    const profileRes = await client.get({ endpoint: 'profile' });
    if (profileRes.contents && profileRes.contents.length > 0) {
      profile = profileRes.contents[0];
    } else if (profileRes.name) {
      profile = profileRes;
    }

    // Fetch Menu
    try {
      const menuRes = await client.get({ endpoint: 'menu', queries: { limit: 10 } });
      if (menuRes.contents) {
        menuItems = menuRes.contents;
      }
    } catch (e) {
      console.error("microCMS menu fetch failed for home page. Check endpoint 'menu'. Details:", e);
    }

  } catch (e) {
    console.error("microCMS core fetch failed (News/Profile). Details:", e);
  }

  // Fallback to null/empty if data is missing, rather than showing fake info
  return <HomeView news={news} profile={profile || {} as ProfileContent} menuItems={menuItems} />;
}
