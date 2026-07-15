import { describe, expect, it } from "vitest";
import { InMemoryProfileStore } from "../../adapters/outbound/persistence/in-memory-profile-store";
import { InvalidProfileBioError } from "../../domain/profile-presence/errors/invalid-profile-bio-error";
import { PROFILE_BIO_MAX_LENGTH } from "../../domain/profile-presence/value-objects/profile-bio";

describe("InMemoryProfileStore", () => {
  it("maps seed records through Profile Domain construction", () => {
    expect(
      () =>
        new InMemoryProfileStore([
          {
            accountId: "account-1",
            displayName: "Profile",
            bio: "a".repeat(PROFILE_BIO_MAX_LENGTH + 1),
          },
        ]),
    ).toThrow(InvalidProfileBioError);
  });
});
