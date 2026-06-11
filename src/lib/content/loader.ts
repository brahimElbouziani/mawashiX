import type { ContentFrontmatter, ContentItem, ContentListItem, ContentType } from "@/lib/content/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function getContentDir(type: ContentType) {
  return path.join(CONTENT_ROOT, type);
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parseFile(filePath: string, type: ContentType): ContentItem | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as ContentFrontmatter;
  const slug = path.basename(filePath, path.extname(filePath));

  if (frontmatter.draft && process.env.NODE_ENV === "production") {
    return null;
  }

  return {
    ...frontmatter,
    slug,
    type,
    content,
    readingTime: estimateReadingTime(content),
  };
}

export function getAllContent(type: ContentType): ContentListItem[] {
  const dir = getContentDir(type);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parseFile(path.join(dir, file), type))
    .filter((item): item is ContentItem => item !== null)
    .map(({ content: _content, ...rest }) => rest)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getContentBySlug(
  type: ContentType,
  slug: string
): ContentItem | null {
  const filePath = path.join(getContentDir(type), `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  return parseFile(filePath, type);
}

export function getAllContentSlugs(type: ContentType): string[] {
  return getAllContent(type).map((item) => item.slug);
}

export function getFeaturedContent(type: ContentType, limit = 3): ContentListItem[] {
  const featured = getAllContent(type).filter((item) => item.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return getAllContent(type).slice(0, limit);
}

export function getRelatedContent(
  type: ContentType,
  currentSlug: string,
  limit = 3
): ContentListItem[] {
  const current = getContentBySlug(type, currentSlug);
  if (!current) return getAllContent(type).filter((i) => i.slug !== currentSlug).slice(0, limit);

  return getAllContent(type)
    .filter((item) => item.slug !== currentSlug)
    .sort((a, b) => {
      const aScore =
        (a.category === current.category ? 2 : 0) +
        a.tags.filter((t) => current.tags.includes(t)).length;
      const bScore =
        (b.category === current.category ? 2 : 0) +
        b.tags.filter((t) => current.tags.includes(t)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}
