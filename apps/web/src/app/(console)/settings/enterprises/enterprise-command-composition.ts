"use server";

import { revalidatePath } from "next/cache";
import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { getProductComposition } from "@/src/composition/product-composition";
import {
  mapAffiliateOrganizationForm,
  mapCreateEnterpriseForm,
} from "@/src/modules/platform-governance/accounts-profile/enterprise-account/public-api";
import { mapUpdateRepositoryPolicyForm } from "@/src/modules/platform-governance/access-policy/policy-governance/public-api";

export async function createEnterpriseAction(formData: FormData) {
  const session = await requireConsoleAuthentication();
  const input = mapCreateEnterpriseForm(formData);
  await getProductComposition().enterpriseGovernance.create({
    ...input,
    actorPrincipalId: session.principal.principalId,
  });
  revalidatePath("/settings/enterprises");
}

export async function affiliateOrganizationAction(formData: FormData) {
  const session = await requireConsoleAuthentication();
  const input = mapAffiliateOrganizationForm(formData);
  await getProductComposition().enterpriseGovernance.affiliateOrganization({
    ...input,
    actorPrincipalId: session.principal.principalId,
  });
  revalidatePath("/settings/enterprises");
}

export async function updateRepositoryPolicyAction(formData: FormData) {
  const session = await requireConsoleAuthentication();
  const input = mapUpdateRepositoryPolicyForm(formData);
  await getProductComposition().enterpriseGovernance.setRepositoryVisibilityPolicy(
    {
      ...input,
      actorPrincipalId: session.principal.principalId,
    },
  );
  revalidatePath("/settings/enterprises");
}
