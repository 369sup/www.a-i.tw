import Link from "next/link";

const templates = [
  { id: "landing-page", title: "Landing page" },
  { id: "release-notes", title: "Release notes" },
];

export default function TemplateList() {
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
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
