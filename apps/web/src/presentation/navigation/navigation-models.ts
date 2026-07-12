export type NavigationAccount = Readonly<{
  accountId: string;
  handle: string;
  displayName: string;
  kind: "personal" | "organization";
}>;

export type NavigationRepository = Readonly<{
  repositoryId: string;
  ownerAccountId: string;
  ownerHandle: string;
  name: string;
}>;
