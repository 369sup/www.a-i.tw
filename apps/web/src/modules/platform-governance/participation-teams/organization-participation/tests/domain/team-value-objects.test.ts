import { describe, expect, it } from "vitest";
import {
  addTeamMember,
  createTeam,
  removeTeamMember,
} from "../../domain/organization-participation/entities/team";
import { InvalidTeamIdError } from "../../domain/organization-participation/errors/invalid-team-id-error";
import { InvalidTeamNameError } from "../../domain/organization-participation/errors/invalid-team-name-error";

describe("Team value objects", () => {
  it("normalizes the organization-local Team name", () => {
    expect(
      createTeam({ id: "team-1", accountId: "org-1", name: "Research Team" }),
    ).toMatchObject({
      id: "team-1",
      accountId: "org-1",
      name: "research-team",
    });
  });

  it("rejects blank ids and invalid names at construction", () => {
    expect(() =>
      createTeam({ id: " ", accountId: "org-1", name: "research" }),
    ).toThrow(InvalidTeamIdError);
    expect(() =>
      createTeam({ id: "team-1", accountId: "org-1", name: "研究" }),
    ).toThrow(InvalidTeamNameError);
  });

  it("owns Membership references without duplicating a member", () => {
    const team = createTeam({
      id: "team-1",
      accountId: "org-1",
      name: "research",
    });
    const assigned = addTeamMember(team, "membership-1");
    expect(assigned.memberMembershipIds).toEqual(["membership-1"]);
    expect(() => addTeamMember(assigned, "membership-1")).toThrow(
      "Membership is already assigned to the Team.",
    );
    expect(
      removeTeamMember(assigned, "membership-1").memberMembershipIds,
    ).toEqual([]);
  });
});
