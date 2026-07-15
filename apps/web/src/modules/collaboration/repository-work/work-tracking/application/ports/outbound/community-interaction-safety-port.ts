import type { IssuePrincipal } from "../inbound/issue-principal";

export interface CommunityInteractionSafety {
  allowed(input: {
    repositoryId: string;
    principal: IssuePrincipal;
    action: "open_issue" | "issue_comment";
  }): Promise<boolean>;
}
