import Link from "next/link";
import type { Dictionary } from "@/content";

export function NotFoundBody({ t }: { t: Dictionary }) {
  return (
    <main className="section dark not-found">
      <p className="eyebrow">404</p>
      <h1 className="h2">{t.notFound.title}</h1>
      <p>
        <Link className="btn btn-light" href="/">
          {t.notFound.back}
        </Link>
      </p>
    </main>
  );
}
