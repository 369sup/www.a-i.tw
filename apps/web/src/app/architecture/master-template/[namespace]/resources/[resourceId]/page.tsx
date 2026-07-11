import Link from "next/link";
import { notFound } from "next/navigation";
import type { Route } from "next";

import { getMasterTemplateApplication } from "@/src/server/composition/master-template";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ namespace: string; resourceId: string }>;
}) {
  const { namespace, resourceId } = await params;
  const resource = await getMasterTemplateApplication().getResource.execute({
    namespaceId: namespace,
    resourceId,
  });
  if (!resource) notFound();

  const listPath = `/architecture/master-template/${namespace}/resources`;
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-16">
      <p className="text-sm font-medium text-blue-700">
        CreateResource succeeded
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{resource.name}</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-300">
        Stable ID: {resource.id}
      </p>
      <Link className="mt-8 inline-block underline" href={listPath as Route}>
        Back to the list
      </Link>
    </main>
  );
}
