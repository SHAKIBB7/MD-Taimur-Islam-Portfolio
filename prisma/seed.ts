import { PrismaClient } from "@prisma/client";
import { cvContent } from "../src/data/cv-content";

const prisma = new PrismaClient();

const date = (iso?: string) => (iso ? new Date(iso) : null);

async function main() {
  const c = cvContent;

  // Idempotent reseed: content tables are wiped and rebuilt from cv-content.ts.
  // ContactMessage is intentionally preserved.
  await prisma.$transaction([
    prisma.socialLink.deleteMany(),
    prisma.language.deleteMany(),
    prisma.interest.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.education.deleteMany(),
    prisma.skill.deleteMany(),
    prisma.project.deleteMany(),
    prisma.achievement.deleteMany(),
    prisma.certification.deleteMany(),
  ]);

  await prisma.profile.create({
    data: {
      name: c.profile.name,
      headline: c.profile.headline,
      summary: c.profile.summary,
      location: c.profile.location,
      email: c.profile.email,
      phone: c.profile.phone,
      avatarUrl: c.profile.avatarUrl,
      resumeUrl: c.profile.resumeUrl,
      availability: c.profile.availability,
      socials: { create: c.profile.socials },
      languages: { create: c.profile.languages },
      interests: { create: c.profile.interests },
    },
  });

  await prisma.experience.createMany({
    data: c.experiences.map((e, i) => ({
      role: e.role,
      company: e.company,
      companyUrl: e.companyUrl,
      location: e.location,
      employment: e.employment,
      sector: e.sector,
      startDate: new Date(e.startDate),
      endDate: date(e.endDate),
      highlights: e.highlights,
      sortOrder: i,
    })),
  });

  await prisma.education.createMany({
    data: c.education.map((e, i) => ({
      degree: e.degree,
      institution: e.institution,
      institutionUrl: e.institutionUrl,
      location: e.location,
      field: e.field,
      grade: e.grade,
      thesis: e.thesis,
      startDate: new Date(e.startDate),
      endDate: date(e.endDate),
      sortOrder: i,
    })),
  });

  await prisma.skill.createMany({
    data: c.skills.map((s, i) => ({ ...s, sortOrder: i })),
  });

  for (const p of c.projects) {
    await prisma.project.create({
      data: {
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
        coverImage: p.coverImage,
        gallery: p.gallery,
        videoUrl: p.videoUrl,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        docsUrl: p.docsUrl,
        startDate: date(p.startDate),
        endDate: date(p.endDate),
        playStoreUrl: p.playStoreUrl,
        downloadUrl: p.downloadUrl,
        version: p.version,
        releaseDate: date(p.releaseDate),
        changelog: p.changelog,
      },
    });
  }

  await prisma.achievement.createMany({
    data: c.achievements.map((a, i) => ({
      title: a.title,
      issuer: a.issuer,
      description: a.description,
      date: date(a.date),
      sortOrder: i,
    })),
  });

  if (c.certifications.length > 0) {
    await prisma.certification.createMany({
      data: c.certifications.map((cert, i) => ({
        title: cert.title,
        issuer: cert.issuer,
        credentialUrl: cert.credentialUrl,
        issueDate: date(cert.issueDate),
        sortOrder: i,
      })),
    });
  }

  console.log("Database seeded from src/data/cv-content.ts");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
