import type { ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  Building2,
  Check,
  ChevronDown,
  CircleDot,
  FolderGit2,
  LogOut,
  Settings,
} from "lucide-react";
import { InitialAvatar } from "@a-i/shadcn/custom/initial-avatar";
import { Button } from "@a-i/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@a-i/shadcn/ui/dropdown-menu";
import { getProductComposition } from "@/src/composition/product-composition";
import { ProductSearch } from "@/src/modules/engagement/social-discovery/search-discovery/public-api";
import { requireBrowserAuthentication } from "@/src/modules/platform-governance/authentication-identity/authentication-security/public-api";

export default async function ConsoleLayout({
  children,
}: {
  children: ReactNode;
}) {
  const composition = getProductComposition();
  const authentication = await requireBrowserAuthentication(
    composition.identity,
  );
  const accounts = await composition.accounts.listAccounts();
  const personalAccount = accounts.find(
    (account) =>
      "personalPrincipalId" in account &&
      account.personalPrincipalId === authentication.principalId,
  );
  const activeAccount = personalAccount ?? accounts[0];
  const currentHandle = personalAccount?.handle ?? authentication.principalId;
  const currentDisplayName =
    personalAccount?.displayName ?? authentication.principalId;

  return (
    <>
      <header className="flex h-15 items-center justify-between border-b bg-background px-4 lg:px-5">
        <Link className="inline-flex items-center gap-2" href="/dashboard">
          <CircleDot className="size-7" />
          <span className="hidden text-sm font-semibold sm:inline">a-i.tw</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <ProductSearch endpoint="/api/product-search" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                {activeAccount?.kind === "organization" ? (
                  <Building2 data-icon="inline-start" />
                ) : (
                  <InitialAvatar label={currentHandle} size="sm" />
                )}
                <span className="max-w-32 truncate">
                  {activeAccount?.displayName ?? currentHandle}
                </span>
                <ChevronDown data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Account scope</DropdownMenuLabel>
              <DropdownMenuGroup>
                {accounts.map((account) => (
                  <DropdownMenuItem asChild key={account.accountId}>
                    <Link href={`/repositories?account=${account.accountId}`}>
                      {account.kind === "organization" ? (
                        <Building2 />
                      ) : (
                        <InitialAvatar label={account.handle} size="sm" />
                      )}
                      <span className="min-w-0 flex-1 truncate">
                        {account.displayName}
                      </span>
                      {account.accountId === activeAccount?.accountId ? (
                        <Check />
                      ) : null}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/settings/organizations">
                    <Settings />
                    Manage organizations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/organizations/new">
                    <Building2 />
                    Create organization
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild size="icon-sm" variant="outline">
            <Link
              aria-label="Notifications"
              href="/notifications"
              title="Notifications"
            >
              <Bell />
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open profile menu"
                size="icon"
                variant="ghost"
              >
                <InitialAvatar label={currentHandle} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <span className="block truncate">{currentDisplayName}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  @{currentHandle}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <CircleDot />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/repositories">
                    <FolderGit2 />
                    Repositories
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/logout">
                    <LogOut />
                    Sign out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {children}
    </>
  );
}
