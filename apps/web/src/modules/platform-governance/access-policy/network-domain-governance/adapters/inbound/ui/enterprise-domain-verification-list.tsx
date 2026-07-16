import { Card, CardContent } from "@a-i/shadcn/ui/card";
import type { DomainVerificationViewModel } from "../../../application/dto/domain-verification-view-model";
import { EnterpriseDomainVerificationCard } from "./enterprise-domain-verification-card";

export function EnterpriseDomainVerificationList({
  domains,
  complete,
}: {
  domains: readonly DomainVerificationViewModel[];
  complete(formData: FormData): Promise<void>;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold">Domain verifications</h2>
        <p className="text-sm text-muted-foreground">
          Missing, mismatched, or unavailable DNS answers keep the challenge
          pending so it can be retried.
        </p>
      </div>
      {domains.length > 0 ? (
        domains.map((domain) => (
          <EnterpriseDomainVerificationCard
            complete={complete}
            domain={domain}
            key={domain.verificationId}
          />
        ))
      ) : (
        <Card>
          <CardContent className="py-8 text-sm text-muted-foreground">
            No Enterprise domain verification has started.
          </CardContent>
        </Card>
      )}
    </section>
  );
}
