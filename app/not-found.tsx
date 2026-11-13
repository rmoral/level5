import { getDictionary } from "@/content";
import { defaultLocale } from "@/content/locales";
import { fontVariables } from "@/lib/fonts";
import { NotFoundBody } from "@/components/NotFoundBody";
import "@/styles/tokens.css";
import "@/styles/site.css";

/** 404 global (rutas fuera de un idioma disponible, p. ej. /ca en W1). */
export default function NotFound() {
  const t = getDictionary(defaultLocale);
  return (
    <html lang={defaultLocale} className={fontVariables}>
      <body>
        <NotFoundBody t={t} />
      </body>
    </html>
  );
}
