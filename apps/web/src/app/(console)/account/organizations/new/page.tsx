import Link from "next/link";
import { createAccountAction } from "@/src/app/(console)/repositories/_actions/actions";
import { requireAuthentication } from "@/src/presentation/authentication/browser-session";

export default async function NewOrganizationPage() {
  await requireAuthentication();
  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <p className="text-sm text-muted-foreground">Account</p>
      <h1 className="text-3xl font-semibold">Create an organization</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Organization 是共享資源與 membership scope，不是新的登入 Actor。
      </p>
      <form
        action={createAccountAction}
        className="mt-8 space-y-5 rounded-lg border p-6"
      >
        <input type="hidden" name="kind" value="organization" />
        <label className="block text-sm font-medium">
          Organization name
          <input
            className="mt-1 w-full rounded-md border px-3 py-2"
            name="displayName"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Organization handle
          <input
            className="mt-1 w-full rounded-md border px-3 py-2"
            name="handle"
            required
          />
        </label>
        <div className="flex gap-3">
          <button className="rounded-md bg-foreground px-4 py-2 text-sm text-background">
            Create organization
          </button>
          <Link
            className="rounded-md border px-4 py-2 text-sm"
            href="/settings/organizations"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
