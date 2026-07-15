import type { MembershipInvitationStore } from "../../../application/ports/outbound/membership-invitation-store-port";
import type { MembershipStore } from "../../../application/ports/outbound/membership-store-port";
import {
  acceptMembershipInvitation,
  activateMembership,
  cancelMembershipInvitation,
  expireMembershipInvitation,
  issueMembershipInvitation,
  removeMembership,
  type Membership,
  type MembershipInvitation,
} from "../../../domain/organization-participation/entities/membership";
import type { MembershipInvitationStatus } from "../../../domain/organization-participation/value-objects/membership-invitation-status";
import type { MembershipRole } from "../../../domain/organization-participation/value-objects/membership-role";
import type { MembershipStatus } from "../../../domain/organization-participation/value-objects/membership-status";

export type MembershipSeed = Readonly<{
  id: string;
  accountId: string;
  principalId: string;
  role: MembershipRole;
  status: MembershipStatus;
  joinedAt: string;
  removedAt?: string;
}>;

export type MembershipInvitationSeed = Readonly<{
  id: string;
  accountId: string;
  invitedPrincipalId: string;
  invitedByPrincipalId: string;
  role: MembershipRole;
  status: MembershipInvitationStatus;
  invitedAt: string;
  respondedAt?: string;
}>;

export class InMemoryMembershipStore implements MembershipStore {
  private readonly items = new Map<string, Membership>();
  constructor(seed: readonly MembershipSeed[] = []) {
    seed.forEach((item) => {
      const active = activateMembership({
        id: item.id,
        accountId: item.accountId,
        principalId: item.principalId,
        role: item.role,
        joinedAt: item.joinedAt,
      });
      const membership =
        item.status === "removed"
          ? removeMembershipFromSeed(active, item.removedAt)
          : active;
      this.items.set(membership.id, membership);
    });
  }
  async list(accountId: string) {
    return [...this.items.values()].filter(
      (item) => item.accountId === accountId && item.status === "active",
    );
  }
  async find(accountId: string, principalId: string) {
    return [...this.items.values()].find(
      (item) =>
        item.accountId === accountId &&
        item.principalId === principalId &&
        item.status === "active",
    );
  }
  async save(membership: Membership) {
    this.items.set(membership.id, membership);
  }
}

export class InMemoryMembershipInvitationStore implements MembershipInvitationStore {
  private readonly items = new Map<string, MembershipInvitation>();
  constructor(seed: readonly MembershipInvitationSeed[] = []) {
    seed.forEach((item) => {
      const pending = issueMembershipInvitation({
        id: item.id,
        accountId: item.accountId,
        invitedPrincipalId: item.invitedPrincipalId,
        invitedByPrincipalId: item.invitedByPrincipalId,
        role: item.role,
        invitedAt: item.invitedAt,
      });
      const invitation = restoreInvitationStatus(pending, item);
      this.items.set(invitation.id, invitation);
    });
  }
  async find(id: string) {
    return this.items.get(id);
  }
  async findPending(accountId: string, principalId: string) {
    return [...this.items.values()].find(
      (item) =>
        item.accountId === accountId &&
        item.invitedPrincipalId === principalId &&
        item.status === "pending",
    );
  }
  async save(invitation: MembershipInvitation) {
    this.items.set(invitation.id, invitation);
  }
}

function removeMembershipFromSeed(
  membership: Membership,
  removedAt: string | undefined,
) {
  if (!removedAt) throw new Error("Removed Membership seed needs removedAt.");
  return removeMembership(membership, removedAt);
}

function restoreInvitationStatus(
  invitation: MembershipInvitation,
  seed: MembershipInvitationSeed,
) {
  if (seed.status === "pending") return invitation;
  if (!seed.respondedAt)
    throw new Error("Responded Membership invitation seed needs respondedAt.");
  if (seed.status === "accepted")
    return acceptMembershipInvitation(
      invitation,
      invitation.invitedPrincipalId,
      seed.respondedAt,
    );
  if (seed.status === "expired")
    return expireMembershipInvitation(invitation, seed.respondedAt);
  return cancelMembershipInvitation(invitation, seed.respondedAt);
}
