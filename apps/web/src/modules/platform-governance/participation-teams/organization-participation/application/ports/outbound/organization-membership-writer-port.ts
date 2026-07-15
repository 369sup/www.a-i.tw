import type { Membership } from "../../../domain/organization-participation/entities/membership";

export interface OrganizationMembershipWriter {
  save(membership: Membership): Promise<void>;
}
