import Link from "next/link";
import { Bell, ChevronDown, Github, Menu, Plus, Search } from "lucide-react";
import type { AccountRefV1 } from "@/src/modules/account/src/contracts/public";
import { ProfileMenu } from "./profile-menu";
import { ScopeSwitcher } from "./scope-switcher";

type GlobalHeaderProps = Readonly<{
  accounts: readonly AccountRefV1[];
  activeAccountId?: string;
  currentHandle: string;
  currentDisplayName: string;
}>;

export function GlobalHeader({ accounts, activeAccountId, currentHandle, currentDisplayName }: GlobalHeaderProps) {
  return (
    <header className="flex h-15 items-center justify-between border-b bg-background px-4 lg:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <button aria-label="Open navigation" className="inline-flex size-8 items-center justify-center rounded-md border hover:bg-muted" type="button">
          <Menu className="size-4" />
        </button>
        <Link className="inline-flex items-center gap-2" href="/">
          <Github className="size-7" />
          <span className="hidden text-sm font-semibold sm:inline">Dashboard</span>
        </Link>
      </div>
      <div className="flex items-center gap-1.5">
        <label className="relative hidden lg:block" htmlFor="global-search">
          <Search className="pointer-events-none absolute left-3 top-2 size-4 text-muted-foreground" />
          <input className="h-8 w-48 rounded-md border bg-background pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-ring xl:w-56" id="global-search" placeholder="Type / to search" />
        </label>
        <ScopeSwitcher accounts={accounts} activeAccountId={activeAccountId} currentHandle={currentHandle} />
        <button aria-label="Notifications" className="relative inline-flex size-8 items-center justify-center rounded-md border hover:bg-muted" title="Notifications" type="button">
          <Bell className="size-4" />
          <span className="absolute right-1 top-1 size-2 rounded-full bg-blue-600 ring-2 ring-background" />
        </button>
        <div className="relative hidden sm:block">
          <button aria-label="Create new resource" className="inline-flex h-8 items-center gap-1 rounded-md border px-2 text-sm hover:bg-muted" type="button">
            <Plus className="size-4" />
            <ChevronDown className="size-3" />
          </button>
        </div>
        <ProfileMenu currentDisplayName={currentDisplayName} currentHandle={currentHandle} />
      </div>
    </header>
  );
}
