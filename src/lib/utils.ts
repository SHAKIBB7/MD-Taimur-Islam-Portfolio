/** Merge class names, filtering falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const MONTH_YEAR = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

/** Format an ISO date (yyyy-mm-dd) as "Jan 2024". */
export function formatMonthYear(isoDate?: string): string {
  if (!isoDate) return "Present";
  return MONTH_YEAR.format(new Date(`${isoDate}T00:00:00Z`));
}

/** "Jan 2024 – Jun 2024" or "Jan 2024 – Present". */
export function formatDateRange(start?: string, end?: string): string {
  if (!start) return "";
  return `${formatMonthYear(start)} – ${formatMonthYear(end)}`;
}
