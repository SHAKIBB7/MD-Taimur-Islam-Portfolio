import type { Education } from "@/types/content";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { formatDateRange } from "@/lib/utils";

export function EducationList({ education }: { education: Education[] }) {
  return (
    <RevealGroup className="space-y-6">
      {education.map((item) => (
        <RevealItem key={item.degree}>
          <Card hover={false}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold">{item.degree}</h3>
              <p className="shrink-0 text-sm text-muted-foreground">
                {formatDateRange(item.startDate, item.endDate)}
              </p>
            </div>
            <p className="mt-1 text-accent">
              {item.institutionUrl ? (
                <a
                  href={item.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {item.institution}
                </a>
              ) : (
                item.institution
              )}{" "}
              <span className="text-muted-foreground">· {item.location}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.field}
              {item.grade ? ` — ${item.grade}` : ""}
            </p>
            {item.thesis ? (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Thesis:</span> {item.thesis}
              </p>
            ) : null}
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
