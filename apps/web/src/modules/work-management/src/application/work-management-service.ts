import type { PrincipalRefV1 } from "@/src/modules/identity-access/src/contracts/public";
import type {
  RepositoryCollaborationScopeV1,
  RepositoryParticipationActionV1,
} from "@/src/modules/repository/src/contracts/public";
import {
  applyLabel,
  assignIssue,
  closeIssue,
  createIssue,
  removeLabel,
  reopenIssue,
  unassignIssue,
  type Issue,
} from "../domain/issue";
import { createLabel, normalizeLabelName, type Label } from "../domain/label";

export interface IssueStore {
  list(repositoryId: string): Promise<Issue[]>;
  find(id: string): Promise<Issue | undefined>;
  save(issue: Issue): Promise<void>;
}
export interface LabelStore {
  list(repositoryId: string): Promise<Label[]>;
  find(id: string): Promise<Label | undefined>;
  findByName(repositoryId: string, name: string): Promise<Label | undefined>;
  save(label: Label): Promise<void>;
}
export interface IssueNumberSequence {
  next(repositoryId: string): Promise<number>;
}
export interface RepositoryParticipationGateway {
  scope(
    repositoryId: string,
  ): Promise<RepositoryCollaborationScopeV1 | undefined>;
  allowed(input: {
    repositoryId: string;
    principal: PrincipalRefV1;
    action: RepositoryParticipationActionV1;
  }): Promise<boolean>;
}
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
export interface WorkManagementService {
  list(
    repositoryId: string,
    principal: PrincipalRefV1,
  ): Promise<{ issues: IssueSummary[]; labels: LabelSummary[] }>;
  createIssue(input: {
    repositoryId: string;
    title: string;
    body: string;
    actor: PrincipalRefV1;
  }): Promise<IssueSummary>;
  setClosed(input: {
    issueId: string;
    closed: boolean;
    actor: PrincipalRefV1;
  }): Promise<IssueSummary>;
  createLabel(input: {
    repositoryId: string;
    name: string;
    color: string;
    description: string;
    actor: PrincipalRefV1;
  }): Promise<LabelSummary>;
  setLabel(input: {
    issueId: string;
    labelId: string;
    applied: boolean;
    actor: PrincipalRefV1;
  }): Promise<IssueSummary>;
  setAssignee(input: {
    issueId: string;
    principal: PrincipalRefV1;
    assigned: boolean;
    actor: PrincipalRefV1;
  }): Promise<IssueSummary>;
}
export function createWorkManagementService(
  issues: IssueStore,
  labels: LabelStore,
  sequence: IssueNumberSequence,
  repositories: RepositoryParticipationGateway,
  nextIssueId: () => string,
  nextLabelId: () => string,
): WorkManagementService {
  const requireAllowed = async (
    repositoryId: string,
    principal: PrincipalRefV1,
    action: RepositoryParticipationActionV1,
  ) => {
    if (!(await repositories.scope(repositoryId)))
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
    async list(repositoryId, principal) {
      await requireAllowed(repositoryId, principal, "read");
      return {
        issues: (await issues.list(repositoryId)).map(issueSummary),
        labels: await labels.list(repositoryId),
      };
    },
    async createIssue(input) {
      await requireAllowed(input.repositoryId, input.actor, "triage");
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
      await requireAllowed(issue.repositoryId, input.actor, "triage");
      const updated = input.closed ? closeIssue(issue) : reopenIssue(issue);
      await issues.save(updated);
      return issueSummary(updated);
    },
    async createLabel(input) {
      await requireAllowed(input.repositoryId, input.actor, "manage");
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
      await requireAllowed(issue.repositoryId, input.actor, "triage");
      const updated = input.applied
        ? applyLabel(issue, label.id)
        : removeLabel(issue, label.id);
      await issues.save(updated);
      return issueSummary(updated);
    },
    async setAssignee(input) {
      const issue = await requiredIssue(input.issueId);
      await requireAllowed(issue.repositoryId, input.actor, "triage");
      await requireAllowed(issue.repositoryId, input.principal, "read");
      const updated = input.assigned
        ? assignIssue(issue, input.principal.principalId)
        : unassignIssue(issue, input.principal.principalId);
      await issues.save(updated);
      return issueSummary(updated);
    },
  };
}
