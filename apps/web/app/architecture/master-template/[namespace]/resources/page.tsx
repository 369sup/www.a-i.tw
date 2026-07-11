import Link from "next/link";
import type { Route } from "next";

import { getMasterTemplateApplication } from "@/src/server/composition/master-template";

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ namespace: string }>;
}) {
  const { namespace } = await params;
  const resources = await getMasterTemplateApplication().listResources.execute({
    namespaceId: namespace,
  });
  const basePath = `/architecture/master-template/${namespace}/resources`;

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="text-sm font-medium text-blue-700">
        Runnable master template
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{namespace} resources</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            A complete slice: UX → Server Action → Application ports → Domain →
            in-memory adapter.
          </p>
        </div>
        <Link
          className="rounded-md bg-zinc-900 px-4 py-2 font-medium text-white dark:bg-white dark:text-zinc-900"
          href={`${basePath}/new` as Route}
        >
          New resource
        </Link>
      </div>
      <section className="mt-8 rounded-xl border border-zinc-200 dark:border-zinc-800">
        {resources.length === 0 ? (
          <p className="p-6 text-zinc-600 dark:text-zinc-300">
            No resources yet. Create the first one.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {resources.map((resource) => (
              <li key={resource.id}>
                <Link
                  className="block p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  href={`${basePath}/${resource.id}` as Route}
                >
                  <strong>{resource.name}</strong>
                  <span className="ml-3 text-sm text-zinc-500">
                    {new Date(resource.createdAt).toLocaleString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
