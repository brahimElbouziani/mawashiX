"use client";

import { Badge } from "@/components/ui/badge";
import { dashboardAlerts, dashboardMetrics } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const spring = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    spring.set(value);
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v * 10) / 10));
    return unsub;
  }, [value, spring]);

  const formatted = Number.isInteger(value) ? Math.round(display) : display.toFixed(1);

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

const tempBars = [62, 58, 65, 70, 68, 72, 75, 71, 78, 74, 80, 76];
const activityBars = [55, 60, 58, 65, 70, 68, 72, 75, 80, 78, 82, 85];

interface DashboardMockupProps {
  compact?: boolean;
  className?: string;
}

export function DashboardMockup({ compact = false, className }: DashboardMockupProps) {
  const severityStyles = {
    warning: "bg-amber-500/12 text-amber-700",
    critical: "bg-red-500/12 text-red-600",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/50 bg-white shadow-2xl shadow-brand-green/8",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-green-400" />
        </div>
        <span className="mx-auto text-[11px] text-muted-foreground">
          app.mawashix.com
        </span>
        <Badge className="bg-brand-green/12 text-[10px] text-brand-green">
          <span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-brand-green" />
          Live
        </Badge>
      </div>

      <div className={cn("p-4 sm:p-5", compact && "p-3 sm:p-4")}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Tableau de bord</h3>
            <p className="text-[11px] text-muted-foreground">Ferme Al-Baraka · Meknès</p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "Total animaux", value: dashboardMetrics.totalAnimals, suffix: "" },
            { label: "En alerte", value: dashboardMetrics.alertAnimals, suffix: "", alert: true },
            { label: "Temp. moyenne", value: dashboardMetrics.avgTemperature, suffix: "°C" },
            { label: "Activité troupeau", value: dashboardMetrics.herdActivity, suffix: "%" },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border/40 bg-muted/20 p-2.5 text-center sm:p-3"
            >
              <p
                className={cn(
                  "font-heading text-xl font-bold sm:text-2xl",
                  metric.alert ? "text-amber-600" : "text-brand-green"
                )}
              >
                <AnimatedNumber value={metric.value} suffix={metric.suffix} />
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-[11px]">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          {[
            { label: "Température", bars: tempBars, color: "from-brand-amber to-brand-earth" },
            { label: "Activité", bars: activityBars, color: "from-brand-green to-brand-teal" },
          ].map((chart) => (
            <div
              key={chart.label}
              className="rounded-xl border border-border/40 bg-muted/10 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-medium">{chart.label}</span>
                <TrendingUp className="size-3 text-brand-green" />
              </div>
              <div className="flex h-14 items-end gap-0.5">
                {chart.bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className={cn("flex-1 rounded-sm bg-gradient-to-t", chart.color)}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border/40 bg-muted/10 p-3">
          <p className="mb-2 text-[11px] font-medium">Dernières alertes</p>
          <div className="space-y-1.5">
            {dashboardAlerts.map((alert, i) => (
              <motion.div
                key={alert.animal}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between rounded-lg bg-white/80 px-2.5 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={cn(
                      "size-3.5",
                      alert.severity === "critical" ? "text-red-500" : "text-amber-500"
                    )}
                  />
                  <div>
                    <p className="text-[11px] font-medium">
                      {alert.animal} — {alert.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={cn("text-[9px]", severityStyles[alert.severity])}
                >
                  {alert.severity === "critical" ? "Urgent" : "Attention"}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
