export interface ProfileDirectory {
  initialize(profile: {
    accountId: string;
    displayName: string;
    bio: string;
  }): Promise<void>;
}
