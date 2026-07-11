import Link from "next/link";
import { Plus, UserRound } from "lucide-react";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";
import {
  createAccountAction,
  selectPrincipal,
} from "@/src/presentation/workspace/actions";
import {
  buttonClass,
  fieldClass,
  KindIcon,
  PanelHeading,
  quietButtonClass,
} from "@/src/presentation/workspace/ui";

type Params = Promise<Record<string, string | string[] | undefined>>;
export default async function AccountsSlot({
  searchParams,
}: {
  searchParams: Params;
}) {
  const query = await searchParams;
  const { identity, accounts } = await getProductWorkspace();
  const [session, principals, items] = await Promise.all([
    identity.currentPrincipal(),
    identity.listPrincipals(),
    accounts.listAccounts(),
  ]);
  const selected =
    typeof query.account === "string" ? query.account : items[0]?.accountId;
  return (
    <div>
      <PanelHeading icon={<UserRound className="size-4" />} title="Accounts" />
      <div className="border-b p-3">
        <form action={selectPrincipal} className="space-y-2">
          <label
            className="text-xs font-medium text-muted-foreground"
            htmlFor="principal"
          >
            Acting principal
          </label>
          <div className="flex gap-2">
            <select
              id="principal"
              name="principalId"
              defaultValue={session?.principal.principalId}
              className={fieldClass}
            >
              {principals.map((item) => (
                <option key={item.principalId} value={item.principalId}>
                  {item.displayName}
                </option>
              ))}
            </select>
            <button className={quietButtonClass} type="submit">
              Switch
            </button>
          </div>
        </form>
      </div>
      <nav className="p-2" aria-label="Accounts">
        {items.map((account) => (
          <Link
            key={account.accountId}
            href={`/workspace?account=${account.accountId}`}
            className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${selected === account.accountId ? "bg-foreground text-background" : "hover:bg-muted"}`}
          >
            <KindIcon kind={account.kind} />
            <span className="min-w-0">
              <span className="block truncate font-medium">
                {account.displayName}
              </span>
              <span
                className={`block truncate text-xs ${selected === account.accountId ? "text-background/70" : "text-muted-foreground"}`}
              >
                @{account.handle}
              </span>
            </span>
          </Link>
        ))}
      </nav>
      <details className="border-t p-3">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium">
          <Plus className="size-4" />
          New account
        </summary>
        <form action={createAccountAction} className="mt-3 space-y-3">
          <input
            className={fieldClass}
            name="displayName"
            placeholder="Display name"
            required
          />
          <input
            className={fieldClass}
            name="handle"
            placeholder="account-handle"
            required
          />
          <select className={fieldClass} name="kind">
            <option value="personal">Personal</option>
            <option value="organization">Organization</option>
          </select>
          <button className={buttonClass} type="submit">
            <Plus className="size-4" />
            Create account
          </button>
        </form>
      </details>
    </div>
  );
}
