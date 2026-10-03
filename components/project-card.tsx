import Link from "next/link";
import type { Project } from "@/data/projects";
import { Architecture } from "./architecture";
import { Arrow } from "./icons";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      className={`project-card ${project.featured ? "project-featured" : ""}`}
    >
      <div className="project-copy">
        <div className="project-eyebrow">
          <span>0{index + 1}</span>
          {project.category}
        </div>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          {project.featured && <span className="featured-label">Featured</span>}
        </h3>
        <p className="project-tagline">{project.tagline}</p>
        <p className="project-description">{project.description}</p>
        <ul
          className="technologies"
          aria-label={`${project.name} technologies`}
        >
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-actions">
          <Link className="text-link" href={`/projects/${project.slug}`}>
            Explore project <Arrow />
          </Link>
          <a
            className="subtle-link"
            href={project.github}
            aria-label={`${project.name} on GitHub`}
          >
            GitHub <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="project-visual">
        <Architecture project={project} compact />
      </div>
    </article>
  );
}
