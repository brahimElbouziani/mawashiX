import { absoluteUrl, staticRoutes } from "@/config/navigation";
import { getAllContent } from "@/lib/content/loader";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllContent("blog").map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const newsArticles = getAllContent("news").map((article) => ({
    url: absoluteUrl(`/news/${article.slug}`),
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const pages = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const legalPages: MetadataRoute.Sitemap = [];

  return [...pages, ...blogPosts, ...newsArticles, ...legalPages];
}
