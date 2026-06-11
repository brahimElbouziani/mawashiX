"use client";

import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green via-brand-green to-brand-teal px-6 py-14 text-center text-white sm:px-14 lg:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-brand-blue/20 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
                Commencez à connecter votre troupeau
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
                Testez MawashiX sur un petit groupe d&apos;animaux et découvrez comment
                les données peuvent aider votre élevage.
              </p>

              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  className="h-12 bg-white px-8 text-base text-brand-green hover:bg-white/90"
                  render={<Link href="#contact" />}
                >
                  Demander une démo
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </div>

              <p className="mt-6 text-sm text-white/60">
                {siteConfig.contact.email} · {siteConfig.contact.address}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
