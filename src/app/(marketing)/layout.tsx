import { SiteShell } from "@/components/layout/site-shell";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell headerVariant="marketing">{children}</SiteShell>;
}
