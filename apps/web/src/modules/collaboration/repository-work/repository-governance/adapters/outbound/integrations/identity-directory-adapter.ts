import type { IdentityDirectoryApiV1 } from "@/src/modules/platform-governance/authentication-identity/authentication-security/contracts/v1/public";

import type { IdentityDirectory } from "../../../application/ports/outbound/identity-directory-port";

export class IdentityDirectoryAdapter implements IdentityDirectory {
  constructor(private readonly identities: IdentityDirectoryApiV1) {}

  principal(principalId: string) {
    return this.identities.principal(principalId);
  }
}
