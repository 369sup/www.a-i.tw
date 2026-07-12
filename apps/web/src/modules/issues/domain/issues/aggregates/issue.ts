export type Issue = Readonly<{
  id: string;
  repositoryId: string;
  number: number;
  title: string;
  body: string;
  status: "open" | "closed";
  labelIds: readonly string[];
  assigneePrincipalIds: readonly string[];
}>;

export function createIssue(
  input: Omit<
    Issue,
    "title" | "body" | "status" | "labelIds" | "assigneePrincipalIds"
  > & { title: string; body: string },
): Issue {
  const title = input.title.trim();
  if (!title) throw new Error("Issue title is required.");
  if (!Number.isInteger(input.number) || input.number < 1)
    throw new Error("Issue number is invalid.");
  return {
    ...input,
    title,
    body: input.body.trim(),
    status: "open",
    labelIds: [],
    assigneePrincipalIds: [],
  };
}

function requireOpen(issue: Issue) {
  if (issue.status !== "open")
    throw new Error("Closed Issues cannot be changed.");
}
export function closeIssue(issue: Issue): Issue {
  if (issue.status === "closed") return issue;
  return { ...issue, status: "closed" };
}
export function reopenIssue(issue: Issue): Issue {
  if (issue.status === "open") return issue;
  return { ...issue, status: "open" };
}
export function applyLabel(issue: Issue, labelId: string): Issue {
  requireOpen(issue);
  return issue.labelIds.includes(labelId)
    ? issue
    : { ...issue, labelIds: [...issue.labelIds, labelId] };
}
export function removeLabel(issue: Issue, labelId: string): Issue {
  requireOpen(issue);
  return { ...issue, labelIds: issue.labelIds.filter((id) => id !== labelId) };
}
export function assignIssue(issue: Issue, principalId: string): Issue {
  requireOpen(issue);
  return issue.assigneePrincipalIds.includes(principalId)
    ? issue
    : {
        ...issue,
        assigneePrincipalIds: [...issue.assigneePrincipalIds, principalId],
      };
}
export function unassignIssue(issue: Issue, principalId: string): Issue {
  requireOpen(issue);
  return {
    ...issue,
    assigneePrincipalIds: issue.assigneePrincipalIds.filter(
      (id) => id !== principalId,
    ),
  };
}
