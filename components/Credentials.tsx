import type { Dictionary } from "@/content";

export function Credentials({ t }: { t: Dictionary }) {
  return (
    <ul className="credentials">
      {t.credentials.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
}
