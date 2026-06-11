import { absoluteUrl } from "@/config/navigation";
import { homeFaqs } from "@/config/seo";
import { siteConfig } from "@/config/site";
import type { ContentListItem } from "@/lib/content/types";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    alternateName: ["Mawashi X", "mawashiX"],
    url: siteConfig.url,
    logo: absoluteUrl("/icon"),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.country,
      addressRegion: "Maroc",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      areaServed: {
        "@type": "Country",
        name: "Morocco",
      },
      availableLanguage: ["French", "Arabic"],
    },
    sameAs: [siteConfig.social.linkedin],
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.brandName,
    description: siteConfig.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "LivestockMonitoring",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "MAD",
      description: "Demander une démo gratuite",
      url: absoluteUrl("/#contact"),
    },
    featureList: [
      "Surveillance température animaux",
      "Suivi activité et mouvement",
      "Alertes SMS et WhatsApp",
      "Tableau de bord troupeau",
      "Historique par animal",
    ],
    provider: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.url,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brandName,
    alternateName: "mawashiX",
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.url,
    },
  };
}

export function homeWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoDefaultsTitle(),
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.brandName,
      url: siteConfig.url,
    },
    about: {
      "@type": "Thing",
      name: "Surveillance IoT du bétail au Maroc",
    },
  };
}

function seoDefaultsTitle() {
  return `${siteConfig.brandName} — ${siteConfig.tagline}`;
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(item: ContentListItem, type: "blog" | "news") {
  const basePath = type === "blog" ? "/blog" : "/news";
  return {
    "@context": "https://schema.org",
    "@type": type === "news" ? "NewsArticle" : "BlogPosting",
    headline: item.title,
    description: item.description,
    datePublished: item.publishedAt,
    dateModified: item.updatedAt ?? item.publishedAt,
    author: {
      "@type": "Person",
      name: item.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon"),
      },
    },
    mainEntityOfPage: absoluteUrl(`${basePath}/${item.slug}`),
    image: item.image ? absoluteUrl(item.image) : absoluteUrl(siteConfig.defaultOgImage),
    keywords: item.tags.join(", "),
    articleSection: item.category,
    inLanguage: siteConfig.language,
  };
}

export function blogListingJsonLd(items: ContentListItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog ${siteConfig.brandName}`,
    description: "Guides et conseils pour l'élevage connecté au Maroc",
    url: absoluteUrl("/blog"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
    },
    blogPost: items.slice(0, 10).map((item) => ({
      "@type": "BlogPosting",
      headline: item.title,
      url: absoluteUrl(`/blog/${item.slug}`),
      datePublished: item.publishedAt,
    })),
  };
}
