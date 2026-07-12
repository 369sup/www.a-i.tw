import { describe, expect, it } from "vitest";
import { createMembershipService } from "../src/application/membership-service";
import { createTeamService } from "../src/application/team-service";
import { InMemoryAccountStore } from "../src/infrastructure/in-memory-account-store";
import {
  InMemoryMembershipInvitationStore,
  InMemoryMembershipStore,
} from "../src/infrastructure/in-memory-membership";
import { InMemoryTeamStore } from "../src/infrastructure/in-memory-team-store";

const owner = {
  principalId: "owner",
  handle: "owner",
  displayName: "Owner",
  status: "active" as const,
};
const member = {
  principalId: "member",
  handle: "member",
  displayName: "Member",
  status: "active" as const,
};

async function fixture() {
  let id = 0;
  const accounts = new InMemoryAccountStore([
    {
      id: "org",
      handle: "org",
      displayName: "Org",
      kind: "organization",
      status: "active",
      ownerPrincipalId: owner.principalId,
    },
  ]);
  const memberships = createMembershipService(
    accounts,
    new InMemoryMembershipStore(),
    new InMemoryMembershipInvitationStore(),
    () => `membership-${++id}`,
    () => `invitation-${++id}`,
    () => new Date("2026-07-12T00:00:00Z"),
  );
  const invitation = await memberships.invite({
    accountId: "org",
    actor: owner,
    invitee: member,
  });
  await memberships.accept({
    invitationId: invitation.invitationId,
    principal: member,
  });
  return createTeamService(
    accounts,
    memberships,
    new InMemoryTeamStore(),
    () => `team-${++id}`,
  );
}

describe("organization Team", () => {
  it("groups only active organization members and publishes minimal membership facts", async () => {
    const teams = await fixture();
    const team = await teams.create({
      accountId: "org",
      name: "Research",
      actor: owner,
    });
    await teams.addMember({
      teamId: team.teamId,
      principalId: member.principalId,
      actor: owner,
    });
    await expect(teams.memberships("org", member.principalId)).resolves.toEqual(
      { accountId: "org", principalId: "member", teamIds: [team.teamId] },
    );
  });
});
