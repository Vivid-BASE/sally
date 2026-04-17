import { client, NewsContent, ProfileContent } from "@/lib/microcms";
import HomeView from "@/components/HomeView";

const mockProfile: ProfileContent = {
  id: "1",
  name: "新田 豊",
  englishName: "Yutaka Nitta",
  role: "2nd Generation Master",
  bio: `1978年に父が創業した Bar Sally。\n私はその二代目として、この場所を守り続けています。\n\n「ただいまと、言いたくなる場所を目指して」\n今宵も最高の一杯と空間をご用意しております。`,
  image: {
    url: "/images/1703_sally_sub-thumb-155xauto-13893.jpg",
    width: 800,
    height: 1000
  },
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
  revisedAt: ""
};

const mockNews = [
  { img: "/images/bar/photo_image4_l.jpg", title: "Bar Night", delay: 0 },
  { img: "/images/photo/LINE_ALBUM_sally宣材_260410_53.jpg", title: "Event", delay: 0.1 },
  { img: "/images/curry/curry.jpg", title: "Nara Shikanai Curry", delay: 0.2 },
  { img: "/images/photo/LINE_ALBUM_sally宣材_260410_42.jpg", title: "Community", delay: 0.3 },
];

export default async function Home() {
  let news = mockNews;
  let profile = mockProfile;

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
    let menuItems: MenuContent[] = [];
    try {
      const menuRes = await client.get({ endpoint: 'menu', queries: { limit: 10 } });
      if (menuRes.contents) {
        menuItems = menuRes.contents;
      }
    } catch (e) {
      console.warn("microCMS menu fetch failed for home page.", e);
    }

    return <HomeView news={news} profile={profile} menuItems={menuItems} />;
  } catch (e) {
    console.warn("microCMS fetch failed during build, using mock data.", e);
  }

  return <HomeView news={news} profile={profile} menuItems={[]} />;
}
