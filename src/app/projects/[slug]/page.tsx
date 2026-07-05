import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getProjects } from "@/services/content";
import { PROJECT_CATEGORY_LABELS } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { formatDateRange, formatMonthYear } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.tagline },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const links = [
    { label: "Live Demo", url: project.liveUrl },
    { label: "GitHub", url: project.githubUrl },
    { label: "Play Store", url: project.playStoreUrl },
    { label: "Download", url: project.downloadUrl },
    { label: "Documentation", url: project.docsUrl },
  ].filter((l): l is { label: string; url: string } => Boolean(l.url));

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-12">
      <Reveal>
        <Link
          href="/projects"
          className="text-sm font-medium text-accent hover:underline"
        >
          ← All projects
        </Link>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="accent">{PROJECT_CATEGORY_LABELS[project.category]}</Badge>
          {project.version ? <Badge variant="outline">v{project.version}</Badge> : null}
          {project.startDate ? (
            <Badge variant="outline">
              {formatDateRange(project.startDate, project.endDate)}
            </Badge>
          ) : null}
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-accent">{project.tagline}</p>
      </Reveal>

      <Reveal className="mt-8">
        <p className="leading-relaxed text-muted-foreground">{project.description}</p>
      </Reveal>

      {project.features.length > 0 ? (
        <Reveal className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      <Reveal className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </Reveal>

      {project.changelog.length > 0 ? (
        <Reveal className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Changelog</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {project.changelog.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      {project.releaseDate ? (
        <Reveal className="mt-6">
          <p className="text-sm text-muted-foreground">
            Latest release: {formatMonthYear(project.releaseDate)}
          </p>
        </Reveal>
      ) : null}

      {links.length > 0 ? (
        <Reveal className="mt-10 flex flex-wrap gap-4">
          {links.map((link, index) => (
            <ButtonLink
              key={link.url}
              href={link.url}
              external
              variant={index === 0 ? "primary" : "secondary"}
            >
              {link.label}
            </ButtonLink>
          ))}
        </Reveal>
      ) : null}
    </article>
  );
}
