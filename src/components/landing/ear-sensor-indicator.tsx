"use client";

import { mawashiXSensor } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Wifi } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export type SensorPosition = {
  /** % from left edge of the image frame */
  x: number;
  /** % from top edge of the image frame */
  y: number;
  /** Which way the Connecté badge extends from the capteur */
  side: "left" | "right";
};

type SensorConnectBadgeProps = {
  className?: string;
  compact?: boolean;
};

/** Connecté pill — can sit away from the animal image */
export function SensorConnectBadge({ className, compact = false }: SensorConnectBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.35 }}
      className={cn("pointer-events-none whitespace-nowrap", className)}
    >
      <div
        className={cn(
          "flex items-center rounded-full border border-brand-green/30 bg-white shadow-md shadow-brand-green/10",
          compact ? "gap-0.5 py-px pr-1.5 pl-px" : "gap-1 py-0.5 sm:gap-1.5 sm:py-1 pr-2 pl-0.5 sm:pr-2.5"
        )}
      >
        <span
          className={cn(
            "relative flex shrink-0 items-center justify-center rounded-full bg-brand-green text-white",
            compact ? "size-3.5" : "size-4 sm:size-5"
          )}
        >
          <Wifi className={compact ? "size-2" : "size-2.5 sm:size-3"} />
          <motion.span
            className="absolute inset-0 rounded-full bg-brand-green"
            animate={{ scale: [1, 1.6], opacity: [0.45, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </span>
        <span
          className={cn(
            "font-semibold text-brand-green",
            compact ? "text-[8px]" : "text-[9px] sm:text-[10px]"
          )}
        >
          Connecté
        </span>
      </div>
    </motion.div>
  );
}

type EarSensorIndicatorProps = {
  position: SensorPosition;
  className?: string;
  /** Smaller badge for hero animal carousel */
  compact?: boolean;
  /** Nudge badge away from the animal (e.g. camel face) */
  badgeOffset?: "outward-left" | "outward-right";
  /** Hardware tag on ear instead of green dot */
  showSensorOnEar?: boolean;
  /** Hide Connecté pill on ear — render SensorConnectBadge separately */
  hideConnectBadge?: boolean;
};

/** Pin + optional badge anchored at `position`, centered on the ear capteur */
export function EarSensorIndicator({
  position,
  className,
  compact = false,
  badgeOffset,
  showSensorOnEar = false,
  hideConnectBadge = false,
}: EarSensorIndicatorProps) {
  const isRight = position.side === "right";
  const pushOut =
    badgeOffset === "outward-left"
      ? compact
        ? "-translate-x-2"
        : "-translate-x-3"
      : badgeOffset === "outward-right"
        ? compact
          ? "translate-x-3"
          : "translate-x-4"
        : "";

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-20 size-0 -translate-x-1/2 -translate-y-1/2",
        className
      )}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      aria-label="Capteur connecté"
    >
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 hidden rounded-full sm:block"
          style={{
            width: (compact ? 10 : 14) + i * (compact ? 9 : 12),
            height: (compact ? 10 : 14) + i * (compact ? 9 : 12),
            marginTop: -((compact ? 10 : 14) + i * (compact ? 9 : 12)) / 2,
            marginLeft: isRight
              ? 0
              : -((compact ? 10 : 14) + i * (compact ? 9 : 12)),
            border: "2px solid transparent",
            borderLeftColor: isRight ? "oklch(0.42 0.13 155 / 0.5)" : "transparent",
            borderRightColor: isRight ? "transparent" : "oklch(0.42 0.13 155 / 0.5)",
            borderRadius: isRight ? "100% 0 0 100%" : "0 100% 100% 0",
            transform: isRight ? "rotate(-20deg)" : "rotate(20deg)",
            transformOrigin: "center center",
          }}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: 1.8, delay: i * 0.25, repeat: Infinity }}
        />
      ))}

      {showSensorOnEar ? (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <Image
            src={mawashiXSensor.image}
            alt={mawashiXSensor.model}
            width={compact ? 22 : 28}
            height={compact ? 17 : 22}
            className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]"
          />
        </motion.div>
      ) : (
        <motion.div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-green shadow-[0_0_8px_rgba(34,197,94,0.8)]",
            compact ? "size-2" : "size-2.5 sm:size-3"
          )}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}

      {!hideConnectBadge && (
        <motion.div
          initial={{ opacity: 0, x: isRight ? 6 : -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 whitespace-nowrap",
            pushOut,
            isRight
              ? compact
                ? "left-2.5"
                : "left-3 sm:left-4"
              : compact
                ? "right-2.5"
                : "right-3 sm:right-4"
          )}
        >
          <SensorConnectBadge compact={compact} />
        </motion.div>
      )}
    </div>
  );
}
