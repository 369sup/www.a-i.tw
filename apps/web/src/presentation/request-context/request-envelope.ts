export type PrincipalView = Readonly<{
  principalId: string;
  handle: string;
  displayName: string;
  status: "active" | "disabled";
}>;

export type AuthenticationView = Readonly<{
  principal: PrincipalView;
  authenticatedAt: string;
}>;

export type ActiveScopeRefV1 = Readonly<{
  type: "personal" | "organization";
  accountId: string;
}>;

export type RequestEnvelopeV1 = Readonly<{
  viewer: PrincipalView;
  actor: PrincipalView;
  credential: Readonly<{
    type: "browser-session";
    method: "mock-password";
    assurance: "single-factor";
    authenticatedAt: string;
  }>;
  correlationId: string;
  activeScope: ActiveScopeRefV1;
}>;

export function createBrowserRequestEnvelope(input: {
  authentication: AuthenticationView;
  correlationId: string;
  activeScope: ActiveScopeRefV1;
}): RequestEnvelopeV1 {
  return {
    viewer: input.authentication.principal,
    actor: input.authentication.principal,
    credential: {
      type: "browser-session",
      method: "mock-password",
      assurance: "single-factor",
      authenticatedAt: input.authentication.authenticatedAt,
    },
    correlationId: input.correlationId,
    activeScope: input.activeScope,
  };
}
