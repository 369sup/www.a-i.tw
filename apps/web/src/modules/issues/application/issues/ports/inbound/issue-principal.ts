export type IssuePrincipal = Readonly<{
  principalId: string;
  handle: string;
  displayName: string;
  status: "active" | "disabled";
}>;
