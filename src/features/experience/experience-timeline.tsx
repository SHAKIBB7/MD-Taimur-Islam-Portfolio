import type { Experience } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { formatDateRange } from "@/lib/utils";

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <RevealGroup className="relative space-y-10 border-l border-card-border pl-8">
      {experiences.map((exp) => (
        <RevealItem key={`${exp.company}-${exp.role}`} className="relative">
          <span
            aria-hidden
            className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-accent-soft"
          />
          <p className="text-sm text-muted-foreground">
            {formatDateRange(exp.startDate, exp.endDate)}
          </p>
          <h3 className="mt-1 text-xl font-semibold">
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
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline">{exp.employment}</Badge>
            <Badge variant="outline">{exp.location}</Badge>
            {exp.sector ? <Badge variant="outline">{exp.sector}</Badge> : null}
          </div>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
            {exp.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
