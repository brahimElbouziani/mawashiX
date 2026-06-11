import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { Container } from "@/components/shared/container";
import { SiteShell } from "@/components/layout/site-shell";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Conditions d'utilisation",
  description: "Conditions générales d'utilisation de la plateforme MawashiX.",
  path: "/legal/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <SiteShell mainClassName="pt-16 lg:pt-[4.5rem]">
      <Container className="py-14 lg:py-20">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Conditions" },
          ]}
          className="mb-8"
        />
        <h1 className="font-heading text-3xl font-bold">Conditions d&apos;utilisation</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Cette page sera mise à jour avec les conditions générales MawashiX.
          Contact : contact@mawashix.com
        </p>
      </Container>
    </SiteShell>
  );
}
