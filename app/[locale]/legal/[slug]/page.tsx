import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import type { Locale } from "@/content/locales";
import { LegalPage, legalSlugs, type LegalKey } from "@/components/LegalPage";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return Object.keys(legalSlugs).map((slug) => ({ slug }));
}

function pageKey(slug: string): LegalKey {
  const key = legalSlugs[slug];
  if (!key) notFound();
  return key;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getDictionary(locale as Locale).legal.pages[pageKey(slug)];
  return { title: `${page.title} · Level Five`, description: page.description };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  return <LegalPage locale={locale as Locale} pageKey={pageKey(slug)} />;
}
