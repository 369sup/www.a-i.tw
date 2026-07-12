import { describe, expect, it } from "vitest";
import { createProfileService } from "../../../application/account/use-cases/profile-service";
import { InMemoryAccountStore } from "../../../infrastructure/account/repositories/in-memory-account-store";
import { InMemoryProfileStore } from "../../../infrastructure/account/repositories/in-memory-profile-store";

describe("account profile", () => {
  it("keeps presentation data separate from account identity", async () => {
    const accounts = new InMemoryAccountStore([
      {
        id: "a-1",
        handle: "admin",
        displayName: "Admin",
        kind: "personal",
        status: "active",
        ownerPrincipalId: "p-1",
      },
    ]);
    const service = createProfileService(accounts, new InMemoryProfileStore());
    await service.update({
      accountId: "a-1",
      displayName: "Admin Profile",
      bio: "Visible account presentation.",
    });
    expect(await service.resolve("a-1")).toMatchObject({
      displayName: "Admin Profile",
    });
  });
});
