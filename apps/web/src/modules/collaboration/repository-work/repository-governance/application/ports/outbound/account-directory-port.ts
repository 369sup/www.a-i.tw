export type RepositoryOwnerEligibility = Readonly<{
  account: Readonly<{
    accountId: string;
    handle: string;
    displayName: string;
    kind: "personal" | "organization";
    status: "active" | "suspended";
  }>;
  canOwnRepository: boolean;
}>;

export type RepositoryMembershipFact = Readonly<{
  accountId: string;
  principalId: string;
  role: "member" | "owner";
  status: "active" | "removed";
}>;

export interface AccountDirectory {
  eligibility(
    accountId: string,
  ): Promise<RepositoryOwnerEligibility | undefined>;
  membership(
    accountId: string,
    principalId: string,
  ): Promise<RepositoryMembershipFact | undefined>;
}
