import { GitHubIcon, TechnologyIcon } from "@/components/brand-icons";
import { projects } from "@/data/projects";
import { site, technologies } from "@/data/site";
import { Arrow } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { HomeMotion } from "@/components/home-motion";
import { TerminalHero } from "@/components/terminal-hero";

export default function Home() {
  return (
    <HomeMotion>
      <main id="main-content" tabIndex={-1}>
        <TerminalHero />

        <section
          id="projects"
          tabIndex={-1}
          className="work-section"
          aria-labelledby="work-title"
        >
          <div className="section-heading container work-directory">
            <p className="section-eyebrow">01 / What I build</p>
            <h2 id="work-title">My projects</h2>
            <p className="section-description">
              Two projects I’m building to explore AI agent engineering — from
              the runtime that executes tools to the application that supports
              everyday work.
            </p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section
          id="about"
          tabIndex={-1}
          className="about-section container"
          aria-labelledby="about-title"
        >
          <div className="about-intro">
            <p className="section-eyebrow">02 / Behind the projects</p>
            <h2 id="about-title">About me</h2>
            <p>
              Follow the request.
              <br />
              Understand the state.
              <br />
              Build for the failure.
            </p>
          </div>
          <div className="about-prose">
            <p>
              I’m focused on backend engineering, AI agents, and developer
              tools. I like following a system below the interface: how a
              request moves, where state lives, and what happens when something
              fails.
            </p>
            <p>
              Forge is where I explore agent runtime engineering. Kestri is
              where I explore what it takes to turn an agent into a useful
              personal application.
            </p>
            <p>
              Different projects, different responsibilities. Both give me a
              reason to understand the tradeoffs.
            </p>
          </div>
        </section>

        <section
          id="skills"
          tabIndex={-1}
          className="stack-section container"
          aria-labelledby="stack-title"
        >
          <div className="section-heading skills-heading">
            <p className="section-eyebrow">03 / My toolkit</p>
            <h2 id="stack-title">Technical skills</h2>
            <p className="section-description">
              Languages, frameworks, and tools I work with across my projects.
            </p>
          </div>
          <div className="stack-grid">
            {technologies.map(({ category, items }) => (
              <div className="stack-category" key={category}>
                <h3>{category}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>
                      <TechnologyIcon name={item} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          tabIndex={-1}
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="container contact-content">
            <div>
              <p className="section-eyebrow">04 / Get in touch</p>
              <h2 id="contact-title">
                Have a good
                <br />
                problem
                <span className="contact-cursor" aria-hidden="true">
                  ?
                </span>
              </h2>
              <p>
                A project, an opportunity, or an engineering question.
                <br />
                I’d be glad to hear about it.
              </p>
            </div>
            <div className="contact-links">
              <a className="contact-primary" href={site.github}>
                <GitHubIcon /> Let’s talk <Arrow diagonal />
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
    </HomeMotion>
  );
}
