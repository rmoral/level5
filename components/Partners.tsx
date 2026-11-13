import type { Dictionary } from "@/content";
import { partners } from "@/content/site";

export function Partners({ t }: { t: Dictionary }) {
  const p = t.partners;
  return (
    <section id="equipo" className="section" aria-labelledby="equipo-titulo">
      <div className="section-head">
        <p className="eyebrow">{p.eyebrow}</p>
        <h2 id="equipo-titulo" className="h2" tabIndex={-1}>
          {p.title}
        </h2>
        <p className="lead">{p.lead}</p>
      </div>
      <ul className="rule-grid partners-grid">
        {partners.map((partner) => {
          const copy = p[partner.id];
          return (
            <li key={partner.id}>
              <p className="partner-label">{copy.label}</p>
              <h3 className="partner-name">{partner.name}</h3>
              <p className="partner-body">{copy.body}</p>
              <a className="partner-link" href={partner.url}>
                {partner.domain} ↗
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
