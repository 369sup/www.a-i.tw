import type {
  RepositoryAuthorizationApiV1,
  RepositoryAccessSubjectV1,
  RepositoryAuthorizationActionV1,
  RepositoryAuthorizationDecisionV1,
  RepositoryAuthorizationPrincipalV1,
  RepositoryAuthorizationResourceV1,
  RepositoryRoleV1,
} from "../../contracts/v1/public";
import { createRepositoryAccessGrant } from "../../domain/repository-governance/aggregates/repository-access-grant";
import { decideRepositoryAccess } from "../../domain/repository-governance/policies/decide-repository-access";
import type { AccountAuthorizationDirectory } from "../ports/outbound/account-authorization-directory.port";
import type { IdentityDirectory } from "../ports/outbound/identity-directory.port";
import type { RepositoryAccessGrantStore } from "../ports/outbound/repository-access-grant-store.port";
import type { RepositoryAuthorization } from "../ports/outbound/repository-authorization.port";

export type RepositoryAuthorizationService = RepositoryAuthorizationApiV1 &
  RepositoryAuthorization;

export function createRepositoryAuthorizationService(
  grants: RepositoryAccessGrantStore,
  accounts: AccountAuthorizationDirectory,
  identities: IdentityDirectory,
): RepositoryAuthorizationService {
  async function decide(input: {
    repository: RepositoryAuthorizationResourceV1;
    principal?: RepositoryAuthorizationPrincipalV1;
    action: RepositoryAuthorizationActionV1;
  }): Promise<RepositoryAuthorizationDecisionV1> {
    const principal =
      input.principal?.status === "active" ? input.principal : undefined;
    const membership = principal
      ? await accounts.membership(
          input.repository.ownerAccountId,
          principal.principalId,
        )
      : undefined;
    const teamIds = principal
      ? await accounts.teamIds(
          input.repository.ownerAccountId,
          principal.principalId,
        )
      : [];
    return decideRepositoryAccess({
      repository: input.repository,
      principalId: principal?.principalId,
      ownerPrincipalId:
        membership?.status === "active" && membership.role === "owner"
          ? membership.principalId
          : undefined,
      action: input.action,
      grants: await grants.list(input.repository.repositoryId),
      teamIds,
    });
  }

  async function assertEligible(
    repository: RepositoryAuthorizationResourceV1,
    subject: RepositoryAccessSubjectV1,
  ) {
    if (subject.type === "principal") {
      const principal = await identities.principal(subject.principalId);
      if (principal?.status !== "active")
        throw new Error("Repository access requires an active Principal.");
      return;
    }
    const team = await accounts.team(repository.ownerAccountId, subject.teamId);
    if (!team)
      throw new Error(
        "Repository access requires a Team owned by the Repository owner Account.",
      );
  }

  const grant = async (input: {
    repository: RepositoryAuthorizationResourceV1;
    actor: RepositoryAuthorizationPrincipalV1;
    subject: RepositoryAccessSubjectV1;
    role: RepositoryRoleV1;
  }) => {
    const decision = await decide({
      repository: input.repository,
      principal: input.actor,
      action: "repository:manage-access",
    });
    if (!decision.allowed)
      throw new Error(`Repository action denied: ${decision.reason}.`);
    await assertEligible(input.repository, input.subject);
    await grants.save(
      createRepositoryAccessGrant({
        repositoryId: input.repository.repositoryId,
        subject: input.subject,
        role: input.role,
      }),
    );
  };
  return {
    decide,
    grant,
    decideRepositoryAccess: decide,
    grantRepositoryAccess: grant,
  };
}
