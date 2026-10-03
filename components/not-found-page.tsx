import { translator, localizedPath, type Locale } from "@/lib/i18n";
import Link from "next/link";
export default function NotFound({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  return (
    <main id="main-content" tabIndex={-1} className="container not-found">
      <p className="eyebrow">{t("404 / PAGE NOT FOUND")}</p>
      <h1>{t("Nothing here. Yet.")}</h1>
      <p>{t("The page you’re looking for doesn’t exist.")}</p>
      <Link className="button" href={localizedPath(locale)}>
        {t("Back to home")} <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
