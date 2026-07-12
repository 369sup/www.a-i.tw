import { describe, expect, it } from "vitest";
import { createAccountService } from "../../../application/account/use-cases/account-service";
import { InMemoryAccountStore } from "../../../infrastructure/account/repositories/in-memory-account-store";
import { InMemoryProfileStore } from "../../../infrastructure/account/repositories/in-memory-profile-store";
import { InMemoryMembershipStore } from "../../../infrastructure/account/repositories/in-memory-membership";

describe("account", () => {
  it("normalizes and protects globally unique handles", async () => {
    const service = createAccountService(
      new InMemoryAccountStore(),
      new InMemoryProfileStore(),
      new InMemoryMembershipStore(),
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
