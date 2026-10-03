import translations from "@/data/zh.json";

import type { Locale } from "./locale-paths";
export { localizedPath, languageAlternates, type Locale } from "./locale-paths";

const chinese: Record<string, string> = translations;

/** Untranslated brand names, commands, and technical identifiers stay in English. */
export function translator(locale: Locale) {
  return (text: string) => (locale === "zh" ? (chinese[text] ?? text) : text);
}
