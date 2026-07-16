import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";
import type { EnterpriseDomainVerificationViewModel } from "../../../application/dto/domain-verification-view-model";
import { EnterpriseDomainVerificationList } from "./enterprise-domain-verification-list";
import { StartEnterpriseDomainVerificationCard } from "./start-enterprise-domain-verification-card";

export type EnterpriseDomainVerificationActions = Readonly<{
  start(formData: FormData): Promise<void>;
  complete(formData: FormData): Promise<void>;
}>;

export function EnterpriseDomainVerificationPage({
  model,
  actions,
}: {
  model: EnterpriseDomainVerificationViewModel;
  actions: EnterpriseDomainVerificationActions;
}) {
  return (
    <main className="mx-auto flex w-full min-w-0 max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Enterprise settings</p>
          <h1 className="text-3xl font-semibold">Verified domains</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Prove DNS ownership for {model.enterpriseName}. Authentication,
            authorization, organization domain policy, and IP allow lists remain
            separate decisions.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/settings/enterprises?enterprise=${model.enterpriseId}`}>
            Back to enterprise
          </Link>
        </Button>
      </header>

      <StartEnterpriseDomainVerificationCard
        enterpriseId={model.enterpriseId}
        start={actions.start}
      />
      <EnterpriseDomainVerificationList
        complete={actions.complete}
        domains={model.domains}
      />
    </main>
  );
}
