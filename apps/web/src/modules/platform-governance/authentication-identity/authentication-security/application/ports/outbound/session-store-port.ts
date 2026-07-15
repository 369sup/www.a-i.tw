import type { Session } from "../../../domain/authentication-security/entities/session";

export interface SessionStore {
  find(token: string): Promise<Session | undefined>;
  save(token: string, session: Session): Promise<void>;
}
