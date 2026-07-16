import { describe, expect, it } from "vitest";
import { createProfileService } from "../../application/use-cases/profile-service";
import { InMemoryProfileStore } from "../../adapters/outbound/persistence/in-memory-profile-store";

describe("account profile", () => {
  it("keeps presentation data separate from account identity", async () => {
    const service = createProfileService(new InMemoryProfileStore());
    await service.initialize({
      accountId: "a-1",
      displayName: "Initial",
      bio: "",
    });
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

  it("initializes idempotently and rejects conflicting initialization", async () => {
    const service = createProfileService(new InMemoryProfileStore());
    const input = { accountId: "a-1", displayName: "Profile", bio: "" };

    await expect(service.initialize(input)).resolves.toMatchObject(input);
    await expect(service.initialize(input)).resolves.toMatchObject(input);
    await expect(
      service.initialize({ ...input, displayName: "Different" }),
    ).rejects.toThrow("already initialized");
  });

  it("rejects updates when no Profile Aggregate has been initialized", async () => {
    const service = createProfileService(new InMemoryProfileStore());
    await expect(
      service.update({
        accountId: "missing",
        displayName: "Missing",
        bio: "",
      }),
    ).rejects.toThrow("Profile not found.");
  });
});
