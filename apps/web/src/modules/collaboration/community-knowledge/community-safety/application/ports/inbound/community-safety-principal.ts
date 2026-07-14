export type CommunitySafetyPrincipal = Readonly<{
  principalId: string;
  status: "active" | "disabled";
}>;
