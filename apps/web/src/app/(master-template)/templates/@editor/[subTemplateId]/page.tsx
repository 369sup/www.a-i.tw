export default async function Editor({
  params,
}: {
  params: Promise<{ subTemplateId: string }>;
}) {
  const { subTemplateId } = await params;
  const template =
    await getMasterTemplateApplication().subTemplates.get(subTemplateId);
  if (!template) notFound();
  return (
    <section
      aria-label="Sub-template editor"
      className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
    >
      <h2 className="font-semibold">Editor</h2>
      <label
        className="mt-4 block text-sm font-medium"
        htmlFor="template-content"
      >
        Content for {template.title}
      </label>
      <textarea
        className="mt-2 min-h-40 w-full rounded-md border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-950"
        defaultValue={template.content}
        id="template-content"
      />
    </section>
  );
}
import { notFound } from "next/navigation";
import { getMasterTemplateApplication } from "@/src/server/composition/master-template";
