import type { TeamStore } from "../../../application/ports/outbound/team-store.port";
import {
  addTeamMember,
  createTeam,
  type Team,
} from "../../../domain/organization-participation/entities/team";

export type TeamSeed = Readonly<{
  id: string;
  accountId: string;
  name: string;
  memberMembershipIds?: readonly string[];
}>;

export class InMemoryTeamStore implements TeamStore {
  private readonly items = new Map<string, Team>();
  constructor(seed: readonly TeamSeed[] = []) {
    seed.forEach((item) => {
      const team = (item.memberMembershipIds ?? []).reduce(
        addTeamMember,
        createTeam({ id: item.id, accountId: item.accountId, name: item.name }),
      );
      this.items.set(team.id, team);
    });
  }
  async list(accountId: string) {
    return [...this.items.values()].filter(
      (item) => item.accountId === accountId,
    );
  }
  async find(teamId: string) {
    return this.items.get(teamId);
  }
  async findByAccountAndName(accountId: string, name: string) {
    return [...this.items.values()].find(
      (item) => item.accountId === accountId && item.name === name,
    );
  }
  async save(team: Team) {
    this.items.set(team.id, team);
  }
}
