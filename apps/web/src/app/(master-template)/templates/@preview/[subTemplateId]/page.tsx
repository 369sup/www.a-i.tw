export default async function Preview({
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
      aria-label="Sub-template preview"
      className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
    >
      <h2 className="font-semibold">Preview</h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">{template.title}</p>
      <pre className="mt-4 whitespace-pre-wrap text-sm">{template.content}</pre>
    </section>
  );
}
import { notFound } from "next/navigation";
import { getMasterTemplateApplication } from "@/src/server/composition/master-template";
