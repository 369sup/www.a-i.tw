export type PrincipalRefV1 = Readonly<{
  principalId: string;
  status: "active" | "disabled";
}>;

export type AuthenticatedPrincipalV1 = Readonly<{
  principalId: string;
  status: "active" | "disabled";
  assurance: "mock" | "single-factor" | "multi-factor";
  authenticatedAt: string;
}>;

export type LoginSessionV1 = Readonly<{
  token: string;
  authentication: AuthenticatedPrincipalV1;
}>;
