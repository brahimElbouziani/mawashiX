"use client";

import { HeroContent } from "@/components/landing/hero-content";
import { HeroVisual } from "@/components/landing/hero-visual";
import { Container } from "@/components/shared/container";

export function AnimatedHero() {
  return (
    <section
      id="hero"
      className="relative overflow-x-clip pb-10 pt-[5.5rem] sm:pb-16 sm:pt-28 md:pb-20 md:pt-32 lg:pb-24 lg:pt-36"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 right-0 size-[min(100vw,560px)] rounded-full bg-brand-green/[0.07] blur-2xl sm:-top-32 sm:blur-3xl sm:size-[700px]" />
        <div className="absolute bottom-0 -left-24 size-[min(90vw,420px)] rounded-full bg-brand-blue/[0.06] blur-2xl sm:-left-32 sm:blur-3xl sm:size-[500px]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 xl:gap-14">
          <HeroContent />
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
