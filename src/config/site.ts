import { env } from "@/lib/env";

/** Site-wide configuration (not personal content — that lives in the database). */
export const siteConfig = {
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "en",
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
