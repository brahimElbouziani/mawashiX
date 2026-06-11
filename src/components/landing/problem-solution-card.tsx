"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface ProblemSolutionCardProps {
  problem: string;
  solution: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export function ProblemSolutionCard({
  problem,
  solution,
  description,
  icon: Icon,
  delay = 0,
}: ProblemSolutionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-white p-6 shadow-sm transition-all hover:border-brand-blue/25 hover:shadow-lg"
    >
      <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-brand-earth/15 text-brand-earth">
        <Icon className="size-5" />
      </div>

      <div className="mb-4 space-y-2">
        <p className="text-sm text-muted-foreground line-through decoration-red-300/60">
          {problem}
        </p>
        <div className="flex items-center gap-2">
          <ArrowRight className="size-4 shrink-0 text-brand-green" />
          <p className="font-heading text-lg font-semibold text-brand-green">{solution}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

      <motion.div
        className={cn(
          "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-green to-brand-teal",
          "w-0 group-hover:w-full transition-all duration-500"
        )}
      />
    </motion.div>
  );
}
