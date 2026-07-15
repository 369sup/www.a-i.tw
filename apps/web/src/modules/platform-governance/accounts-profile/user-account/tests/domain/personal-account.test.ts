import { describe, expect, it } from "vitest";
import {
  activatePersonalAccount,
  createPersonalAccount,
  resumePersonalAccountProvisioning,
} from "../../domain/user-account/aggregates/personal-account";
import { InvalidPersonalAccountTransitionError } from "../../domain/user-account/errors/invalid-personal-account-transition-error";
import { InvalidPrincipalReferenceError } from "../../domain/user-account/errors/invalid-principal-reference-error";
import { InvalidUserAccountHandleError } from "../../domain/user-account/errors/invalid-user-account-handle-error";
import { InvalidUserAccountIdError } from "../../domain/user-account/errors/invalid-user-account-id-error";

describe("Personal Account", () => {
  it("constructs and activates the account required by the first use case", () => {
    const provisioning = createPersonalAccount({
      id: " account-1 ",
      handle: " Ada ",
      principalId: " principal-1 ",
    });
    expect(provisioning).toEqual({
      id: "account-1",
      handle: "ada",
      principalId: "principal-1",
      status: "provisioning",
    });
    expect(activatePersonalAccount(provisioning)).toEqual({
      ...provisioning,
      status: "active",
    });
  });

  it("allows only matching provisioning retries and one activation", () => {
    const provisioning = createPersonalAccount({
      id: "account-1",
      handle: "ada",
      principalId: "principal-1",
    });
    expect(
      resumePersonalAccountProvisioning(provisioning, { handle: " ADA " }),
    ).toBe(provisioning);
    expect(() =>
      resumePersonalAccountProvisioning(provisioning, { handle: "grace" }),
    ).toThrow("does not match");
    expect(() =>
      activatePersonalAccount(activatePersonalAccount(provisioning)),
    ).toThrow(InvalidPersonalAccountTransitionError);
  });

  it.each([
    [
      { id: " ", handle: "ada", principalId: "principal-1" },
      InvalidUserAccountIdError,
    ],
    [
      { id: "account-1", handle: "-ada", principalId: "principal-1" },
      InvalidUserAccountHandleError,
    ],
    [
      { id: "account-1", handle: "ada", principalId: " " },
      InvalidPrincipalReferenceError,
    ],
  ])("rejects invalid authoritative account state", (input, error) => {
    expect(() => createPersonalAccount(input)).toThrow(error);
  });
});
