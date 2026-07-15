import { describe, expect, it } from "vitest";
import { InvalidProfileBioError } from "../../domain/profile-presence/errors/invalid-profile-bio-error";
import { InvalidProfileDisplayNameError } from "../../domain/profile-presence/errors/invalid-profile-display-name-error";
import { InvalidProfileWebsiteError } from "../../domain/profile-presence/errors/invalid-profile-website-error";
import {
  createProfileBio,
  PROFILE_BIO_MAX_LENGTH,
} from "../../domain/profile-presence/value-objects/profile-bio";
import { createProfileDisplayName } from "../../domain/profile-presence/value-objects/profile-display-name";
import { createProfileWebsite } from "../../domain/profile-presence/value-objects/profile-website";

describe("Profile value objects", () => {
  it("canonicalizes display name, bio and website at construction", () => {
    expect(createProfileDisplayName("  Ada Lovelace  ")).toBe("Ada Lovelace");
    expect(createProfileBio("  Computing pioneer.  ")).toBe(
      "Computing pioneer.",
    );
    expect(createProfileWebsite(" https://example.com/profile ")).toBe(
      "https://example.com/profile",
    );
    expect(createProfileWebsite("   ")).toBeUndefined();
  });

  it("requires a display name", () => {
    expect(() => createProfileDisplayName("   ")).toThrow(
      InvalidProfileDisplayNameError,
    );
  });

  it("limits the bio to the GitHub profile boundary", () => {
    expect(createProfileBio("a".repeat(PROFILE_BIO_MAX_LENGTH))).toHaveLength(
      PROFILE_BIO_MAX_LENGTH,
    );
    expect(() =>
      createProfileBio("a".repeat(PROFILE_BIO_MAX_LENGTH + 1)),
    ).toThrow(InvalidProfileBioError);
  });

  it.each(["example.com", "javascript:alert(1)", "ftp://example.com"])(
    "rejects unsafe or non-absolute ProfileWebsite %j",
    (value) => {
      expect(() => createProfileWebsite(value)).toThrow(
        InvalidProfileWebsiteError,
      );
    },
  );
});
