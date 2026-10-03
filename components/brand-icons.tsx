import {
  siGithub,
  siTypescript,
  siGo,
  siPython,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siRedis,
  siDocker,
  siGit,
  siLinux,
  siLanggraph,
  type SimpleIcon,
} from "simple-icons";

const technologies: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  Go: siGo,
  Python: siPython,
  React: siReact,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  Docker: siDocker,
  Git: siGit,
  Linux: siLinux,
  LangGraph: siLanggraph,
};

/** Labels remain in the surrounding UI, so logos are decorative to screen readers. */
export function GitHubIcon() {
  return (
    <svg
      className="github-logo"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={siGithub.path} />
    </svg>
  );
}

export function TechnologyIcon({ name }: { name: string }) {
  const icon = technologies[name];
  if (!icon) return null;
  // Black brand marks use the page foreground so they work on both system themes.
  const color = icon.hex === "000000" ? "currentColor" : `#${icon.hex}`;
  return (
    <svg
      className="technology-logo"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}
