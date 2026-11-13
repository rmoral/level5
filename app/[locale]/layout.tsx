import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { availableLocales, getDictionary, hasDictionary } from "@/content";
import { isLocale, type Locale } from "@/content/locales";
import { fontVariables } from "@/lib/fonts";
import "@/styles/tokens.css";
import "@/styles/site.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return availableLocales().map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

async function resolveLocale(params: Props["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale) || !hasDictionary(locale)) notFound();
  return locale;
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    metadataBase: new URL(process.env.SITE_URL ?? "https://level5.ad"),
    icons: { icon: { url: "/icon.svg", type: "image/svg+xml" } },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B1A33",
  width: "device-width",
  initialScale: 1,
};

// Marca la página como "con JavaScript" antes del primer pintado: sin ella,
// las seis fichas de verticales se muestran apiladas y legibles.
const jsFlag = "document.documentElement.classList.add('js')";

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);
  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
