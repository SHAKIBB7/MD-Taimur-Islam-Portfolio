"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, revealViewport, staggerContainer } from "@/animations/variants";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal wrapper. Keeps motion concerns out of
 * server components — sections stay RSC, only this thin shell is client-side.
 */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li";
}) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Component>
  );
}

/** Parent that staggers its Reveal-item children. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={cn(className)} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
