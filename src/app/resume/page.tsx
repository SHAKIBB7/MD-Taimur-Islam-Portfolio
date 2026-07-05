import type { Metadata } from "next";
import { getContent } from "@/services/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { ExperienceTimeline } from "@/features/experience/experience-timeline";
import { EducationList } from "@/features/education/education-list";
import { SkillsGrid } from "@/features/skills/skills-grid";
import { AchievementsList } from "@/features/achievements/achievements-list";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of MD Taimur Islam — experience, education, skills, and languages.",
  alternates: { canonical: "/resume" },
};

export default async function ResumePage() {
  const { profile, experiences, education, skills, achievements, certifications } =
    await getContent();

  return (
    <div className="pb-16">
      <div className="mx-auto w-full max-w-5xl px-6 pb-10 pt-12 sm:pt-16">
        <Reveal>
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
            Curriculum Vitae
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{profile.headline}</p>
          {profile.resumeUrl ? (
            <div className="mt-6">
              <ButtonLink href={profile.resumeUrl} external>
                Download PDF
              </ButtonLink>
            </div>
          ) : null}
        </Reveal>
      </div>

      <Section id="resume-experience" title="Experience" compact divider>
        <ExperienceTimeline experiences={experiences} />
      </Section>

      <Section id="resume-education" title="Education" compact divider>
        <EducationList education={education} />
      </Section>

      <Section id="resume-skills" title="Skills" compact divider>
        <SkillsGrid skills={skills} />
      </Section>

      <Section id="resume-languages" title="Languages" compact divider>
        <div className="flex flex-wrap gap-3">
          {profile.languages.map((language) => (
            <Badge key={language.name} variant="accent" className="px-4 py-2 text-sm">
              {language.name} — {language.level}
            </Badge>
          ))}
        </div>
      </Section>

      {achievements.length > 0 ? (
        <Section id="resume-achievements" title="Achievements" compact divider>
          <AchievementsList achievements={achievements} />
        </Section>
      ) : null}

      {certifications.length > 0 ? (
        <Section id="resume-certifications" title="Certifications" compact divider>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {certifications.map((cert) => (
              <Card key={cert.title} hover={false}>
                <h3 className="font-semibold">{cert.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      {profile.interests.length > 0 ? (
        <Section id="resume-interests" title="Interests" compact divider>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {profile.interests.map((interest) => (
              <Card key={interest.title} hover={false}>
                <h3 className="font-semibold">{interest.title}</h3>
                {interest.description ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {interest.description}
                  </p>
                ) : null}
              </Card>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
