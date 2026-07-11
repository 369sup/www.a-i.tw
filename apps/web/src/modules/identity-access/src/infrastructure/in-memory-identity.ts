import type { AuthenticatedPrincipalV1 } from "../contracts/public";
import type { Principal } from "../domain/principal";
import type {
  PrincipalStore,
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
  private session?: AuthenticatedPrincipalV1;
  async current() {
    return this.session;
  }
  async save(session: AuthenticatedPrincipalV1) {
    this.session = session;
  }
  async clear() {
    this.session = undefined;
  }
}
