export type MembershipFactV1 = Readonly<{
  membershipId: string;
  accountId: string;
  principalId: string;
  role: "member" | "owner";
  status: "active" | "removed";
}>;
export type TeamRefV1 = Readonly<{
  teamId: string;
  accountId: string;
  name: string;
  memberMembershipIds: readonly string[];
}>;
export type TeamMembershipFactV1 = Readonly<{
  accountId: string;
  principalId: string;
  teamIds: readonly string[];
}>;
export interface OrganizationParticipationApiV1 {
  membership(
    accountId: string,
    principalId: string,
  ): Promise<MembershipFactV1 | undefined>;
  teamMemberships(
    accountId: string,
    principalId: string,
  ): Promise<TeamMembershipFactV1>;
  team(accountId: string, teamId: string): Promise<TeamRefV1 | undefined>;
}
