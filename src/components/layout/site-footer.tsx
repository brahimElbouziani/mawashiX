import { Container } from "@/components/shared/container";
import { Separator } from "@/components/ui/separator";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-block font-heading text-xl font-bold tracking-tight">
              Mawashi<span className="text-brand-green">X</span>
            </Link>
            <p className="max-w-md text-sm font-medium text-brand-green">
              {siteConfig.tagline}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Navigation</h3>
            <ul className="space-y-2.5">
              {footerNav.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 shrink-0 text-brand-green" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-brand-green" />
                {siteConfig.contact.address}
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {currentYear} {siteConfig.name}. Tous droits réservés.
          </p>
          <div className="flex gap-5">
            {footerNav.company.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
