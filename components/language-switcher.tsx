"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { switchLanguagePath, type Locale } from "@/lib/locale-paths";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "zh" : "en";
  const href = switchLanguagePath(locale, pathname);

  function preserveLocation(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.href = switchLanguagePath(
      locale,
      pathname,
      window.location.search,
      window.location.hash,
    );
  }

  return (
    <div
      className="language-switcher"
      aria-label={locale === "zh" ? "语言切换" : "Language"}
    >
      <span lang={locale === "zh" ? "zh-CN" : "en"} aria-current="true">
        {locale === "zh" ? "中文" : "EN"}
      </span>
      <span aria-hidden="true">/</span>
      <a
        href={href}
        hrefLang={otherLocale === "zh" ? "zh-CN" : "en"}
        lang={otherLocale === "zh" ? "zh-CN" : "en"}
        aria-label={otherLocale === "zh" ? "切换到中文" : "Switch to English"}
        data-native-navigation
        onClick={preserveLocation}
        onAuxClick={preserveLocation}
      >
        {otherLocale === "zh" ? "中文" : "EN"}
      </a>
    </div>
  );
}
