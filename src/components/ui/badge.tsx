import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-muted text-muted-foreground",
        variant === "accent" && "bg-accent-soft text-accent",
        variant === "outline" && "border border-card-border text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
