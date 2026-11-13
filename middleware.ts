import { NextResponse, type NextRequest } from "next/server";

/**
 * Rutas por idioma (especificación §3.5 y §9):
 * - El castellano se sirve en la raíz sin prefijo: "/" y "/legal/…" se reescriben
 *   internamente a "/es" y "/es/legal/…".
 * - "/es" y "/es/…" redirigen a la versión sin prefijo (una sola URL por página).
 * - Sin detección de idioma: no se lee Accept-Language ni el país.
 */
const PREFIXED = new Set(["ca", "fr", "en"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === "es") {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (PREFIXED.has(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Todo menos los recursos estáticos y los internos de Next.
  matcher: ["/((?!_next/|img/|favicon\\.ico|icon\\.svg|robots\\.txt|sitemap\\.xml|.*\\.[a-z0-9]+$).*)"],
};
