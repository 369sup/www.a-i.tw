export type AccountRefV1 = Readonly<{
  accountId: string;
  handle: string;
  displayName: string;
  kind: "personal" | "organization";
  status: "active" | "suspended";
}>;

export type AccountEligibilityV1 = Readonly<{
  account: AccountRefV1;
  canOwnRepository: boolean;
}>;
export type MembershipFactV1 = Readonly<{
  accountId: string;
  principalId: string;
  role: "member" | "owner";
  status: "active" | "removed";
}>;
