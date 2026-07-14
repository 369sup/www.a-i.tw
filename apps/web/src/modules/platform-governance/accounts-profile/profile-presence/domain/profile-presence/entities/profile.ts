import {
  createProfileOwnerId,
  type ProfileOwnerId,
} from "../value-objects/profile-owner-id";
import {
  createProfileBio,
  type ProfileBio,
} from "../value-objects/profile-bio";
import {
  createProfileDisplayName,
  type ProfileDisplayName,
} from "../value-objects/profile-display-name";
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

export type DefineAccountProfileInput = Readonly<{
  accountId: string;
  displayName: string;
  bio: string;
  location?: string;
  websiteUrl?: string;
}>;

export function defineAccountProfile(
  input: DefineAccountProfileInput,
): AccountProfile {
  return {
    accountId: createProfileOwnerId(input.accountId),
    displayName: createProfileDisplayName(input.displayName),
    bio: createProfileBio(input.bio),
    location: input.location?.trim() || undefined,
    websiteUrl: createProfileWebsite(input.websiteUrl),
  };
}
