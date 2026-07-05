import type { PortfolioContent } from "@/types/content";

/**
 * Canonical CV content (extracted from MD Taimur Islam's CV).
 * Used by `prisma/seed.ts` to populate the database, and as a resilient
 * fallback when DATABASE_URL is not configured (e.g. first deploy, CI builds).
 * Edit here → run `npm run db:seed` to sync the database.
 */
export const cvContent: PortfolioContent = {
  profile: {
    name: "MD Taimur Islam",
    headline: "IT Specialist & Software Developer",
    summary:
      "Experienced IT specialist with a strong foundation in Computer Science and Engineering. Skilled in coding and programming, passionate about leveraging technology to drive innovation and efficiency. Expertise spans software development, cybersecurity, and problem-solving to optimize digital solutions — thriving in dynamic environments and ensuring seamless integration of technology.",
    location: "Narsingdi, Bangladesh",
    email: "Taimurislam@icloud.com",
    phone: "+880 1853-448000",
    socials: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/taimurshakiib7",
      },
      { platform: "skype", label: "Skype", url: "skype:live:taimurshakib77?chat" },
      { platform: "email", label: "Email", url: "mailto:Taimurislam@icloud.com" },
    ],
    languages: [
      { name: "Bengali", level: "Native" },
      { name: "English", level: "B2 — Independent user" },
    ],
    interests: [
      {
        title: "Research & Reading",
        description:
          "Exploring advanced algorithms, AI, cybersecurity, and software development through academic papers, technical blogs, and industry reports.",
      },
      {
        title: "Tech Blogging & Writing",
        description:
          "Writing about emerging technologies and coding best practices on Medium and LinkedIn.",
      },
      { title: "Sports", description: "Cricket & Football." },
    ],
  },
  experiences: [
    {
      role: "IT Engineer",
      company: "Deshbandhu Group",
      location: "Narsingdi, Bangladesh",
      employment: "Internship",
      sector: "Manufacturing",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      highlights: [
        "Developed and managed systems while overseeing multiple projects simultaneously.",
        "Handled device and password management to ensure security and accessibility.",
        "Led and coordinated teams of technicians, system engineers, and IT staff.",
        "Applied emerging technologies and industry trends to operations and activities.",
      ],
    },
    {
      role: "Web Developer",
      company: "Computer Mela",
      location: "Narsingdi, Bangladesh (Remote)",
      employment: "Remote Internship",
      sector: "Information & Communication",
      startDate: "2023-09-10",
      endDate: "2024-02-29",
      highlights: [
        "Developed and maintained websites using HTML, CSS, Python, and WordPress.",
        "Collaborated with web designers and programmers for seamless website development.",
        "Communicated with internal teams to develop and deploy content within defined timelines.",
        "Researched and documented software programs for continuous improvement.",
        "Implemented contingency plans to ensure website uptime and functionality.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "The People's University of Bangladesh",
      institutionUrl: "https://www.pub.ac.bd",
      location: "Dhaka, Bangladesh",
      field: "Computer Science and Engineering",
      grade: "CGPA 3.14 (EQF level 6)",
      thesis: "A Website for Stock Image Resources Using WordPress Technology",
      startDate: "2021-03-03",
      endDate: "2024-12-01",
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Narsingdi Science and Engineering Institute",
      location: "Narsingdi, Bangladesh",
      field: "Computer Technology",
      grade: "GPA 2.86 / 4.00",
      startDate: "2014-08-01",
      endDate: "2019-10-05",
    },
    {
      degree: "Secondary School Certificate",
      institution: "Tauhid Memorial High School",
      location: "Narsingdi, Bangladesh",
      field: "Science",
      grade: "GPA 3.06 / 5.00",
      startDate: "2010-05-01",
      endDate: "2012-05-07",
    },
  ],
  skills: [
    { name: "HTML & CSS", category: "LANGUAGES_AND_FRAMEWORKS" },
    { name: "Python", category: "LANGUAGES_AND_FRAMEWORKS" },
    { name: "WordPress", category: "TOOLS_AND_PLATFORMS" },
    { name: "Microsoft Office Suite", category: "TOOLS_AND_PLATFORMS" },
    { name: "System & Device Management", category: "TOOLS_AND_PLATFORMS" },
    { name: "Cybersecurity Fundamentals", category: "PROFESSIONAL" },
    { name: "Problem Analysis & Solving", category: "PROFESSIONAL" },
    { name: "Teamwork & Collaboration", category: "PROFESSIONAL" },
    { name: "Critical Thinking", category: "PROFESSIONAL" },
    { name: "Time Management & Organization", category: "PROFESSIONAL" },
    { name: "Communication", category: "PROFESSIONAL" },
  ],
  projects: [
    {
      slug: "stock-image-resources-website",
      title: "Stock Image Resources Website",
      tagline: "A comprehensive stock image repository built on WordPress",
      description:
        "Bachelor's thesis project: a user-friendly and efficient website serving as a comprehensive repository for stock images. Built on WordPress, it leverages the platform's flexibility, scalability, and extensive plugin ecosystem to deliver a robust, maintainable solution for browsing and managing stock image resources.",
      category: "WEB",
      status: "COMPLETED",
      featured: true,
      technologies: ["WordPress", "PHP", "MySQL", "HTML", "CSS"],
      tags: ["thesis", "cms", "media"],
      features: [
        "Comprehensive, searchable stock image repository",
        "CMS-driven content management with WordPress",
        "Plugin-based extensibility for future features",
        "Responsive, user-friendly interface",
      ],
      gallery: [],
      startDate: "2024-07-01",
      endDate: "2024-09-25",
      changelog: [],
    },
  ],
  achievements: [
    {
      title: "ICT Olympiad Bangladesh — Season 2",
      issuer: "ICT Olympiad Bangladesh",
      description: "National ICT competition participant.",
      date: "2024-03-01",
    },
    {
      title: "ICT Olympiad Bangladesh — Season 1",
      issuer: "ICT Olympiad Bangladesh",
      description: "National ICT competition participant.",
      date: "2022-04-10",
    },
    {
      title: "Bangladesh Coding Olympiad",
      issuer: "Bangladesh Coding Olympiad",
      description: "National coding competition participant.",
      date: "2022-07-16",
    },
  ],
  certifications: [],
};
