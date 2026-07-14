import type { Team } from "../../../domain/organization-participation/entities/team";

export interface TeamStore {
  list(accountId: string): Promise<Team[]>;
  find(teamId: string): Promise<Team | undefined>;
  findByAccountAndName(
    accountId: string,
    name: string,
  ): Promise<Team | undefined>;
  save(team: Team): Promise<void>;
}
