import { BookOpen } from "lucide-react";
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
import { Textarea } from "@a-i/shadcn/ui/textarea";
import type { WikiPageV1 } from "../../../contracts/v1/public";

export function RepositoryWikiUi({
  repositoryId,
  page,
  createPage,
}: {
  repositoryId: string;
  page?: WikiPageV1;
  createPage: (formData: FormData) => Promise<void>;
}) {
  return (
    <Card className="m-4 gap-4 py-4">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2 text-sm">
          <BookOpen aria-hidden="true" />
          Repository Wiki
        </CardTitle>
        <CardDescription>
          Publish Repository-scoped knowledge without exposing Git-backed
          storage details.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-4">
        <form action={createPage}>
          <input type="hidden" name="repositoryId" value={repositoryId} />
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="wiki-page-id">Page ID</FieldLabel>
              <Input id="wiki-page-id" name="pageId" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="wiki-page-title">Page title</FieldLabel>
              <Input id="wiki-page-title" name="title" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="wiki-page-content">Page content</FieldLabel>
              <Textarea id="wiki-page-content" name="content" required />
            </Field>
            <Button type="submit">Publish Wiki Page</Button>
          </FieldGroup>
        </form>

        {page ? (
          <article className="rounded-md border bg-muted/30 p-4">
            <h3 className="font-semibold">{page.title}</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm">{page.content}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              {page.publicationState}
            </p>
          </article>
        ) : null}
      </CardContent>
    </Card>
  );
}
