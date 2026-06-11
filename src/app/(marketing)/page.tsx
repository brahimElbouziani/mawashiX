import { JsonLdScript } from "@/components/seo/json-ld-script";
import { AnimatedHero } from "@/components/landing/animated-hero";
import { CTASection } from "@/components/landing/cta-section";
import { DashboardPreviewSection } from "@/components/landing/dashboard-preview-section";
import { FarmersVetsSection } from "@/components/landing/farmers-vets-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { MoroccoFocusSection } from "@/components/landing/morocco-focus-section";
import { TechnologySection } from "@/components/landing/technology-section";
import { WhyMawashiXSection } from "@/components/landing/why-mawashix-section";
import {
  faqPageJsonLd,
  homeWebPageJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo/json-ld";
import { createHomeMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createHomeMetadata();

export default function HomePage() {
  return (
    <>
      <JsonLdScript
        data={[
          websiteJsonLd(),
          softwareApplicationJsonLd(),
          homeWebPageJsonLd(),
          faqPageJsonLd(),
        ]}
      />
      <AnimatedHero />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <MoroccoFocusSection />
      <WhyMawashiXSection />
      <FarmersVetsSection />
      <TechnologySection />
      <CTASection />
    </>
  );
}
