import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Reduces stale/missing server chunk ids (Cannot find module './647.js') after HMR on Windows.
  // Slightly slower cold compiles in dev; production builds are unchanged.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
