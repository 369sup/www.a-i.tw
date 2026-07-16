import {
  applyLabel,
  assignIssue,
  closeIssue,
  createIssue,
  removeLabel,
  reopenIssue,
  unassignIssue,
  type Issue,
} from "../../domain/work-tracking/aggregates/issue";
import {
  createLabel,
  normalizeLabelName,
  type Label,
} from "../../domain/work-tracking/entities/label";
import type { IssuePrincipal } from "../ports/inbound/issue-principal";
import type { CommunityInteractionSafety } from "../ports/outbound/community-interaction-safety-port";
import type {
  IssueNumberSequence,
  IssueStore,
  LabelStore,
} from "../ports/outbound/issue-persistence-port";
import type {
  IssueParticipationAction,
  RepositoryParticipation,
} from "../ports/outbound/repository-participation-port";

export type IssueSummary = Readonly<{
  issueId: string;
  number: number;
  title: string;
  body: string;
  status: "open" | "closed";
  labelIds: readonly string[];
  assigneePrincipalIds: readonly string[];
}>;
export type LabelSummary = Readonly<Label>;
export interface IssuesService {
  findIssueRef(
    issueId: string,
  ): Promise<Readonly<{ issueId: string; repositoryId: string }> | undefined>;
  list(
    repositoryId: string,
    principal: IssuePrincipal,
  ): Promise<{ issues: IssueSummary[]; labels: LabelSummary[] }>;
  createIssue(input: {
    repositoryId: string;
    title: string;
    body: string;
    actor: IssuePrincipal;
  }): Promise<IssueSummary>;
  setClosed(input: {
    issueId: string;
    closed: boolean;
    actor: IssuePrincipal;
  }): Promise<IssueSummary>;
  createLabel(input: {
    repositoryId: string;
    name: string;
    color: string;
    description: string;
    actor: IssuePrincipal;
  }): Promise<LabelSummary>;
  setLabel(input: {
    issueId: string;
    labelId: string;
    applied: boolean;
    actor: IssuePrincipal;
  }): Promise<IssueSummary>;
  setAssignee(input: {
    issueId: string;
    principal: IssuePrincipal;
    assigned: boolean;
    actor: IssuePrincipal;
  }): Promise<IssueSummary>;
}
export function createIssuesService(
  issues: IssueStore,
  labels: LabelStore,
  sequence: IssueNumberSequence,
  repositories: RepositoryParticipation,
  safety: CommunityInteractionSafety,
  nextIssueId: () => string,
  nextLabelId: () => string,
): IssuesService {
  const requireAllowed = async (
    repositoryId: string,
    principal: IssuePrincipal,
    action: IssueParticipationAction,
  ) => {
    if (!(await repositories.exists(repositoryId)))
      throw new Error("Repository collaboration scope not found.");
    if (!(await repositories.allowed({ repositoryId, principal, action })))
      throw new Error("Repository participation denied.");
  };
  const issueSummary = (issue: Issue): IssueSummary => ({
    issueId: issue.id,
    number: issue.number,
    title: issue.title,
    body: issue.body,
    status: issue.status,
    labelIds: issue.labelIds,
    assigneePrincipalIds: issue.assigneePrincipalIds,
  });
  const requiredIssue = async (id: string) => {
    const issue = await issues.find(id);
    if (!issue) throw new Error("Issue not found.");
    return issue;
  };
  return {
    async findIssueRef(issueId) {
      const issue = await issues.find(issueId);
      return issue
        ? { issueId: issue.id, repositoryId: issue.repositoryId }
        : undefined;
    },
    async list(repositoryId, principal) {
      await requireAllowed(repositoryId, principal, "issue:read");
      return {
        issues: (await issues.list(repositoryId)).map(issueSummary),
        labels: await labels.list(repositoryId),
      };
    },
    async createIssue(input) {
      await requireAllowed(input.repositoryId, input.actor, "issue:create");
      if (
        !(await safety.allowed({
          repositoryId: input.repositoryId,
          principal: input.actor,
          action: "open_issue",
        }))
      )
        throw new Error("Repository interaction limit denied Issue creation.");
      const issue = createIssue({
        id: nextIssueId(),
        repositoryId: input.repositoryId,
        number: await sequence.next(input.repositoryId),
        title: input.title,
        body: input.body,
      });
      await issues.save(issue);
      return issueSummary(issue);
    },
    async setClosed(input) {
      const issue = await requiredIssue(input.issueId);
      await requireAllowed(issue.repositoryId, input.actor, "issue:triage");
      const updated = input.closed ? closeIssue(issue) : reopenIssue(issue);
      await issues.save(updated);
      return issueSummary(updated);
    },
    async createLabel(input) {
      await requireAllowed(input.repositoryId, input.actor, "issue:manage");
      const label = createLabel({
        id: nextLabelId(),
        repositoryId: input.repositoryId,
        name: input.name,
        color: input.color,
        description: input.description,
      });
      if (
        await labels.findByName(
          label.repositoryId,
          normalizeLabelName(label.name),
        )
      )
        throw new Error("Label name already exists.");
      await labels.save(label);
      return label;
    },
    async setLabel(input) {
      const issue = await requiredIssue(input.issueId);
      const label = await labels.find(input.labelId);
      if (!label || label.repositoryId !== issue.repositoryId)
        throw new Error("Label is outside the Issue Repository scope.");
      await requireAllowed(issue.repositoryId, input.actor, "issue:triage");
      const updated = input.applied
        ? applyLabel(issue, label.id)
        : removeLabel(issue, label.id);
      await issues.save(updated);
      return issueSummary(updated);
    },
    async setAssignee(input) {
      const issue = await requiredIssue(input.issueId);
      await requireAllowed(issue.repositoryId, input.actor, "issue:triage");
      await requireAllowed(issue.repositoryId, input.principal, "issue:read");
      const updated = input.assigned
        ? assignIssue(issue, input.principal.principalId)
        : unassignIssue(issue, input.principal.principalId);
      await issues.save(updated);
      return issueSummary(updated);
    },
  };
}
