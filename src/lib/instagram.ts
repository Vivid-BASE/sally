export interface InstagramPost {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption?: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnailUrl?: string;
  timestamp: string;
}

export interface BeholdResponse {
  posts: InstagramPost[];
}

const FEED_ID = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID || "mNKKgiOUXHZ5k4QOJiew";

export async function fetchInstagramFeed(): Promise<InstagramPost[]> {
  if (!FEED_ID) {
    console.warn('NEXT_PUBLIC_BEHOLD_FEED_ID is not defined');
    return [];
  }

  try {
    const response = await fetch(`https://feeds.behold.so/${FEED_ID}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Instagram feed: ${response.statusText}`);
    }

    const data: BeholdResponse = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return [];
  }
}
