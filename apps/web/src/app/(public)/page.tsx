import Link from "next/link";
import { FolderGit2, LogIn } from "lucide-react";
import { currentAuthentication } from "@/src/server/auth/session";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";
import {
  GlobalHeader,
} from "@/src/presentation/navigation/global-header";
import { RepositoryRail } from "@/src/presentation/navigation/repository-rail";

export default async function Home() {
  const authentication = await currentAuthentication();
  if (!authentication)
    return (
      <main className="min-h-screen bg-muted/30">
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
          <strong className="text-lg">a-i.tw</strong>
          <Link
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm text-background"
            href="/login"
          >
            <LogIn className="size-4" />
            Login
          </Link>
        </header>
        <section className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-sm text-muted-foreground">
            Collaborative software workspace
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-6xl">
            Build, organize, and govern work from one home.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            登入後可在 Personal 與 Organization scope 間切換，並查看你可存取的
            repositories。
          </p>
        </section>
      </main>
    );

  const { accounts, repositories } = getProductWorkspace();
  const [accountItems, repositoryItems] = await Promise.all([
    accounts.listAccounts(),
    repositories.listVisible(authentication.principal),
  ]);
  const activeAccount = accountItems.find(
    (account) =>
      account.kind === "personal" &&
      account.handle === authentication.principal.handle,
  );
  return (
    <main className="min-h-screen bg-muted/30">
      <GlobalHeader
        accounts={accountItems}
        activeAccountId={activeAccount?.accountId}
        currentDisplayName={authentication.principal.displayName}
        currentHandle={authentication.principal.handle}
      />
      <div className="flex flex-col lg:flex-row">
        <RepositoryRail
          activeAccountId={activeAccount?.accountId}
          repositories={repositoryItems}
        />
        <section className="min-w-0 flex-1 px-4 py-6 lg:px-12 xl:px-20">
          <div className="mx-auto max-w-4xl">
            <article className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Workspace update
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold">Welcome to your dashboard</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Organize accounts, repositories, and collaborative work from one place.
                  </p>
                </div>
                <Link className="rounded-md px-2 py-1 text-muted-foreground hover:bg-muted" href="/">
                  ×
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700" href={activeAccount ? `/workspace?account=${activeAccount.accountId}` : "/workspace"}>
                  Open workspace
                </Link>
                <Link className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted" href="/settings/organizations">
                  Manage organizations
                </Link>
              </div>
            </article>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Home</h2>
                <p className="mt-1 text-sm text-muted-foreground">Your recent workspace resources</p>
              </div>
              <Link className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/workspace">
                View all
              </Link>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border bg-background">
              {repositoryItems.length > 0 ? repositoryItems.map((repository) => (
                <Link className="flex items-center gap-3 border-b p-4 last:border-b-0 hover:bg-muted" href={`/workspace?account=${repository.ownerAccountId}&repository=${repository.repositoryId}`} key={repository.repositoryId}>
                  <FolderGit2 className="size-4 text-muted-foreground" />
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-sm">{repository.ownerHandle}/{repository.name}</strong>
                    <span className="block truncate text-sm text-muted-foreground">{repository.description || "No description"}</span>
                  </span>
                  <span className="rounded-full border px-2 py-0.5 text-xs">{repository.visibility}</span>
                </Link>
              )) : <p className="p-6 text-sm text-muted-foreground">No repositories yet.</p>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
