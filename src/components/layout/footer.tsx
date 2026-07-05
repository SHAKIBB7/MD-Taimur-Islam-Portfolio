import type { Profile } from "@/types/content";
import { ButtonLink } from "@/components/ui/button";
import { DownloadIcon, MailIcon, SocialIcon } from "@/components/ui/icons";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-card-border/60">
      {/* Closing CTA — the last thing a visitor sees before leaving */}
      <div className="mx-auto w-full max-w-5xl px-6 py-12 text-center sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Let&apos;s build something together
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Open to internships, freelance projects and full-time roles.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/contact">
            <MailIcon aria-hidden /> Get in touch
          </ButtonLink>
          {profile.resumeUrl ? (
            <ButtonLink href={profile.resumeUrl} variant="secondary" external>
              <DownloadIcon aria-hidden /> Download CV
            </ButtonLink>
          ) : null}
        </div>
      </div>

      <div className="border-t border-card-border/60 py-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} · {profile.location}
            </p>
          </div>
          <nav aria-label="Social links" className="flex gap-5">
            {profile.socials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <SocialIcon platform={social.platform} aria-hidden />
                {social.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
