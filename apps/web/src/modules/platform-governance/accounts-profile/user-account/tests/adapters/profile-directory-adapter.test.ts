import { describe, expect, it, vi } from "vitest";
import { ProfileDirectoryAdapter } from "../../adapters/outbound/integrations/profile-directory-adapter";

describe("ProfileDirectoryAdapter", () => {
  it("maps Profile initialization through the provider contract", async () => {
    const initialize = vi.fn(async (profile) => profile);
    const adapter = new ProfileDirectoryAdapter({
      async resolve() {
        return undefined;
      },
      initialize,
    });
    const profile = { accountId: "account-1", displayName: "Ada", bio: "" };

    await adapter.initialize(profile);

    expect(initialize).toHaveBeenCalledWith(profile);
  });
});
