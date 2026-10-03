import type { ReactNode } from "react";

export function ProjectScene({
  project,
  children,
}: {
  project: "forge" | "kestri";
  children: ReactNode;
}) {
  return (
    <section
      className={`project-section project-section-${project}`}
      aria-label={`${project === "forge" ? "Forge" : "Kestri"} project showcase`}
    >
      <div className="project-directory container">
        <span>~/projects/{project}</span>
        <span>
          {project === "forge"
            ? "Runtime engineering"
            : "Application engineering"}
        </span>
      </div>
      {children}
    </section>
  );
}
