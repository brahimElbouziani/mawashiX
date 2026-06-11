import { ArticleCard } from "@/components/content/article-card";
import { ContentListHeader } from "@/components/content/content-list-header";
import { Container } from "@/components/shared/container";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getAllContent } from "@/lib/content/loader";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { createListingMetadata } from "@/lib/seo/metadata";

export const metadata = createListingMetadata("news");

export default function NewsPage() {
  const articles = getAllContent("news");

  return (
    <>
      <JsonLdScript
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Actualités", path: "/news" },
        ])}
      />
      <ContentListHeader
        title="Actualités MawashiX"
        description="Lancements, partenariats et nouveautés produit. Suivez l'évolution de la plateforme au Maroc."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Actualités" },
        ]}
      />

      <Container className="py-14 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              basePath="/news"
              featured={article.featured}
            />
          ))}
        </div>
        {articles.length === 0 && (
          <p className="text-center text-muted-foreground">
            Aucune actualité pour le moment.
          </p>
        )}
      </Container>
    </>
  );
}
