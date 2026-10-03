import type { Metadata } from "next";
import localFont from "next/font/local";
import { NavigationSignal } from "@/components/navigation-signal";
import { Navbar, Footer } from "@/components/layout";
import { site } from "@/data/site";
import "./globals.css";

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

export const metadata: Metadata = {
  ...(site.url
    ? { metadataBase: new URL(site.url), alternates: { canonical: "/" } }
    : {}),
  title: { default: "Mori — Software Engineer", template: "%s — Mori" },
  description: site.description,
  authors: [{ name: site.name, url: site.github }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mori",
    title: "Mori — Software Engineer",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mori — Software Engineer",
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plexMono.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <NavigationSignal>
          <Navbar />
          {children}
          <Footer />
        </NavigationSignal>
      </body>
    </html>
  );
}
