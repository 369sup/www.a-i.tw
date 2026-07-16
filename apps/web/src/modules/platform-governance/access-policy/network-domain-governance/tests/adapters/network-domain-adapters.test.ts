import { describe, expect, it, vi } from "vitest";
import { completeDomainVerificationFromForm } from "../../adapters/inbound/server-actions/complete-domain-verification";
import { startDomainVerificationFromForm } from "../../adapters/inbound/server-actions/start-domain-verification";
import { NetworkDomainAdministrationAdapter } from "../../adapters/outbound/integrations/network-domain-administration-adapter";
import { NetworkDomainEnterpriseDirectoryAdapter } from "../../adapters/outbound/integrations/network-domain-enterprise-directory-adapter";
import type { NetworkDomainGovernance } from "../../application/ports/inbound/network-domain-governance";

describe("Network domain adapters", () => {
  it("maps upstream Published Language through consumer-owned ACLs", async () => {
    const resolve = vi.fn().mockResolvedValue({
      enterpriseId: "enterprise-1",
      name: "Acme",
      organizationAccountIds: [],
    });
    const requireEnterpriseOwner = vi.fn().mockResolvedValue(undefined);

    await expect(
      new NetworkDomainEnterpriseDirectoryAdapter({
        resolve,
        findByOrganization: vi.fn(),
      }).resolve("enterprise-1"),
    ).resolves.toEqual({ enterpriseId: "enterprise-1", name: "Acme" });
    await new NetworkDomainAdministrationAdapter({
      requireEnterpriseOwner,
    }).requireEnterpriseOwner("enterprise-1", "principal-1");

    expect(resolve).toHaveBeenCalledWith("enterprise-1");
    expect(requireEnterpriseOwner).toHaveBeenCalledWith(
      "enterprise-1",
      "principal-1",
    );
  });

  it("maps form inputs into transport-neutral use cases", async () => {
    const governance = {
      start: vi.fn(),
      complete: vi.fn(),
      list: vi.fn(),
    } satisfies NetworkDomainGovernance;

    await startDomainVerificationFromForm(
      governance,
      "principal-1",
      formData({
        enterpriseId: " enterprise-1 ",
        domainName: " Example.com. ",
      }),
    );
    await completeDomainVerificationFromForm(
      governance,
      "principal-1",
      formData({
        enterpriseId: " enterprise-1 ",
        verificationId: " verification-1 ",
      }),
    );

    expect(governance.start).toHaveBeenCalledWith({
      enterpriseId: "enterprise-1",
      domainName: "Example.com.",
      actorPrincipalId: "principal-1",
    });
    expect(governance.complete).toHaveBeenCalledWith({
      enterpriseId: "enterprise-1",
      verificationId: "verification-1",
      actorPrincipalId: "principal-1",
    });
  });

  it("rejects incomplete inbound forms before invoking a use case", async () => {
    const governance = {
      start: vi.fn(),
      complete: vi.fn(),
      list: vi.fn(),
    } satisfies NetworkDomainGovernance;

    await expect(
      startDomainVerificationFromForm(
        governance,
        "principal-1",
        formData({ enterpriseId: "enterprise-1" }),
      ),
    ).rejects.toThrow("domainName is required.");
    expect(governance.start).not.toHaveBeenCalled();
  });
});

function formData(values: Readonly<Record<string, string>>) {
  const data = new FormData();
  for (const [name, value] of Object.entries(values)) data.set(name, value);
  return data;
}
