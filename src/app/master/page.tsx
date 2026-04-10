import { client, ProfileContent } from "@/lib/microcms";
import MasterView from "@/components/MasterView";

const mockProfile: ProfileContent = {
  id: "1",
  name: "新田 豊",
  englishName: "Yutaka Nitta",
  role: "2nd Generation Master",
  bio: `1978年に父が創業した Bar Sally。\n私はその二代目として、この場所を守り続けています。\n\n大和郡山という歴史ある街で、「人」と「人」が交差する瞬間を見守ってきました。\n「ただいまと、言いたくなる場所を目指して」\n\nお酒の知識はもちろんのこと、お客様が何を求めてこの扉を開けたのか。その気持ちに寄り添う最高の一杯を提供することを信条としています。`,
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

export default async function MasterPage() {
  let profile = mockProfile;

  try {
    const res = await client.get({ endpoint: 'profile' });
    if (res.contents && res.contents.length > 0) {
      profile = res.contents[0];
    } else if (res.name) {
      profile = res;
    }
  } catch (e) {
    console.warn("microCMS fetch failed for master during build.", e);
  }

  return <MasterView profile={profile} />;
}
