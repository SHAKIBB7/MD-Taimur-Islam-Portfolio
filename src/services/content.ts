import "server-only";
import { cache } from "react";
import { isDatabaseConfigured } from "@/lib/env";
import { cvContent } from "@/data/cv-content";
import type {
  Achievement,
  Certification,
  Education,
  Experience,
  PortfolioContent,
  Profile,
  Project,
} from "@/types/content";

/**
 * Content service — the only module allowed to touch Prisma for reads.
 * Pages consume domain types, never Prisma models.
 *
 * Resilience: if DATABASE_URL is absent or the database is unreachable
 * (first deploy, CI build, preview environments), the service falls back
 * to the canonical seed data so the site always renders.
 */

const iso = (d?: Date | null) => (d ? d.toISOString().slice(0, 10) : undefined);
const opt = <T>(v: T | null) => v ?? undefined;

async function loadFromDatabase(): Promise<PortfolioContent> {
  const { prisma } = await import("@/lib/prisma");

  const [profile, experiences, education, skills, projects, achievements, certs] =
    await Promise.all([
      prisma.profile.findFirstOrThrow({
        include: { socials: true, languages: true, interests: true },
      }),
      prisma.experience.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.education.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.project.findMany({ orderBy: [{ featured: "desc" }, { endDate: "desc" }] }),
      prisma.achievement.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.certification.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

  const mappedProfile: Profile = {
    name: profile.name,
    headline: profile.headline,
    summary: profile.summary,
    location: profile.location,
    email: profile.email,
    phone: opt(profile.phone),
    avatarUrl: opt(profile.avatarUrl),
    resumeUrl: opt(profile.resumeUrl),
    socials: profile.socials.map((s) => ({
      platform: s.platform,
      label: s.label,
      url: s.url,
    })),
    languages: profile.languages.map((l) => ({ name: l.name, level: l.level })),
    interests: profile.interests.map((i) => ({
      title: i.title,
      description: opt(i.description),
    })),
  };

  return {
    profile: mappedProfile,
    experiences: experiences.map(
      (e): Experience => ({
        role: e.role,
        company: e.company,
        companyUrl: opt(e.companyUrl),
        location: e.location,
        employment: e.employment,
        sector: opt(e.sector),
        startDate: iso(e.startDate)!,
        endDate: iso(e.endDate),
        highlights: e.highlights,
      }),
    ),
    education: education.map(
      (e): Education => ({
        degree: e.degree,
        institution: e.institution,
        institutionUrl: opt(e.institutionUrl),
        location: e.location,
        field: e.field,
        grade: opt(e.grade),
        thesis: opt(e.thesis),
        startDate: iso(e.startDate)!,
        endDate: iso(e.endDate),
      }),
    ),
    skills: skills.map((s) => ({ name: s.name, category: s.category })),
    projects: projects.map(
      (p): Project => ({
        slug: p.slug,
        title: p.title,
        tagline: p.tagline,
        description: p.description,
        category: p.category,
        status: p.status,
        featured: p.featured,
        technologies: p.technologies,
        tags: p.tags,
        features: p.features,
        coverImage: opt(p.coverImage),
        gallery: p.gallery,
        videoUrl: opt(p.videoUrl),
        githubUrl: opt(p.githubUrl),
        liveUrl: opt(p.liveUrl),
        docsUrl: opt(p.docsUrl),
        startDate: iso(p.startDate),
        endDate: iso(p.endDate),
        playStoreUrl: opt(p.playStoreUrl),
        downloadUrl: opt(p.downloadUrl),
        version: opt(p.version),
        releaseDate: iso(p.releaseDate),
        changelog: p.changelog,
      }),
    ),
    achievements: achievements.map(
      (a): Achievement => ({
        title: a.title,
        issuer: opt(a.issuer),
        description: opt(a.description),
        date: iso(a.date),
      }),
    ),
    certifications: certs.map(
      (c): Certification => ({
        title: c.title,
        issuer: c.issuer,
        credentialUrl: opt(c.credentialUrl),
        issueDate: iso(c.issueDate),
      }),
    ),
  };
}

/** Per-request memoized content load. */
export const getContent = cache(async (): Promise<PortfolioContent> => {
  if (!isDatabaseConfigured) return cvContent;
  try {
    return await loadFromDatabase();
  } catch (error) {
    console.error("[content] Database unavailable, using fallback content:", error);
    return cvContent;
  }
});

export const getProfile = async () => (await getContent()).profile;
export const getProjects = async () => (await getContent()).projects;

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}
