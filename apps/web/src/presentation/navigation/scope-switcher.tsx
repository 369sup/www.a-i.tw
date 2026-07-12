"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Check, ChevronDown, Plus, X } from "lucide-react";
import type { NavigationAccount } from "./navigation-models";
import { UserAvatar } from "./user-avatar";

type ScopeSwitcherProps = Readonly<{
  accounts: readonly NavigationAccount[];
  activeAccountId?: string;
  currentHandle: string;
}>;

export function ScopeSwitcher({
  accounts,
  activeAccountId,
  currentHandle,
}: ScopeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const active = accounts.find(
    (account) => account.accountId === activeAccountId,
  );
  return (
    <div className="relative">
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex max-w-40 items-center gap-2 rounded-md px-1 py-2 text-left hover:bg-muted"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {active?.kind === "organization" ? (
          <Building2 className="size-4" />
        ) : (
          <UserAvatar label={currentHandle} size="sm" />
        )}
        <span className="min-w-0 flex-1 truncate text-sm">
          {active?.displayName ?? currentHandle}
        </span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>
      {open ? (
        <div
          className="absolute left-0 top-12 z-30 w-80 rounded-lg border bg-background p-3 shadow-xl"
          role="dialog"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">
              Go to organization dashboard
            </p>
            <button
              aria-label="Close organization switcher"
              className="rounded-md p-1 hover:bg-muted"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
          <nav className="mt-3 space-y-1" aria-label="Account scopes">
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
                  <UserAvatar label={account.handle} size="sm" />
                )}
                <span className="min-w-0 flex-1 truncate">
                  {account.displayName}
                </span>
                {account.accountId === activeAccountId ? (
                  <Check className="size-4" />
                ) : null}
              </Link>
            ))}
          </nav>
          <div className="mt-3 space-y-2 border-t pt-3">
            <Link
              className="flex h-9 items-center justify-center gap-2 rounded-md border text-sm font-medium hover:bg-muted"
              href="/settings/organizations"
              onClick={() => setOpen(false)}
            >
              <Building2 className="size-4" />
              Manage organizations
            </Link>
            <Link
              className="flex h-9 items-center justify-center gap-2 rounded-md border text-sm font-medium hover:bg-muted"
              href="/account/organizations/new"
              onClick={() => setOpen(false)}
            >
              <Plus className="size-4" />
              Create organization
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
