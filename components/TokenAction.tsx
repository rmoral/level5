"use client";

import { useActionState } from "react";
import { confirmSubscription, unsubscribe, type TokenState } from "@/lib/form-actions";

type Props = {
  kind: "confirm" | "unsubscribe";
  token: string;
  locale: string;
  button: string;
  results: Record<string, string>;
  error: string;
};

const initial: TokenState = { status: "idle" };

/**
 * Botón de confirmación o baja. La operación se hace al pulsar (POST), no al abrir el
 * enlace: así los analizadores de correo que abren los enlaces no confirman ni dan de
 * baja por su cuenta. Funciona sin JavaScript.
 */
export function TokenAction({ kind, token, locale, button, results, error }: Props) {
  const [state, action, pending] = useActionState(kind === "confirm" ? confirmSubscription : unsubscribe, initial);
  if (state.status === "done") {
    return (
      <p className="token-result" role="status">
        {results[state.result] ?? results.not_found}
      </p>
    );
  }
  return (
    <form action={action} className="token-form">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="locale" value={locale} />
      {state.status === "error" && (
        <p className="form-error form-error--dark" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-light btn-lg" disabled={pending} aria-busy={pending}>
        {button}
      </button>
    </form>
  );
}
