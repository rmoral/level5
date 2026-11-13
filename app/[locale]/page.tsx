import { getDictionary } from "@/content";
import type { Locale } from "@/content/locales";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Credentials } from "@/components/Credentials";
import { Group } from "@/components/Group";
import { Verticals } from "@/components/Verticals";
import { Andorra } from "@/components/Andorra";
import { Partners } from "@/components/Partners";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const runtime = "nodejs";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const t = getDictionary(locale);
  return (
    <>
      <a className="skip-link" href="#contenido">
        {t.a11y.skipLink}
      </a>
      <Header t={t} locale={locale} />
      <Hero t={t} />
      <main id="contenido" tabIndex={-1}>
        <Credentials t={t} />
        <Group t={t} />
        <Verticals t={t} locale={locale} />
        <Andorra t={t} />
        <Partners t={t} />
        <Contact t={t} locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
