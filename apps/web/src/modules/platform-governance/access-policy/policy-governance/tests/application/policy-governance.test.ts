import { describe, expect, it } from "vitest";
import { createPolicyGovernanceService } from "../../application/use-cases/policy-governance-service";
import { InMemoryRepositoryPolicyStore } from "../../adapters/outbound/persistence/in-memory-repository-policy-store";

describe("policy governance", () => {
  it("publishes Repository visibility constraints for an affiliated Organization", async () => {
    const service = createPolicyGovernanceService(
      new InMemoryRepositoryPolicyStore(),
      {
        async findByOrganization() {
          return { enterpriseId: "enterprise-1" };
        },
      },
    );
    await service.set("enterprise-1", {
      publicRepositoryCreation: "forbidden",
      publicVisibilityChange: "forbidden",
    });
    await expect(
      service.constraintsForOrganization("organization-1"),
    ).resolves.toMatchObject({
      status: "governed",
      publicRepositoryCreation: "forbidden",
      publicVisibilityChange: "forbidden",
    });
  });
});
