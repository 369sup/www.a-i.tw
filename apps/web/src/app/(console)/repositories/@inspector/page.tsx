import { ShieldCheck, Star, UserPlus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@a-i/shadcn/ui/alert";
import { Button } from "@a-i/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";
import { getProductComposition } from "@/src/composition/product-composition";
import { requireAuthentication } from "@/src/presentation/authentication/browser-session";
import { resolveRepositoryCapabilityContext } from "../_lib/repository-capability-composition";
import {
  updateDiscussionAction,
  updateRepositoryAction,
  updateRepositorySubscriptionAction,
  updateIssueAction,
  updateInteractionLimitAction,
  updateRepositoryStarAction,
} from "@/src/app/(console)/repositories/_actions/actions";
import {
  buttonClass,
  EmptyState,
  fieldClass,
  PanelHeading,
  StatusMark,
} from "@/src/app/(console)/repositories/_components/ui";

type Params = Promise<Record<string, string | string[] | undefined>>;
export default async function InspectorSlot({
  searchParams,
}: {
  searchParams: Params;
}) {
  const query = await searchParams;
  const {
    identity,
    accounts,
    repositories,
    issues,
    discussions,
    communitySafety,
    socialCuration,
  } = getProductComposition();
  const [session, principals, accountItems] = await Promise.all([
    requireAuthentication(),
    identity.listPrincipals(),
    accounts.listAccounts(),
  ]);
  const principalLabel = (principalId: string) =>
    accountItems.find(
      (account) =>
        "personalPrincipalId" in account &&
        account.personalPrincipalId === principalId,
    )?.displayName ?? principalId;
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
    ? await issues.list(repositoryId, session.principal).catch(() => undefined)
    : undefined;
  const conversation = repositoryId
    ? await discussions
        .list(repositoryId, session.principal)
        .catch(() => undefined)
    : undefined;
  const interactionLimit = repositoryId
    ? await communitySafety.get(repositoryId)
    : undefined;
  const repositoryIsStarred =
    repositoryId && result
      ? await socialCuration.isStarred({
          repositoryId,
          principal: session.principal,
        })
      : false;
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
          <Card className="m-4 gap-4 py-4">
            <CardHeader className="px-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Star className="size-4" />
                Repository Star
              </CardTitle>
              <CardDescription>
                Save this Repository without changing Watch or notification
                settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4">
              <form action={updateRepositoryStarAction}>
                <input
                  type="hidden"
                  name="repositoryId"
                  value={result.repository.repositoryId}
                />
                <input
                  type="hidden"
                  name="intent"
                  value={repositoryIsStarred ? "unstar" : "star"}
                />
                <Button
                  type="submit"
                  variant={repositoryIsStarred ? "outline" : "default"}
                >
                  <Star className="size-4" />
                  {repositoryIsStarred ? "Starred" : "Star"}
                </Button>
              </form>
            </CardContent>
          </Card>
          {result.repository.visibility === "public" ? (
            <Card className="m-4 gap-4 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Interaction limit</CardTitle>
                <CardDescription>
                  Temporarily limit new Issues and comments to Repository
                  collaborators with write access.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 px-4">
                {interactionLimit?.status === "active" ? (
                  <Alert>
                    <ShieldCheck />
                    <AlertTitle>Collaborators only</AlertTitle>
                    <AlertDescription>
                      Active until {interactionLimit.expiresAt}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    No active Repository interaction limit.
                  </p>
                )}
                <form action={updateInteractionLimitAction}>
                  <input
                    type="hidden"
                    name="repositoryId"
                    value={result.repository.repositoryId}
                  />
                  <input
                    type="hidden"
                    name="intent"
                    value={
                      interactionLimit?.status === "active"
                        ? "remove"
                        : "activate"
                    }
                  />
                  <Button
                    type="submit"
                    variant={
                      interactionLimit?.status === "active"
                        ? "outline"
                        : "default"
                    }
                  >
                    {interactionLimit?.status === "active"
                      ? "Remove limit"
                      : "Limit for one day"}
                  </Button>
                </form>
              </CardContent>
            </Card>
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
                    {principalLabel(item.principalId)}
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
              <form
                action={updateRepositorySubscriptionAction}
                className="flex flex-wrap items-center gap-2"
              >
                <input type="hidden" name="repositoryId" value={repositoryId} />
                <span className="text-xs font-medium">Notifications</span>
                <button className={buttonClass} name="mode" value="all">
                  Watch all
                </button>
                <button
                  className={buttonClass}
                  name="mode"
                  value="participating"
                >
                  Participating
                </button>
                <button className={buttonClass} name="mode" value="ignore">
                  Ignore
                </button>
              </form>
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
                        name="repositoryId"
                        value={repositoryId}
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
                    <form
                      action={updateIssueAction}
                      className="mt-2 space-y-2 border-t pt-2"
                    >
                      <input type="hidden" name="intent" value="comment" />
                      <input
                        type="hidden"
                        name="issueId"
                        value={issue.issueId}
                      />
                      <textarea
                        className={fieldClass}
                        name="body"
                        placeholder="Add a comment"
                        required
                      />
                      <Button type="submit" size="sm">
                        Add Comment
                      </Button>
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
                            {principalLabel(principal.principalId)}
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
          {conversation ? (
            <section className="space-y-4 border-t p-4">
              <h2 className="text-sm font-semibold">Discussions</h2>
              {conversation.categories.length > 0 ? (
                <form action={updateDiscussionAction} className="space-y-2">
                  <input
                    type="hidden"
                    name="intent"
                    value="create-discussion"
                  />
                  <input
                    type="hidden"
                    name="repositoryId"
                    value={repositoryId}
                  />
                  <select className={fieldClass} name="categoryId">
                    {conversation.categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                        {category.acceptsAnswers ? " · answers enabled" : ""}
                      </option>
                    ))}
                  </select>
                  <input
                    className={fieldClass}
                    name="title"
                    placeholder="Discussion title"
                    required
                  />
                  <textarea
                    className={fieldClass}
                    name="body"
                    placeholder="Start a conversation"
                    required
                  />
                  <button className={buttonClass} type="submit">
                    Create Discussion
                  </button>
                </form>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No Discussion Category is configured for this Repository.
                </p>
              )}
              <ul className="space-y-3 border-t pt-3">
                {conversation.discussions.map((discussion) => (
                  <li
                    key={discussion.discussionId}
                    className="rounded-md border p-3 text-xs"
                  >
                    <strong>{discussion.title}</strong>
                    <p className="mt-1 text-muted-foreground">
                      {discussion.body}
                    </p>
                    <p className="mt-1 text-muted-foreground">
                      {discussion.comments.length} comments · {discussion.state}
                    </p>
                    <form
                      action={updateDiscussionAction}
                      className="mt-3 space-y-2 border-t pt-3"
                    >
                      <input type="hidden" name="intent" value="comment" />
                      <input
                        type="hidden"
                        name="discussionId"
                        value={discussion.discussionId}
                      />
                      <textarea
                        className={fieldClass}
                        name="body"
                        placeholder="Add a comment"
                        required
                      />
                      <button className={buttonClass} type="submit">
                        Add Comment
                      </button>
                    </form>
                    <ul className="mt-3 space-y-2">
                      {discussion.comments.map((comment) => {
                        const accepted =
                          discussion.acceptedAnswerCommentId ===
                          comment.commentId;
                        return (
                          <li
                            key={comment.commentId}
                            className="rounded-sm bg-muted/60 p-2"
                          >
                            <p>{comment.body}</p>
                            <p className="mt-1 text-muted-foreground">
                              {accepted
                                ? "Accepted answer"
                                : comment.status === "minimized"
                                  ? "Minimized"
                                  : "Comment"}
                            </p>
                            {!accepted &&
                            comment.status === "active" &&
                            discussion.canMarkAnswer ? (
                              <form
                                action={updateDiscussionAction}
                                className="mt-2"
                              >
                                <input
                                  type="hidden"
                                  name="intent"
                                  value="mark-answer"
                                />
                                <input
                                  type="hidden"
                                  name="discussionId"
                                  value={discussion.discussionId}
                                />
                                <input
                                  type="hidden"
                                  name="commentId"
                                  value={comment.commentId}
                                />
                                <button className={buttonClass} type="submit">
                                  Mark as Answer
                                </button>
                              </form>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
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
