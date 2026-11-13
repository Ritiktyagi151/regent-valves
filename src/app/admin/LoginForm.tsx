"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-[0.8rem] font-semibold text-navy">Admin password</span>
        <input className="field" type="password" name="password" autoComplete="current-password" required autoFocus />
      </label>
      {state.error && (
        <p role="alert" className="text-sm font-medium text-signal">
          {state.error}
        </p>
      )}
      <button className="btn btn-blue w-full" disabled={pending}>
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
