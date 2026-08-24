import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/data/projects";
import { WorkPageClient } from "@/components/work/WorkPageClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return project ? { title: project.title, description: project.description } : {};
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  return <WorkPageClient slug={slug} />;
}
