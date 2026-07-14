import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@a-i/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";
import { Field, FieldGroup, FieldLabel } from "@a-i/shadcn/ui/field";
import { Input } from "@a-i/shadcn/ui/input";
import type {
  EnterpriseAdministrationActions,
  EnterpriseAdministrationViewModel,
} from "../../../application/dto/enterprise-administration-view-model";

export function EnterpriseAccountSelector({
  enterprises,
  selectedEnterpriseId,
  createEnterprise,
}: {
  enterprises: EnterpriseAdministrationViewModel["enterprises"];
  selectedEnterpriseId?: string;
  createEnterprise: EnterpriseAdministrationActions["createEnterprise"];
}) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Create enterprise</CardTitle>
          <CardDescription>
            The signed-in principal becomes the founding enterprise owner.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createEnterprise}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="enterprise-name">Name</FieldLabel>
                <Input
                  id="enterprise-name"
                  name="name"
                  placeholder="Analytical Enterprise"
                  required
                />
              </Field>
              <Button type="submit">Create enterprise</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {enterprises.length > 0 ? (
        <nav aria-label="Enterprise accounts" className="flex flex-col gap-2">
          {enterprises.map((enterprise) => (
            <Button
              asChild
              key={enterprise.enterpriseId}
              variant={
                enterprise.enterpriseId === selectedEnterpriseId
                  ? "secondary"
                  : "ghost"
              }
            >
              <Link
                href={`/settings/enterprises?enterprise=${enterprise.enterpriseId}`}
              >
                <Building2 data-icon="inline-start" />
                {enterprise.name}
              </Link>
            </Button>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
