import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // 301 redirects from the old site are added in phase 4.
};

export default nextConfig;
