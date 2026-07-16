import { describe, expect, it, vi } from "vitest";
import { InMemoryDomainVerificationRepository } from "../../adapters/outbound/persistence/in-memory-domain-verification-repository";
import { createListEnterpriseDomains } from "../../application/use-cases/list-enterprise-domains";

describe("listEnterpriseDomains", () => {
  it("lists only the authorized Enterprise domain verifications", async () => {
    const repository = new InMemoryDomainVerificationRepository([
      {
        id: "verification-1",
        enterpriseId: "enterprise-1",
        domainName: "example.com",
        challenge: {
          recordName: "_a-i-domain-verification.example.com",
          expectedValue: "token-1",
        },
        status: "pending",
        createdAt: "2026-07-16T00:00:00.000Z",
      },
      {
        id: "verification-2",
        enterpriseId: "enterprise-2",
        domainName: "other.example",
        challenge: {
          recordName: "_a-i-domain-verification.other.example",
          expectedValue: "token-2",
        },
        status: "pending",
        createdAt: "2026-07-16T00:00:00.000Z",
      },
    ]);
    const list = createListEnterpriseDomains(
      repository,
      {
        resolve: vi.fn().mockResolvedValue({
          enterpriseId: "enterprise-1",
          name: "Acme",
        }),
      },
      { requireEnterpriseOwner: vi.fn().mockResolvedValue(undefined) },
    );

    await expect(
      list({
        enterpriseId: "enterprise-1",
        actorPrincipalId: "principal-1",
      }),
    ).resolves.toMatchObject({
      enterpriseId: "enterprise-1",
      enterpriseName: "Acme",
      domains: [{ verificationId: "verification-1" }],
    });
  });
});
