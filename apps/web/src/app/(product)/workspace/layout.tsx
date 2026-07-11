import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

export default function WorkspaceLayout({
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
  return (
    <main className="min-h-screen bg-muted/30">
      <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-foreground text-background">
            <ShieldCheck className="size-4" />
          </span>
          <strong className="text-sm">a-i workspace</strong>
        </div>
        <span className="text-xs text-muted-foreground">
          In-memory product model
        </span>
      </header>
      {children}
      <div className="grid min-h-[calc(100vh-3.5rem)] border-b bg-background lg:grid-cols-[15rem_minmax(24rem,1fr)_22rem]">
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
