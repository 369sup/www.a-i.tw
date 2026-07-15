import { describe, expect, it } from "vitest";

import { RepositoryDiscussionParticipationAdapter } from "../../adapters/outbound/integrations/repository-discussion-participation-adapter";

describe("RepositoryDiscussionParticipationAdapter", () => {
  it("maps the consumer action through Repository Published Language", async () => {
    const actions: string[] = [];
    const adapter = new RepositoryDiscussionParticipationAdapter({
      collaborationScope: async (repositoryId) => ({
        repositoryId,
        ownerAccountId: "account-1",
        visibility: "public",
        status: "active",
        features: { wikiEnabled: true },
      }),
      participation: async (input) => {
        actions.push(input.action);
        return {
          repositoryId: input.repositoryId,
          principalId: input.principal.principalId,
          action: input.action,
          allowed: true,
          reason: "grant",
        };
      },
    });
    await expect(
      adapter.allowed({
        repositoryId: "repository-1",
        principal: { principalId: "principal-1", status: "active" },
        action: "discussion:triage",
      }),
    ).resolves.toBe(true);
    expect(actions).toEqual(["discussion:triage"]);
  });
});
