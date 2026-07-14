import { describe, expect, it } from "vitest";
import { createAdministrativeAccessService } from "../../application/use-cases/administrative-access-service";
import { InMemoryEnterpriseOwnerStore } from "../../adapters/outbound/persistence/in-memory-enterprise-owner-store";

describe("administrative access", () => {
  it("requires an assigned Enterprise owner", async () => {
    const service = createAdministrativeAccessService(
      new InMemoryEnterpriseOwnerStore(),
      () => new Date(0),
    );
    await service.assignFoundingOwner("enterprise-1", "principal-owner");
    await expect(
      service.requireEnterpriseOwner("enterprise-1", "principal-owner"),
    ).resolves.toBeUndefined();
    await expect(
      service.requireEnterpriseOwner("enterprise-1", "principal-other"),
    ).rejects.toThrow("owner authorization denied");
  });
});
