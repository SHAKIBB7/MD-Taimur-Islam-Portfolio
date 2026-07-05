"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { Profile } from "@/types/content";
import { ButtonLink } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { useDeviceCapability } from "@/hooks/use-device-capability";

/** 3D scene is code-split and only loaded on capable devices. */
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

export function Hero({ profile }: { profile: Profile }) {
  const { enable3D, ready } = useDeviceCapability();

  return (
    <div className="relative flex min-h-[68svh] items-center overflow-hidden py-20 sm:min-h-[72svh]">
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
        <motion.p
          variants={fadeUp}
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent"
        >
          {profile.location}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 text-xl font-medium text-accent sm:text-2xl"
        >
          {profile.headline}
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground"
        >
          {profile.summary}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/projects">View Projects</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Get in Touch
          </ButtonLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
