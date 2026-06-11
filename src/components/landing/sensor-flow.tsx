"use client";

import { howItWorksSteps } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Radio,
  Smartphone,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const iconMap: Record<string, LucideIcon> = {
  Tag,
  Radio,
  LayoutDashboard,
  Smartphone,
};

function StepVisual({
  step,
  variant,
}: {
  step: (typeof howItWorksSteps)[number];
  variant: "desktop" | "mobile";
}) {
  if ("image" in step && step.image) {
    return (
      <Image
        src={step.image}
        alt="Capteur MawashiX sur l'oreille"
        width={variant === "desktop" ? 76 : 52}
        height={variant === "desktop" ? 58 : 40}
        className="h-auto w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
      />
    );
  }

  const Icon = iconMap[step.icon];
  return (
    <Icon
      className={cn(
        "text-brand-green",
        variant === "desktop" ? "size-10" : "size-7"
      )}
    />
  );
}

export function SensorFlow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Desktop horizontal flow */}
      <div className="hidden lg:block">
        <div className="relative grid grid-cols-4 gap-4">
          {/* Connecting line with pulse */}
          <div className="absolute top-12 right-[12.5%] left-[12.5%] h-0.5 bg-border">
            <motion.div
              className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-brand-green to-transparent"
              animate={reduceMotion ? undefined : { left: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-5">
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-brand-green/20"
                  animate={
                    reduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }
                  }
                  transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity }}
                />
                <div className="relative flex size-24 items-center justify-center rounded-2xl border border-brand-green/20 bg-white shadow-lg">
                  <StepVisual step={step} variant="desktop" />
                  <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white">
                    {step.step}
                  </span>
                </div>
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile vertical flow */}
      <div className="space-y-0 lg:hidden">
        {howItWorksSteps.map((step, i) => {
          const isLast = i === howItWorksSteps.length - 1;
          return (
            <motion.div
              key={step.step}
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-32px 0px" }}
              transition={{ delay: reduceMotion ? 0 : i * 0.08, duration: 0.4 }}
              className="relative flex gap-3 min-[400px]:gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="relative flex size-16 items-center justify-center rounded-xl border border-brand-green/20 bg-white shadow-md">
                  <StepVisual step={step} variant="mobile" />
                  <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white">
                    {step.step}
                  </span>
                </div>
                {!isLast && (
                  <div className="relative my-2 h-12 w-0.5 bg-border">
                    <motion.div
                      className="absolute inset-x-0 top-0 h-4 bg-brand-green"
                      animate={reduceMotion ? undefined : { top: ["0%", "100%"] }}
                      transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                    />
                  </div>
                )}
              </div>
              <div className={cn("min-w-0 flex-1 pb-6 sm:pb-8", isLast && "pb-0")}>
                <h3 className="font-heading text-[15px] font-semibold leading-snug min-[400px]:text-base">
                  {step.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground min-[400px]:text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
