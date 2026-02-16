import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'www.broadcastprome.com',
      },
      {
        protocol: 'https',
        hostname: 'broadcastprome.com',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
