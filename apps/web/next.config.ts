import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Since we're using Biome instead
  },
};

export default nextConfig;
