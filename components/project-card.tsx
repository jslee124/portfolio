import Link from "next/link";
import type { Project } from "@/data/projects";
import { SystemArtwork } from "./system-artwork";
import { Arrow } from "./icons";
import { ProjectScene } from "./project-scene";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <ProjectScene project={project.slug}>
      <article
        className={`project-showcase container showcase-${project.slug}`}
      >
        <div className="project-copy">
          <div className="project-identity">
            <p className="project-role">
              {project.slug === "forge"
                ? "01 / Agent runtime"
                : "02 / Personal application"}
            </p>
            <h3>
              <Link href={`/projects/${project.slug}`}>
                {project.name}
                <span className="project-title-dot" aria-hidden="true">
                  .
                </span>
              </Link>
            </h3>
            <ul
              className="technologies"
              aria-label={`${project.name} technologies`}
            >
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
          <div className="project-summary">
            <p className="project-tagline">{project.tagline}</p>
            <p className="project-description">{project.description}</p>
            <div className="project-actions">
              <Link className="project-open" href={`/projects/${project.slug}`}>
                Inside {project.name}
                <Arrow />
              </Link>
              <a
                className="subtle-link"
                href={project.github}
                aria-label={`${project.name} on GitHub`}
              >
                Source
                <Arrow diagonal />
              </a>
            </div>
          </div>
        </div>
        <div className="project-artifact">
          <SystemArtwork project={project.slug} />
        </div>
      </article>
    </ProjectScene>
  );
}
