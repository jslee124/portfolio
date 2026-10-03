import type { Project } from "@/data/projects";

export function Architecture({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const { architecture } = project;
  return (
    <figure
      className={`architecture ${project.slug} ${compact ? "architecture-compact" : ""}`}
      aria-label={`${project.name} architecture`}
    >
      <div className="diagram-label">
        <span className="status-dot" /> SYSTEM OVERVIEW{" "}
        <span aria-hidden="true">↗</span>
      </div>
      <div className="diagram-entry">{architecture.entry}</div>
      <div className="connector" aria-hidden="true">
        <span>↓</span>
      </div>
      <div className="diagram-core">
        <div className="core-heading">
          <span className="core-symbol" aria-hidden="true">
            {project.slug === "forge" ? "ƒ" : "k"}
          </span>
          {architecture.core}
        </div>
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
