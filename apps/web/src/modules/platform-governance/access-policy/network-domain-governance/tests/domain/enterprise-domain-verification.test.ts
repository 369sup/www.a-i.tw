import { describe, expect, it } from "vitest";
import {
  completeEnterpriseDomainVerification,
  startEnterpriseDomainVerification,
} from "../../domain/network-domain-governance/aggregates/enterprise-domain-verification";
import { createVerifiedDomain } from "../../domain/network-domain-governance/entities/verified-domain";
import { createEnterpriseDomainName } from "../../domain/network-domain-governance/value-objects/enterprise-domain-name";

describe("EnterpriseDomainVerification", () => {
  it("canonicalizes one trailing dot and lowercase ASCII DNS names", () => {
    const verification = startEnterpriseDomainVerification({
      id: "verification-1",
      enterpriseId: "enterprise-1",
      domainName: "  Example.COM.  ",
      token: "token-1",
      createdAt: "2026-07-16T00:00:00.000Z",
    });

    expect(verification).toMatchObject({
      domainName: "example.com",
      status: "pending",
      challenge: {
        recordName: "_a-i-domain-verification.example.com",
        expectedValue: "token-1",
      },
    });
    expect(createEnterpriseDomainName("www.example.com")).not.toBe(
      verification.domainName,
    );
  });

  it("rejects invalid DNS names and a second trailing dot", () => {
    expect(() => createEnterpriseDomainName("localhost")).toThrow(
      "A valid Enterprise domain name is required.",
    );
    expect(() => createEnterpriseDomainName("example.com..")).toThrow(
      "A valid Enterprise domain name is required.",
    );
  });

  it("creates a VerifiedDomain only after the aggregate transition", () => {
    const pending = startEnterpriseDomainVerification({
      id: "verification-1",
      enterpriseId: "enterprise-1",
      domainName: "example.com",
      token: "token-1",
      createdAt: "2026-07-16T00:00:00.000Z",
    });
    const verified = completeEnterpriseDomainVerification(
      pending,
      "2026-07-16T01:00:00.000Z",
    );

    expect(createVerifiedDomain(pending)).toBeUndefined();
    expect(createVerifiedDomain(verified)).toEqual({
      enterpriseId: "enterprise-1",
      domainName: "example.com",
      verifiedAt: "2026-07-16T01:00:00.000Z",
    });
  });
});
