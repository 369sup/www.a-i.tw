export type Team = Readonly<{
  id: string;
  accountId: string;
  name: string;
  memberMembershipIds: readonly string[];
}>;

export function normalizeTeamName(value: string): string {
  const name = value.trim().toLowerCase().replaceAll(" ", "-");
  if (!/^[a-z0-9._-]{1,100}$/.test(name))
    throw new Error("Team name is invalid.");
  return name;
}

export function createTeam(
  input: Omit<Team, "name" | "memberMembershipIds"> & { name: string },
): Team {
  return {
    ...input,
    name: normalizeTeamName(input.name),
    memberMembershipIds: [],
  };
}

export function addTeamMember(team: Team, membershipId: string): Team {
  if (team.memberMembershipIds.includes(membershipId))
    throw new Error("Membership is already assigned to the Team.");
  return {
    ...team,
    memberMembershipIds: [...team.memberMembershipIds, membershipId],
  };
}

export function removeTeamMember(team: Team, membershipId: string): Team {
  if (!team.memberMembershipIds.includes(membershipId))
    throw new Error("Membership is not assigned to the Team.");
  return {
    ...team,
    memberMembershipIds: team.memberMembershipIds.filter(
      (id) => id !== membershipId,
    ),
  };
}
