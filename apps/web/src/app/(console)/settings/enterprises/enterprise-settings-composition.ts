import "server-only";

import type { EnterpriseAdministrationViewModel } from "@/src/modules/platform-governance/accounts-profile/enterprise-account/public-api";
import type { EnterpriseRepositoryPolicyViewModel } from "@/src/modules/platform-governance/access-policy/policy-governance/public-api";
import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { getProductComposition } from "@/src/composition/product-composition";

export async function getEnterpriseAdministrationViewModel(
  searchParams: Promise<{ enterprise?: string }>,
): Promise<{
  enterprise: EnterpriseAdministrationViewModel;
  repositoryPolicy?: EnterpriseRepositoryPolicyViewModel;
}> {
  const session = await requireConsoleAuthentication();
  const composition = getProductComposition();
  const [enterprises, accounts, query] = await Promise.all([
    composition.enterpriseGovernance.listForPrincipal(
      session.principal.principalId,
    ),
    composition.accounts.listAccounts(),
    searchParams,
  ]);
  const selectedId = query.enterprise ?? enterprises[0]?.enterpriseId;
  const selected = selectedId
    ? await composition.enterpriseGovernance.resolveForPrincipal(
        selectedId,
        session.principal.principalId,
      )
    : undefined;
  const organizations = accounts.filter(
    (account) => account.kind === "organization",
  );
  const organizationById = new Map(
    organizations.map((organization) => [organization.accountId, organization]),
  );

  return {
    enterprise: {
      enterprises,
      selected: selected
        ? {
            enterpriseId: selected.enterpriseId,
            name: selected.name,
            organizations: selected.organizationAccountIds.map((accountId) => {
              const organization = organizationById.get(accountId);
              return {
                accountId,
                displayName: organization?.displayName ?? accountId,
                handle: organization?.handle ?? accountId,
              };
            }),
            availableOrganizations: organizations.filter(
              (organization) =>
                !selected.organizationAccountIds.includes(
                  organization.accountId,
                ),
            ),
          }
        : undefined,
    },
    repositoryPolicy: selected
      ? {
          enterpriseId: selected.enterpriseId,
          ...selected.repositoryVisibilityPolicy,
        }
      : undefined,
  };
}
