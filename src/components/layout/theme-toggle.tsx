"use client";

import { useEffect, useState } from "react";
import { useTheme, type Theme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

const OPTIONS: Array<{ value: Theme; label: string; icon: string }> = [
  { value: "light", label: "Light theme", icon: "☀" },
  { value: "system", label: "System theme", icon: "◐" },
  { value: "dark", label: "Dark theme", icon: "☾" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="flex items-center gap-0.5 rounded-full border border-card-border bg-card p-1"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          role="radio"
          aria-checked={mounted && theme === option.value}
          aria-label={option.label}
          title={option.label}
          onClick={() => setTheme(option.value)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors",
            mounted && theme === option.value
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <span aria-hidden>{option.icon}</span>
        </button>
      ))}
    </div>
  );
}
