import { describe, expect, it } from "vitest";
import { createInMemoryRepositoryInteractionLimitStore } from "../../adapters/outbound/persistence/in-memory-repository-interaction-limit-store";
import { createCommunitySafetyService } from "../../application/use-cases/community-safety-service";

const admin = { principalId: "principal-admin", status: "active" as const };
const outsider = {
  principalId: "principal-outsider",
  status: "active" as const,
};

describe("Community Safety service", () => {
  it("activates, enforces, removes and expires a collaborator-only limit", async () => {
    let current = new Date("2026-07-14T00:00:00.000Z");
    const service = createCommunitySafetyService(
      createInMemoryRepositoryInteractionLimitStore(),
      {
        scope: async (repositoryId) => ({
          repositoryId,
          visibility: "public",
          status: "active",
        }),
        allowed: async ({ principal, action }) =>
          action === "manage"
            ? principal.principalId === admin.principalId
            : principal.principalId === admin.principalId,
      },
      () => current,
    );
    await expect(
      service.activate({
        repositoryId: "repository-1",
        principal: admin,
        kind: "collaborators_only",
        expiry: "one_day",
      }),
    ).resolves.toMatchObject({ status: "active" });
    await expect(
      service.decide({
        repositoryId: "repository-1",
        principal: outsider,
        action: "open_issue",
      }),
    ).resolves.toMatchObject({
      allowed: false,
      reason: "interaction-limited",
    });
    await expect(
      service.decide({
        repositoryId: "repository-1",
        principal: admin,
        action: "discussion_comment",
      }),
    ).resolves.toMatchObject({ allowed: true, reason: "collaborator" });
    await expect(
      service.remove({ repositoryId: "repository-1", principal: admin }),
    ).resolves.toMatchObject({ status: "removed" });

    current = new Date("2026-07-16T00:00:00.000Z");
    await expect(
      service.decide({
        repositoryId: "repository-1",
        principal: outsider,
        action: "issue_comment",
      }),
    ).resolves.toMatchObject({ allowed: true, reason: "no-active-limit" });
  });

  it("rejects private Repositories and non-admin managers", async () => {
    const service = createCommunitySafetyService(
      createInMemoryRepositoryInteractionLimitStore(),
      {
        scope: async (repositoryId) => ({
          repositoryId,
          visibility: "private",
          status: "active",
        }),
        allowed: async () => false,
      },
      () => new Date(0),
    );
    await expect(
      service.activate({
        repositoryId: "repository-1",
        principal: outsider,
        kind: "collaborators_only",
        expiry: "one_day",
      }),
    ).rejects.toThrow("public Repository");
  });
});
