/**
 * Layout raíz de paso: el <html> lo pinta app/[locale]/layout.tsx para que
 * cada idioma tenga su atributo lang.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
