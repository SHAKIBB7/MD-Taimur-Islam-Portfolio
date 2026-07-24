"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types/content";
import { PROJECT_CATEGORIES, PROJECT_CATEGORY_LABELS } from "@/types/content";
import { ProjectCard } from "@/features/projects/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

type Filter = "ALL" | ProjectCategory;

/**
 * Client-side project filtering + search. Categories with no projects still
 * appear as filters and render a friendly empty state, so the UI adapts
 * automatically as new work is added to the database.
 */
export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (filter !== "ALL" && p.category !== filter) return false;
      if (!q) return true;
      const haystack = [p.title, p.tagline, p.description, ...p.technologies, ...p.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, filter, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {(["ALL", ...PROJECT_CATEGORIES] as Filter[]).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                filter === c
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {c === "ALL" ? "All" : PROJECT_CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
        <label className="sm:w-64">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full rounded-full border border-card-border bg-card px-4 py-2 text-sm placeholder:text-muted-foreground focus:border-accent"
          />
        </label>
      </div>

      {filtered.length > 0 ? (
        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title={
            filter === "ALL"
              ? "No projects match your search"
              : `No ${PROJECT_CATEGORY_LABELS[filter as ProjectCategory]} projects yet`
          }
          description={
            query
              ? "Try a different search term or clear the filter."
              : "New work in this category will appear here automatically once added."
          }
        />
      )}
    </div>
  );
}
