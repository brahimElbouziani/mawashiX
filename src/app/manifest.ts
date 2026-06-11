import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    short_name: siteConfig.brandName,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#166534",
    lang: siteConfig.language,
    orientation: "portrait-primary",
    categories: ["business", "productivity", "agriculture"],
  };
}
