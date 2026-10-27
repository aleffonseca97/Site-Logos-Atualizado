import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  images: {
    remotePatterns: [],
    localPatterns: [
      { pathname: "/brand/**" },
      { pathname: "/uploads/**" },
      { pathname: "/services/**" },
      { pathname: "/studio/**" },
    ],
    qualities: [75, 100],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
