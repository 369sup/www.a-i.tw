import type { IssuePrincipal } from "../inbound/issue-principal";

export type IssueParticipationAction = "read" | "triage" | "manage";

export interface RepositoryParticipation {
  exists(repositoryId: string): Promise<boolean>;
  allowed(input: {
    repositoryId: string;
    principal: IssuePrincipal;
    action: IssueParticipationAction;
  }): Promise<boolean>;
}
