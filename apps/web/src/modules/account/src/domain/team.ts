export type Team = Readonly<{
  id: string;
  accountId: string;
  name: string;
  memberPrincipalIds: readonly string[];
}>;

export function normalizeTeamName(value: string): string {
  const name = value.trim().toLowerCase().replaceAll(" ", "-");
  if (!/^[a-z0-9._-]{1,100}$/.test(name))
    throw new Error("Team name is invalid.");
  return name;
}

export function createTeam(
  input: Omit<Team, "name" | "memberPrincipalIds"> & { name: string },
): Team {
  return {
    ...input,
    name: normalizeTeamName(input.name),
    memberPrincipalIds: [],
  };
}

export function addTeamMember(team: Team, principalId: string): Team {
  if (team.memberPrincipalIds.includes(principalId))
    throw new Error("Principal is already a Team member.");
  return {
    ...team,
    memberPrincipalIds: [...team.memberPrincipalIds, principalId],
  };
}

export function removeTeamMember(team: Team, principalId: string): Team {
  if (!team.memberPrincipalIds.includes(principalId))
    throw new Error("Principal is not a Team member.");
  return {
    ...team,
    memberPrincipalIds: team.memberPrincipalIds.filter(
      (id) => id !== principalId,
    ),
  };
}
