"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { ArrowRight, Check, Shield } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export function HeroContent() {
  const { hero, tagline } = siteConfig;
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="flex flex-col text-center lg:text-left">
      <motion.div {...fadeUp(0)}>
        <Badge className="mb-4 border border-brand-green/20 bg-brand-green/8 text-brand-green sm:mb-5">
          <Shield className="mr-1.5 size-3" />
          {tagline}
        </Badge>
      </motion.div>

      <motion.h1
        className="font-heading text-[1.75rem] font-bold leading-[1.12] tracking-tight min-[400px]:text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.25rem]"
        {...fadeUp(0.08)}
      >
        {hero.headline}{" "}
        <span className="bg-gradient-to-r from-brand-green to-brand-teal bg-clip-text text-transparent">
          {hero.headlineAccent}
        </span>
        .
      </motion.h1>

      <motion.p
        className="mt-4 text-base font-medium leading-snug text-foreground sm:mt-5 sm:text-lg md:text-xl"
        {...fadeUp(0.16)}
      >
        {hero.subheadline}
      </motion.p>

      <motion.p
        className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0 lg:max-w-lg"
        {...fadeUp(0.22)}
      >
        {hero.description}
      </motion.p>

      <motion.ul
        className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 lg:justify-start"
        {...fadeUp(0.28)}
      >
        {hero.highlights.map((item) => (
          <li
            key={item}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm"
          >
            <Check className="size-3.5 shrink-0 text-brand-green" aria-hidden />
            {item}
          </li>
        ))}
      </motion.ul>

      <motion.div
        className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
        {...fadeUp(0.34)}
      >
        <Button
          size="lg"
          className="h-11 w-full bg-brand-green text-base text-white hover:bg-brand-green/90 sm:h-12 sm:w-auto sm:px-7"
          render={<Link href="#contact" />}
        >
          Demander une démo
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-11 w-full text-base sm:h-12 sm:w-auto sm:px-7"
          render={<Link href="#how-it-works" />}
        >
          Voir comment ça marche
        </Button>
      </motion.div>
    </div>
  );
}
