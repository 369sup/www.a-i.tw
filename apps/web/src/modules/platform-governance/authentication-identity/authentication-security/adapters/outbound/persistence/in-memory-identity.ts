import type { CredentialVerifier } from "../../../application/ports/outbound/credential-verifier.port";
import type { PrincipalStore } from "../../../application/ports/outbound/principal-store.port";
import type { SessionStore } from "../../../application/ports/outbound/session-store.port";
import {
  createPrincipal,
  type Principal,
} from "../../../domain/authentication-security/entities/principal";
import type { Session } from "../../../domain/authentication-security/entities/session";

export type PrincipalSeed = Readonly<{
  id: string;
  kind: string;
  status: string;
}>;

export class InMemoryPrincipalStore implements PrincipalStore {
  private readonly principals: Principal[];

  constructor(seed: readonly PrincipalSeed[]) {
    this.principals = seed.map(createPrincipal);
  }
  async list() {
    return [...this.principals];
  }
  async find(principalId: string) {
    return this.principals.find((item) => item.id === principalId);
  }
}

export class InMemorySessionStore implements SessionStore {
  private readonly sessions = new Map<string, Session>();
  async find(token: string) {
    return this.sessions.get(token);
  }
  async save(token: string, session: Session) {
    this.sessions.set(token, session);
  }
}

export class MockCredentialVerifier implements CredentialVerifier {
  async verify(login: string, password: string) {
    if (password !== "123456") return undefined;
    const principalId =
      login === "admin"
        ? "principal-ada"
        : login === "grace"
          ? "principal-grace"
          : undefined;
    return principalId
      ? {
          principalId,
          method: "password" as const,
          assurance: "mock" as const,
        }
      : undefined;
  }
}
