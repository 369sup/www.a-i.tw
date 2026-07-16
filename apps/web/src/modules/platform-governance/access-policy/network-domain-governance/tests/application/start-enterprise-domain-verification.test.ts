import { describe, expect, it, vi } from "vitest";
import { InMemoryDomainVerificationRepository } from "../../adapters/outbound/persistence/in-memory-domain-verification-repository";
import { createStartEnterpriseDomainVerification } from "../../application/use-cases/start-enterprise-domain-verification";

function createFixture() {
  const repository = new InMemoryDomainVerificationRepository();
  const save = vi.spyOn(repository, "save");
  const administration = {
    requireEnterpriseOwner: vi.fn().mockResolvedValue(undefined),
  };
  const enterprises = {
    resolve: vi.fn().mockResolvedValue({
      enterpriseId: "enterprise-1",
      name: "Acme",
    }),
  };
  const start = createStartEnterpriseDomainVerification(
    repository,
    enterprises,
    administration,
    { next: () => "token-1" },
    () => "verification-1",
    () => new Date("2026-07-16T00:00:00.000Z"),
  );
  return { administration, enterprises, repository, save, start };
}

describe("startEnterpriseDomainVerification", () => {
  it("starts a canonical DNS challenge for an authorized Enterprise owner", async () => {
    const { start } = createFixture();

    await expect(
      start({
        enterpriseId: "enterprise-1",
        domainName: "Example.com.",
        actorPrincipalId: "principal-1",
      }),
    ).resolves.toMatchObject({
      domainName: "example.com",
      recordName: "_a-i-domain-verification.example.com",
      expectedValue: "token-1",
      status: "pending",
    });
  });

  it("rejects a duplicate canonical hostname", async () => {
    const { start } = createFixture();
    await start({
      enterpriseId: "enterprise-1",
      domainName: "example.com",
      actorPrincipalId: "principal-1",
    });

    await expect(
      start({
        enterpriseId: "enterprise-1",
        domainName: "EXAMPLE.COM.",
        actorPrincipalId: "principal-1",
      }),
    ).rejects.toThrow(
      "This Enterprise domain already has a verification record.",
    );
  });

  it("rejects unavailable Enterprises and non-owners before mutation", async () => {
    const unavailable = createFixture();
    unavailable.enterprises.resolve.mockResolvedValue(undefined);
    await expect(
      unavailable.start({
        enterpriseId: "missing",
        domainName: "example.com",
        actorPrincipalId: "principal-1",
      }),
    ).rejects.toThrow("Enterprise account is unavailable.");
    expect(unavailable.save).not.toHaveBeenCalled();

    const denied = createFixture();
    denied.administration.requireEnterpriseOwner.mockRejectedValue(
      new Error("Enterprise owner authorization denied."),
    );
    await expect(
      denied.start({
        enterpriseId: "enterprise-1",
        domainName: "example.com",
        actorPrincipalId: "principal-2",
      }),
    ).rejects.toThrow("Enterprise owner authorization denied.");
    expect(denied.save).not.toHaveBeenCalled();
  });
});
