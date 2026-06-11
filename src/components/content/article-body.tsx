import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ArticleBodyProps = {
  content: string;
  className?: string;
};

export function ArticleBody({ content, className }: ArticleBodyProps) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none",
        "prose-headings:font-heading prose-headings:tracking-tight",
        "prose-a:text-brand-green prose-a:no-underline hover:prose-a:underline",
        "prose-blockquote:border-brand-green prose-blockquote:text-muted-foreground",
        "prose-strong:text-foreground",
        "prose-table:text-sm",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
