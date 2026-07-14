import { describe, expect, it } from "vitest";
import { InvalidAccountHandleError } from "../../domain/organization-account/errors/invalid-account-handle.error";
import { createAccountHandle } from "../../domain/organization-account/value-objects/account-handle";
import { createAccountId } from "../../domain/organization-account/value-objects/account-id";

describe("Account value objects", () => {
  it("keeps stable identity separate from the canonical handle", () => {
    expect(createAccountId(" account-123 ")).toBe("account-123");
    expect(createAccountHandle(" Example-Org ")).toBe("example-org");
  });

  it.each(["", "-owner", "owner-", "owner--team", "a".repeat(40)])(
    "rejects invalid AccountHandle %j",
    (value) => {
      expect(() => createAccountHandle(value)).toThrow(
        InvalidAccountHandleError,
      );
    },
  );
});
