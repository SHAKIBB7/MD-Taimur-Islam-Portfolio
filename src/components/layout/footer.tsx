import type { Profile } from "@/types/content";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-card-border/60 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} · {profile.location}
          </p>
        </div>
        <nav aria-label="Social links" className="flex gap-4">
          {profile.socials.map((social) => (
            <a
              key={social.url}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
