import { activateMembership } from "../../domain/organization-participation/entities/membership";
import type { MembershipStore } from "../ports/outbound/membership-store.port";

export function createFoundingMembershipWriter(store: MembershipStore) {
  return {
    async save(input: {
      id: string;
      accountId: string;
      principalId: string;
      role: "owner";
      status: "active";
      joinedAt: string;
    }) {
      await store.save(activateMembership(input));
    },
  };
}
