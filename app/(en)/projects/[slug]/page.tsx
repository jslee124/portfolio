import ProjectPage, { projectMetadata } from "@/components/project-page";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  return projectMetadata((await params).slug, "en");
}

export default async function Page({ params }: Props) {
  return <ProjectPage slug={(await params).slug} locale="en" />;
}
