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
          <i aria-hidden="true" /> Mori / Developer portfolio
        </span>
        <span>Backend / Agents / Tools</span>
      </div>
      <CharacterField />
      <div className="hero-brief container">
        <div>
          <h1 id="hero-title" className="hero-position">
            Hi, I’m Mori.
            <br />I build backend systems.
          </h1>
          <p className="hero-description">
            Computer Science student focused on AI agents and developer tools.
            Working with TypeScript, Go, and Python.
          </p>
        </div>
        <div className="hero-invitation">
          <span className="hero-caption">
            Explore my projects and the engineering behind them.
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
        <span>My projects · About me · Technical skills</span>
        <Link href="#projects">
          Scroll to inspect <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  );
}
