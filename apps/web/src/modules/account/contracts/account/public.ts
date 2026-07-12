export type AccountRefV1 = Readonly<{
  accountId: string;
  handle: string;
  displayName: string;
  kind: "personal" | "organization";
  status: "active" | "suspended";
  personalPrincipalId?: string;
}>;

export type AccountEligibilityV1 = Readonly<{
  account: AccountRefV1;
  canOwnRepository: boolean;
}>;

export type AccountProfileV1 = Readonly<{
  accountId: string;
  displayName: string;
  bio: string;
  location?: string;
  websiteUrl?: string;
}>;
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

export interface AccountDirectoryApiV1 {
  eligibility(accountId: string): Promise<AccountEligibilityV1 | undefined>;
  membership(
    accountId: string,
    principalId: string,
  ): Promise<MembershipFactV1 | undefined>;
  teamMemberships(
    accountId: string,
    principalId: string,
  ): Promise<TeamMembershipFactV1>;
}
