import Link from "next/link";
import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { getProductComposition } from "@/src/composition/product-composition";

export default async function OrganizationsSettingsPage() {
  await requireConsoleAuthentication();
  const organizations = (
    await getProductComposition().accounts.listAccounts()
  ).filter((account) => account.kind === "organization");
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Settings</p>
          <h1 className="text-3xl font-semibold">Organizations</h1>
        </div>
        <Link
          className="rounded-md bg-foreground px-4 py-2 text-sm text-background"
          href="/account/organizations/new"
        >
          New organization
        </Link>
      </div>
      <div className="mt-8 divide-y rounded-lg border">
        {organizations.map((organization) => (
          <Link
            key={organization.accountId}
            className="block p-4 hover:bg-muted"
            href={`/repositories?account=${organization.accountId}`}
          >
            <strong className="block">{organization.displayName}</strong>
            <span className="text-sm text-muted-foreground">
              @{organization.handle}
            </span>
          </Link>
        ))}
      </div>
      <Link
        className="mt-8 inline-block text-sm font-medium"
        href="/settings/enterprises"
      >
        View enterprises
      </Link>
    </main>
  );
}
