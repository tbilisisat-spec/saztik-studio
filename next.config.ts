import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old multi-page site was folded into the homepage. Keep old links working.
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/work/:slug", destination: "/#work", permanent: true },
      { source: "/process", destination: "/#contact", permanent: true },
      { source: "/start-a-project", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
