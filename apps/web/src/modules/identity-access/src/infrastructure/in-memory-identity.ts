import type { AuthenticatedPrincipalV1 } from "../contracts/public";
import type { Principal } from "../domain/principal";
import type {
  PrincipalStore,
  CredentialVerifier,
  SessionStore,
} from "../application/identity-service";

export class InMemoryPrincipalStore implements PrincipalStore {
  constructor(private readonly principals: Principal[]) {}
  async list() {
    return [...this.principals];
  }
  async find(principalId: string) {
    return this.principals.find((item) => item.id === principalId);
  }
}

export class InMemorySessionStore implements SessionStore {
  private readonly sessions = new Map<string, AuthenticatedPrincipalV1>();
  async find(token: string) {
    return this.sessions.get(token);
  }
  async save(token: string, session: AuthenticatedPrincipalV1) {
    this.sessions.set(token, session);
  }
  async clear(token: string) {
    this.sessions.delete(token);
  }
}

export class MockCredentialVerifier implements CredentialVerifier {
  async verify(login: string, password: string) {
    return login === "admin" && password === "123456"
      ? "principal-ada"
      : undefined;
  }
}
