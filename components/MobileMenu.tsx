"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Menú por debajo de 860 px: <details> con panel a pantalla completa.
 * Funciona sin JavaScript; con JavaScript se cierra al elegir un enlace o con Escape.
 */
export function MobileMenu({
  openLabel,
  closeLabel,
  children,
}: {
  openLabel: string;
  closeLabel: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onToggle = () => setOpen(el.open);
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a")) el.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && el.open) {
        el.open = false;
        el.querySelector("summary")?.focus();
      }
    };
    el.addEventListener("toggle", onToggle);
    el.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("toggle", onToggle);
      el.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <details ref={ref} className="mobile-menu">
      <summary aria-label={open ? closeLabel : openLabel}>
        <svg className="icon-open" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <svg className="icon-close" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </summary>
      <div className="mobile-panel">{children}</div>
    </details>
  );
}
