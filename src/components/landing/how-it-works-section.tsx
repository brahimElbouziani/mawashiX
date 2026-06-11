"use client";

import { MobileAlertMockup } from "@/components/landing/mobile-alert-mockup";
import { SensorFlow } from "@/components/landing/sensor-flow";
import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="overflow-x-clip bg-muted/30 py-16 sm:py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeader
            badge="Comment ça marche"
            title="De l'animal à votre téléphone"
            description="Quatre étapes simples pour comprendre MawashiX."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <SensorFlow />
        </ScrollReveal>

        <div className="mt-12 grid items-center gap-8 sm:mt-16 sm:gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal direction="left">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-heading text-xl font-bold sm:text-2xl">
                Une alerte claire, quand vous en avez besoin
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                L&apos;éleveur reçoit une alerte simple par SMS ou WhatsApp. Pas
                besoin d&apos;ouvrir un ordinateur — vous savez tout de suite quel
                animal poser problème.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2} className="flex justify-center lg:justify-end">
            <MobileAlertMockup />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
