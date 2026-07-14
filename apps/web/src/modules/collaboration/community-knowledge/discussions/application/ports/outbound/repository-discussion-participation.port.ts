import type { DiscussionPrincipal } from "../inbound/discussion-principal";

export type DiscussionParticipationAction =
  | "discussion:read"
  | "discussion:create"
  | "discussion:comment"
  | "discussion:triage";

export interface RepositoryDiscussionParticipation {
  exists(repositoryId: string): Promise<boolean>;
  allowed(input: {
    repositoryId: string;
    principal: DiscussionPrincipal;
    action: DiscussionParticipationAction;
  }): Promise<boolean>;
}
