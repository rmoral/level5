"use client";

import { useActionState, useEffect, useState } from "react";
import type { Dictionary } from "@/content";
import { subscribeNews, type NewsState } from "@/lib/form-actions";

type Props = {
  locale: string;
  sourcePage: string;
  t: Dictionary["footer"]["newsletter"];
  errors: Dictionary["contact"]["errors"];
};

const initial: NewsState = { status: "idle" };

/** Alta a novedades del pie (especificación §5.1): solo correo, doble opt-in. */
export function NewsletterForm({ locale, sourcePage, t, errors }: Props) {
  const [state, action, pending] = useActionState(subscribeNews, initial);
  const [loadedAt, setLoadedAt] = useState("");
  useEffect(() => setLoadedAt(String(Date.now())), []);
  const sent = state.status === "sent";
  const error = state.status === "error" ? state : undefined;

  return (
    <form className="news-form" action={action} noValidate>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source_page" value={sourcePage} />
      <input type="hidden" name="loaded_at" value={loadedAt} />
      <div className="trap" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <label htmlFor="n-email" className="sr-only">
        {t.label}
      </label>
      <input
        key={error ? error.email : "news"}
        className="input"
        id="n-email"
        name="email"
        type="email"
        required
        maxLength={254}
        placeholder={t.placeholder}
        autoComplete="email"
        defaultValue={error?.email}
        disabled={sent}
        {...(error ? { "aria-invalid": true, "aria-describedby": "n-email-error" } : {})}
      />
      <button type="submit" className="btn btn-light" disabled={pending || sent} aria-busy={pending}>
        {sent ? t.submitted : t.submit}
      </button>
      <p className="news-status" role="status">
        {error && (
          <span className="field-error field-error--dark" id="n-email-error">
            {errors[error.error]}
          </span>
        )}
      </p>
    </form>
  );
}
