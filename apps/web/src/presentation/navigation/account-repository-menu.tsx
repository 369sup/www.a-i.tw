"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell,
  Building2,
  ChevronDown,
  FolderGit2,
  Plus,
  Search,
  UserRound,
} from "lucide-react";
import type { AccountRefV1 } from "@/src/modules/account/src/contracts/public";
import type { RepositoryRefV1 } from "@/src/modules/repository/src/contracts/public";

type AccountRepositoryMenuProps = Readonly<{
  accounts: readonly AccountRefV1[];
  repositories: readonly RepositoryRefV1[];
  currentHandle: string;
  currentDisplayName: string;
}>;

function Avatar({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-semibold"
    >
      {label.slice(0, 1).toUpperCase()}
    </span>
  );
}

export function NotificationInboxButton() {
  return (
    <button
      aria-label="Notifications"
      className="relative inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      title="Notifications"
      type="button"
    >
      <Bell className="size-4" />
      <span
        aria-label="Unread notifications"
        className="absolute right-1 top-1 size-2 rounded-full bg-blue-600 ring-2 ring-background"
      />
    </button>
  );
}

export function AccountRepositoryMenu({
  accounts,
  repositories,
  currentHandle,
  currentDisplayName,
}: AccountRepositoryMenuProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const personal = accounts.find(
    (account) => account.kind === "personal" && account.handle === currentHandle,
  );
  const filteredRepositories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return repositories;
    return repositories.filter((repository) =>
      `${repository.ownerHandle}/${repository.name}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, repositories]);

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 rounded-md p-1.5 text-sm hover:bg-muted"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <Avatar label={currentHandle} />
        <span className="hidden max-w-32 truncate text-left sm:block">
          {currentDisplayName}
        </span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>
      {open ? (
        <div
          aria-label="Account and repository menu"
          className="absolute right-0 z-20 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-lg border bg-background p-2 shadow-lg"
          role="dialog"
        >
          <div className="flex items-center gap-2 border-b px-2 pb-3 pt-1">
            <Avatar label={currentHandle} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{currentDisplayName}</p>
              <p className="truncate text-xs text-muted-foreground">@{currentHandle}</p>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 pb-2 pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Top repositories
            </p>
            <Link
              className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
              href={personal ? `/workspace?account=${personal.accountId}` : "/workspace"}
              onClick={() => setOpen(false)}
            >
              <Plus className="size-3.5" />
              New
            </Link>
          </div>

          <label className="relative block px-1" htmlFor="repository-search">
            <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <input
              className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              id="repository-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a repository..."
              value={query}
            />
          </label>

          <nav className="mt-2 max-h-56 overflow-y-auto" aria-label="Repositories">
            {filteredRepositories.length > 0 ? (
              filteredRepositories.map((repository) => (
                <Link
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
                  href={`/workspace?account=${repository.ownerAccountId}&repository=${repository.repositoryId}`}
                  key={repository.repositoryId}
                  onClick={() => setOpen(false)}
                >
                  <FolderGit2 className="size-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 truncate">
                    {repository.ownerHandle}/{repository.name}
                  </span>
                </Link>
              ))
            ) : (
              <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                No repositories found.
              </p>
            )}
          </nav>

          <div className="mt-2 border-t pt-2">
            {accounts.map((account) => (
              <Link
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
                href={`/workspace?account=${account.accountId}`}
                key={account.accountId}
                onClick={() => setOpen(false)}
              >
                {account.kind === "organization" ? (
                  <Building2 className="size-4 text-muted-foreground" />
                ) : (
                  <UserRound className="size-4 text-muted-foreground" />
                )}
                <span className="truncate">{account.displayName}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
