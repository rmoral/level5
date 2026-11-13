"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content";
import { interestIds } from "@/content/ids";
import { submitInquiry, type InquiryField, type InquiryState } from "@/lib/form-actions";

type Props = {
  locale: string;
  sourcePage: string;
  privacyHref: string;
  form: Dictionary["contact"]["form"];
  sent: Dictionary["contact"]["sent"];
  errors: Dictionary["contact"]["errors"];
};

const initial: InquiryState = { status: "idle" };

/**
 * Formulario de consulta (especificación §5.1–5.2). Sin JavaScript se envía como un
 * formulario normal a la acción de servidor; con JavaScript añade la marca de tiempo
 * (antispam) y los UTM de la URL, y muestra errores sin recargar.
 */
export function ContactForm({ locale, sourcePage, privacyHref, form: f, sent, errors }: Props) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const [dismissed, setDismissed] = useState(false);
  const [round, setRound] = useState(0);
  const [loadedAt, setLoadedAt] = useState("");
  const [utm, setUtm] = useState({ source: "", medium: "", campaign: "" });
  const statusRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setLoadedAt(String(Date.now()));
    const q = new URLSearchParams(window.location.search);
    setUtm({ source: q.get("utm_source") ?? "", medium: q.get("utm_medium") ?? "", campaign: q.get("utm_campaign") ?? "" });
  }, [round]);

  useEffect(() => {
    if (state.status === "sent") {
      setDismissed(false);
      statusRef.current?.focus();
    } else if (state.status === "error") {
      summaryRef.current?.focus();
    }
  }, [state]);

  if (state.status === "sent" && !dismissed) {
    return (
      <div className="form-sent" role="status" tabIndex={-1} ref={statusRef}>
        <p className="eyebrow">{sent.eyebrow}</p>
        <h3 className="form-sent-title">{sent.title}</h3>
        <p className="muted">{sent.body}</p>
        <a
          className="btn btn-outline"
          href={`${sourcePage}#contacto`}
          onClick={(e) => {
            e.preventDefault();
            setDismissed(true);
            setRound((r) => r + 1);
          }}
        >
          {sent.again}
        </a>
      </div>
    );
  }

  const err = state.status === "error" ? state : undefined;
  const v = err?.values;
  const fieldError = (k: InquiryField) => err?.fieldErrors[k];
  const describe = (k: InquiryField) => (fieldError(k) ? { "aria-invalid": true, "aria-describedby": `f-${k}-error` } : {});
  const ErrorText = ({ k }: { k: InquiryField }) => {
    const key = fieldError(k);
    return key ? (
      <p className="field-error" id={`f-${k}-error`}>
        {errors[key]}
      </p>
    ) : null;
  };

  return (
    // La clave remonta el formulario tras cada respuesta para que conserve lo escrito.
    <form key={`${round}-${err ? JSON.stringify(err.values) : ""}`} className="form" action={action} noValidate>
      {err && (
        <p className="form-error" role="alert" tabIndex={-1} ref={summaryRef}>
          {err.formError ? errors[err.formError] : errors.summary}
        </p>
      )}
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source_page" value={sourcePage} />
      <input type="hidden" name="loaded_at" value={loadedAt} />
      <input type="hidden" name="utm_source" value={utm.source} />
      <input type="hidden" name="utm_medium" value={utm.medium} />
      <input type="hidden" name="utm_campaign" value={utm.campaign} />
      <div className="trap" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="f-name">{f.name}</label>
          <input className="input" id="f-name" name="name" type="text" required maxLength={200} autoComplete="name" defaultValue={v?.name} {...describe("name")} />
          <ErrorText k="name" />
        </div>
        <div className="field">
          <label htmlFor="f-email">{f.email}</label>
          <input className="input" id="f-email" name="email" type="email" required maxLength={254} autoComplete="email" defaultValue={v?.email} {...describe("email")} />
          <ErrorText k="email" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="f-company">
            {f.company} <span className="optional">{f.optional}</span>
          </label>
          <input className="input" id="f-company" name="company" type="text" maxLength={200} autoComplete="organization" defaultValue={v?.company} {...describe("company")} />
          <ErrorText k="company" />
        </div>
        <div className="field">
          <label htmlFor="f-interest">{f.interest}</label>
          <select className="input" id="f-interest" name="interest" required defaultValue={v?.interest ?? ""} {...describe("interest")}>
            <option value="">{f.interestPlaceholder}</option>
            {interestIds.map((id) => (
              <option key={id} value={id}>
                {f.interestOptions[id]}
              </option>
            ))}
          </select>
          <ErrorText k="interest" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-msg">{f.message}</label>
        <textarea className="input" id="f-msg" name="message" rows={5} required maxLength={5000} defaultValue={v?.message} {...describe("message")} />
        <ErrorText k="message" />
      </div>
      <div>
        <label className="check">
          <input type="checkbox" name="consent_inquiry" required defaultChecked={v?.consent_inquiry} {...describe("consent_inquiry")} />
          <span>
            {f.consentInquiry} <a href={privacyHref}>{f.privacyLink}</a>.
          </span>
        </label>
        <ErrorText k="consent_inquiry" />
      </div>
      <label className="check">
        {/* Nunca viene marcada (especificación §5.1). */}
        <input type="checkbox" name="consent_news" defaultChecked={v?.consent_news ?? false} />
        <span>{f.consentNews}</span>
      </label>
      <button type="submit" className="btn btn-primary btn-lg" disabled={pending} aria-busy={pending}>
        {f.submit}
      </button>
    </form>
  );
}
