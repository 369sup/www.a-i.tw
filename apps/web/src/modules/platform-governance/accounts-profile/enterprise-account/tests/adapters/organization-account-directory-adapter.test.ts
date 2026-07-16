import { describe, expect, it } from "vitest";
import { OrganizationAccountDirectoryAdapter } from "../../adapters/outbound/integrations/organization-account-directory-adapter";

describe("OrganizationAccountDirectoryAdapter", () => {
  it("maps provider eligibility to the consumer affiliation fact", async () => {
    const adapter = new OrganizationAccountDirectoryAdapter({
      async resolve() {
        return undefined;
      },
      async eligibility(accountId) {
        return {
          account: {
            accountId,
            handle: "example",
            displayName: "Example",
            kind: "organization",
            status: "active",
          },
          canOwnRepository: true,
        };
      },
    });

    await expect(adapter.resolve("organization-1")).resolves.toEqual({
      organizationAccountId: "organization-1",
      status: "active",
    });
  });
});
