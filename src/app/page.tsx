import Link from "next/link";
import { getContent } from "@/services/content";
import { Hero } from "@/features/hero/hero";
import { Section } from "@/components/ui/section";
import { SkillsGrid } from "@/features/skills/skills-grid";
import { ExperienceTimeline } from "@/features/experience/experience-timeline";
import { EducationList } from "@/features/education/education-list";
import { AchievementsList } from "@/features/achievements/achievements-list";
import { ProjectCard } from "@/features/projects/project-card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export default async function HomePage() {
  const { profile, experiences, education, skills, projects, achievements } =
    await getContent();
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <Hero profile={profile} />

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
