import {
  translator,
  localizedPath,
  languageAlternates,
  type Locale,
} from "@/lib/i18n";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NavigationSignal } from "@/components/navigation-signal";
import { Navbar, Footer } from "@/components/layout";
import { site } from "@/data/site";
import "@/app/globals.css";

const plexMono = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export function siteMetadata(locale: Locale): Metadata {
  const title =
    locale === "zh" ? "Mori — 作品集" : "Mori — Portfolio";
  const description =
    locale === "zh"
      ? "用 TypeScript、Go 和 Python 构建后端系统、开发者工具与 AI Agent。"
      : site.description;
  return {
    ...(site.url ? { metadataBase: new URL(site.url) } : {}),
    title: { default: title, template: "%s — Mori" },
    description,
    alternates: {
      canonical: localizedPath(locale),
      languages: languageAlternates(),
    },
    authors: [{ name: site.name, url: site.github }],
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      siteName: "Mori",
      title,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Mori / Forge / Kestri",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default function SiteShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const t = translator(locale);
  return (
    <html
      lang={locale === "zh" ? "zh-CN" : "en"}
      data-scroll-behavior="smooth"
      className={plexMono.variable}
    >
      <body>
        <a className="skip-link" href="#main-content">
          {t("Skip to content")}{" "}
        </a>
        <NavigationSignal>
          <Navbar locale={locale} />
          {children}
          <Footer locale={locale} />
        </NavigationSignal>
      </body>
    </html>
  );
}
