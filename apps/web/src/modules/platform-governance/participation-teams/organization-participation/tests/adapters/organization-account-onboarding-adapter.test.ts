import { describe, expect, it } from "vitest";
import { OrganizationAccountOnboardingAdapter } from "../../adapters/outbound/integrations/organization-account-onboarding-adapter";

describe("OrganizationAccountOnboardingAdapter", () => {
  it("maps Account directory and provisioning Published Language", async () => {
    const account = {
      accountId: "organization-1",
      handle: "example",
      kind: "organization" as const,
      status: "active" as const,
    };
    const adapter = new OrganizationAccountOnboardingAdapter({
      async resolve() {
        return account;
      },
      async eligibility() {
        return { account, canOwnRepository: true };
      },
      async provision() {
        return account;
      },
    });

    await expect(adapter.resolve(account.accountId)).resolves.toEqual({
      kind: "organization",
      status: "active",
    });
    await expect(
      adapter.provision({
        principal: { principalId: "principal-1", status: "active" },
        handle: "example",
        displayName: "Example",
      }),
    ).resolves.toEqual(account);
  });
});
