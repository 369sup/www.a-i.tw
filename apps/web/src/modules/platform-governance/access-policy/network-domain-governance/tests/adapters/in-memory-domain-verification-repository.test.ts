import { describe, expect, it } from "vitest";
import { InMemoryDomainVerificationRepository } from "../../adapters/outbound/persistence/in-memory-domain-verification-repository";
import { startEnterpriseDomainVerification } from "../../domain/network-domain-governance/aggregates/enterprise-domain-verification";

describe("InMemoryDomainVerificationRepository", () => {
  it("reconstructs DomainVerification and isolates Enterprise lists", async () => {
    const repository = new InMemoryDomainVerificationRepository();
    const verification = startEnterpriseDomainVerification({
      id: "verification-1",
      enterpriseId: "enterprise-1",
      domainName: "example.com",
      token: "token-1",
      createdAt: "2026-07-16T00:00:00.000Z",
    });

    await repository.save(verification);

    await expect(repository.find("verification-1")).resolves.toEqual(
      verification,
    );
    await expect(repository.list("enterprise-1")).resolves.toEqual([
      verification,
    ]);
    await expect(repository.list("enterprise-2")).resolves.toEqual([]);
  });
});
