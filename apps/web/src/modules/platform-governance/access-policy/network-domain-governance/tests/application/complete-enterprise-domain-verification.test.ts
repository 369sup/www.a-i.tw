import { describe, expect, it, vi } from "vitest";
import { InMemoryDomainVerificationRepository } from "../../adapters/outbound/persistence/in-memory-domain-verification-repository";
import { createCompleteEnterpriseDomainVerification } from "../../application/use-cases/complete-enterprise-domain-verification";

function createFixture(dnsResult: "matched" | "missing") {
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
  ]);
  const save = vi.spyOn(repository, "save");
  const complete = createCompleteEnterpriseDomainVerification(
    repository,
    {
      resolve: vi.fn().mockResolvedValue({
        enterpriseId: "enterprise-1",
        name: "Acme",
      }),
    },
    { requireEnterpriseOwner: vi.fn().mockResolvedValue(undefined) },
    { verify: vi.fn().mockResolvedValue(dnsResult) },
    () => new Date("2026-07-16T01:00:00.000Z"),
  );
  return { complete, repository, save };
}

describe("completeEnterpriseDomainVerification", () => {
  it("completes a pending challenge after an authoritative match", async () => {
    const { complete } = createFixture("matched");

    await expect(
      complete({
        enterpriseId: "enterprise-1",
        verificationId: "verification-1",
        actorPrincipalId: "principal-1",
      }),
    ).resolves.toMatchObject({
      status: "verified",
      verifiedAt: "2026-07-16T01:00:00.000Z",
    });
  });

  it("keeps a missing authoritative answer retryable and pending", async () => {
    const { complete, repository, save } = createFixture("missing");

    await expect(
      complete({
        enterpriseId: "enterprise-1",
        verificationId: "verification-1",
        actorPrincipalId: "principal-1",
      }),
    ).rejects.toThrow("DNS TXT verification is missing; retry later.");
    expect(save).not.toHaveBeenCalled();
    await expect(repository.find("verification-1")).resolves.toMatchObject({
      status: "pending",
    });
  });
});
