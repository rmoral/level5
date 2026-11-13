import { getDictionary } from "@/content";
import { localeHome, localePath, type Locale } from "@/content/locales";
import { company, legalPaths } from "@/content/site";
import { Lockup } from "./Symbol";

export type LegalKey = "notice" | "privacy" | "cookies";

/** Ruta /legal/<slug> → página (especificación §3.4). */
export const legalSlugs: Record<string, LegalKey> = {
  "aviso-legal": "notice",
  privacidad: "privacy",
  cookies: "cookies",
};

/**
 * Página legal: datos comprobados del sitio y huecos marcados para la gestoría.
 * Los datos de la sociedad salen de company (espejo de settings.company_legal):
 * mientras no esté inscrita, NRT, domicilio y registro se muestran como pendientes.
 */
export function LegalPage({ locale, pageKey }: { locale: Locale; pageKey: LegalKey }) {
  const t = getDictionary(locale);
  const L = t.legal;
  const page = L.pages[pageKey];
  const status = t.footer.companyStatus[company.status];
  const holder: [string, string][] = [
    [L.holder.title, `${status ? `${company.name} (${status})` : company.name} · ${company.country}`],
    [L.holder.nrt, company.nrt ?? L.holder.pendingRegistration],
    [L.holder.address, company.address ?? L.holder.pendingRegistration],
    [L.holder.registry, company.registry ?? L.holder.pendingRegistration],
    [L.holder.contact, L.holder.contactValue],
  ];
  const links: [LegalKey, string][] = [
    ["notice", legalPaths.notice],
    ["privacy", legalPaths.privacy],
    ["cookies", legalPaths.cookies],
  ];

  return (
    <>
      <header className="legal-header">
        <Lockup size={32} href={localeHome(locale)} label={t.a11y.homeLabel} />
        <a className="legal-back" href={localeHome(locale)}>
          {L.back}
        </a>
      </header>
      <main id="contenido" className="legal">
        <h1 className="h2">{page.title}</h1>
        <p className="legal-provisional" role="note">
          {L.provisional}
        </p>

        {page.showHolder && (
          <section className="legal-section" aria-labelledby="titular">
            <h2 id="titular" className="h3">
              {L.holder.title}
            </h2>
            <p>{holder[0]![1]}</p>
            <dl className="legal-holder">
              {holder.slice(1).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {page.sections.map((s, i) => (
          <section key={s.title} className="legal-section" aria-labelledby={`s-${i}`}>
            <h2 id={`s-${i}`} className="h3">
              {s.title}
            </h2>
            {s.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {s.list.length > 0 && (
              <ul className="legal-list">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
            {s.pending && (
              <p className="legal-pending">
                <span className="legal-pending-label">{L.pendingLabel}:</span> {s.pending}
              </p>
            )}
          </section>
        ))}

        <nav className="legal-nav" aria-label={L.nav}>
          <ul>
            {links.map(([k, path]) => (
              <li key={k}>
                {k === pageKey ? (
                  <span aria-current="page">{L.pages[k].title}</span>
                ) : (
                  <a href={localePath(locale, path)}>{L.pages[k].title}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  );
}
