import { describe, expect, it } from "vitest";

import { createInMemoryRepositoryStarStore } from "../../adapters/outbound/persistence/in-memory-repository-star-store";
import { createSocialCurationService } from "../../application/use-cases/social-curation-service";

const active = { principalId: "principal-ada", status: "active" } as const;

describe("Social Curation service", () => {
  it("stars and unstars idempotently while preserving starredAt", async () => {
    let clock = new Date("2026-07-14T08:00:00.000Z");
    const service = createSocialCurationService(
      createInMemoryRepositoryStarStore(),
      { canRead: async () => true },
      () => clock,
    );

    const first = await service.star({
      repositoryId: "repository-roadmap",
      principal: active,
    });
    clock = new Date("2026-07-14T09:00:00.000Z");
    const repeated = await service.star({
      repositoryId: "repository-roadmap",
      principal: active,
    });
    expect(repeated).toEqual(first);
    expect(
      await service.isStarred({
        repositoryId: "repository-roadmap",
        principal: active,
      }),
    ).toBe(true);

    await service.unstar({
      repositoryId: "repository-roadmap",
      principal: active,
    });
    await service.unstar({
      repositoryId: "repository-roadmap",
      principal: active,
    });
    expect(
      await service.isStarred({
        repositoryId: "repository-roadmap",
        principal: active,
      }),
    ).toBe(false);
  });

  it("lists readable Repository Stars newest first without disclosing revoked access", async () => {
    const readable = new Set(["repository-old", "repository-new"]);
    const instants = [
      new Date("2026-07-14T08:00:00.000Z"),
      new Date("2026-07-14T09:00:00.000Z"),
      new Date("2026-07-14T10:00:00.000Z"),
    ];
    const service = createSocialCurationService(
      createInMemoryRepositoryStarStore(),
      { canRead: async ({ repositoryId }) => readable.has(repositoryId) },
      () => instants.shift() ?? new Date(),
    );
    await service.star({ repositoryId: "repository-old", principal: active });
    await service.star({ repositoryId: "repository-new", principal: active });
    readable.add("repository-revoked");
    await service.star({
      repositoryId: "repository-revoked",
      principal: active,
    });
    readable.delete("repository-revoked");

    await expect(service.list(active)).resolves.toEqual([
      expect.objectContaining({ repositoryId: "repository-new" }),
      expect.objectContaining({ repositoryId: "repository-old" }),
    ]);
  });

  it("fails closed for disabled Principals and unreadable Repositories", async () => {
    const service = createSocialCurationService(
      createInMemoryRepositoryStarStore(),
      { canRead: async () => false },
      () => new Date(),
    );
    await expect(
      service.star({ repositoryId: "repository-private", principal: active }),
    ).rejects.toThrow("unavailable");
    await expect(
      service.list({ principalId: "principal-ada", status: "disabled" }),
    ).rejects.toThrow("Active User Principal");
  });
});
