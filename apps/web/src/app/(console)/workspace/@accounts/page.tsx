import Link from "next/link";
import { Plus, UserRound } from "lucide-react";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";
import {
  createAccountAction,
  selectPrincipal,
  updateTeamAction,
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
  const { identity, accounts, teams } = await getProductWorkspace();
  const [session, principals, items] = await Promise.all([
    identity.currentPrincipal(),
    identity.listPrincipals(),
    accounts.listAccounts(),
  ]);
  const selected =
    typeof query.account === "string" ? query.account : items[0]?.accountId;
  const selectedAccount = items.find((item) => item.accountId === selected);
  const teamItems =
    selectedAccount?.kind === "organization"
      ? await teams.list(selectedAccount.accountId)
      : [];
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
      {selectedAccount?.kind === "organization" ? (
        <section className="border-t p-3">
          <h2 className="text-sm font-semibold">Teams</h2>
          <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
            {teamItems.map((team) => (
              <li key={team.teamId}>
                <strong className="text-foreground">{team.name}</strong> ·{" "}
                {team.memberPrincipalIds.length} members
              </li>
            ))}
          </ul>
          <form action={updateTeamAction} className="mt-3 space-y-2">
            <input type="hidden" name="intent" value="create" />
            <input
              type="hidden"
              name="accountId"
              value={selectedAccount.accountId}
            />
            <input
              className={fieldClass}
              name="name"
              placeholder="team-name"
              required
            />
            <button className={quietButtonClass} type="submit">
              Create Team
            </button>
          </form>
          {teamItems.length > 0 ? (
            <form action={updateTeamAction} className="mt-3 space-y-2">
              <input type="hidden" name="intent" value="add-member" />
              <select className={fieldClass} name="teamId">
                {teamItems.map((team) => (
                  <option key={team.teamId} value={team.teamId}>
                    {team.name}
                  </option>
                ))}
              </select>
              <select className={fieldClass} name="principalId">
                {principals.map((principal) => (
                  <option
                    key={principal.principalId}
                    value={principal.principalId}
                  >
                    {principal.displayName}
                  </option>
                ))}
              </select>
              <button className={quietButtonClass} type="submit">
                Add active member
              </button>
            </form>
          ) : null}
        </section>
      ) : null}
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
