"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Profile } from "@/types/content";
import { ButtonLink } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/icons";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { useDeviceCapability } from "@/hooks/use-device-capability";

/** 3D scene is code-split and only loaded on capable devices. */
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

export type HeroStat = { value: string; label: string };

export function Hero({ profile, stats }: { profile: Profile; stats: HeroStat[] }) {
  const { enable3D, ready } = useDeviceCapability();

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3);

  return (
    <div className="relative flex items-center overflow-hidden py-12 sm:py-16">
      {/* Background: 3D on capable devices, CSS gradient fallback otherwise */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {ready && enable3D ? (
          <HeroScene />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--accent-soft),transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <motion.div
        className="mx-auto w-full max-w-5xl px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            {profile.availability ? (
              <motion.p
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success-soft px-4 py-1.5 text-xs font-medium text-success"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                {profile.availability}
              </motion.p>
            ) : null}
            <motion.p
              variants={fadeUp}
              className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent"
            >
              {profile.location}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="max-w-3xl bg-[linear-gradient(90deg,var(--accent),var(--accent-2))] bg-clip-text text-5xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-7xl"
            >
              {profile.name}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-xl font-medium sm:text-2xl">
              {profile.headline}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground"
            >
              {profile.summary}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <ButtonLink href="/projects">View Projects</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in Touch
              </ButtonLink>
              <span className="ml-1 flex items-center gap-4 text-muted-foreground">
                {profile.socials
                  .filter((s) => s.platform !== "email")
                  .map((social) => (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-xl transition-colors hover:text-accent"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
              </span>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="shrink-0">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                width={160}
                height={160}
                priority
                className="h-32 w-32 rounded-full border-2 border-accent object-cover sm:h-40 sm:w-40"
              />
            ) : (
              <div
                aria-hidden
                className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-accent bg-card text-3xl font-bold text-accent sm:h-40 sm:w-40"
              >
                {initials}
              </div>
            )}
          </motion.div>
        </div>

        {stats.length > 0 ? (
          <motion.dl
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 gap-6 border-t border-card-border/60 pt-6 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-bold sm:text-3xl">{stat.value}</dd>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        ) : null}
      </motion.div>
    </div>
  );
}
