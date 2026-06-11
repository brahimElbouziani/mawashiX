import { ArticleCard } from "@/components/content/article-card";
import { ContentListHeader } from "@/components/content/content-list-header";
import { Container } from "@/components/shared/container";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getAllContent } from "@/lib/content/loader";
import { blogListingJsonLd } from "@/lib/seo/json-ld";
import { createListingMetadata } from "@/lib/seo/metadata";

export const metadata = createListingMetadata("blog");

export default function BlogPage() {
  const posts = getAllContent("blog");
  const featured = posts.filter((p) => p.featured);
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const rest = posts.filter((p) => !featuredSlugs.has(p.slug));

  return (
    <>
      <JsonLdScript data={blogListingJsonLd(posts)} />
      <ContentListHeader
        title="Blog MawashiX"
        description="Guides pratiques, conseils d'élevage et articles AgriTech pour les éleveurs marocains. Simple, clair, utile sur le terrain."
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Blog" },
        ]}
      />

      <Container className="py-14 lg:py-20">
        {featured.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 font-heading text-sm font-semibold tracking-wide text-brand-green uppercase">
              Articles à la une
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {featured.map((post) => (
                <ArticleCard
                  key={post.slug}
                  article={post}
                  basePath="/blog"
                  featured
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-6 font-heading text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Tous les articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <ArticleCard key={post.slug} article={post} basePath="/blog" />
            ))}
          </div>
          {posts.length === 0 && (
            <p className="text-center text-muted-foreground">
              Aucun article pour le moment. Revenez bientôt.
            </p>
          )}
        </section>
      </Container>
    </>
  );
}
