export interface ProfileAccountDirectory {
  exists(accountId: string): Promise<boolean>;
}
