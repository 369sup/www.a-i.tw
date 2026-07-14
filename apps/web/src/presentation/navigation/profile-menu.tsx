"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Accessibility,
  Building2,
  Check,
  CircleUserRound,
  ExternalLink,
  FileText,
  LogOut,
  Palette,
  Puzzle,
  Settings,
} from "lucide-react";
import { Button } from "@a-i/shadcn/ui/button";
import { AccountAvatar } from "./account-avatar";

type ProfileMenuProps = Readonly<{
  currentHandle: string;
  currentDisplayName: string;
}>;

const menuLinks = [
  { label: "Profile", href: "/", icon: CircleUserRound },
  { label: "Repositories", href: "/repositories", icon: FileText },
  { label: "Organizations", href: "/settings/organizations", icon: Building2 },
  { label: "Enterprises", href: "/settings/enterprises", icon: Building2 },
  { label: "GitHub Apps", href: "/settings/apps", icon: Puzzle },
] as const;

export function ProfileMenu({
  currentHandle,
  currentDisplayName,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        className="rounded-full"
        onClick={() => setOpen((value) => !value)}
        size="icon"
        variant="ghost"
      >
        <AccountAvatar label={currentHandle} />
      </Button>
      {open ? (
        <div
          className="absolute right-0 z-30 mt-2 w-64 overflow-hidden rounded-lg border bg-background p-2 shadow-xl"
          role="menu"
        >
          <div className="flex items-center gap-2 border-b px-2 pb-3 pt-1">
            <AccountAvatar label={currentHandle} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {currentDisplayName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                @{currentHandle}
              </p>
            </div>
            <Button
              aria-label="Switch account"
              className="ml-auto"
              size="icon-sm"
              title="Switch account"
              variant="ghost"
            >
              <ExternalLink className="size-4" />
            </Button>
          </div>

          <Button className="w-full justify-start" variant="ghost">
            <span className="flex size-5 items-center justify-center rounded-full border text-xs">
              ●
            </span>
            Set status
          </Button>

          <nav className="border-t py-2" aria-label="Profile navigation">
            {menuLinks.map(({ label, href, icon: Icon }) => (
              <Link
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
                href={href}
                key={label}
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                <Icon className="size-4 text-muted-foreground" />
                {label}
              </Link>
            ))}
          </nav>

          <nav className="border-t py-2" aria-label="Account settings">
            <Link
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
              href="/settings/organizations"
              role="menuitem"
            >
              <Settings className="size-4 text-muted-foreground" />
              Settings
            </Link>
            <Button className="w-full justify-start" variant="ghost">
              <Check className="size-4 text-muted-foreground" />
              Feature preview
              <span className="ml-auto rounded-full border px-1.5 py-0.5 text-[10px]">
                New
              </span>
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <Palette className="size-4 text-muted-foreground" />
              Appearance
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <Accessibility className="size-4 text-muted-foreground" />
              Accessibility
            </Button>
          </nav>

          <div className="border-t pt-2">
            <Link
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
              href="/logout"
              role="menuitem"
            >
              <LogOut className="size-4 text-muted-foreground" />
              Sign out
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
