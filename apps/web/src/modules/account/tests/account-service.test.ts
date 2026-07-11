import { describe, expect, it } from "vitest";
import { createAccountService } from "../src/application/account-service";
import { InMemoryAccountStore } from "../src/infrastructure/in-memory-account-store";

describe("account", () => {
  it("normalizes and protects globally unique handles", async () => {
    const service = createAccountService(
      new InMemoryAccountStore(),
      () => "a-1",
    );
    const principal = {
      principalId: "p-1",
      handle: "ada",
      displayName: "Ada",
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
