"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hover
          ? {
              y: -6,
              transition: { duration: 0.25 },
            }
          : undefined
      }
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm",
        hover && "transition-shadow hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/5",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-green/5 via-transparent to-brand-amber/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
