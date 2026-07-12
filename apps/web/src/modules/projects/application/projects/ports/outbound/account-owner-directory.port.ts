export interface AccountOwnerDirectory {
  isOwner(input: { accountId: string; principalId: string }): Promise<boolean>;
}
