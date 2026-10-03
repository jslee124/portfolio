import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar, Footer } from "@/components/layout";
import { site } from "@/data/site";
import "./globals.css";

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
