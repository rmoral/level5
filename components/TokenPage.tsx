import Link from "next/link";
import { getDictionary } from "@/content";
import { localeHome, type Locale } from "@/content/locales";
import { Lockup } from "./Symbol";
import { TokenAction } from "./TokenAction";

/** Página de confirmación o baja de novedades (especificación §3.4). */
export function TokenPage({ kind, token, locale }: { kind: "confirm" | "unsubscribe"; token: string; locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.subscription;
  const copy = kind === "confirm" ? s.confirm : s.unsubscribe;
  const results: Record<string, string> =
    kind === "confirm"
      ? {
          confirmed: s.confirm.confirmed,
          already_confirmed: s.confirm.alreadyConfirmed,
          unsubscribed: s.confirm.unsubscribed,
          not_found: s.confirm.notFound,
        }
      : {
          unsubscribed: s.unsubscribe.unsubscribed,
          already_unsubscribed: s.unsubscribe.alreadyUnsubscribed,
          not_found: s.unsubscribe.notFound,
        };
  return (
    <main className="section dark token-page">
      <Lockup size={36} href={localeHome(locale)} label={t.a11y.homeLabel} />
      <div className="token-card">
        <h1 className="h2">{copy.title}</h1>
        <p className="muted">{copy.body}</p>
        <TokenAction kind={kind} token={token} locale={locale} button={copy.button} results={results} error={s.error} />
      </div>
      <p>
        <Link className="token-back" href={localeHome(locale)}>
          {s.back}
        </Link>
      </p>
    </main>
  );
}
