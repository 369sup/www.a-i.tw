import { describe, expect, it } from "vitest";

import { createInMemoryAppRegistrationStore } from "../../adapters/outbound/persistence/in-memory-app-registration-store";
import { createAppManagementService } from "../../application/use-cases/app-management-service";

const activeOwner = {
  accountId: "account-ada",
  handle: "ada",
  status: "active",
} as const;

describe("App Management service", () => {
  it("registers and lists a Personal Account owner's private GitHub Apps", async () => {
    const service = createAppManagementService(
      createInMemoryAppRegistrationStore(),
      { resolveByPrincipal: async () => activeOwner },
      () => "github-app-1",
      () => new Date("2026-07-14T12:00:00.000Z"),
    );

    await expect(
      service.register({
        principalId: "principal-ada",
        name: "Product Guide",
        description: "Product documentation assistant",
        homepageUrl: "https://example.com/app",
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        id: "github-app-1",
        ownerAccountId: "account-ada",
        availability: "private",
      }),
    );
    await expect(service.listOwned("principal-ada")).resolves.toHaveLength(1);
  });

  it("rejects normalized duplicate names and unavailable owners", async () => {
    const store = createInMemoryAppRegistrationStore();
    const service = createAppManagementService(
      store,
      { resolveByPrincipal: async () => activeOwner },
      () => "github-app-1",
      () => new Date(),
    );
    await service.register({
      principalId: "principal-ada",
      name: "Product Guide",
      homepageUrl: "https://example.com",
    });
    await expect(
      service.register({
        principalId: "principal-ada",
        name: " product   guide ",
        homepageUrl: "https://example.com",
      }),
    ).rejects.toThrow("already registered");

    const unavailable = createAppManagementService(
      store,
      { resolveByPrincipal: async () => undefined },
      () => "github-app-2",
      () => new Date(),
    );
    await expect(unavailable.listOwned("principal-missing")).rejects.toThrow(
      "Active Personal Account owner",
    );
  });
});
