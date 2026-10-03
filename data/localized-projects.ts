import { projects } from "./projects";
import { translator, type Locale } from "@/lib/i18n";

export function getProjects(locale: Locale) {
  const t = translator(locale);
  return projects.map((project) => ({
    ...project,
    category: t(project.category),
    tagline: t(project.tagline),
    description: t(project.description),
    overview: t(project.overview),
    motivation: t(project.motivation),
    architecture: {
      entry: t(project.architecture.entry),
      core: t(project.architecture.core),
      modules: project.architecture.modules.map(t),
      storage: t(project.architecture.storage),
      caption: t(project.architecture.caption),
    },
    sections: project.sections.map((section) => ({
      title: t(section.title),
      paragraphs: section.paragraphs.map(t),
    })),
    decisions: project.decisions.map((decision) => ({
      title: t(decision.title),
      description: t(decision.description),
    })),
    learning: t(project.learning),
    sources: project.sources.map((source) => ({
      ...source,
      label: t(source.label),
    })),
  }));
}
