import { InvalidTeamIdError } from "../errors/invalid-team-id-error";

declare const teamIdBrand: unique symbol;

export type TeamId = string & { readonly [teamIdBrand]: true };

export function createTeamId(value: string): TeamId {
  const id = value.trim();
  if (!id) throw new InvalidTeamIdError();
  return id as TeamId;
}
