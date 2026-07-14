export type AccountProfileFact = Readonly<{
  accountId: string;
  displayName: string;
  bio: string;
  location?: string;
  websiteUrl?: string;
}>;

export interface ProfileDirectory {
  resolve(accountId: string): Promise<AccountProfileFact | undefined>;
  save(profile: AccountProfileFact): Promise<void>;
}
