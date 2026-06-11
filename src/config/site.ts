export const siteConfig = {
  name: "MawashiX",
  /** Display brand with capital X */
  brandName: "MawashiX",
  /** Primary domain — override via NEXT_PUBLIC_SITE_URL in production */
  domain: "mawashix.com",
  tagline: "Le gardien digital du troupeau",
  hero: {
    headline: "Surveillez vos animaux",
    headlineAccent: "depuis votre téléphone",
    subheadline: "Un capteur sur l'animal. Une alerte sur votre téléphone.",
    description:
      "MawashiX aide les éleveurs à suivre la température, l'activité et le comportement de leurs animaux. En cas de fièvre, baisse d'activité ou signe anormal, l'éleveur reçoit une alerte simple par SMS ou WhatsApp.",
    highlights: [
      "Alertes SMS & WhatsApp",
      "Réseau longue portée",
      "Pensé pour les élevages marocains",
    ] as const,
  },
  headline: "Surveillez vos animaux depuis votre téléphone — MawashiX",
  description:
    "MawashiX aide les éleveurs marocains à surveiller leurs animaux avec des capteurs connectés : température, activité, mouvement et alertes SMS ou WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mawashix.com",
  locale: "fr_MA",
  language: "fr",
  country: "MA",
  contact: {
    email: "contact@mawashix.com",
    phone: "+212 5XX XX XX XX",
    address: "Maroc",
  },
  social: {
    twitter: "@mawashix",
    linkedin: "https://linkedin.com/company/mawashix",
  },
  /** Fallback when page has no custom image — Next.js serves /opengraph-image */
  defaultOgImage: "/opengraph-image",
} as const;

export type SiteConfig = typeof siteConfig;
