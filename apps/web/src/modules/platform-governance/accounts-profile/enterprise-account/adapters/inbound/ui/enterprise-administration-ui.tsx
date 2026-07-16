import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@a-i/shadcn/ui/button";
import type {
  EnterpriseAdministrationActions,
  EnterpriseAdministrationViewModel,
} from "../../../application/dto/enterprise-administration-view-model";
import { EnterpriseAccountSelector } from "./enterprise-account-selector-ui";
import { EnterpriseAdministrationEmptyState } from "./enterprise-administration-empty-state-ui";
import { EnterpriseOrganizationAffiliationCard } from "./enterprise-organization-affiliation-ui";

export function EnterpriseAdministrationView({
  model,
  actions,
  supplementalControls,
}: {
  model: EnterpriseAdministrationViewModel;
  actions: EnterpriseAdministrationActions;
  supplementalControls?: ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Settings</p>
          <h1 className="text-3xl font-semibold">Enterprises</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Centrally govern affiliated organizations. Enterprise accounts do
            not own organization resources directly.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/settings/organizations">Organizations</Link>
        </Button>
      </header>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <EnterpriseAccountSelector
          createEnterprise={actions.createEnterprise}
          enterprises={model.enterprises}
          selectedEnterpriseId={model.selected?.enterpriseId}
        />
        {model.selected ? (
          <div className="flex min-w-0 flex-col gap-6">
            <EnterpriseOrganizationAffiliationCard
              affiliateOrganization={actions.affiliateOrganization}
              enterprise={model.selected}
            />
            {supplementalControls}
          </div>
        ) : (
          <EnterpriseAdministrationEmptyState />
        )}
      </div>
    </main>
  );
}
