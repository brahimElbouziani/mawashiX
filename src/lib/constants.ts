export { siteConfig } from "@/config/site";

export type HealthStatus = "normal" | "warning" | "critical" | "info";

export type HealthChip = {
  id: string;
  label: string;
  value: string;
  detail: string;
  status: HealthStatus;
};

/** Même capteur oreille sur tous les animaux — ref. visuelle sensor.webp */
export const mawashiXSensor = {
  model: "MawashiX Tag",
  /** ID court affiché — identique sur chaque animal */
  id: "MX-1099",
  /** Numéro complet gravé sur la pastille (QR) */
  serial: "2024010100021099",
  image: "/sensor.webp",
} as const;

/** Carte capteur — réutilisable ailleurs si besoin */
export const sensorHealthChip: HealthChip = {
  id: "sensor",
  label: "Capteur",
  value: mawashiXSensor.id,
  detail: "Connecté · " + mawashiXSensor.model,
  status: "info",
};

/** 4 infos principales autour de l’animal — langage éleveur */
export const cowHealthChips: HealthChip[] = [
  {
    id: "status",
    label: "État",
    value: "À surveiller",
    detail: "Signes anormaux détectés",
    status: "warning",
  },
  {
    id: "temperature",
    label: "Température",
    value: "39,8 °C",
    detail: "Statut : Élevée",
    status: "warning",
  },
  {
    id: "activity",
    label: "Activité",
    value: "Faible",
    detail: "Moins de mouvement que d'habitude",
    status: "warning",
  },
  {
    id: "sync",
    label: "Dernière donnée",
    value: "Il y a 8 min",
    detail: "Capteur connecté",
    status: "normal",
  },
];

export const camelHealthChips: HealthChip[] = [
  {
    id: "status",
    label: "État",
    value: "Normal",
    detail: "Aucun signe d’alerte",
    status: "normal",
  },
  {
    id: "temperature",
    label: "Température",
    value: "Température normale",
    detail: "38,2 °C",
    status: "normal",
  },
  {
    id: "activity",
    label: "Activité",
    value: "Activité normale",
    detail: "Comportement habituel",
    status: "normal",
  },
  {
    id: "sync",
    label: "Dernière donnée",
    value: "Il y a 10 min",
    detail: "Mouvement normal",
    status: "normal",
  },
];

export const sheepHealthChips: HealthChip[] = [
  {
    id: "status",
    label: "État",
    value: "Normal",
    detail: "Animal en bonne forme",
    status: "normal",
  },
  {
    id: "temperature",
    label: "Température",
    value: "Température normale",
    detail: "38,5 °C",
    status: "normal",
  },
  {
    id: "activity",
    label: "Activité",
    value: "Activité normale",
    detail: "Niveau habituel",
    status: "normal",
  },
  {
    id: "sync",
    label: "Dernière donnée",
    value: "Il y a 5 min",
    detail: "Mouvement normal",
    status: "normal",
  },
];

/** @deprecated use per-animal health chips */
export const heroDataChips = cowHealthChips;

export const dashboardMetrics = {
  totalAnimals: 128,
  alertAnimals: 3,
  avgTemperature: 38.4,
  herdActivity: 82,
} as const;

export const dashboardAlerts = [
  { animal: "#024", message: "Mange peu + mouvement faible", time: "Il y a 5 min", severity: "warning" },
  { animal: "#087", message: "Alimentation réduite", time: "Il y a 22 min", severity: "warning" },
  { animal: "#112", message: "Immobilité prolongée", time: "Il y a 1h", severity: "critical" },
] as const;

export type DashboardPreviewMode = "normal" | "alert";

export type DashboardPreviewData = {
  profile: {
    id: string;
    breed: string;
    tracking: string;
    lastUpdate: string;
  };
  healthLabel: "Normal" | "À surveiller" | "Alerte";
  healthStatus: HealthStatus;
  temperature: { value: string; status: string; tone: HealthStatus };
  activity: { value: string; status: string; tone: HealthStatus };
  movement: { value: string; detail: string; status: string; tone: HealthStatus };
  battery: { level: number; signal: string };
  alerts: string[];
  chartLabel: string;
  chartData: number[];
};

export const dashboardAnimalPreview: Record<DashboardPreviewMode, DashboardPreviewData> = {
  normal: {
    profile: {
      id: "Vache #024",
      breed: "Prim'Holstein",
      tracking: "En suivi",
      lastUpdate: "il y a 5 min",
    },
    healthLabel: "Normal",
    healthStatus: "normal",
    temperature: { value: "38,5 °C", status: "Normal", tone: "normal" },
    activity: { value: "78 %", status: "Normale", tone: "normal" },
    movement: { value: "Normal", detail: "Pas / activité quotidienne stable", status: "Stable", tone: "normal" },
    battery: { level: 86, signal: "Connecté" },
    alerts: [],
    chartLabel: "Température — aujourd'hui",
    chartData: [38.2, 38.3, 38.4, 38.5, 38.4, 38.5, 38.5, 38.4, 38.5, 38.5, 38.4, 38.5],
  },
  alert: {
    profile: {
      id: "Vache #024",
      breed: "Prim'Holstein",
      tracking: "À surveiller",
      lastUpdate: "il y a 8 min",
    },
    healthLabel: "À surveiller",
    healthStatus: "warning",
    temperature: { value: "39,8 °C", status: "Élevée", tone: "warning" },
    activity: { value: "Faible", status: "Faible", tone: "warning" },
    movement: { value: "Faible", detail: "Baisse par rapport à l'habitude", status: "Faible", tone: "warning" },
    battery: { level: 86, signal: "Connecté" },
    alerts: ["Température élevée et activité faible détectées."],
    chartLabel: "Température — aujourd'hui",
    chartData: [38.4, 38.6, 38.8, 39.0, 39.2, 39.4, 39.5, 39.6, 39.7, 39.8, 39.7, 39.8],
  },
};

export const howItWorksSteps = [
  {
    step: 1,
    icon: "Tag" as const,
    image: mawashiXSensor.image,
    title: "Capteur sur l'animal",
    description:
      "Un petit capteur est fixé sur l'oreille ou le collier de l'animal.",
  },
  {
    step: 2,
    icon: "Radio" as const,
    title: "Données envoyées à distance",
    description:
      "Le capteur envoie les données : température, activité et mouvement.",
  },
  {
    step: 3,
    icon: "LayoutDashboard" as const,
    title: "Analyse MawashiX",
    description:
      "La plateforme analyse les signes anormaux et classe l'animal : Normal, À surveiller ou Alerte.",
  },
  {
    step: 4,
    icon: "Smartphone" as const,
    title: "Alerte sur téléphone",
    description:
      "L'éleveur reçoit une alerte simple par SMS ou WhatsApp.",
  },
] as const;

export const whySigns = [
  "Fièvre",
  "Baisse d'activité",
  "Mouvement inhabituel",
  "Animal isolé ou faible",
] as const;

export const whyBenefits = [
  "Moins de pertes",
  "Gain de temps",
  "Meilleure visibilité sur le troupeau",
  "Suivi individuel des animaux",
  "Aide à la décision pour l'éleveur et le vétérinaire",
] as const;

export const dashboardInfoItems = [
  "Température",
  "Activité",
  "Mouvement",
  "Batterie du capteur",
  "Dernière mise à jour",
  "Historique par animal",
  "Dernières alertes",
] as const;

export const moroccoLivestock = [
  {
    icon: "Beef" as const,
    title: "Bovins",
    description: "Vaches laitières et bovins viande.",
  },
  {
    icon: "Sheep" as const,
    title: "Ovins",
    description: "Moutons, béliers et agneaux.",
  },
  {
    icon: "Goat" as const,
    title: "Caprins",
    description: "Chèvres et chevreaux.",
  },
  {
    icon: "Camel" as const,
    title: "Camelins",
    description: "Dromadaires dans les zones rurales et sahariennes.",
  },
] as const;

export const audienceCards = [
  {
    icon: "Tractor" as const,
    title: "Éleveurs",
    points: [
      "Recevoir des alertes simples sans surveiller chaque animal manuellement",
      "Moins de pertes et gain de temps au quotidien",
      "Compatible avec les petites et grandes fermes",
    ],
  },
  {
    icon: "Stethoscope" as const,
    title: "Vétérinaires",
    points: [
      "Accéder à l'historique de température et d'activité avant l'intervention",
      "Prioriser les animaux à risque",
      "Données fiables pour le diagnostic",
    ],
  },
  {
    icon: "Users" as const,
    title: "Coopératives",
    points: [
      "Suivre plusieurs élevages depuis un seul écran",
      "Identifier les animaux à risque rapidement",
      "Meilleure visibilité pour accompagner les adhérents",
    ],
  },
] as const;

export const technologyPoints = [
  {
    icon: "Radio" as const,
    title: "Capteurs connectés",
    description: "Fixés sur l'oreille ou le collier, légers et autonomes.",
  },
  {
    icon: "Wifi" as const,
    title: "Transmission longue portée",
    description: "Fonctionne dans les zones rurales, même loin du réseau mobile.",
  },
  {
    icon: "LayoutDashboard" as const,
    title: "Plateforme web et mobile",
    description: "Tableau de bord clair, accessible partout au Maroc.",
  },
  {
    icon: "Bell" as const,
    title: "Alertes SMS / WhatsApp",
    description: "Messages simples en français, directement sur le téléphone.",
  },
  {
    icon: "History" as const,
    title: "Historique par animal",
    description: "Température, activité et mouvement sur les derniers jours.",
  },
  {
    icon: "Shield" as const,
    title: "Tableau de bord clair",
    description: "Normal, À surveiller ou Alerte — sans jargon technique.",
  },
] as const;

export const mobileAlertMessage =
  "Alerte MawashiX : Vache #024 présente une température élevée et une baisse d'activité.";
