"use client";

import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { technologyPoints } from "@/lib/constants";
import {
  Bell,
  History,
  LayoutDashboard,
  Radio,
  Shield,
  Wifi,
} from "lucide-react";
import { motion } from "motion/react";

const iconMap = { Radio, Wifi, LayoutDashboard, Bell, History, Shield };

export function TechnologySection() {
  return (
    <section id="technology" className="bg-muted/30 py-16 sm:py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeader
            badge="Technologie"
            title="La technologie reste simple pour l'utilisateur"
            description="Derrière MawashiX, une chaîne complète — du capteur à l'alerte sur téléphone."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {technologyPoints.map((point, i) => {
            const Icon = iconMap[point.icon];
            return (
              <ScrollReveal key={point.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="flex h-full gap-4 rounded-2xl border border-border/50 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 rounded-2xl border border-brand-green/20 bg-brand-green/5 px-6 py-8 text-center sm:px-10">
            <p className="font-heading text-lg font-semibold text-brand-green sm:text-xl">
              La technologie reste invisible.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              L&apos;éleveur reçoit seulement l&apos;information utile, au bon moment.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
