import { InvalidProfileBioError } from "../errors/invalid-profile-bio.error";

declare const profileBioBrand: unique symbol;

export const PROFILE_BIO_MAX_LENGTH = 160;

export type ProfileBio = string & {
  readonly [profileBioBrand]: "ProfileBio";
};

export function createProfileBio(input: string): ProfileBio {
  const value = input.trim();
  if (value.length > PROFILE_BIO_MAX_LENGTH)
    throw new InvalidProfileBioError(
      `Profile bio must be ${PROFILE_BIO_MAX_LENGTH} characters or fewer.`,
    );
  return value as ProfileBio;
}
