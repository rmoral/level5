# level5-web — reglas del repositorio

Sitio one-page institucional de Level Five (Level 5, SL, Andorra) en level5.ad.

## Fuentes de verdad
- `docs/01-WEB-SPEC.md`: alcance, secciones, formulario, movimiento, imágenes, criterios de aceptación.
- `reference/Main.dc.html` y `reference/Movil.dc.html`: maquetas del canvas de diseño. Mandan en estructura, textos y dirección visual. Son referencia: no se copia su código de editor (`support.js`, `<x-dc>`, `class Component`).
- `supabase/0001_level5_web.sql`: migración probada contra Postgres 16. No se reescribe; los cambios van en migraciones nuevas.

Si el código y la especificación discrepan, manda la especificación. Si la especificación no dice nada, no se construye: pregunta.

## Reglas que no se negocian
- Cuatro idiomas: castellano (por defecto, en `/`), catalán (`/ca`), francés (`/fr`) e inglés (`/en`). `level5.ad` muestra siempre el castellano: sin redirección automática por idioma del navegador. Todo texto sale de `content/`, ninguno en los componentes.
- Los textos del canvas se portan literalmente. Lo que va entre corchetes es un dato pendiente, no relleno: no se inventa.
- Identidad Level Five: sin sombras, sin degradados, radios 0/4/6, Instrument Sans + IBM Plex Mono, tokens como variables CSS.
- Nunca dos acentos de vertical visibles a la vez.
- Movimiento solo con `transform`, `opacity` y `clip-path`; todo respeta `prefers-reduced-motion`; la página se lee y el formulario se envía sin JavaScript.
- El navegador nunca toca la base de datos: acciones de servidor con la clave de servicio.
- Consentimientos separados e inmutables; la casilla de novedades nunca viene marcada; doble opt-in.
- Sin cookies, sin píxeles, sin reCAPTCHA, sin recursos enlazados en caliente (fuentes e imágenes autoalojadas).
- Cada fotografía de banco se registra en `docs/IMAGES.md` con fuente, autor y licencia comprobada.
- Sin precios, sin logotipos de clientes, sin cifras fiscales en esta página.
- Los socios que se muestran son las sociedades BrightTech y Saikaris: sin nombres, retratos ni perfiles de personas.
- Level 5, SL está en constitución: los datos legales salen de `settings.company_legal`; no se inventa NRT ni domicilio, y el formulario no pasa a producción sin responsable del tratamiento confirmado (especificación §4.10).

## Forma de trabajar
- Un hito por sesión (W1, W2, W3). No se pasa al siguiente sin cumplir sus criterios.
- Decisiones marcadas "decide tú" se anotan en `docs/DECISIONS.md` con una línea de motivo.
- Al cerrar un hito: tests, lint, typecheck, Lighthouse móvil, y un resumen de cinco líneas (qué se hizo, qué quedó fuera, decisiones tomadas, qué se necesita de los socios).
- Commits pequeños en castellano; nunca se suben credenciales (`.env.example` sí, `.env` no).
