import { describe, expect, it } from "vitest";
import { createMembershipService } from "../../application/use-cases/membership-service";
import {
  InMemoryMembershipInvitationStore,
  InMemoryMembershipStore,
} from "../../adapters/outbound/persistence/in-memory-membership";

const owner = {
  principalId: "p-owner",
  status: "active" as const,
};
const invitee = {
  principalId: "p-member",
  status: "active" as const,
};

function fixture(
  clock: () => Date = () => new Date("2026-07-12T00:00:00.000Z"),
) {
  let id = 0;
  return createMembershipService(
    activeOrganizationAccountDirectory,
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
    clock,
  );
}

const activeOrganizationAccountDirectory = {
  async resolve(accountId: string) {
    return accountId === "org"
      ? ({ kind: "organization", status: "active" } as const)
      : undefined;
  },
};

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

  it("expires stale invitations and allows a new invitation", async () => {
    let now = new Date("2026-07-12T00:00:00.000Z");
    const service = fixture(() => now);
    const first = await service.invite({
      accountId: "org",
      actor: owner,
      invitee,
    });
    now = new Date("2026-07-20T00:00:00.000Z");
    const second = await service.invite({
      accountId: "org",
      actor: owner,
      invitee,
    });
    expect(second.invitationId).not.toBe(first.invitationId);
  });

  it("allows an owner to cancel a pending invitation", async () => {
    const service = fixture();
    const invitation = await service.invite({
      accountId: "org",
      actor: owner,
      invitee,
    });
    await service.cancelInvitation({
      invitationId: invitation.invitationId,
      actor: owner,
    });
    await expect(
      service.accept({
        invitationId: invitation.invitationId,
        principal: invitee,
      }),
    ).rejects.toThrow("pending invitation");
  });

  it("expires rather than cancels an invitation after its deadline", async () => {
    let now = new Date("2026-07-12T00:00:00.000Z");
    const service = fixture(() => now);
    const invitation = await service.invite({
      accountId: "org",
      actor: owner,
      invitee,
    });
    now = new Date("2026-07-19T00:00:00.000Z");
    await expect(
      service.cancelInvitation({
        invitationId: invitation.invitationId,
        actor: owner,
      }),
    ).rejects.toThrow("expired");
    await expect(
      service.accept({
        invitationId: invitation.invitationId,
        principal: invitee,
      }),
    ).rejects.toThrow("pending invitation");
  });
});
