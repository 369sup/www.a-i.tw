import { InvalidTeamNameError } from "../errors/invalid-team-name-error";

declare const teamNameBrand: unique symbol;

export type TeamName = string & { readonly [teamNameBrand]: true };

export function createTeamName(value: string): TeamName {
  const name = value.trim().toLowerCase().replaceAll(" ", "-");
  if (!/^[a-z0-9._-]{1,100}$/.test(name)) throw new InvalidTeamNameError();
  return name as TeamName;
}
