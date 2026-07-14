"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Check, ChevronDown, Plus, X } from "lucide-react";
import { Button } from "@a-i/shadcn/ui/button";
import type { NavigationAccount } from "./navigation-models";
import { AccountAvatar } from "./account-avatar";

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
      <Button
        aria-expanded={open}
        aria-haspopup="dialog"
        className="max-w-40 justify-start px-1"
        onClick={() => setOpen((value) => !value)}
        variant="ghost"
      >
        {active?.kind === "organization" ? (
          <Building2 className="size-4" />
        ) : (
          <AccountAvatar label={currentHandle} size="sm" />
        )}
        <span className="min-w-0 flex-1 truncate text-sm">
          {active?.displayName ?? currentHandle}
        </span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </Button>
      {open ? (
        <div
          className="absolute left-0 top-12 z-30 w-80 rounded-lg border bg-background p-3 shadow-xl"
          role="dialog"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">
              Go to organization dashboard
            </p>
            <Button
              aria-label="Close organization switcher"
              onClick={() => setOpen(false)}
              size="icon-sm"
              variant="ghost"
            >
              <X className="size-4" />
            </Button>
          </div>
          <nav className="mt-3 space-y-1" aria-label="Account scopes">
            {accounts.map((account) => (
              <Link
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
                href={`/repositories?account=${account.accountId}`}
                key={account.accountId}
                onClick={() => setOpen(false)}
              >
                {account.kind === "organization" ? (
                  <Building2 className="size-4 text-muted-foreground" />
                ) : (
                  <AccountAvatar label={account.handle} size="sm" />
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
            <Button asChild className="w-full" variant="outline">
              <Link
                href="/settings/organizations"
                onClick={() => setOpen(false)}
              >
                <Building2 className="size-4" />
                Manage organizations
              </Link>
            </Button>
            <Button asChild className="w-full" variant="outline">
              <Link
                href="/account/organizations/new"
                onClick={() => setOpen(false)}
              >
                <Plus className="size-4" />
                Create organization
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
