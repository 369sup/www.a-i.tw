import { describe, expect, it } from "vitest";
import { createCreateAccountHandler } from "../../application/commands/create-account/handler";
import { InMemoryAccountStore } from "../../adapters/outbound/persistence/in-memory-account-store";
import { createAccountHandle } from "../../domain/organization-account/value-objects/account-handle";

describe("Create Organization Account", () => {
  it("creates an active Organization with a canonical handle and initialized Profile", async () => {
    const accounts = new InMemoryAccountStore();
    const profiles = new Map<string, unknown>();
    const handler = createCreateAccountHandler(
      accounts,
      {
        async initialize(profile) {
          profiles.set(profile.accountId, profile);
        },
      },
      () => "account-1",
    );

    const result = await handler.execute({
      principal: { principalId: "principal-1", status: "active" },
      handle: " Example-Org ",
      displayName: "Example Organization",
      kind: "organization",
    });

    expect(result).toMatchObject({
      accountId: "account-1",
      handle: "example-org",
      kind: "organization",
      status: "active",
    });
    expect(profiles.get("account-1")).toMatchObject({
      displayName: "Example Organization",
    });
  });

  it("rejects duplicate canonical handles", async () => {
    const handler = createCreateAccountHandler(
      new InMemoryAccountStore(),
      {
        async initialize() {},
      },
      (() => {
        let id = 0;
        return () => `account-${++id}`;
      })(),
    );
    const principal = { principalId: "principal-1", status: "active" as const };

    await handler.execute({
      principal,
      handle: "Example-Org",
      displayName: "Example",
      kind: "organization",
    });

    await expect(
      handler.execute({
        principal,
        handle: "example-org",
        displayName: "Duplicate",
        kind: "organization",
      }),
    ).rejects.toThrow("already in use");
  });

  it("keeps a failed Profile initialization hidden and retries the same account", async () => {
    const accounts = new InMemoryAccountStore();
    let attempts = 0;
    const handler = createCreateAccountHandler(
      accounts,
      {
        async initialize() {
          attempts += 1;
          if (attempts === 1) throw new Error("Profile unavailable");
        },
      },
      (() => {
        let id = 0;
        return () => `account-${++id}`;
      })(),
    );
    const command = {
      principal: { principalId: "principal-1", status: "active" as const },
      handle: "example-org",
      displayName: "Example",
      kind: "organization" as const,
    };

    await expect(handler.execute(command)).rejects.toThrow(
      "Profile unavailable",
    );
    expect(
      (await accounts.findByHandle(createAccountHandle("example-org")))?.status,
    ).toBe("provisioning");
    await expect(handler.execute(command)).resolves.toMatchObject({
      accountId: "account-1",
      status: "active",
    });
  });
});
