import { cn } from "@/lib/utils";

/** Friendly empty state for sections/categories without content yet. */
export function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-card-border bg-muted/40 p-12 text-center",
        className,
      )}
    >
      <p className="text-lg font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
