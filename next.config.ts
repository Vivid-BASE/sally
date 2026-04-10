import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/sally',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
