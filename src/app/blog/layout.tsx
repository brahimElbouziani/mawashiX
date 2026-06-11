import { SiteShell } from "@/components/layout/site-shell";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell mainClassName="pt-16 lg:pt-[4.5rem]">{children}</SiteShell>;
}
