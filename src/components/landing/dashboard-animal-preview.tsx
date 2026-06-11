"use client";

import type { DashboardPreviewData, DashboardPreviewMode, HealthStatus } from "@/lib/constants";
import { dashboardAnimalPreview, mawashiXSensor } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  Battery,
  CheckCircle2,
  Footprints,
  HeartPulse,
  Tag,
  Thermometer,
  TrendingUp,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const toneStyles: Record<
  HealthStatus,
  { badge: string; value: string; icon: string }
> = {
  normal: {
    badge: "bg-brand-green/10 text-brand-green border-brand-green/20",
    value: "text-brand-green",
    icon: "bg-brand-green/10 text-brand-green",
  },
  warning: {
    badge: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    value: "text-amber-700",
    icon: "bg-amber-500/10 text-amber-700",
  },
  critical: {
    badge: "bg-red-500/10 text-red-600 border-red-500/20",
    value: "text-red-600",
    icon: "bg-red-500/10 text-red-600",
  },
  info: {
    badge: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    value: "text-brand-blue",
    icon: "bg-brand-blue/10 text-brand-blue",
  },
};

function StatusBadge({ label, status }: { label: string; status: HealthStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        toneStyles[status].badge
      )}
    >
      {status === "critical" ? (
        <AlertTriangle className="size-3" />
      ) : (
        <HeartPulse className="size-3" />
      )}
      {label}
    </span>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  status,
  tone,
  detail,
  delay = 0,
}: {
  icon: typeof Thermometer;
  label: string;
  value: string;
  status: string;
  tone: HealthStatus;
  detail?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-border/50 bg-white p-3 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg",
              toneStyles[tone].icon
            )}
          >
            <Icon className="size-4" strokeWidth={2.25} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
            <p className={cn("mt-0.5 text-base font-bold", toneStyles[tone].value)}>{value}</p>
            {detail && (
              <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{detail}</p>
            )}
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
            toneStyles[tone].badge
          )}
        >
          {status}
        </span>
      </div>
    </motion.div>
  );
}

function MiniChart({
  data,
  mode,
  label,
}: {
  data: number[];
  mode: DashboardPreviewMode;
  label: string;
}) {
  const min = Math.min(...data) - 0.2;
  const max = Math.max(...data) + 0.2;
  const range = max - min || 1;
  const w = 280;
  const h = 56;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  const stroke = mode === "alert" ? "#ef4444" : "#22c55e";
  const fill = mode === "alert" ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.12)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.35, duration: 0.45 }}
      className="rounded-xl border border-border/50 bg-white p-3 shadow-sm"
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        <TrendingUp className={cn("size-3.5", mode === "alert" ? "text-red-500" : "text-brand-green")} />
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`chart-fill-${mode}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.polyline
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <polygon
          fill={`url(#chart-fill-${mode})`}
          points={`0,${h} ${points} ${w},${h}`}
        />
      </svg>
    </motion.div>
  );
}

function AnimalCenter({ mode, data }: { mode: DashboardPreviewMode; data: DashboardPreviewData }) {
  const isAlert = mode === "alert";

  return (
    <div className="relative flex flex-col items-center justify-end py-2 sm:py-4">
      <div
        className={cn(
          "pointer-events-none absolute bottom-[8%] left-1/2 h-8 w-[72%] -translate-x-1/2 rounded-[100%] blur-xl transition-colors duration-700 sm:h-10",
          isAlert ? "bg-red-500/25" : "bg-brand-green/25"
        )}
      />
      <div className="relative h-[140px] w-[100px] sm:h-[180px] sm:w-[128px]">
        {isAlert && (
          <>
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute top-[38%] left-1/2 rounded-full border border-red-500/40"
                style={{
                  width: 40 + ring * 22,
                  height: 40 + ring * 22,
                  marginLeft: -(40 + ring * 22) / 2,
                  marginTop: -(40 + ring * 22) / 2,
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.1, 0.5] }}
                transition={{ duration: 2, delay: ring * 0.3, repeat: Infinity }}
              />
            ))}
          </>
        )}
        <Image
          src="/mawashix_cow-sm.png"
          alt="Vache Prim'Holstein avec capteur MawashiX"
          fill
          className="object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
          sizes="128px"
        />
        <div
          className="absolute z-10"
          style={{ left: "84%", top: "17.8%", transform: "translate(-50%, -50%)" }}
        >
          <Image
            src={mawashiXSensor.image}
            alt="Capteur MawashiX"
            width={18}
            height={14}
            className="drop-shadow-sm sm:w-[22px]"
          />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={data.healthLabel}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="mt-3"
        >
          <StatusBadge label={data.healthLabel} status={data.healthStatus} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DashboardContent({ mode, data }: { mode: DashboardPreviewMode; data: DashboardPreviewData }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-3 p-3 min-w-0 sm:gap-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-5"
      >
        {/* Left column */}
        <div className="order-2 min-w-0 space-y-3 lg:order-none">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border/50 bg-white p-3 shadow-sm"
          >
            <div className="flex items-start gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <Tag className="size-4" />
              </div>
              <div>
                <p className="font-heading text-sm font-bold">{data.profile.id}</p>
                <p className="text-[11px] text-muted-foreground">Race : {data.profile.breed}</p>
                <p className="text-[11px] text-muted-foreground">Statut : {data.profile.tracking}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Dernière mise à jour : {data.profile.lastUpdate}
                </p>
              </div>
            </div>
          </motion.div>

          <MetricCard
            icon={Thermometer}
            label="Température"
            value={data.temperature.value}
            status={data.temperature.status}
            tone={data.temperature.tone}
            delay={0.05}
          />
          <MetricCard
            icon={Activity}
            label="Activité"
            value={data.activity.value}
            status={data.activity.status}
            tone={data.activity.tone}
            delay={0.1}
          />
        </div>

        {/* Center — animal */}
        <div
          className={cn(
            "relative order-1 min-w-0 overflow-hidden rounded-2xl border transition-colors duration-700 lg:order-none",
            mode === "alert"
              ? "border-red-500/20 bg-gradient-to-b from-red-500/[0.06] to-white"
              : "border-brand-green/20 bg-gradient-to-b from-brand-green/[0.06] to-white"
          )}
        >
          <AnimalCenter mode={mode} data={data} />
        </div>

        {/* Right column */}
        <div className="order-3 min-w-0 space-y-3 lg:order-none">
          <MetricCard
            icon={Footprints}
            label="Mouvement"
            value={data.movement.value}
            status={data.movement.status}
            tone={data.movement.tone}
            detail={data.movement.detail}
            delay={0.05}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-white p-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  <Battery className="size-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground">Batterie capteur</p>
                  <p className="text-base font-bold text-foreground">{data.battery.level} %</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-medium text-brand-green">
                <Wifi className="size-3" />
                {data.battery.signal}
              </div>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-brand-green"
                initial={{ width: 0 }}
                whileInView={{ width: `${data.battery.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-border/50 bg-white p-3 shadow-sm"
          >
            <p className="mb-2 text-[11px] font-medium text-muted-foreground">Dernières alertes</p>
            {data.alerts.length === 0 ? (
              <div className="flex items-center gap-2 rounded-lg bg-brand-green/5 px-2 py-2">
                <CheckCircle2 className="size-3.5 text-brand-green" />
                <p className="text-[11px] text-muted-foreground">Aucune alerte — tout est normal</p>
              </div>
            ) : (
              <ul className="space-y-1.5">
                {data.alerts.map((alert, i) => (
                  <motion.li
                    key={alert}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-2 rounded-lg bg-red-500/5 px-2 py-1.5"
                  >
                    <AlertTriangle className="mt-0.5 size-3 shrink-0 text-red-500" />
                    <span className="text-[11px] leading-snug text-foreground">{alert}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>

        {/* Full-width chart */}
        <div className="order-4 min-w-0 lg:col-span-3 lg:order-none">
          <MiniChart data={data.chartData} mode={mode} label={data.chartLabel} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function DashboardAnimalPreview() {
  const [mode, setMode] = useState<DashboardPreviewMode>("normal");
  const data = dashboardAnimalPreview[mode];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-white shadow-2xl shadow-brand-green/8 sm:rounded-3xl">
      {/* Browser bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border/50 bg-muted/30 px-4 py-2.5 sm:px-5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-[11px] text-muted-foreground sm:mx-auto">app.mawashix.com</span>

        <div className="flex w-full gap-1 rounded-lg bg-muted/60 p-0.5 sm:ml-auto sm:w-auto">
          {(["normal", "alert"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 rounded-md px-3 py-1 text-[11px] font-semibold transition-all sm:flex-none sm:px-4",
                mode === m
                  ? m === "normal"
                    ? "bg-brand-green text-white shadow-sm"
                    : "bg-red-500 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m === "normal" ? "État normal" : "À surveiller"}
            </button>
          ))}
        </div>
      </div>

      <DashboardContent mode={mode} data={data} />
    </div>
  );
}
