import { EnterpriseDomainVerificationPage } from "@/src/modules/platform-governance/access-policy/network-domain-governance/public-api";
import {
  completeEnterpriseDomainVerificationAction,
  startEnterpriseDomainVerificationAction,
} from "./enterprise-domain-command-composition";
import { getEnterpriseDomainVerificationViewModel } from "./enterprise-domain-settings-composition";

export default async function EnterpriseDomainsSettingsPage({
  params,
}: {
  params: Promise<{ enterpriseId: string }>;
}) {
  const { enterpriseId } = await params;
  const model = await getEnterpriseDomainVerificationViewModel(enterpriseId);

  return (
    <EnterpriseDomainVerificationPage
      actions={{
        start: startEnterpriseDomainVerificationAction,
        complete: completeEnterpriseDomainVerificationAction,
      }}
      model={model}
    />
  );
}
