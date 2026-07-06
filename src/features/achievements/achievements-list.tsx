import type { Achievement } from "@/types/content";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { formatMonthYear } from "@/lib/utils";

export function AchievementsList({ achievements }: { achievements: Achievement[] }) {
  return (
    <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {achievements.map((achievement) => (
        <RevealItem key={achievement.title}>
          <Card className="h-full">
            <p className="text-sm text-muted-foreground">
              {achievement.date ? formatMonthYear(achievement.date) : ""}
            </p>
            <h3 className="mt-1 font-semibold leading-snug">{achievement.title}</h3>
            {achievement.description ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {achievement.description}
              </p>
            ) : null}
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
