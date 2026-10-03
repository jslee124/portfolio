import { translator, localizedPath, type Locale } from "@/lib/i18n";
import { GitHubIcon } from "@/components/brand-icons";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { site } from "@/data/site";
import { Arrow, Mark } from "./icons";

export function Navbar({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  return (
    <header className="site-header">
      <nav className="container nav" aria-label={t("Main navigation")}>
        <Link
          className="brand"
          href={localizedPath(locale, "/#top")}
          aria-label={t("Mori home")}
        >
          <Mark />
          <span className="brand-name">mori<span className="brand-path">:~</span></span>
        </Link>
        <div className="nav-links">
          <LanguageSwitcher locale={locale} />
          <Link href={localizedPath(locale, "/#projects")}>
            {t("Projects")}
          </Link>
          <Link href={localizedPath(locale, "/#about")}>{t("About")}</Link>
          <Link href={localizedPath(locale, "/#skills")}>{t("Skills")}</Link>
          <a
            className="github-nav"
            href={site.github}
            aria-label={t("GitHub profile")}
          >
            <GitHubIcon />
            <span className="github-label">GitHub</span>
            <Arrow diagonal />
          </a>
        </div>
      </nav>
    </header>
  );
}

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  return (
    <footer className="container footer">
      <Link className="brand" href={localizedPath(locale)}>
        <Mark />
        <span className="brand-name">mori<span className="brand-path">:~</span></span>
      </Link>
      <p>{t("Built to inspect. Made to explore.")}</p>
      <a href={site.github}>
        <GitHubIcon /> {t("Source & projects")} <Arrow diagonal />
      </a>
    </footer>
  );
}
