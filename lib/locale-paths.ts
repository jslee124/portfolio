export type Locale = "en" | "zh";

export function localizedPath(locale: Locale, path = "/") {
  return locale === "zh" ? `/zh${path === "/" ? "" : path}` : path;
}

export function switchLanguagePath(
  locale: Locale,
  pathname: string,
  search = "",
  hash = "",
) {
  const basePath = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  return `${localizedPath(locale === "en" ? "zh" : "en", basePath)}${search}${hash}`;
}

export function languageAlternates(path = "/") {
  return {
    en: localizedPath("en", path),
    "zh-CN": localizedPath("zh", path),
    "x-default": localizedPath("en", path),
  };
}
