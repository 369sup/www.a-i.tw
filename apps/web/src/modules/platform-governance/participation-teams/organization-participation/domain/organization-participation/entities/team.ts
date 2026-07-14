import {
  createOrganizationAccountId,
  type OrganizationAccountId,
} from "../value-objects/organization-account-id";
import {
  createMembershipId,
  type MembershipId,
} from "../value-objects/membership-id";
import { createTeamId, type TeamId } from "../value-objects/team-id";
import { createTeamName, type TeamName } from "../value-objects/team-name";

export type Team = Readonly<{
  id: TeamId;
  accountId: OrganizationAccountId;
  name: TeamName;
  memberMembershipIds: readonly MembershipId[];
}>;

export function createTeam(
  input: Readonly<{ id: string; accountId: string; name: string }>,
): Team {
  return {
    id: createTeamId(input.id),
    accountId: createOrganizationAccountId(input.accountId),
    name: createTeamName(input.name),
    memberMembershipIds: [],
  };
}

export function addTeamMember(team: Team, membershipId: string): Team {
  const id = createMembershipId(membershipId);
  if (team.memberMembershipIds.includes(id))
    throw new Error("Membership is already assigned to the Team.");
  return {
    ...team,
    memberMembershipIds: [...team.memberMembershipIds, id],
  };
}

export function hasTeamMember(team: Team, membershipId: string): boolean {
  return team.memberMembershipIds.includes(createMembershipId(membershipId));
}

export function removeTeamMember(team: Team, membershipId: string): Team {
  const id = createMembershipId(membershipId);
  if (!team.memberMembershipIds.includes(id))
    throw new Error("Membership is not assigned to the Team.");
  return {
    ...team,
    memberMembershipIds: team.memberMembershipIds.filter(
      (membershipId) => membershipId !== id,
    ),
  };
}
