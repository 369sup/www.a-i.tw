import { describe, expect, it } from "vitest";
import { InMemoryUserAccountStore } from "../../adapters/outbound/persistence/in-memory-user-account-store";
import { createUserAccountService } from "../../application/use-cases/user-account-service";

describe("Account Profile", () => {
  it("creates one Personal Account per Principal", async () => {
    const profiles = new Map<
      string,
      { accountId: string; displayName: string; bio: string }
    >();
    const service = createUserAccountService(
      new InMemoryUserAccountStore(),
      {
        async resolve(accountId) {
          return profiles.get(accountId);
        },
        async save(profile) {
          profiles.set(profile.accountId, profile);
        },
      },
      () => "account-1",
    );
    await expect(
      service.create({
        principalId: "principal-1",
        handle: "Ada",
        displayName: "Ada Lovelace",
      }),
    ).resolves.toMatchObject({
      accountId: "account-1",
      handle: "ada",
      kind: "personal",
    });
    await expect(
      service.create({
        principalId: "principal-1",
        handle: "other",
        displayName: "Other",
      }),
    ).rejects.toThrow("already has");
  });
});
