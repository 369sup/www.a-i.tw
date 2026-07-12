import Link from "next/link";
import { FolderGit2, Plus } from "lucide-react";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";
import {
  createRepositoryAction,
  updateRepositoryAction,
} from "@/src/presentation/workspace/actions";
import {
  buttonClass,
  EmptyState,
  fieldClass,
  PanelHeading,
  quietButtonClass,
  VisibilityIcon,
} from "@/src/presentation/workspace/ui";

type Params = Promise<Record<string, string | string[] | undefined>>;
export default async function RepositoriesSlot({
  searchParams,
}: {
  searchParams: Params;
}) {
  const query = await searchParams;
  const { identity, accounts, repositories, teams } =
    await getProductWorkspace();
  const session = await identity.currentPrincipal();
  const accountItems = await accounts.listAccounts();
  const accountId =
    typeof query.account === "string"
      ? query.account
      : accountItems[0]?.accountId;
  const account = accountItems.find((item) => item.accountId === accountId);
  const teamItems =
    account?.kind === "organization" ? await teams.list(account.accountId) : [];
  const items = (await repositories.listVisible(session?.principal)).filter(
    (item) => item.ownerAccountId === accountId,
  );
  const selectedId =
    typeof query.repository === "string"
      ? query.repository
      : items[0]?.repositoryId;
  const selected = items.find((item) => item.repositoryId === selectedId);
  if (!account)
    return (
      <EmptyState
        title="Choose an account"
        body="Select an account namespace before working with repositories."
      />
    );
  return (
    <div>
      <PanelHeading
        icon={<FolderGit2 className="size-4" />}
        title={`${account.handle} / repositories`}
      />
      <div className="grid min-h-[calc(100vh-7rem)] md:grid-cols-[17rem_minmax(0,1fr)]">
        <div className="border-b md:border-r md:border-b-0">
          <div className="p-2">
            {items.map((item) => (
              <Link
                key={item.repositoryId}
                href={`/workspace?account=${account.accountId}&repository=${item.repositoryId}`}
                className={`mb-1 block rounded-md px-3 py-3 text-sm ${selectedId === item.repositoryId ? "bg-muted" : "hover:bg-muted/60"}`}
              >
                <span className="flex items-center justify-between gap-2">
                  <strong className="truncate">{item.name}</strong>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <VisibilityIcon visibility={item.visibility} />
                    {item.visibility}
                  </span>
                </span>
                <span className="mt-1 block line-clamp-2 text-xs text-muted-foreground">
                  {item.description || "No description"}
                </span>
              </Link>
            ))}
          </div>
          <details className="border-t p-3">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium">
              <Plus className="size-4" />
              New repository
            </summary>
            <form action={createRepositoryAction} className="mt-3 space-y-3">
              <input
                type="hidden"
                name="ownerAccountId"
                value={account.accountId}
              />
              <input
                className={fieldClass}
                name="name"
                placeholder="repository-name"
                required
              />
              <textarea
                className={`${fieldClass} h-20 py-2`}
                name="description"
                placeholder="Description"
              />
              <select className={fieldClass} name="visibility">
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
              <button className={buttonClass} type="submit">
                <Plus className="size-4" />
                Create repository
              </button>
            </form>
          </details>
        </div>
        {selected ? (
          <article className="p-5 lg:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {selected.ownerHandle} /
                </p>
                <h1 className="mt-1 text-2xl font-semibold">{selected.name}</h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  {selected.description || "No description provided."}
                </p>
              </div>
              <span className="rounded-md border px-2 py-1 text-xs font-medium">
                {selected.status}
              </span>
            </div>
            <div className="mt-8 grid gap-5 xl:grid-cols-2">
              <form
                action={updateRepositoryAction}
                className="space-y-3 border-t pt-4"
              >
                <h2 className="text-sm font-semibold">Repository identity</h2>
                <input
                  type="hidden"
                  name="repositoryId"
                  value={selected.repositoryId}
                />
                <input type="hidden" name="intent" value="rename" />
                <input
                  className={fieldClass}
                  name="name"
                  defaultValue={selected.name}
                />
                <button className={quietButtonClass} type="submit">
                  Rename
                </button>
              </form>
              {teamItems.length > 0 ? (
                <form
                  action={updateRepositoryAction}
                  className="space-y-3 border-t pt-4 xl:col-span-2"
                >
                  <h2 className="text-sm font-semibold">Team access</h2>
                  <input
                    type="hidden"
                    name="repositoryId"
                    value={selected.repositoryId}
                  />
                  <input type="hidden" name="intent" value="grant-team" />
                  <select className={fieldClass} name="teamId">
                    {teamItems.map((team) => (
                      <option key={team.teamId} value={team.teamId}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                  <select className={fieldClass} name="role">
                    <option value="read">Read</option>
                    <option value="write">Write</option>
                    <option value="maintain">Maintain</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button className={quietButtonClass} type="submit">
                    Grant Team access
                  </button>
                </form>
              ) : null}
              <form
                action={updateRepositoryAction}
                className="space-y-3 border-t pt-4"
              >
                <h2 className="text-sm font-semibold">Visibility</h2>
                <input
                  type="hidden"
                  name="repositoryId"
                  value={selected.repositoryId}
                />
                <input type="hidden" name="intent" value="visibility" />
                <select
                  className={fieldClass}
                  name="visibility"
                  defaultValue={selected.visibility}
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
                <button className={quietButtonClass} type="submit">
                  Update visibility
                </button>
              </form>
              <form
                action={updateRepositoryAction}
                className="space-y-3 border-t pt-4 xl:col-span-2"
              >
                <h2 className="text-sm font-semibold">Lifecycle</h2>
                <input
                  type="hidden"
                  name="repositoryId"
                  value={selected.repositoryId}
                />
                <input type="hidden" name="intent" value="archive" />
                <input
                  type="hidden"
                  name="archived"
                  value={selected.status === "archived" ? "false" : "true"}
                />
                <p className="text-sm text-muted-foreground">
                  Archived repositories remain readable and reject configuration
                  changes.
                </p>
                <button className={quietButtonClass} type="submit">
                  {selected.status === "archived" ? "Unarchive" : "Archive"}{" "}
                  repository
                </button>
              </form>
            </div>
          </article>
        ) : (
          <EmptyState
            title="No repository selected"
            body="Create or select a repository in this account namespace."
          />
        )}
      </div>
    </div>
  );
}
