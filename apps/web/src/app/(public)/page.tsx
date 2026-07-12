import Link from "next/link";
import { FolderGit2, LogIn } from "lucide-react";
import { currentAuthentication } from "@/src/server/auth/session";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";
import {
  AccountRepositoryMenu,
  NotificationInboxButton,
} from "@/src/presentation/navigation/account-repository-menu";

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
  return (
    <main className="min-h-screen bg-muted/30">
      <header className="flex h-16 items-center justify-between border-b bg-background px-6">
        <Link className="text-lg font-semibold" href="/">
          a-i.tw
        </Link>
        <div className="flex items-center gap-2">
          <NotificationInboxButton />
          <AccountRepositoryMenu
            accounts={accountItems}
            currentDisplayName={authentication.principal.displayName}
            currentHandle={authentication.principal.handle}
            repositories={repositoryItems}
          />
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Top repositories</h1>
          <Link
            className="rounded-md bg-foreground px-3 py-2 text-sm text-background"
            href="/workspace"
          >
            Open workspace
          </Link>
        </div>
        <div className="mt-5 overflow-hidden rounded-lg border bg-background">
          {repositoryItems.map((repository) => (
            <Link
              key={repository.repositoryId}
              className="flex items-start gap-3 border-b p-4 last:border-b-0 hover:bg-muted"
              href={`/workspace?account=${repository.ownerAccountId}&repository=${repository.repositoryId}`}
            >
              <FolderGit2 className="mt-0.5 size-4" />
              <span>
                <strong className="block text-sm">
                  {repository.ownerHandle} / {repository.name}
                </strong>
                <span className="text-sm text-muted-foreground">
                  {repository.description}
                </span>
              </span>
              <span className="ml-auto rounded-full border px-2 py-0.5 text-xs">
                {repository.visibility}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
