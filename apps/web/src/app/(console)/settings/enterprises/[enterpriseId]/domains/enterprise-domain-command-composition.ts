"use server";

import { revalidatePath } from "next/cache";
import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { getProductComposition } from "@/src/composition/product-composition";
import {
  completeDomainVerificationFromForm,
  startDomainVerificationFromForm,
} from "@/src/modules/platform-governance/access-policy/network-domain-governance/public-api";

export async function startEnterpriseDomainVerificationAction(
  formData: FormData,
) {
  const session = await requireConsoleAuthentication();
  const verification = await startDomainVerificationFromForm(
    getProductComposition().networkDomainGovernance,
    session.principal.principalId,
    formData,
  );
  revalidatePath(`/settings/enterprises/${verification.enterpriseId}/domains`);
}

export async function completeEnterpriseDomainVerificationAction(
  formData: FormData,
) {
  const session = await requireConsoleAuthentication();
  const verification = await completeDomainVerificationFromForm(
    getProductComposition().networkDomainGovernance,
    session.principal.principalId,
    formData,
  );
  revalidatePath(`/settings/enterprises/${verification.enterpriseId}/domains`);
}
