import type { Dictionary } from "@/content";
import type { Locale } from "@/content/locales";
import { LangSwitch } from "./LangSwitch";
import { Lockup } from "./Symbol";
import { MobileMenu } from "./MobileMenu";

function NavLinks({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <div className="nav-links">
      <a href="#grupo">{t.nav.group}</a>
      <a href="#verticales">{t.nav.verticals}</a>
      <a href="#andorra">{t.nav.andorra}</a>
      <a href="#equipo">{t.nav.partners}</a>
      <LangSwitch t={t} locale={locale} />
      <a className="btn btn-light" href="#contacto">
        {t.nav.cta}
      </a>
    </div>
  );
}

export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label={t.a11y.mainNav}>
        <Lockup size={40} href="#inicio" label={t.a11y.homeLabel} />
        <NavLinks t={t} locale={locale} />
        <MobileMenu openLabel={t.a11y.menuOpen} closeLabel={t.a11y.menuClose}>
          <NavLinks t={t} locale={locale} />
        </MobileMenu>
      </nav>
    </header>
  );
}
