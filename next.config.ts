import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Experimental: Configure Server Actions settings
  experimental: {
    serverActions: {
      allowedOrigins: ["ultracraft.lk", "www.ultracraft.lk"],
    },
  },
};

export default nextConfig;
