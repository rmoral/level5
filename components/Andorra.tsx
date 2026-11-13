import type { Dictionary } from "@/content";
import { images } from "@/content/images";
import { Photo } from "./Photo";

export function Andorra({ t }: { t: Dictionary }) {
  const a = t.andorra;
  return (
    <section id="andorra" className="section dark andorra" aria-labelledby="andorra-titulo">
      <div className="andorra-media">
        <Photo photo={images.andorra} alt={a.photoAlt} sizes="100vw" />
      </div>
      <div className="andorra-head">
        <p className="eyebrow">{a.eyebrow}</p>
        <h2 id="andorra-titulo" tabIndex={-1}>
          {a.title}
        </h2>
      </div>
      <ul className="reasons">
        {a.reasons.map((r) => (
          <li key={r.title}>
            <h3 className="h3">{r.title}</h3>
            <p>{r.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
