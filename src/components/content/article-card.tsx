import { Badge } from "@/components/ui/badge";
import type { ContentListItem } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

type ArticleCardProps = {
  article: ContentListItem;
  basePath: "/blog" | "/news";
  featured?: boolean;
  className?: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-MA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function ArticleCard({
  article,
  basePath,
  featured = false,
  className,
}: ArticleCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col rounded-2xl border border-border/50 bg-white p-6 shadow-sm transition-all hover:border-brand-green/25 hover:shadow-md",
        featured && "border-brand-green/20 bg-gradient-to-br from-brand-green/[0.03] to-transparent",
        className
      )}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="bg-brand-green/10 text-brand-green">
          {article.category}
        </Badge>
        {article.featured && (
          <Badge className="bg-brand-amber/15 text-brand-earth">À la une</Badge>
        )}
      </div>

      <h2 className="font-heading text-xl font-semibold leading-snug tracking-tight group-hover:text-brand-green">
        <Link href={`${basePath}/${article.slug}`} className="outline-none">
          {article.title}
        </Link>
      </h2>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {article.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {article.readingTime} min
          </span>
        </div>
        <Link
          href={`${basePath}/${article.slug}`}
          className="flex items-center gap-1 font-medium text-brand-green transition-colors hover:text-brand-green/80"
        >
          Lire
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
