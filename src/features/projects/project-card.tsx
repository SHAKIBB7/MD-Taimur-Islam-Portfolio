import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/content";
import { PROJECT_CATEGORY_LABELS } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, CategoryIcon } from "@/components/ui/icons";
import { cn, formatDateRange } from "@/lib/utils";

const STATUS_LABELS: Record<Project["status"], string> = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In progress",
  PLANNED: "Planned",
  ARCHIVED: "Archived",
};

const STATUS_DOT: Record<Project["status"], string> = {
  COMPLETED: "bg-success",
  IN_PROGRESS: "bg-accent",
  PLANNED: "bg-muted-foreground",
  ARCHIVED: "bg-muted-foreground",
};

/** Per-category cover tint so text-free covers still read distinctly. */
const COVER_TINT: Record<Project["category"], string> = {
  WEB: "from-accent-soft to-accent-2/10",
  ANDROID: "from-success-soft to-accent-soft",
  DESKTOP: "from-accent-2/15 to-accent-soft",
  FLUTTER: "from-accent-2/15 to-success-soft",
  PYTHON: "from-accent-soft to-success-soft",
  OPEN_SOURCE: "from-accent-soft to-accent-2/15",
  FUTURE: "from-accent-2/10 to-accent-soft",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl"
      aria-label={`${project.title} — ${project.tagline}`}
    >
      <article className="h-full overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
        {/* Cover: real screenshot when available, category illustration otherwise */}
        <div
          className={cn(
            "relative flex h-36 items-center justify-center bg-gradient-to-br",
            COVER_TINT[project.category],
          )}
        >
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <CategoryIcon
              category={project.category}
              className="text-4xl text-accent opacity-80 transition-transform duration-300 group-hover:scale-110"
              aria-hidden
            />
          )}
          <span className="absolute left-3 top-3">
            <Badge variant="accent" className="bg-background/70 backdrop-blur">
              {PROJECT_CATEGORY_LABELS[project.category]}
            </Badge>
          </span>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span
              aria-hidden
              className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[project.status])}
            />
            {STATUS_LABELS[project.status]}
          </span>
        </div>

        <div className="p-6 pt-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <ArrowUpRightIcon
              aria-hidden
              className="shrink-0 text-lg text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </div>
          <p className="mt-1 text-sm text-accent">{project.tagline}</p>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} className="text-[11px]">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-card-border/60 pt-3">
            <span className="text-xs text-muted-foreground">
              {project.startDate
                ? formatDateRange(project.startDate, project.endDate)
                : project.featured
                  ? "Featured"
                  : PROJECT_CATEGORY_LABELS[project.category]}
            </span>
            <span className="text-xs font-medium text-accent">Case study →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
