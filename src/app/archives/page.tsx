import { client } from "@/lib/microcms";
import ArchivesView from "@/components/ArchivesView";

export default async function ArchivesPage() {
  let activities = [];

  try {
    const res = await client.get({ endpoint: 'activity' });
    if (res.contents) {
      activities = res.contents;
    }
  } catch (e) {
    console.warn("microCMS activity fetch failed during build.", e);
  }

  return <ArchivesView activities={activities} />;
}
