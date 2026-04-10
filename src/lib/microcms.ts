import { createClient } from 'microcms-js-sdk';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  // We'll log a warning but not throw an error yet to allow dev without keys
  console.warn('MICROCMS_SERVICE_DOMAIN is not defined');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
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
