import type { Membership } from "../../../domain/organization-participation/entities/membership";

export interface MembershipStore {
  save(membership: Membership): Promise<void>;
  list(accountId: string): Promise<Membership[]>;
  find(accountId: string, principalId: string): Promise<Membership | undefined>;
}
