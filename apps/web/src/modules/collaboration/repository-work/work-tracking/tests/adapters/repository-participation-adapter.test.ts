import { describe, expect, it } from "vitest";

import { RepositoryParticipationAdapter } from "../../adapters/outbound/integrations/repository-participation-adapter";

describe("RepositoryParticipationAdapter", () => {
  it("maps Repository decisions to the Issues-owned boolean capability", async () => {
    const adapter = new RepositoryParticipationAdapter({
      collaborationScope: async (repositoryId) => ({
        repositoryId,
        ownerAccountId: "account-1",
        visibility: "public",
        status: "active",
        features: { wikiEnabled: true },
      }),
      participation: async (input) => ({
        ...input,
        principalId: input.principal.principalId,
        allowed: true,
        reason: "grant",
      }),
    });

    await expect(adapter.exists("repository-1")).resolves.toBe(true);
    await expect(
      adapter.allowed({
        repositoryId: "repository-1",
        principal: {
          principalId: "principal-1",
          status: "active",
        },
        action: "issue:triage",
      }),
    ).resolves.toBe(true);
  });
});
