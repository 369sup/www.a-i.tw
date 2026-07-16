import { Badge } from "@a-i/shadcn/ui/badge";
import { Button } from "@a-i/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";
import type { DomainVerificationViewModel } from "../../../application/dto/domain-verification-view-model";

export function EnterpriseDomainVerificationCard({
  domain,
  complete,
}: {
  domain: DomainVerificationViewModel;
  complete(formData: FormData): Promise<void>;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>{domain.domainName}</CardTitle>
            <CardDescription>
              Started {formatTimestamp(domain.createdAt)}
            </CardDescription>
          </div>
          <Badge
            variant={domain.status === "verified" ? "default" : "secondary"}
          >
            {domain.status === "verified" ? "Verified" : "Pending"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="font-medium">TXT record name</dt>
            <dd className="break-all font-mono text-muted-foreground">
              {domain.recordName}
            </dd>
          </div>
          <div>
            <dt className="font-medium">TXT record value</dt>
            <dd className="break-all font-mono text-muted-foreground">
              {domain.expectedValue}
            </dd>
          </div>
          {domain.verifiedAt ? (
            <div>
              <dt className="font-medium">Verified at</dt>
              <dd className="text-muted-foreground">
                {formatTimestamp(domain.verifiedAt)}
              </dd>
            </div>
          ) : null}
        </dl>
        {domain.status === "pending" ? (
          <form action={complete}>
            <input
              name="enterpriseId"
              type="hidden"
              value={domain.enterpriseId}
            />
            <input
              name="verificationId"
              type="hidden"
              value={domain.verificationId}
            />
            <Button type="submit" variant="outline">
              Check authoritative DNS
            </Button>
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
