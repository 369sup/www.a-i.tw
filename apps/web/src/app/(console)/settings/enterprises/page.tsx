import Link from "next/link";
import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";

export default async function EnterprisesSettingsPage() {
  await requireConsoleAuthentication();
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <p className="text-sm text-muted-foreground">Settings</p>
      <h1 className="text-3xl font-semibold">Enterprises</h1>
      <section className="mt-8 rounded-lg border border-dashed p-10 text-center">
        <h2 className="font-semibold">No enterprise accounts</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enterprise governance 與 Enterprise scope 目前仍是 Planned；不把
          Organization 誤呈現為 Enterprise。
        </p>
      </section>
      <Link
        className="mt-8 inline-block text-sm font-medium"
        href="/settings/organizations"
      >
        Back to organizations
      </Link>
    </main>
  );
}
