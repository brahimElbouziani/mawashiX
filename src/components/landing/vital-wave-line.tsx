"use client";

import type { HealthStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Soft clinical pulse — one gentle beat per cycle, seamless loop */
const WAVE_PATH =
  "M0 12 H16 C18 12 19.5 12 20.5 12 C21.5 8 23 4 24 12 C25 20 26.5 12 28 12 H48";

const statusStyles: Record<HealthStatus, { stroke: string; duration: string }> = {
  normal: { stroke: "text-brand-green/70", duration: "4.5s" },
  warning: { stroke: "text-amber-500/75", duration: "3.2s" },
  critical: { stroke: "text-red-500/75", duration: "2.4s" },
  info: { stroke: "text-brand-blue/70", duration: "4.5s" },
};

type VitalWaveLineProps = {
  status?: HealthStatus;
  className?: string;
};

export function VitalWaveLine({ status = "normal", className }: VitalWaveLineProps) {
  const cfg = statusStyles[status];

  return (
    <div
      className={cn("relative h-5 w-full overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border/40" />
      <svg
        className={cn("animate-vital-wave absolute inset-0 h-full w-[200%]", cfg.stroke)}
        style={{ animationDuration: cfg.duration }}
        viewBox="0 0 48 24"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={WAVE_PATH}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={WAVE_PATH}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          transform="translate(48 0)"
        />
      </svg>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white/90 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/90 to-transparent" />
    </div>
  );
}
