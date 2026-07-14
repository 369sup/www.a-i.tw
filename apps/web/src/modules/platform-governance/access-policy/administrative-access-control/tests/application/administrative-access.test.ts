import { describe, expect, it } from "vitest";
import { createAdministrativeAccessService } from "../../application/use-cases/administrative-access-service";
import { InMemoryEnterpriseOwnerStore } from "../../adapters/outbound/persistence/in-memory-enterprise-owner-store";

describe("administrative access", () => {
  it("requires an assigned Enterprise owner", async () => {
    const service = createAdministrativeAccessService(
      new InMemoryEnterpriseOwnerStore(),
      {
        async exists() {
          return true;
        },
      },
      () => new Date(0),
    );
    await service.assignFoundingOwner("enterprise-1", "principal-owner");
    await expect(
      service.requireEnterpriseOwner("enterprise-1", "principal-owner"),
    ).resolves.toBeUndefined();
    await expect(
      service.isEnterpriseOwner("enterprise-1", "principal-owner"),
    ).resolves.toBe(true);
    await expect(
      service.isEnterpriseOwner("enterprise-1", "principal-other"),
    ).resolves.toBe(false);
    await expect(
      service.requireEnterpriseOwner("enterprise-1", "principal-other"),
    ).rejects.toThrow("owner authorization denied");
  });

  it("rejects an owner assignment for an unavailable Enterprise", async () => {
    const service = createAdministrativeAccessService(
      new InMemoryEnterpriseOwnerStore(),
      {
        async exists() {
          return false;
        },
      },
      () => new Date(0),
    );

    await expect(
      service.assignFoundingOwner("enterprise-missing", "principal-owner"),
    ).rejects.toThrow("Enterprise account is unavailable");
  });
});
