import type { IssuePrincipal } from "../inbound/issue-principal";

export type IssueParticipationAction =
  | "issue:read"
  | "issue:create"
  | "issue:comment"
  | "issue:triage"
  | "issue:manage";

export interface RepositoryParticipation {
  exists(repositoryId: string): Promise<boolean>;
  allowed(input: {
    repositoryId: string;
    principal: IssuePrincipal;
    action: IssueParticipationAction;
  }): Promise<boolean>;
}
