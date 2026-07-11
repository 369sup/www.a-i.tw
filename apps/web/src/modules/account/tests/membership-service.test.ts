import { describe, expect, it } from "vitest";
import { createMembershipService } from "../src/application/membership-service";
import { InMemoryAccountStore } from "../src/infrastructure/in-memory-account-store";
import {
  InMemoryMembershipInvitationStore,
  InMemoryMembershipStore,
} from "../src/infrastructure/in-memory-membership";

const owner = {
  principalId: "p-owner",
  handle: "owner",
  displayName: "Owner",
  status: "active" as const,
};
const invitee = {
  principalId: "p-member",
  handle: "member",
  displayName: "Member",
  status: "active" as const,
};

function fixture() {
  let id = 0;
  return createMembershipService(
    new InMemoryAccountStore([
      {
        id: "org",
        handle: "org",
        displayName: "Org",
        kind: "organization",
        status: "active",
        ownerPrincipalId: owner.principalId,
      },
      {
        id: "personal",
        handle: "owner",
        displayName: "Owner",
        kind: "personal",
        status: "active",
        ownerPrincipalId: owner.principalId,
      },
    ]),
    new InMemoryMembershipStore(),
    new InMemoryMembershipInvitationStore(),
    () => `membership-${++id}`,
    () => `invitation-${++id}`,
    () => new Date("2026-07-12T00:00:00.000Z"),
  );
}

describe("organization membership", () => {
  it("activates membership only after the invitee accepts", async () => {
    const service = fixture();
    const invitation = await service.invite({
      accountId: "org",
      actor: owner,
      invitee,
    });
    expect(
      await service.membership("org", invitee.principalId),
    ).toBeUndefined();
    await service.accept({
      invitationId: invitation.invitationId,
      principal: invitee,
    });
    await expect(
      service.membership("org", invitee.principalId),
    ).resolves.toMatchObject({ role: "member", status: "active" });
  });

  it("rejects membership on personal accounts", async () => {
    await expect(
      fixture().invite({ accountId: "personal", actor: owner, invitee }),
    ).rejects.toThrow("only available to organization");
  });

  it("lets the owner remove an active member", async () => {
    const service = fixture();
    const invitation = await service.invite({
      accountId: "org",
      actor: owner,
      invitee,
    });
    await service.accept({
      invitationId: invitation.invitationId,
      principal: invitee,
    });
    await service.remove({
      accountId: "org",
      principalId: invitee.principalId,
      actor: owner,
    });
    await expect(
      service.membership("org", invitee.principalId),
    ).resolves.toBeUndefined();
  });
});
