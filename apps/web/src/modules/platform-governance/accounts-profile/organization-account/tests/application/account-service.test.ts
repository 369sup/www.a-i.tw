import { describe, expect, it } from "vitest";
import { createAccountService } from "../../application/use-cases/account-service";
import { InMemoryAccountStore } from "../../adapters/outbound/persistence/in-memory-account-store";

describe("account", () => {
  it("normalizes and protects globally unique handles", async () => {
    const service = createAccountService(
      new InMemoryAccountStore(),
      memoryProfiles(),
      { async save() {} },
      () => "a-1",
      () => "membership-1",
      () => new Date(0),
    );
    const principal = {
      principalId: "p-1",
      status: "active" as const,
    };
    await service.create({
      principal,
      handle: "Example-Org",
      displayName: "Example",
      kind: "organization",
    });
    await expect(
      service.create({
        principal,
        handle: "example-org",
        displayName: "Duplicate",
        kind: "organization",
      }),
    ).rejects.toThrow("already in use");
  });
});

function memoryProfiles() {
  const profiles = new Map<string, { displayName: string }>();
  return {
    async resolve(accountId: string) {
      return profiles.get(accountId);
    },
    async save(profile: { accountId: string; displayName: string }) {
      profiles.set(profile.accountId, profile);
    },
  };
}
