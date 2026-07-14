export interface AccountAuthorizationDirectory {
  membership(
    accountId: string,
    principalId: string,
  ): Promise<
    | Readonly<{
        principalId: string;
        role: "member" | "owner";
        status: "active" | "removed";
      }>
    | undefined
  >;
  teamIds(accountId: string, principalId: string): Promise<readonly string[]>;
  team(
    accountId: string,
    teamId: string,
  ): Promise<
    | Readonly<{
        teamId: string;
        accountId: string;
      }>
    | undefined
  >;
}
