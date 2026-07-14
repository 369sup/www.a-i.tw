export interface ProfileDirectory {
  resolve(accountId: string): Promise<{ displayName: string } | undefined>;
  save(profile: {
    accountId: string;
    displayName: string;
    bio: string;
  }): Promise<void>;
}
