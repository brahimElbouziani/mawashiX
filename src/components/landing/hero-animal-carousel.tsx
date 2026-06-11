"use client";

import {
  EarSensorIndicator,
  SensorConnectBadge,
  type SensorPosition,
} from "@/components/landing/ear-sensor-indicator";
import { HealthSurveillanceChips, HealthSurveillancePanel } from "@/components/landing/health-surveillance";
import { Badge } from "@/components/ui/badge";
import {
  camelHealthChips,
  cowHealthChips,
  sheepHealthChips,
  type HealthChip,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const ROTATE_MS = 6000;
const SWIPE_THRESHOLD = 36;
const SWIPE_VELOCITY = 180;

const SLIDE_EASE = [0.32, 0.72, 0, 1] as const;

type AnimalFit = "height" | "width";

type AnimalSlide = {
  id: string;
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  fit: AnimalFit;
  sizeFactor: number;
  align: "end" | "center";
  sensor: SensorPosition;
  healthChips: HealthChip[];
  badgeOffset?: "outward-left" | "outward-right";
  /** Connecté badge outside the animal image (e.g. camel face) */
  detachedConnectBadge?: boolean;
  showSensorOnEar?: boolean;
};

const animals: AnimalSlide[] = [
  {
    id: "cow",
    label: "Vache Holstein",
    src: "/mawashix_cow-sm.png",
    alt: "Vache Holstein avec capteur MawashiX connecté sur l'oreille",
    width: 360,
    height: 615,
    fit: "height",
    sizeFactor: 0.92,
    align: "end",
    sensor: { x: 84, y: 17.8, side: "right" },
    healthChips: cowHealthChips,
  },
  {
    id: "sheep",
    label: "Mouton Timahdit",
    src: "/mawashix_sheep-sm.png",
    alt: "Mouton Timahdit avec capteur MawashiX connecté sur l'oreille",
    width: 626,
    height: 580,
    fit: "height",
    sizeFactor: 0.92,
    align: "end",
    sensor: { x: 63.8, y: 18.4, side: "left" },
    healthChips: sheepHealthChips,
  },
  {
    id: "camel",
    label: "Dromadaire saharien",
    src: "/mawashix_camel-sm.webp",
    alt: "Dromadaire saharien avec capteur MawashiX connecté sur l'oreille",
    width: 596,
    height: 580,
    fit: "height",
    sizeFactor: 0.92,
    align: "end",
    // Face left — capteur jaune sur l’oreille, badge Connecté vers la droite (corps)
    sensor: { x: 17.2, y: 13.8, side: "right" },
    healthChips: camelHealthChips,
    badgeOffset: "outward-right",
  },
];

function SignalRings({ sensor }: { sensor: SensorPosition }) {
  return (
    <div
      className="absolute z-0 hidden size-0 -translate-x-1/2 -translate-y-1/2 sm:block"
      style={{ left: `${sensor.x}%`, top: `${sensor.y}%` }}
    >
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-green/25"
          style={{ width: 50 + ring * 40, height: 50 + ring * 40 }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.08, 0.4] }}
          transition={{ duration: 2.2, delay: ring * 0.4, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function AnimalSlideContent({
  animal,
  priority,
}: {
  animal: AnimalSlide;
  priority?: boolean;
}) {
  const isHeightFit = animal.fit === "height";

  return (
    <div
      className={cn(
        "flex h-full w-full justify-center",
        animal.align === "end" ? "items-end" : "items-center"
      )}
    >
      <div
        className={cn(
          "relative bg-muted/10",
          isHeightFit ? "h-full w-auto max-w-full" : "h-auto w-full max-h-full"
        )}
        style={{
          aspectRatio: `${animal.width} / ${animal.height}`,
          ...(isHeightFit
            ? { height: `${animal.sizeFactor * 100}%` }
            : { width: `${animal.sizeFactor * 100}%` }),
        }}
      >
        <Image
          src={animal.src}
          alt={animal.alt}
          fill
          priority={priority}
          className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.1)]"
          sizes="(max-width: 640px) 280px, 320px"
          draggable={false}
        />
        <SignalRings sensor={animal.sensor} />
        <EarSensorIndicator
          position={animal.sensor}
          compact
          badgeOffset={animal.badgeOffset}
          showSensorOnEar={animal.showSensorOnEar}
          hideConnectBadge={animal.detachedConnectBadge}
        />
      </div>
    </div>
  );
}

function CarouselSlide({
  animal,
  index,
  slideWidth,
  trackX,
  priority,
}: {
  animal: AnimalSlide;
  index: number;
  slideWidth: number;
  trackX: ReturnType<typeof useMotionValue<number>>;
  priority?: boolean;
}) {
  const opacity = useTransform(trackX, (x) => {
    if (!slideWidth) return index === 0 ? 1 : 0.4;
    const progress = -x / slideWidth;
    const distance = Math.abs(progress - index);
    return Math.max(0.15, 1 - distance * 0.85);
  });

  const scale = useTransform(trackX, (x) => {
    if (!slideWidth) return 1;
    const progress = -x / slideWidth;
    const distance = Math.abs(progress - index);
    return 1 - Math.min(distance, 1) * 0.045;
  });

  return (
    <motion.div
      className="relative h-full shrink-0 will-change-transform"
      style={{ width: slideWidth || "100%", opacity, scale }}
    >
      <AnimalSlideContent animal={animal} priority={priority} />
    </motion.div>
  );
}

export function HeroAnimalCarousel() {
  const [active, setActive] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(0);
  const isDraggingRef = useRef(false);
  const skipSlideEffectRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(viewportRef, { margin: "-10% 0px" });

  const trackX = useMotionValue(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const getSlideWidth = useCallback(
    () => viewportRef.current?.offsetWidth ?? slideWidth,
    [slideWidth]
  );

  const animateToSlide = useCallback(
    (index: number, options?: { instant?: boolean; velocity?: number }) => {
      const w = getSlideWidth();
      if (!w) return;
      const target = -index * w;

      if (options?.instant) {
        trackX.set(target);
        return;
      }

      if (options?.velocity && Math.abs(options.velocity) > 40) {
        animate(trackX, target, {
          type: "spring",
          stiffness: 190,
          damping: 32,
          mass: 1,
          velocity: options.velocity,
        });
        return;
      }

      animate(trackX, target, {
        type: "tween",
        duration: 0.62,
        ease: SLIDE_EASE,
      });
    },
    [getSlideWidth, trackX]
  );

  const scheduleRotate = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % animals.length);
    }, ROTATE_MS);
  }, []);

  const selectAnimal = useCallback(
    (index: number) => {
      setActive(((index % animals.length) + animals.length) % animals.length);
      scheduleRotate();
    },
    [scheduleRotate]
  );

  useEffect(() => {
    if (reduceMotion || !isInView) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    scheduleRotate();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [scheduleRotate, reduceMotion, isInView]);

  useEffect(() => {
    if (skipSlideEffectRef.current) {
      skipSlideEffectRef.current = false;
      return;
    }
    if (isDraggingRef.current) return;
    animateToSlide(active);
  }, [active, animateToSlide]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.offsetWidth;
      setSlideWidth(w);
      trackX.set(-activeRef.current * w);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [trackX]);

  const handleDragEnd = useCallback(
    (_: PointerEvent, info: PanInfo) => {
      isDraggingRef.current = false;
      const w = getSlideWidth();
      if (!w) return;

      const goNext =
        info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY;
      const goPrev =
        info.offset.x > SWIPE_THRESHOLD || info.velocity.x > SWIPE_VELOCITY;

      let next = active;
      if (goNext) {
        next = (active + 1) % animals.length;
      } else if (goPrev) {
        next = (active - 1 + animals.length) % animals.length;
      }

      animateToSlide(next, { velocity: info.velocity.x });

      if (next !== active) {
        skipSlideEffectRef.current = true;
        selectAnimal(next);
      }
    },
    [active, animateToSlide, getSlideWidth, selectAnimal]
  );

  const current = animals[active];

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,380px)] sm:max-w-[400px]">
      <motion.div
        className="relative z-10 px-4 min-[400px]:px-6 sm:px-12"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          <div
            ref={viewportRef}
            className="relative mx-auto aspect-square w-[min(86vw,280px)] overflow-hidden min-[400px]:w-[min(82vw,280px)] sm:w-[min(68vw,300px)]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Animaux surveillés — glissez pour changer"
          >
            <div className="pointer-events-none absolute bottom-[5%] left-1/2 z-0 h-4 w-[72%] -translate-x-1/2 rounded-[100%] bg-brand-green/12 blur-md sm:blur-lg" />

            <motion.div
              className="flex h-full cursor-grab touch-pan-x overscroll-x-contain active:cursor-grabbing"
              style={{
                x: trackX,
                width: slideWidth ? slideWidth * animals.length : "100%",
              }}
              drag="x"
              dragConstraints={{
                left: slideWidth ? -(animals.length - 1) * slideWidth : 0,
                right: 0,
              }}
              dragElastic={0.14}
              dragTransition={{ power: 0.25, timeConstant: 260 }}
              dragMomentum={false}
              onDragStart={() => {
                isDraggingRef.current = true;
              }}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: "grabbing" }}
            >
              {animals.map((animal, index) => (
                <CarouselSlide
                  key={animal.id}
                  animal={animal}
                  index={index}
                  slideWidth={slideWidth}
                  trackX={trackX}
                  priority
                />
              ))}
            </motion.div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`label-${current.id}`}
                className="pointer-events-none absolute bottom-1 left-1/2 z-20 -translate-x-1/2 sm:bottom-2"
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: SLIDE_EASE }}
              >
                <Badge className="border-brand-green/20 bg-white/90 text-[10px] text-brand-green shadow-sm backdrop-blur-sm sm:text-xs">
                  {current.label}
                </Badge>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {current.detachedConnectBadge && (
              <motion.div
                key={`connect-${current.id}`}
                className="pointer-events-none absolute -top-1 right-0 z-30 sm:-top-0.5 sm:right-1"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: SLIDE_EASE }}
              >
                <SensorConnectBadge compact />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={`chips-float-${current.id}`}
              className="pointer-events-none absolute inset-0 hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: SLIDE_EASE }}
            >
              <HealthSurveillanceChips
                chips={current.healthChips}
                variant="float"
                animalId={current.id}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="mt-4 flex justify-center gap-2 px-4 min-[400px]:px-6 sm:px-12">
        {animals.map((animal, index) => (
          <button
            key={animal.id}
            type="button"
            onClick={() => selectAnimal(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-700 ease-out",
              active === index
                ? "w-6 bg-brand-green"
                : "w-1.5 bg-brand-green/25 hover:bg-brand-green/40"
            )}
            aria-label={`Afficher ${animal.label}`}
            aria-current={active === index ? "true" : undefined}
          />
        ))}
      </div>

      <div className="mt-3 px-4 min-[400px]:px-6 sm:mx-auto sm:px-12 md:hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`chips-mobile-${current.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HealthSurveillanceChips chips={current.healthChips} variant="grid" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 w-full px-4 min-[400px]:px-6 sm:mx-auto sm:px-12">
        <HealthSurveillancePanel chips={current.healthChips} animalId={current.id} />
      </div>
    </div>
  );
}
