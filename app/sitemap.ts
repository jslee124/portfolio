import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { languageAlternates, localizedPath, type Locale } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const origin = site.url;
  const paths = ["/", ...projects.map(({ slug }) => `/projects/${slug}`)];
  return paths.flatMap((path) =>
    (["en", "zh"] as Locale[]).map((locale) => ({
      url: `${origin}${localizedPath(locale, path)}`,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([lang, url]) => [
            lang,
            `${origin}${url}`,
          ]),
        ),
      },
    })),
  );
}
