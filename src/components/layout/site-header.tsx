"use client";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import {
  contentNav,
  ctaLinks,
  homeSectionIds,
  primaryNav,
} from "@/config/navigation";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SiteHeaderProps = {
  variant?: "marketing" | "default";
};

function getSectionIdFromHref(href: string): string | null {
  const hash = href.includes("#") ? href.split("#")[1] : null;
  return hash ?? null;
}

function isRouteLink(href: string) {
  return href.startsWith("/") && !href.includes("#");
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2">
      <span
        className={cn(
          "font-heading font-bold tracking-tight text-foreground transition-colors group-hover:text-brand-green",
          compact ? "text-lg" : "text-xl"
        )}
      >
        Mawashi
        <span className="text-brand-green">X</span>
      </span>
    </Link>
  );
}

export function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const activeSection = useScrollSpy(homeSectionIds, {
    enabled: isHome,
    offset: 120,
  });

  const showTransparent = variant === "marketing" && isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const navItems = isHome
    ? primaryNav.map((item) => ({
        ...item,
        href: item.href.replace("/", ""),
      }))
    : primaryNav;

  const isLinkActive = (href: string) => {
    if (isRouteLink(href)) {
      return pathname === href || pathname.startsWith(`${href}/`);
    }
    if (isHome) {
      const sectionId = getSectionIdFromHref(href);
      return sectionId !== null && activeSection === sectionId;
    }
    return false;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <Container className="max-w-6xl px-0">
        <div
          className={cn(
            "flex h-14 items-center justify-between gap-3 rounded-2xl border px-3 transition-all duration-300 sm:h-[3.75rem] sm:px-4",
            showTransparent
              ? "border-transparent bg-transparent"
              : "border-border/50 bg-background/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
          )}
        >
          <Logo />

          {/* Desktop nav — pill group */}
          <nav
            className="hidden items-center lg:flex"
            aria-label="Navigation principale"
          >
            <div className="flex items-center gap-0.5 rounded-xl bg-muted/40 p-1">
              {navItems.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors xl:px-3.5",
                      active
                        ? "bg-white text-brand-green shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              size="sm"
              className="h-9 rounded-lg bg-brand-green px-4 text-white shadow-sm shadow-brand-green/20 hover:bg-brand-green/90"
              render={<Link href={ctaLinks.demo} />}
            >
              Demander une démo
              <ArrowRight data-icon="inline-end" className="size-3.5" />
            </Button>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted/60 lg:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fermer le menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-border/60 bg-background shadow-xl lg:hidden"
            >
              <nav className="flex flex-col p-2" aria-label="Navigation mobile">
                <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Menu
                </p>
                {navItems.map((link) => {
                    const active = isLinkActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-brand-green/10 text-brand-green"
                            : "text-foreground hover:bg-muted/60"
                        )}
                      >
                        {link.label}
                    </Link>
                  );
                })}

                <p className="mt-2 px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Ressources
                </p>
                {contentNav.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-brand-green/10 text-brand-green"
                          : "text-foreground hover:bg-muted/60"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <div className="mt-2 border-t border-border/60 p-2">
                  <Button
                    className="h-11 w-full rounded-xl bg-brand-green text-white hover:bg-brand-green/90"
                    render={<Link href={ctaLinks.demo} />}
                  >
                    Demander une démo
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
