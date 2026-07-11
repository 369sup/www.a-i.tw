import { ShieldCheck, UserPlus } from "lucide-react";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";
import { updateRepositoryAction } from "@/src/presentation/workspace/actions";
import {
  buttonClass,
  EmptyState,
  fieldClass,
  PanelHeading,
  StatusMark,
} from "@/src/presentation/workspace/ui";

type Params = Promise<Record<string, string | string[] | undefined>>;
export default async function InspectorSlot({
  searchParams,
}: {
  searchParams: Params;
}) {
  const query = await searchParams;
  const { identity, repositories } = await getProductWorkspace();
  const [session, principals] = await Promise.all([
    identity.currentPrincipal(),
    identity.listPrincipals(),
  ]);
  const repositoryId =
    typeof query.repository === "string" ? query.repository : undefined;
  const result = repositoryId
    ? await repositories.get(repositoryId, session?.principal)
    : undefined;
  return (
    <div>
      <PanelHeading
        icon={<ShieldCheck className="size-4" />}
        title="Context inspector"
      />
      <div className="border-b p-4">
        <p className="text-xs font-medium uppercase text-muted-foreground">
          Principal
        </p>
        <p className="mt-2 text-sm font-semibold">
          {session?.principal.displayName ?? "Anonymous"}
        </p>
        <p className="text-xs text-muted-foreground">
          {session ? `@${session.principal.handle}` : "No active session"}
        </p>
      </div>
      {result ? (
        <div>
          <div className="space-y-3 border-b p-4">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Read decision
            </p>
            <div className="flex items-center gap-2 text-sm font-medium">
              <StatusMark allowed={result.decision.allowed} />
              {result.decision.allowed ? "Allowed" : "Denied"}
            </div>
            <dl className="grid grid-cols-[6rem_1fr] gap-y-2 text-xs">
              <dt className="text-muted-foreground">Reason</dt>
              <dd>{result.decision.reason}</dd>
              <dt className="text-muted-foreground">Role</dt>
              <dd>{result.decision.effectiveRole ?? "None"}</dd>
              <dt className="text-muted-foreground">State</dt>
              <dd>{result.repository.status}</dd>
              <dt className="text-muted-foreground">Visibility</dt>
              <dd>{result.repository.visibility}</dd>
            </dl>
          </div>
          <form action={updateRepositoryAction} className="space-y-3 p-4">
            <div className="flex items-center gap-2">
              <UserPlus className="size-4" />
              <h2 className="text-sm font-semibold">Direct access</h2>
            </div>
            <input
              type="hidden"
              name="repositoryId"
              value={result.repository.repositoryId}
            />
            <input type="hidden" name="intent" value="grant" />
            <select className={fieldClass} name="granteePrincipalId">
              {principals
                .filter(
                  (item) => item.principalId !== session?.principal.principalId,
                )
                .map((item) => (
                  <option key={item.principalId} value={item.principalId}>
                    {item.displayName}
                  </option>
                ))}
            </select>
            <select className={fieldClass} name="role">
              <option value="read">Read</option>
              <option value="write">Write</option>
              <option value="maintain">Maintain</option>
              <option value="admin">Admin</option>
            </select>
            <button className={buttonClass} type="submit">
              <UserPlus className="size-4" />
              Grant access
            </button>
          </form>
        </div>
      ) : (
        <EmptyState
          title="Inspect a repository"
          body="Select a repository to see the effective access decision and resource context."
        />
      )}
    </div>
  );
}
