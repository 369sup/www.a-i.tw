import type {
  TeamMembershipFactV1,
  TeamRefV1,
} from "../../../contracts/account/public";
import {
  addTeamMember,
  createTeam,
  removeTeamMember,
  type Team,
} from "../../../domain/account/entities/team";
import type { AccountStore } from "./account-service";
import type { MembershipService } from "./membership-service";
import type { AccountPrincipal } from "../ports/inbound/account-principal";

export interface TeamStore {
  list(accountId: string): Promise<Team[]>;
  find(teamId: string): Promise<Team | undefined>;
  findByAccountAndName(
    accountId: string,
    name: string,
  ): Promise<Team | undefined>;
  save(team: Team): Promise<void>;
}

export interface TeamService {
  list(accountId: string): Promise<TeamRefV1[]>;
  memberships(
    accountId: string,
    principalId: string,
  ): Promise<TeamMembershipFactV1>;
  create(input: {
    accountId: string;
    name: string;
    actor: AccountPrincipal;
  }): Promise<TeamRefV1>;
  addMember(input: {
    teamId: string;
    principalId: string;
    actor: AccountPrincipal;
  }): Promise<TeamRefV1>;
  removeMember(input: {
    teamId: string;
    principalId: string;
    actor: AccountPrincipal;
  }): Promise<TeamRefV1>;
}

export function createTeamService(
  accounts: AccountStore,
  memberships: MembershipService,
  teams: TeamStore,
  nextId: () => string,
): TeamService {
  async function requireOwner(accountId: string, actor: AccountPrincipal) {
    const account = await accounts.find(accountId);
    if (!account || account.kind !== "organization")
      throw new Error("Teams are only available to organization accounts.");
    if (account.ownerPrincipalId !== actor.principalId)
      throw new Error("Organization owner permission is required.");
  }
  const toRef = (team: Team): TeamRefV1 => ({
    teamId: team.id,
    accountId: team.accountId,
    name: team.name,
    memberPrincipalIds: team.memberPrincipalIds,
  });
  return {
    async list(accountId) {
      return (await teams.list(accountId)).map(toRef);
    },
    async memberships(accountId, principalId) {
      const member = await memberships.membership(accountId, principalId);
      if (member?.status !== "active")
        return { accountId, principalId, teamIds: [] };
      return {
        accountId,
        principalId,
        teamIds: (await teams.list(accountId))
          .filter((team) => team.memberPrincipalIds.includes(principalId))
          .map((team) => team.id),
      };
    },
    async create(input) {
      await requireOwner(input.accountId, input.actor);
      const team = createTeam({
        id: nextId(),
        accountId: input.accountId,
        name: input.name,
      });
      if (await teams.findByAccountAndName(team.accountId, team.name))
        throw new Error("Team name already exists in this organization.");
      await teams.save(team);
      return toRef(team);
    },
    async addMember(input) {
      const team = await teams.find(input.teamId);
      if (!team) throw new Error("Team not found.");
      await requireOwner(team.accountId, input.actor);
      const membership = await memberships.membership(
        team.accountId,
        input.principalId,
      );
      if (membership?.status !== "active" || membership.role !== "member")
        throw new Error("Only active organization members may join a Team.");
      const updated = addTeamMember(team, input.principalId);
      await teams.save(updated);
      return toRef(updated);
    },
    async removeMember(input) {
      const team = await teams.find(input.teamId);
      if (!team) throw new Error("Team not found.");
      await requireOwner(team.accountId, input.actor);
      const updated = removeTeamMember(team, input.principalId);
      await teams.save(updated);
      return toRef(updated);
    },
  };
}
