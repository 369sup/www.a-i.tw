import Link from "next/link";
import { Button } from "@a-i/shadcn/ui/button";
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
import { Field, FieldGroup, FieldLabel } from "@a-i/shadcn/ui/field";
import { Input } from "@a-i/shadcn/ui/input";
import { NativeSelect, NativeSelectOption } from "@a-i/shadcn/ui/native-select";
import { Separator } from "@a-i/shadcn/ui/separator";
import { Textarea } from "@a-i/shadcn/ui/textarea";
import type { ProjectSummaryV1 } from "../../../contracts/v1/public";

type ProjectAction = (formData: FormData) => Promise<void>;

export function ProjectPlanningUi({
  owners,
  selectedOwnerAccountId,
  projects,
  createProject,
  addIssue,
  addDraft,
}: {
  owners: readonly Readonly<{
    accountId: string;
    displayName: string;
  }>[];
  selectedOwnerAccountId: string;
  projects: readonly ProjectSummaryV1[];
  createProject: ProjectAction;
  addIssue: ProjectAction;
  addDraft: ProjectAction;
}) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-sm text-muted-foreground">
          Plan account-owned work without moving Issue truth into the Project.
        </p>
      </div>

      <nav aria-label="Project owner accounts" className="flex flex-wrap gap-2">
        {owners.map((owner) => (
          <Button
            asChild
            key={owner.accountId}
            variant={
              owner.accountId === selectedOwnerAccountId
                ? "secondary"
                : "outline"
            }
          >
            <Link
              href={{
                pathname: "/projects",
                query: { owner: owner.accountId },
              }}
            >
              {owner.displayName}
            </Link>
          </Button>
        ))}
      </nav>

      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>
            Projects belong to a User Account or Organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createProject}>
            <input
              type="hidden"
              name="ownerAccountId"
              value={selectedOwnerAccountId}
            />
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="project-title">Project title</FieldLabel>
                <Input id="project-title" name="title" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="project-visibility">Visibility</FieldLabel>
                <NativeSelect
                  defaultValue="private"
                  id="project-visibility"
                  name="visibility"
                >
                  <NativeSelectOption value="private">
                    Private
                  </NativeSelectOption>
                  <NativeSelectOption value="public">Public</NativeSelectOption>
                </NativeSelect>
              </Field>
              <Button type="submit">Create Project</Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {projects.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>No Projects</EmptyTitle>
            <EmptyDescription>
              No Projects exist for this account.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <Card
              aria-label={`Project ${project.title}`}
              key={project.projectId}
            >
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  {project.visibility} · {project.items.length} items
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <ul className="flex flex-col gap-2 text-sm">
                  {project.items.map((item) => (
                    <li
                      className="rounded-md border bg-muted/30 p-3"
                      key={item.itemId}
                    >
                      {item.type === "issue" ? (
                        <>
                          <strong>Issue reference</strong>
                          <p className="text-muted-foreground">
                            {item.issueId}
                          </p>
                        </>
                      ) : (
                        <>
                          <strong>{item.title}</strong>
                          {item.body ? (
                            <p className="text-muted-foreground">{item.body}</p>
                          ) : null}
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                <Separator />
                <form action={addDraft}>
                  <input
                    type="hidden"
                    name="projectId"
                    value={project.projectId}
                  />
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor={`draft-title-${project.projectId}`}>
                        Draft title
                      </FieldLabel>
                      <Input
                        id={`draft-title-${project.projectId}`}
                        name="title"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor={`draft-body-${project.projectId}`}>
                        Draft body
                      </FieldLabel>
                      <Textarea
                        id={`draft-body-${project.projectId}`}
                        name="body"
                      />
                    </Field>
                    <Button type="submit" variant="secondary">
                      Add Draft Item
                    </Button>
                  </FieldGroup>
                </form>

                <Separator />
                <form action={addIssue}>
                  <input
                    type="hidden"
                    name="projectId"
                    value={project.projectId}
                  />
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor={`issue-id-${project.projectId}`}>
                        Existing Issue ID
                      </FieldLabel>
                      <Input
                        id={`issue-id-${project.projectId}`}
                        name="issueId"
                        required
                      />
                    </Field>
                    <Button type="submit" variant="outline">
                      Add Issue Reference
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
