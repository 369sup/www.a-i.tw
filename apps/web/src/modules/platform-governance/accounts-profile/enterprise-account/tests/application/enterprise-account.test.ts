import { describe, expect, it } from "vitest";
import { createEnterpriseAccountService } from "../../application/use-cases/enterprise-account-service";
import { InMemoryEnterpriseStore } from "../../adapters/outbound/persistence/in-memory-enterprise-store";

describe("enterprise account", () => {
  it("affiliates one active Organization to the Enterprise", async () => {
    const service = createEnterpriseAccountService(
      new InMemoryEnterpriseStore(),
      {
        async resolve(organizationAccountId: string) {
          return { organizationAccountId, status: "active" };
        },
      },
      () => "enterprise-1",
      () => new Date("2026-07-12T00:00:00.000Z"),
    );
    const enterprise = await service.create({ name: "Analytical Enterprise" });
    await expect(
      service.affiliateOrganization({
        enterpriseId: enterprise.enterpriseId,
        organizationAccountId: "account-organization",
      }),
    ).resolves.toMatchObject({
      organizationAccountIds: ["account-organization"],
    });
  });
});
