import type { CSSProperties } from "react";
import type { Dictionary } from "@/content";
import { images } from "@/content/images";
import type { Locale } from "@/content/locales";
import { verticalHref, verticals, type Vertical } from "@/content/verticals";
import { Photo } from "./Photo";
import { VerticalTabs } from "./VerticalTabs";

const accentStyle = (v: Vertical) => ({ "--accent": `var(${v.accentVar})` }) as CSSProperties;

function Panel({ v, t, locale }: { v: Vertical; t: Dictionary; locale: Locale }) {
  const c = t.verticals.items[v.id];
  return (
    <>
      <div className="v-rule" aria-hidden="true" />
      <div className="v-photo">
        <Photo photo={images.verticals[v.id]} alt={c.photoAlt} sizes="(min-width: 1024px) 60vw, 100vw" />
      </div>
      <div className="v-body">
        <div className="v-title-row">
          <h3 className={`v-name v-name--${v.font}`}>{v.name}</h3>
          <p className="v-kind">{c.kind}</p>
        </div>
        <p className="v-lead">{c.lead}</p>
        <ul className="v-offer">
          {c.offer.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <div className="v-foot">
          <p className="v-who">{c.who}</p>
          {v.published ? (
            <a className="btn btn-primary" href={verticalHref(v, locale, "verticales")} data-vertical={v.id}>
              {t.verticals.goTo.replace("{domain}", v.domain)}
            </a>
          ) : (
            <p className="v-soon">{t.verticals.comingSoon}</p>
          )}
        </div>
      </div>
    </>
  );
}

export function Verticals({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id="verticales" className="section verticals" aria-labelledby="verticales-titulo">
      <div className="section-head">
        <p className="eyebrow">{t.verticals.eyebrow}</p>
        <h2 id="verticales-titulo" className="h2" tabIndex={-1}>
          {t.verticals.title}
        </h2>
      </div>

      {/* ≥ 860 px: pestañas (lista + ficha). En W2, fijado por scroll a partir de 1024 px. */}
      <VerticalTabs
        label={t.a11y.verticalsTablist}
        tabs={verticals.map((v) => ({
          id: v.id,
          index: v.index,
          name: v.name,
          short: t.verticals.items[v.id].short,
          style: accentStyle(v),
        }))}
        panels={verticals.map((v) => (
          <Panel key={v.id} v={v} t={t} locale={locale} />
        ))}
      />

      {/* < 860 px: seis tarjetas apiladas enlazadas a su web (artboard Movil) */}
      <ul className="v-cards">
        {verticals.map((v) => {
          const c = t.verticals.items[v.id];
          const body = (
            <>
              <span className="mono-index">
                {v.index} · {c.cardLabel}
              </span>
              <span className="v-card-name">
                {v.name}
                {v.published ? " ↗" : ""}
              </span>
              <span className="v-card-line">{v.published ? c.cardLine : t.verticals.comingSoon}</span>
            </>
          );
          return (
            <li key={v.id}>
              {v.published ? (
                <a className="v-card" href={verticalHref(v, locale, "movil")} data-vertical={v.id}>
                  {body}
                </a>
              ) : (
                <div className="v-card">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
