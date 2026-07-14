import { describe, expect, it } from "vitest";

import { AccountDirectoryAdapter } from "../../adapters/outbound/integrations/account-directory.adapter";

describe("AccountDirectoryAdapter", () => {
  it("maps provider Account Membership facts without Repository Role translation", async () => {
    const adapter = new AccountDirectoryAdapter(
      {
        resolve: async () => undefined,
        resolveByPrincipal: async () => undefined,
        eligibility: async () => undefined,
      },
      {
        eligibility: async () => undefined,
        resolve: async () => undefined,
      },
      {
        membership: async (accountId: string, principalId: string) => ({
          membershipId: "membership-1",
          accountId,
          principalId,
          role: "owner",
          status: "active",
        }),
        teamMemberships: async (accountId: string, principalId: string) => ({
          accountId,
          principalId,
          teamIds: [],
        }),
        team: async () => undefined,
      },
    );

    await expect(
      adapter.membership("account-1", "principal-1"),
    ).resolves.toMatchObject({ role: "owner", status: "active" });
  });
});
