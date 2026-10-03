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
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 7 9 9-9 9M18 25h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function ProjectSymbol({ project }: { project: "forge" | "kestri" }) {
  return (
    <svg
      className={`project-symbol symbol-${project}`}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {project === "forge" ? (
        <>
          <path d="m8 12 12 12L8 36M26 12l12 12-12 12" />
          <path d="M20 24h18" />
        </>
      ) : (
        <>
          <path d="M13 37V11l22 8-22 11M24 26l11 11M13 11l11 15" />
          <circle cx="25" cy="18" r="1.2" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
