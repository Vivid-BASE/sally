import { client, NewsContent, ProfileContent, MenuContent } from "@/lib/microcms";
import HomeView from "@/components/HomeView";

export default async function Home() {
  let news: any[] = [];

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
  } catch (e) {
    console.error("microCMS news fetch failed for home page. Details:", e);
  }

  // Fallback to empty if data is missing
  return <HomeView news={news} />;
}
