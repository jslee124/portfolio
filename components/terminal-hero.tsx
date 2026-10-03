import { translator, type Locale } from "@/lib/i18n";
import { GitHubIcon } from "@/components/brand-icons";
import Link from "next/link";
import { site } from "@/data/site";
import { Arrow } from "./icons";
import { TerminalCommand } from "./terminal-command";
import { CharacterField } from "./character-field";

export function TerminalHero({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  return (
    <section className="signal-hero" aria-labelledby="hero-title">
      <div className="hero-readout container">
        <span>
          <i aria-hidden="true" /> {t("Mori / Developer portfolio")}{" "}
        </span>
        <span>{t("Backend / Agents / Tools")}</span>
      </div>
      <CharacterField />
      <div className="hero-brief container">
        <div>
          <h1 id="hero-title" className="hero-position">
            {t("Hi, I’m Mori.")} <br />
            {t("I build backend systems.")}{" "}
          </h1>
          <p className="hero-description">
            {t(
              "Computer Science student focused on AI agents and developer tools. Working with TypeScript, Go, and Python.",
            )}{" "}
          </p>
        </div>
        <div className="hero-invitation">
          <span className="hero-caption">
            {t("Explore my projects and the engineering behind them.")}{" "}
          </span>
          <div className="hero-actions">
            <Link className="button" href="#projects">
              {t("Explore my work")} <Arrow />
            </Link>
            <a className="text-link" href={site.github}>
              <GitHubIcon /> GitHub <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
      <div className="hero-command-dock container">
        <TerminalCommand locale={locale} />
      </div>
      <div className="hero-bottom container">
        <span>{t("My projects · About me · Technical skills")}</span>
        <Link href="#projects">
          {t("Scroll to inspect")} <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  );
}
