import { absoluteUrl } from "@/config/navigation";
import { seoDefaults } from "@/config/seo";
import { siteConfig } from "@/config/site";
import type { ContentListItem } from "@/lib/content/types";
import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
  authors?: string[];
};

function buildOgImages(title: string, image?: string, imageAlt?: string) {
  const ogImage = image ? absoluteUrl(image) : absoluteUrl(siteConfig.defaultOgImage);
  return [
    {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: imageAlt ?? title,
    },
  ];
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  imageAlt,
  noIndex = false,
  type = "website",
  publishedAt,
  updatedAt,
  authors,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: keywords ?? [...seoDefaults.keywords],
    authors: authors?.map((name) => ({ name })),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.brandName,
      locale: siteConfig.locale,
      type,
      images: buildOgImages(title, image, imageAlt),
      ...(type === "article" && publishedAt
        ? {
            publishedTime: publishedAt,
            modifiedTime: updatedAt ?? publishedAt,
            authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: buildOgImages(title, image, imageAlt).map((img) => img.url),
      site: seoDefaults.twitter.site,
      creator: seoDefaults.twitter.creator,
    },
    robots: noIndex ? { index: false, follow: false } : seoDefaults.robots,
  };
}

export function createHomeMetadata(): Metadata {
  return createPageMetadata({
    title: seoDefaults.defaultTitle,
    description: seoDefaults.description,
    path: "/",
    keywords: [...seoDefaults.keywords],
    imageAlt: `${siteConfig.brandName} — ${siteConfig.tagline}`,
  });
}

export function createContentMetadata(
  item: ContentListItem,
  type: "blog" | "news"
): Metadata {
  const basePath = type === "blog" ? "/blog" : "/news";
  const seo = item.seo;

  return createPageMetadata({
    title: seo?.title ?? item.title,
    description: seo?.description ?? item.description,
    path: `${basePath}/${item.slug}`,
    keywords: seo?.keywords ?? [...seoDefaults.keywords, ...item.tags],
    image: item.image,
    imageAlt: item.imageAlt ?? item.title,
    noIndex: seo?.noIndex,
    type: "article",
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    authors: [item.author],
  });
}

export function createListingMetadata(type: "blog" | "news"): Metadata {
  const isBlog = type === "blog";
  return createPageMetadata({
    title: isBlog
      ? "Blog élevage & AgriTech — Conseils pour éleveurs"
      : "Actualités MawashiX — AgriTech Maroc",
    description: isBlog
      ? "Guides pratiques, conseils d'élevage et articles AgriTech pour les éleveurs marocains."
      : "Nouveautés, lancements et partenariats MawashiX pour l'élevage connecté au Maroc.",
    path: isBlog ? "/blog" : "/news",
    keywords: isBlog
      ? [...seoDefaults.keywords, "blog élevage", "conseils fermiers Maroc"]
      : [...seoDefaults.keywords, "actualités AgriTech", "nouveautés MawashiX"],
  });
}

export function getRootMetadata(): Metadata {
  const url = siteConfig.url;

  return {
    metadataBase: new URL(url),
    title: {
      default: seoDefaults.defaultTitle,
      template: seoDefaults.titleTemplate,
    },
    description: seoDefaults.description,
    keywords: [...seoDefaults.keywords],
    applicationName: siteConfig.brandName,
    authors: [{ name: siteConfig.brandName, url }],
    creator: siteConfig.brandName,
    publisher: siteConfig.brandName,
    category: "AgriTech",
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...seoDefaults.openGraph,
      url,
      title: seoDefaults.defaultTitle,
      description: seoDefaults.description,
      images: buildOgImages(seoDefaults.defaultTitle),
    },
    twitter: {
      ...seoDefaults.twitter,
      title: seoDefaults.defaultTitle,
      description: seoDefaults.description,
      images: buildOgImages(seoDefaults.defaultTitle).map((img) => img.url),
    },
    robots: seoDefaults.robots,
    other: {
      "geo.region": siteConfig.country,
      "geo.placename": "Maroc",
    },
  };
}
