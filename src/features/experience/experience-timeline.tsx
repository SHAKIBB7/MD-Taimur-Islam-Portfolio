import type { Experience } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { formatDateRange } from "@/lib/utils";

/** "Deshbandhu Group" → "DG" — company-initial logo tile. */
function companyInitials(company: string): string {
  return company
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <RevealGroup className="space-y-8">
      {experiences.map((exp, index) => (
        <RevealItem key={`${exp.company}-${exp.role}`} className="flex gap-4 sm:gap-6">
          {/* Logo tile + connector line */}
          <div className="flex flex-col items-center">
            <div
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-card-border bg-muted text-sm font-semibold text-accent"
            >
              {companyInitials(exp.company)}
            </div>
            {index < experiences.length - 1 ? (
              <div aria-hidden className="mt-3 w-px flex-1 bg-card-border" />
            ) : null}
          </div>

          {/* Entry card */}
          <div className="flex-1 rounded-2xl border border-card-border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold sm:text-xl">
                {exp.role} ·{" "}
                <span className="text-accent">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatDateRange(exp.startDate, exp.endDate)}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline">{exp.employment}</Badge>
              <Badge variant="outline">{exp.location}</Badge>
              {exp.sector ? <Badge variant="outline">{exp.sector}</Badge> : null}
            </div>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
              {exp.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
