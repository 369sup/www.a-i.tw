import { describe, expect, it, vi } from "vitest";
import { InMemoryUserAccountStore } from "../../adapters/outbound/persistence/in-memory-user-account-store";
import { createUserAccountService } from "../../application/use-cases/user-account-service";
import type { AccountProfileFact } from "../../application/ports/outbound/profile-directory-port";

describe("Account Profile", () => {
  it("creates one Personal Account per Principal", async () => {
    const profiles = new Map<
      string,
      { accountId: string; displayName: string; bio: string }
    >();
    const service = createUserAccountService(
      new InMemoryUserAccountStore(),
      {
        async initialize(profile) {
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

  it("resumes provisioning after Profile initialization fails", async () => {
    const store = new InMemoryUserAccountStore();
    const profiles = new Map<string, AccountProfileFact>();
    const initialize = vi.fn(async (profile: AccountProfileFact) => {
      profiles.set(profile.accountId, profile);
    });
    initialize.mockRejectedValueOnce(new Error("Profile unavailable."));
    const nextId = vi.fn(() => "account-1");
    const service = createUserAccountService(
      store,
      {
        initialize,
      },
      nextId,
    );
    const input = {
      principalId: " principal-1 ",
      handle: "Ada",
      displayName: "Ada Lovelace",
    };

    await expect(service.create(input)).rejects.toThrow("Profile unavailable");
    await expect(service.resolveByPrincipal("principal-1")).resolves.toBe(
      undefined,
    );
    await expect(service.create(input)).resolves.toMatchObject({
      accountId: "account-1",
      handle: "ada",
      status: "active",
    });
    expect(nextId).toHaveBeenCalledTimes(1);
    expect(initialize).toHaveBeenCalledTimes(2);
    await expect(store.findByPrincipal("principal-1")).resolves.toMatchObject({
      id: "account-1",
      status: "active",
    });
  });

  it("resolves Account truth without consulting Profile availability", async () => {
    const initialize = vi.fn(async () => undefined);
    const service = createUserAccountService(
      new InMemoryUserAccountStore(),
      { initialize },
      () => "account-1",
    );
    await service.create({
      principalId: "principal-1",
      handle: "Ada",
      displayName: "Ada Lovelace",
    });
    initialize.mockRejectedValue(new Error("Profile unavailable."));

    await expect(service.resolveByPrincipal("principal-1")).resolves.toEqual({
      accountId: "account-1",
      handle: "ada",
      kind: "personal",
      personalPrincipalId: "principal-1",
      status: "active",
    });
    expect(initialize).toHaveBeenCalledTimes(1);
  });
});
