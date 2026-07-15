export type PersonalAppOwner = Readonly<{
  accountId: string;
  handle: string;
  status: "active" | "suspended";
}>;

export interface PersonalAppOwnerDirectory {
  resolveByPrincipal(
    principalId: string,
  ): Promise<PersonalAppOwner | undefined>;
}
