import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY || process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

if (!serviceDomain || !apiKey || serviceDomain === 'dummy' || apiKey === 'dummy') {
  console.error(`[CRITICAL] microCMS configuration missing! Domain: ${serviceDomain ? 'OK' : 'MISSING'}, Key: ${apiKey ? 'OK' : 'MISSING'}. Build will likely fail or show empty data.`);
} else {
  // Debug log to verify the key format while keeping it secure
  const maskedKey = `${apiKey.substring(0, 4)}****${apiKey.substring(apiKey.length - 4)}`;
  console.log(`[DEBUG] Attempting fetch with Domain: [${serviceDomain}], Key: [${maskedKey}]`);
}

export const client = createClient({
  serviceDomain: serviceDomain || 'dummy',
  apiKey: apiKey || 'dummy',
});

export type NewsContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  image?: {
    url: string;
    height: number;
    width: number;
  };
  category?: string[];
};

export type ActivityContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  link?: string;
};

export type MenuContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  category: string;
  name: string;
  price: string;
  description?: string;
  image?: {
    url: string;
    height: number;
    width: number;
  };
};

export type ProfileContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  englishName?: string;
  role: string;
  bio: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
};

