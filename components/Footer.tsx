import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/content/locales";
import { company, legalPaths, linkedinUrl } from "@/content/site";
import { verticalHref, verticals } from "@/content/verticals";
import { Lockup } from "./Symbol";

export function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const f = t.footer;
  const status = f.companyStatus[company.status];
  // Datos registrales solo cuando existan (settings.company_legal, especificación §4.10).
  const companyLine = [
    status ? `${company.name} (${status})` : company.name,
    company.nrt,
    company.address,
    company.country,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-news">
          <Lockup size={36} />
          <p>{f.newsletter.body}</p>
          <form className="news-form" method="post">
            <input type="hidden" name="locale" value={locale} />
            <label htmlFor="n-email" className="sr-only">
              {f.newsletter.label}
            </label>
            <input
              className="input"
              id="n-email"
              name="email"
              type="email"
              required
              placeholder={f.newsletter.placeholder}
              autoComplete="email"
            />
            <button type="submit" className="btn btn-light">
              {f.newsletter.submit}
            </button>
          </form>
          <p className="small">{f.newsletter.note}</p>
        </div>
        <nav aria-labelledby="pie-verticales">
          <ul className="footer-col">
            <li>
              <h2 id="pie-verticales">{f.verticalsHeading}</h2>
            </li>
            {verticals.map((v) => (
              <li key={v.id}>
                {v.published ? (
                  <a href={verticalHref(v, locale, "pie")} data-vertical={v.id}>
                    {v.name} ↗
                  </a>
                ) : (
                  <span>{v.name}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-labelledby="pie-sitio">
          <ul className="footer-col">
            <li>
              <h2 id="pie-sitio">{f.siteHeading}</h2>
            </li>
            <li>
              <a href="#grupo">{f.siteLinks.group}</a>
            </li>
            <li>
              <a href="#andorra">{f.siteLinks.andorra}</a>
            </li>
            <li>
              <a href="#equipo">{f.siteLinks.partners}</a>
            </li>
            <li>
              <a href="#contacto">{f.siteLinks.contact}</a>
            </li>
            {linkedinUrl && (
              <li>
                <a href={linkedinUrl}>{f.siteLinks.linkedin}</a>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="footer-bottom small">
        <p>{companyLine}</p>
        <ul className="footer-legal">
          <li>
            <a href={localePath(locale, legalPaths.notice)}>{f.legal.notice}</a>
          </li>
          <li>
            <a href={localePath(locale, legalPaths.privacy)}>{f.legal.privacy}</a>
          </li>
          <li>
            <a href={localePath(locale, legalPaths.cookies)}>{f.legal.cookies}</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
