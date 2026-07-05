import type { SVGProps } from "react";
import type { ProjectCategory } from "@/types/content";

/**
 * Minimal inline icon set (stroke-based, lucide-style) so we avoid an icon
 * dependency. All icons inherit `currentColor` and size via className.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="1em"
      height="1em"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const GitHubIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </Icon>
);

export const LinkedInIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 11v5" />
    <path d="M8 8v.01" />
    <path d="M12 16v-5" />
    <path d="M16 16v-3a2 2 0 1 0-4 0" />
    <rect x="3" y="3" width="18" height="18" rx="3" />
  </Icon>
);

export const PenIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Icon>
);

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);

export const DownloadIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3v12" />
    <path d="m7 11 5 5 5-5" />
    <path d="M5 21h14" />
  </Icon>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Icon>
);

export const GlobeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
  </Icon>
);

export const SmartphoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M11 18h2" />
  </Icon>
);

export const MonitorIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
  </Icon>
);

export const LayersIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 3 9 5-9 5-9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </Icon>
);

export const TerminalIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m4 7 5 5-5 5" />
    <path d="M12 19h8" />
  </Icon>
);

export const GitBranchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="8" r="2.5" />
    <path d="M6 8.5v7" />
    <path d="M18 10.5c0 4-4 5-8 5.5" />
  </Icon>
);

export const SparklesIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4l1.8 4.6L18 10.4l-4.2 1.8L12 16.8l-1.8-4.6L6 10.4l4.2-1.8Z" />
    <path d="M19 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9Z" />
  </Icon>
);

/** Icon for a social platform key (see cv-content socials). */
export function SocialIcon({ platform, ...props }: IconProps & { platform: string }) {
  switch (platform) {
    case "github":
      return <GitHubIcon {...props} />;
    case "linkedin":
      return <LinkedInIcon {...props} />;
    case "medium":
      return <PenIcon {...props} />;
    case "email":
      return <MailIcon {...props} />;
    default:
      return <GlobeIcon {...props} />;
  }
}

/** Icon for a project category — used on card covers. */
export function CategoryIcon({
  category,
  ...props
}: IconProps & { category: ProjectCategory }) {
  switch (category) {
    case "WEB":
      return <GlobeIcon {...props} />;
    case "ANDROID":
      return <SmartphoneIcon {...props} />;
    case "DESKTOP":
      return <MonitorIcon {...props} />;
    case "FLUTTER":
      return <LayersIcon {...props} />;
    case "PYTHON":
      return <TerminalIcon {...props} />;
    case "OPEN_SOURCE":
      return <GitBranchIcon {...props} />;
    case "FUTURE":
      return <SparklesIcon {...props} />;
  }
}
