import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || 'dummy';
const apiKey = process.env.MICROCMS_API_KEY || 'dummy';

if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
  console.warn('MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY is not defined. Using dummy values for build.');
}

export const client = createClient({
  serviceDomain,
  apiKey,
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
  englishName: string;
  role: string;
  bio: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
};

