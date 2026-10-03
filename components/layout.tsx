import Link from "next/link";
import { site } from "@/data/site";
import { Arrow, Mark } from "./icons";

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Mori home">
          <Mark small /> Mori
        </Link>
        <div className="nav-links">
          <Link href="/#projects">Projects</Link>
          <Link href="/#about">About</Link>
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
        <Mark small /> Mori
      </Link>
      <p>Built with care. Made to be understood.</p>
      <a href={site.github}>
        GitHub <Arrow diagonal />
      </a>
    </footer>
  );
}

export function SectionHeading({
  number,
  children,
  id,
}: {
  number: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 id={id} className="section-heading">
      <span>{number}</span>
      <span aria-hidden="true">/</span>
      {children}
    </h2>
  );
}
