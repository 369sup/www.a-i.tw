import Link from "next/link";
import { Badge } from "@a-i/shadcn/ui/badge";
import { Button } from "@a-i/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@a-i/shadcn/ui/field";
import { NativeSelect, NativeSelectOption } from "@a-i/shadcn/ui/native-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@a-i/shadcn/ui/table";
import type {
  EnterpriseAdministrationActions,
  EnterpriseAdministrationViewModel,
} from "../../../application/dto/enterprise-administration-view-model";

type SelectedEnterprise = NonNullable<
  EnterpriseAdministrationViewModel["selected"]
>;

export function EnterpriseOrganizationAffiliationCard({
  enterprise,
  affiliateOrganization,
}: {
  enterprise: SelectedEnterprise;
  affiliateOrganization: EnterpriseAdministrationActions["affiliateOrganization"];
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>{enterprise.name}</CardTitle>
            <CardDescription>
              {enterprise.organizations.length} governed organizations
            </CardDescription>
          </div>
          <Badge variant="secondary">Enterprise owner</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {enterprise.organizations.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Handle</TableHead>
                <TableHead className="text-right">Repositories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enterprise.organizations.map((organization) => (
                <TableRow key={organization.accountId}>
                  <TableCell className="font-medium">
                    {organization.displayName}
                  </TableCell>
                  <TableCell>@{organization.handle}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link
                        href={`/repositories?account=${organization.accountId}`}
                      >
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">
            No organizations are affiliated with this enterprise yet.
          </p>
        )}

        <form action={affiliateOrganization}>
          <input
            name="enterpriseId"
            type="hidden"
            value={enterprise.enterpriseId}
          />
          <FieldGroup>
            <Field
              data-disabled={enterprise.availableOrganizations.length === 0}
            >
              <FieldLabel htmlFor="organization-account">
                Add organization
              </FieldLabel>
              <NativeSelect
                disabled={enterprise.availableOrganizations.length === 0}
                id="organization-account"
                name="organizationAccountId"
                required
              >
                <NativeSelectOption value="">
                  Select an organization
                </NativeSelectOption>
                {enterprise.availableOrganizations.map((organization) => (
                  <NativeSelectOption
                    key={organization.accountId}
                    value={organization.accountId}
                  >
                    {organization.displayName} (@{organization.handle})
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <FieldDescription>
                An organization can be governed by only one enterprise.
              </FieldDescription>
            </Field>
            <Button
              disabled={enterprise.availableOrganizations.length === 0}
              type="submit"
            >
              Add organization
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
