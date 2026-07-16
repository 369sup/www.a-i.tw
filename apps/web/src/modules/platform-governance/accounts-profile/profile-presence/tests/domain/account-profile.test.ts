import { describe, expect, it } from "vitest";
import {
  initializeAccountProfile,
  updateAccountProfile,
} from "../../domain/profile-presence/aggregates/account-profile";

describe("AccountProfile", () => {
  it("owns normalized presentation values", () => {
    const profile = initializeAccountProfile({
      accountId: " account-1 ",
      displayName: " Profile ",
      bio: " Bio ",
      location: " Taipei ",
    });
    expect(profile).toMatchObject({
      accountId: "account-1",
      displayName: "Profile",
      bio: "Bio",
      location: "Taipei",
    });
  });

  it("does not allow an update to change the owner", () => {
    const profile = initializeAccountProfile({
      accountId: "account-1",
      displayName: "Profile",
      bio: "",
    });
    expect(() =>
      updateAccountProfile(profile, {
        accountId: "account-2",
        displayName: "Profile",
        bio: "",
      }),
    ).toThrow("owner cannot be changed");
  });
});
