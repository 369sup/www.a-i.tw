import { describe, expect, it } from "vitest";
import { AdministrativeEnterpriseDirectoryAdapter } from "../../adapters/outbound/integrations/administrative-enterprise-directory-adapter";

describe("administrative enterprise directory adapter", () => {
  it("resolves Enterprise existence through the published contract", async () => {
    const adapter = new AdministrativeEnterpriseDirectoryAdapter({
      async resolve(enterpriseId) {
        return enterpriseId === "enterprise-1"
          ? {
              enterpriseId,
              name: "Enterprise One",
              organizationAccountIds: [],
            }
          : undefined;
      },
      async findByOrganization() {
        return undefined;
      },
    });

    await expect(adapter.exists("enterprise-1")).resolves.toBe(true);
    await expect(adapter.exists("enterprise-missing")).resolves.toBe(false);
  });
});
