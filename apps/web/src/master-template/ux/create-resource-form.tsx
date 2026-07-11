"use client";

import { useActionState } from "react";

import {
  createResourceAction,
  initialCreateResourceActionState,
} from "./create-resource-action";

export function CreateResourceForm({ namespace }: { namespace: string }) {
  const action = createResourceAction.bind(null, namespace);
  const [state, formAction, pending] = useActionState(
    action,
    initialCreateResourceActionState,
  );

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="resource-name">
          Resource name
        </label>
        <input
          aria-describedby={
            state.fieldErrors?.name ? "resource-name-error" : undefined
          }
          aria-invalid={Boolean(state.fieldErrors?.name)}
          autoComplete="off"
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 outline-none ring-blue-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          id="resource-name"
          name="name"
          placeholder="design-system"
          required
        />
        {state.fieldErrors?.name?.map((message) => (
          <p
            className="text-sm text-red-700"
            id="resource-name-error"
            key={message}
            role="alert"
          >
            {message}
          </p>
        ))}
      </div>
      {state.formError ? (
        <p className="text-sm text-red-700" role="alert">
          {state.formError}
        </p>
      ) : null}
      <button
        className="rounded-md bg-zinc-900 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-900"
        disabled={pending}
        type="submit"
      >
        {pending ? "Creating…" : "Create resource"}
      </button>
    </form>
  );
}
