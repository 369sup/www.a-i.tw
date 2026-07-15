import { InvalidSessionIdError } from "../errors/invalid-session-id-error";

declare const sessionIdBrand: unique symbol;

export type SessionId = string & {
  readonly [sessionIdBrand]: "SessionId";
};

export function createSessionId(input: string): SessionId {
  const value = input.trim();
  if (!value) throw new InvalidSessionIdError();
  return value as SessionId;
}
