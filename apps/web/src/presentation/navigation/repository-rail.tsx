"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FolderGit2, Plus, Search } from "lucide-react";
import type { NavigationRepository } from "./navigation-models";

type RepositoryRailProps = Readonly<{
  repositories: readonly NavigationRepository[];
  activeAccountId?: string;
}>;

export function RepositoryRail({
  repositories,
  activeAccountId,
}: RepositoryRailProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return repositories;
    return repositories.filter((repository) =>
      `${repository.ownerHandle}/${repository.name}`
        .toLowerCase()
        .includes(value),
    );
  }, [query, repositories]);
  return (
    <aside
      aria-label="Repository navigation"
      className="w-full border-b bg-background lg:min-h-[calc(100vh-3.75rem)] lg:w-80 lg:border-b-0 lg:border-r"
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Top repositories
          </h2>
          <Link
            className="inline-flex h-8 items-center gap-1 rounded-md bg-emerald-600 px-2.5 text-xs font-semibold text-white hover:bg-emerald-700"
            href={
              activeAccountId
                ? `/workspace?account=${activeAccountId}`
                : "/workspace"
            }
          >
            <Plus className="size-3.5" />
            New
          </Link>
        </div>
        <label
          className="relative mt-3 block"
          htmlFor="dashboard-repository-search"
        >
          <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            id="dashboard-repository-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a repository..."
            value={query}
          />
        </label>
        <nav className="mt-3 space-y-1" aria-label="Top repositories">
          {filtered.map((repository) => (
            <Link
              className="flex items-center gap-2 rounded-md px-1.5 py-1.5 text-sm hover:bg-muted"
              href={`/workspace?account=${repository.ownerAccountId}&repository=${repository.repositoryId}`}
              key={repository.repositoryId}
            >
              <FolderGit2 className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate">
                {repository.ownerHandle}/{repository.name}
              </span>
            </Link>
          ))}
          {filtered.length === 0 ? (
            <p className="px-1.5 py-4 text-sm text-muted-foreground">
              No repositories found.
            </p>
          ) : null}
        </nav>
      </div>
    </aside>
  );
}
