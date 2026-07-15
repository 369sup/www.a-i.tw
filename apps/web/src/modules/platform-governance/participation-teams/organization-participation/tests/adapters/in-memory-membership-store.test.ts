import { describe, expect, it } from "vitest";
import {
  InMemoryMembershipInvitationStore,
  InMemoryMembershipStore,
} from "../../adapters/outbound/persistence/in-memory-membership";
import { InvalidMembershipIdError } from "../../domain/organization-participation/errors/invalid-membership-id-error";
import { InvalidMembershipTransitionError } from "../../domain/organization-participation/errors/invalid-membership-transition-error";

describe("Membership persistence adapters", () => {
  it("maps Membership seeds through Domain construction", () => {
    expect(
      () =>
        new InMemoryMembershipStore([
          {
            id: " ",
            accountId: "organization-1",
            principalId: "principal-1",
            role: "member",
            status: "active",
            joinedAt: "2026-07-14T00:00:00.000Z",
          },
        ]),
    ).toThrow(InvalidMembershipIdError);
  });

  it("rejects impossible restored invitation states", () => {
    expect(
      () =>
        new InMemoryMembershipInvitationStore([
          {
            id: "invitation-1",
            accountId: "organization-1",
            invitedPrincipalId: "principal-member",
            invitedByPrincipalId: "principal-owner",
            role: "member",
            status: "accepted",
            invitedAt: "2026-07-14T00:00:00.000Z",
            respondedAt: "2026-07-22T00:00:00.000Z",
          },
        ]),
    ).toThrow(InvalidMembershipTransitionError);
  });
});
