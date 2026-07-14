import Link from "next/link";
import { Bell, ChevronDown, CircleDot, Menu, Plus } from "lucide-react";
import { Button } from "@a-i/shadcn/ui/button";
import type { NavigationAccount } from "./navigation-models";
import { ProductSearch } from "./product-search";
import { ProfileMenu } from "./profile-menu";
import { ScopeSwitcher } from "./scope-switcher";

type GlobalHeaderProps = Readonly<{
  accounts: readonly NavigationAccount[];
  activeAccountId?: string;
  currentHandle: string;
  currentDisplayName: string;
}>;

export function GlobalHeader({
  accounts,
  activeAccountId,
  currentHandle,
  currentDisplayName,
}: GlobalHeaderProps) {
  return (
    <header className="flex h-15 items-center justify-between border-b bg-background px-4 lg:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <Button aria-label="Open navigation" size="icon-sm" variant="outline">
          <Menu className="size-4" />
        </Button>
        <Link className="inline-flex items-center gap-2" href="/">
          <CircleDot className="size-7" />
          <span className="hidden text-sm font-semibold sm:inline">
            Dashboard
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-1.5">
        <ProductSearch />
        <ScopeSwitcher
          accounts={accounts}
          activeAccountId={activeAccountId}
          currentHandle={currentHandle}
        />
        <Button asChild size="icon-sm" variant="outline">
          <Link
            aria-label="Notifications"
            href="/notifications"
            title="Notifications"
          >
            <Bell className="size-4" />
          </Link>
        </Button>
        <Button
          aria-label="Create new resource"
          className="hidden sm:inline-flex"
          size="sm"
          variant="outline"
        >
          <Plus className="size-4" />
          <ChevronDown className="size-3" />
        </Button>
        <ProfileMenu
          currentDisplayName={currentDisplayName}
          currentHandle={currentHandle}
        />
      </div>
    </header>
  );
}
