import { ShieldCheck } from "lucide-react";
import { Button } from "@a-i/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@a-i/shadcn/ui/card";
import { Field, FieldGroup, FieldLabel } from "@a-i/shadcn/ui/field";
import { NativeSelect, NativeSelectOption } from "@a-i/shadcn/ui/native-select";

export type EnterpriseRepositoryPolicyViewModel = {
  enterpriseId: string;
  publicRepositoryCreation: "allowed" | "forbidden";
  publicVisibilityChange: "allowed" | "forbidden";
};

export function EnterpriseRepositoryPolicyCard({
  model,
  updateRepositoryPolicy,
}: {
  model: EnterpriseRepositoryPolicyViewModel;
  updateRepositoryPolicy(formData: FormData): Promise<void>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repository visibility policy</CardTitle>
        <CardDescription>
          These constraints apply to affiliated organizations; access grants
          remain a separate authorization decision.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={updateRepositoryPolicy}
          key={`${model.enterpriseId}:${model.publicRepositoryCreation}:${model.publicVisibilityChange}`}
        >
          <input name="enterpriseId" type="hidden" value={model.enterpriseId} />
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="repository-creation">
                Public repository creation
              </FieldLabel>
              <NativeSelect
                defaultValue={model.publicRepositoryCreation}
                id="repository-creation"
                name="publicRepositoryCreation"
              >
                <NativeSelectOption value="allowed">Allowed</NativeSelectOption>
                <NativeSelectOption value="forbidden">
                  Forbidden
                </NativeSelectOption>
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="visibility-change">
                Change visibility to public
              </FieldLabel>
              <NativeSelect
                defaultValue={model.publicVisibilityChange}
                id="visibility-change"
                name="publicVisibilityChange"
              >
                <NativeSelectOption value="allowed">Allowed</NativeSelectOption>
                <NativeSelectOption value="forbidden">
                  Forbidden
                </NativeSelectOption>
              </NativeSelect>
            </Field>
            <Button type="submit">
              <ShieldCheck data-icon="inline-start" />
              Save policy
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
