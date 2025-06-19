import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "images.unsplash.com",
      "fakestoreapi.com"
      // add other domains if needed
    ],
  },
  reactStrictMode: false,


};

export default nextConfig;
