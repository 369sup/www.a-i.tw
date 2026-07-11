import type { PrincipalRefV1 } from "@/src/modules/identity-access/src/contracts/public";
import type { MembershipFactV1 } from "../contracts/public";
import type { AccountStore } from "./account-service";
import {
  acceptMembershipInvitation,
  activateMembership,
  issueMembershipInvitation,
  removeMembership,
  type Membership,
  type MembershipInvitation,
} from "../domain/membership";

export interface MembershipStore {
  list(accountId: string): Promise<Membership[]>;
  find(accountId: string, principalId: string): Promise<Membership | undefined>;
  save(membership: Membership): Promise<void>;
}

export interface MembershipInvitationStore {
  find(id: string): Promise<MembershipInvitation | undefined>;
  findPending(
    accountId: string,
    principalId: string,
  ): Promise<MembershipInvitation | undefined>;
  save(invitation: MembershipInvitation): Promise<void>;
}

export interface MembershipService {
  membership(
    accountId: string,
    principalId: string,
  ): Promise<MembershipFactV1 | undefined>;
  invite(input: {
    accountId: string;
    actor: PrincipalRefV1;
    invitee: PrincipalRefV1;
  }): Promise<{ invitationId: string }>;
  accept(input: {
    invitationId: string;
    principal: PrincipalRefV1;
  }): Promise<MembershipFactV1>;
  remove(input: {
    accountId: string;
    principalId: string;
    actor: PrincipalRefV1;
  }): Promise<void>;
}

export function createMembershipService(
  accounts: AccountStore,
  memberships: MembershipStore,
  invitations: MembershipInvitationStore,
  nextMembershipId: () => string,
  nextInvitationId: () => string,
  clock: () => Date,
): MembershipService {
  const ownerFact = async (accountId: string, principalId: string) => {
    const account = await accounts.find(accountId);
    return account?.ownerPrincipalId === principalId
      ? ({ accountId, principalId, role: "owner", status: "active" } as const)
      : undefined;
  };
  const requireOwner = async (accountId: string, principalId: string) => {
    if (!(await ownerFact(accountId, principalId)))
      throw new Error("Organization owner permission is required.");
  };
  return {
    async membership(accountId, principalId) {
      const owner = await ownerFact(accountId, principalId);
      if (owner) return owner;
      const membership = await memberships.find(accountId, principalId);
      return membership && toFact(membership);
    },
    async invite(input) {
      const account = await accounts.find(input.accountId);
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
      if (
        await invitations.findPending(
          input.accountId,
          input.invitee.principalId,
        )
      )
        throw new Error("A pending membership invitation already exists.");
      const now = clock();
      const invitation = issueMembershipInvitation({
        id: nextInvitationId(),
        accountId: input.accountId,
        invitedPrincipalId: input.invitee.principalId,
        invitedByPrincipalId: input.actor.principalId,
        invitedAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + 7 * 86_400_000).toISOString(),
      });
      await invitations.save(invitation);
      return { invitationId: invitation.id };
    },
    async accept(input) {
      const invitation = await invitations.find(input.invitationId);
      if (!invitation) throw new Error("Membership invitation not found.");
      const acceptedAt = clock().toISOString();
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
      await memberships.save(
        removeMembership(membership, clock().toISOString()),
      );
    },
  };
}

function toFact(membership: Membership): MembershipFactV1 {
  return {
    accountId: membership.accountId,
    principalId: membership.principalId,
    role: "member",
    status: membership.status,
  };
}
