"use client";

import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { audienceCards } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check, Stethoscope, Tractor, Users } from "lucide-react";
import { motion } from "motion/react";

const iconMap = { Tractor, Stethoscope, Users };

const cardStyles = [
  { gradient: "from-brand-green/[0.04]", iconBg: "bg-brand-green/12", iconColor: "text-brand-green" },
  { gradient: "from-brand-blue/[0.04]", iconBg: "bg-brand-blue/12", iconColor: "text-brand-blue" },
  { gradient: "from-brand-amber/[0.04]", iconBg: "bg-brand-amber/12", iconColor: "text-brand-amber" },
];

export function FarmersVetsSection() {
  return (
    <section id="audience" className="py-16 sm:py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeader
            badge="Pour qui ?"
            title="Pour les éleveurs, vétérinaires et coopératives"
            description="MawashiX accompagne ceux qui prennent soin des animaux, sur le terrain et à distance."
          />
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {audienceCards.map((card, i) => {
            const Icon = iconMap[card.icon];
            const style = cardStyles[i] ?? cardStyles[0];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className={cn(
                  "rounded-3xl border border-border/50 bg-white p-7 shadow-sm lg:p-8",
                  "bg-gradient-to-br to-transparent",
                  style.gradient
                )}
              >
                <div
                  className={cn(
                    "mb-5 flex size-12 items-center justify-center rounded-2xl",
                    style.iconBg,
                    style.iconColor
                  )}
                >
                  <Icon className="size-6" />
                </div>
                <h3 className="font-heading text-xl font-bold">{card.title}</h3>
                <ul className="mt-5 space-y-3">
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <Check className={cn("mt-0.5 size-4 shrink-0", style.iconColor)} />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
