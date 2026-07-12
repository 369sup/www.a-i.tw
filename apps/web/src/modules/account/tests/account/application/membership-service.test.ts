import { describe, expect, it } from "vitest";
import { createMembershipService } from "../../../application/account/use-cases/membership-service";
import { InMemoryAccountStore } from "../../../infrastructure/account/repositories/in-memory-account-store";
import {
  InMemoryMembershipInvitationStore,
  InMemoryMembershipStore,
} from "../../../infrastructure/account/repositories/in-memory-membership";

const owner = {
  principalId: "p-owner",
  status: "active" as const,
};
const invitee = {
  principalId: "p-member",
  status: "active" as const,
};

function fixture() {
  let id = 0;
  return createMembershipService(
    new InMemoryAccountStore([
      {
        id: "org",
        handle: "org",
        kind: "organization",
        status: "active",
      },
      {
        id: "personal",
        handle: "owner",
        kind: "personal",
        status: "active",
        principalId: owner.principalId,
      },
    ]),
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

  it("protects the last organization owner", async () => {
    await expect(
      fixture().remove({
        accountId: "org",
        principalId: owner.principalId,
        actor: owner,
      }),
    ).rejects.toThrow("retain at least one owner");
  });
});
