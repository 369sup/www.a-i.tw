import {
  createProfileBio,
  type ProfileBio,
} from "../value-objects/profile-bio";
import {
  createProfileDisplayName,
  type ProfileDisplayName,
} from "../value-objects/profile-display-name";
import {
  createProfileOwnerId,
  type ProfileOwnerId,
} from "../value-objects/profile-owner-id";
import {
  createProfileWebsite,
  type ProfileWebsite,
} from "../value-objects/profile-website";

export type AccountProfile = Readonly<{
  accountId: ProfileOwnerId;
  displayName: ProfileDisplayName;
  bio: ProfileBio;
  location?: string;
  websiteUrl?: ProfileWebsite;
}>;

export type AccountProfileInput = Readonly<{
  accountId: string;
  displayName: string;
  bio: string;
  location?: string;
  websiteUrl?: string;
}>;

export function initializeAccountProfile(
  input: AccountProfileInput,
): AccountProfile {
  return buildAccountProfile(input);
}

export function updateAccountProfile(
  current: AccountProfile,
  input: AccountProfileInput,
): AccountProfile {
  const candidate = buildAccountProfile(input);
  if (candidate.accountId !== current.accountId) {
    throw new Error("Profile owner cannot be changed.");
  }
  return candidate;
}

export function profilesAreEqual(
  left: AccountProfile,
  right: AccountProfile,
): boolean {
  return (
    left.accountId === right.accountId &&
    left.displayName === right.displayName &&
    left.bio === right.bio &&
    left.location === right.location &&
    left.websiteUrl === right.websiteUrl
  );
}

function buildAccountProfile(input: AccountProfileInput): AccountProfile {
  return {
    accountId: createProfileOwnerId(input.accountId),
    displayName: createProfileDisplayName(input.displayName),
    bio: createProfileBio(input.bio),
    location: input.location?.trim() || undefined,
    websiteUrl: createProfileWebsite(input.websiteUrl),
  };
}
