import { ArticleBody } from "@/components/content/article-body";
import { ArticleCard } from "@/components/content/article-card";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import {
  getAllContentSlugs,
  getContentBySlug,
  getRelatedContent,
} from "@/lib/content/loader";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { createContentMetadata } from "@/lib/seo/metadata";
import { Calendar, Clock, User } from "lucide-react";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllContentSlugs("news").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getContentBySlug("news", slug);
  if (!article) return {};
  return createContentMetadata(article, "news");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-MA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getContentBySlug("news", slug);

  if (!article) notFound();

  const related = getRelatedContent("news", slug, 3);

  return (
    <>
      <JsonLdScript
        data={[
          articleJsonLd(article, "news"),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Actualités", path: "/news" },
            { name: article.title, path: `/news/${slug}` },
          ]),
        ]}
      />

      <Container className="py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Actualités", href: "/news" },
            { label: article.title },
          ]}
          className="mb-8"
        />

        <article className="mx-auto max-w-3xl">
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="bg-brand-blue/10 text-brand-blue">{article.category}</Badge>
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{article.description}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {article.readingTime} min de lecture
              </span>
            </div>
          </header>

          <ArticleBody content={article.content} />
        </article>

        {related.length > 0 && (
          <section className="mx-auto mt-20 max-w-5xl border-t border-border pt-14">
            <h2 className="mb-8 font-heading text-2xl font-bold">Autres actualités</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} basePath="/news" />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
