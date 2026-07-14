export type RepositoryPrincipal = Readonly<{
  principalId: string;
  status: "active" | "disabled";
}>;
