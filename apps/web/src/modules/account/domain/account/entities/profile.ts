export type AccountProfile = Readonly<{
  accountId: string;
  displayName: string;
  bio: string;
  location?: string;
  websiteUrl?: string;
}>;

export function defineAccountProfile(input: AccountProfile): AccountProfile {
  const displayName = input.displayName.trim();
  const bio = input.bio.trim();
  if (!displayName) throw new Error("Profile display name is required.");
  if (bio.length > 280)
    throw new Error("Profile bio must be 280 characters or fewer.");
  if (input.websiteUrl && !URL.canParse(input.websiteUrl))
    throw new Error("Profile website must be a valid URL.");
  return {
    ...input,
    displayName,
    bio,
    location: input.location?.trim() || undefined,
    websiteUrl: input.websiteUrl?.trim() || undefined,
  };
}
