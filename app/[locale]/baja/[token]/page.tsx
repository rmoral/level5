import type { Metadata } from "next";
import { getDictionary } from "@/content";
import type { Locale } from "@/content/locales";
import { TokenPage } from "@/components/TokenPage";

// Página por petición: el token no se conoce en compilación. Sin datos personales en la URL
// (solo el token aleatorio); la operación se hace al pulsar el botón (POST).
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "nodejs";

type Props = { params: Promise<{ locale: string; token: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale).subscription;
  return { title: `${t.unsubscribe.title} · Level Five`, robots: { index: false, follow: false } };
}

export default async function Page({ params }: Props) {
  const { locale, token } = await params;
  return <TokenPage kind="unsubscribe" token={token} locale={locale as Locale} />;
}
