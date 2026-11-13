"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

type Tab = { id: string; step: string; name: string; short: string; style: CSSProperties };

/**
 * Pestañas de verticales (patrón WAI-ARIA, activación automática).
 * Teclado: flechas arriba/abajo (y izquierda/derecha), Inicio y Fin.
 * Sin JavaScript, la hoja de estilos muestra las seis fichas apiladas y sin acento.
 */
export function VerticalTabs({ label, tabs, panels }: { label: string; tabs: Tab[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    refs.current[n]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
  };

  return (
    <div className="v-desktop">
      <div className="v-tablist" role="tablist" aria-label={label} aria-orientation="vertical">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${tab.id}`}
            tabIndex={i === active ? 0 : -1}
            className="v-tab"
            style={tab.style}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="v-tab-text">
              <span className="mono-index">{tab.step}</span>
              <span className="v-tab-name">{tab.name}</span>
              <span className="v-tab-short">{tab.short}</span>
            </span>
            <span className="v-dot" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="v-panels">
        {panels.map((panel, i) => {
          const tab = tabs[i]!;
          return (
            <article
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              tabIndex={0}
              className={`v-panel${i === active ? " is-active" : ""}`}
              style={tab.style}
            >
              {panel}
            </article>
          );
        })}
      </div>
    </div>
  );
}
