"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const appScreens = [
  {
    src: "/app2.png",
    alt: "MawashiX — vache en bonne santé, score 92/100",
    width: 576,
    height: 1086,
    glow: "bg-brand-green/20",
    label: "Sain",
    labelClass: "border-brand-green/25 bg-brand-green/10 text-brand-green",
    rotate: "sm:-rotate-3",
    floatDelay: 0,
    enterDelay: 0,
  },
  {
    src: "/app1.png",
    alt: "MawashiX — alerte détectée, température et activité anormales",
    width: 616,
    height: 1086,
    glow: "bg-red-500/15",
    label: "Alerte",
    labelClass: "border-red-500/25 bg-red-500/10 text-red-600",
    rotate: "sm:rotate-3",
    floatDelay: 0.6,
    enterDelay: 0.12,
  },
] as const;

export function MobileAlertMockup() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,340px)] overflow-x-clip py-2 sm:max-w-xl sm:py-4 lg:max-w-2xl">
      <div className="flex items-end justify-center gap-0 max-sm:-space-x-10 min-[360px]:max-sm:-space-x-12 min-[430px]:max-sm:-space-x-14 sm:gap-4 lg:gap-6">
        {appScreens.map((screen, i) => (
          <motion.div
            key={screen.src}
            className={cn(
              "relative shrink-0",
              "w-[132px] min-[360px]:w-[142px] min-[390px]:w-[156px] min-[430px]:w-[168px]",
              "sm:w-[44%] sm:max-w-[280px]",
              screen.rotate,
              i === 1 && "z-10"
            )}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 28, scale: reduceMotion ? 1 : 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-32px" }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.7,
              delay: screen.enterDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 4.2,
                delay: screen.floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] blur-xl sm:-inset-6 sm:blur-2xl",
                  screen.glow
                )}
              />
              <Image
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                className="h-auto w-full drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)] sm:drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
                sizes="(max-width: 430px) 156px, (max-width: 640px) 168px, (max-width: 1024px) 22vw, 240px"
                priority={i === 0}
              />
              <span
                className={cn(
                  "absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border px-2 py-0.5 text-[10px] font-semibold shadow-sm backdrop-blur-sm sm:-bottom-3 sm:px-2.5 sm:text-xs",
                  screen.labelClass
                )}
              >
                {screen.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-20 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/8 blur-3xl min-[430px]:h-48 min-[430px]:w-48 sm:h-64 sm:w-64" />
    </div>
  );
}
