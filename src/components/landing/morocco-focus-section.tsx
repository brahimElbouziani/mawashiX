"use client";

import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { moroccoLivestock } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Beef,
  Mountain,
  Sun,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

const iconMap: Record<string, LucideIcon> = {
  Beef,
  Sheep: Wheat,
  Goat: Mountain,
  Camel: Sun,
};

const emojiMap: Record<string, string> = {
  Beef: "🐄",
  Sheep: "🐑",
  Goat: "🐐",
  Camel: "🐪",
};

export function MoroccoFocusSection() {
  return (
    <section id="animals" className="bg-muted/30 py-16 sm:py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeader
            badge="Animaux compatibles"
            title="Pensé pour les élevages marocains"
            description="MawashiX est conçu pour le terrain : fermes, pâturages, zones rurales et élevages de différentes tailles."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {moroccoLivestock.map((item, i) => {
            const Icon = iconMap[item.icon];
            const emoji = emojiMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border/50 bg-white p-6 shadow-sm",
                  "transition-all hover:border-brand-earth/40 hover:shadow-md"
                )}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-brand-earth/12 text-2xl">
                    {emoji}
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-brand-green/8 text-brand-green opacity-60">
                    <Icon className="size-5" />
                  </div>
                </div>
                <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
