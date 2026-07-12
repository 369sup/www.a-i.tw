import type { TeamStore } from "../../../application/account/use-cases/team-service";
import type { Team } from "../../../domain/account/entities/team";

export class InMemoryTeamStore implements TeamStore {
  private readonly items = new Map<string, Team>();
  constructor(seed: Team[] = []) {
    seed.forEach((item) => this.items.set(item.id, item));
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
