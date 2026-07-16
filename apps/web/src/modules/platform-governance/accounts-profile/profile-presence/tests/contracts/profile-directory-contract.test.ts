import { describe, expect, it } from "vitest";
import type { AccountProfileV1 } from "../../contracts/v1/public";

describe("ProfileDirectoryApiV1", () => {
  it("keeps the Published Language primitive and presentation-only", () => {
    const profile = {
      accountId: "account-1",
      displayName: "Profile",
      bio: "",
    } satisfies AccountProfileV1;
    expect(profile).toEqual({
      accountId: "account-1",
      displayName: "Profile",
      bio: "",
    });
  });
});
