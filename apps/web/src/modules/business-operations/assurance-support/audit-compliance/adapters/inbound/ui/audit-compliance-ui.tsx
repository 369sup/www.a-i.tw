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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@a-i/shadcn/ui/table";

export type AuditEntryViewModel = Readonly<{
  id: string;
  action: string;
  targetRef: string;
  result: "success" | "failure";
  occurredAt: string;
}>;

export function AuditComplianceView({
  actorHandle,
  entries,
}: {
  actorHandle: string;
  entries: readonly AuditEntryViewModel[];
}) {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <p className="text-sm text-muted-foreground">Settings · @{actorHandle}</p>
      <h1 className="mt-1 text-3xl font-semibold">Audit evidence</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Append-only administrative observations for the authenticated actor.
        These records do not replace source Domain events or operational logs.
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Audit entries</CardTitle>
          <CardDescription>
            Action, target, result and occurrence time from the Audit owner.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyTitle>No audit evidence</EmptyTitle>
                <EmptyDescription>
                  No audit evidence is available for this actor.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Occurred</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">
                      {entry.action}
                    </TableCell>
                    <TableCell>{entry.targetRef}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          entry.result === "success"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {entry.result}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <time dateTime={entry.occurredAt}>
                        {entry.occurredAt}
                      </time>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
