import { Badge } from "@a-i/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@a-i/shadcn/ui/empty";

export type ActivityFeedItemViewModel = Readonly<{
  id: string;
  actorPrincipalId: string;
  verb: string;
  subjectRef: string;
  occurredAt: string;
}>;

export function ActivityFeedView({
  items,
}: {
  items: readonly ActivityFeedItemViewModel[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>
          Recipient-scoped projections; source resources remain authoritative.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>No recent activity</EmptyTitle>
              <EmptyDescription>
                No visible activity is available for this recipient.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="divide-y">
            {items.map((item) => (
              <li
                className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                key={item.id}
              >
                <span>
                  <strong>{item.actorPrincipalId}</strong> {item.verb}{" "}
                  <span className="text-muted-foreground">
                    {item.subjectRef}
                  </span>
                </span>
                <Badge variant="outline">
                  <time dateTime={item.occurredAt}>{item.occurredAt}</time>
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
