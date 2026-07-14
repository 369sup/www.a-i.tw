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
import { Input } from "@a-i/shadcn/ui/input";
import { Label } from "@a-i/shadcn/ui/label";
import { Textarea } from "@a-i/shadcn/ui/textarea";
import { getProductComposition } from "@/src/composition/product-composition";
import { requireConsoleAuthentication } from "@/src/app/(console)/console-session-composition";
import { registerGitHubAppAction } from "./app-registration-command-composition";

export default async function GitHubAppsSettingsPage() {
  const authentication = await requireConsoleAuthentication();
  const registrations = await getProductComposition().appManagement.listOwned(
    authentication.principal.principalId,
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Developer settings</p>
          <h1 className="text-3xl font-semibold">GitHub Apps</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Register app identities separately from installations, user
            authorization, webhook delivery, and Marketplace distribution.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/repositories">Back to repositories</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Owned registrations</CardTitle>
            <CardDescription>
              Private GitHub Apps registered to your Personal Account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {registrations.length === 0 ? (
              <p className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
                You have not registered a GitHub App yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {registrations.map((registration) => (
                  <li className="rounded-md border p-4" key={registration.id}>
                    <div className="flex flex-wrap items-center gap-2">
                      <strong>{registration.name}</strong>
                      <Badge variant="secondary">
                        {registration.availability}
                      </Badge>
                    </div>
                    {registration.description ? (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {registration.description}
                      </p>
                    ) : null}
                    <a
                      className="mt-3 inline-block text-sm font-medium underline-offset-4 hover:underline"
                      href={registration.homepageUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {registration.homepageUrl}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Register a GitHub App</CardTitle>
            <CardDescription>
              App names are required and limited to 34 characters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={registerGitHubAppAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="app-name">GitHub App name</Label>
                <Input id="app-name" maxLength={34} name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-description">Description</Label>
                <Textarea id="app-description" name="description" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-homepage">Homepage URL</Label>
                <Input
                  id="app-homepage"
                  name="homepageUrl"
                  placeholder="https://example.com/app"
                  required
                  type="url"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-callback">Callback URL</Label>
                <Input
                  id="app-callback"
                  name="callbackUrl"
                  placeholder="https://example.com/callback"
                  type="url"
                />
                <p className="text-xs text-muted-foreground">
                  Optional. Used only by a later user-authorization flow.
                </p>
              </div>
              <Button type="submit">Create GitHub App</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
