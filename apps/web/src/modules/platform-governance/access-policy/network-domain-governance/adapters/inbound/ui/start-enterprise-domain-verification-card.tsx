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
import { Input } from "@a-i/shadcn/ui/input";

export function StartEnterpriseDomainVerificationCard({
  enterpriseId,
  start,
}: {
  enterpriseId: string;
  start(formData: FormData): Promise<void>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Start a DNS ownership challenge</CardTitle>
        <CardDescription>
          Hostnames are canonicalized to lowercase and one trailing dot is
          removed. Root and www hostnames remain distinct.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={start}>
          <input name="enterpriseId" type="hidden" value={enterpriseId} />
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="enterprise-domain-name">
                Domain name
              </FieldLabel>
              <Input
                autoComplete="off"
                id="enterprise-domain-name"
                name="domainName"
                placeholder="example.com"
                required
              />
              <FieldDescription>
                Enter a DNS hostname, not a URL.
              </FieldDescription>
            </Field>
            <Button type="submit">Start verification</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
