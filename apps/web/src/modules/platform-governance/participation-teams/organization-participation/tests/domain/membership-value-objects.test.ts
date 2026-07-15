import { describe, expect, it } from "vitest";
import {
  acceptMembershipInvitation,
  activateMembership,
  cancelMembershipInvitation,
  expireMembershipInvitation,
  issueMembershipInvitation,
  removeMembership,
} from "../../domain/organization-participation/entities/membership";
import { InvalidMembershipIdError } from "../../domain/organization-participation/errors/invalid-membership-id-error";
import { InvalidMembershipInvitationIdError } from "../../domain/organization-participation/errors/invalid-membership-invitation-id-error";
import { InvalidMembershipTransitionError } from "../../domain/organization-participation/errors/invalid-membership-transition-error";
import {
  createMembershipInvitationExpiry,
  MEMBERSHIP_INVITATION_TTL_MS,
} from "../../domain/organization-participation/value-objects/membership-invitation-expiry";

const invitedAt = "2026-07-14T00:00:00.000Z";

function invitation() {
  return issueMembershipInvitation({
    id: "invitation-1",
    accountId: "organization-1",
    invitedPrincipalId: "principal-member",
    invitedByPrincipalId: "principal-owner",
    role: "member",
    invitedAt,
  });
}

describe("Membership and invitation value objects", () => {
  it("owns stable Membership and Invitation identities", () => {
    expect(() =>
      activateMembership({
        id: " ",
        accountId: "organization-1",
        principalId: "principal-member",
        role: "member",
        joinedAt: invitedAt,
      }),
    ).toThrow(InvalidMembershipIdError);
    expect(() =>
      issueMembershipInvitation({
        id: " ",
        accountId: "organization-1",
        invitedPrincipalId: "principal-member",
        invitedByPrincipalId: "principal-owner",
        role: "member",
        invitedAt,
      }),
    ).toThrow(InvalidMembershipInvitationIdError);
  });

  it("derives the official seven-day invitation expiry", () => {
    expect(Date.parse(createMembershipInvitationExpiry(invitedAt))).toBe(
      Date.parse(invitedAt) + MEMBERSHIP_INVITATION_TTL_MS,
    );
  });

  it("accepts only the invited principal before expiry", () => {
    expect(
      acceptMembershipInvitation(
        invitation(),
        "principal-member",
        "2026-07-20T23:59:59.999Z",
      ).status,
    ).toBe("accepted");
    expect(() =>
      acceptMembershipInvitation(
        invitation(),
        "principal-other",
        "2026-07-15T00:00:00.000Z",
      ),
    ).toThrow(InvalidMembershipTransitionError);
    expect(() =>
      acceptMembershipInvitation(
        invitation(),
        "principal-member",
        "2026-07-21T00:00:00.000Z",
      ),
    ).toThrow("expired");
  });

  it("keeps expired and cancelled invitation lifecycle states terminal", () => {
    const expired = expireMembershipInvitation(
      invitation(),
      "2026-07-21T00:00:00.000Z",
    );
    expect(expired.status).toBe("expired");
    expect(() =>
      cancelMembershipInvitation(expired, "2026-07-22T00:00:00.000Z"),
    ).toThrow("Only a pending invitation");
    const cancelled = cancelMembershipInvitation(
      invitation(),
      "2026-07-20T00:00:00.000Z",
    );
    expect(cancelled.status).toBe("cancelled");
    expect(() =>
      cancelMembershipInvitation(cancelled, "2026-07-20T01:00:00.000Z"),
    ).toThrow("Only a pending invitation");
  });

  it("allows removal only after Membership activation", () => {
    const membership = activateMembership({
      id: "membership-1",
      accountId: "organization-1",
      principalId: "principal-member",
      role: "member",
      joinedAt: invitedAt,
    });
    expect(
      removeMembership(membership, "2026-07-15T00:00:00.000Z").status,
    ).toBe("removed");
    expect(() =>
      removeMembership(membership, "2026-07-13T00:00:00.000Z"),
    ).toThrow("cannot precede");
  });
});
