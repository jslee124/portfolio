import Link from "next/link";
import { projects } from "@/data/projects";
import { site, technologies } from "@/data/site";
import { Arrow } from "@/components/icons";
import { SectionHeading } from "@/components/layout";
import { ProjectCard } from "@/components/project-card";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="container">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-eyebrow">
          <span className="status-dot" /> MORI — SOFTWARE ENGINEER
        </div>
        <h1 id="hero-title">
          Building the systems
          <br />
          behind <span>the interface.</span>
        </h1>
        <p className="hero-subtitle">
          Backend engineering. AI agents. Developer tools.
        </p>
        <p className="hero-description">
          I build backend systems and AI-powered tools with TypeScript, Go, and
          Python. Focused on how things work, and what makes them reliable.
        </p>
        <div className="hero-actions">
          <Link className="button" href="#projects">
            View my work <Arrow />
          </Link>
          <a className="text-link" href={site.github}>
            GitHub <Arrow diagonal />
          </a>
        </div>
        <div className="hero-bottom">
          <span>Computer Science student</span>
          <span className="hero-coordinate">
            RUNTIME → APPLICATION → SYSTEM
          </span>
        </div>
      </section>

      <section
        id="projects"
        className="work-section"
        aria-labelledby="work-title"
      >
        <div className="section-top">
          <SectionHeading number="01" id="work-title">
            Selected work
          </SectionHeading>
          <span className="section-note">
            Two projects. Two layers of agent engineering.
          </span>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section
        id="about"
        className="about-section"
        aria-labelledby="about-title"
      >
        <SectionHeading number="02">About</SectionHeading>
        <div className="about-content">
          <h2 id="about-title">
            Interested in what happens
            <br />
            <span>below the surface.</span>
          </h2>
          <div className="about-prose">
            <p>
              I’m a Computer Science student focused on backend engineering, AI
              agents, and developer tools.
            </p>
            <p>
              I enjoy understanding the systems behind a product: runtime
              architecture, APIs, persistence, tooling, infrastructure, and the
              tradeoffs involved in building reliable software.
            </p>
            <p>
              My projects explore both sides of agent engineering—from an
              inspectable runtime to an application that remembers and follows
              through.
            </p>
          </div>
        </div>
      </section>

      <section className="stack-section" aria-label="Tech stack">
        <SectionHeading number="03">Tech stack</SectionHeading>
        <div className="stack-grid">
          {technologies.map(({ category, items }) => (
            <div className="stack-category" key={category}>
              <h3>{category}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <SectionHeading number="04">Contact</SectionHeading>
        <div className="contact-content">
          <div>
            <h2 id="contact-title">Let’s build something.</h2>
            <p>
              Have a project, an opportunity, or a good engineering question?
            </p>
          </div>
          <div className="contact-links">
            <a className="text-link" href={site.github}>
              Find me on GitHub <Arrow diagonal />
            </a>
            {site.email && (
              <a className="text-link" href={`mailto:${site.email}`}>
                Email <Arrow diagonal />
              </a>
            )}
            {site.linkedin && (
              <a className="text-link" href={site.linkedin}>
                LinkedIn <Arrow diagonal />
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
