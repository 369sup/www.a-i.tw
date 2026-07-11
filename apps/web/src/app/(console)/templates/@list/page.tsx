import Link from "next/link";
import { getMasterTemplateApplication } from "@/src/server/composition/master-template";

export default async function TemplateList() {
  const templates = await getMasterTemplateApplication().subTemplates.list();
  return (
    <section
      aria-label="Sub-template list"
      className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
    >
      <h2 className="font-semibold">Sub-templates</h2>
      <ul className="mt-4 space-y-2">
        {templates.map((template) => (
          <li key={template.id}>
            <Link
              className="block rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              href={`/templates/${template.id}`}
            >
              {template.title}
              <span className="ml-2 text-xs text-zinc-500">
                {template.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
