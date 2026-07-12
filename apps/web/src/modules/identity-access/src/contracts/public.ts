export type PrincipalRefV1 = Readonly<{
  principalId: string;
  handle: string;
  displayName: string;
  status: "active" | "disabled";
}>;

export type AuthenticatedPrincipalV1 = Readonly<{
  principal: PrincipalRefV1;
  authenticatedAt: string;
}>;

export type LoginSessionV1 = Readonly<{
  token: string;
  authentication: AuthenticatedPrincipalV1;
}>;
