import { translator, type Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

export function ProjectScene({
  project,
  children,
  locale = "en",
}: {
  project: "forge" | "kestri";
  children: ReactNode;
  locale?: Locale;
}) {
  const t = translator(locale);
  return (
    <section
      className={`project-section project-section-${project}`}
      aria-label={`${project === "forge" ? "Forge" : "Kestri"} ${locale === "zh" ? "项目展示" : "project showcase"}`}
    >
      <div className="project-directory container">
        <span>~/projects/{project}</span>
        <span>
          {project === "forge"
            ? t("Runtime engineering")
            : t("Application engineering")}
        </span>
      </div>
      {children}
    </section>
  );
}
