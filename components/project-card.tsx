import { GitHubIcon, TechnologyIcon } from "@/components/brand-icons";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { SystemArtwork } from "./system-artwork";
import { Arrow, ProjectSymbol } from "./icons";
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
                ? "Project 01 / Built by me"
                : "Project 02 / Built by me"}
            </p>
            <div className="project-masthead">
              <ProjectSymbol project={project.slug} />
              <div className="project-name">
                <h3>
                  <Link href={`/projects/${project.slug}`}>
                    {project.name}
                    <span className="project-title-dot" aria-hidden="true">
                      .
                    </span>
                  </Link>
                </h3>
                <p className="project-kind">
                  {project.slug === "forge"
                    ? "Coding agent & developer tools"
                    : "Personal AI assistant"}
                </p>
              </div>
            </div>
            <ul
              className="technologies"
              aria-label={`${project.name} technologies`}
            >
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <TechnologyIcon name={technology} />
                  <span>{technology}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="project-summary">
            <p className="project-tagline">{project.tagline}</p>
            <p className="project-description">{project.description}</p>
            <div className="project-actions">
              <Link className="project-open" href={`/projects/${project.slug}`}>
                Read the case study
                <Arrow />
              </Link>
              <a
                className="subtle-link"
                href={project.github}
                aria-label={`${project.name} on GitHub`}
              >
                <GitHubIcon /> View source
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
