import type { Dictionary } from "@/content";
import type { Locale } from "@/content/locales";
import { verticalById, verticalHref } from "@/content/verticals";

export function Circle({ t, locale }: { t: Dictionary; locale: Locale }) {
  const c = t.circle;
  return (
    <section id="circulo" className="section" aria-labelledby="circulo-titulo">
      <div className="circle-intro">
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 id="circulo-titulo" className="h2" tabIndex={-1}>
            {c.title}
          </h2>
        </div>
        <p className="lead">{c.lead}</p>
      </div>
      <ol className="rule-grid steps">
        {c.steps.map((s, i) => {
          const v = verticalById[s.vertical];
          const inner = (
            <>
              <span className="mono-index">
                {String(i + 1).padStart(2, "0")} · {s.label}
              </span>
              <span className="step-name">{v.name}</span>
              <span className="step-body">{s.body}</span>
            </>
          );
          return (
            <li key={s.vertical}>
              {v.published ? (
                <a className="step-link" href={verticalHref(v, locale, "circulo")} data-vertical={v.id}>
                  {inner}
                </a>
              ) : (
                <div className="step-link">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
