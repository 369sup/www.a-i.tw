import type { MembershipInvitation } from "../../../domain/organization-participation/entities/membership";

export interface MembershipInvitationStore {
  find(id: string): Promise<MembershipInvitation | undefined>;
  findPending(
    accountId: string,
    principalId: string,
  ): Promise<MembershipInvitation | undefined>;
  save(invitation: MembershipInvitation): Promise<void>;
}
