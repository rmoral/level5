/** Símbolo de Level Five: la V sin variación, cotas del manual sobre retícula de 100 (especificación §7.2). */
export function Symbol({ size, label }: { size: number; label?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <polygon points="22,18 32.92,18 50,57.05 67.08,18 78,18 50,82" fill="currentColor" />
    </svg>
  );
}

export function Lockup({ size, href, label }: { size: number; href?: string; label?: string }) {
  const inner = (
    <>
      <Symbol size={size} />
      <span className="lockup-name">Level Five</span>
    </>
  );
  return href ? (
    <a className="lockup" href={href} aria-label={label}>
      {inner}
    </a>
  ) : (
    <div className="lockup">{inner}</div>
  );
}
