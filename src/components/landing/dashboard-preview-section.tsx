"use client";

import { DashboardAnimalPreview } from "@/components/landing/dashboard-animal-preview";
import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { dashboardInfoItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function DashboardPreviewSection() {
  return (
    <section id="dashboard" className="relative overflow-x-clip py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-green/[0.04] via-transparent to-brand-blue/[0.04]" />

      <Container className="relative">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-medium tracking-wide text-brand-green uppercase">
              Tableau de bord
            </p>
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
              Tout votre troupeau en un seul écran
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
              MawashiX transforme les données du capteur en informations simples
              pour l&apos;éleveur.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {(["Normal", "À surveiller", "Alerte"] as const).map((status) => (
                <span
                  key={status}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold",
                    status === "Normal" && "border-brand-green/25 bg-brand-green/10 text-brand-green",
                    status === "À surveiller" && "border-amber-500/25 bg-amber-500/10 text-amber-700",
                    status === "Alerte" && "border-red-500/25 bg-red-500/10 text-red-600"
                  )}
                >
                  {status}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative mt-10 sm:mt-14">
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-green/10 via-transparent to-brand-blue/10 blur-2xl sm:-inset-8" />
            <DashboardAnimalPreview />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mx-auto mt-10 max-w-2xl">
            <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
              Informations affichées
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {dashboardInfoItems.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-border/50 bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
