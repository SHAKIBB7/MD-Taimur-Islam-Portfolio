/**
 * Domain types for portfolio content.
 * The UI depends on these — never on Prisma models directly — so the
 * data source (Postgres today, CMS tomorrow) can change without UI rewrites.
 */

export type SocialLink = {
  platform: string;
  label: string;
  url: string;
};

export type LanguageSkill = {
  name: string;
  level: string;
};

export type Interest = {
  title: string;
  description?: string;
};

export type Profile = {
  name: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  /** Short availability note shown as a badge in the hero, e.g. "Open to opportunities". */
  availability?: string;
  socials: SocialLink[];
  languages: LanguageSkill[];
  interests: Interest[];
};

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  employment: string;
  sector?: string;
  startDate: string; // ISO date
  endDate?: string;
  highlights: string[];
};

export type Education = {
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  field: string;
  grade?: string;
  thesis?: string;
  startDate: string;
  endDate?: string;
};

export const SKILL_CATEGORIES = [
  "LANGUAGES_AND_FRAMEWORKS",
  "TOOLS_AND_PLATFORMS",
  "PROFESSIONAL",
] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export type Skill = {
  name: string;
  category: SkillCategory;
  /** Proficiency 0–100; drives the level bar in the skills grid. */
  level?: number;
};

/** Human label for a numeric skill level. */
export function skillLevelLabel(level: number): string {
  if (level >= 80) return "Advanced";
  if (level >= 65) return "Proficient";
  if (level >= 50) return "Intermediate";
  return "Familiar";
}

export const PROJECT_CATEGORIES = [
  "WEB",
  "ANDROID",
  "DESKTOP",
  "FLUTTER",
  "PYTHON",
  "OPEN_SOURCE",
  "FUTURE",
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  WEB: "Web",
  ANDROID: "Android",
  DESKTOP: "Desktop",
  FLUTTER: "Flutter",
  PYTHON: "Python",
  OPEN_SOURCE: "Open Source",
  FUTURE: "Future",
};

export type ProjectStatus = "COMPLETED" | "IN_PROGRESS" | "PLANNED" | "ARCHIVED";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  technologies: string[];
  tags: string[];
  features: string[];
  coverImage?: string;
  gallery: string[];
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  startDate?: string;
  endDate?: string;
  playStoreUrl?: string;
  downloadUrl?: string;
  version?: string;
  releaseDate?: string;
  changelog: string[];
};

export type Achievement = {
  title: string;
  issuer?: string;
  description?: string;
  date?: string;
};

export type Certification = {
  title: string;
  issuer: string;
  credentialUrl?: string;
  issueDate?: string;
};

export type PortfolioContent = {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  certifications: Certification[];
};
