/** Route-level skeleton shown during server data loads. */
export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-5xl animate-pulse px-6 py-24"
      role="status"
      aria-label="Loading page"
    >
      <div className="h-4 w-32 rounded bg-muted" />
      <div className="mt-6 h-12 w-3/4 rounded bg-muted" />
      <div className="mt-4 h-6 w-1/2 rounded bg-muted" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-muted" />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
