"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-white p-7 shadow-sm transition-shadow hover:border-brand-green/25 hover:shadow-lg hover:shadow-brand-green/5",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-green/[0.04] via-transparent to-brand-blue/[0.04] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-5 flex size-13 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
          <Icon className="size-6" />
        </div>
        <h3 className="mb-2 font-heading text-lg font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
