import { describe, expect, it } from "vitest";
import { PolicyEnterpriseDirectoryAdapter } from "../../adapters/outbound/integrations/policy-enterprise-directory-adapter";

describe("policy enterprise directory adapter", () => {
  it("maps the Enterprise published contract to the consumer-owned Port", async () => {
    const adapter = new PolicyEnterpriseDirectoryAdapter({
      async resolve() {
        return undefined;
      },
      async findByOrganization() {
        return {
          enterpriseId: "enterprise-1",
          name: "Enterprise One",
          organizationAccountIds: ["organization-1"],
        };
      },
    });

    await expect(adapter.findByOrganization("organization-1")).resolves.toEqual(
      { enterpriseId: "enterprise-1" },
    );
  });
});
