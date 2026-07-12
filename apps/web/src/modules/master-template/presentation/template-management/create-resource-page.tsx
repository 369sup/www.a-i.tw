import { CreateResourceForm } from "./create-resource-form";

export function CreateResourcePage({ namespace }: { namespace: string }) {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-16">
      <p className="text-sm font-medium text-blue-700">
        Master template / full page
      </p>
      <h1 className="mt-2 text-3xl font-semibold">Create a resource</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        Direct navigation and refresh render this complete page rather than a
        modal.
      </p>
      <div className="mt-8 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <CreateResourceForm namespace={namespace} />
      </div>
    </main>
  );
}
