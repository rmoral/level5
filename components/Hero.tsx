import { getImageProps } from "next/image";
import type { Dictionary } from "@/content";
import { images } from "@/content/images";

/** Fotografía del hero con dirección de arte: recorte 4:5 por debajo de 860 px. */
function HeroPicture({ alt }: { alt: string }) {
  const { hero, heroMobile } = images;
  if (!hero) return <div className="media-placeholder" aria-hidden="true" />;
  const common = { alt, quality: 70, priority: true };
  const {
    props: { srcSet: desktop, ...rest },
  } = getImageProps({ ...common, ...hero, sizes: "100vw" });
  const mobile = heroMobile
    ? getImageProps({ ...common, ...heroMobile, sizes: "100vw" }).props.srcSet
    : undefined;
  return (
    <picture>
      {mobile && <source media="(max-width: 859px)" srcSet={mobile} sizes="100vw" />}
      <source media="(min-width: 860px)" srcSet={desktop} sizes="100vw" />
      <img {...rest} alt={rest.alt ?? alt} />
    </picture>
  );
}

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section id="inicio" className="hero" aria-labelledby="inicio-titulo">
      <div className="hero-media">
        <HeroPicture alt={t.hero.photoAlt} />
      </div>
      <div className="hero-content">
        <p className="hero-kicker">{t.hero.kicker}</p>
        <h1 id="inicio-titulo">{t.hero.title}</h1>
        <p className="hero-lead">{t.hero.lead}</p>
        <div className="hero-actions">
          <a className="btn btn-light btn-lg" href="#contacto">
            {t.hero.ctaPrimary}
          </a>
          <a className="hero-secondary" href="#verticales">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
