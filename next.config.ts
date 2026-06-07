import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for easier self-hosting later if needed
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
