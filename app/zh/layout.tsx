import SiteShell, { siteMetadata } from "@/components/site-shell";

export const metadata = siteMetadata("zh");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="zh">{children}</SiteShell>;
}
