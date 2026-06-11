import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothMain } from "@/components/shared/smooth-main";

type SiteShellProps = {
  children: React.ReactNode;
  headerVariant?: "marketing" | "default";
  mainClassName?: string;
};

export function SiteShell({
  children,
  headerVariant = "default",
  mainClassName,
}: SiteShellProps) {
  return (
    <>
      <SiteHeader variant={headerVariant} />
      <SmoothMain className={mainClassName}>{children}</SmoothMain>
      <SiteFooter />
    </>
  );
}
