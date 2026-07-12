import { ShieldCheck, UserPlus } from "lucide-react";
import { getProductWorkspace } from "@/src/server/composition/product-workspace";
import { requireAuthentication } from "@/src/server/auth/session";
import { resolveRepositoryCapabilityContext } from "@/src/server/composition/repository-capability-context";
import {
  updateRepositoryAction,
  updateIssueAction,
} from "@/src/presentation/workspace/actions";
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
  const { identity, repositories, issues } = getProductWorkspace();
  const [session, principals] = await Promise.all([
    requireAuthentication(),
    identity.listPrincipals(),
  ]);
  const repositoryId =
    typeof query.repository === "string" ? query.repository : undefined;
  const result = repositoryId
    ? await repositories.get(repositoryId, session.principal)
    : undefined;
  const requestContext =
    repositoryId && result
      ? await resolveRepositoryCapabilityContext({
          authentication: session,
          activeScopeAccountId:
            typeof query.account === "string"
              ? query.account
              : result.repository.ownerAccountId,
          repositoryId,
          capabilityKey: "issue.create",
        })
      : undefined;
  const work = repositoryId
    ? await issues
        .list(repositoryId, session.principal)
        .catch(() => undefined)
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
          {requestContext ? (
            <div className="space-y-3 border-b p-4">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Repository capability context
              </p>
              <dl className="grid grid-cols-[6rem_1fr] gap-y-2 text-xs">
                <dt className="text-muted-foreground">Viewer</dt>
                <dd>@{requestContext.envelope.viewer.handle}</dd>
                <dt className="text-muted-foreground">Actor</dt>
                <dd>@{requestContext.envelope.actor.handle}</dd>
                <dt className="text-muted-foreground">Scope</dt>
                <dd>{requestContext.envelope.activeScope.type}</dd>
                <dt className="text-muted-foreground">Owner</dt>
                <dd>@{requestContext.owner.handle}</dd>
                <dt className="text-muted-foreground">Capability</dt>
                <dd>{requestContext.capability.key}</dd>
                <dt className="text-muted-foreground">Action</dt>
                <dd>{requestContext.requestedAction}</dd>
                <dt className="text-muted-foreground">Decision</dt>
                <dd>
                  {requestContext.authorizationDecision.allowed
                    ? "Allowed"
                    : "Denied"}{" "}
                  · {requestContext.authorizationDecision.reason}
                </dd>
              </dl>
            </div>
          ) : null}
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
          {work ? (
            <section className="space-y-4 border-t p-4">
              <h2 className="text-sm font-semibold">Issues</h2>
              <form action={updateIssueAction} className="space-y-2">
                <input type="hidden" name="intent" value="create-issue" />
                <input type="hidden" name="repositoryId" value={repositoryId} />
                <input
                  className={fieldClass}
                  name="title"
                  placeholder="Issue title"
                  required
                />
                <textarea
                  className={fieldClass}
                  name="body"
                  placeholder="Work description"
                />
                <button className={buttonClass} type="submit">
                  Create Issue
                </button>
              </form>
              <form
                action={updateIssueAction}
                className="space-y-2 border-t pt-3"
              >
                <input type="hidden" name="intent" value="create-label" />
                <input type="hidden" name="repositoryId" value={repositoryId} />
                <input
                  className={fieldClass}
                  name="name"
                  placeholder="Label name"
                  required
                />
                <input
                  className={fieldClass}
                  name="color"
                  defaultValue="0969da"
                  required
                />
                <input
                  className={fieldClass}
                  name="description"
                  placeholder="Description"
                />
                <button className={buttonClass} type="submit">
                  Create Label
                </button>
              </form>
              <ul className="space-y-3 border-t pt-3">
                {work.issues.map((issue) => (
                  <li
                    key={issue.issueId}
                    className="rounded-md border p-3 text-xs"
                  >
                    <strong>
                      #{issue.number} {issue.title}
                    </strong>
                    <p className="mt-1 text-muted-foreground">
                      {issue.status} · {issue.assigneePrincipalIds.length}{" "}
                      assignees · {issue.labelIds.length} labels
                    </p>
                    <form action={updateIssueAction} className="mt-2">
                      <input
                        type="hidden"
                        name="issueId"
                        value={issue.issueId}
                      />
                      <input
                        type="hidden"
                        name="intent"
                        value={
                          issue.status === "open"
                            ? "close-issue"
                            : "reopen-issue"
                        }
                      />
                      <button className={buttonClass} type="submit">
                        {issue.status === "open" ? "Close" : "Reopen"}
                      </button>
                    </form>
                    {work.labels.length > 0 ? (
                      <form
                        action={updateIssueAction}
                        className="mt-2 flex gap-2"
                      >
                        <input
                          type="hidden"
                          name="intent"
                          value="apply-label"
                        />
                        <input
                          type="hidden"
                          name="issueId"
                          value={issue.issueId}
                        />
                        <select className={fieldClass} name="labelId">
                          {work.labels.map((label) => (
                            <option key={label.id} value={label.id}>
                              {label.name}
                            </option>
                          ))}
                        </select>
                        <button className={buttonClass} type="submit">
                          Apply Label
                        </button>
                      </form>
                    ) : null}
                    <form
                      action={updateIssueAction}
                      className="mt-2 flex gap-2"
                    >
                      <input type="hidden" name="intent" value="assign" />
                      <input
                        type="hidden"
                        name="issueId"
                        value={issue.issueId}
                      />
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
                      <button className={buttonClass} type="submit">
                        Assign
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
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
