import type { ReactNode } from "react";
import { requireAuthentication } from "@/src/server/auth/session";
import { GlobalHeader } from "@/src/presentation/navigation/global-header";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";

export default async function WorkspaceLayout({
  children,
  accounts,
  repositories,
  inspector,
}: {
  children: ReactNode;
  accounts: ReactNode;
  repositories: ReactNode;
  inspector: ReactNode;
}) {
  const authentication = await requireAuthentication();
  const workspace = getProductWorkspace();
  const accountItems = await workspace.accounts.listAccounts();
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
      {children}
      <div className="grid min-h-[calc(100vh-3.75rem)] border-b bg-background lg:grid-cols-[15rem_minmax(24rem,1fr)_22rem]">
        <aside
          aria-label="Account rail"
          className="border-b lg:border-r lg:border-b-0"
        >
          {accounts}
        </aside>
        <section
          aria-label="Repository workspace"
          className="border-b lg:border-r lg:border-b-0"
        >
          {repositories}
        </section>
        <aside aria-label="Context inspector">{inspector}</aside>
      </div>
    </main>
  );
}
