import type { Dictionary } from "@/content";
import { interestIds } from "@/content/schema";
import { localePath, type Locale } from "@/content/locales";
import { legalPaths } from "@/content/site";

/**
 * Contacto (especificación §4.8 y §5). En W1 el formulario es estático: POST sin
 * acción (ningún dato viaja en la URL). La acción de servidor, la validación y la
 * confirmación del canvas ("Consulta recibida") llegan en W2.
 */
export function Contact({ t, locale }: { t: Dictionary; locale: Locale }) {
  const c = t.contact;
  const f = c.form;
  return (
    <section id="contacto" className="section dark contact" aria-labelledby="contacto-titulo">
      <div className="contact-intro">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 id="contacto-titulo" tabIndex={-1}>
          {c.title}
        </h2>
        <ul className="contact-next">
          {c.next.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
      <div className="form-card">
        <form className="form" method="post">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="source_page" value={localePath(locale, "/")} />
          <div className="trap" aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="f-name">{f.name}</label>
              <input className="input" id="f-name" name="name" type="text" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="f-email">{f.email}</label>
              <input className="input" id="f-email" name="email" type="email" required autoComplete="email" />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="f-company">
                {f.company} <span className="optional">{f.optional}</span>
              </label>
              <input className="input" id="f-company" name="company" type="text" autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="f-interest">{f.interest}</label>
              <select className="input" id="f-interest" name="interest" required defaultValue="">
                <option value="">{f.interestPlaceholder}</option>
                {interestIds.map((id) => (
                  <option key={id} value={id}>
                    {f.interestOptions[id]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-msg">{f.message}</label>
            <textarea className="input" id="f-msg" name="message" rows={5} required maxLength={5000} />
          </div>
          <label className="check">
            <input type="checkbox" name="consent_inquiry" required />
            <span>
              {f.consentInquiry} <a href={localePath(locale, legalPaths.privacy)}>{f.privacyLink}</a>.
            </span>
          </label>
          <label className="check">
            <input type="checkbox" name="consent_news" />
            <span>{f.consentNews}</span>
          </label>
          <button type="submit" className="btn btn-primary btn-lg">
            {f.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
