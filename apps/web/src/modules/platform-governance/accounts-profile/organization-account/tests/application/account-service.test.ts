import { describe, expect, it, vi } from "vitest";
import { createAccountService } from "../../application/use-cases/account-service";
import { InMemoryAccountStore } from "../../adapters/outbound/persistence/in-memory-account-store";

describe("account", () => {
  it("normalizes and protects globally unique handles", async () => {
    const service = createAccountService(
      new InMemoryAccountStore(),
      memoryProfiles(),
      () => "a-1",
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

  it("resolves identity and eligibility without consulting Profile availability", async () => {
    const initialize = vi.fn(async () => undefined);
    const service = createAccountService(
      new InMemoryAccountStore(),
      { initialize },
      () => "a-1",
    );
    const account = await service.create({
      principal: { principalId: "p-1", status: "active" },
      handle: "Example-Org",
      displayName: "Example",
      kind: "organization",
    });
    initialize.mockRejectedValue(new Error("Profile unavailable."));

    await expect(service.resolve(account.accountId)).resolves.toEqual(account);
    await expect(service.eligibility(account.accountId)).resolves.toEqual({
      account,
      canOwnRepository: true,
    });
    expect(initialize).toHaveBeenCalledTimes(1);
  });
});

function memoryProfiles() {
  const profiles = new Map<string, { displayName: string }>();
  return {
    async initialize(profile: { accountId: string; displayName: string }) {
      profiles.set(profile.accountId, profile);
    },
  };
}
