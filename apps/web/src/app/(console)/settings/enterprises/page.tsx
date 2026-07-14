import { EnterpriseAdministrationView } from "@/src/modules/platform-governance/accounts-profile/enterprise-account/public-api";
import { EnterpriseRepositoryPolicyCard } from "@/src/modules/platform-governance/access-policy/policy-governance/public-api";
import {
  affiliateOrganizationAction,
  createEnterpriseAction,
  updateRepositoryPolicyAction,
} from "./enterprise-command-composition";
import { getEnterpriseAdministrationViewModel } from "./enterprise-settings-composition";

export default async function EnterprisesSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ enterprise?: string }>;
}) {
  const model = await getEnterpriseAdministrationViewModel(searchParams);

  return (
    <EnterpriseAdministrationView
      actions={{
        createEnterprise: createEnterpriseAction,
        affiliateOrganization: affiliateOrganizationAction,
      }}
      model={model.enterprise}
      policyControl={
        model.repositoryPolicy ? (
          <EnterpriseRepositoryPolicyCard
            model={model.repositoryPolicy}
            updateRepositoryPolicy={updateRepositoryPolicyAction}
          />
        ) : undefined
      }
    />
  );
}
