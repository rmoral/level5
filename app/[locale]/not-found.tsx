import { getDictionary } from "@/content";
import { defaultLocale } from "@/content/locales";
import { NotFoundBody } from "@/components/NotFoundBody";

export default function LocaleNotFound() {
  return <NotFoundBody t={getDictionary(defaultLocale)} />;
}
