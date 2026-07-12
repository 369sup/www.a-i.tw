import type {
  MembershipInvitationStore,
  MembershipStore,
} from "../../../application/account/use-cases/membership-service";
import type {
  Membership,
  MembershipInvitation,
} from "../../../domain/account/entities/membership";

export class InMemoryMembershipStore implements MembershipStore {
  private readonly items = new Map<string, Membership>();
  constructor(seed: readonly Membership[] = []) {
    seed.forEach((membership) => this.items.set(membership.id, membership));
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
