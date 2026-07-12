import { describe, expect, it } from "vitest";

import { RepositoryParticipationAdapter } from "../../../infrastructure/issues/integrations/outbound/repository-participation.adapter";

describe("RepositoryParticipationAdapter", () => {
  it("maps Repository decisions to the Issues-owned boolean capability", async () => {
    const adapter = new RepositoryParticipationAdapter({
      collaborationScope: async (repositoryId) => ({
        repositoryId,
        ownerAccountId: "account-1",
        status: "active",
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
          handle: "ada",
          displayName: "Ada",
          status: "active",
        },
        action: "triage",
      }),
    ).resolves.toBe(true);
  });
});
