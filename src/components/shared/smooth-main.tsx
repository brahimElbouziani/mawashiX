"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";

type SmoothMainProps = {
  children: React.ReactNode;
  className?: string;
};

export function SmoothMain({ children, className }: SmoothMainProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
