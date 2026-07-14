import { describe, expect, it, vi } from "vitest";

import { createRepositoryStarParticipationAdapter } from "../../adapters/outbound/integrations/repository-star-participation.adapter";

describe("Repository Star participation adapter", () => {
  it("maps Social Curation read eligibility to Repository read", async () => {
    const participation = vi.fn(async () => ({
      repositoryId: "repository-roadmap",
      principalId: "principal-ada",
      action: "repository:read" as const,
      allowed: true,
      reason: "public" as const,
    }));
    const repositories = {
      collaborationScope: vi.fn(),
      participation,
    };
    const adapter = createRepositoryStarParticipationAdapter(repositories);

    await expect(
      adapter.canRead({
        repositoryId: "repository-roadmap",
        principal: { principalId: "principal-ada", status: "active" },
      }),
    ).resolves.toBe(true);
    expect(participation).toHaveBeenCalledWith({
      repositoryId: "repository-roadmap",
      principal: { principalId: "principal-ada", status: "active" },
      action: "repository:read",
    });
  });
});
