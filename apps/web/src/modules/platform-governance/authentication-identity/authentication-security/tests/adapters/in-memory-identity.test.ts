import { describe, expect, it } from "vitest";
import {
  InMemoryPrincipalStore,
  MockCredentialVerifier,
} from "../../adapters/outbound/persistence/in-memory-identity";
import { InvalidPrincipalIdError } from "../../domain/authentication-security/errors/invalid-principal-id.error";
import { InvalidPrincipalKindError } from "../../domain/authentication-security/errors/invalid-principal-kind.error";

describe("InMemoryPrincipalStore", () => {
  it("reconstructs Principal seeds through Domain factories", async () => {
    const store = new InMemoryPrincipalStore([
      { id: " principal-1 ", kind: "human", status: "active" },
    ]);
    await expect(store.find("principal-1")).resolves.toEqual({
      id: "principal-1",
      kind: "human",
      status: "active",
    });
  });

  it("rejects invalid persisted Principal values", () => {
    expect(
      () =>
        new InMemoryPrincipalStore([
          { id: " ", kind: "human", status: "active" },
        ]),
    ).toThrow(InvalidPrincipalIdError);
    expect(
      () =>
        new InMemoryPrincipalStore([
          { id: "p-1", kind: "user", status: "active" },
        ]),
    ).toThrow(InvalidPrincipalKindError);
  });
});

describe("MockCredentialVerifier", () => {
  it("resolves each supported demo login to its own Principal", async () => {
    const verifier = new MockCredentialVerifier();

    await expect(verifier.verify("admin", "123456")).resolves.toMatchObject({
      principalId: "principal-ada",
    });
    await expect(verifier.verify("grace", "123456")).resolves.toMatchObject({
      principalId: "principal-grace",
    });
    await expect(verifier.verify("grace", "wrong")).resolves.toBeUndefined();
  });
});
