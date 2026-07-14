import { describe, expect, it, vi } from "vitest";
import { createRepositorySafetyParticipationAdapter } from "../../adapters/outbound/integrations/repository-safety-participation.adapter";

describe("RepositorySafetyParticipationAdapter", () => {
  it("maps Repository scope and Community Safety actions", async () => {
    const participation = vi.fn(async (input) => ({
      ...input,
      allowed: true,
      reason: "owner" as const,
    }));
    const adapter = createRepositorySafetyParticipationAdapter({
      collaborationScope: async (repositoryId) => ({
        repositoryId,
        ownerAccountId: "account-1",
        visibility: "public",
        status: "active",
        features: { wikiEnabled: true },
      }),
      participation,
    });
    await expect(adapter.scope("repository-1")).resolves.toMatchObject({
      visibility: "public",
    });
    await adapter.allowed({
      repositoryId: "repository-1",
      principal: { principalId: "principal-1", status: "active" },
      action: "interact",
    });
    expect(participation).toHaveBeenCalledWith(
      expect.objectContaining({ action: "community-safety:interact" }),
    );
  });
});
