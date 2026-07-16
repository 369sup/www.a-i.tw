import { Building2 } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@a-i/shadcn/ui/empty";

export function EnterpriseAdministrationEmptyState() {
  return (
    <Empty className="min-h-96 border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Building2 />
        </EmptyMedia>
        <EmptyTitle>No enterprise accounts</EmptyTitle>
        <EmptyDescription>
          Create an enterprise to centrally govern affiliated organizations.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p className="text-muted-foreground">
          Enterprise teams remain a separate planned capability and are not
          represented as organization teams.
        </p>
      </EmptyContent>
    </Empty>
  );
}
