import Link from "next/link";
import type { Project } from "@/types/content";
import { PROJECT_CATEGORY_LABELS } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDateRange } from "@/lib/utils";

const STATUS_LABELS: Record<Project["status"], string> = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In progress",
  PLANNED: "Planned",
  ARCHIVED: "Archived",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-2xl"
      aria-label={`${project.title} — ${project.tagline}`}
    >
      <Card className="h-full">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="accent">{PROJECT_CATEGORY_LABELS[project.category]}</Badge>
          <Badge variant="outline">{STATUS_LABELS[project.status]}</Badge>
          {project.featured ? <Badge>Featured</Badge> : null}
        </div>
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-accent">{project.tagline}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} className="text-[11px]">
              {tech}
            </Badge>
          ))}
        </div>
        {project.startDate ? (
          <p className="mt-4 text-xs text-muted-foreground">
            {formatDateRange(project.startDate, project.endDate)}
          </p>
        ) : null}
      </Card>
    </Link>
  );
}
