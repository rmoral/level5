import { hasDictionary, type Dictionary } from "@/content";
import { localeCodes, localeHome, locales, type Locale } from "@/content/locales";

/**
 * Selector de idioma: lista de enlaces reales con hreflang y lang (especificación §8).
 * Un idioma sin diccionario todavía (W1) se muestra sin enlace.
 * En W2 un componente cliente añadirá el ancla de la sección visible al href.
 */
export function LangSwitch({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <ul className="lang-switch" aria-label={t.a11y.languageNav}>
      {locales.map((l) => (
        <li key={l} lang={l}>
          {l === locale ? (
            <span aria-current="true">{localeCodes[l]}</span>
          ) : hasDictionary(l) ? (
            <a href={localeHome(l)} hrefLang={l} lang={l}>
              {localeCodes[l]}
            </a>
          ) : (
            <span className="lang-off" title={t.a11y.unavailableLanguage}>
              {localeCodes[l]}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
