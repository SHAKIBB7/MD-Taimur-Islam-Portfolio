import type { Metadata } from "next";
import { getProjects } from "@/services/content";
import { ProjectExplorer } from "@/features/projects/project-explorer";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web, Android, desktop, Flutter, Python, and open-source projects by MD Taimur Islam.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-12">
      <Reveal>
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          Portfolio
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Projects</h1>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          A growing collection of work across web, mobile, and beyond. Filter by category
          or search by technology.
        </p>
      </Reveal>
      <ProjectExplorer projects={projects} />
    </div>
  );
}
