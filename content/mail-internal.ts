/**
 * Aviso interno a los socios: siempre en castellano (especificación §5.2).
 * No forma parte de los diccionarios de idioma porque no se traduce.
 * [no-canvas] Textos nuevos, a revisar por los socios.
 */
export const internalMail = {
  /** [level5.ad · Fifth Landing · FR] Nueva consulta de … */
  subject: "[level5.ad · {topic} · {locale}] Nueva consulta de {name}",
  intro: "Nueva consulta desde el formulario de level5.ad. Responde a este correo para contestar directamente al visitante.",
  topicFallback: { grupo: "Level Five", nose: "Sin decidir" },
  labels: {
    name: "Nombre",
    email: "Correo",
    company: "Empresa",
    interest: "Interés",
    locale: "Idioma",
    news: "Novedades",
    sourcePage: "Página",
    utm: "UTM",
    inquiryId: "Consulta",
    message: "Mensaje",
  },
  yes: "Sí (pendiente de confirmar)",
  no: "No",
  empty: "—",
  test: {
    subject: "[level5.ad] Prueba de envío SMTP",
    body: "Correo de prueba de npm run mail:test. Si lo recibes, el transporte SMTP de level5.ad funciona.",
    mode: "Conexión",
  },
} as const;
