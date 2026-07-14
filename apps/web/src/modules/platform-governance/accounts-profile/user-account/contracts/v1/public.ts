export type PersonalAccountRefV1 = Readonly<{
  accountId: string;
  handle: string;
  displayName: string;
  kind: "personal";
  status: "active" | "suspended";
  personalPrincipalId: string;
}>;
export type PersonalAccountEligibilityV1 = Readonly<{
  account: PersonalAccountRefV1;
  canOwnRepository: boolean;
}>;
export interface PersonalAccountDirectoryApiV1 {
  resolve(accountId: string): Promise<PersonalAccountRefV1 | undefined>;
  resolveByPrincipal(
    principalId: string,
  ): Promise<PersonalAccountRefV1 | undefined>;
  eligibility(
    accountId: string,
  ): Promise<PersonalAccountEligibilityV1 | undefined>;
}
