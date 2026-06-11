import { siteConfig } from "@/config/site";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Main navbar */
export const primaryNav: NavItem[] = [
  { label: "Comment ça marche", href: "/#how-it-works" },
  { label: "Tableau de bord", href: "/#dashboard" },
  { label: "Animaux compatibles", href: "/#animals" },
  { label: "Pourquoi MawashiX", href: "/#why" },
  { label: "Contact", href: "/#contact" },
];

/** @deprecated use primaryNav */
export const productNav: NavItem[] = primaryNav.filter((item) =>
  item.href.includes("#")
);

export const homeSectionIds = [
  "how-it-works",
  "dashboard",
  "animals",
  "why",
  "audience",
  "technology",
  "contact",
];

export const contentNav: NavItem[] = [
  {
    label: "Blog",
    href: "/blog",
    description: "Guides et conseils pour l'élevage connecté",
  },
  {
    label: "Actualités",
    href: "/news",
    description: "Nouveautés produit et annonces MawashiX",
  },
];

export const footerNav = {
  product: [
    { label: "Comment ça marche", href: "/#how-it-works" },
    { label: "Tableau de bord", href: "/#dashboard" },
    { label: "Animaux compatibles", href: "/#animals" },
    { label: "Pourquoi MawashiX", href: "/#why" },
    { label: "Contact", href: "/#contact" },
  ],
  content: [
    { label: "Blog", href: "/blog" },
    { label: "Actualités", href: "/news" },
  ],
  company: [
    { label: "Confidentialité", href: "/legal/privacy" },
    { label: "Conditions", href: "/legal/terms" },
  ],
} as const;

export const ctaLinks = {
  login: "/#contact",
  demo: "/#contact",
  home: "/",
} as const;

export const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.85, changeFrequency: "daily" as const },
  { path: "/news", priority: 0.85, changeFrequency: "daily" as const },
  { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export function absoluteUrl(path: string) {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
