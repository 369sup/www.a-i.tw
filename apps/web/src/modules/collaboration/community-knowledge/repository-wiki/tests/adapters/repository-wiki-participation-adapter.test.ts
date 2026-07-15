import { describe, expect, it, vi } from "vitest";
import { createRepositoryWikiParticipationAdapter } from "../../adapters/outbound/integrations/repository-wiki-participation-adapter";

describe("Repository Wiki participation adapter", () => {
  it("maps Knowledge actions and Repository feature availability", async () => {
    const participation = vi.fn(async () => ({
      repositoryId: "repository-1",
      principalId: "principal-1",
      action: "wiki:write" as const,
      allowed: true,
      reason: "grant" as const,
    }));
    const adapter = createRepositoryWikiParticipationAdapter({
      async collaborationScope() {
        return {
          repositoryId: "repository-1",
          ownerAccountId: "account-1",
          visibility: "public",
          status: "active",
          features: { wikiEnabled: true },
        };
      },
      participation,
    });

    await expect(adapter.scope("repository-1")).resolves.toMatchObject({
      wikiEnabled: true,
    });
    await expect(
      adapter.allowed({
        repositoryId: "repository-1",
        principal: { principalId: "principal-1", status: "active" },
        action: "write",
      }),
    ).resolves.toBe(true);
    expect(participation).toHaveBeenCalledWith(
      expect.objectContaining({ action: "wiki:write" }),
    );
  });
});
