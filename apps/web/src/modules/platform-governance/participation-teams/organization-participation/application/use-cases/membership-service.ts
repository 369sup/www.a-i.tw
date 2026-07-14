import type { MembershipFactV1 } from "../../contracts/v1/public";
import type { OrganizationAccountDirectory } from "../ports/outbound/organization-account-directory.port";
import {
  acceptMembershipInvitation,
  activateMembership,
  cancelMembershipInvitation,
  expireMembershipInvitation,
  issueMembershipInvitation,
  removeMembership,
  type Membership,
} from "../../domain/organization-participation/entities/membership";
import { hasMembershipInvitationExpired } from "../../domain/organization-participation/value-objects/membership-invitation-expiry";
import type { MembershipRole } from "../../domain/organization-participation/value-objects/membership-role";
import type { AccountPrincipal } from "../ports/inbound/account-principal";
import type { MembershipInvitationStore } from "../ports/outbound/membership-invitation-store.port";
import type { MembershipStore } from "../ports/outbound/membership-store.port";

export interface MembershipService {
  membership(
    accountId: string,
    principalId: string,
  ): Promise<MembershipFactV1 | undefined>;
  invite(input: {
    accountId: string;
    actor: AccountPrincipal;
    invitee: AccountPrincipal;
    role?: MembershipRole;
  }): Promise<{ invitationId: string }>;
  accept(input: {
    invitationId: string;
    principal: AccountPrincipal;
  }): Promise<MembershipFactV1>;
  remove(input: {
    accountId: string;
    principalId: string;
    actor: AccountPrincipal;
  }): Promise<void>;
  cancelInvitation(input: {
    invitationId: string;
    actor: AccountPrincipal;
  }): Promise<void>;
}

export function createMembershipService(
  accounts: OrganizationAccountDirectory,
  memberships: MembershipStore,
  invitations: MembershipInvitationStore,
  nextMembershipId: () => string,
  nextInvitationId: () => string,
  clock: () => Date,
): MembershipService {
  const requireOwner = async (accountId: string, principalId: string) => {
    if ((await thisMembership(accountId, principalId))?.role !== "owner")
      throw new Error("Organization owner permission is required.");
  };
  const thisMembership = async (accountId: string, principalId: string) => {
    const membership = await memberships.find(accountId, principalId);
    return membership && toFact(membership);
  };
  return {
    async membership(accountId, principalId) {
      return thisMembership(accountId, principalId);
    },
    async invite(input) {
      const account = await accounts.resolve(input.accountId);
      if (!account) throw new Error("Account not found.");
      if (account.kind !== "organization")
        throw new Error(
          "Membership is only available to organization accounts.",
        );
      await requireOwner(input.accountId, input.actor.principalId);
      if (input.invitee.status !== "active")
        throw new Error("An active principal is required.");
      if (await this.membership(input.accountId, input.invitee.principalId))
        throw new Error("Principal is already an organization member.");
      const now = clock();
      const pending = await invitations.findPending(
        input.accountId,
        input.invitee.principalId,
      );
      if (pending) {
        if (
          hasMembershipInvitationExpired(pending.expiresAt, now.toISOString())
        )
          await invitations.save(
            expireMembershipInvitation(pending, now.toISOString()),
          );
        else throw new Error("A pending membership invitation already exists.");
      }
      const invitation = issueMembershipInvitation({
        id: nextInvitationId(),
        accountId: input.accountId,
        invitedPrincipalId: input.invitee.principalId,
        invitedByPrincipalId: input.actor.principalId,
        role: input.role ?? "member",
        invitedAt: now.toISOString(),
      });
      await invitations.save(invitation);
      return { invitationId: invitation.id };
    },
    async accept(input) {
      const invitation = await invitations.find(input.invitationId);
      if (!invitation) throw new Error("Membership invitation not found.");
      const acceptedAt = clock().toISOString();
      if (
        invitation.status === "pending" &&
        hasMembershipInvitationExpired(invitation.expiresAt, acceptedAt)
      ) {
        await invitations.save(
          expireMembershipInvitation(invitation, acceptedAt),
        );
        throw new Error("Membership invitation has expired.");
      }
      const accepted = acceptMembershipInvitation(
        invitation,
        input.principal.principalId,
        acceptedAt,
      );
      if (
        await this.membership(accepted.accountId, input.principal.principalId)
      )
        throw new Error("Principal is already an organization member.");
      const membership = activateMembership({
        id: nextMembershipId(),
        accountId: accepted.accountId,
        principalId: accepted.invitedPrincipalId,
        role: accepted.role,
        joinedAt: acceptedAt,
      });
      await invitations.save(accepted);
      await memberships.save(membership);
      return toFact(membership);
    },
    async remove(input) {
      await requireOwner(input.accountId, input.actor.principalId);
      const membership = await memberships.find(
        input.accountId,
        input.principalId,
      );
      if (!membership) throw new Error("Active membership not found.");
      if (membership.role === "owner") {
        const owners = (await memberships.list(input.accountId)).filter(
          (candidate) => candidate.role === "owner",
        );
        if (owners.length <= 1)
          throw new Error("An Organization must retain at least one owner.");
      }
      await memberships.save(
        removeMembership(membership, clock().toISOString()),
      );
    },
    async cancelInvitation(input) {
      const invitation = await invitations.find(input.invitationId);
      if (!invitation) throw new Error("Membership invitation not found.");
      await requireOwner(invitation.accountId, input.actor.principalId);
      const cancelledAt = clock().toISOString();
      if (
        invitation.status === "pending" &&
        hasMembershipInvitationExpired(invitation.expiresAt, cancelledAt)
      ) {
        await invitations.save(
          expireMembershipInvitation(invitation, cancelledAt),
        );
        throw new Error("Membership invitation has expired.");
      }
      await invitations.save(
        cancelMembershipInvitation(invitation, cancelledAt),
      );
    },
  };
}

function toFact(membership: Membership): MembershipFactV1 {
  return {
    membershipId: membership.id,
    accountId: membership.accountId,
    principalId: membership.principalId,
    role: membership.role,
    status: membership.status,
  };
}
