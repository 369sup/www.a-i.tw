import { describe, expect, it } from "vitest";
import { createEnterpriseGovernanceService } from "../../application/enterprise-governance/use-cases/enterprise-governance-service";
import { InMemoryEnterpriseStore } from "../../infrastructure/enterprise-governance/repositories/in-memory-enterprise-store";

function fixture() {
  return createEnterpriseGovernanceService(
    new InMemoryEnterpriseStore(),
    {
      resolve: async (organizationAccountId) => ({
        organizationAccountId,
        status: "active",
      }),
    },
    () => "enterprise-1",
    () => new Date("2026-07-12T00:00:00.000Z"),
  );
}

describe("enterprise governance", () => {
  it("affiliates an Organization and publishes Repository constraints", async () => {
    const service = fixture();
    const enterprise = await service.create({
      name: "Analytical Enterprise",
      actorPrincipalId: "principal-owner",
    });
    await service.affiliateOrganization({
      enterpriseId: enterprise.enterpriseId,
      organizationAccountId: "account-organization",
      actorPrincipalId: "principal-owner",
    });
    await service.setRepositoryVisibilityPolicy({
      enterpriseId: enterprise.enterpriseId,
      actorPrincipalId: "principal-owner",
      policy: {
        publicRepositoryCreation: "forbidden",
        publicVisibilityChange: "forbidden",
      },
    });
    await expect(
      service.constraintsForOrganization("account-organization"),
    ).resolves.toMatchObject({
      status: "governed",
      publicRepositoryCreation: "forbidden",
      publicVisibilityChange: "forbidden",
    });
  });

  it("rejects governance changes by a non-owner", async () => {
    const service = fixture();
    const enterprise = await service.create({
      name: "Analytical Enterprise",
      actorPrincipalId: "principal-owner",
    });
    await expect(
      service.affiliateOrganization({
        enterpriseId: enterprise.enterpriseId,
        organizationAccountId: "account-organization",
        actorPrincipalId: "principal-outsider",
      }),
    ).rejects.toThrow("owner authorization denied");
  });
});
