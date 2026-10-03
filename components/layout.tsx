import Link from "next/link";
import { site } from "@/data/site";
import { Arrow, Mark } from "./icons";

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Mori home">
          <Mark />
          <span>
            mori<span className="brand-path">:~</span>
          </span>
        </Link>
        <div className="nav-links">
          <Link href="/#projects">Projects</Link>
          <Link href="/#about">About</Link>
          <Link href="/#skills">Skills</Link>
          <a href={site.github}>
            GitHub <Arrow diagonal />
          </a>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="container footer">
      <Link className="brand" href="/">
        <Mark />
        <span>
          mori<span className="brand-path">:~</span>
        </span>
      </Link>
      <p>Built to inspect. Made to explore.</p>
      <a href={site.github}>
        Source & projects <Arrow diagonal />
      </a>
    </footer>
  );
}
