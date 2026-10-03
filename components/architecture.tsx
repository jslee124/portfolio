import { translator, type Locale } from "@/lib/i18n";
import type { Project } from "@/data/projects";

export function Architecture({
  project,
  compact = false,
  locale = "en",
}: {
  project: Project;
  compact?: boolean;
  locale?: Locale;
}) {
  const t = translator(locale);
  const { architecture } = project;
  return (
    <figure
      className={`architecture ${project.slug} ${compact ? "architecture-compact" : ""}`}
      aria-label={`${project.name} ${t("Architecture")}`}
    >
      <div className="diagram-label">{t("System responsibilities")}</div>
      <div className="diagram-entry">{architecture.entry}</div>
      <div className="connector" aria-hidden="true">
        <span>↓</span>
      </div>
      <div className="diagram-core">
        <div className="core-heading">{architecture.core}</div>
        <ul className="module-grid">
          {architecture.modules.map((module) => (
            <li key={module}>
              <span aria-hidden="true">
                {project.slug === "forge" ? "⌘" : "+"}
              </span>
              {module}
            </li>
          ))}
        </ul>
      </div>
      <div className="connector" aria-hidden="true">
        <span>↓</span>
      </div>
      <div className="diagram-storage">
        <span aria-hidden="true">▤</span> {architecture.storage}
      </div>
      {!compact && <figcaption>{architecture.caption}</figcaption>}
    </figure>
  );
}
