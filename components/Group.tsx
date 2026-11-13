import type { Dictionary } from "@/content";

export function Group({ t }: { t: Dictionary }) {
  const g = t.group;
  return (
    <section id="grupo" className="section group" aria-labelledby="grupo-titulo">
      <div className="group-intro">
        <div>
          <p className="eyebrow">{g.eyebrow}</p>
          <h2 id="grupo-titulo" className="h2" tabIndex={-1}>
            {g.title}
          </h2>
        </div>
        <div className="group-body lead">
          {g.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <ul className="rule-grid principles">
        {g.principles.map((p) => (
          <li key={p.index}>
            <span className="mono-index" aria-hidden="true">
              {p.index}
            </span>
            <h3 className="h3">{p.title}</h3>
            <p className="muted">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
