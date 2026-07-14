import { InvalidProfileDisplayNameError } from "../errors/invalid-profile-display-name.error";

declare const profileDisplayNameBrand: unique symbol;

export type ProfileDisplayName = string & {
  readonly [profileDisplayNameBrand]: "ProfileDisplayName";
};

export function createProfileDisplayName(input: string): ProfileDisplayName {
  const value = input.trim();
  if (!value)
    throw new InvalidProfileDisplayNameError(
      "Profile display name is required.",
    );
  return value as ProfileDisplayName;
}
