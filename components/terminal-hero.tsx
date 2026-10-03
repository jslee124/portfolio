import Link from "next/link";
import { site } from "@/data/site";
import { Arrow } from "./icons";
import { TerminalCommand } from "./terminal-command";
import { CharacterField } from "./character-field";

export function TerminalHero() {
  return (
    <section className="signal-hero" aria-labelledby="hero-title">
      <div className="hero-readout container">
        <span>
          <i aria-hidden="true" /> Mori’s working directory
        </span>
        <span>Backend / Agents / Tools</span>
      </div>
      <h1 id="hero-title" className="sr-only">
        Mori — Software engineer building backend systems, AI agents, and
        developer tools
      </h1>
      <CharacterField />
      <div className="hero-brief container">
        <div>
          <p className="hero-position">
            I build the systems
            <br />
            behind the software.
          </p>
          <p className="hero-description">
            Computer Science student. Working with TypeScript, Go, and Python.
          </p>
        </div>
        <div className="hero-invitation">
          <span className="hero-caption">
            Inspect the runtime. Explore the application.
          </span>
          <div className="hero-actions">
            <Link className="button" href="#projects">
              Explore my work <Arrow />
            </Link>
            <a className="text-link" href={site.github}>
              GitHub <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
      <div className="hero-command-dock container">
        <TerminalCommand />
      </div>
      <div className="hero-bottom container">
        <span>Two independent projects. One engineering mindset.</span>
        <Link href="#projects">
          Scroll to inspect <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  );
}
