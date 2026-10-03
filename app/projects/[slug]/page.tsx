import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { Architecture } from "@/components/architecture";
import { Arrow, ProjectSymbol } from "@/components/icons";
import { ForgeFlow, KestriTimeline } from "@/components/project-visuals";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    ...(site.url ? { alternates: { canonical: `/projects/${slug}` } } : {}),
    openGraph: {
      title: `${project.name} — Mori`,
      description: project.description,
      url: `/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const nextProject = projects.find((item) => item.slug !== slug)!;

  return (
    <main id="main-content" tabIndex={-1} className="container case-study">
      <Link href="/#projects" className="back-link">
        <span aria-hidden="true">←</span> Selected work
      </Link>
      <header className="case-header">
        <div>
          <ProjectSymbol project={project.slug} />
          <div className="eyebrow">{project.category}</div>
          <h1>{project.name}</h1>
          <p className="case-tagline">{project.tagline}</p>
          <ul className="technologies">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <a className="button" href={project.github}>
            View source on GitHub <Arrow diagonal />
          </a>
        </div>
        <div className="case-header-artifact">
          {project.slug === "forge" ? <ForgeFlow /> : <KestriTimeline />}
        </div>
      </header>
      <div className="case-layout">
        <aside className="case-sidebar">
          <nav aria-label="Case study sections">
            <p className="eyebrow">In this case study</p>
            <a href="#overview">Overview</a>
            <a href="#why">Why I built it</a>
            <a href="#architecture">Architecture</a>
            {project.sections.map((section, index) => (
              <a href={`#detail-${index}`} key={section.title}>
                {section.title}
              </a>
            ))}
            <a href="#decisions">Engineering decisions</a>
            <a href="#learning">What I learned</a>
          </nav>
        </aside>
        <div className="case-content">
          <section id="overview">
            <h2>Overview</h2>
            <p>{project.overview}</p>
          </section>
          <section id="why">
            <h2>Why I built it</h2>
            <p>{project.motivation}</p>
          </section>
          <section id="architecture">
            <h2>Architecture</h2>
            <Architecture project={project} />
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
            <h2>Engineering decisions</h2>
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
            <h2>What I learned</h2>
            <p>{project.learning}</p>
          </section>
          <section className="source-section">
            <h2>Further reading</h2>
            <p>
              The project documentation goes deeper into implementation and
              boundaries.
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
      <Link href={`/projects/${nextProject.slug}`} className="next-project">
        <div>
          <span className="eyebrow">Next project</span>
          <h2>{nextProject.name}</h2>
          <p>{nextProject.category}</p>
        </div>
        <Arrow />
      </Link>
    </main>
  );
}
