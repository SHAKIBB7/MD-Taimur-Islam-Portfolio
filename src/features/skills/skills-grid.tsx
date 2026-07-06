import type { Skill, SkillCategory } from "@/types/content";
import { skillLevelLabel } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  LANGUAGES_AND_FRAMEWORKS: "Languages & Frameworks",
  TOOLS_AND_PLATFORMS: "Tools & Platforms",
  PROFESSIONAL: "Professional Skills",
};

function SkillRow({ skill }: { skill: Skill }) {
  if (skill.level == null) {
    return <Badge>{skill.name}</Badge>;
  }
  const level = Math.min(100, Math.max(0, skill.level));
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skillLevelLabel(level)}</span>
      </div>
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
        <RevealItem key={category}>
          <Card className="h-full" hover={false}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-accent">
              {CATEGORY_LABELS[category]}
            </h3>
            <div className="space-y-4">
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
