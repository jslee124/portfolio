export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      className="arrow"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

export function Mark() {
  return (
    <svg
      className="mark"
      width="32"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m4 8 8 8-8 8"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect className="mark-cursor" x="17" y="22.6" width="11" height="2.8" rx="0.6" fill="currentColor" />
    </svg>
  );
}

export function ProjectSymbol({ project }: { project: "forge" | "kestri" }) {
  return (
    <span
      className={`project-symbol symbol-${project}`}
      aria-hidden="true"
    />
  );
}
