import { describe, expect, it } from "vitest";
import { composeDashboard } from "./dashboard-read-model";
describe("Dashboard read model", () =>
  it("composes consumer-shaped owner results", async () => {
    await expect(
      composeDashboard(
        { principalId: "u", displayName: "User" },
        {
          accounts: async () => [],
          repositories: async () => [],
          inboxUnreadCount: async () => 2,
          feed: async () => [],
        },
      ),
    ).resolves.toMatchObject({
      inboxUnreadCount: 2,
      actor: { principalId: "u" },
    });
  }));
