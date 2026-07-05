import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { getContent } from "@/services/content";
import { Hero, type HeroStat } from "@/features/hero/hero";
import { Section } from "@/components/ui/section";
import { SkillsGrid } from "@/features/skills/skills-grid";
import { ExperienceTimeline } from "@/features/experience/experience-timeline";
import { EducationList } from "@/features/education/education-list";
import { AchievementsList } from "@/features/achievements/achievements-list";
import { ProjectCard } from "@/features/projects/project-card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

/** Years since the earliest experience/education milestone worth counting. */
function yearsSince(iso: string): number {
  return Math.max(
    1,
    Math.floor((Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 3600 * 1000)),
  );
}

export default async function HomePage() {
  const { profile, experiences, education, skills, projects, achievements } =
    await getContent();
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  // Auto-detect a profile photo dropped into /public — no config needed.
  const heroProfile =
    !profile.avatarUrl && existsSync(join(process.cwd(), "public", "profile.jpg"))
      ? { ...profile, avatarUrl: "/profile.jpg" }
      : profile;

  const earliestStart = experiences
    .map((e) => e.startDate)
    .sort()
    .at(0);
  const stats: HeroStat[] = [
    ...(earliestStart
      ? [{ value: `${yearsSince(earliestStart)}+`, label: "Years of experience" }]
      : []),
    { value: `${experiences.length}`, label: "Roles & internships" },
    { value: `${projects.length}`, label: "Projects" },
    { value: `${skills.length}+`, label: "Skills & tools" },
  ];

  return (
    <>
      <Hero profile={heroProfile} stats={stats} />

      {featured.length > 0 ? (
        <Section id="featured" eyebrow="Selected Work" title="Featured Projects">
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featured.map((project) => (
              <RevealItem key={project.slug}>
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-6">
            <Link href="/projects" className="font-medium text-accent hover:underline">
              Browse all projects →
            </Link>
          </p>
        </Section>
      ) : null}

      <Section id="skills" eyebrow="Capabilities" title="Skills" className="bg-muted/40">
        <SkillsGrid skills={skills} />
      </Section>

      <Section id="experience" eyebrow="Career" title="Experience">
        <ExperienceTimeline experiences={experiences} />
      </Section>

      <Section
        id="education"
        eyebrow="Background"
        title="Education"
        className="bg-muted/40"
      >
        <EducationList education={education} />
      </Section>

      {achievements.length > 0 ? (
        <Section id="achievements" eyebrow="Recognition" title="Achievements">
          <AchievementsList achievements={achievements} />
        </Section>
      ) : null}
    </>
  );
}
