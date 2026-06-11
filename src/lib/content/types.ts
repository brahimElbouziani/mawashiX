export type ContentType = "blog" | "news";

export type ContentFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  draft?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    noIndex?: boolean;
  };
};

export type ContentItem = ContentFrontmatter & {
  slug: string;
  type: ContentType;
  readingTime: number;
  content: string;
};

export type ContentListItem = Omit<ContentItem, "content">;
