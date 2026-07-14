export type AccountProfileV1 = Readonly<{
  accountId: string;
  displayName: string;
  bio: string;
  location?: string;
  websiteUrl?: string;
}>;

export interface ProfileDirectoryApiV1 {
  resolve(accountId: string): Promise<AccountProfileV1 | undefined>;
  save(profile: AccountProfileV1): Promise<void>;
}
