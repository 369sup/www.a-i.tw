import { describe, expect, it } from "vitest";

import { AccountDirectoryAdapter } from "../../../infrastructure/repository/integrations/outbound/account-directory.adapter";

describe("AccountDirectoryAdapter", () => {
  it("maps provider Team membership facts to Repository-owned team ids", async () => {
    const adapter = new AccountDirectoryAdapter({
      eligibility: async () => undefined,
      membership: async () => undefined,
      teamMemberships: async (accountId, principalId) => ({
        accountId,
        principalId,
        teamIds: ["team-1"],
      }),
    });

    await expect(adapter.teamIds("account-1", "principal-1")).resolves.toEqual([
      "team-1",
    ]);
  });
});
