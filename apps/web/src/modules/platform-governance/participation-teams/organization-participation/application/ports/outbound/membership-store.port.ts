import type { Membership } from "../../../domain/organization-participation/entities/membership";
import type { OrganizationMembershipWriter } from "./organization-membership-writer.port";

export interface MembershipStore extends OrganizationMembershipWriter {
  list(accountId: string): Promise<Membership[]>;
  find(accountId: string, principalId: string): Promise<Membership | undefined>;
}
