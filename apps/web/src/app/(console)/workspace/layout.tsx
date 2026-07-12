import type { ReactNode } from "react";
import type { Route } from "next";
import { ShieldCheck } from "lucide-react";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { logoutAction } from "@/src/presentation/auth/actions";
import { requireAuthentication } from "@/src/server/auth/session";

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
  return (
    <main className="min-h-screen bg-muted/30">
      <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-foreground text-background">
            <ShieldCheck className="size-4" />
          </span>
          <strong className="text-sm">a-i workspace</strong>
        </div>
        <div className="flex items-center gap-3">
          <Link
            className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
            href={"/docs" as Route}
          >
            <BookOpen className="size-3.5" />
            Docs
          </Link>
          <span className="text-xs text-muted-foreground">
            @{authentication.principal.handle}
          </span>
          <form action={logoutAction}>
            <button
              className="text-xs font-medium hover:underline"
              type="submit"
            >
              Logout
            </button>
          </form>
        </div>
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
