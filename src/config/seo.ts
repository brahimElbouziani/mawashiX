import { siteConfig } from "@/config/site";

export const defaultKeywords = [
  "MawashiX",
  "mawashiX",
  "élevage connecté Maroc",
  "IoT agricole Maroc",
  "AgriTech Maroc",
  "surveillance bétail",
  "capteur oreille vache",
  "capteur animal",
  "alertes éleveurs SMS",
  "alertes WhatsApp élevage",
  "tableau de bord élevage",
  "température animaux",
  "activité bétail",
  "ferme connectée",
  "élevage bovin Maroc",
  "élevage ovin Maroc",
  "dromadaire capteur",
  "prévention santé animale",
  "LoRa élevage",
] as const;

export const seoDefaults = {
  titleTemplate: `%s | ${siteConfig.brandName}`,
  defaultTitle: `${siteConfig.brandName} — Surveillance du troupeau par capteurs connectés`,
  description: siteConfig.description,
  keywords: [...defaultKeywords],
  openGraph: {
    type: "website" as const,
    locale: siteConfig.locale,
    siteName: siteConfig.brandName,
  },
  twitter: {
    card: "summary_large_image" as const,
    site: siteConfig.social.twitter,
    creator: siteConfig.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
} as const;

export const homeFaqs = [
  {
    question: "Qu'est-ce que MawashiX ?",
    answer:
      "MawashiX est une plateforme AgriTech marocaine qui surveille le bétail grâce à des capteurs connectés sur l'animal. Les éleveurs reçoivent des alertes simples par SMS ou WhatsApp en cas de fièvre, baisse d'activité ou comportement anormal.",
  },
  {
    question: "Quels animaux sont compatibles avec MawashiX ?",
    answer:
      "MawashiX est compatible avec les bovins, ovins, caprins et camelins — vaches laitières, moutons, chèvres et dromadaires, adaptés aux élevages marocains.",
  },
  {
    question: "Comment MawashiX alerte-t-il l'éleveur ?",
    answer:
      "Un capteur fixé sur l'oreille ou le collier envoie température, activité et mouvement. La plateforme analyse les données et envoie une alerte par SMS ou WhatsApp si l'animal est à surveiller ou en alerte.",
  },
  {
    question: "MawashiX fonctionne-t-il en zone rurale ?",
    answer:
      "Oui. MawashiX utilise une transmission longue portée adaptée aux pâturages et zones rurales marocaines, même loin du réseau mobile classique.",
  },
] as const;
