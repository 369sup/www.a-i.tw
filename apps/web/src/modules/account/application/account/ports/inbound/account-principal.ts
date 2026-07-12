export type AccountPrincipal = Readonly<{
  principalId: string;
  status: "active" | "disabled";
}>;
