import {
  translator,
  localizedPath,
  languageAlternates,
  type Locale,
} from "@/lib/i18n";
import { GitHubIcon, TechnologyIcon } from "@/components/brand-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "@/data/localized-projects";

import { Architecture } from "@/components/architecture";
import { Arrow, ProjectSymbol } from "@/components/icons";
import { ForgeFlow, KestriTimeline } from "@/components/project-visuals";

export function projectMetadata(slug: string, locale: Locale): Metadata {
  const project = getProjects(locale).find((item) => item.slug === slug);
  if (!project) return {};
  const path = `/projects/${slug}`;
  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: localizedPath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: `${project.name} — Mori`,
      description: project.description,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      url: localizedPath(locale, path),
    },
  };
}

export default function ProjectPage({
  slug,
  locale = "en",
}: {
  slug: string;
  locale?: Locale;
}) {
  const t = translator(locale);
  const projects = getProjects(locale);
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const nextProject = projects.find((item) => item.slug !== slug)!;

  return (
    <main id="main-content" tabIndex={-1} className="container case-study">
      <Link href={localizedPath(locale, "/#projects")} className="back-link">
        <span aria-hidden="true">←</span> {t("Selected work")}{" "}
      </Link>
      <header className="case-header">
        <div>
          <ProjectSymbol project={project.slug} />
          <div className="eyebrow">{project.category}</div>
          <h1>{project.name}</h1>
          <p className="case-tagline">{project.tagline}</p>
          <ul className="technologies">
            {project.technologies.map((technology) => (
              <li key={technology}>
                <TechnologyIcon name={technology} />
                <span>{technology}</span>
              </li>
            ))}
          </ul>
          <a className="button" href={project.github}>
            <GitHubIcon /> {t("View source on GitHub")} <Arrow diagonal />
          </a>
        </div>
        <div className="case-header-artifact">
          {project.slug === "forge" ? (
            <ForgeFlow locale={locale} />
          ) : (
            <KestriTimeline locale={locale} />
          )}
        </div>
      </header>
      <div className="case-layout">
        <aside className="case-sidebar">
          <nav aria-label={t("Case study sections")}>
            <p className="eyebrow">{t("In this case study")}</p>
            <a href="#overview">{t("Overview")}</a>
            <a href="#why">{t("Why I built it")}</a>
            <a href="#architecture">{t("Architecture")}</a>
            {project.sections.map((section, index) => (
              <a href={`#detail-${index}`} key={section.title}>
                {section.title}
              </a>
            ))}
            <a href="#decisions">{t("Engineering decisions")}</a>
            <a href="#learning">{t("What I learned")}</a>
          </nav>
        </aside>
        <div className="case-content">
          <section id="overview">
            <h2>{t("Overview")}</h2>
            <p>{project.overview}</p>
          </section>
          <section id="why">
            <h2>{t("Why I built it")}</h2>
            <p>{project.motivation}</p>
          </section>
          <section id="architecture">
            <h2>{t("Architecture")}</h2>
            <Architecture project={project} locale={locale} />
          </section>
          {project.sections.map((section, index) => (
            <section id={`detail-${index}`} key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <section id="decisions">
            <h2>{t("Engineering decisions")}</h2>
            <ol className="decisions">
              {project.decisions.map((decision, index) => (
                <li key={decision.title}>
                  <span className="decision-number">0{index + 1}</span>
                  <div>
                    <h3>{decision.title}</h3>
                    <p>{decision.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section id="learning">
            <h2>{t("What I learned")}</h2>
            <p>{project.learning}</p>
          </section>
          <section className="source-section">
            <h2>{t("Further reading")}</h2>
            <p>
              {t(
                "The project documentation goes deeper into implementation and boundaries.",
              )}{" "}
            </p>
            <div className="source-links">
              {project.sources.map((source) => (
                <a href={source.url} key={source.url}>
                  {source.label} <Arrow diagonal />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Link
        href={localizedPath(locale, `/projects/${nextProject.slug}`)}
        className="next-project"
      >
        <div>
          <span className="eyebrow">{t("Next project")}</span>
          <h2>{nextProject.name}</h2>
          <p>{nextProject.category}</p>
        </div>
        <Arrow />
      </Link>
    </main>
  );
}
