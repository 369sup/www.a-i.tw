export type IssuePrincipal = Readonly<{
  principalId: string;
  status: "active" | "disabled";
}>;
