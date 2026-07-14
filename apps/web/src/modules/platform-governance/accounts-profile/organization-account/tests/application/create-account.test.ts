import { describe, expect, it } from "vitest";
import { createCreateAccountHandler } from "../../application/commands/create-account/handler";
import { InMemoryAccountStore } from "../../adapters/outbound/persistence/in-memory-account-store";

describe("Create Account", () => {
  it("creates an Organization with a canonical handle and owner Membership", async () => {
    const accounts = new InMemoryAccountStore();
    const membershipItems = new Map<string, unknown>();
    const memberships = {
      async save(value: { principalId: string }) {
        membershipItems.set(value.principalId, value);
      },
    };
    const handler = createCreateAccountHandler(
      accounts,
      {
        async resolve() {
          return undefined;
        },
        async save() {},
      },
      memberships,
      () => "account-1",
      () => "membership-1",
      () => new Date("2026-07-13T00:00:00.000Z"),
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
    await expect(
      Promise.resolve(membershipItems.get("principal-1")),
    ).resolves.toMatchObject({ role: "owner", status: "active" });
  });

  it("rejects duplicate canonical handles", async () => {
    const handler = createCreateAccountHandler(
      new InMemoryAccountStore(),
      {
        async resolve() {
          return undefined;
        },
        async save() {},
      },
      { async save() {} },
      (() => {
        let id = 0;
        return () => `account-${++id}`;
      })(),
      () => "membership-1",
      () => new Date(0),
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
});
