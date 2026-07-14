// Export only deliberate, versioned Published Language. Never expose Context internals.
export type CommunityInteractionActionV1 =
  "open_issue" | "issue_comment" | "discussion_comment";

export type RepositoryInteractionLimitV1 = Readonly<{
  repositoryId: string;
  kind: "collaborators_only";
  expiry: "one_day";
  activatedAt: string;
  expiresAt: string;
  status: "active" | "expired" | "removed";
  removedAt?: string;
}>;

export type CommunityInteractionDecisionV1 = Readonly<{
  repositoryId: string;
  principalId: string;
  action: CommunityInteractionActionV1;
  allowed: boolean;
  reason:
    "no-active-limit" | "collaborator" | "interaction-limited" | "unavailable";
}>;

export interface CommunitySafetyApiV1 {
  activate(input: {
    repositoryId: string;
    principal: Readonly<{
      principalId: string;
      status: "active" | "disabled";
    }>;
    kind: "collaborators_only";
    expiry: "one_day";
  }): Promise<RepositoryInteractionLimitV1>;
  remove(input: {
    repositoryId: string;
    principal: Readonly<{
      principalId: string;
      status: "active" | "disabled";
    }>;
  }): Promise<RepositoryInteractionLimitV1>;
  get(repositoryId: string): Promise<RepositoryInteractionLimitV1 | undefined>;
  decide(input: {
    repositoryId: string;
    principal: Readonly<{
      principalId: string;
      status: "active" | "disabled";
    }>;
    action: CommunityInteractionActionV1;
  }): Promise<CommunityInteractionDecisionV1>;
}
