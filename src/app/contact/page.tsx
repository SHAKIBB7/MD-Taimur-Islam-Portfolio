import type { Metadata } from "next";
import { getProfile } from "@/services/content";
import { ContactForm } from "@/features/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with MD Taimur Islam.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 sm:py-10">
      <Reveal>
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          Contact
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s work together
        </h1>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          Have a project, opportunity, or just want to say hello? Send a message and
          I&apos;ll get back to you.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>
        <Reveal>
          <Card hover={false} className="h-fit">
            <h2 className="mb-4 text-lg font-semibold">Direct</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-medium text-muted-foreground">Email</dt>
                <dd>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-accent hover:underline"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              {profile.phone ? (
                <div>
                  <dt className="font-medium text-muted-foreground">Phone</dt>
                  <dd>{profile.phone}</dd>
                </div>
              ) : null}
              <div>
                <dt className="font-medium text-muted-foreground">Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Elsewhere</dt>
                <dd className="flex flex-wrap gap-3 pt-1">
                  {profile.socials.map((social) => (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {social.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
