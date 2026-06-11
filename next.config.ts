import { siteConfig } from "@/config/site";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  async redirects() {
    const canonical = siteConfig.url.replace(/\/$/, "");

    if (canonical.includes("www.")) {
      return [];
    }

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${siteConfig.domain}` }],
        destination: `${canonical}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
