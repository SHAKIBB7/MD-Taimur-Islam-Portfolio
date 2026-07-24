"use client";

import type { Skill, SkillCategory } from "@/types/content";
import { skillLevelLabel } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  LANGUAGES_AND_FRAMEWORKS: "Core Programming & Scripting Languages",
  TOOLS_AND_PLATFORMS: "Tools & Platforms",
  PROFESSIONAL: "Professional Skills",
};

function SkillRow({ skill }: { skill: Skill }) {
  const level = skill.level != null ? Math.min(100, Math.max(0, skill.level)) : null;
  return (
    <div className="group relative rounded-md transition-colors hover:bg-muted/50 p-2 -mx-2">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium group-hover:text-accent transition-colors">{skill.name}</span>
        {level != null && <span className="text-xs text-muted-foreground">{skillLevelLabel(level)}</span>}
      </div>
      {level != null && (
        <div
          role="meter"
          aria-label={`${skill.name} proficiency`}
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]"
            style={{ width: `${level}%` }}
          />
        </div>
      )}

      {/* Hover Tooltip */}
      {skill.description && (
        <div className="pointer-events-none absolute left-1/2 -top-2 w-64 -translate-x-1/2 -translate-y-full scale-95 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 z-[999]">
          <div className="relative rounded-lg border border-card-border bg-card p-3 shadow-2xl">
            <h4 className="mb-1 text-xs font-bold text-accent">{skill.name}</h4>
            <p className="text-xs leading-relaxed text-foreground/90">{skill.description}</p>
            {/* Arrow */}
            <div className="absolute -bottom-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-card-border bg-card"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SkillsGrid({ skills }: { skills: Skill[] }) {
  const groups = new Map<SkillCategory, Skill[]>();
  for (const skill of skills) {
    const list = groups.get(skill.category) ?? [];
    list.push(skill);
    groups.set(skill.category, list);
  }

  return (
    <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {[...groups.entries()].map(([category, items]) => (
        <RevealItem key={category} className="z-10 hover:z-20">
          <Card className="h-full overflow-visible" hover={false}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-accent">
              {CATEGORY_LABELS[category]}
            </h3>
            <div className="space-y-2">
              {items.map((skill) => (
                <SkillRow key={skill.name} skill={skill} />
              ))}
            </div>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
