import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { Container } from "@/components/shared/container";
import { SiteShell } from "@/components/layout/site-shell";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données MawashiX.",
  path: "/legal/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <SiteShell mainClassName="pt-16 lg:pt-[4.5rem]">
      <Container className="py-14 lg:py-20">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Confidentialité" },
          ]}
          className="mb-8"
        />
        <h1 className="font-heading text-3xl font-bold">Politique de confidentialité</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Cette page sera mise à jour avec la politique complète de protection des
          données MawashiX. Contact : contact@mawashix.com
        </p>
      </Container>
    </SiteShell>
  );
}
