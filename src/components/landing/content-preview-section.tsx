import { ArticleCard } from "@/components/content/article-card";
import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { getFeaturedContent } from "@/lib/content/loader";
import { ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";

export function ContentPreviewSection() {
  const blogPosts = getFeaturedContent("blog", 2);
  const newsItems = getFeaturedContent("news", 2);

  return (
    <section id="resources" className="bg-muted/30 py-24 lg:py-32">
      <Container>
        <ScrollReveal>
          <SectionHeader
            badge="Ressources"
            title="Blog et actualités MawashiX"
            description="Conseils pour les éleveurs, guides pratiques et dernières nouvelles de la plateforme."
          />
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold">Blog</h3>
              <Button variant="ghost" size="sm" render={<Link href="/blog" />}>
                Tout voir
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <ArticleCard key={post.slug} article={post} basePath="/blog" />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold">
                <Newspaper className="size-5 text-brand-blue" />
                Actualités
              </h3>
              <Button variant="ghost" size="sm" render={<Link href="/news" />}>
                Tout voir
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
            <div className="space-y-4">
              {newsItems.map((item) => (
                <ArticleCard key={item.slug} article={item} basePath="/news" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
