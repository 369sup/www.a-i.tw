"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

import { CreateResourceForm } from "./create-resource-form";

export function CreateResourceDialog({ namespace }: { namespace: string }) {
  const router = useRouter();
  const close = () => router.back();
  const closeOnBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <ModalFrame onBackdropClick={closeOnBackdrop} onClose={close}>
      <p className="text-sm font-medium text-blue-700">
        Parallel Route / intercepted modal
      </p>
      <h1 className="mt-2 text-2xl font-semibold" id="create-resource-title">
        Create a resource
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        The list remains mounted behind this dialog during soft navigation.
      </p>
      <div className="mt-6">
        <CreateResourceForm namespace={namespace} />
      </div>
    </ModalFrame>
  );
}

function ModalFrame({
  children,
  onBackdropClick,
  onClose,
}: {
  children: ReactNode;
  onBackdropClick: (event: MouseEvent<HTMLDivElement>) => void;
  onClose: () => void;
}) {
  return (
    <div
      aria-labelledby="create-resource-title"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      onClick={onBackdropClick}
      role="dialog"
    >
      <section className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
        <button
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        {children}
      </section>
    </div>
  );
}
