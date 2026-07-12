export type IssueComment = Readonly<{
  id: string;
  issueId: string;
  authorPrincipalId: string;
  body: string;
  createdAt: string;
}>;
export type Milestone = Readonly<{
  id: string;
  repositoryId: string;
  title: string;
  state: "open" | "closed";
  dueOn?: string;
}>;
export type IssueDependency = Readonly<{
  blockedIssueId: string;
  blockingIssueId: string;
}>;

export function createIssueComment(value: IssueComment): IssueComment {
  if (!value.body.trim()) throw new Error("Issue comment body is required.");
  return { ...value, body: value.body.trim() };
}
export function createMilestone(value: Omit<Milestone, "state">): Milestone {
  if (!value.title.trim()) throw new Error("Milestone title is required.");
  return { ...value, title: value.title.trim(), state: "open" };
}
export function createIssueDependency(
  blockedIssueId: string,
  blockingIssueId: string,
): IssueDependency {
  if (blockedIssueId === blockingIssueId)
    throw new Error("An Issue cannot block itself.");
  return { blockedIssueId, blockingIssueId };
}
