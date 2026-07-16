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
    await expect(service.list()).resolves.toEqual([enterprise]);
    await expect(
      service.affiliateOrganization({
        enterpriseId: enterprise.enterpriseId,
        organizationAccountId: "account-organization",
      }),
    ).resolves.toMatchObject({
      organizationAccountIds: ["account-organization"],
    });
  });

  it("rejects unavailable and already-affiliated Organizations", async () => {
    const store = new InMemoryEnterpriseStore();
    const service = createEnterpriseAccountService(
      store,
      {
        async resolve(organizationAccountId: string) {
          return organizationAccountId === "active-org"
            ? { organizationAccountId, status: "active" }
            : undefined;
        },
      },
      (() => {
        let id = 0;
        return () => `enterprise-${++id}`;
      })(),
      () => new Date("2026-07-16T00:00:00.000Z"),
    );
    const first = await service.create({ name: "First" });
    const second = await service.create({ name: "Second" });

    await expect(
      service.affiliateOrganization({
        enterpriseId: first.enterpriseId,
        organizationAccountId: "missing",
      }),
    ).rejects.toThrow("Active Organization Account not found");
    await service.affiliateOrganization({
      enterpriseId: first.enterpriseId,
      organizationAccountId: "active-org",
    });
    await expect(
      service.affiliateOrganization({
        enterpriseId: second.enterpriseId,
        organizationAccountId: "active-org",
      }),
    ).rejects.toThrow("already governed");
  });
});
