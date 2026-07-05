import type { Skill, SkillCategory } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  LANGUAGES_AND_FRAMEWORKS: "Languages & Frameworks",
  TOOLS_AND_PLATFORMS: "Tools & Platforms",
  PROFESSIONAL: "Professional Skills",
};

export function SkillsGrid({ skills }: { skills: Skill[] }) {
  const groups = skills.reduce<Map<SkillCategory, Skill[]>>((map, skill) => {
    const list = map.get(skill.category) ?? [];
    list.push(skill);
    map.set(skill.category, list);
    return map;
  }, new Map());

  return (
    <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {[...groups.entries()].map(([category, items]) => (
        <RevealItem key={category}>
          <Card className="h-full" hover={false}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              {CATEGORY_LABELS[category]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <Badge key={skill.name}>{skill.name}</Badge>
              ))}
            </div>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
