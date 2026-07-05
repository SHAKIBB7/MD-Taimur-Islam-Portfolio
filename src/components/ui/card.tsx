import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Themed surface card with subtle hover lift. */
export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-card-border bg-card p-6 shadow-sm",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
