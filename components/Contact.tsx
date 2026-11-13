import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/content/locales";
import { legalPaths } from "@/content/site";
import { ContactForm } from "./ContactForm";

/** Contacto (especificación §4.8 y §5): intro en servidor y formulario en ContactForm. */
export function Contact({ t, locale }: { t: Dictionary; locale: Locale }) {
  const c = t.contact;
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
        <ContactForm
          locale={locale}
          sourcePage={localePath(locale, "/")}
          privacyHref={localePath(locale, legalPaths.privacy)}
          form={c.form}
          sent={c.sent}
          errors={c.errors}
        />
      </div>
    </section>
  );
}
