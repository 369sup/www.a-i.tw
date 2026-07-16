export type AccountProfileFact = Readonly<{
  accountId: string;
  displayName: string;
  bio: string;
  location?: string;
  websiteUrl?: string;
}>;

export interface ProfileDirectory {
  initialize(profile: AccountProfileFact): Promise<void>;
}
