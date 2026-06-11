"use client";

import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { whyBenefits, whySigns } from "@/lib/constants";
import { Check } from "lucide-react";
import { motion } from "motion/react";

export function WhyMawashiXSection() {
  return (
    <section id="why" className="py-16 sm:py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeader
            badge="Pourquoi MawashiX ?"
            title="Les problèmes de santé sont souvent détectés trop tard"
            description="MawashiX aide à repérer plus tôt les signes faibles, avant qu'il ne soit trop tard."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mx-auto mb-10 max-w-2xl rounded-2xl border border-border/50 bg-muted/20 p-6 text-center sm:p-8">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Signes surveillés
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {whySigns.map((sign, i) => (
                <motion.span
                  key={sign}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-full border border-brand-green/20 bg-brand-green/8 px-3 py-1 text-sm font-medium text-brand-green"
                >
                  {sign}
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyBenefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="flex items-start gap-3 rounded-xl border border-border/50 bg-white p-4 shadow-sm"
            >
              <Check className="mt-0.5 size-5 shrink-0 text-brand-green" />
              <p className="text-sm font-medium leading-snug">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
