import type { DiscussionPrincipal } from "../inbound/discussion-principal";

export interface CommunityInteractionSafety {
  allowed(input: {
    repositoryId: string;
    principal: DiscussionPrincipal;
    action: "discussion_comment";
  }): Promise<boolean>;
}
