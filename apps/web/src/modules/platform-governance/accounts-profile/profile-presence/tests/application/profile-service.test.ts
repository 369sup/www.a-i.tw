import { describe, expect, it } from "vitest";
import { createProfileService } from "../../application/use-cases/profile-service";
import { InMemoryProfileStore } from "../../adapters/outbound/persistence/in-memory-profile-store";

describe("account profile", () => {
  it("keeps presentation data separate from account identity", async () => {
    const accounts = {
      async exists(accountId: string) {
        return accountId === "a-1";
      },
    };
    const service = createProfileService(accounts, new InMemoryProfileStore());
    await service.update({
      accountId: "a-1",
      displayName: "  Admin Profile  ",
      bio: "  Visible account presentation.  ",
      websiteUrl: "https://example.com/profile",
    });
    expect(await service.resolve("a-1")).toMatchObject({
      displayName: "Admin Profile",
      bio: "Visible account presentation.",
      websiteUrl: "https://example.com/profile",
    });
  });

  it("rejects updates for an unknown account before persistence", async () => {
    const service = createProfileService(
      {
        async exists() {
          return false;
        },
      },
      new InMemoryProfileStore(),
    );

    await expect(
      service.update({
        accountId: "missing",
        displayName: "Missing",
        bio: "",
      }),
    ).rejects.toThrow("Account not found.");
  });
});
