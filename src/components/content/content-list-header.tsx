import { Breadcrumbs, type BreadcrumbItem } from "@/components/content/breadcrumbs";

type ContentListHeaderProps = {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
};

export function ContentListHeader({
  title,
  description,
  breadcrumbs,
}: ContentListHeaderProps) {
  return (
    <header className="border-b border-border/60 bg-muted/20 py-14 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
      </div>
    </header>
  );
}
