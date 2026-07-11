import type { ReactNode } from "react";

export default function TemplatesLayout({
  children,
  editor,
  list,
  preview,
}: {
  children: ReactNode;
  editor: ReactNode;
  list: ReactNode;
  preview: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-medium text-blue-700">
          Master-template bounded context
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Template workspace</h1>
      </header>
      {children}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1.25fr)]">
        {list}
        {preview}
        {editor}
      </div>
    </main>
  );
}
