import { describe, expect, it } from "vitest";
import { createMembershipService } from "../../application/use-cases/membership-service";
import { createTeamService } from "../../application/use-cases/team-service";
import {
  InMemoryMembershipInvitationStore,
  InMemoryMembershipStore,
} from "../../adapters/outbound/persistence/in-memory-membership";
import { InMemoryTeamStore } from "../../adapters/outbound/persistence/in-memory-team-store";

const owner = {
  principalId: "owner",
  status: "active" as const,
};
const member = {
  principalId: "member",
  status: "active" as const,
};

async function fixture() {
  let id = 0;
  const accounts = {
    async resolve(accountId: string) {
      return accountId === "org"
        ? ({ kind: "organization", status: "active" } as const)
        : undefined;
    },
  };
  const memberships = createMembershipService(
    accounts,
    new InMemoryMembershipStore([
      {
        id: "owner-membership",
        accountId: "org",
        principalId: owner.principalId,
        role: "owner",
        status: "active",
        joinedAt: "2026-07-01T00:00:00.000Z",
      },
    ]),
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

  it("allows an active organization Owner to join a Team", async () => {
    const teams = await fixture();
    const team = await teams.create({
      accountId: "org",
      name: "Owners",
      actor: owner,
    });
    await teams.addMember({
      teamId: team.teamId,
      principalId: owner.principalId,
      actor: owner,
    });
    await expect(teams.memberships("org", owner.principalId)).resolves.toEqual({
      accountId: "org",
      principalId: "owner",
      teamIds: [team.teamId],
    });
  });
});
