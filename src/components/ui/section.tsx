import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/** Consistent page section with an accessible heading. */
export function Section({
  id,
  title,
  eyebrow,
  children,
  className,
  compact = false,
  divider = false,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  /** Tighter vertical rhythm for dense, document-like pages (e.g. resume). */
  compact?: boolean;
  /** Top border in place of extra whitespace — pairs well with compact. */
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        compact ? "py-6 sm:py-8" : "py-10 sm:py-14",
        divider && "border-t border-card-border/60",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          {eyebrow ? (
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={`${id}-heading`}
            className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl",
              compact ? "mb-4" : "mb-6",
            )}
          >
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
