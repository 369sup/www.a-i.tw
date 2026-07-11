import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-20 dark:bg-zinc-950">
      <section className="max-w-2xl rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
          Architecture showcase
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Master template
        </h1>
        <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-300">
          A runnable, non-product reference slice for Domain-Driven Modular
          Monolith and Ports &amp; Adapters. It includes a shareable create
          route, an intercepted modal, and a framework-free application layer.
        </p>
        <Link
          className="mt-8 inline-flex rounded-md bg-zinc-900 px-4 py-2.5 font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          href="/templates"
        >
          Open the runnable slice
        </Link>
      </section>
    </main>
  );
}
