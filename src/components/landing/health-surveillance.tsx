"use client";

import type { HealthChip, HealthStatus } from "@/lib/constants";
import { VitalWaveLine } from "@/components/landing/vital-wave-line";
import { cn } from "@/lib/utils";
import {
  Activity,
  Clock,
  HeartPulse,
  Thermometer,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const chipIcons: Record<string, LucideIcon> = {
  status: HeartPulse,
  temperature: Thermometer,
  activity: Activity,
  sync: Clock,
};

const statusConfig: Record<
  HealthStatus,
  { label: string; className: string }
> = {
  normal: {
    label: "Normal",
    className: "bg-brand-green/10 text-brand-green",
  },
  warning: {
    label: "À surveiller",
    className: "bg-amber-500/10 text-amber-700",
  },
  critical: {
    label: "Alerte",
    className: "bg-red-500/10 text-red-600",
  },
  info: {
    label: "Actif",
    className: "bg-brand-blue/10 text-brand-blue",
  },
};

function valueColor(status: HealthStatus) {
  if (status === "normal") return "text-brand-green";
  if (status === "warning") return "text-amber-700";
  if (status === "critical") return "text-red-600";
  return "text-brand-blue";
}

function resolvePanelStatus(chips: HealthChip[]): HealthStatus {
  const statusChip = chips.find((c) => c.id === "status");
  if (statusChip) return statusChip.status;
  if (chips.some((c) => c.status === "critical")) return "critical";
  if (chips.some((c) => c.status === "warning")) return "warning";
  return "normal";
}

const defaultFloatPositions: Record<string, string> = {
  status: "-left-[5rem] top-1 sm:-left-[5.5rem]",
  sync: "-right-[5rem] top-8 sm:-right-[5.5rem] sm:top-10",
  temperature: "-left-[5rem] bottom-[28%] sm:-left-[5.5rem]",
  activity: "-right-[5rem] bottom-8 sm:-right-[5.5rem] sm:bottom-10",
};

const floatPositionOverrides: Record<string, Partial<Record<string, string>>> = {
  cow: {
    sync: "-right-[5.25rem] top-[5.5rem] sm:-right-[5.75rem] sm:top-24",
  },
  sheep: {
    sync: "-right-[5rem] top-20 sm:-right-[5.5rem]",
  },
  camel: {
    // Hump wide — push cards further out; keep top-right clear for Connecté badge
    status: "-left-[6.25rem] top-2 sm:-left-[6.75rem] sm:top-3",
    temperature: "-left-[6.25rem] bottom-[22%] sm:-left-[6.75rem]",
    activity: "-right-[6.25rem] top-[22%] sm:-right-[6.75rem] sm:top-24",
    sync: "-right-[6.25rem] bottom-10 sm:-right-[6.75rem] sm:bottom-12",
  },
};

type HealthSurveillanceChipsProps = {
  chips: HealthChip[];
  variant?: "grid" | "float";
  animalId?: string;
  className?: string;
};

export function HealthSurveillanceChips({
  chips,
  variant = "grid",
  animalId,
  className,
}: HealthSurveillanceChipsProps) {
  if (variant === "float") {
    const overrides = animalId ? floatPositionOverrides[animalId] : undefined;

    return (
      <>
        {chips.map((chip, i) => (
          <motion.div
            key={chip.id}
            className={cn(
              "absolute z-20 w-[128px] rounded-lg border border-border/50 bg-white/95 px-2 py-1.5 shadow-md backdrop-blur-sm sm:w-[132px]",
              overrides?.[chip.id] ?? defaultFloatPositions[chip.id],
              className
            )}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ opacity: { delay: 0.25 + i * 0.06, duration: 0.35 } }}
          >
            <FarmerChipBody chip={chip} compact />
          </motion.div>
        ))}
      </>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 gap-1.5", className)}>
      {chips.map((chip, i) => (
        <motion.div
          key={chip.id}
          className="rounded-lg border border-border/50 bg-white/95 px-2 py-1.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.05 }}
        >
          <FarmerChipBody chip={chip} compact />
        </motion.div>
      ))}
    </div>
  );
}

function FarmerChipBody({ chip, compact = false }: { chip: HealthChip; compact?: boolean }) {
  const status = statusConfig[chip.status];
  const Icon = chipIcons[chip.id] ?? HeartPulse;
  const hideBadge = chip.id === "status";

  return (
    <div className="space-y-1">
      <div className="flex items-start gap-1.5">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md",
            compact ? "size-5" : "size-6",
            chip.status === "critical"
              ? "bg-red-500/10 text-red-600"
              : chip.status === "warning"
                ? "bg-amber-500/10 text-amber-700"
                : "bg-brand-green/10 text-brand-green"
          )}
        >
          <Icon className={compact ? "size-3" : "size-3.5"} strokeWidth={2.25} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[8px] font-medium tracking-wide text-muted-foreground uppercase">
            {chip.label}
          </p>
          <p
            className={cn(
              "text-[10px] font-semibold leading-snug",
              valueColor(chip.status)
            )}
          >
            {chip.value}
          </p>
        </div>
      </div>
      {chip.detail && (
        <p
          className={cn(
            "leading-snug text-muted-foreground",
            compact ? "line-clamp-2 text-[7px]" : "text-[8px]"
          )}
        >
          {chip.detail}
        </p>
      )}
      {!hideBadge && (
        <span
          className={cn(
            "inline-flex rounded px-1 py-px text-[7px] font-medium",
            status.className
          )}
        >
          {status.label}
        </span>
      )}
    </div>
  );
}

/** Ligne vitale seule */
export function HealthSurveillancePanel({
  chips,
  animalId,
}: {
  chips: HealthChip[];
  animalId?: string;
}) {
  const panelStatus = resolvePanelStatus(chips);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={animalId ?? panelStatus}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        <VitalWaveLine status={panelStatus} />
      </motion.div>
    </AnimatePresence>
  );
}
